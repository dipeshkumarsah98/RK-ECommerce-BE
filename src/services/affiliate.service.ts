import { prisma } from "../lib/prisma.js";
import { nanoid } from "../lib/nanoid.js";
import type { CreateVendorAffiliateLinkPayload } from "../types/affiliate.type.js";
import { DiscountType, CommissionType } from "../types/affiliate.type.js";

export {
  DiscountType,
  CommissionType,
  AffiliateVendorType,
} from "../types/affiliate.type.js";

export async function generateAffiliateCode(length = 8): Promise<string> {
  let code: string;
  let exists: boolean;
  do {
    code = nanoid(length);
    exists = !!(await prisma.affiliateLink.findUnique({ where: { code } }));
  } while (exists);
  return code;
}

export async function createAffiliateLink(
  input: CreateVendorAffiliateLinkPayload,
) {
  return prisma.$transaction(async (tx) => {
    const { vendor, affiliate } = input;

    // Resolve roles: ensure "vendor" is present without duplicates
    const existing = await tx.user.findUnique({
      where: { email: vendor.email },
      select: { roles: true, extras: true },
    });
    const roles = existing
      ? existing.roles.includes("vendor")
        ? existing.roles
        : [...existing.roles, "vendor"]
      : ["vendor"];

    const vendorExtras = {
      ...(existing?.extras as Record<string, any>),
      name: vendor.name,
      affiliateType: vendor.affiliateType,
      ...(vendor.bankName && { bankName: vendor.bankName }),
      ...(vendor.accountNumber && { accountNumber: vendor.accountNumber }),
    };

    const vendorUser = await tx.user.upsert({
      where: { email: vendor.email },
      create: {
        email: vendor.email,
        phone: vendor.contact,
        address: vendor.address,
        roles,
        extras: vendorExtras,
      },
      update: {
        phone: vendor.contact,
        address: vendor.address,
        roles,
        extras: vendorExtras,
      },
    });

    const code = affiliate.code ?? (await generateAffiliateCode());

    const link = await tx.affiliateLink.create({
      data: {
        code,
        vendorId: vendorUser.id,
        productId: affiliate.productId,
        discountType: affiliate.discountType,
        discountValue: affiliate.discountValue,
        commissionType: affiliate.commissionType,
        commissionValue: affiliate.commissionValue,
      },
      include: {
        vendor: { select: { id: true, email: true, extras: true } },
        product: { select: { id: true, title: true, slug: true } },
      },
    });

    return link;
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
    include: {
      product: { select: { id: true, title: true, price: true } },
      vendor: { select: { id: true, email: true } },
    },
  });
  if (!link) throw new Error("Affiliate link not found");
  return link;
}

export function computeDiscount(
  baseAmount: number,
  discountType: DiscountType,
  discountValue: number,
): number {
  if (discountType === DiscountType.PERCENTAGE) {
    return Math.round(((baseAmount * discountValue) / 100) * 100) / 100;
  }
  return Math.min(discountValue, baseAmount);
}

export function computeCommission(
  finalAmount: number,
  commissionType: CommissionType,
  commissionValue: number,
): number {
  if (commissionType === CommissionType.PERCENTAGE) {
    return Math.round(((finalAmount * commissionValue) / 100) * 100) / 100;
  }
  return commissionValue;
}
