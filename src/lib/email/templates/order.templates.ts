import {
  createEmailTemplate,
  createOrderItemsTable,
  createInfoBox,
  createButton,
} from "../base-template.js";
import { BRAND_COLORS, BRAND_INFO } from "../constants.js";

/**
 * Order Confirmation Email Template
 */
export function createOrderConfirmationEmail(data: {
  orderId: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  finalAmount: number;
  paymentMethod: string;
  items: Array<{ title: string; quantity: number; price: number }>;
}): { subject: string; html: string } {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${BRAND_COLORS.PRIMARY}; color: ${BRAND_COLORS.WHITE}; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 20px;">
        ✓ Order Confirmed
      </div>
      <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Thank You for Your Order!
      </h1>
      <p style="margin: 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        Your order has been successfully placed and is being processed.
      </p>
    </div>
    
    ${createInfoBox([
      {
        label: "Order ID",
        value: `#${data.orderId.slice(0, 8).toUpperCase()}`,
      },
      { label: "Payment Method", value: data.paymentMethod },
    ])}
    
    <h3 style="margin: 30px 0 16px 0; font-size: 18px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
      Order Items
    </h3>
    
    ${createOrderItemsTable(data.items)}
    
    <div style="margin: 30px 0; padding: 24px; background-color: ${BRAND_COLORS.BACKGROUND}; border-radius: 8px; border: 1px solid ${BRAND_COLORS.BORDER};">
      <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Order Summary
      </h3>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: ${BRAND_COLORS.TEXT_SECONDARY};">Subtotal</td>
          <td style="padding: 8px 0; text-align: right; color: ${BRAND_COLORS.TEXT_PRIMARY}; font-weight: 500;">NPR ${data.subtotal.toLocaleString()}</td>
        </tr>
        ${
          data.discountAmount > 0
            ? `
        <tr>
          <td style="padding: 8px 0; color: ${BRAND_COLORS.SUCCESS};">Discount</td>
          <td style="padding: 8px 0; text-align: right; color: ${BRAND_COLORS.SUCCESS}; font-weight: 500;">-NPR ${data.discountAmount.toLocaleString()}</td>
        </tr>
        `
            : ""
        }
        <tr>
          <td style="padding: 8px 0; color: ${BRAND_COLORS.TEXT_SECONDARY};">Shipping</td>
          <td style="padding: 8px 0; text-align: right; color: ${BRAND_COLORS.TEXT_PRIMARY}; font-weight: 500;">NPR ${data.shippingAmount.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: ${BRAND_COLORS.TEXT_SECONDARY};">Tax</td>
          <td style="padding: 8px 0; text-align: right; color: ${BRAND_COLORS.TEXT_PRIMARY}; font-weight: 500;">NPR ${data.taxAmount.toLocaleString()}</td>
        </tr>
        <tr style="border-top: 2px solid ${BRAND_COLORS.BORDER};">
          <td style="padding: 12px 0 0 0; color: ${BRAND_COLORS.TEXT_PRIMARY}; font-weight: 700; font-size: 16px;">Total</td>
          <td style="padding: 12px 0 0 0; text-align: right; color: ${BRAND_COLORS.PRIMARY}; font-weight: 700; font-size: 20px;">NPR ${data.totalAmount.toLocaleString()}</td>
        </tr>
      </table>
    </div>
    
    <div style="background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY}10, ${BRAND_COLORS.ACCENT}10); padding: 24px; border-radius: 8px; margin: 30px 0; border: 1px solid ${BRAND_COLORS.BORDER};">
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        What Happens Next?
      </h3>
      <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.8; font-size: 14px;">
        <li>We'll process your order within 24 hours</li>
        <li>You'll receive a shipping confirmation once dispatched</li>
        <li>Track your order anytime from your account</li>
      </ul>
    </div>
    
    ${createButton("Track Your Order", `${BRAND_INFO.WEBSITE_URL}/orders/${data.orderId}`)}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      Questions about your order?<br>
      <a href="mailto:${BRAND_INFO.SUPPORT_EMAIL}" style="color: ${BRAND_COLORS.PRIMARY}; text-decoration: none;">${BRAND_INFO.SUPPORT_EMAIL}</a>
    </p>
  `;

  return {
    subject: `Order Confirmed — #${data.orderId.slice(0, 8).toUpperCase()}`,
    html: createEmailTemplate(
      content,
      `Your order #${data.orderId.slice(0, 8).toUpperCase()} has been confirmed!`,
    ),
  };
}

/**
 * Admin New Order Notification Template
 */
export function createAdminNewOrderEmail(data: {
  orderId: string;
  finalAmount: number;
  paymentMethod: string;
  customerEmail?: string;
}): { subject: string; html: string } {
  const content = `
    <div style="background-color: ${BRAND_COLORS.PRIMARY}; color: ${BRAND_COLORS.WHITE}; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600;">
        🔔 New Order Received
      </h1>
    </div>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
      A new order has been placed and requires your attention.
    </p>
    
    ${createInfoBox([
      {
        label: "Order ID",
        value: `#${data.orderId.slice(0, 8).toUpperCase()}`,
      },
      { label: "Amount", value: `NPR ${data.finalAmount.toLocaleString()}` },
      { label: "Payment Method", value: data.paymentMethod },
      { label: "Customer", value: data.customerEmail || "Guest" },
    ])}
    
    ${createButton("Review Order", `${BRAND_INFO.WEBSITE_URL}/dashboard/orders/${data.orderId}`)}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      Please review and process this order in the admin panel.
    </p>
  `;

  return {
    subject: `New Order — #${data.orderId.slice(0, 8).toUpperCase()}`,
    html: createEmailTemplate(
      content,
      `New order #${data.orderId.slice(0, 8).toUpperCase()} received`,
    ),
  };
}

/**
 * Order Status Update Email Template
 */
export function createOrderStatusUpdateEmail(data: {
  orderId: string;
  status: string;
  trackingNumber?: string;
}): { subject: string; html: string } {
  const content = `
    <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
      Order Status Updated
    </h1>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Your order status has been updated.
    </p>
    
    <div style="background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY}, ${BRAND_COLORS.PRIMARY}); padding: 24px; border-radius: 8px; margin: 30px 0; text-align: center; color: ${BRAND_COLORS.WHITE};">
      <p style="margin: 0 0 8px 0; font-size: 14px; opacity: 0.9;">Order #${data.orderId.slice(0, 8).toUpperCase()}</p>
      <p style="margin: 0; font-size: 28px; font-weight: 700;">${data.status}</p>
    </div>
    
    ${
      data.trackingNumber
        ? `
    ${createInfoBox([{ label: "Tracking Number", value: data.trackingNumber }])}
    `
        : ""
    }
    
    ${createButton("View Order Details", `${BRAND_INFO.WEBSITE_URL}/dashboard/orders/${data.orderId}`)}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      Thank you for your patience!
    </p>
  `;

  return {
    subject: `Order Status Update — #${data.orderId.slice(0, 8).toUpperCase()}`,
    html: createEmailTemplate(content, `Your order status: ${data.status}`),
  };
}

/**
 * Order Cancelled Email Template
 */
export function createOrderCancelledEmail(data: {
  orderId: string;
  paymentMethod: string;
  reason?: string;
  refundAmount?: number;
}): { subject: string; html: string } {
  const isCOD = data.paymentMethod === "COD";

  // Build refund/payment section
  let paymentInfoSection = "";

  if (isCOD) {
    paymentInfoSection = `
    <div style="background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY}10, ${BRAND_COLORS.ACCENT}10); padding: 24px; border-radius: 8px; margin: 30px 0; border: 1px solid ${BRAND_COLORS.BORDER};">
      <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Payment Information
      </h3>
      <p style="margin: 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        Since this was a Cash on Delivery (COD) order, no payment has been collected, and <strong>no refund is applicable</strong>.
      </p>
    </div>
    `;
  } else if (data.refundAmount) {
    paymentInfoSection = `
    <div style="background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY}10, ${BRAND_COLORS.ACCENT}10); padding: 24px; border-radius: 8px; margin: 30px 0; border: 1px solid ${BRAND_COLORS.BORDER};">
      <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Refund Information
      </h3>
      <p style="margin: 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        A refund of <strong style="color: ${BRAND_COLORS.PRIMARY};">NPR ${data.refundAmount.toLocaleString()}</strong> will be processed to your original payment method within 5-7 business days.
      </p>
    </div>
    `;
  }

  const content = `
    <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
      Order Cancelled
    </h1>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Your order <strong>#${data.orderId.slice(0, 8).toUpperCase()}</strong> has been cancelled.
    </p>
    
    ${
      data.reason
        ? `
    <div class="highlight-box" style="background-color: ${BRAND_COLORS.BACKGROUND}; border-left: 4px solid ${BRAND_COLORS.PRIMARY}; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px;">
        <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">Reason:</strong> ${data.reason}
      </p>
    </div>
    `
        : ""
    }
    
    ${paymentInfoSection}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      If you have any questions, please contact our support team at<br>
      <a href="mailto:${BRAND_INFO.SUPPORT_EMAIL}" style="color: ${BRAND_COLORS.PRIMARY}; text-decoration: none;">${BRAND_INFO.SUPPORT_EMAIL}</a>
    </p>
  `;

  return {
    subject: `Order Cancelled — #${data.orderId.slice(0, 8).toUpperCase()}`,
    html: createEmailTemplate(
      content,
      `Your order #${data.orderId.slice(0, 8).toUpperCase()} has been cancelled.`,
    ),
  };
}

/**
 * Order Shipped Email Template
 */
export function createOrderShippedEmail(data: {
  orderId: string;
  trackingNumber: string;
  courierService?: string;
  estimatedDelivery?: string;
}): { subject: string; html: string } {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${BRAND_COLORS.PRIMARY}; color: ${BRAND_COLORS.WHITE}; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 20px;">
        📦 Shipped
      </div>
      <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Your Order is on the Way!
      </h1>
      <p style="margin: 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        Order <strong>#${data.orderId.slice(0, 8).toUpperCase()}</strong> has been shipped.
      </p>
    </div>
    
    <div style="background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY}, ${BRAND_COLORS.PRIMARY}); padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; color: ${BRAND_COLORS.WHITE}; box-shadow: 0 4px 12px rgba(214, 11, 71, 0.2);">
      <p style="margin: 0 0 12px 0; font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;">Tracking Number</p>
      <p style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 2px; font-family: 'Courier New', monospace;">${data.trackingNumber}</p>
    </div>
    
    ${createInfoBox([
      ...(data.courierService
        ? [{ label: "Courier Service", value: data.courierService }]
        : []),
      ...(data.estimatedDelivery
        ? [{ label: "Estimated Delivery", value: data.estimatedDelivery }]
        : []),
    ])}
    
    ${createButton("Track Your Package", `${BRAND_INFO.WEBSITE_URL}/track/${data.trackingNumber}`)}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      You can track your order using the tracking number above.
    </p>
  `;

  return {
    subject: `Order Shipped — #${data.orderId.slice(0, 8).toUpperCase()}`,
    html: createEmailTemplate(
      content,
      `Your order is on the way! Tracking: ${data.trackingNumber}`,
    ),
  };
}

/**
 * Order Delivered Email Template (Customer)
 */
export function createOrderDeliveredEmail(data: {
  orderId: string;
  deliveredAt: Date;
}): { subject: string; html: string } {
  const deliveryDate = new Date(data.deliveredAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background: linear-gradient(135deg, ${BRAND_COLORS.SUCCESS}, #059669); color: ${BRAND_COLORS.WHITE}; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 20px;">
        ✓ Delivered
      </div>
      <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Your Order Has Been Delivered!
      </h1>
      <p style="margin: 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        Order <strong>#${data.orderId.slice(0, 8).toUpperCase()}</strong> was successfully delivered.
      </p>
    </div>
    
    ${createInfoBox([
      {
        label: "Order ID",
        value: `#${data.orderId.slice(0, 8).toUpperCase()}`,
      },
      { label: "Delivered On", value: deliveryDate },
      { label: "Status", value: "Completed" },
    ])}
    
    <div style="background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY}10, ${BRAND_COLORS.ACCENT}10); padding: 24px; border-radius: 8px; margin: 30px 0; border: 1px solid ${BRAND_COLORS.BORDER};">
      <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        🎉 Thank You for Your Purchase!
      </h3>
      <p style="margin: 0 0 12px 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
        We hope you love your order! Your satisfaction is our priority.
      </p>
      <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
        If you have any issues with your order, please don't hesitate to contact our support team.
      </p>
    </div>
    
    <div style="background-color: ${BRAND_COLORS.BACKGROUND}; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
      <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        How was your experience?
      </p>
      <p style="margin: 0 0 16px 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        We'd love to hear your feedback!
      </p>
      ${createButton("Leave a Review", `${BRAND_INFO.WEBSITE_URL}/orders/${data.orderId}/review`)}
    </div>
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      Thank you for shopping with ${BRAND_INFO.NAME}!<br>
      <a href="mailto:${BRAND_INFO.SUPPORT_EMAIL}" style="color: ${BRAND_COLORS.PRIMARY}; text-decoration: none;">${BRAND_INFO.SUPPORT_EMAIL}</a>
    </p>
  `;

  return {
    subject: `Order Delivered — #${data.orderId.slice(0, 8).toUpperCase()}`,
    html: createEmailTemplate(
      content,
      `Your order has been delivered successfully!`,
    ),
  };
}

/**
 * Admin Order Delivered Notification Template
 */
export function createAdminOrderDeliveredEmail(data: {
  orderId: string;
  customerEmail?: string;
  deliveredAt: Date;
}): { subject: string; html: string } {
  const deliveryDate = new Date(data.deliveredAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const content = `
    <div style="background: linear-gradient(135deg, ${BRAND_COLORS.SUCCESS}, #059669); color: ${BRAND_COLORS.WHITE}; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600;">
        ✓ Order Delivered Successfully
      </h1>
    </div>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      An order has been successfully delivered and marked as completed.
    </p>
    
    ${createInfoBox([
      {
        label: "Order ID",
        value: `#${data.orderId.slice(0, 8).toUpperCase()}`,
      },
      ...(data.customerEmail
        ? [{ label: "Customer", value: data.customerEmail }]
        : []),
      { label: "Delivered At", value: deliveryDate },
      { label: "Status", value: "Completed" },
    ])}
    
    <div style="background-color: ${BRAND_COLORS.BACKGROUND}; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid ${BRAND_COLORS.SUCCESS};">
      <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">Note:</strong> This order is now marked as COMPLETED. If there were any affiliate commissions, they have been recorded for vendor earnings.
      </p>
    </div>
    
    ${createButton("View Order Details", `${BRAND_INFO.WEBSITE_URL}/admin/orders/${data.orderId}`)}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      This is an automated notification from your order management system.
    </p>
  `;

  return {
    subject: `[Admin] Order Delivered — #${data.orderId.slice(0, 8).toUpperCase()}`,
    html: createEmailTemplate(content, `Order delivered successfully`),
  };
}
