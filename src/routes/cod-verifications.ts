import { Router } from "express";
import { z } from "zod";
import {
  authenticate,
  requireRoles,
  AuthRequest,
} from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { BadRequestError } from "../lib/errors.js";
import { verifyCODOrder } from "../services/cod.service.js";
import { VerificationStatus } from "../lib/prisma.js";

const router = Router();

const VerifySchema = z.object({
  orderId: z.string().uuid(),
  verificationStatus: z.nativeEnum(VerificationStatus),
  customerResponse: z.enum(["intentional", "not_intentional"]),
  remarks: z.string().optional(),
});

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
