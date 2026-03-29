import { z } from "zod";
import { StockMovementType } from "../lib/prisma.js";

export enum StockReason {
  RESTOCK = "RESTOCK",
  ORDER_PLACED = "ORDER_PLACED",
  ORDER_CANCELLED = "ORDER_CANCELLED",
  RETURN = "RETURN",
  CORRECTION = "CORRECTION",
}

export const StockReasonSchema = z.nativeEnum(StockReason);

export const StockMovementPayloadSchema = z.object({
  productId: z.string().uuid(),
  type: z.nativeEnum(StockMovementType),
  quantity: z.number().int().positive(),
  reason: StockReasonSchema,
  notes: z.string().optional(),
});

export type StockMovementPayload = z.infer<typeof StockMovementPayloadSchema>;
