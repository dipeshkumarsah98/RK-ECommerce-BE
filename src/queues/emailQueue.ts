import { Queue } from "bullmq";
import { redisConnection } from "../lib/redis.js";

export const EMAIL_QUEUE_NAME = "emails";

export interface OrderConfirmationJobData {
  type: "ORDER_CONFIRMATION";
  to: string;
  orderId: string;
  finalAmount: number;
  paymentMethod: string;
  items: Array<{ title: string; quantity: number; price: number }>;
}

export interface AdminNewOrderJobData {
  type: "ADMIN_NEW_ORDER";
  orderId: string;
  finalAmount: number;
  paymentMethod: string;
  customerEmail?: string;
}

export interface WithdrawalRequestedJobData {
  type: "WITHDRAWAL_REQUESTED";
  vendorName: string;
  vendorEmail: string;
  amount: number;
  withdrawalId: string;
}

export interface WithdrawalProcessedJobData {
  type: "WITHDRAWAL_PROCESSED";
  to: string;
  vendorName: string;
  amount: number;
  status: "APPROVED" | "REJECTED";
  transactionProof?: string;
  rejectionReason?: string;
  remarks?: string;
}

export type EmailJobData =
  | OrderConfirmationJobData
  | AdminNewOrderJobData
  | WithdrawalRequestedJobData
  | WithdrawalProcessedJobData;

export const emailQueue = new Queue<EmailJobData>(EMAIL_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 200 },
  },
});

export async function enqueueOrderConfirmation(
  data: Omit<OrderConfirmationJobData, "type">,
) {
  return emailQueue.add("order-confirmation", {
    type: "ORDER_CONFIRMATION",
    ...data,
  });
}

export async function enqueueAdminNewOrder(
  data: Omit<AdminNewOrderJobData, "type">,
) {
  return emailQueue.add("admin-new-order", {
    type: "ADMIN_NEW_ORDER",
    ...data,
  });
}

export async function enqueueWithdrawalRequested(
  data: Omit<WithdrawalRequestedJobData, "type">,
) {
  return emailQueue.add("withdrawal-requested", {
    type: "WITHDRAWAL_REQUESTED",
    ...data,
  });
}

export async function enqueueWithdrawalProcessed(
  data: Omit<WithdrawalProcessedJobData, "type">,
) {
  return emailQueue.add("withdrawal-processed", {
    type: "WITHDRAWAL_PROCESSED",
    ...data,
  });
}
