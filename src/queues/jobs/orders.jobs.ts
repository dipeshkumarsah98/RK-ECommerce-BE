import { BaseJobData } from "../types.js";

/**
 * ORDERS Queue Job Types
 */

export interface OrderConfirmationJobData extends BaseJobData {
  type: "ORDER_CONFIRMATION";
  to: string;
  orderId: string;
  // Amount breakdown
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  finalAmount: number;
  paymentMethod: string;
  items: Array<{ title: string; quantity: number; price: number }>;
}

export interface AdminNewOrderJobData extends BaseJobData {
  type: "ADMIN_NEW_ORDER";
  orderId: string;
  finalAmount: number;
  paymentMethod: string;
  customerEmail?: string;
}

export interface OrderStatusUpdateJobData extends BaseJobData {
  type: "ORDER_STATUS_UPDATE";
  to: string;
  orderId: string;
  status: string;
  trackingNumber?: string;
}

export interface OrderCancelledJobData extends BaseJobData {
  type: "ORDER_CANCELLED";
  to: string;
  orderId: string;
  paymentMethod: string;
  reason?: string;
  refundAmount?: number;
}

export interface OrderShippedJobData extends BaseJobData {
  type: "ORDER_SHIPPED";
  to: string;
  orderId: string;
  trackingNumber: string;
  courierService?: string;
  estimatedDelivery?: string;
}

export interface OrderDeliveredJobData extends BaseJobData {
  type: "ORDER_DELIVERED";
  to: string;
  orderId: string;
  deliveredAt: Date;
}

export interface AdminOrderDeliveredJobData extends BaseJobData {
  type: "ADMIN_ORDER_DELIVERED";
  orderId: string;
  customerEmail?: string;
  deliveredAt: Date;
}

/**
 * Union type of all ORDERS queue job data
 */
export type OrdersJobData =
  | OrderConfirmationJobData
  | AdminNewOrderJobData
  | OrderStatusUpdateJobData
  | OrderCancelledJobData
  | OrderShippedJobData
  | OrderDeliveredJobData
  | AdminOrderDeliveredJobData;

/**
 * ORDERS Queue Job Names
 */
export enum OrdersJobName {
  ORDER_CONFIRMATION = "order-confirmation",
  ADMIN_NEW_ORDER = "admin-new-order",
  ORDER_STATUS_UPDATE = "order-status-update",
  ORDER_CANCELLED = "order-cancelled",
  ORDER_SHIPPED = "order-shipped",
  ORDER_DELIVERED = "order-delivered",
  ADMIN_ORDER_DELIVERED = "admin-order-delivered",
}
