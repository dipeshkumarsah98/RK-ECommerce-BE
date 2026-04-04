import {
  prisma,
  OrderStatus,
  PaymentStatus,
  StockMovementType,
} from "../lib/prisma.js";
import { nanoid } from "../lib/nanoid.js";
import { createStockMovement } from "./stock.service.js";
import {
  computeDiscount,
  computeCommission,
  DiscountType,
  CommissionType,
} from "./affiliate.service.js";
import { StockReason } from "../types/stock-movement.type.js";
import { BadRequestError, NotFoundError } from "../lib/errors.js";
import {
  enqueueOrderConfirmation,
  enqueueAdminNewOrder,
} from "../queues/emailQueue.js";
import type {
  CreateOrderInput,
  AddressInput,
  OrderItemInput,
} from "../types/order.type.js";
import type { PrismaTransactionClient } from "../types/prisma.type.js";
import { logger } from "../lib/logger.js";
import { SHIPPING_CHARGE, TAX_RATE } from "../lib/constant.js";

export type { CreateOrderInput } from "../types/order.type.js";

/**
 * Resolve user from email - find existing or create new customer
 */
async function resolveUserFromEmail(
  input: CreateOrderInput,
  tx: PrismaTransactionClient,
): Promise<string> {
  // If userId provided (admin override), use it directly
  if (input.userId) {
    return input.userId;
  }

  // Find user by email
  let user = await tx.user.findUnique({
    where: { email: input.customerEmail },
  });

  if (!user) {
    // Create new customer
    user = await tx.user.create({
      data: {
        email: input.customerEmail,
        name: input.customerName,
        phone: input.customerPhone,
        roles: ["customer"],
      },
    });
  } else {
    // Update existing user info if provided
    const updateData: Record<string, unknown> = {};
    if (input.customerName && user.name !== input.customerName) {
      updateData.name = input.customerName;
    }
    if (input.customerPhone && user.phone !== input.customerPhone) {
      updateData.phone = input.customerPhone;
    }
    if (Object.keys(updateData).length > 0) {
      user = await tx.user.update({
        where: { id: user.id },
        data: updateData,
      });
    }
  }

  return user.id;
}

/**
 * Resolve shipping address - use existing or create new
 */
async function resolveShippingAddress(
  userId: string,
  shippingAddressId: string | undefined,
  shippingAddress: AddressInput | undefined,
  tx: PrismaTransactionClient,
): Promise<string | undefined> {
  if (shippingAddressId) {
    return shippingAddressId;
  }

  if (shippingAddress) {
    const addr = await tx.address.create({
      data: {
        userId,
        addressType: "shipping",
        ...shippingAddress,
      },
    });
    return addr.id;
  }

  return undefined;
}

/**
 * Resolve billing address - use existing, create new, or default to shipping
 */
async function resolveBillingAddress(
  userId: string,
  billingAddressId: string | undefined,
  billingAddress: AddressInput | undefined,
  shippingAddressId: string | undefined,
  tx: PrismaTransactionClient,
): Promise<string | undefined> {
  if (billingAddressId) {
    return billingAddressId;
  }

  if (billingAddress) {
    const addr = await tx.address.create({
      data: {
        userId,
        addressType: "billing",
        ...billingAddress,
      },
    });
    return addr.id;
  }

  // Default to shipping address
  return shippingAddressId;
}

/**
 * Validate products exist and have sufficient stock
 */
async function validateProductsAndStock(
  items: OrderItemInput[],
  tx: PrismaTransactionClient,
) {
  const productIds = items.map((i) => i.productId);
  const products = await tx.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== productIds.length) {
    throw new BadRequestError("One or more products not found");
  }

  const productMap = new Map(products.map((p) => [p.id, p]));

  for (const item of items) {
    const product = productMap.get(item.productId)!;
    if (product.totalStock < item.quantity) {
      throw new BadRequestError(
        `Insufficient stock for product "${product.title}". Available: ${product.totalStock}`,
      );
    }
  }

  return productMap;
}

/**
 * Validate and retrieve affiliate link
 */
async function validateAffiliateCode(
  affiliateCode: string | undefined,
  tx: PrismaTransactionClient,
) {
  if (!affiliateCode) {
    return null;
  }

  const affiliateLink = await tx.affiliateLink.findUnique({
    where: { code: affiliateCode },
  });

  if (!affiliateLink || !affiliateLink.isActive) {
    throw new BadRequestError("Invalid or inactive affiliate code");
  }

  return affiliateLink;
}

/**
 * Calculate order totals including subtotal, tax, shipping, discount
 */
function calculateOrderTotals(
  items: OrderItemInput[],
  productMap: Map<string, any>,
  affiliateLink: any,
) {
  let subtotal = 0;
  const orderItems = items.map((item) => {
    const product = productMap.get(item.productId)!;
    const total = product.price * item.quantity;
    subtotal += total;
    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: product.price,
      totalPrice: total,
    };
  });

  let discountAmount = 0;
  if (affiliateLink) {
    discountAmount = computeDiscount(
      subtotal,
      affiliateLink.discountType as DiscountType,
      affiliateLink.discountValue,
    );
  }

  const costAfterDiscount = subtotal - discountAmount;
  const taxAmount = costAfterDiscount * TAX_RATE;
  const shippingAmount = SHIPPING_CHARGE;

  const totalAmount = costAfterDiscount + taxAmount + shippingAmount;

  return {
    orderItems,
    subtotal,
    taxAmount,
    shippingAmount,
    discountAmount,
    totalAmount,
  };
}

/**
 * Create order record in database
 */
async function createOrderRecord(
  input: CreateOrderInput,
  userId: string,
  shippingAddressId: string | undefined,
  billingAddressId: string | undefined,
  affiliateLink: any,
  totals: ReturnType<typeof calculateOrderTotals>,
  tx: PrismaTransactionClient,
  createdBy: string | undefined,
) {
  const initialStatus =
    input.paymentMethod === "COD"
      ? OrderStatus.AWAITING_VERIFICATION
      : OrderStatus.PENDING;

  const currentYear = new Date().getFullYear();
  const orderNumber = `ORD-${currentYear}-${nanoid(4)}`;

  return tx.order.create({
    data: {
      orderNumber,
      userId,
      affiliateId: affiliateLink?.id,
      shippingAddressId,
      billingAddressId,
      subtotal: totals.subtotal,
      taxAmount: totals.taxAmount,
      shippingAmount: totals.shippingAmount,
      discountAmount: totals.discountAmount,
      totalAmount: totals.totalAmount,
      currency: "NPR",
      paymentMethod: input.paymentMethod,
      status: initialStatus,
      notes: input.notes,
      items: { create: totals.orderItems },
      createdBy,
    },
    include: {
      items: {
        include: { product: { select: { title: true } } },
      },
      user: { select: { email: true, name: true } },
    },
  });
}

/**
 * Create payment record for order
 */
async function createPaymentRecord(
  orderId: string,
  paymentMethod: string,
  totalAmount: number,
  tx: PrismaTransactionClient,
) {
  return tx.payment.create({
    data: {
      orderId,
      paymentMethod,
      provider: paymentMethod,
      amount: totalAmount,
      currency: "NPR",
      status: PaymentStatus.PENDING,
    },
  });
}

/**
 * Process stock movements for order items
 */
async function processStockMovements(
  items: OrderItemInput[],
  orderId: string,
  userId: string,
  tx: PrismaTransactionClient,
) {
  for (const item of items) {
    await createStockMovement(
      {
        productId: item.productId,
        type: StockMovementType.OUT,
        quantity: item.quantity,
        reason: StockReason.ORDER_PLACED,
        orderId,
        userId,
      },
      tx,
    );
  }
}

/**
 * Send order confirmation emails (async, non-blocking)
 */
function sendOrderNotifications(
  order: any,
  totalAmount: number,
  paymentMethod: string,
) {
  const itemsForEmail = order.items.map((item: any) => ({
    title: item.product.title,
    quantity: item.quantity,
    price: item.unitPrice,
  }));

  // Customer email
  if (order.user?.email) {
    enqueueOrderConfirmation({
      to: order.user.email,
      orderId: order.id,
      finalAmount: totalAmount,
      paymentMethod,
      items: itemsForEmail,
    }).catch(() => {}); // Silent fail for email
  }

  // Admin notification
  enqueueAdminNewOrder({
    orderId: order.id,
    finalAmount: totalAmount,
    paymentMethod,
    customerEmail: order.user?.email,
  }).catch(() => {}); // Silent fail for email
}

/**
 * Create a new order with automatic user lookup/creation
 * Supports guest orders, returning customers, and admin orders on behalf of others
 */
export async function createOrder(input: CreateOrderInput) {
  return prisma.$transaction(async (tx) => {
    const userId = await resolveUserFromEmail(input, tx);
    const shippingAddressId = await resolveShippingAddress(
      userId,
      input.shippingAddressId,
      input.shippingAddress,
      tx,
    );
    const billingAddressId = await resolveBillingAddress(
      userId,
      input.billingAddressId,
      input.billingAddress,
      shippingAddressId,
      tx,
    );

    const productMap = await validateProductsAndStock(input.items, tx);
    const affiliateLink = await validateAffiliateCode(input.affiliateCode, tx);
    const totals = calculateOrderTotals(input.items, productMap, affiliateLink);

    const order = await createOrderRecord(
      input,
      userId,
      shippingAddressId,
      billingAddressId,
      affiliateLink,
      totals,
      tx,
      input.requestingUserId,
    );

    await createPaymentRecord(
      order.id,
      input.paymentMethod,
      totals.totalAmount,
      tx,
    );

    await processStockMovements(input.items, order.id, userId, tx);

    sendOrderNotifications(order, totals.totalAmount, input.paymentMethod);

    return order;
  });
}

export async function listOrders(filters: {
  userId?: string;
  status?: OrderStatus;
  page?: number;
  limit?: number;
}) {
  const { userId, status, page = 1, limit = 20 } = filters;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (userId) where.userId = userId;
  if (status) where.status = status;

  const [items, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      include: {
        items: { include: { product: { select: { id: true, title: true } } } },
        payment: {
          select: {
            paymentMethod: true,
            amount: true,
            status: true,
            paidAt: true,
          },
        },
        user: { select: { email: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where }),
  ]);

  return { items, total, page, limit };
}

export async function getOrderById(id: string, userId?: string) {
  let order: any = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      user: { select: { email: true, name: true } },
      payment: true,
      verification: {
        include: {
          admin: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      affiliate: {
        select: {
          vendor: {
            select: {
              name: true,
              email: true,
            },
          },
          code: true,
          discountType: true,
          discountValue: true,
        },
      },
    },
  });

  if (!order) throw new NotFoundError("Order not found");
  if (order.shippingAddressId && order.billingAddressId) {
    const addresses = await prisma.address.findMany({
      where: {
        OR: [{ id: order.shippingAddressId }, { id: order.billingAddressId }],
      },
    });
    const addressMap = new Map(addresses.map((a) => [a.id, a]));
    order = {
      ...order,
      shippingAddress: order.shippingAddressId
        ? addressMap.get(order.shippingAddressId)
        : null,
      billingAddress: order.billingAddressId
        ? addressMap.get(order.billingAddressId)
        : null,
    };
  }

  return order;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
) {
  const updated = await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    if (!order) throw new NotFoundError("Order not found");

    const restoreStatuses: OrderStatus[] = [OrderStatus.CANCELLED];
    const previousStatus = order.status;

    const updated = await tx.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    if (
      restoreStatuses.includes(newStatus) &&
      !restoreStatuses.includes(previousStatus)
    ) {
      for (const item of order.items) {
        await createStockMovement(
          {
            productId: item.productId,
            type: StockMovementType.IN,
            quantity: item.quantity,
            reason: StockReason.ORDER_CANCELLED,
            orderId: order.id,
          },
          tx,
        );
      }
    }

    if (newStatus === OrderStatus.COMPLETED && order.affiliateId) {
      const affiliateLink = await tx.affiliateLink.findUnique({
        where: { id: order.affiliateId },
      });
      if (affiliateLink) {
        const commission = computeCommission(
          order.totalAmount,
          affiliateLink.commissionType as CommissionType,
          affiliateLink.commissionValue,
        );
        const existingEarning = await tx.vendorEarning.findFirst({
          where: { orderId: order.id },
        });
        if (!existingEarning) {
          logger.info(
            `Recording affiliate commission for order ${order.id}, affiliate ${affiliateLink.code}, amount ${commission}`,
          );
          await tx.vendorEarning.create({
            data: {
              vendorId: affiliateLink.vendorId,
              orderId: order.id,
              affiliateId: affiliateLink.id,
              commission,
            },
          });
        }
      }
      // mark payment as completed
      if (order.paymentMethod === "COD") {
        await tx.payment.update({
          where: { orderId: order.id },
          data: { status: PaymentStatus.SUCCESS, paidAt: new Date() },
        });
      }
    }

    return updated;
  });

  return updated;
}

/**
 * Get order statistics
 * Returns total orders, processing orders, gross revenue, and cancellations
 */
export async function getOrderStats() {
  const [totalOrders, processingOrders, cancelledOrders, revenueAggregate] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({
        where: { status: OrderStatus.PROCESSING },
      }),
      prisma.order.count({
        where: { status: OrderStatus.CANCELLED },
      }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: {
          status: {
            notIn: [
              OrderStatus.CANCELLED,
              OrderStatus.PENDING,
              OrderStatus.AWAITING_VERIFICATION,
            ],
          },
        },
      }),
    ]);

  return {
    totalOrders,
    processingOrders,
    grossRevenue: revenueAggregate._sum.totalAmount || 0,
    cancellations: cancelledOrders,
  };
}
