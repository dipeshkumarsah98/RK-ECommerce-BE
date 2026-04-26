import { prisma } from "../lib/prisma.js";
import { generateOtp, otpExpiresAt } from "../lib/otp.js";
import { sendOtpEmail } from "../lib/email.js";
import { signToken } from "../lib/jwt.js";
import { BadRequestError } from "../lib/errors.js";
import { isDev } from "../lib/constant.js";
import { appEvents } from "../events/emitter.js";
import { AppEvent } from "../events/types.js";

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

  const code = isDev ? "123456" : generateOtp();
  const expiresAt = otpExpiresAt();

  await prisma.otpCode.create({
    data: { email, code, expiresAt },
  });

  // Emit OTP_REQUESTED event
  appEvents.emit(AppEvent.OTP_REQUESTED, {
    email,
    otp: code,
    purpose: "LOGIN",
  });
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
      data: {
        email,
        roles: ["customer"],
        name: email.split("@")[0], // Use email prefix as default name
      },
    });

    // Emit USER_REGISTERED event for new user
    appEvents.emit(AppEvent.USER_REGISTERED, {
      userId: user.id,
      email: user.email,
      name: user.name || "Customer",
      role: user.roles[0] || "customer",
    });
  } else {
    // Emit USER_LOGIN event for existing user
    appEvents.emit(AppEvent.USER_LOGIN, {
      userId: user.id,
      email: user.email,
      role: user.roles[0] || "customer",
    });
  }

  const token = signToken({ userId: user.id, roles: user.roles });
  return { token, user: { id: user.id, email: user.email, roles: user.roles } };
}
