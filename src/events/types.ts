/**
 * Application Event Types and Payloads
 *
 * This file defines all events emitted throughout the application
 * and their corresponding payload types.
 */

import { OrderStatus } from "../lib/prisma";

/**
 * Event names as constants
 */
export enum AppEvent {
  // Order Events
  ORDER_CREATED = "order:created",
  ORDER_STATUS_UPDATED = "order:status_updated",
  ORDER_CANCELLED = "order:cancelled",
  ORDER_SHIPPED = "order:shipped",
  ORDER_DELIVERED = "order:delivered",

  // Withdrawal Events
  WITHDRAWAL_REQUESTED = "withdrawal:requested",
  WITHDRAWAL_APPROVED = "withdrawal:approved",
  WITHDRAWAL_REJECTED = "withdrawal:rejected",

  // Auth Events
  USER_LOGIN = "auth:user_login",
  USER_REGISTERED = "auth:user_registered",
  OTP_REQUESTED = "auth:otp_requested",
  PASSWORD_RESET_REQUESTED = "auth:password_reset_requested",
  PASSWORD_CHANGED = "auth:password_changed",

  // User/Profile Events
  PROFILE_UPDATED = "user:profile_updated",
  EMAIL_CHANGED = "user:email_changed",
  SECURITY_ALERT = "user:security_alert",
}

/**
 * Base interface for all event payloads
 */
export interface BaseEventPayload {
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}

// ========================================
// ORDER EVENT PAYLOADS
// ========================================

export interface OrderCreatedPayload extends BaseEventPayload {
  orderId: string;
  userId: string;
  userEmail?: string;
  // Amount breakdown
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  finalAmount: number;
  paymentMethod: string;
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
}

export interface OrderStatusUpdatedPayload extends BaseEventPayload {
  orderId: string;
  userId: string;
  userEmail?: string;
  oldStatus: OrderStatus;
  newStatus: OrderStatus;
  trackingNumber: string;
}

export interface OrderCancelledPayload extends BaseEventPayload {
  orderId: string;
  userId: string;
  userEmail?: string;
  paymentMethod: string;
  reason?: string;
  refundAmount?: number;
}

export interface OrderShippedPayload extends BaseEventPayload {
  orderId: string;
  userId: string;
  userEmail?: string;
  trackingNumber: string;
  courierService?: string;
  estimatedDelivery?: string;
}

export interface OrderDeliveredPayload extends BaseEventPayload {
  orderId: string;
  userId: string;
  userEmail?: string;
  deliveredAt: Date;
}

// ========================================
// WITHDRAWAL EVENT PAYLOADS
// ========================================

export interface WithdrawalRequestedPayload extends BaseEventPayload {
  withdrawalId: string;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  amount: number;
  remarks?: string;
}

export interface WithdrawalApprovedPayload extends BaseEventPayload {
  withdrawalId: string;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  amount: number;
  transactionProof?: string;
  remarks?: string;
  approvedBy: string;
}

export interface WithdrawalRejectedPayload extends BaseEventPayload {
  withdrawalId: string;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  amount: number;
  rejectionReason?: string;
  remarks?: string;
  rejectedBy: string;
}

// ========================================
// AUTH EVENT PAYLOADS
// ========================================

export interface UserLoginPayload extends BaseEventPayload {
  userId: string;
  email: string;
  role: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserRegisteredPayload extends BaseEventPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export interface OTPRequestedPayload extends BaseEventPayload {
  email: string;
  otp: string;
  purpose: "LOGIN" | "REGISTRATION" | "PASSWORD_RESET";
}

export interface PasswordResetRequestedPayload extends BaseEventPayload {
  userId: string;
  email: string;
  userName: string;
  resetToken: string;
}

export interface PasswordChangedPayload extends BaseEventPayload {
  userId: string;
  email: string;
  userName: string;
  ipAddress?: string;
}

// ========================================
// USER/PROFILE EVENT PAYLOADS
// ========================================

export interface ProfileUpdatedPayload extends BaseEventPayload {
  userId: string;
  email: string;
  userName: string;
  updatedFields: string[];
}

export interface EmailChangedPayload extends BaseEventPayload {
  userId: string;
  oldEmail: string;
  newEmail: string;
  userName: string;
}

export interface SecurityAlertPayload extends BaseEventPayload {
  userId: string;
  email: string;
  userName: string;
  alertType: "PASSWORD_CHANGED" | "EMAIL_CHANGED" | "SUSPICIOUS_LOGIN";
  details?: string;
  ipAddress?: string;
}

// ========================================
// TYPE MAP FOR TYPE-SAFE EVENT EMITTER
// ========================================

/**
 * Maps event names to their payload types
 * Enables type-safe event emission and handling
 */
export interface EventPayloadMap {
  [AppEvent.ORDER_CREATED]: OrderCreatedPayload;
  [AppEvent.ORDER_STATUS_UPDATED]: OrderStatusUpdatedPayload;
  [AppEvent.ORDER_CANCELLED]: OrderCancelledPayload;
  [AppEvent.ORDER_SHIPPED]: OrderShippedPayload;
  [AppEvent.ORDER_DELIVERED]: OrderDeliveredPayload;

  [AppEvent.WITHDRAWAL_REQUESTED]: WithdrawalRequestedPayload;
  [AppEvent.WITHDRAWAL_APPROVED]: WithdrawalApprovedPayload;
  [AppEvent.WITHDRAWAL_REJECTED]: WithdrawalRejectedPayload;

  [AppEvent.USER_LOGIN]: UserLoginPayload;
  [AppEvent.USER_REGISTERED]: UserRegisteredPayload;
  [AppEvent.OTP_REQUESTED]: OTPRequestedPayload;
  [AppEvent.PASSWORD_RESET_REQUESTED]: PasswordResetRequestedPayload;
  [AppEvent.PASSWORD_CHANGED]: PasswordChangedPayload;

  [AppEvent.PROFILE_UPDATED]: ProfileUpdatedPayload;
  [AppEvent.EMAIL_CHANGED]: EmailChangedPayload;
  [AppEvent.SECURITY_ALERT]: SecurityAlertPayload;
}

/**
 * Event handler function type
 */
export type EventHandler<T extends BaseEventPayload = BaseEventPayload> = (
  payload: T,
) => void | Promise<void>;
