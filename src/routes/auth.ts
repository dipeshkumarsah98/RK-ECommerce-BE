import { Router } from "express";
import { z } from "zod";
import { sendOtp, verifyOtp } from "../services/auth.service.js";
import { validate } from "../middlewares/validate.js";
import { BadRequestError } from "../lib/errors.js";

const router = Router();

const SendOtpSchema = z.object({ email: z.string().email() });
const VerifyOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

/**
 * @openapi
 * /auth/send-otp:
 *   post:
 *     tags: [Auth]
 *     summary: Send OTP to email
 *     description: Sends a 6-digit OTP to the provided email. OTP expires in 10 minutes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Failed to send OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/send-otp", validate(SendOtpSchema), async (req, res, next) => {
  try {
    await sendOtp(req.body.email);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /auth/verify-otp:
 *   post:
 *     tags: [Auth]
 *     summary: Verify OTP and receive JWT
 *     description: Verifies the OTP. Creates a new user account if the email is new. Returns a JWT valid for 7 days.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               code:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 6
 *     responses:
 *       200:
 *         description: Authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT bearer token
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/verify-otp", validate(VerifyOtpSchema), async (req, res, next) => {
  try {
    const result = await verifyOtp(req.body.email, req.body.code);
    res.json(result);
  } catch (err: unknown) {
    if (err instanceof Error) next(new BadRequestError(err.message));
    else next(err);
  }
});

export default router;
