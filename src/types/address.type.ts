import { z } from "zod";

export const CreateAddressSchema = z.object({
  userId: z.string().uuid(),
  addressType: z.enum(["shipping", "billing"]),
  street_address: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  isDefault: z.boolean().optional().default(false),
});

export type CreateAddressInput = z.infer<typeof CreateAddressSchema>;
