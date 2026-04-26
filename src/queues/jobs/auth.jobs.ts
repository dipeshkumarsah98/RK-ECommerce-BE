import { BaseJobData } from "../types.js";

/**
 * AUTH Queue Job Types
 */

export interface SendOTPJobData extends BaseJobData {
  type: "SEND_OTP";
  to: string;
  otp: string;
  purpose: "LOGIN" | "REGISTRATION" | "PASSWORD_RESET";
}

export interface SendWelcomeEmailJobData extends BaseJobData {
  type: "SEND_WELCOME_EMAIL";
  to: string;
  userName: string;
  role: string;
}

export interface SendPasswordResetJobData extends BaseJobData {
  type: "SEND_PASSWORD_RESET";
  to: string;
  resetToken: string;
  userName: string;
}

export interface SendAccountVerificationJobData extends BaseJobData {
  type: "SEND_ACCOUNT_VERIFICATION";
  to: string;
  verificationToken: string;
  userName: string;
}

/**
 * Union type of all AUTH queue job data
 */
export type AuthJobData =
  | SendOTPJobData
  | SendWelcomeEmailJobData
  | SendPasswordResetJobData
  | SendAccountVerificationJobData;

/**
 * AUTH Queue Job Names
 */
export enum AuthJobName {
  SEND_OTP = "send-otp",
  SEND_WELCOME_EMAIL = "send-welcome-email",
  SEND_PASSWORD_RESET = "send-password-reset",
  SEND_ACCOUNT_VERIFICATION = "send-account-verification",
}
