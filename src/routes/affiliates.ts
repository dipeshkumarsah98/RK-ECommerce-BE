import { Router } from "express";
import {
  authenticate,
  requireRoles,
  AuthRequest,
} from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { BadRequestError, NotFoundError } from "../lib/errors.js";
import {
  createAffiliateLink,
  listVendorAffiliates,
  getAffiliateLinkByCode,
  generateAffiliateCode,
} from "../services/affiliate.service.js";
import { CreateVendorAffiliateLinkSchema } from "../types/affiliate.type.js";

const router = Router();

/**
 * @openapi
 * /affiliates:
 *   post:
 *     tags: [Affiliates]
 *     summary: Create an affiliate link (vendor/admin)
 *     description: Generates a unique shareable code with configurable discount and commission rules.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [vendor, affiliate]
 *             properties:
 *               vendor:
 *                 type: object
 *                 required: [name, email, affiliateType]
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   affiliateType:
 *                     type: string
 *                     enum: [INFLUENCER, RESELLER, REFERRAL, PARTNER]
 *                   contact:
 *                     type: string
 *                   address:
 *                     type: string
 *                   bankName:
 *                     type: string
 *                   accountNumber:
 *                     type: string
 *               affiliate:
 *                 type: object
 *                 required: [discountType, discountValue, commissionType, commissionValue]
 *                 properties:
 *                   productId:
 *                     type: string
 *                     format: uuid
 *                   code:
 *                     type: string
 *                     description: Optional pre-generated code. Auto-generated if omitted.
 *                   discountType:
 *                     type: string
 *                     enum: [PERCENTAGE, FIXED]
 *                   discountValue:
 *                     type: number
 *                   commissionType:
 *                     type: string
 *                     enum: [PERCENTAGE, FIXED]
 *                   commissionValue:
 *                     type: number
 *     responses:
 *       201:
 *         description: Affiliate link created with vendor upserted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AffiliateLink'
 *       400:
 *         description: Validation error
 */
router.post(
  "/",
  authenticate,
  requireRoles("admin"),
  validate(CreateVendorAffiliateLinkSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const link = await createAffiliateLink(req.body);
      res.status(201).json(link);
    } catch (err: unknown) {
      if (err instanceof Error) next(new BadRequestError(err.message));
      else next(err);
    }
  },
);

/**
 * @openapi
 * /affiliates:
 *   get:
 *     tags: [Affiliates]
 *     summary: List own affiliate links (vendor/admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of affiliate links owned by the current vendor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AffiliateLink'
 */
router.get(
  "/",
  authenticate,
  requireRoles("vendor", "admin"),
  async (req: AuthRequest, res, next) => {
    try {
      const links = await listVendorAffiliates(req.user!.userId);
      res.json(links);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /affiliates/{code}:
 *   get:
 *     tags: [Affiliates]
 *     summary: Look up an affiliate link by code (public)
 *     description: Used by the frontend to resolve discount and product details before placing an order.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique affiliate code
 *     responses:
 *       200:
 *         description: Affiliate link details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AffiliateLink'
 *       404:
 *         description: Code not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * @openapi
 * /affiliates/generate-code:
 *   get:
 *     tags: [Affiliates]
 *     summary: Generate a unique affiliate code (admin only)
 *     description: Returns a unique, unused affiliate code that can be passed as `affiliate.code` when creating a link.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Generated code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 */
router.get(
  "/generate-code",
  authenticate,
  requireRoles("admin"),
  async (_req, res, next) => {
    try {
      const code = await generateAffiliateCode();
      res.json({ code });
    } catch (err) {
      next(err);
    }
  },
);

router.get("/:code", async (req, res, next) => {
  try {
    const link = await getAffiliateLinkByCode(req.params.code);
    res.json(link);
  } catch {
    next(new NotFoundError("Affiliate link not found"));
  }
});

export default router;
