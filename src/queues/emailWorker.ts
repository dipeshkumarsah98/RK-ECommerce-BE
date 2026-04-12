import { Worker, Job } from "bullmq";
import { redisConnection } from "../lib/redis.js";
import { EMAIL_QUEUE_NAME, EmailJobData } from "./emailQueue.js";
import { logger } from "../lib/logger.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";

async function processEmailJob(job: Job<EmailJobData>): Promise<void> {
  const data = job.data;

  if (data.type === "ORDER_CONFIRMATION") {
    const itemLines = data.items
      .map((i) => `  - ${i.title} x${i.quantity} @ NPR ${i.price}`)
      .join("\n");

    const emailBody = `
Hello,

Your order has been placed successfully!

Order ID: ${data.orderId}
Payment Method: ${data.paymentMethod}
Total: NPR ${data.finalAmount}

Items:
${itemLines}

Thank you for shopping with us.
    `.trim();

    if (process.env.NODE_ENV !== "production" || !process.env.SMTP_HOST) {
      logger.info(
        { to: data.to, orderId: data.orderId, jobId: job.id },
        "[EMAIL QUEUE] Order confirmation email (dev mode — not sent)",
      );
      logger.info({ body: emailBody }, "[EMAIL QUEUE] Email body preview");
      return;
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@example.com",
      to: data.to,
      subject: `Order Confirmed — #${data.orderId.slice(0, 8).toUpperCase()}`,
      text: emailBody,
    });

    logger.info(
      { to: data.to, orderId: data.orderId },
      "Order confirmation email sent",
    );
  }

  if (data.type === "ADMIN_NEW_ORDER") {
    const emailBody = `
New order received!

Order ID: ${data.orderId}
Payment Method: ${data.paymentMethod}
Amount: NPR ${data.finalAmount}
Customer: ${data.customerEmail || "Guest"}

Please review this order in the admin panel.
    `.trim();

    if (process.env.NODE_ENV !== "production" || !process.env.SMTP_HOST) {
      logger.info(
        { orderId: data.orderId, jobId: job.id },
        "[EMAIL QUEUE] Admin new-order notification (dev mode — not sent)",
      );
      logger.info({ body: emailBody }, "[EMAIL QUEUE] Email body preview");
      return;
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@example.com",
      to: ADMIN_EMAIL,
      subject: `New Order — #${data.orderId.slice(0, 8).toUpperCase()}`,
      text: emailBody,
    });

    logger.info({ orderId: data.orderId }, "Admin new-order notification sent");
  }

  if (data.type === "WITHDRAWAL_REQUESTED") {
    const emailBody = `
New withdrawal request received!

Vendor: ${data.vendorName}
Email: ${data.vendorEmail}
Amount: NPR ${data.amount}
Withdrawal ID: ${data.withdrawalId}

Please review this withdrawal request in the admin panel.
    `.trim();

    if (process.env.NODE_ENV !== "production" || !process.env.SMTP_HOST) {
      logger.info(
        { withdrawalId: data.withdrawalId, jobId: job.id },
        "[EMAIL QUEUE] Withdrawal requested notification (dev mode — not sent)",
      );
      logger.info({ body: emailBody }, "[EMAIL QUEUE] Email body preview");
      return;
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@example.com",
      to: ADMIN_EMAIL,
      subject: `Withdrawal Request — ${data.vendorName}`,
      text: emailBody,
    });

    logger.info(
      { withdrawalId: data.withdrawalId },
      "Withdrawal requested notification sent",
    );
  }

  if (data.type === "WITHDRAWAL_PROCESSED") {
    const statusText = data.status === "APPROVED" ? "approved" : "rejected";
    let emailBody = `
Hello ${data.vendorName},

Your withdrawal request for NPR ${data.amount} has been ${statusText}.
`;

    if (data.status === "APPROVED" && data.transactionProof) {
      emailBody += `\nTransaction Proof: ${data.transactionProof}`;
    }

    if (data.status === "REJECTED" && data.rejectionReason) {
      emailBody += `\nReason: ${data.rejectionReason}`;
    }

    if (data.remarks) {
      emailBody += `\n\nRemarks: ${data.remarks}`;
    }

    emailBody += `\n\nThank you.`;
    emailBody = emailBody.trim();

    if (process.env.NODE_ENV !== "production" || !process.env.SMTP_HOST) {
      logger.info(
        { to: data.to, status: data.status, jobId: job.id },
        "[EMAIL QUEUE] Withdrawal processed notification (dev mode — not sent)",
      );
      logger.info({ body: emailBody }, "[EMAIL QUEUE] Email body preview");
      return;
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@example.com",
      to: data.to,
      subject: `Withdrawal Request ${data.status === "APPROVED" ? "Approved" : "Rejected"}`,
      text: emailBody,
    });

    logger.info(
      { to: data.to, status: data.status },
      "Withdrawal processed notification sent",
    );
  }
}

export function startEmailWorker() {
  const worker = new Worker<EmailJobData>(EMAIL_QUEUE_NAME, processEmailJob, {
    connection: redisConnection,
    concurrency: 5,
  });

  worker.on("completed", (job) => {
    logger.info({ jobId: job.id, type: job.data.type }, "Email job completed");
  });

  worker.on("failed", (job, err) => {
    logger.error(
      { jobId: job?.id, type: job?.data?.type, err },
      "Email job failed",
    );
  });

  logger.info("Email worker started");
  return worker;
}
