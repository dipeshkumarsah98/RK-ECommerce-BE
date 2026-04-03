import { Router } from "express";
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
  createAffiliateLink,
  listVendorAffiliates,
  getAffiliateLinkByCode,
  getAffiliateLinkById,
  updateAffiliateLink,
  generateAffiliateCode,
} from "../services/affiliate.service.js";
import {
  CreateVendorAffiliateLinkSchema,
  UpdateAffiliateLinkSchema,
} from "../types/affiliate.type.js";

const router = Router();

/**
 * @openapi
 * /affiliates:
 *   post:
 *     tags: [Affiliates]
 *     summary: Create an affiliate link (vendor/admin)
 *     description: >
 *       Generates a unique shareable code with configurable discount and commission rules.
 *       Either provide vendorId (to link to existing user) OR vendor info (to create/update vendor).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [affiliate]
 *             properties:
 *               vendorId:
 *                 type: string
 *                 format: uuid
 *                 description: Optional - use existing user as vendor. Provide either this OR vendor info.
 *               vendor:
 *                 type: object
 *                 description: Optional - vendor info to create/update. Provide either this OR vendorId.
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
      console.log("Error creating affiliate link:", err);
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
 *     summary: List affiliate links (vendor/admin)
 *     description: Search, filter, and paginate affiliate links. Vendors see only their own links unless they are also admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: vendorId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by vendor ID (admin only)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by vendor name, email, or affiliate code (case-insensitive)
 *       - in: query
 *         name: affiliateType
 *         schema:
 *           type: string
 *           enum: [INFLUENCER, RESELLER, REFERRAL, PARTNER]
 *         description: Filter by affiliate vendor type
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
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, code, discountValue, commissionValue]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Paginated list of affiliate links with stats
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
 *                         $ref: '#/components/schemas/AffiliateLink'
 *                     search:
 *                       type: string
 *                       description: The search query used (if any)
 *                     affiliateType:
 *                       type: string
 *                       description: The affiliate type filter used (if any)
 *                     stats:
 *                       type: object
 *                       description: Statistics about the filtered affiliate links
 *                       properties:
 *                         totalAffiliates:
 *                           type: integer
 *                           description: Total number of affiliate links matching the filter
 *                         active:
 *                           type: integer
 *                           description: Number of active affiliate links
 *                         inactive:
 *                           type: integer
 *                           description: Number of inactive affiliate links
 *                         productsLinked:
 *                           type: integer
 *                           description: Number of unique products linked to affiliates
 */
router.get(
  "/",
  authenticate,
  requireRoles("vendor", "admin"),
  async (req: AuthRequest, res, next) => {
    try {
      const isAdmin = req.user!.roles.includes("admin");

      // Vendors can only see their own affiliates unless they're also admin
      const vendorIdFilter = req.query.vendorId as string | undefined;
      let vendorId = vendorIdFilter;

      // Non-admin vendors can only query their own affiliates
      if (!isAdmin) {
        vendorId = req.user!.userId;
      }

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const search = req.query.search as string | undefined;
      const affiliateType = req.query.affiliateType as string | undefined;
      const sortBy =
        (req.query.sortBy as
          | "createdAt"
          | "code"
          | "discountValue"
          | "commissionValue") || "createdAt";
      const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

      const result = await listVendorAffiliates({
        vendorId,
        search,
        affiliateType,
        page,
        limit,
        sortBy,
        sortOrder,
      });

      res.json(result);
    } catch (err) {
      next(err);
    }
  },
);

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

/**
 * @openapi
 * /affiliates/{id}:
 *   get:
 *     tags: [Affiliates]
 *     summary: Get affiliate link by ID (admin or self vendor)
 *     description: Retrieve a specific affiliate link by its UUID. Accessible by admins or the owning vendor.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The affiliate link UUID
 *     responses:
 *       200:
 *         description: Affiliate link details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AffiliateLink'
 *       403:
 *         description: Forbidden - not admin or owner
 *       404:
 *         description: Affiliate link not found
 */
router.get("/:id", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const id = req.params.id as string;
    // Only process if param looks like a UUID (to avoid conflict with /:code route)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return next(); // Pass to next route handler (/:code)
    }

    const link = await getAffiliateLinkById(id);

    // Authorization: admin or self vendor
    const isAdmin = req.user!.roles.includes("admin");
    const isOwner = link.vendorId === req.user!.userId;

    if (!isAdmin && !isOwner) {
      throw new ForbiddenError(
        "You do not have permission to access this affiliate link",
      );
    }

    res.json(link);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /affiliates/{id}:
 *   patch:
 *     tags: [Affiliates]
 *     summary: Update affiliate link (admin or self vendor)
 *     description: Update an affiliate link's configuration. Accessible by admins or the owning vendor.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The affiliate link UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *               code:
 *                 type: string
 *               discountType:
 *                 type: string
 *                 enum: [PERCENTAGE, FIXED]
 *               discountValue:
 *                 type: number
 *               commissionType:
 *                 type: string
 *                 enum: [PERCENTAGE, FIXED]
 *               commissionValue:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated affiliate link
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AffiliateLink'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden - not admin or owner
 *       404:
 *         description: Affiliate link not found
 */
router.patch(
  "/:id",
  authenticate,
  validate(UpdateAffiliateLinkSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const id = req.params.id as string;
      // Verify UUID format
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        throw new BadRequestError("Invalid affiliate link ID format");
      }

      // Get existing link to check ownership
      const existingLink = await getAffiliateLinkById(id);

      // Authorization: admin or self vendor
      const isAdmin = req.user!.roles.includes("admin");
      const isOwner = existingLink.vendorId === req.user!.userId;

      if (!isAdmin && !isOwner) {
        throw new ForbiddenError(
          "You do not have permission to update this affiliate link",
        );
      }

      const updated = await updateAffiliateLink(id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /affiliates/validate/{code}:
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
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 isActive:
 *                   type: boolean
 *                 discountType:
 *                   type: string
 *                   enum: [PERCENTAGE, FIXED]
 *                 discountValue:
 *                   type: number
 *                 product:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     title:
 *                       type: string
 *                 vendor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     email:
 *                       type: string
 *                       format: email
 *       404:
 *         description: Code not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/validate/:code", async (req, res, next) => {
  try {
    const link = await getAffiliateLinkByCode(req.params.code);
    res.status(200).json(link);
  } catch {
    next(new NotFoundError("Affiliate link not found"));
  }
});

export default router;
