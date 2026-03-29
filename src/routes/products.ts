import { Router } from "express";
import { z } from "zod";
import { authenticate, requireRoles } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { NotFoundError, ConflictError } from "../lib/errors.js";
import {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
} from "../services/product.service.js";

const router = Router();

const CreateProductSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  status: z.string().min(1),
  images: z.array(z.string().url()).optional(),
  stock: z.number().int().nonnegative().optional(),
});

const UpdateProductSchema = CreateProductSchema.partial();

/**
 * @openapi
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Create a product (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [slug, title, price, status, images]
 *             properties:
 *               slug:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *               stock:
 *                type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: url
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Slug already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/",
  authenticate,
  requireRoles("admin"),
  validate(CreateProductSchema),
  async (req, res, next) => {
    try {
      const product = await createProduct({
        ...req.body,
        user: (req as any).user, // user is guaranteed to be present due to authenticate middleware
      });
      res.status(201).json(product);
    } catch (err: unknown) {
      console.log("Error creating product:", err);
      if (err instanceof Error && err.message.includes("already exists")) {
        next(new ConflictError(err.message));
      } else {
        next(err);
      }
    }
  },
);

/**
 * @openapi
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: List all products with optional search
 *     parameters:
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
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query to filter products by title, description, or slug (case-insensitive)
 *     responses:
 *       200:
 *         description: Paginated product list with optional search results
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
 *                     search:
 *                       type: string
 *                       description: The search query used (if any)
 */
router.get("/", async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = req.query.search as string | undefined;
    const result = await listProducts(page, limit, search);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch {
    next(new NotFoundError("Product not found"));
  }
});

/**
 * @openapi
 * /products/{id}:
 *   patch:
 *     tags: [Products]
 *     summary: Update a product (admin only)
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
 *             properties:
 *               slug:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.patch(
  "/:id",
  authenticate,
  requireRoles("admin"),
  validate(UpdateProductSchema),
  async (req, res, next) => {
    try {
      const product = await updateProduct(req.params.id, req.body);
      res.json(product);
    } catch {
      next(new NotFoundError("Product not found"));
    }
  },
);

export default router;
