import { prisma, StockMovementType } from "../lib/prisma.js";

export type StockReason =
  | "RESTOCK"
  | "ORDER_PLACED"
  | "ORDER_CANCELLED"
  | "RETURN"
  | "CORRECTION";

export interface CreateStockMovementInput {
  productId: string;
  type: StockMovementType;
  quantity: number;
  reason: StockReason;
  orderId?: string;
  userId?: string;
  notes?: string;
}

export async function createStockMovement(
  input: CreateStockMovementInput,
  tx?: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
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
      orderId: input.orderId,
      userId: input.userId,
      notes: input.notes,
    },
  });

  const delta =
    input.type === StockMovementType.IN ? input.quantity : -input.quantity;
  await client.product.update({
    where: { id: input.productId },
    data: { totalStock: { increment: delta } },
  });

  return movement;
}

export async function listStockMovements(productId?: string) {
  return prisma.stockMovement.findMany({
    where: productId ? { productId } : undefined,
    include: { product: { select: { id: true, title: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
}
