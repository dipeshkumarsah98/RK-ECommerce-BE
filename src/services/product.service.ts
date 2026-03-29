import { prisma } from "../lib/prisma.js";

export interface CreateProductInput {
  slug: string;
  title: string;
  description?: string;
  price: number;
  status: string;
}

export async function createProduct(data: CreateProductInput) {
  const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existing) throw new Error("Product with this slug already exists");

  return prisma.product.create({ data });
}

export async function listProducts(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count(),
  ]);
  return { items, total, page, limit };
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
  data: Partial<CreateProductInput>
) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error("Product not found");
  return prisma.product.update({ where: { id }, data });
}
