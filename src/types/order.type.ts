import { z } from "zod";

export const AddressInputSchema = z.object({
  street_address: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
});

export const OrderItemInputSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

export const CreateOrderInputSchema = z.object({
  // Customer info
  customerEmail: z.string().email(),
  customerName: z.string(),
  customerPhone: z.string().optional(),

  // Override userId (admin creating on behalf)
  userId: z.string().uuid().optional(),
  requestingUserId: z.string().uuid().optional(),

  // Addresses
  shippingAddressId: z.string().uuid().optional(),
  shippingAddress: AddressInputSchema.optional(),
  billingAddressId: z.string().uuid().optional(),
  billingAddress: AddressInputSchema.optional(),

  // Order details
  affiliateCode: z.string().optional(),
  paymentMethod: z.enum(["ESEWA", "KHALTI", "COD"]),
  items: z.array(OrderItemInputSchema).min(1),
  notes: z.string().optional(),
});

export type AddressInput = z.infer<typeof AddressInputSchema>;
export type OrderItemInput = z.infer<typeof OrderItemInputSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderInputSchema>;
