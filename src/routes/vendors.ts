import { Router } from "express";
import { z } from "zod";
import {
  authenticate,
  requireRoles,
  AuthRequest,
} from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { OrderStatus } from "../lib/prisma.js";
import {
  getVendorOrders,
  getVendorOrderById,
  getVendorOrderStats,
  getVendorCommissionHistory,
  getVendorCommissionTrends,
  getVendorCommissionSummary,
} from "../services/vendor.service.js";
import {
  createWithdrawalRequest,
  listVendorWithdrawals,
  getVendorWithdrawalById,
  getVendorBalance,
} from "../services/withdrawal.service.js";
import {
  CreateWithdrawalRequestSchema,
  WithdrawalQuerySchema,
  WithdrawalStatus,
} from "../types/withdrawal.type.js";

const router = Router();

const VendorOrderQuerySchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  affiliateCode: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

/**
 * @openapi
 * /vendors/orders/stats:
 *   get:
 *     tags: [Vendors]
 *     summary: Get vendor order statistics
 *     description: >
 *       Returns comprehensive statistics for all orders placed through the vendor's affiliate links.
 *       Includes total orders, revenue, commission earned, breakdown by order status,
 *       and top performing affiliate links.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor order statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOrders:
 *                   type: integer
 *                   description: Total number of orders through vendor's affiliate links
 *                 totalRevenue:
 *                   type: number
 *                   description: Sum of all order amounts (gross revenue)
 *                 totalCommission:
 *                   type: number
 *                   description: Total commission earned by vendor
 *                 ordersByStatus:
 *                   type: object
 *                   description: Count of orders grouped by status
 *                   additionalProperties:
 *                     type: integer
 *                 topAffiliateLinks:
 *                   type: array
 *                   description: Top 10 affiliate links by revenue
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                       orderCount:
 *                         type: integer
 *                       revenue:
 *                         type: number
 *                       commission:
 *                         type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - vendor role required
 */
router.get(
  "/orders/stats",
  authenticate,
  requireRoles("vendor"),
  async (req: AuthRequest, res, next) => {
    try {
      const stats = await getVendorOrderStats(req.user!.userId);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /vendors/orders:
 *   get:
 *     tags: [Vendors]
 *     summary: List vendor's orders
 *     description: >
 *       Returns all orders placed using the vendor's affiliate links.
 *       Supports filtering by status and specific affiliate code.
 *       Each order includes items, affiliate details, customer info, payment status, and earnings.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, AWAITING_VERIFICATION, VERIFIED, PROCESSING, SHIPPED, COMPLETED, CANCELLED]
 *         description: Filter by order status
 *       - in: query
 *         name: affiliateCode
 *         schema:
 *           type: string
 *         description: Filter by specific affiliate code
 *     responses:
 *       200:
 *         description: Paginated list of vendor orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - vendor role required
 *       404:
 *         description: Affiliate code not found
 */
router.get(
  "/orders",
  authenticate,
  requireRoles("vendor"),
  validate(VendorOrderQuerySchema, "query"),
  async (req: AuthRequest, res, next) => {
    try {
      const filters = {
        status: req.query.status as OrderStatus | undefined,
        affiliateCode: req.query.affiliateCode as string | undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 20,
      };

      const result = await getVendorOrders(req.user!.userId, filters);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /vendors/orders/{id}:
 *   get:
 *     tags: [Vendors]
 *     summary: Get a single vendor order
 *     description: >
 *       Retrieves detailed information about a specific order placed through the vendor's affiliate links.
 *       Includes full order details, items, customer info, payment, verification status, earnings, and addresses.
 *       Only accessible if the order was placed using one of the vendor's affiliate codes.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - order does not belong to vendor's affiliate links
 *       404:
 *         description: Order not found
 */
router.get(
  "/orders/:id",
  authenticate,
  requireRoles("vendor"),
  async (req: AuthRequest, res, next) => {
    try {
      const order = await getVendorOrderById(
        req.user!.userId,
        req.params.id as string,
      );
      res.json(order);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /vendors/commissions/summary:
 *   get:
 *     tags: [Vendors]
 *     summary: Get vendor commission summary statistics
 *     description: >
 *       Returns a high-level summary of vendor commission statistics including total commission earned,
 *       number of active affiliate links, total orders placed through affiliate links, and completed orders.
 *       Useful for dashboard overview widgets and quick stats display.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Commission summary statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCommission:
 *                   type: number
 *                   description: Total commission earned across all affiliate links
 *                 activeLinks:
 *                   type: integer
 *                   description: Number of active affiliate links
 *                 totalOrders:
 *                   type: integer
 *                   description: Total number of orders placed through affiliate links (excluding AWAITING_VERIFICATION)
 *                 completedOrders:
 *                   type: integer
 *                   description: Number of completed/delivered orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - vendor role required
 */
router.get(
  "/commissions/summary",
  authenticate,
  requireRoles("vendor"),
  async (req: AuthRequest, res, next) => {
    try {
      const summary = await getVendorCommissionSummary(req.user!.userId);
      res.json(summary);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /vendors/commissions/trends:
 *   get:
 *     tags: [Vendors]
 *     summary: Get vendor commission trends over time
 *     description: >
 *       Returns time-series data of commission earnings grouped by period (monthly, weekly, or daily).
 *       Each period includes total commission, order count, and breakdown by affiliate code.
 *       Useful for rendering charts and analyzing performance trends.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [monthly, weekly, daily]
 *           default: monthly
 *         description: Time period granularity for grouping
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date (inclusive). Defaults to 12 months ago.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date (inclusive). Defaults to today.
 *       - in: query
 *         name: affiliateCode
 *         schema:
 *           type: string
 *         description: Filter to a specific affiliate code
 *     responses:
 *       200:
 *         description: Commission trends data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 period:
 *                   type: string
 *                   enum: [monthly, weekly, daily]
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 trends:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       period:
 *                         type: string
 *                         description: Period key (YYYY-MM, YYYY-Wnn, or YYYY-MM-DD)
 *                       totalCommission:
 *                         type: number
 *                       orderCount:
 *                         type: integer
 *                       affiliateBreakdown:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             code:
 *                               type: string
 *                             commission:
 *                               type: number
 *                             orderCount:
 *                               type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - vendor role required or affiliate code doesn't belong to vendor
 *       404:
 *         description: Affiliate code not found
 */
const VendorCommissionTrendsQuerySchema = z.object({
  period: z.enum(["monthly", "weekly", "daily"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  affiliateCode: z.string().optional(),
});

router.get(
  "/commissions/trends",
  authenticate,
  requireRoles("vendor"),
  validate(VendorCommissionTrendsQuerySchema, "query"),
  async (req: AuthRequest, res, next) => {
    try {
      const result = await getVendorCommissionTrends(req.user!.userId, {
        period:
          (req.query.period as "monthly" | "weekly" | "daily") || "monthly",
        startDate: req.query.startDate as string | undefined,
        endDate: req.query.endDate as string | undefined,
        affiliateCode: req.query.affiliateCode as string | undefined,
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /vendors/commissions:
 *   get:
 *     tags: [Vendors]
 *     summary: Get vendor commission history grouped by affiliate code
 *     description: >
 *       Returns commission data grouped by affiliate link. Each row represents one affiliate code
 *       and includes total commission earned, order counts, last delivery date, and product info.
 *       Supports filtering by date range, active status, and sorting by various fields.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [totalCommission, orderCount, lastOrderDate, code]
 *           default: totalCommission
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort direction
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active/inactive affiliate links
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter earnings from this date (inclusive)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter earnings up to this date (inclusive)
 *     responses:
 *       200:
 *         description: Paginated commission history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       affiliateLinkId:
 *                         type: string
 *                       code:
 *                         type: string
 *                       product:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           slug:
 *                             type: string
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                           price:
 *                             type: number
 *                       totalCommission:
 *                         type: number
 *                       totalOrders:
 *                         type: integer
 *                       completedOrders:
 *                         type: integer
 *                       lastCompletedOrderDate:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       commissionType:
 *                         type: string
 *                       commissionValue:
 *                         type: number
 *                       discountType:
 *                         type: string
 *                       discountValue:
 *                         type: number
 *                       isActive:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - vendor role required
 */
const VendorCommissionQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  sortBy: z
    .enum(["totalCommission", "orderCount", "lastOrderDate", "code"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  isActive: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

router.get(
  "/commissions",
  authenticate,
  requireRoles("vendor"),
  validate(VendorCommissionQuerySchema, "query"),
  async (req: AuthRequest, res, next) => {
    try {
      const result = await getVendorCommissionHistory(req.user!.userId, {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 20,
        sortBy:
          (req.query.sortBy as
            | "totalCommission"
            | "orderCount"
            | "lastOrderDate"
            | "code") || "totalCommission",
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        isActive:
          req.query.isActive !== undefined
            ? req.query.isActive === "true"
            : undefined,
        startDate: req.query.startDate as string | undefined,
        endDate: req.query.endDate as string | undefined,
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /vendors/withdrawals/balance:
 *   get:
 *     tags: [Vendors]
 *     summary: Get vendor balance
 *     description: >
 *       Returns the vendor's earnings balance breakdown including total earnings,
 *       pending withdrawals, approved withdrawals, and available balance for withdrawal.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor balance breakdown
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalEarnings:
 *                   type: number
 *                   description: Total commission earned
 *                 pendingWithdrawals:
 *                   type: number
 *                   description: Sum of pending withdrawal requests
 *                 approvedWithdrawals:
 *                   type: number
 *                   description: Sum of approved withdrawals
 *                 availableBalance:
 *                   type: number
 *                   description: Available amount for withdrawal
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - vendor role required
 */
router.get(
  "/withdrawals/balance",
  authenticate,
  requireRoles("vendor"),
  async (req: AuthRequest, res, next) => {
    try {
      const balance = await getVendorBalance(req.user!.userId);
      res.json(balance);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /vendors/withdrawals:
 *   post:
 *     tags: [Vendors]
 *     summary: Create a withdrawal request
 *     description: >
 *       Submits a new withdrawal request for the vendor's available balance.
 *       Validates minimum amount (NPR 500), ensures no existing pending request,
 *       checks cooldown period (7 days), and verifies sufficient balance.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 500
 *                 description: Withdrawal amount in NPR
 *               remarks:
 *                 type: string
 *                 description: Optional remarks for the withdrawal request
 *     responses:
 *       201:
 *         description: Withdrawal request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WithdrawalRequest'
 *       400:
 *         description: Bad request - validation failed, insufficient balance, or within cooldown period
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - vendor role required
 *       409:
 *         description: Conflict - existing pending withdrawal request
 */
router.post(
  "/withdrawals",
  authenticate,
  requireRoles("vendor"),
  validate(CreateWithdrawalRequestSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const withdrawal = await createWithdrawalRequest(
        req.user!.userId,
        req.body,
      );
      res.status(201).json(withdrawal);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /vendors/withdrawals:
 *   get:
 *     tags: [Vendors]
 *     summary: List vendor's withdrawal requests
 *     description: >
 *       Returns all withdrawal requests submitted by the vendor.
 *       Supports filtering by status and pagination.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         description: Filter by withdrawal status
 *     responses:
 *       200:
 *         description: Paginated list of withdrawal requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WithdrawalRequest'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - vendor role required
 */
router.get(
  "/withdrawals",
  authenticate,
  requireRoles("vendor"),
  validate(WithdrawalQuerySchema, "query"),
  async (req: AuthRequest, res, next) => {
    try {
      const filters = {
        status: req.query.status as WithdrawalStatus | undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 20,
      };

      const result = await listVendorWithdrawals(req.user!.userId, filters);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /vendors/withdrawals/{id}:
 *   get:
 *     tags: [Vendors]
 *     summary: Get a single withdrawal request
 *     description: >
 *       Retrieves detailed information about a specific withdrawal request.
 *       Only accessible if the withdrawal belongs to the authenticated vendor.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Withdrawal request ID
 *     responses:
 *       200:
 *         description: Withdrawal request details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WithdrawalRequest'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - vendor role required
 *       404:
 *         description: Withdrawal request not found
 */
router.get(
  "/withdrawals/:id",
  authenticate,
  requireRoles("vendor"),
  async (req: AuthRequest, res, next) => {
    try {
      const withdrawal = await getVendorWithdrawalById(
        req.user!.userId,
        req.params.id as string,
      );
      res.json(withdrawal);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
