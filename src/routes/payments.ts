import { Router } from "express";
import { z } from "zod";
import { authenticate } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { BadRequestError } from "../lib/errors.js";
import { initiatePayment, handlePaymentCallback } from "../services/payment.service.js";

const router = Router();

const InitiateSchema = z.object({
  orderId: z.string().uuid(),
  provider: z.enum(["ESEWA", "KHALTI"]),
  returnUrl: z.string().url(),
  failureUrl: z.string().url().optional(),
});

const CallbackSchema = z.object({
  provider: z.enum(["ESEWA", "KHALTI"]),
  orderId: z.string(),
  transactionId: z.string(),
  status: z.enum(["SUCCESS", "FAILED"]),
  amount: z.number().optional(),
});

/**
 * @openapi
 * /payments/initiate:
 *   post:
 *     tags: [Payments]
 *     summary: Initiate an online payment
 *     description: Returns a redirect URL to eSewa or Khalti payment gateway.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId, provider, returnUrl]
 *             properties:
 *               orderId:
 *                 type: string
 *                 format: uuid
 *               provider:
 *                 type: string
 *                 enum: [ESEWA, KHALTI]
 *               returnUrl:
 *                 type: string
 *                 format: uri
 *               failureUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Payment URL to redirect user to
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentUrl:
 *                   type: string
 *                 orderId:
 *                   type: string
 *                 amount:
 *                   type: number
 *       400:
 *         description: Order not in payable state
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/initiate", authenticate, validate(InitiateSchema), async (req, res, next) => {
  try {
    const result = await initiatePayment(req.body);
    res.json(result);
  } catch (err: unknown) {
    if (err instanceof Error) next(new BadRequestError(err.message));
    else next(err);
  }
});

/**
 * @openapi
 * /payments/callback:
 *   post:
 *     tags: [Payments]
 *     summary: Handle payment gateway callback
 *     description: >
 *       Receives asynchronous webhook from eSewa/Khalti. Idempotent — duplicate SUCCESS callbacks
 *       for the same order are silently accepted. On success, order moves to PROCESSING.
 *       On failure, order is CANCELLED and stock is restored.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [provider, orderId, transactionId, status]
 *             properties:
 *               provider:
 *                 type: string
 *                 enum: [ESEWA, KHALTI]
 *               orderId:
 *                 type: string
 *               transactionId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [SUCCESS, FAILED]
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Callback processed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 payment:
 *                   $ref: '#/components/schemas/Payment'
 */
router.post("/callback", validate(CallbackSchema), async (req, res, next) => {
  try {
    const result = await handlePaymentCallback(req.body);
    res.json(result);
  } catch (err: unknown) {
    if (err instanceof Error) next(new BadRequestError(err.message));
    else next(err);
  }
});

export default router;
