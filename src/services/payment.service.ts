import { prisma, OrderStatus, PaymentStatus } from "../lib/prisma.js";
import { updateOrderStatus } from "./order.service.js";

export interface InitiatePaymentInput {
  orderId: string;
  provider: "ESEWA" | "KHALTI";
  returnUrl: string;
  failureUrl?: string;
}

export async function initiatePayment(input: InitiatePaymentInput) {
  const order = await prisma.order.findUnique({
    where: { id: input.orderId },
    include: { payment: true },
  });

  if (!order) throw new Error("Order not found");
  if (order.status !== OrderStatus.PENDING) {
    throw new Error("Order is not in a payable state");
  }
  if (!order.payment) throw new Error("Payment record not found");

  const paymentUrl = buildPaymentUrl(input.provider, {
    orderId: order.id,
    amount: order.finalAmount,
    returnUrl: input.returnUrl,
    failureUrl: input.failureUrl,
  });

  return { paymentUrl, orderId: order.id, amount: order.finalAmount };
}

function buildPaymentUrl(
  provider: string,
  opts: {
    orderId: string;
    amount: number;
    returnUrl: string;
    failureUrl?: string;
  },
): string {
  if (provider === "ESEWA") {
    const baseUrl =
      process.env.ESEWA_BASE_URL || "https://uat.esewa.com.np/epay/main";
    const params = new URLSearchParams({
      amt: String(opts.amount),
      psc: "0",
      pdc: "0",
      txAmt: "0",
      tAmt: String(opts.amount),
      pid: opts.orderId,
      scd: process.env.ESEWA_MERCHANT_CODE || "EPAYTEST",
      su: opts.returnUrl,
      fu: opts.failureUrl || opts.returnUrl,
    });
    return `${baseUrl}?${params.toString()}`;
  }

  if (provider === "KHALTI") {
    return `https://khalti.com/checkout/${opts.orderId}?amount=${opts.amount * 100}`;
  }

  throw new Error("Unsupported payment provider");
}

export interface PaymentCallbackInput {
  provider: "ESEWA" | "KHALTI";
  orderId: string;
  transactionId: string;
  status: "SUCCESS" | "FAILED";
  amount?: number;
}

export async function handlePaymentCallback(input: PaymentCallbackInput) {
  const payment = await prisma.payment.findUnique({
    where: { orderId: input.orderId },
  });

  if (!payment) throw new Error("Payment record not found");

  if (payment.status === PaymentStatus.SUCCESS) {
    return { message: "Payment already processed (idempotent)", payment };
  }

  const newPaymentStatus =
    input.status === "SUCCESS" ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;

  const updatedPayment = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: newPaymentStatus,
      transactionId: input.transactionId,
      paidAt: newPaymentStatus === PaymentStatus.SUCCESS ? new Date() : null,
    },
  });

  if (newPaymentStatus === PaymentStatus.SUCCESS) {
    await updateOrderStatus(input.orderId, OrderStatus.PROCESSING);
  } else {
    await updateOrderStatus(input.orderId, OrderStatus.CANCELLED);
  }

  return { message: "Payment callback processed", payment: updatedPayment };
}
