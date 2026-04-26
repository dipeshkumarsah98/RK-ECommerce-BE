import { appEvents } from "../emitter.js";
import { AppEvent } from "../types.js";
import {
  sendWithdrawalRequested,
  sendWithdrawalProcessed,
} from "../../queues/index.js";
import { logger } from "../../lib/logger.js";

/**
 * Register WITHDRAWAL event handlers
 * These handlers queue email jobs when withdrawal events occur
 */
export function registerWithdrawalEventHandlers() {
  // Handle withdrawal request
  appEvents.on(AppEvent.WITHDRAWAL_REQUESTED, async (payload) => {
    logger.info(
      { withdrawalId: payload.withdrawalId },
      "Withdrawal requested event received",
    );

    await sendWithdrawalRequested({
      vendorName: payload.vendorName,
      vendorEmail: payload.vendorEmail,
      amount: payload.amount,
      withdrawalId: payload.withdrawalId,
    }).catch((error) => {
      logger.error(
        { error, withdrawalId: payload.withdrawalId },
        "Failed to queue withdrawal request notification",
      );
    });
  });

  // Handle withdrawal approval
  appEvents.on(AppEvent.WITHDRAWAL_APPROVED, async (payload) => {
    logger.info(
      { withdrawalId: payload.withdrawalId },
      "Withdrawal approved event received",
    );

    await sendWithdrawalProcessed({
      to: payload.vendorEmail,
      vendorName: payload.vendorName,
      amount: payload.amount,
      status: "APPROVED",
      transactionProof: payload.transactionProof,
      remarks: payload.remarks,
    }).catch((error) => {
      logger.error(
        { error, withdrawalId: payload.withdrawalId },
        "Failed to queue withdrawal approval notification",
      );
    });
  });

  // Handle withdrawal rejection
  appEvents.on(AppEvent.WITHDRAWAL_REJECTED, async (payload) => {
    logger.info(
      { withdrawalId: payload.withdrawalId },
      "Withdrawal rejected event received",
    );

    await sendWithdrawalProcessed({
      to: payload.vendorEmail,
      vendorName: payload.vendorName,
      amount: payload.amount,
      status: "REJECTED",
      rejectionReason: payload.rejectionReason,
      remarks: payload.remarks,
    }).catch((error) => {
      logger.error(
        { error, withdrawalId: payload.withdrawalId },
        "Failed to queue withdrawal rejection notification",
      );
    });
  });

  logger.info("WITHDRAWAL event handlers registered");
}
