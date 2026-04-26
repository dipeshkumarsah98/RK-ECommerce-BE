import { Router } from "express";
import { z } from "zod";
import {
  authenticate,
  requireRoles,
  AuthRequest,
} from "../middlewares/auth.js";
import {
  createUser,
  getUserById,
  updateUser,
  updateUserById,
  searchUsers,
  getUserAddresses,
} from "../services/user.service.js";
import { validate } from "../middlewares/validate.js";
import { NotFoundError } from "../lib/errors.js";
import {
  CreateUserInput,
  CreateUserInputSchema,
  UpdateUserInputSchema,
} from "../types/user.type.js";

const router = Router();

const UpdateUserSchema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(), // this is not valid
});

/**
 * @openapi
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - roles
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [admin, vendor, customer]
 *                 minItems: 1
 *               isActive:
 *                 type: boolean
 *                 default: true
 *               extras:
 *                 type: object
 *               addresses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - addressType
 *                     - city
 *                   properties:
 *                     addressType:
 *                       type: string
 *                       description: Type of address (shipping, billing, etc.)
 *                     street_address:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     postal_code:
 *                       type: string
 *                     isDefault:
 *                       type: boolean
 *                       default: false
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Insufficient permissions
 *       409:
 *         description: User with email already exists
 */
router.post(
  "/",
  authenticate,
  requireRoles("admin"),
  validate(CreateUserInputSchema),
  async (req, res, next) => {
    try {
      const body = req.body as CreateUserInput;
      const user = await createUser(body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Search users with addresses (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by email, name, or phone
 *       - in: query
 *         name: role
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [admin, vendor, customer]
 *         style: form
 *         explode: true
 *         description: Filter users by one or more roles (can pass multiple role query params)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [roles, updatedAt, createdAt, name]
 *           default: updatedAt
 *         description: Field to sort by
 *       - in: query
 *         name: extras
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Include extra user information
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of users with addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 perPage:
 *                   type: integer
 *                 search:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Insufficient permissions
 */
router.get("/", authenticate, requireRoles("admin"), async (req, res, next) => {
  try {
    const search = req.query.search as string | undefined;
    const roleParam = req.query.role;
    let roles: string[] | undefined;
    if (roleParam) {
      roles = Array.isArray(roleParam)
        ? (roleParam as string[])
        : [roleParam as string];
    }
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const sortBy =
      (req.query.sortBy as "roles" | "updatedAt" | "createdAt" | "name") ||
      "updatedAt";
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";
    const extras = req.query.extras === "true";

    const result = await searchUsers(
      search,
      roles,
      page,
      perPage,
      sortBy,
      sortOrder,
      extras,
    );
    res.json(result);
  } catch (err) {
    console.log("Error searching users:", err);
    next(err);
  }
});

/**
 * @openapi
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get own profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *            /addresses:
 *   get:
 *     tags: [Users]
 *     summary: Get user's saved addresses (admin only)
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
 *         description: List of user's addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: User not found
 */
router.get(
  "/:id/addresses",
  authenticate,
  requireRoles("admin"),
  async (req, res, next) => {
    try {
      const addresses = await getUserAddresses(req.params.id as string);
      res.json(addresses);
    } catch (err) {
      next(new NotFoundError("User not found"));
    }
  },
);

/**
 * @openapi
 * /users/{id} schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/me", authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await getUserById(req.user!.userId);
    res.json(user);
  } catch {
    next(new NotFoundError("User not found"));
  }
});

/**
 * @openapi
 * /users/me:
 *   patch:
 *     tags: [Users]
 *     summary: Update own profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch(
  "/me",
  authenticate,
  validate(UpdateUserSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const user = await updateUser(req.user!.userId, req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get any user by ID (admin only)
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
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/:id",
  authenticate,
  requireRoles("admin"),
  async (req, res, next) => {
    try {
      const user = await getUserById(req.params.id as string);
      res.json(user);
    } catch {
      next(new NotFoundError("User not found"));
    }
  },
);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update a specific user (admin only)
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
 *               name:
 *                 type: string
 *                 minLength: 1
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [admin, vendor, customer]
 *                 minItems: 1
 *               isActive:
 *                 type: boolean
 *               extras:
 *                 type: object
 *               addresses:
 *                 type: array
 *                 description: Array of addresses. Include addressId to update existing address, omit to create new one.
 *                 items:
 *                   type: object
 *                   required:
 *                     - addressType
 *                     - city
 *                   properties:
 *                     addressId:
 *                       type: string
 *                       format: uuid
 *                       description: Include to update existing address, omit to create new
 *                     addressType:
 *                       type: string
 *                       description: Type of address (shipping, billing, etc.)
 *                     street_address:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     postal_code:
 *                       type: string
 *                     isDefault:
 *                       type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthenticated
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: User not found
 *       409:
 *         description: Email already in use by another user
 */
router.patch(
  "/:id",
  authenticate,
  requireRoles("admin"),
  validate(UpdateUserInputSchema),
  async (req, res, next) => {
    try {
      const user = await updateUserById(req.params.id as string, req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
