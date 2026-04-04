import { Router } from "express";
import { z } from "zod";
import {
  authenticate,
  requireRoles,
  AuthRequest,
} from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { BadRequestError } from "../lib/errors.js";
import {
  verifyCODOrder,
  listCODVerifications,
  getCODStats,
} from "../services/cod.service.js";
import { VerificationStatus } from "../lib/prisma.js";

const router = Router();

const ListQuerySchema = z.object({
  status: z.nativeEnum(VerificationStatus).optional(),
  fromDate: z.string().date().optional(),
  toDate: z.string().date().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

const VerifySchema = z.object({
  orderId: z.string().uuid(),
  verificationStatus: z.nativeEnum(VerificationStatus),
  customerResponse: z.enum(["intentional", "not_intentional"]),
  remarks: z.string().optional(),
});

/**
 * @openapi
 * /cod-verifications/stats:
 *   get:
 *     tags: [COD Verification]
 *     summary: Get COD verification statistics (admin only)
 *     description: Returns aggregated statistics including total COD orders, pending verification count, verified today count, and rejection rate.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: COD verification statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCODOrders:
 *                   type: integer
 *                   description: Total number of COD orders
 *                 pendingVerification:
 *                   type: integer
 *                   description: Number of orders awaiting verification
 *                 verifiedToday:
 *                   type: integer
 *                   description: Number of orders verified today
 *                 rejectionRate:
 *                   type: string
 *                   description: Percentage of rejected verifications (e.g., "15.5%")
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 */
router.get(
  "/stats",
  authenticate,
  requireRoles("admin"),
  async (req, res, next) => {
    try {
      const stats = await getCODStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /cod-verifications:
 *   get:
 *     tags: [COD Verification]
 *     summary: List COD verification orders (admin only)
 *     description: >
 *       Returns a paginated list of COD verifications with filtering by status,
 *       date range, and search across order number, customer name, email, and phone.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, CONFIRMED, REJECTED]
 *         description: Filter by verification status
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter verifications created from this date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter verifications created until this date
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by order number, customer name, email, or phone
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated list of COD verifications
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Pagination'
 *                 - type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/CODVerification'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin access required
 */
router.get(
  "/",
  authenticate,
  requireRoles("admin"),
  validate(ListQuerySchema, "query"),
  async (req: AuthRequest, res, next) => {
    try {
      const { status, fromDate, toDate, search, page, limit } = req.query;

      const filters = {
        status: status as VerificationStatus | undefined,
        fromDate: fromDate ? new Date(fromDate as string) : undefined,
        toDate: toDate ? new Date(toDate as string) : undefined,
        search: search as string | undefined,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      };

      const result = await listCODVerifications(filters);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /cod-verifications:
 *   post:
 *     tags: [COD Verification]
 *     summary: Verify a COD order (admin only)
 *     description: >
 *       Admin contacts the customer and records the outcome.
 *       CONFIRMED → order moves to PROCESSING, earnings recorded.
 *       REJECTED → order CANCELLED, stock restored via IN movements.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId, verificationStatus, customerResponse]
 *             properties:
 *               orderId:
 *                 type: string
 *                 format: uuid
 *               verificationStatus:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, REJECTED]
 *               customerResponse:
 *                 type: string
 *                 enum: [intentional, not_intentional]
 *               remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Verification recorded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CODVerification'
 *       400:
 *         description: Order not in verifiable state or already verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/",
  authenticate,
  requireRoles("admin"),
  validate(VerifySchema),
  async (req: AuthRequest, res, next) => {
    try {
      const verification = await verifyCODOrder({
        ...req.body,
        adminId: req.user!.userId,
      });
      res.status(201).json(verification);
    } catch (err: unknown) {
      if (err instanceof Error) next(new BadRequestError(err.message));
      else next(err);
    }
  },
);

export default router;
