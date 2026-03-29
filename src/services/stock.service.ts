import { prisma, StockMovementType } from "../lib/prisma.js";
import type { PrismaTransactionClient } from "../types/prisma.type.js";
import type { StockMovementPayload } from "../types/stock-movement.type.js";

export { StockReason } from "../types/stock-movement.type.js";

export interface CreateStockMovementInput extends StockMovementPayload {
  orderId?: string;
  userId?: string;
}

export async function createStockMovement(
  input: CreateStockMovementInput,
  tx?: PrismaTransactionClient,
) {
  const client = tx ?? prisma;

  const product = await client.product.findUnique({
    where: { id: input.productId },
  });
  if (!product) throw new Error("Product not found");

  if (input.type === StockMovementType.OUT) {
    if (product.totalStock < input.quantity) {
      throw new Error(
        `Insufficient stock. Available: ${product.totalStock}, Requested: ${input.quantity}`,
      );
    }
  }

  const movement = await client.stockMovement.create({
    data: {
      productId: input.productId,
      type: input.type,
      quantity: input.quantity,
      reason: input.reason,
      ...(input.userId && { userId: input.userId }),
      ...(input.orderId && { orderId: input.orderId }),
      ...(input.notes && { notes: input.notes }),
    },
  });
  return movement;
}

export async function listStockMovements(productId?: string) {
  const items = await prisma.stockMovement.findMany({
    where: productId ? { productId } : undefined,
    include: { product: { select: { id: true, title: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });

  return {
    items,
    total: items.length,
    success: true,
  };
}
