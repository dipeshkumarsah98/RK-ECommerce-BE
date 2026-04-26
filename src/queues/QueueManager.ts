import { Queue, Job } from "bullmq";
import { QueueFactory } from "./QueueFactory.js";
import { QueueName, QueueInstance, BaseJobData } from "./types.js";
import { logger } from "../lib/logger.js";

/**
 * Singleton class to manage all application queues
 * Provides centralized access to all queue instances
 */
export class QueueManager {
  private static instance: QueueManager | null = null;
  private queues: Map<QueueName, QueueInstance> = new Map();

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    this.initializeQueues();
  }

  /**
   * Get the singleton instance of QueueManager
   */
  static getInstance(): QueueManager {
    if (!QueueManager.instance) {
      QueueManager.instance = new QueueManager();
    }
    return QueueManager.instance;
  }

  /**
   * Initialize all queues
   */
  private initializeQueues(): void {
    // Create AUTH queue
    const authQueue = QueueFactory.createQueue(QueueName.AUTH);
    this.queues.set(QueueName.AUTH, {
      queue: authQueue,
      config: QueueFactory.getDefaultConfig(QueueName.AUTH),
    });

    // Create ORDERS queue
    const ordersQueue = QueueFactory.createQueue(QueueName.ORDERS);
    this.queues.set(QueueName.ORDERS, {
      queue: ordersQueue,
      config: QueueFactory.getDefaultConfig(QueueName.ORDERS),
    });

    // Create PERSONAL queue
    const personalQueue = QueueFactory.createQueue(QueueName.PERSONAL);
    this.queues.set(QueueName.PERSONAL, {
      queue: personalQueue,
      config: QueueFactory.getDefaultConfig(QueueName.PERSONAL),
    });

    logger.info("All queues initialized");
  }

  /**
   * Get a specific queue by name
   */
  getQueue<T extends BaseJobData>(queueName: QueueName): Queue<T> {
    const queueInstance = this.queues.get(queueName);
    if (!queueInstance) {
      throw new Error(`Queue ${queueName} not found`);
    }
    return queueInstance.queue as unknown as Queue<T>;
  }

  /**
   * Get the AUTH queue
   */
  get authQueue(): Queue {
    return this.getQueue(QueueName.AUTH);
  }

  /**
   * Get the ORDERS queue
   */
  get ordersQueue(): Queue {
    return this.getQueue(QueueName.ORDERS);
  }

  /**
   * Get the PERSONAL queue
   */
  get personalQueue(): Queue {
    return this.getQueue(QueueName.PERSONAL);
  }

  /**
   * Add a job to a specific queue
   */
  async addJob<T extends BaseJobData>(
    queueName: QueueName,
    jobName: string,
    data: T,
  ): Promise<Job<T>> {
    const queue = this.getQueue<T>(queueName);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const job = (await queue.add(jobName as any, data as any)) as Job<T>;
    logger.info(
      { queueName, jobName, jobId: job.id },
      `Job added to ${queueName} queue`,
    );
    return job;
  }

  /**
   * Get queue instance with metadata
   */
  getQueueInstance(queueName: QueueName): QueueInstance | undefined {
    return this.queues.get(queueName);
  }

  /**
   * Close all queues
   */
  async closeAll(): Promise<void> {
    logger.info("Closing all queues...");
    const closePromises = Array.from(this.queues.values()).map((instance) =>
      instance.queue.close(),
    );
    await Promise.all(closePromises);
    logger.info("All queues closed");
  }

  /**
   * Get stats for a specific queue
   */
  async getQueueStats(queueName: QueueName) {
    const queue = this.getQueue(queueName);
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaitingCount(),
      queue.getActiveCount(),
      queue.getCompletedCount(),
      queue.getFailedCount(),
      queue.getDelayedCount(),
    ]);

    return { waiting, active, completed, failed, delayed };
  }
}

/**
 * Export singleton instance for direct usage
 */
export const queueManager = QueueManager.getInstance();
