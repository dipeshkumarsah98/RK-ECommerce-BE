import { logger } from "./logger.js";

export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  if (process.env.NODE_ENV !== "production" || !process.env.SMTP_HOST) {
    logger.info({ email, otp }, "OTP email (dev mode — not sent)");
    return;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "noreply@example.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It expires in 10 minutes.`,
  });
}
