import { appEvents } from "../emitter.js";
import { AppEvent } from "../types.js";
import {
  sendOrderConfirmation,
  sendAdminNewOrder,
  sendOrderStatusUpdate,
  sendOrderCancelled,
  sendOrderShipped,
  sendOrderDelivered,
  sendAdminOrderDelivered,
} from "../../queues/index.js";
import { logger } from "../../lib/logger.js";

/**
 * Register ORDER event handlers
 * These handlers queue email jobs when order events occur
 */
export function registerOrderEventHandlers() {
  // Handle order creation
  appEvents.on(AppEvent.ORDER_CREATED, async (payload) => {
    logger.info({ orderId: payload.orderId }, "Order created event received");

    // Send customer confirmation
    if (payload.userEmail) {
      await sendOrderConfirmation({
        to: payload.userEmail,
        orderId: payload.orderId,
        subtotal: payload.subtotal,
        discountAmount: payload.discountAmount,
        taxAmount: payload.taxAmount,
        shippingAmount: payload.shippingAmount,
        totalAmount: payload.totalAmount,
        finalAmount: payload.finalAmount,
        paymentMethod: payload.paymentMethod,
        items: payload.items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.unitPrice,
        })),
      }).catch((error) => {
        logger.error(
          { error, orderId: payload.orderId },
          "Failed to queue order confirmation email",
        );
      });
    }

    // Send admin notification
    await sendAdminNewOrder({
      orderId: payload.orderId,
      finalAmount: payload.finalAmount,
      paymentMethod: payload.paymentMethod,
      customerEmail: payload.userEmail,
    }).catch((error) => {
      logger.error(
        { error, orderId: payload.orderId },
        "Failed to queue admin order notification",
      );
    });
  });

  // Handle order status updates
  appEvents.on(AppEvent.ORDER_STATUS_UPDATED, async (payload) => {
    logger.info(
      { orderId: payload.orderId, newStatus: payload.newStatus },
      "Order status updated event received",
    );

    if (payload.userEmail) {
      await sendOrderStatusUpdate({
        to: payload.userEmail,
        orderId: payload.orderId,
        status: payload.newStatus,
        trackingNumber: payload.trackingNumber,
      }).catch((error) => {
        logger.error(
          { error, orderId: payload.orderId },
          "Failed to queue order status update email",
        );
      });
    }
  });

  // Handle order cancellation
  appEvents.on(AppEvent.ORDER_CANCELLED, async (payload) => {
    logger.info(
      { orderId: payload.orderId },
      "Order cancelled event received",
    );

    if (payload.userEmail) {
      await sendOrderCancelled({
        to: payload.userEmail,
        orderId: payload.orderId,
        paymentMethod: payload.paymentMethod,
        reason: payload.reason,
        refundAmount: payload.refundAmount,
      }).catch((error) => {
        logger.error(
          { error, orderId: payload.orderId },
          "Failed to queue order cancellation email",
        );
      });
    }
  });

  // Handle order shipment
  appEvents.on(AppEvent.ORDER_SHIPPED, async (payload) => {
    logger.info({ orderId: payload.orderId }, "Order shipped event received");

    if (payload.userEmail) {
      await sendOrderShipped({
        to: payload.userEmail,
        orderId: payload.orderId,
        trackingNumber: payload.trackingNumber,
        courierService: payload.courierService,
        estimatedDelivery: payload.estimatedDelivery,
      }).catch((error) => {
        logger.error(
          { error, orderId: payload.orderId },
          "Failed to queue order shipped email",
        );
      });
    }
  });

  // Handle order delivery
  appEvents.on(AppEvent.ORDER_DELIVERED, async (payload) => {
    logger.info(
      { orderId: payload.orderId },
      "Order delivered event received",
    );

    // Send customer delivery confirmation
    if (payload.userEmail) {
      await sendOrderDelivered({
        to: payload.userEmail,
        orderId: payload.orderId,
        deliveredAt: payload.deliveredAt,
      }).catch((error) => {
        logger.error(
          { error, orderId: payload.orderId },
          "Failed to queue order delivered email",
        );
      });
    }

    // Send admin delivery notification
    await sendAdminOrderDelivered({
      orderId: payload.orderId,
      customerEmail: payload.userEmail,
      deliveredAt: payload.deliveredAt,
    }).catch((error) => {
      logger.error(
        { error, orderId: payload.orderId },
        "Failed to queue admin order delivered notification",
      );
    });
  });

  logger.info("ORDER event handlers registered");
}
