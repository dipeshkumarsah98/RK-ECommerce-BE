import { Router } from "express";
import { authenticate, requireRoles, AuthRequest } from "../middlewares/auth.js";
import { listVendorEarnings } from "../services/earning.service.js";

const router = Router();

/**
 * @openapi
 * /earnings:
 *   get:
 *     tags: [Earnings]
 *     summary: Get vendor earnings (vendor/admin)
 *     description: >
 *       Returns historical commission records for the current vendor.
 *       Earnings are stored at the time of order completion or COD confirmation
 *       and are never recalculated — preserving historical accuracy.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Earnings summary and records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCommission:
 *                   type: number
 *                 earnings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VendorEarning'
 */
router.get("/", authenticate, requireRoles("vendor", "admin"), async (req: AuthRequest, res, next) => {
  try {
    const earnings = await listVendorEarnings(req.user!.userId);
    res.json(earnings);
  } catch (err) {
    next(err);
  }
});

export default router;
