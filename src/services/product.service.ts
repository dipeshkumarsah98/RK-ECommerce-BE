import { BadRequestError } from "../lib/errors.js";
import { JwtPayload } from "../lib/jwt.js";
import { prisma, StockMovementType } from "../lib/prisma.js";

export interface CreateProductInput {
  slug: string;
  title: string;
  description?: string;
  price: number;
  status: string;
  images?: string[];
  stock?: number;
  user: JwtPayload;
}

export async function createProduct(data: CreateProductInput) {
  console.log("Creating product with data:", data);
  const existing = await prisma.product.findUnique({
    where: { slug: data.slug },
  });

  if (existing)
    throw new BadRequestError("Product with this slug already exists");

  const { user, stock = 0, ...productDetails } = data;
  let product;
  if (stock > 0) {
    prisma.$transaction(async (tx) => {
      product = await tx.product.create({ data: productDetails });
      await tx.stockMovement.create({
        data: {
          quantity: stock,
          type: StockMovementType.IN,
          reason: "STOCK",
          productId: product.id,
          userId: user.userId,
        },
      });
    });
  } else {
    product = await prisma.product.create({ data: productDetails });
  }

  return product;
}

export async function listProducts(page = 1, limit = 20, search?: string) {
  const skip = (page - 1) * limit;

  // Build search conditions if search query is provided
  const searchConditions = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
          { slug: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where: searchConditions,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({
      where: searchConditions,
    }),
  ]);

  return { items, total, page, limit, search };
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error("Product not found");
  return product;
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) throw new Error("Product not found");
  return product;
}

export async function updateProduct(
  id: string,
  data: Partial<CreateProductInput>,
) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error("Product not found");
  return prisma.product.update({ where: { id }, data });
}
