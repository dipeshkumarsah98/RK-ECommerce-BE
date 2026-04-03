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
} from "../services/vendor.service.js";

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

export default router;
