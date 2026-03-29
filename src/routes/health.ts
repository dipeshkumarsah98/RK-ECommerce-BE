import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { redisConnection } from "../lib/redis.js";
import { logger } from "../lib/logger.js";

const router = Router();

interface HealthStatus {
  status: "healthy" | "unhealthy" | "degraded";
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  services: {
    database: ServiceStatus;
    redis: ServiceStatus;
  };
}

interface ServiceStatus {
  status: "healthy" | "unhealthy";
  responseTime?: number;
  error?: string;
}

/**
 * @openapi
 * /healthz:
 *   get:
 *     tags: [Health]
 *     summary: Basic health check
 *     description: Returns basic health status of the API
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   example: "2026-03-29T12:00:00.000Z"
 *       503:
 *         description: Service is unhealthy
 */
router.get("/healthz", (_req: Request, res: Response) => {
  const healthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(healthStatus);
});

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Comprehensive health check
 *     description: Returns detailed health status including database and redis connectivity
 *     responses:
 *       200:
 *         description: All services are healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [healthy, degraded, unhealthy]
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   example: "2026-03-29T12:00:00.000Z"
 *                 uptime:
 *                   type: number
 *                   example: 3600
 *                 version:
 *                   type: string
 *                   example: "0.0.0"
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                           enum: [healthy, unhealthy]
 *                         responseTime:
 *                           type: number
 *                     redis:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                           enum: [healthy, unhealthy]
 *                         responseTime:
 *                           type: number
 *       503:
 *         description: One or more services are unhealthy
 */
router.get("/health", async (req: Request, res: Response) => {
  const startTime = Date.now();

  try {
    // Check database connectivity
    const dbStatus = await checkDatabaseHealth();

    // Check Redis connectivity
    const redisStatus = await checkRedisHealth();

    // Determine overall status
    const servicesHealthy =
      dbStatus.status === "healthy" && redisStatus.status === "healthy";
    const status: HealthStatus["status"] = servicesHealthy
      ? "healthy"
      : dbStatus.status === "unhealthy" || redisStatus.status === "unhealthy"
        ? "unhealthy"
        : "degraded";

    const healthResponse: HealthStatus = {
      status,
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env.npm_package_version || "0.0.0",
      environment: process.env.NODE_ENV || "development",
      services: {
        database: dbStatus,
        redis: redisStatus,
      },
    };

    const statusCode = status === "healthy" ? 200 : 503;
    const totalResponseTime = Date.now() - startTime;

    logger.info(
      {
        endpoint: "/health",
        status,
        responseTime: totalResponseTime,
        services: healthResponse.services,
      },
      "Health check completed",
    );

    res.status(statusCode).json(healthResponse);
  } catch (error) {
    logger.error({ error }, "Health check failed");

    const errorResponse: HealthStatus = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: process.env.npm_package_version || "0.0.0",
      environment: process.env.NODE_ENV || "development",
      services: {
        database: { status: "unhealthy", error: "Health check failed" },
        redis: { status: "unhealthy", error: "Health check failed" },
      },
    };

    res.status(503).json(errorResponse);
  }
});

/**
 * @openapi
 * /health/database:
 *   get:
 *     tags: [Health]
 *     summary: Database health check
 *     description: Check database connectivity and response time
 *     responses:
 *       200:
 *         description: Database is healthy
 *       503:
 *         description: Database is unhealthy
 */
router.get("/health/database", async (_req: Request, res: Response) => {
  try {
    const dbStatus = await checkDatabaseHealth();
    const statusCode = dbStatus.status === "healthy" ? 200 : 503;

    res.status(statusCode).json({
      service: "database",
      ...dbStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error({ error }, "Database health check failed");
    res.status(503).json({
      service: "database",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * @openapi
 * /health/redis:
 *   get:
 *     tags: [Health]
 *     summary: Redis health check
 *     description: Check Redis connectivity and response time
 *     responses:
 *       200:
 *         description: Redis is healthy
 *       503:
 *         description: Redis is unhealthy
 */
router.get("/health/redis", async (_req: Request, res: Response) => {
  try {
    const redisStatus = await checkRedisHealth();
    const statusCode = redisStatus.status === "healthy" ? 200 : 503;

    res.status(statusCode).json({
      service: "redis",
      ...redisStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error({ error }, "Redis health check failed");
    res.status(503).json({
      service: "redis",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
  }
});

// Helper functions
async function checkDatabaseHealth(): Promise<ServiceStatus> {
  const startTime = Date.now();

  try {
    // Simple query to test database connectivity
    await prisma.$queryRaw`SELECT 1 as test`;
    const responseTime = Date.now() - startTime;

    return {
      status: "healthy",
      responseTime,
    };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown database error",
    };
  }
}

async function checkRedisHealth(): Promise<ServiceStatus> {
  const startTime = Date.now();

  try {
    // Test Redis connectivity with ping
    const pong = await redisConnection.ping();
    const responseTime = Date.now() - startTime;

    if (pong === "PONG") {
      return {
        status: "healthy",
        responseTime,
      };
    } else {
      return {
        status: "unhealthy",
        error: "Redis ping returned unexpected response",
      };
    }
  } catch (error) {
    return {
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown Redis error",
    };
  }
}

export default router;
