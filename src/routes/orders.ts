import { Router } from "express";
import { z } from "zod";
import {
  authenticate,
  requireRoles,
  AuthRequest,
} from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../lib/errors.js";
import {
  createOrder,
  listOrders,
  getOrderById,
  updateOrderStatus,
} from "../services/order.service.js";
import { OrderStatus } from "../lib/prisma.js";

const router = Router();

const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

const AddressSchema = z.object({
  street_address: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
});

const CreateOrderSchema = z
  .object({
    // Customer info (for guest or finding existing user)
    customerEmail: z.string().email(),
    customerName: z.string(),
    customerPhone: z.string().optional(),

    // Override userId (admin creating on behalf of someone)
    userId: z.string().uuid().optional(),

    // Addresses (either provide IDs or full address objects)
    shippingAddressId: z.string().uuid().optional(),
    shippingAddress: AddressSchema.optional(),
    billingAddressId: z.string().uuid().optional(),
    billingAddress: AddressSchema.optional(),

    // Order details
    affiliateCode: z.string().optional(),
    paymentMethod: z.enum(["ESEWA", "KHALTI", "COD"]),
    items: z.array(OrderItemSchema).min(1),
    notes: z.string().optional(),
  })
  .refine((data) => data.shippingAddressId || data.shippingAddress, {
    message: "Either shippingAddressId or shippingAddress is required",
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
 *       Creates an order with automatic user lookup/creation by email. Supports guest orders,
 *       returning customers (via addressId), and admin creating orders on behalf of others (via userId).
 *       COD orders start in AWAITING_VERIFICATION. Online payments start in PENDING.
 *       Stock is deducted atomically. Order confirmation emails are sent to customer and admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [customerEmail, customerName, paymentMethod, items]
 *             properties:
 *               customerEmail:
 *                 type: string
 *                 format: email
 *                 description: Customer email (used to find/create user)
 *               customerName:
 *                 type: string
 *                 description: Customer name
 *               customerPhone:
 *                 type: string
 *                 description: Customer phone number
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: Admin only - override to create order on behalf of specific user
 *               shippingAddressId:
 *                 type: string
 *                 format: uuid
 *                 description: Existing address ID (for returning customers)
 *               shippingAddress:
 *                 type: object
 *                 description: New shipping address (required if shippingAddressId not provided)
 *                 required: [city]
 *                 properties:
 *                   street_address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postal_code:
 *                     type: string
 *               billingAddressId:
 *                 type: string
 *                 format: uuid
 *                 description: Existing billing address ID (defaults to shipping)
 *               billingAddress:
 *                 type: object
 *                 description: New billing address (defaults to shipping if not provided)
 *                 required: [city]
 *                 properties:
 *                   street_address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postal_code:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [ESEWA, KHALTI, COD]
 *               affiliateCode:
 *                 type: string
 *                 description: Optional affiliate code for discount
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *               notes:
 *                 type: string
 *                 description: Additional order notes or instructions
 *     responses:
 *       201:
 *         description: Order created successfully
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
router.post(
  "/",
  validate(CreateOrderSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const order = await createOrder({
        ...req.body,
        // Admin can override userId; otherwise determined by service
        requestingUserId: req.user?.roles,
      });

      res.status(201).json(order);
    } catch (err: unknown) {
      if (err instanceof Error) next(new BadRequestError(err.message));
      else next(err);
    }
  },
);

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
    const userId = isAdmin
      ? (req.query.user_id as string | undefined)
      : req.user!.userId;
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
    const order = await getOrderById(
      req.params.id as string,
      isAdmin ? undefined : req.user!.userId,
    );
    res.json(order);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "Forbidden")
      next(new ForbiddenError());
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
      const order = await updateOrderStatus(
        req.params.id as string,
        req.body.status,
      );
      res.json(order);
    } catch (err: unknown) {
      if (err instanceof Error) next(new BadRequestError(err.message));
      else next(err);
    }
  },
);

export default router;
