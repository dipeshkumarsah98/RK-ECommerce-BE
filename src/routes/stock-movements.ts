import { Router } from "express";
import { z } from "zod";
import { authenticate, requireRoles, AuthRequest } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { createStockMovement, listStockMovements } from "../services/stock.service.js";
import { StockMovementType } from "../generated/prisma/index.js";
import { BadRequestError } from "../lib/errors.js";

const router = Router();

const CreateMovementSchema = z.object({
  productId: z.string().uuid(),
  type: z.nativeEnum(StockMovementType),
  quantity: z.number().int().positive(),
  reason: z.enum(["RESTOCK", "ORDER_PLACED", "ORDER_CANCELLED", "RETURN", "CORRECTION"]),
  notes: z.string().optional(),
});

/**
 * @openapi
 * /stock-movements:
 *   post:
 *     tags: [Stock]
 *     summary: Create a manual stock movement (admin only)
 *     description: Records an inventory adjustment. Stock is NEVER updated directly — only via movements.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, type, quantity, reason]
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *               type:
 *                 type: string
 *                 enum: [IN, OUT]
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               reason:
 *                 type: string
 *                 enum: [RESTOCK, ORDER_PLACED, ORDER_CANCELLED, RETURN, CORRECTION]
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movement recorded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockMovement'
 *       400:
 *         description: Insufficient stock or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/",
  authenticate,
  requireRoles("admin"),
  validate(CreateMovementSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const movement = await createStockMovement({
        ...req.body,
        userId: req.user!.userId,
      });
      res.status(201).json(movement);
    } catch (err: unknown) {
      if (err instanceof Error) next(new BadRequestError(err.message));
      else next(err);
    }
  }
);

/**
 * @openapi
 * /stock-movements:
 *   get:
 *     tags: [Stock]
 *     summary: List stock movements (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: product_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by product ID
 *     responses:
 *       200:
 *         description: List of stock movements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockMovement'
 */
router.get("/", authenticate, requireRoles("admin"), async (req, res, next) => {
  try {
    const productId = typeof req.query.product_id === "string" ? req.query.product_id : undefined;
    const movements = await listStockMovements(productId);
    res.json(movements);
  } catch (err) {
    next(err);
  }
});

export default router;
