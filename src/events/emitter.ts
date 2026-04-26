import { EventEmitter } from "events";
import { AppEvent, EventPayloadMap, EventHandler } from "./types.js";
import { logger } from "../lib/logger.js";

/**
 * Type-safe EventEmitter wrapper for application events
 * Implements Singleton pattern
 */
class AppEventEmitter {
  private static instance: AppEventEmitter | null = null;
  private emitter: EventEmitter;

  private constructor() {
    this.emitter = new EventEmitter();
    // Increase max listeners to prevent warnings
    this.emitter.setMaxListeners(50);
  }

  /**
   * Get singleton instance
   */
  static getInstance(): AppEventEmitter {
    if (!AppEventEmitter.instance) {
      AppEventEmitter.instance = new AppEventEmitter();
    }
    return AppEventEmitter.instance;
  }

  /**
   * Emit an event with type-safe payload
   */
  emit<E extends AppEvent>(
    event: E,
    payload: EventPayloadMap[E],
  ): boolean {
    // Add timestamp if not present
    const enrichedPayload = {
      ...payload,
      timestamp: payload.timestamp || new Date(),
    };

    logger.debug(
      { event, payload: enrichedPayload },
      `Emitting event: ${event}`,
    );

    return this.emitter.emit(event, enrichedPayload);
  }

  /**
   * Register an event listener with type-safe handler
   */
  on<E extends AppEvent>(
    event: E,
    handler: EventHandler<EventPayloadMap[E]>,
  ): this {
    const wrappedHandler = async (payload: EventPayloadMap[E]) => {
      try {
        await handler(payload);
      } catch (error) {
        logger.error(
          { event, error, payload },
          `Error in event handler for ${event}`,
        );
      }
    };

    this.emitter.on(event, wrappedHandler);
    return this;
  }

  /**
   * Register a one-time event listener
   */
  once<E extends AppEvent>(
    event: E,
    handler: EventHandler<EventPayloadMap[E]>,
  ): this {
    const wrappedHandler = async (payload: EventPayloadMap[E]) => {
      try {
        await handler(payload);
      } catch (error) {
        logger.error(
          { event, error, payload },
          `Error in one-time event handler for ${event}`,
        );
      }
    };

    this.emitter.once(event, wrappedHandler);
    return this;
  }

  /**
   * Remove event listener
   */
  off<E extends AppEvent>(
    event: E,
    handler: EventHandler<EventPayloadMap[E]>,
  ): this {
    this.emitter.off(event, handler);
    return this;
  }

  /**
   * Remove all listeners for an event
   */
  removeAllListeners(event?: AppEvent): this {
    this.emitter.removeAllListeners(event);
    return this;
  }

  /**
   * Get listener count for an event
   */
  listenerCount(event: AppEvent): number {
    return this.emitter.listenerCount(event);
  }

  /**
   * Get all registered event names
   */
  eventNames(): (string | symbol)[] {
    return this.emitter.eventNames();
  }
}

/**
 * Export singleton instance
 */
export const appEvents = AppEventEmitter.getInstance();
