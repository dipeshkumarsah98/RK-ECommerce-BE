import { z } from "zod";
import { AddressInputSchema } from "./order.type.js";

// Address with type for user creation
const UserAddressInputSchema = AddressInputSchema.extend({
  addressType: z.string(), // 'shipping', 'billing', etc.
  isDefault: z.boolean().optional().default(false),
});

// Address update schema - includes optional ID for updates
const AddressUpdateSchema = UserAddressInputSchema.extend({
  addressId: z.string().uuid().optional(),
});

// Schema for creating a new user (admin only)
export const CreateUserInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  roles: z
    .array(z.enum(["admin", "vendor", "customer", "staff"]))
    .min(1, "At least one role is required"),
  isActive: z.boolean().optional().default(true),
  extras: z.record(z.any()).optional(),
  addresses: z.array(UserAddressInputSchema).optional(),
});

// Schema for updating a user (admin only)
export const UpdateUserInputSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  roles: z
    .array(z.enum(["admin", "vendor", "customer"]))
    .min(1)
    .optional(),
  isActive: z.boolean().optional(),
  extras: z.record(z.any()).optional(),
  addresses: z.array(AddressUpdateSchema).optional(),
});

// Infer TypeScript types from schemas
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;
