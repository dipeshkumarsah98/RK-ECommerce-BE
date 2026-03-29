import { Router } from "express";
import { z } from "zod";
import { authenticate, requireRoles, AuthRequest } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { BadRequestError, ForbiddenError, NotFoundError } from "../lib/errors.js";
import {
  createOrder,
  listOrders,
  getOrderById,
  updateOrderStatus,
} from "../services/order.service.js";
import { OrderStatus } from "../generated/prisma/index.js";
import { enqueueOrderConfirmation, enqueueAdminNewOrder } from "../queues/emailQueue.js";
import { prisma } from "../lib/prisma.js";

const router = Router();

const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

const CreateOrderSchema = z.object({
  affiliateCode: z.string().optional(),
  paymentMethod: z.enum(["ESEWA", "KHALTI", "COD"]),
  items: z.array(OrderItemSchema).min(1),
});

const UpdateStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});

/**
 * @openapi
 * /orders:
 *   post:
 *     tags: [Orders]
 *     summary: Place an order
 *     description: >
 *       Creates an order atomically with stock deduction. COD orders start in AWAITING_VERIFICATION.
 *       Online payment orders start in PENDING. An order confirmation email is queued on success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [paymentMethod, items]
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 enum: [ESEWA, KHALTI, COD]
 *               affiliateCode:
 *                 type: string
 *                 description: Optional affiliate link code for discount
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error or insufficient stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validate(CreateOrderSchema), async (req: AuthRequest, res, next) => {
  try {
    const order = await createOrder({
      ...req.body,
      userId: req.user?.userId,
    });

    // Queue emails asynchronously — don't await to keep response fast
    const customerEmail = req.user?.userId
      ? await prisma.user.findUnique({ where: { id: req.user.userId }, select: { email: true } }).then((u) => u?.email)
      : undefined;

    const itemsWithTitles = await Promise.all(
      order.items.map(async (item) => {
        const product = await prisma.product.findUnique({ where: { id: item.productId }, select: { title: true } });
        return { title: product?.title ?? item.productId, quantity: item.quantity, price: item.price };
      })
    );

    if (customerEmail) {
      enqueueOrderConfirmation({
        to: customerEmail,
        orderId: order.id,
        finalAmount: order.finalAmount,
        paymentMethod: order.paymentMethod,
        items: itemsWithTitles,
      }).catch(() => {});
    }

    enqueueAdminNewOrder({
      orderId: order.id,
      finalAmount: order.finalAmount,
      paymentMethod: order.paymentMethod,
      customerEmail,
    }).catch(() => {});

    res.status(201).json(order);
  } catch (err: unknown) {
    if (err instanceof Error) next(new BadRequestError(err.message));
    else next(err);
  }
});

/**
 * @openapi
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: List orders
 *     description: Customers see only their own orders. Admins can filter by user_id and status.
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
 *         description: Admin only — filter by customer user ID
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
router.get("/", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const isAdmin = req.user!.roles.includes("admin");
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const status = req.query.status as OrderStatus | undefined;
    const userId = isAdmin ? (req.query.user_id as string | undefined) : req.user!.userId;
    const result = await listOrders({ userId, status, page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get a single order
 *     description: Customers can only access their own orders. Admins can access any.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Order details with items, payment, and verification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.get("/:id", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const isAdmin = req.user!.roles.includes("admin");
    const order = await getOrderById(req.params.id, isAdmin ? undefined : req.user!.userId);
    res.json(order);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "Forbidden") next(new ForbiddenError());
    else next(new NotFoundError("Order not found"));
  }
});

/**
 * @openapi
 * /orders/{id}/status:
 *   patch:
 *     tags: [Orders]
 *     summary: Update order status (admin only)
 *     description: >
 *       Cancelling an order automatically restores stock via OUT→IN movements.
 *       Completing an order triggers vendor earnings calculation if affiliate is involved.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, AWAITING_VERIFICATION, VERIFIED, PROCESSING, SHIPPED, COMPLETED, CANCELLED]
 *     responses:
 *       200:
 *         description: Updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid status transition
 *       404:
 *         description: Order not found
 */
router.patch(
  "/:id/status",
  authenticate,
  requireRoles("admin"),
  validate(UpdateStatusSchema),
  async (req, res, next) => {
    try {
      const order = await updateOrderStatus(req.params.id, req.body.status);
      res.json(order);
    } catch (err: unknown) {
      if (err instanceof Error) next(new BadRequestError(err.message));
      else next(err);
    }
  }
);

export default router;
