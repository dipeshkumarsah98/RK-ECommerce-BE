import { prisma } from "../lib/prisma.js";
import { nanoid } from "../lib/nanoid.js";

export interface CreateAffiliateLinkInput {
  vendorId: string;
  productId?: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  commissionType: "PERCENTAGE" | "FIXED";
  commissionValue: number;
}

export async function createAffiliateLink(input: CreateAffiliateLinkInput) {
  const code = nanoid(8);
  return prisma.affiliateLink.create({
    data: {
      code,
      vendorId: input.vendorId,
      productId: input.productId,
      discountType: input.discountType,
      discountValue: input.discountValue,
      commissionType: input.commissionType,
      commissionValue: input.commissionValue,
    },
  });
}

export async function listVendorAffiliates(vendorId: string) {
  return prisma.affiliateLink.findMany({
    where: { vendorId },
    include: { product: { select: { id: true, title: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAffiliateLinkByCode(code: string) {
  const link = await prisma.affiliateLink.findUnique({
    where: { code },
    include: { product: { select: { id: true, title: true, price: true } }, vendor: { select: { id: true, email: true } } },
  });
  if (!link) throw new Error("Affiliate link not found");
  return link;
}

export function computeDiscount(
  baseAmount: number,
  discountType: string,
  discountValue: number
): number {
  if (discountType === "PERCENTAGE") {
    return Math.round((baseAmount * discountValue) / 100 * 100) / 100;
  }
  return Math.min(discountValue, baseAmount);
}

export function computeCommission(
  finalAmount: number,
  commissionType: string,
  commissionValue: number
): number {
  if (commissionType === "PERCENTAGE") {
    return Math.round((finalAmount * commissionValue) / 100 * 100) / 100;
  }
  return commissionValue;
}
