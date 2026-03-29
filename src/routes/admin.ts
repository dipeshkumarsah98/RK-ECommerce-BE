import { Router } from "express";
import { authenticate, requireRoles } from "../middlewares/auth.js";
import { listOrders } from "../services/order.service.js";
import { listProducts } from "../services/product.service.js";
import { OrderStatus } from "../generated/prisma/index.js";

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
router.get("/orders", authenticate, requireRoles("admin"), async (req, res, next) => {
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
});

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
router.get("/products", authenticate, requireRoles("admin"), async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const result = await listProducts(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
