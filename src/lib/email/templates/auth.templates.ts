import {
  createEmailTemplate,
  createOTPDisplay,
  createButton,
} from "../base-template.js";
import { BRAND_COLORS, BRAND_INFO } from "../constants.js";

/**
 * OTP Email Template
 */
export function createOTPEmail(data: {
  otp: string;
  purpose: "LOGIN" | "REGISTRATION" | "PASSWORD_RESET";
}): { subject: string; html: string } {
  const purposeText = {
    LOGIN: "login to your account",
    REGISTRATION: "complete your registration",
    PASSWORD_RESET: "reset your password",
  }[data.purpose];

  const content = `
    <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
      Verify Your Identity
    </h1>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      You've requested to <strong>${purposeText}</strong>. Please use the following one-time password (OTP) to proceed:
    </p>
    
    ${createOTPDisplay(data.otp)}
    
    <div class="highlight-box" style="background-color: ${BRAND_COLORS.BACKGROUND}; border-left: 4px solid ${BRAND_COLORS.PRIMARY}; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">⚠️ Security Notice:</strong><br>
        • This OTP is valid for 5 minutes only<br>
        • Do not share this code with anyone<br>
        • If you didn't request this, please ignore this email
      </p>
    </div>
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
      If you need any assistance, feel free to contact our support team at 
      <a href="mailto:${BRAND_INFO.SUPPORT_EMAIL}" style="color: ${BRAND_COLORS.PRIMARY}; text-decoration: none;">${BRAND_INFO.SUPPORT_EMAIL}</a>
    </p>
  `;

  return {
    subject: `Your OTP Code - ${data.purpose.replace("_", " ")}`,
    html: createEmailTemplate(
      content,
      `Your OTP code is ${data.otp}. Valid for 5 minutes.`,
    ),
  };
}

/**
 * Welcome Email Template
 */
export function createWelcomeEmail(data: {
  userName: string;
  role: string;
}): { subject: string; html: string } {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; color: ${BRAND_COLORS.PRIMARY};">
        Welcome to ${BRAND_INFO.NAME}! 🎉
      </h1>
      <p style="margin: 0; font-size: 18px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        We're thrilled to have you on board!
      </p>
    </div>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Hi <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">${data.userName}</strong>,
    </p>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Thank you for creating an account with us! Your account has been successfully set up with the role: <strong style="color: ${BRAND_COLORS.PRIMARY};">${data.role}</strong>.
    </p>
    
    <div style="background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY}10, ${BRAND_COLORS.ACCENT}10); padding: 24px; border-radius: 8px; margin: 30px 0; border: 1px solid ${BRAND_COLORS.BORDER};">
      <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Getting Started
      </h3>
      <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.8;">
        <li>Complete your profile for a personalized experience</li>
        <li>Explore our features and discover what we offer</li>
        <li>Contact support if you have any questions</li>
      </ul>
    </div>
    
    ${createButton("Get Started", BRAND_INFO.WEBSITE_URL)}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      Need help? We're here for you!<br>
      <a href="mailto:${BRAND_INFO.SUPPORT_EMAIL}" style="color: ${BRAND_COLORS.PRIMARY}; text-decoration: none;">${BRAND_INFO.SUPPORT_EMAIL}</a>
    </p>
  `;

  return {
    subject: `Welcome to ${BRAND_INFO.NAME}! 🎉`,
    html: createEmailTemplate(
      content,
      `Welcome ${data.userName}! Your account is ready.`,
    ),
  };
}

/**
 * Password Reset Email Template
 */
export function createPasswordResetEmail(data: {
  userName: string;
  resetToken: string;
}): { subject: string; html: string } {
  const content = `
    <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
      Reset Your Password
    </h1>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Hi <strong>${data.userName}</strong>,
    </p>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      We received a request to reset your password. Use the token below to reset your password:
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; background-color: ${BRAND_COLORS.BACKGROUND}; padding: 20px 30px; border-radius: 8px; border: 2px dashed ${BRAND_COLORS.PRIMARY};">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-transform: uppercase; letter-spacing: 1px;">Reset Token</p>
        <p style="margin: 0; font-size: 20px; font-weight: 700; color: ${BRAND_COLORS.PRIMARY}; letter-spacing: 2px; font-family: 'Courier New', monospace;">${data.resetToken}</p>
      </div>
    </div>
    
    <div class="highlight-box" style="background-color: ${BRAND_COLORS.BACKGROUND}; border-left: 4px solid ${BRAND_COLORS.PRIMARY}; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">⚠️ Security Notice:</strong><br>
        • This token is valid for 1 hour only<br>
        • Don't share this token with anyone<br>
        • If you didn't request this, please ignore this email and your password will remain unchanged
      </p>
    </div>
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
      If you continue to have problems, please contact us at 
      <a href="mailto:${BRAND_INFO.SUPPORT_EMAIL}" style="color: ${BRAND_COLORS.PRIMARY}; text-decoration: none;">${BRAND_INFO.SUPPORT_EMAIL}</a>
    </p>
  `;

  return {
    subject: "Password Reset Request",
    html: createEmailTemplate(
      content,
      `Reset your password using token: ${data.resetToken}`,
    ),
  };
}

/**
 * Account Verification Email Template
 */
export function createAccountVerificationEmail(data: {
  userName: string;
  verificationToken: string;
}): { subject: string; html: string } {
  const content = `
    <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
      Verify Your Account
    </h1>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Hi <strong>${data.userName}</strong>,
    </p>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Thank you for signing up! Please verify your account using the verification token below:
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY}, ${BRAND_COLORS.PRIMARY}dd); padding: 20px 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(214, 11, 71, 0.2);">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: ${BRAND_COLORS.WHITE}; text-transform: uppercase; letter-spacing: 1px;">Verification Token</p>
        <p style="margin: 0; font-size: 20px; font-weight: 700; color: ${BRAND_COLORS.WHITE}; letter-spacing: 2px; font-family: 'Courier New', monospace;">${data.verificationToken}</p>
      </div>
      <p style="margin: 16px 0 0 0; font-size: 13px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        This token expires in 24 hours
      </p>
    </div>
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
      If you didn't create an account, please ignore this email.
    </p>
  `;

  return {
    subject: "Verify Your Account",
    html: createEmailTemplate(
      content,
      `Verify your account with token: ${data.verificationToken}`,
    ),
  };
}
