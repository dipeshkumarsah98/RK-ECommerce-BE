import { registerAuthEventHandlers } from "./handlers/auth.events.js";
import { registerOrderEventHandlers } from "./handlers/order.events.js";
import { registerWithdrawalEventHandlers } from "./handlers/withdrawal.events.js";
import { registerUserEventHandlers } from "./handlers/user.events.js";
import { logger } from "../lib/logger.js";

/**
 * Register all application event handlers
 * Call this function during application startup
 */
export function registerAllEventHandlers(): void {
  logger.info("Registering all event handlers...");

  registerAuthEventHandlers();
  registerOrderEventHandlers();
  registerWithdrawalEventHandlers();
  registerUserEventHandlers();

  logger.info("All event handlers registered successfully");
}
