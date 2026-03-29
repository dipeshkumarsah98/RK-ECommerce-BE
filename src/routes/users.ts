import { Router } from "express";
import { z } from "zod";
import { authenticate, requireRoles, AuthRequest } from "../middlewares/auth.js";
import { getUserById, updateUser } from "../services/user.service.js";
import { validate } from "../middlewares/validate.js";
import { NotFoundError } from "../lib/errors.js";

const router = Router();

const UpdateUserSchema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(),
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
 *             schema:
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
router.patch("/me", authenticate, validate(UpdateUserSchema), async (req: AuthRequest, res, next) => {
  try {
    const user = await updateUser(req.user!.userId, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

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
router.get("/:id", authenticate, requireRoles("admin"), async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch {
    next(new NotFoundError("User not found"));
  }
});

export default router;
