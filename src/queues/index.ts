/**
 * Queue System - Main Entry Point
 *
 * This module provides a comprehensive queue management system using BullMQ
 * with Singleton and Factory design patterns.
 *
 * Usage:
 * ```typescript
 * import { queueManager, workerManager, addAuthJob, addOrdersJob } from './queues';
 *
 * // Start all workers (typically in index.ts)
 * workerManager.startAllWorkers();
 *
 * // Add jobs to queues
 * await addAuthJob('send-otp', { type: 'SEND_OTP', to: 'user@example.com', otp: '123456', purpose: 'LOGIN' });
 * await addOrdersJob('order-confirmation', { type: 'ORDER_CONFIRMATION', ... });
 * ```
 */

// Core managers
export { QueueManager, queueManager } from "./QueueManager.js";
export { WorkerManager, workerManager } from "./WorkerManager.js";
export { QueueFactory } from "./QueueFactory.js";

// Types
export { QueueName } from "./types.js";
export type {
  BaseJobData,
  QueueConfig,
  QueueInstance,
  JobProcessor,
} from "./types.js";

// Job types - AUTH
export {
  AuthJobName,
  type AuthJobData,
  type SendOTPJobData,
  type SendWelcomeEmailJobData,
  type SendPasswordResetJobData,
  type SendAccountVerificationJobData,
} from "./jobs/auth.jobs.js";

// Job types - ORDERS
export {
  OrdersJobName,
  type OrdersJobData,
  type OrderConfirmationJobData,
  type AdminNewOrderJobData,
  type OrderStatusUpdateJobData,
  type OrderCancelledJobData,
  type OrderShippedJobData,
  type OrderDeliveredJobData,
  type AdminOrderDeliveredJobData,
} from "./jobs/orders.jobs.js";

// Job types - PERSONAL
export {
  PersonalJobName,
  type PersonalJobData,
  type WithdrawalRequestedJobData,
  type WithdrawalProcessedJobData,
  type ProfileUpdateNotificationJobData,
  type SecurityAlertJobData,
} from "./jobs/personal.jobs.js";

// Re-export Job type from BullMQ for convenience
export type { Job } from "bullmq";

// ========================================
// HELPER FUNCTIONS FOR ADDING JOBS
// ========================================

import { queueManager } from "./QueueManager.js";
import { QueueName } from "./types.js";
import type { Job } from "bullmq";

// AUTH Queue Helpers
import type {
  AuthJobData,
  SendOTPJobData,
  SendWelcomeEmailJobData,
  SendPasswordResetJobData,
  SendAccountVerificationJobData,
} from "./jobs/auth.jobs.js";
import { AuthJobName } from "./jobs/auth.jobs.js";

/**
 * Add a job to the AUTH queue
 */
export async function addAuthJob(
  jobName: string,
  data: AuthJobData,
): Promise<Job<AuthJobData>> {
  return queueManager.addJob(QueueName.AUTH, jobName, data);
}

/**
 * Send OTP email
 */
export async function sendOTP(
  data: Omit<SendOTPJobData, "type">,
): Promise<Job<AuthJobData>> {
  return addAuthJob(AuthJobName.SEND_OTP, {
    ...data,
    type: "SEND_OTP",
  } as SendOTPJobData);
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(
  data: Omit<SendWelcomeEmailJobData, "type">,
): Promise<Job<AuthJobData>> {
  return addAuthJob(AuthJobName.SEND_WELCOME_EMAIL, {
    ...data,
    type: "SEND_WELCOME_EMAIL",
  } as SendWelcomeEmailJobData);
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(
  data: Omit<SendPasswordResetJobData, "type">,
): Promise<Job<AuthJobData>> {
  return addAuthJob(AuthJobName.SEND_PASSWORD_RESET, {
    ...data,
    type: "SEND_PASSWORD_RESET",
  } as SendPasswordResetJobData);
}

/**
 * Send account verification email
 */
export async function sendAccountVerification(
  data: Omit<SendAccountVerificationJobData, "type">,
): Promise<Job<AuthJobData>> {
  return addAuthJob(AuthJobName.SEND_ACCOUNT_VERIFICATION, {
    ...data,
    type: "SEND_ACCOUNT_VERIFICATION",
  } as SendAccountVerificationJobData);
}

// ORDERS Queue Helpers
import type {
  OrdersJobData,
  OrderConfirmationJobData,
  AdminNewOrderJobData,
  OrderStatusUpdateJobData,
  OrderCancelledJobData,
  OrderShippedJobData,
  OrderDeliveredJobData,
  AdminOrderDeliveredJobData,
} from "./jobs/orders.jobs.js";
import { OrdersJobName } from "./jobs/orders.jobs.js";

/**
 * Add a job to the ORDERS queue
 */
export async function addOrdersJob(
  jobName: string,
  data: OrdersJobData,
): Promise<Job<OrdersJobData>> {
  return queueManager.addJob(QueueName.ORDERS, jobName, data);
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(
  data: Omit<OrderConfirmationJobData, "type">,
): Promise<Job<OrdersJobData>> {
  return addOrdersJob(OrdersJobName.ORDER_CONFIRMATION, {
    ...data,
    type: "ORDER_CONFIRMATION",
  } as OrderConfirmationJobData);
}

/**
 * Send admin new order notification
 */
export async function sendAdminNewOrder(
  data: Omit<AdminNewOrderJobData, "type">,
): Promise<Job<OrdersJobData>> {
  return addOrdersJob(OrdersJobName.ADMIN_NEW_ORDER, {
    ...data,
    type: "ADMIN_NEW_ORDER",
  } as AdminNewOrderJobData);
}

/**
 * Send order status update email
 */
export async function sendOrderStatusUpdate(
  data: Omit<OrderStatusUpdateJobData, "type">,
): Promise<Job<OrdersJobData>> {
  return addOrdersJob(OrdersJobName.ORDER_STATUS_UPDATE, {
    ...data,
    type: "ORDER_STATUS_UPDATE",
  } as OrderStatusUpdateJobData);
}

/**
 * Send order cancelled email
 */
export async function sendOrderCancelled(
  data: Omit<OrderCancelledJobData, "type">,
): Promise<Job<OrdersJobData>> {
  return addOrdersJob(OrdersJobName.ORDER_CANCELLED, {
    ...data,
    type: "ORDER_CANCELLED",
  } as OrderCancelledJobData);
}

/**
 * Send order shipped email
 */
export async function sendOrderShipped(
  data: Omit<OrderShippedJobData, "type">,
): Promise<Job<OrdersJobData>> {
  return addOrdersJob(OrdersJobName.ORDER_SHIPPED, {
    ...data,
    type: "ORDER_SHIPPED",
  } as OrderShippedJobData);
}

/**
 * Send order delivered email (to customer)
 */
export async function sendOrderDelivered(
  data: Omit<OrderDeliveredJobData, "type">,
): Promise<Job<OrdersJobData>> {
  return addOrdersJob(OrdersJobName.ORDER_DELIVERED, {
    ...data,
    type: "ORDER_DELIVERED",
  } as OrderDeliveredJobData);
}

/**
 * Send admin order delivered notification
 */
export async function sendAdminOrderDelivered(
  data: Omit<AdminOrderDeliveredJobData, "type">,
): Promise<Job<OrdersJobData>> {
  return addOrdersJob(OrdersJobName.ADMIN_ORDER_DELIVERED, {
    ...data,
    type: "ADMIN_ORDER_DELIVERED",
  } as AdminOrderDeliveredJobData);
}

// PERSONAL Queue Helpers
import type {
  PersonalJobData,
  WithdrawalRequestedJobData,
  WithdrawalProcessedJobData,
  ProfileUpdateNotificationJobData,
  SecurityAlertJobData,
} from "./jobs/personal.jobs.js";
import { PersonalJobName } from "./jobs/personal.jobs.js";

/**
 * Add a job to the PERSONAL queue
 */
export async function addPersonalJob(
  jobName: string,
  data: PersonalJobData,
): Promise<Job<PersonalJobData>> {
  return queueManager.addJob(QueueName.PERSONAL, jobName, data);
}

/**
 * Send withdrawal requested notification
 */
export async function sendWithdrawalRequested(
  data: Omit<WithdrawalRequestedJobData, "type">,
): Promise<Job<PersonalJobData>> {
  return addPersonalJob(PersonalJobName.WITHDRAWAL_REQUESTED, {
    ...data,
    type: "WITHDRAWAL_REQUESTED",
  } as WithdrawalRequestedJobData);
}

/**
 * Send withdrawal processed notification
 */
export async function sendWithdrawalProcessed(
  data: Omit<WithdrawalProcessedJobData, "type">,
): Promise<Job<PersonalJobData>> {
  return addPersonalJob(PersonalJobName.WITHDRAWAL_PROCESSED, {
    ...data,
    type: "WITHDRAWAL_PROCESSED",
  } as WithdrawalProcessedJobData);
}

/**
 * Send profile update notification
 */
export async function sendProfileUpdateNotification(
  data: Omit<ProfileUpdateNotificationJobData, "type">,
): Promise<Job<PersonalJobData>> {
  return addPersonalJob(PersonalJobName.PROFILE_UPDATE_NOTIFICATION, {
    ...data,
    type: "PROFILE_UPDATE_NOTIFICATION",
  } as ProfileUpdateNotificationJobData);
}

/**
 * Send security alert
 */
export async function sendSecurityAlert(
  data: Omit<SecurityAlertJobData, "type">,
): Promise<Job<PersonalJobData>> {
  return addPersonalJob(PersonalJobName.SECURITY_ALERT, {
    ...data,
    type: "SECURITY_ALERT",
  } as SecurityAlertJobData);
}
