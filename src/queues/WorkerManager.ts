import { Worker } from "bullmq";
import { redisConnection } from "../lib/redis.js";
import { QueueName, BaseJobData } from "./types.js";
import { QueueManager } from "./QueueManager.js";
import { logger } from "../lib/logger.js";

// Import processors
import { processAuthJob } from "./processors/auth.processor.js";
import { processOrdersJob } from "./processors/orders.processor.js";
import { processPersonalJob } from "./processors/personal.processor.js";

// Import job types
import type { AuthJobData } from "./jobs/auth.jobs.js";
import type { OrdersJobData } from "./jobs/orders.jobs.js";
import type { PersonalJobData } from "./jobs/personal.jobs.js";

/**
 * Singleton class to manage all BullMQ workers
 * Handles worker lifecycle and event listeners
 */
export class WorkerManager {
  private static instance: WorkerManager | null = null;
  private workers: Map<QueueName, Worker> = new Map();
  private queueManager: QueueManager;

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    this.queueManager = QueueManager.getInstance();
  }

  /**
   * Get the singleton instance of WorkerManager
   */
  static getInstance(): WorkerManager {
    if (!WorkerManager.instance) {
      WorkerManager.instance = new WorkerManager();
    }
    return WorkerManager.instance;
  }

  /**
   * Start all workers
   */
  startAllWorkers(): void {
    this.startAuthWorker();
    this.startOrdersWorker();
    this.startPersonalWorker();
    logger.info("All workers started successfully");
  }

  /**
   * Start AUTH queue worker
   */
  private startAuthWorker(): Worker<AuthJobData> {
    const config = this.queueManager
      .getQueueInstance(QueueName.AUTH)
      ?.config;

    const worker = new Worker<AuthJobData>(
      QueueName.AUTH,
      processAuthJob,
      {
        connection: redisConnection,
        concurrency: config?.workerConcurrency || 10,
      },
    );

    this.setupWorkerEventListeners(worker, QueueName.AUTH);
    this.workers.set(QueueName.AUTH, worker);

    logger.info(
      { queueName: QueueName.AUTH, concurrency: config?.workerConcurrency },
      "AUTH worker started",
    );

    return worker;
  }

  /**
   * Start ORDERS queue worker
   */
  private startOrdersWorker(): Worker<OrdersJobData> {
    const config = this.queueManager
      .getQueueInstance(QueueName.ORDERS)
      ?.config;

    const worker = new Worker<OrdersJobData>(
      QueueName.ORDERS,
      processOrdersJob,
      {
        connection: redisConnection,
        concurrency: config?.workerConcurrency || 5,
      },
    );

    this.setupWorkerEventListeners(worker, QueueName.ORDERS);
    this.workers.set(QueueName.ORDERS, worker);

    logger.info(
      { queueName: QueueName.ORDERS, concurrency: config?.workerConcurrency },
      "ORDERS worker started",
    );

    return worker;
  }

  /**
   * Start PERSONAL queue worker
   */
  private startPersonalWorker(): Worker<PersonalJobData> {
    const config = this.queueManager
      .getQueueInstance(QueueName.PERSONAL)
      ?.config;

    const worker = new Worker<PersonalJobData>(
      QueueName.PERSONAL,
      processPersonalJob,
      {
        connection: redisConnection,
        concurrency: config?.workerConcurrency || 8,
      },
    );

    this.setupWorkerEventListeners(worker, QueueName.PERSONAL);
    this.workers.set(QueueName.PERSONAL, worker);

    logger.info(
      { queueName: QueueName.PERSONAL, concurrency: config?.workerConcurrency },
      "PERSONAL worker started",
    );

    return worker;
  }

  /**
   * Setup event listeners for a worker
   */
  private setupWorkerEventListeners<T extends BaseJobData>(
    worker: Worker<T>,
    queueName: QueueName,
  ): void {
    worker.on("completed", (job) => {
      logger.info(
        {
          queueName,
          jobId: job.id,
          jobName: job.name,
          type: job.data.type,
        },
        `Job completed in ${queueName} queue`,
      );
    });

    worker.on("failed", (job, err) => {
      logger.error(
        {
          queueName,
          jobId: job?.id,
          jobName: job?.name,
          type: job?.data?.type,
          error: err.message,
          stack: err.stack,
        },
        `Job failed in ${queueName} queue`,
      );
    });

    worker.on("error", (err) => {
      logger.error(
        { queueName, error: err.message },
        `Worker error in ${queueName} queue`,
      );
    });

    worker.on("stalled", (jobId) => {
      logger.warn({ queueName, jobId }, `Job stalled in ${queueName} queue`);
    });

    worker.on("active", (job) => {
      logger.debug(
        {
          queueName,
          jobId: job.id,
          jobName: job.name,
        },
        `Job active in ${queueName} queue`,
      );
    });
  }

  /**
   * Get a specific worker by queue name
   */
  getWorker(queueName: QueueName): Worker | undefined {
    return this.workers.get(queueName);
  }

  /**
   * Stop a specific worker
   */
  async stopWorker(queueName: QueueName): Promise<void> {
    const worker = this.workers.get(queueName);
    if (worker) {
      await worker.close();
      this.workers.delete(queueName);
      logger.info({ queueName }, `Worker stopped: ${queueName}`);
    }
  }

  /**
   * Stop all workers
   */
  async stopAllWorkers(): Promise<void> {
    logger.info("Stopping all workers...");
    const stopPromises = Array.from(this.workers.values()).map((worker) =>
      worker.close(),
    );
    await Promise.all(stopPromises);
    this.workers.clear();
    logger.info("All workers stopped");
  }

  /**
   * Pause a specific worker
   */
  async pauseWorker(queueName: QueueName): Promise<void> {
    const worker = this.workers.get(queueName);
    if (worker) {
      await worker.pause();
      logger.info({ queueName }, `Worker paused: ${queueName}`);
    }
  }

  /**
   * Resume a specific worker
   */
  async resumeWorker(queueName: QueueName): Promise<void> {
    const worker = this.workers.get(queueName);
    if (worker) {
      await worker.resume();
      logger.info({ queueName }, `Worker resumed: ${queueName}`);
    }
  }

  /**
   * Get all worker statuses
   */
  getWorkerStatuses(): Record<string, boolean> {
    const statuses: Record<string, boolean> = {};
    this.workers.forEach((worker, queueName) => {
      statuses[queueName] = !worker.isPaused();
    });
    return statuses;
  }
}

/**
 * Export singleton instance for direct usage
 */
export const workerManager = WorkerManager.getInstance();
