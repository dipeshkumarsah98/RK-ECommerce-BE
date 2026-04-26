import {
  createEmailTemplate,
  createInfoBox,
  createButton,
} from "../base-template.js";
import { BRAND_COLORS, BRAND_INFO } from "../constants.js";

/**
 * Profile Update Notification Email Template
 */
export function createProfileUpdateEmail(data: {
  userName: string;
  updatedFields: string[];
}): { subject: string; html: string } {
  const fieldsList = data.updatedFields
    .map((field) => `<li style="margin: 4px 0;">${field}</li>`)
    .join("");

  const content = `
    <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
      Profile Updated
    </h1>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Hi <strong>${data.userName}</strong>,
    </p>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Your profile has been successfully updated.
    </p>
    
    <div class="highlight-box" style="background-color: ${BRAND_COLORS.BACKGROUND}; border-left: 4px solid ${BRAND_COLORS.PRIMARY}; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Updated Fields:
      </p>
      <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.TEXT_SECONDARY}; font-size: 14px;">
        ${fieldsList}
      </ul>
    </div>
    
    <div style="background-color: ${BRAND_COLORS.BACKGROUND}; padding: 20px; border-radius: 8px; margin: 30px 0; border: 1px solid ${BRAND_COLORS.BORDER};">
      <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">⚠️ Security Notice:</strong><br>
        If you didn't make these changes, please contact our support team immediately.
      </p>
    </div>
    
    ${createButton("View Your Profile", `${BRAND_INFO.WEBSITE_URL}/profile`)}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      Need help? Contact us at 
      <a href="mailto:${BRAND_INFO.SUPPORT_EMAIL}" style="color: ${BRAND_COLORS.PRIMARY}; text-decoration: none;">${BRAND_INFO.SUPPORT_EMAIL}</a>
    </p>
  `;

  return {
    subject: "Profile Updated",
    html: createEmailTemplate(
      content,
      `Your profile has been updated`,
    ),
  };
}

/**
 * Security Alert Email Template
 */
export function createSecurityAlertEmail(data: {
  userName: string;
  alertType: "PASSWORD_CHANGED" | "EMAIL_CHANGED" | "SUSPICIOUS_LOGIN";
  details?: string;
  ipAddress?: string;
  timestamp: string;
}): { subject: string; html: string } {
  const alertMessages = {
    PASSWORD_CHANGED: {
      title: "Password Changed",
      icon: "🔐",
      message: "Your password has been successfully changed.",
    },
    EMAIL_CHANGED: {
      title: "Email Address Changed",
      icon: "📧",
      message: "Your email address has been changed.",
    },
    SUSPICIOUS_LOGIN: {
      title: "Suspicious Login Detected",
      icon: "⚠️",
      message: "We detected a suspicious login attempt on your account.",
    },
  };

  const alert = alertMessages[data.alertType];

  const content = `
    <div style="background-color: ${BRAND_COLORS.DANGER}; color: ${BRAND_COLORS.WHITE}; padding: 24px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 12px;">${alert.icon}</div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 600;">
        Security Alert
      </h1>
    </div>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Hi <strong>${data.userName}</strong>,
    </p>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      ${alert.message}
    </p>
    
    ${createInfoBox([
      { label: "Alert Type", value: alert.title },
      { label: "Time", value: new Date(data.timestamp).toLocaleString() },
      ...(data.ipAddress ? [{ label: "IP Address", value: data.ipAddress }] : []),
    ])}
    
    ${
      data.details
        ? `
    <div class="highlight-box" style="background-color: ${BRAND_COLORS.BACKGROUND}; border-left: 4px solid ${BRAND_COLORS.DANGER}; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px;">
        <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">Details:</strong><br>
        ${data.details}
      </p>
    </div>
    `
        : ""
    }
    
    <div style="background: linear-gradient(135deg, ${BRAND_COLORS.DANGER}10, ${BRAND_COLORS.WARNING}10); padding: 24px; border-radius: 8px; margin: 30px 0; border: 1px solid ${BRAND_COLORS.BORDER};">
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        ⚠️ Didn't perform this action?
      </h3>
      <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
        If you didn't perform this action, your account may be compromised. Please:
      </p>
      <ul style="margin: 12px 0 0 0; padding-left: 20px; color: ${BRAND_COLORS.TEXT_SECONDARY}; font-size: 14px; line-height: 1.8;">
        <li>Change your password immediately</li>
        <li>Review your recent account activity</li>
        <li>Contact our support team right away</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${BRAND_INFO.WEBSITE_URL}/account/security" class="button" style="background-color: ${BRAND_COLORS.DANGER}; color: ${BRAND_COLORS.WHITE}; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block; margin-right: 10px;">
        Secure My Account
      </a>
      <a href="mailto:${BRAND_INFO.SUPPORT_EMAIL}" class="button" style="background-color: ${BRAND_COLORS.TEXT_PRIMARY}; color: ${BRAND_COLORS.WHITE}; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">
        Contact Support
      </a>
    </div>
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      This is an automated security alert. Please do not reply to this email.
    </p>
  `;

  return {
    subject: `Security Alert - ${alert.title}`,
    html: createEmailTemplate(
      content,
      `Security alert: ${alert.title}`,
    ),
  };
}
