/**
 * Application Event System
 *
 * This module provides a type-safe event emitter system for decoupling
 * business logic from side effects (emails, notifications, analytics, etc.).
 *
 * Usage:
 * ```typescript
 * import { appEvents, AppEvent } from './events';
 *
 * // Emit an event
 * appEvents.emit(AppEvent.ORDER_CREATED, {
 *   orderId: 'ord_123',
 *   userId: 'user_456',
 *   userEmail: 'customer@example.com',
 *   totalAmount: 5000,
 *   finalAmount: 4500,
 *   paymentMethod: 'ESEWA',
 *   items: [...]
 * });
 * ```
 */

// Export event emitter singleton
export { appEvents } from "./emitter.js";

// Export all types
export { AppEvent } from "./types.js";
export type {
  BaseEventPayload,
  EventPayloadMap,
  EventHandler,
  // Order events
  OrderCreatedPayload,
  OrderStatusUpdatedPayload,
  OrderCancelledPayload,
  OrderShippedPayload,
  OrderDeliveredPayload,
  // Withdrawal events
  WithdrawalRequestedPayload,
  WithdrawalApprovedPayload,
  WithdrawalRejectedPayload,
  // Auth events
  UserLoginPayload,
  UserRegisteredPayload,
  OTPRequestedPayload,
  PasswordResetRequestedPayload,
  PasswordChangedPayload,
  // User events
  ProfileUpdatedPayload,
  EmailChangedPayload,
  SecurityAlertPayload,
} from "./types.js";

// Export registration function
export { registerAllEventHandlers } from "./register.js";

// Re-export individual handler registration functions for flexibility
export { registerAuthEventHandlers } from "./handlers/auth.events.js";
export { registerOrderEventHandlers } from "./handlers/order.events.js";
export { registerWithdrawalEventHandlers } from "./handlers/withdrawal.events.js";
export { registerUserEventHandlers } from "./handlers/user.events.js";
