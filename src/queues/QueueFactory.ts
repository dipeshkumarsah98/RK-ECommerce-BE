import { Queue } from "bullmq";
import { redisConnection } from "../lib/redis.js";
import { QueueConfig, QueueName, BaseJobData } from "./types.js";
import { logger } from "../lib/logger.js";

/**
 * Factory class for creating BullMQ queues with consistent configuration
 */
export class QueueFactory {
  /**
   * Default queue configurations for each queue type
   */
  private static readonly DEFAULT_CONFIGS: Record<QueueName, QueueConfig> = {
    [QueueName.AUTH]: {
      name: QueueName.AUTH,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
        removeOnComplete: { count: 50, age: 3600 }, // Keep 50 completed jobs or 1 hour
        removeOnFail: { count: 100, age: 86400 }, // Keep 100 failed jobs or 24 hours
      },
      workerConcurrency: 10,
    },
    [QueueName.ORDERS]: {
      name: QueueName.ORDERS,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
        removeOnComplete: { count: 100, age: 7200 },
        removeOnFail: { count: 200, age: 172800 },
      },
      workerConcurrency: 5,
    },
    [QueueName.PERSONAL]: {
      name: QueueName.PERSONAL,
      defaultJobOptions: {
        attempts: 2,
        backoff: { type: "fixed", delay: 3000 },
        removeOnComplete: { count: 100, age: 3600 },
        removeOnFail: { count: 150, age: 86400 },
      },
      workerConcurrency: 8,
    },
  };

  /**
   * Create a new queue instance with the given configuration
   */
  static createQueue<T extends BaseJobData>(
    queueName: QueueName,
    customConfig?: Partial<QueueConfig>,
  ): Queue<T> {
    const defaultConfig = this.DEFAULT_CONFIGS[queueName];
    const config = { ...defaultConfig, ...customConfig };

    const queue = new Queue<T>(config.name, {
      connection: redisConnection,
      defaultJobOptions: config.defaultJobOptions,
    });

    logger.info(
      { queueName: config.name },
      `Queue created: ${config.name}`,
    );

    return queue;
  }

  /**
   * Get default configuration for a queue
   */
  static getDefaultConfig(queueName: QueueName): QueueConfig {
    return { ...this.DEFAULT_CONFIGS[queueName] };
  }
}
