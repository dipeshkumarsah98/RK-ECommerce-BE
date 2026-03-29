import {
  prisma,
  OrderStatus,
  PaymentStatus,
  StockMovementType,
} from "../lib/prisma.js";
import { createStockMovement } from "./stock.service.js";
import { computeDiscount, computeCommission } from "./affiliate.service.js";
import { StockReason } from "../types/stock-movement.type.js";

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  userId?: string;
  affiliateCode?: string;
  paymentMethod: "ESEWA" | "KHALTI" | "COD";
  items: OrderItemInput[];
}

export async function createOrder(input: CreateOrderInput) {
  return prisma.$transaction(async (tx) => {
    const productIds = input.items.map((i) => i.productId);
    const products = await tx.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new Error("One or more products not found");
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    for (const item of input.items) {
      const product = productMap.get(item.productId)!;
      if (product.totalStock < item.quantity) {
        throw new Error(
          `Insufficient stock for product "${product.title}". Available: ${product.totalStock}`,
        );
      }
    }

    let affiliateLink = null;
    if (input.affiliateCode) {
      affiliateLink = await tx.affiliateLink.findUnique({
        where: { code: input.affiliateCode },
      });
      if (!affiliateLink || !affiliateLink.isActive) {
        throw new Error("Invalid or inactive affiliate code");
      }
    }

    let totalAmount = 0;
    const orderItems = input.items.map((item) => {
      const product = productMap.get(item.productId)!;
      const total = product.price * item.quantity;
      totalAmount += total;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        total,
      };
    });

    let discountAmount = 0;
    if (affiliateLink) {
      discountAmount = computeDiscount(
        totalAmount,
        affiliateLink.discountType,
        affiliateLink.discountValue,
      );
    }

    const finalAmount = totalAmount - discountAmount;

    const initialStatus =
      input.paymentMethod === "COD"
        ? OrderStatus.AWAITING_VERIFICATION
        : OrderStatus.PENDING;

    const order = await tx.order.create({
      data: {
        userId: input.userId,
        affiliateId: affiliateLink?.id,
        totalAmount,
        discountAmount,
        finalAmount,
        paymentMethod: input.paymentMethod,
        status: initialStatus,
        items: { create: orderItems },
      },
      include: { items: true },
    });

    await tx.payment.create({
      data: {
        orderId: order.id,
        provider: input.paymentMethod,
        amount: finalAmount,
        status: PaymentStatus.PENDING,
      },
    });

    for (const item of input.items) {
      await createStockMovement(
        {
          productId: item.productId,
          type: StockMovementType.OUT,
          quantity: item.quantity,
          reason: StockReason.ORDER_PLACED,
          orderId: order.id,
          userId: input.userId,
        },
        tx,
      );
    }

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
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where }),
  ]);

  return { items, total, page, limit };
}

export async function getOrderById(id: string, userId?: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      payment: true,
      verification: true,
      earnings: true,
      affiliate: true,
    },
  });

  if (!order) throw new Error("Order not found");
  if (userId && order.userId !== userId) throw new Error("Forbidden");
  return order;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) throw new Error("Order not found");

  const restoreStatuses: OrderStatus[] = [OrderStatus.CANCELLED];
  const previousStatus = order.status;

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });

  if (
    restoreStatuses.includes(newStatus) &&
    !restoreStatuses.includes(previousStatus)
  ) {
    for (const item of order.items) {
      await createStockMovement({
        productId: item.productId,
        type: StockMovementType.IN,
        quantity: item.quantity,
        reason: StockReason.ORDER_CANCELLED,
        orderId: order.id,
      });
    }
  }

  if (newStatus === OrderStatus.COMPLETED && order.affiliateId) {
    const affiliateLink = await prisma.affiliateLink.findUnique({
      where: { id: order.affiliateId },
    });
    if (affiliateLink) {
      const commission = computeCommission(
        order.finalAmount,
        affiliateLink.commissionType,
        affiliateLink.commissionValue,
      );
      const existingEarning = await prisma.vendorEarning.findFirst({
        where: { orderId: order.id },
      });
      if (!existingEarning) {
        await prisma.vendorEarning.create({
          data: {
            vendorId: affiliateLink.vendorId,
            orderId: order.id,
            affiliateId: affiliateLink.id,
            commission,
          },
        });
      }
    }
  }

  return updated;
}
