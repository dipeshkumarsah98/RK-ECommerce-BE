import { appEvents } from "../emitter.js";
import { AppEvent } from "../types.js";
import {
  sendProfileUpdateNotification,
  sendSecurityAlert,
} from "../../queues/index.js";
import { logger } from "../../lib/logger.js";

/**
 * Register USER/PROFILE event handlers
 * These handlers queue email jobs when user events occur
 */
export function registerUserEventHandlers() {
  // Handle profile updates
  appEvents.on(AppEvent.PROFILE_UPDATED, async (payload) => {
    logger.info(
      { userId: payload.userId },
      "Profile updated event received",
    );

    await sendProfileUpdateNotification({
      to: payload.email,
      userName: payload.userName,
      updatedFields: payload.updatedFields,
    }).catch((error) => {
      logger.error(
        { error, userId: payload.userId },
        "Failed to queue profile update notification",
      );
    });
  });

  // Handle email changes
  appEvents.on(AppEvent.EMAIL_CHANGED, async (payload) => {
    logger.info({ userId: payload.userId }, "Email changed event received");

    // Send security alert to both old and new email
    await Promise.all([
      sendSecurityAlert({
        to: payload.oldEmail,
        userName: payload.userName,
        alertType: "EMAIL_CHANGED",
        details: `Your email was changed to ${payload.newEmail}`,
        timestamp: new Date().toISOString(),
      }),
      sendSecurityAlert({
        to: payload.newEmail,
        userName: payload.userName,
        alertType: "EMAIL_CHANGED",
        details: `Your email was changed from ${payload.oldEmail}`,
        timestamp: new Date().toISOString(),
      }),
    ]).catch((error) => {
      logger.error(
        { error, userId: payload.userId },
        "Failed to queue email change alerts",
      );
    });
  });

  // Handle security alerts
  appEvents.on(AppEvent.SECURITY_ALERT, async (payload) => {
    logger.info(
      { userId: payload.userId, alertType: payload.alertType },
      "Security alert event received",
    );

    await sendSecurityAlert({
      to: payload.email,
      userName: payload.userName,
      alertType: payload.alertType,
      details: payload.details,
      ipAddress: payload.ipAddress,
      timestamp: new Date().toISOString(),
    }).catch((error) => {
      logger.error(
        { error, userId: payload.userId },
        "Failed to queue security alert",
      );
    });
  });

  // Handle password changes
  appEvents.on(AppEvent.PASSWORD_CHANGED, async (payload) => {
    logger.info(
      { userId: payload.userId },
      "Password changed event received",
    );

    // Emit a security alert
    appEvents.emit(AppEvent.SECURITY_ALERT, {
      userId: payload.userId,
      email: payload.email,
      userName: payload.userName,
      alertType: "PASSWORD_CHANGED",
      details: "Your password was recently changed",
      ipAddress: payload.ipAddress,
    });
  });

  logger.info("USER event handlers registered");
}
