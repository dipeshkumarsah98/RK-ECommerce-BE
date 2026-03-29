import { isDev } from "./constant.js";
import { logger } from "./logger.js";

export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  if (isDev) {
    logger.info(`DEV MODE: OTP for ${email} is ${otp}`);
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

  const res = await transporter.sendMail({
    from: process.env.SMTP_USER || "noreply@example.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It expires in 10 minutes.`,
  });

  console.log("OTP email sent:", res);
}
