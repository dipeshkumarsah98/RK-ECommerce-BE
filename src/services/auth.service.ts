import { prisma } from "../lib/prisma.js";
import { generateOtp, otpExpiresAt } from "../lib/otp.js";
import { sendOtpEmail } from "../lib/email.js";
import { signToken } from "../lib/jwt.js";
import { BadRequestError } from "../lib/errors.js";

export async function sendOtp(email: string): Promise<void> {
  // check if email exists or not
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new BadRequestError("Email not registered");
  }

  await prisma.otpCode.updateMany({
    where: { email, used: false },
    data: { used: true },
  });

  const code = generateOtp();
  const expiresAt = otpExpiresAt();

  await prisma.otpCode.create({
    data: { email, code, expiresAt },
  });

  await sendOtpEmail(email, code);
}

export async function verifyOtp(
  email: string,
  code: string,
): Promise<{
  token: string;
  user: { id: string; email: string; roles: string[] };
}> {
  const otpRecord = await prisma.otpCode.findFirst({
    where: {
      email,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
  });

  if (!otpRecord) {
    throw new Error("Invalid or expired OTP");
  }

  await prisma.otpCode.update({
    where: { id: otpRecord.id },
    data: { used: true },
  });

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { email, roles: ["customer"] },
    });
  }

  const token = signToken({ userId: user.id, roles: user.roles });
  return { token, user: { id: user.id, email: user.email, roles: user.roles } };
}
