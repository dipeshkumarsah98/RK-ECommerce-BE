import { Job } from "bullmq";
import { OrdersJobData, OrdersJobName } from "../jobs/orders.jobs.js";
import { logger } from "../../lib/logger.js";
import mailer from "../../config/mailer.config.js";
import {
  createOrderConfirmationEmail,
  createAdminNewOrderEmail,
  createOrderStatusUpdateEmail,
  createOrderCancelledEmail,
  createOrderShippedEmail,
  createOrderDeliveredEmail,
  createAdminOrderDeliveredEmail,
  BRAND_INFO,
} from "../../lib/email/index.js";

const SMTP_FROM = process.env.SMTP_FROM || BRAND_INFO.SUPPORT_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "dipesh@mailinator.com";
const IS_DEV = process.env.NODE_ENV !== "production" || !process.env.SMTP_HOST;

/**
 * Process ORDERS queue jobs based on job name
 */
export async function processOrdersJob(job: Job<OrdersJobData>): Promise<void> {
  const { name, data } = job;

  logger.info(
    { jobId: job.id, jobName: name, type: data.type },
    `Processing ORDERS job: ${name}`,
  );

  switch (name) {
    case OrdersJobName.ORDER_CONFIRMATION:
      await handleOrderConfirmation(job);
      break;

    case OrdersJobName.ADMIN_NEW_ORDER:
      await handleAdminNewOrder(job);
      break;

    case OrdersJobName.ORDER_STATUS_UPDATE:
      await handleOrderStatusUpdate(job);
      break;

    case OrdersJobName.ORDER_CANCELLED:
      await handleOrderCancelled(job);
      break;

    case OrdersJobName.ORDER_SHIPPED:
      await handleOrderShipped(job);
      break;

    case OrdersJobName.ORDER_DELIVERED:
      await handleOrderDelivered(job);
      break;

    case OrdersJobName.ADMIN_ORDER_DELIVERED:
      await handleAdminOrderDelivered(job);
      break;

    default:
      logger.warn({ jobName: name }, `Unknown ORDERS job name: ${name}`);
  }
}

/**
 * Handler for ORDER_CONFIRMATION job
 */
async function handleOrderConfirmation(job: Job<OrdersJobData>): Promise<void> {
  if (job.data.type !== "ORDER_CONFIRMATION") return;

  const {
    to,
    orderId,
    subtotal,
    discountAmount,
    taxAmount,
    shippingAmount,
    totalAmount,
    finalAmount,
    paymentMethod,
    items,
  } = job.data;

  const { subject, html } = createOrderConfirmationEmail({
    orderId,
    subtotal,
    discountAmount,
    taxAmount,
    shippingAmount,
    totalAmount,
    finalAmount,
    paymentMethod,
    items,
  });

  if (IS_DEV) {
    logger.info(
      { to, orderId, jobId: job.id },
      "[ORDERS QUEUE] Order confirmation email (dev mode — not sent)",
    );
    logger.info({ subject }, "[ORDERS QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, orderId }, "Order confirmation email sent");
}

/**
 * Handler for ADMIN_NEW_ORDER job
 */
async function handleAdminNewOrder(job: Job<OrdersJobData>): Promise<void> {
  if (job.data.type !== "ADMIN_NEW_ORDER") return;

  const { orderId, finalAmount, paymentMethod, customerEmail } = job.data;

  const { subject, html } = createAdminNewOrderEmail({
    orderId,
    finalAmount,
    paymentMethod,
    customerEmail,
  });

  if (IS_DEV) {
    logger.info(
      { orderId, jobId: job.id },
      "[ORDERS QUEUE] Admin new-order notification (dev mode — not sent)",
    );
    logger.info({ subject }, "[ORDERS QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to: ADMIN_EMAIL,
    subject,
    html,
  });

  logger.info({ orderId }, "Admin new-order notification sent");
}

/**
 * Handler for ORDER_STATUS_UPDATE job
 */
async function handleOrderStatusUpdate(job: Job<OrdersJobData>): Promise<void> {
  if (job.data.type !== "ORDER_STATUS_UPDATE") return;

  const { to, orderId, status, trackingNumber } = job.data;

  const { subject, html } = createOrderStatusUpdateEmail({
    orderId,
    status,
    trackingNumber,
  });

  if (IS_DEV) {
    logger.info(
      { to, orderId, status, jobId: job.id },
      "[ORDERS QUEUE] Order status update email (dev mode — not sent)",
    );
    logger.info({ subject }, "[ORDERS QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, orderId, status }, "Order status update email sent");
}

/**
 * Handler for ORDER_CANCELLED job
 */
async function handleOrderCancelled(job: Job<OrdersJobData>): Promise<void> {
  if (job.data.type !== "ORDER_CANCELLED") return;

  const { to, orderId, paymentMethod, reason, refundAmount } = job.data;

  const { subject, html } = createOrderCancelledEmail({
    orderId,
    paymentMethod,
    reason,
    refundAmount,
  });

  if (IS_DEV) {
    logger.info(
      { to, orderId, jobId: job.id },
      "[ORDERS QUEUE] Order cancelled email (dev mode — not sent)",
    );
    logger.info({ subject }, "[ORDERS QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, orderId }, "Order cancelled email sent");
}

/**
 * Handler for ORDER_SHIPPED job
 */
async function handleOrderShipped(job: Job<OrdersJobData>): Promise<void> {
  if (job.data.type !== "ORDER_SHIPPED") return;

  const { to, orderId, trackingNumber, courierService, estimatedDelivery } =
    job.data;

  const { subject, html } = createOrderShippedEmail({
    orderId,
    trackingNumber,
    courierService,
    estimatedDelivery,
  });

  if (IS_DEV) {
    logger.info(
      { to, orderId, trackingNumber, jobId: job.id },
      "[ORDERS QUEUE] Order shipped email (dev mode — not sent)",
    );
    logger.info({ subject }, "[ORDERS QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, orderId, trackingNumber }, "Order shipped email sent");
}

/**
 * Handler for ORDER_DELIVERED job (Customer notification)
 */
async function handleOrderDelivered(job: Job<OrdersJobData>): Promise<void> {
  if (job.data.type !== "ORDER_DELIVERED") return;

  const { to, orderId, deliveredAt } = job.data;

  const { subject, html } = createOrderDeliveredEmail({
    orderId,
    deliveredAt,
  });

  if (IS_DEV) {
    logger.info(
      { to, orderId, jobId: job.id },
      "[ORDERS QUEUE] Order delivered email (dev mode — not sent)",
    );
    logger.info({ subject }, "[ORDERS QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, orderId }, "Order delivered email sent");
}

/**
 * Handler for ADMIN_ORDER_DELIVERED job (Admin notification)
 */
async function handleAdminOrderDelivered(
  job: Job<OrdersJobData>,
): Promise<void> {
  if (job.data.type !== "ADMIN_ORDER_DELIVERED") return;

  const { orderId, customerEmail, deliveredAt } = job.data;

  const { subject, html } = createAdminOrderDeliveredEmail({
    orderId,
    customerEmail,
    deliveredAt,
  });

  if (IS_DEV) {
    logger.info(
      { orderId, jobId: job.id },
      "[ORDERS QUEUE] Admin order delivered notification (dev mode — not sent)",
    );
    logger.info({ subject }, "[ORDERS QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to: ADMIN_EMAIL,
    subject,
    html,
  });

  logger.info({ orderId }, "Admin order delivered notification sent");
}
