import { appEvents } from "../emitter.js";
import { AppEvent } from "../types.js";
import {
  sendOTP,
  sendWelcomeEmail,
  sendPasswordReset,
} from "../../queues/index.js";
import { logger } from "../../lib/logger.js";

/**
 * Register AUTH event handlers
 * These handlers queue email jobs when auth events occur
 */
export function registerAuthEventHandlers() {
  // Handle OTP requests
  appEvents.on(AppEvent.OTP_REQUESTED, async (payload) => {
    logger.info(
      { email: payload.email, purpose: payload.purpose },
      "OTP requested event received",
    );

    await sendOTP({
      to: payload.email,
      otp: payload.otp,
      purpose: payload.purpose,
    }).catch((error) => {
      logger.error({ error, payload }, "Failed to queue OTP email");
    });
  });

  // Handle user registration
  appEvents.on(AppEvent.USER_REGISTERED, async (payload) => {
    logger.info({ userId: payload.userId }, "User registered event received");

    await sendWelcomeEmail({
      to: payload.email,
      userName: payload.name,
      role: payload.role,
    }).catch((error) => {
      logger.error({ error, payload }, "Failed to queue welcome email");
    });
  });

  // Handle password reset requests
  appEvents.on(AppEvent.PASSWORD_RESET_REQUESTED, async (payload) => {
    logger.info(
      { userId: payload.userId },
      "Password reset requested event received",
    );

    await sendPasswordReset({
      to: payload.email,
      resetToken: payload.resetToken,
      userName: payload.userName,
    }).catch((error) => {
      logger.error({ error, payload }, "Failed to queue password reset email");
    });
  });

  // Handle user login (optional - for tracking/analytics)
  appEvents.on(AppEvent.USER_LOGIN, async (payload) => {
    logger.info(
      { userId: payload.userId, role: payload.role },
      "User login event received",
    );

    // Could trigger analytics, security checks, etc.
    // For now, just logging
  });

  // Handle password changed
  appEvents.on(AppEvent.PASSWORD_CHANGED, async (payload) => {
    logger.info(
      { userId: payload.userId },
      "Password changed event received",
    );

    // Could send security alert email
    // This is handled by SECURITY_ALERT event instead
  });

  logger.info("AUTH event handlers registered");
}
