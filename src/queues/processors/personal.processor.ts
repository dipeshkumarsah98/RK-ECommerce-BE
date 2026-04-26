import { Job } from "bullmq";
import { PersonalJobData, PersonalJobName } from "../jobs/personal.jobs.js";
import { logger } from "../../lib/logger.js";
import mailer from "../../config/mailer.config.js";
import {
  createWithdrawalRequestedEmail,
  createWithdrawalApprovedEmail,
  createWithdrawalRejectedEmail,
  createProfileUpdateEmail,
  createSecurityAlertEmail,
  BRAND_INFO,
} from "../../lib/email/index.js";

const SMTP_FROM = process.env.SMTP_FROM || BRAND_INFO.SUPPORT_EMAIL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "dipesh@mailinator.com";
const IS_DEV = process.env.NODE_ENV !== "production" || !process.env.SMTP_HOST;

/**
 * Process PERSONAL queue jobs based on job name
 */
export async function processPersonalJob(
  job: Job<PersonalJobData>,
): Promise<void> {
  const { name, data } = job;

  logger.info(
    { jobId: job.id, jobName: name, type: data.type },
    `Processing PERSONAL job: ${name}`,
  );

  switch (name) {
    case PersonalJobName.WITHDRAWAL_REQUESTED:
      await handleWithdrawalRequested(job);
      break;

    case PersonalJobName.WITHDRAWAL_PROCESSED:
      await handleWithdrawalProcessed(job);
      break;

    case PersonalJobName.PROFILE_UPDATE_NOTIFICATION:
      await handleProfileUpdateNotification(job);
      break;

    case PersonalJobName.SECURITY_ALERT:
      await handleSecurityAlert(job);
      break;

    default:
      logger.warn({ jobName: name }, `Unknown PERSONAL job name: ${name}`);
  }
}

/**
 * Handler for WITHDRAWAL_REQUESTED job
 */
async function handleWithdrawalRequested(
  job: Job<PersonalJobData>,
): Promise<void> {
  if (job.data.type !== "WITHDRAWAL_REQUESTED") return;

  const { vendorName, vendorEmail, amount, withdrawalId } = job.data;

  const { subject, html } = createWithdrawalRequestedEmail({
    vendorName,
    vendorEmail,
    amount,
    withdrawalId,
  });

  if (IS_DEV) {
    logger.info(
      { withdrawalId, jobId: job.id },
      "[PERSONAL QUEUE] Withdrawal requested notification (dev mode — not sent)",
    );
    logger.info({ subject }, "[PERSONAL QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to: ADMIN_EMAIL,
    subject,
    html,
  });

  logger.info({ withdrawalId }, "Withdrawal requested notification sent");
}

/**
 * Handler for WITHDRAWAL_PROCESSED job
 */
async function handleWithdrawalProcessed(
  job: Job<PersonalJobData>,
): Promise<void> {
  if (job.data.type !== "WITHDRAWAL_PROCESSED") return;

  const {
    to,
    vendorName,
    amount,
    status,
    transactionProof,
    rejectionReason,
    remarks,
  } = job.data;

  const { subject, html } =
    status === "APPROVED"
      ? createWithdrawalApprovedEmail({
          vendorName,
          amount,
          transactionProof,
          remarks,
        })
      : createWithdrawalRejectedEmail({
          vendorName,
          amount,
          rejectionReason,
          remarks,
        });

  if (IS_DEV) {
    logger.info(
      { to, status, jobId: job.id },
      "[PERSONAL QUEUE] Withdrawal processed notification (dev mode — not sent)",
    );
    logger.info({ subject }, "[PERSONAL QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, status }, "Withdrawal processed notification sent");
}

/**
 * Handler for PROFILE_UPDATE_NOTIFICATION job
 */
async function handleProfileUpdateNotification(
  job: Job<PersonalJobData>,
): Promise<void> {
  if (job.data.type !== "PROFILE_UPDATE_NOTIFICATION") return;

  const { to, userName, updatedFields } = job.data;

  const { subject, html } = createProfileUpdateEmail({
    userName,
    updatedFields,
  });

  if (IS_DEV) {
    logger.info(
      { to, userName, updatedFields, jobId: job.id },
      "[PERSONAL QUEUE] Profile update notification (dev mode — not sent)",
    );
    logger.info({ subject }, "[PERSONAL QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, userName }, "Profile update notification sent");
}

/**
 * Handler for SECURITY_ALERT job
 */
async function handleSecurityAlert(job: Job<PersonalJobData>): Promise<void> {
  if (job.data.type !== "SECURITY_ALERT") return;

  const { to, userName, alertType, details, ipAddress, timestamp } = job.data;

  const { subject, html } = createSecurityAlertEmail({
    userName,
    alertType,
    details,
    ipAddress,
    timestamp,
  });

  if (IS_DEV) {
    logger.info(
      { to, userName, alertType, jobId: job.id },
      "[PERSONAL QUEUE] Security alert (dev mode — not sent)",
    );
    logger.info({ subject }, "[PERSONAL QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, userName, alertType }, "Security alert sent");
}
