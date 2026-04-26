import { Queue, Worker, Job, JobsOptions } from "bullmq";

/**
 * Available queue names in the system
 */
export enum QueueName {
  AUTH = "auth",
  ORDERS = "orders",
  PERSONAL = "personal",
}

/**
 * Base interface for all job data
 */
export interface BaseJobData {
  type: string;
  [key: string]: unknown;
}

/**
 * Job processor function type
 */
export type JobProcessor<T extends BaseJobData = BaseJobData> = (
  job: Job<T>,
) => Promise<void>;

/**
 * Queue configuration options
 */
export interface QueueConfig {
  name: QueueName;
  defaultJobOptions?: JobsOptions;
  workerConcurrency?: number;
}

/**
 * Queue instance with metadata
 */
export interface QueueInstance<T extends BaseJobData = BaseJobData> {
  queue: Queue<T>;
  worker?: Worker<T>;
  config: QueueConfig;
}
