import { Router } from "express";
import { z } from "zod";
import {
  authenticate,
  requireRoles,
  AuthRequest,
} from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { listOrders } from "../services/order.service.js";
import { listProducts } from "../services/product.service.js";
import {
  listAllWithdrawals,
  getWithdrawalById,
  approveWithdrawal,
  rejectWithdrawal,
  getWithdrawalStats,
} from "../services/withdrawal.service.js";
import { OrderStatus } from "../lib/prisma.js";
import {
  ApproveWithdrawalSchema,
  RejectWithdrawalSchema,
  WithdrawalQuerySchema,
  WithdrawalStatus,
} from "../types/withdrawal.type.js";

const router = Router();

/**
 * @openapi
 * /admin/orders:
 *   get:
 *     tags: [Admin]
 *     summary: List all orders with filters (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, AWAITING_VERIFICATION, VERIFIED, PROCESSING, SHIPPED, COMPLETED, CANCELLED]
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Paginated order list
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
 *                         $ref: '#/components/schemas/Order'
 */
router.get(
  "/orders",
  authenticate,
  requireRoles("admin"),
  async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const status = req.query.status as OrderStatus | undefined;
      const userId = req.query.user_id as string | undefined;
      const result = await listOrders({ userId, status, page, limit });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /admin/products:
 *   get:
 *     tags: [Admin]
 *     summary: List all products (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Paginated product list
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
 *                         $ref: '#/components/schemas/Product'
 */
router.get(
  "/products",
  authenticate,
  requireRoles("admin"),
  async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const result = await listProducts(page, limit);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /admin/withdrawals/stats:
 *   get:
 *     tags: [Admin]
 *     summary: Get withdrawal statistics
 *     description: >
 *       Returns aggregate statistics for all withdrawal requests.
 *       Includes total count and breakdown by status (pending, approved, rejected).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Withdrawal statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRequests:
 *                   type: integer
 *                   description: Total number of withdrawal requests
 *                 pending:
 *                   type: integer
 *                   description: Number of pending requests
 *                 approved:
 *                   type: integer
 *                   description: Number of approved requests
 *                 rejected:
 *                   type: integer
 *                   description: Number of rejected requests
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin role required
 */
router.get(
  "/withdrawals/stats",
  authenticate,
  requireRoles("admin"),
  async (req, res, next) => {
    try {
      const stats = await getWithdrawalStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /admin/withdrawals:
 *   get:
 *     tags: [Admin]
 *     summary: List all withdrawal requests
 *     description: >
 *       Returns all withdrawal requests from all vendors.
 *       Supports filtering by status and pagination.
 *       Includes vendor details for each request.
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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by withdrawal ID, vendor name, or vendor email
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
 *         description: Forbidden - admin role required
 */
router.get(
  "/withdrawals",
  authenticate,
  requireRoles("admin"),
  validate(WithdrawalQuerySchema, "query"),
  async (req, res, next) => {
    try {
      const filters = {
        status: req.query.status as WithdrawalStatus | undefined,
        search: req.query.search as string | undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 20,
      };

      const result = await listAllWithdrawals(filters);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /admin/withdrawals/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: Get a single withdrawal request
 *     description: >
 *       Retrieves detailed information about a specific withdrawal request.
 *       Includes vendor details and admin details (if processed).
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
 *         description: Forbidden - admin role required
 *       404:
 *         description: Withdrawal request not found
 */
router.get(
  "/withdrawals/:id",
  authenticate,
  requireRoles("admin"),
  async (req, res, next) => {
    try {
      const withdrawal = await getWithdrawalById(req.params.id as string);
      res.json(withdrawal);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /admin/withdrawals/{id}/approve:
 *   patch:
 *     tags: [Admin]
 *     summary: Approve a withdrawal request
 *     description: >
 *       Approves a pending withdrawal request and records transaction proof.
 *       Sends email notification to the vendor with transaction details.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionProof
 *             properties:
 *               transactionProof:
 *                 type: string
 *                 format: uri
 *                 description: URL to transaction proof image/document
 *               remarks:
 *                 type: string
 *                 description: Optional remarks about the approval
 *     responses:
 *       200:
 *         description: Withdrawal request approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WithdrawalRequest'
 *       400:
 *         description: Bad request - withdrawal already processed or validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin role required
 *       404:
 *         description: Withdrawal request not found
 */
router.patch(
  "/withdrawals/:id/approve",
  authenticate,
  requireRoles("admin"),
  validate(ApproveWithdrawalSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const withdrawal = await approveWithdrawal(
        req.user!.userId,
        req.params.id as string,
        req.body,
      );
      res.json(withdrawal);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /admin/withdrawals/{id}/reject:
 *   patch:
 *     tags: [Admin]
 *     summary: Reject a withdrawal request
 *     description: >
 *       Rejects a pending withdrawal request with a reason.
 *       Sends email notification to the vendor with rejection details.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rejectionReason
 *             properties:
 *               rejectionReason:
 *                 type: string
 *                 description: Reason for rejecting the withdrawal
 *               remarks:
 *                 type: string
 *                 description: Optional additional remarks
 *     responses:
 *       200:
 *         description: Withdrawal request rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WithdrawalRequest'
 *       400:
 *         description: Bad request - withdrawal already processed or validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin role required
 *       404:
 *         description: Withdrawal request not found
 */
router.patch(
  "/withdrawals/:id/reject",
  authenticate,
  requireRoles("admin"),
  validate(RejectWithdrawalSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const withdrawal = await rejectWithdrawal(
        req.user!.userId,
        req.params.id as string,
        req.body,
      );
      res.json(withdrawal);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
