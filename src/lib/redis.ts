import IORedis from "ioredis";
import { logger } from "./logger.js";
import dotenv from "dotenv";

dotenv.config();
const REDIS_URL = process.env.REDIS_URL;

logger.info(`Initializing Redis connection to URL '${REDIS_URL}'...`);

if (!REDIS_URL) {
  logger.error(
    "REDIS_URL environment variable is not set. Redis connection will not be established.",
  );
  throw new Error(
    "REDIS_URL environment variable is required to establish Redis connection.",
  );
}

export const redisConnection = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});
redisConnection.on("connect", () => {
  logger.info("Redis connected to URL: " + REDIS_URL);
});
