import { Job } from "bullmq";
import { AuthJobData, AuthJobName } from "../jobs/auth.jobs.js";
import { logger } from "../../lib/logger.js";
import mailer from "../../config/mailer.config.js";
import {
  createOTPEmail,
  createWelcomeEmail,
  createPasswordResetEmail,
  createAccountVerificationEmail,
  BRAND_INFO,
} from "../../lib/email/index.js";

const SMTP_FROM = process.env.SMTP_FROM || BRAND_INFO.SUPPORT_EMAIL;
const IS_DEV = process.env.NODE_ENV !== "production" || !process.env.SMTP_HOST;

/**
 * Process AUTH queue jobs based on job name
 */
export async function processAuthJob(job: Job<AuthJobData>): Promise<void> {
  const { name, data } = job;

  logger.info(
    { jobId: job.id, jobName: name, type: data.type },
    `Processing AUTH job: ${name}`,
  );

  switch (name) {
    case AuthJobName.SEND_OTP:
      await handleSendOTP(job);
      break;

    case AuthJobName.SEND_WELCOME_EMAIL:
      await handleSendWelcomeEmail(job);
      break;

    case AuthJobName.SEND_PASSWORD_RESET:
      await handleSendPasswordReset(job);
      break;

    case AuthJobName.SEND_ACCOUNT_VERIFICATION:
      await handleSendAccountVerification(job);
      break;

    default:
      logger.warn({ jobName: name }, `Unknown AUTH job name: ${name}`);
  }
}

/**
 * Handler for SEND_OTP job
 */
async function handleSendOTP(job: Job<AuthJobData>): Promise<void> {
  if (job.data.type !== "SEND_OTP") return;

  const { to, otp, purpose } = job.data;

  const { subject, html } = createOTPEmail({ otp, purpose });

  if (IS_DEV) {
    logger.info(
      { to, otp, purpose, jobId: job.id },
      "[AUTH QUEUE] OTP email (dev mode — not sent)",
    );
    logger.info({ subject }, "[AUTH QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, purpose }, "OTP email sent");
}

/**
 * Handler for SEND_WELCOME_EMAIL job
 */
async function handleSendWelcomeEmail(job: Job<AuthJobData>): Promise<void> {
  if (job.data.type !== "SEND_WELCOME_EMAIL") return;

  const { to, userName, role } = job.data;

  const { subject, html } = createWelcomeEmail({ userName, role });

  if (IS_DEV) {
    logger.info(
      { to, userName, role, jobId: job.id },
      "[AUTH QUEUE] Welcome email (dev mode — not sent)",
    );
    logger.info({ subject }, "[AUTH QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, userName }, "Welcome email sent");
}

/**
 * Handler for SEND_PASSWORD_RESET job
 */
async function handleSendPasswordReset(job: Job<AuthJobData>): Promise<void> {
  if (job.data.type !== "SEND_PASSWORD_RESET") return;

  const { to, resetToken, userName } = job.data;

  const { subject, html } = createPasswordResetEmail({ userName, resetToken });

  if (IS_DEV) {
    logger.info(
      { to, userName, jobId: job.id },
      "[AUTH QUEUE] Password reset email (dev mode — not sent)",
    );
    logger.info({ subject }, "[AUTH QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, userName }, "Password reset email sent");
}

/**
 * Handler for SEND_ACCOUNT_VERIFICATION job
 */
async function handleSendAccountVerification(
  job: Job<AuthJobData>,
): Promise<void> {
  if (job.data.type !== "SEND_ACCOUNT_VERIFICATION") return;

  const { to, verificationToken, userName } = job.data;

  const { subject, html } = createAccountVerificationEmail({
    userName,
    verificationToken,
  });

  if (IS_DEV) {
    logger.info(
      { to, userName, jobId: job.id },
      "[AUTH QUEUE] Account verification email (dev mode — not sent)",
    );
    logger.info({ subject }, "[AUTH QUEUE] Email subject");
    return;
  }

  await mailer.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html,
  });

  logger.info({ to, userName }, "Account verification email sent");
}
