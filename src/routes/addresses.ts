import { Router } from "express";
import { authenticate, requireRoles } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { createAddress } from "../services/address.service.js";
import { CreateAddressSchema } from "../types/address.type.js";

const router = Router();

/**
 * @openapi
 * /addresses:
 *   post:
 *     tags: [Addresses]
 *     summary: Create a new address (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, addressType, city]
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *               addressType:
 *                 type: string
 *                 enum: [shipping, billing]
 *               street_address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Address created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Insufficient permissions
 */
router.post(
  "/",
  authenticate,
  requireRoles("admin"),
  validate(CreateAddressSchema),
  async (req, res, next) => {
    try {
      const address = await createAddress(req.body);
      res.status(201).json(address);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
