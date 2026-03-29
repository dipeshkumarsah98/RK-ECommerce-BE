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

export type EmailJobData = OrderConfirmationJobData | AdminNewOrderJobData;

export const emailQueue = new Queue<EmailJobData>(EMAIL_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 200 },
  },
});

export async function enqueueOrderConfirmation(data: Omit<OrderConfirmationJobData, "type">) {
  return emailQueue.add("order-confirmation", { type: "ORDER_CONFIRMATION", ...data });
}

export async function enqueueAdminNewOrder(data: Omit<AdminNewOrderJobData, "type">) {
  return emailQueue.add("admin-new-order", { type: "ADMIN_NEW_ORDER", ...data });
}
