import { OrderStatus, VerificationStatus } from "../generated/prisma/index.js";
import { prisma } from "../lib/prisma.js";
import { updateOrderStatus } from "./order.service.js";
import { computeCommission } from "./affiliate.service.js";
import { StockMovementType } from "../generated/prisma/index.js";
import { createStockMovement } from "./stock.service.js";

export interface CODVerificationInput {
  orderId: string;
  adminId: string;
  verificationStatus: VerificationStatus;
  customerResponse: "intentional" | "not_intentional";
  remarks?: string;
}

export async function verifyCODOrder(input: CODVerificationInput) {
  const order = await prisma.order.findUnique({
    where: { id: input.orderId },
    include: { items: true, payment: true, affiliate: true },
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

    if (order.affiliateId && order.affiliate) {
      const commission = computeCommission(
        order.finalAmount,
        order.affiliate.commissionType,
        order.affiliate.commissionValue
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
  } else if (input.verificationStatus === VerificationStatus.REJECTED) {
    await updateOrderStatus(input.orderId, OrderStatus.CANCELLED);

    for (const item of order.items) {
      await createStockMovement({
        productId: item.productId,
        type: StockMovementType.IN,
        quantity: item.quantity,
        reason: "ORDER_CANCELLED",
        orderId: order.id,
        userId: input.adminId,
        notes: "COD verification rejected",
      });
    }
  }

  return verification;
}
