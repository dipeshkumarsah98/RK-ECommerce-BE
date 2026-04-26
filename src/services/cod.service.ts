import {
  prisma,
  OrderStatus,
  VerificationStatus,
  StockMovementType,
} from "../lib/prisma.js";
import { updateOrderStatus } from "./order.service.js";
import { createStockMovement } from "./stock.service.js";
import { StockReason } from "../types/stock-movement.type.js";
import { AppEvent, appEvents, OrderCancelledPayload } from "../events/index.js";

export interface CODVerificationInput {
  orderId: string;
  adminId: string;
  verificationStatus: VerificationStatus;
  customerResponse: "intentional" | "not_intentional";
  remarks?: string;
}

export interface ListCODVerificationsFilters {
  status?: VerificationStatus;
  fromDate?: Date;
  toDate?: Date;
  search?: string;
  page?: number;
  limit?: number;
}

function emitOrderCancelledEvent(data: OrderCancelledPayload) {
  appEvents.emit(AppEvent.ORDER_CANCELLED, data);
}

export async function verifyCODOrder(input: CODVerificationInput) {
  const order = await prisma.order.findUnique({
    where: { id: input.orderId },
    include: {
      items: true,
      payment: true,
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      affiliate: true,
    },
  });

  if (!order) throw new Error("Order not found");
  if (order.paymentMethod !== "COD") {
    throw new Error("Order is not a COD order");
  }
  if (order.status !== OrderStatus.AWAITING_VERIFICATION) {
    throw new Error("Order is not awaiting verification");
  }

  const existing = await prisma.cODVerification.findUnique({
    where: { orderId: input.orderId },
  });
  if (existing) throw new Error("Order has already been verified");

  const verification = await prisma.cODVerification.create({
    data: {
      orderId: input.orderId,
      verifiedBy: input.adminId,
      verificationStatus: input.verificationStatus,
      customerResponse: input.customerResponse,
      remarks: input.remarks,
      verifiedAt: new Date(),
    },
  });

  if (input.verificationStatus === VerificationStatus.CONFIRMED) {
    await updateOrderStatus(input.orderId, OrderStatus.PROCESSING);

    /* Earnings should be calculated when order is delivered, not at verification time, to allow for cancellations and returns.
    if (order.affiliateId && order.affiliate) {
      const commission = computeCommission(
        order.totalAmount,
        order.affiliate.commissionType as any,
        order.affiliate.commissionValue,
      );
      const existingEarning = await prisma.vendorEarning.findFirst({
        where: { orderId: order.id },
      });
      if (!existingEarning) {
        await prisma.vendorEarning.create({
          data: {
            vendorId: order.affiliate.vendorId,
            orderId: order.id,
            affiliateId: order.affiliate.id,
            commission,
          },
        });
      }
    }
      */
  } else if (input.verificationStatus === VerificationStatus.REJECTED) {
    await updateOrderStatus(input.orderId, OrderStatus.CANCELLED);

    for (const item of order.items) {
      await createStockMovement({
        productId: item.productId,
        type: StockMovementType.IN,
        quantity: item.quantity,
        reason: StockReason.ORDER_CANCELLED,
        orderId: order.id,
        userId: input.adminId,
        notes: input.remarks || "COD verification rejected",
      });
    }
    if (order.user) {
      emitOrderCancelledEvent({
        orderId: order.id,
        userId: order.user.id,
        userEmail: order.user.email,
        paymentMethod: order.paymentMethod,
        reason: input.remarks || "COD verification rejected",
        refundAmount: order.totalAmount,
      });
    }
  }

  return verification;
}

/**
 * List COD orders with optional verification data
 * Search matches against order number, customer name, email, or phone
 * Status filter: PENDING (no verification yet), CONFIRMED, or REJECTED
 */
export async function listCODVerifications(
  filters: ListCODVerificationsFilters,
) {
  const { status, fromDate, toDate, search, page = 1, limit = 20 } = filters;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {
    paymentMethod: "COD",
  };

  // Filter by verification status
  if (status) {
    if (status === VerificationStatus.PENDING) {
      // PENDING means no verification record exists yet (order still AWAITING_VERIFICATION)
      where.verification = { is: null };
      where.status = OrderStatus.AWAITING_VERIFICATION;
    } else {
      // CONFIRMED or REJECTED means verification record exists with that status
      where.verification = {
        is: { verificationStatus: status },
      };
    }
  } else {
    // If no status filter, show orders that are either awaiting verification or have been verified
    where.status = {
      in: [
        OrderStatus.AWAITING_VERIFICATION,
        OrderStatus.PROCESSING,
        OrderStatus.CANCELLED,
      ],
    };
  }

  // Filter by date range (on order createdAt)
  if (fromDate || toDate) {
    where.createdAt = {};
    if (fromDate) {
      (where.createdAt as Record<string, unknown>).gte = fromDate;
    }
    if (toDate) {
      (where.createdAt as Record<string, unknown>).lte = toDate;
    }
  }

  // Search across order number, customer name, email, phone
  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: "insensitive" } },
      {
        user: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        },
      },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
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
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where }),
  ]);

  return { items, total, page, limit };
}

/**
 * Get COD verification statistics
 * Returns total COD orders, pending verification count, verified today count, and rejection rate
 */
export async function getCODStats() {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );

  const [
    totalCODOrders,
    pendingVerification,
    verifiedToday,
    totalVerifications,
    rejectedVerifications,
  ] = await Promise.all([
    // Total COD orders
    prisma.order.count({
      where: { paymentMethod: "COD" },
    }),

    // Pending verification (no verification record yet)
    prisma.order.count({
      where: {
        paymentMethod: "COD",
        status: OrderStatus.AWAITING_VERIFICATION,
        verification: { is: null },
      },
    }),

    // Verified today (verification record created today)
    prisma.cODVerification.count({
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    }),

    // Total verifications (for rejection rate calculation)
    prisma.cODVerification.count(),

    // Total rejected verifications
    prisma.cODVerification.count({
      where: { verificationStatus: VerificationStatus.REJECTED },
    }),
  ]);

  // Calculate rejection rate
  const rejectionRate =
    totalVerifications > 0
      ? ((rejectedVerifications / totalVerifications) * 100).toFixed(1)
      : "0.0";

  return {
    totalCODOrders,
    pendingVerification,
    verifiedToday,
    rejectionRate: `${rejectionRate}%`,
  };
}
