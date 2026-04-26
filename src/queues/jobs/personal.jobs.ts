import { BaseJobData } from "../types.js";

/**
 * PERSONAL Queue Job Types
 */

export interface WithdrawalRequestedJobData extends BaseJobData {
  type: "WITHDRAWAL_REQUESTED";
  vendorName: string;
  vendorEmail: string;
  amount: number;
  withdrawalId: string;
}

export interface WithdrawalProcessedJobData extends BaseJobData {
  type: "WITHDRAWAL_PROCESSED";
  to: string;
  vendorName: string;
  amount: number;
  status: "APPROVED" | "REJECTED";
  transactionProof?: string;
  rejectionReason?: string;
  remarks?: string;
}

export interface ProfileUpdateNotificationJobData extends BaseJobData {
  type: "PROFILE_UPDATE_NOTIFICATION";
  to: string;
  userName: string;
  updatedFields: string[];
}

export interface SecurityAlertJobData extends BaseJobData {
  type: "SECURITY_ALERT";
  to: string;
  userName: string;
  alertType: "PASSWORD_CHANGED" | "EMAIL_CHANGED" | "SUSPICIOUS_LOGIN";
  details?: string;
  ipAddress?: string;
  timestamp: string;
}

/**
 * Union type of all PERSONAL queue job data
 */
export type PersonalJobData =
  | WithdrawalRequestedJobData
  | WithdrawalProcessedJobData
  | ProfileUpdateNotificationJobData
  | SecurityAlertJobData;

/**
 * PERSONAL Queue Job Names
 */
export enum PersonalJobName {
  WITHDRAWAL_REQUESTED = "withdrawal-requested",
  WITHDRAWAL_PROCESSED = "withdrawal-processed",
  PROFILE_UPDATE_NOTIFICATION = "profile-update-notification",
  SECURITY_ALERT = "security-alert",
}
