import { Router, type IRouter } from "express";
const router: IRouter = Router();

/**
 * @openapi
 * /healthz:
 *   get:
 *     tags: [Health]
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.get("/healthz", (_req, res) => {
  // const data = HealthCheckResponse.parse({ status: "ok" });
  res.json({
    status: data.status,
  });
});

export default router;
