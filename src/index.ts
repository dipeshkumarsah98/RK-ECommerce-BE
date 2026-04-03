import app from "./app.js";
import { logger } from "./lib/logger.js";
import { startEmailWorker } from "./queues/emailWorker.js";
import dotenv from "dotenv";

dotenv.config();

const rawPort = process.env["PORT"] || "8000";

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

startEmailWorker();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  logger.info(`API docs available at http://localhost:${port}/docs`);
});
