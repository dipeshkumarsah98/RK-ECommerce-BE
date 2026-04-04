import { prisma } from "../lib/prisma.js";
import { nanoid } from "../lib/nanoid.js";
import type {
  CreateVendorAffiliateLinkPayload,
  UpdateAffiliateLinkPayload,
} from "../types/affiliate.type.js";
import { DiscountType, CommissionType } from "../types/affiliate.type.js";
import { BadRequestError, NotFoundError } from "../lib/errors.js";

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
    const { vendorId, vendor, affiliate } = input;

    let finalVendorId: string;

    // If vendorId is provided, use it directly
    if (vendorId) {
      const existingVendor = await tx.user.findUnique({
        where: { id: vendorId },
        select: { id: true, roles: true, extras: true },
      });

      if (!existingVendor) {
        throw new BadRequestError(`Vendor with ID ${vendorId} does not exist`);
      }

      finalVendorId = vendorId;
      const vendorExtras = {
        ...(existingVendor.extras as Record<string, any>),
        ...(vendor?.bankName && { bankName: vendor.bankName }),
        ...(vendor?.accountNumber && { accountNumber: vendor.accountNumber }),
        affiliateType: vendor?.affiliateType,
      };

      if (vendor) {
        await tx.user.update({
          where: { id: vendorId },
          data: {
            ...(existingVendor.roles?.includes("vendor") && {
              roles: {
                push: "vendor",
              },
            }),
            extras: vendorExtras,
          },
        });
      }
    } else if (vendor) {
      // Otherwise, upsert vendor using vendor info
      const existing = await tx.user.findUnique({
        where: { email: vendor.email },
        select: { roles: true, extras: true },
      });

      const vendorExtras = {
        ...(existing?.extras as Record<string, any>),
        ...(vendor.bankName && { bankName: vendor.bankName }),
        ...(vendor.accountNumber && { accountNumber: vendor.accountNumber }),
        affiliateType: vendor.affiliateType,
      };

      const vendorUser = await tx.user.upsert({
        where: { email: vendor.email },
        create: {
          name: vendor.name!,
          email: vendor.email!,
          phone: vendor.contact,
          roles: ["vendor"],
          extras: vendorExtras,
          ...(vendor.address && {
            addresses: {
              create: {
                addressType: "billing",
                street_address: vendor.address.street_address,
                city: vendor.address.city,
                state: vendor.address.state,
                postal_code: vendor.address.postal_code,
                isDefault: true,
              },
            },
          }),
        },
        update: {
          name: vendor.name,
          phone: vendor.contact,
          extras: vendorExtras,
        },
      });

      finalVendorId = vendorUser.id;
    } else {
      throw new BadRequestError(
        "Either vendorId or vendor information is required",
      );
    }

    // Validate product exists if productId is provided
    if (affiliate.productId) {
      const productExists = await tx.product.findUnique({
        where: { id: affiliate.productId },
      });
      if (!productExists) {
        throw new BadRequestError(`Selected product does not exist`);
      }
    }

    const code = affiliate.code ?? (await generateAffiliateCode());

    const link = await tx.affiliateLink.create({
      data: {
        code,
        vendorId: finalVendorId,
        productId: affiliate.productId,
        discountType: affiliate.discountType,
        discountValue: affiliate.discountValue,
        commissionType: affiliate.commissionType,
        commissionValue: affiliate.commissionValue,
      },
      include: {
        vendor: { select: { id: true, name: true, email: true, extras: true } },
        product: { select: { id: true, title: true, slug: true } },
      },
    });

    return link;
  });
}

export interface ListAffiliatesFilters {
  vendorId?: string;
  search?: string;
  affiliateType?: string;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "code" | "discountValue" | "commissionValue";
  sortOrder?: "asc" | "desc";
}

export async function listVendorAffiliates(
  filters: ListAffiliatesFilters = {},
) {
  const {
    vendorId,
    search,
    affiliateType,
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const skip = (page - 1) * limit;

  // Build where conditions
  const whereConditions: any = {};

  // Filter by vendorId if provided
  if (vendorId) {
    whereConditions.vendorId = vendorId;
  }

  // Filter by affiliateType if provided
  if (affiliateType) {
    whereConditions.vendor = {
      extras: {
        path: ["affiliateType"],
        equals: affiliateType,
      },
    };
  }

  // Build search conditions (search across vendor name, email, and code)
  if (search) {
    whereConditions.OR = [
      { code: { contains: search, mode: "insensitive" as const } },
      {
        vendor: {
          email: { contains: search, mode: "insensitive" as const },
        },
      },
      {
        vendor: {
          extras: {
            path: ["name"],
            string_contains: search,
          },
        },
      },
    ];
  }

  // Build orderBy
  const orderBy: any = {};
  if (sortBy === "createdAt") {
    orderBy.createdAt = sortOrder;
  } else if (sortBy === "code") {
    orderBy.code = sortOrder;
  } else if (sortBy === "discountValue") {
    orderBy.discountValue = sortOrder;
  } else if (sortBy === "commissionValue") {
    orderBy.commissionValue = sortOrder;
  }

  const [items, total] = await Promise.all([
    prisma.affiliateLink.findMany({
      where: whereConditions,
      skip,
      take: limit,
      include: {
        product: { select: { id: true, title: true, slug: true } },
        vendor: { select: { id: true, name: true, email: true, extras: true } },
      },
      orderBy,
    }),
    prisma.affiliateLink.count({
      where: whereConditions,
    }),
  ]);

  // Calculate stats based on the filtered results
  const [activeCount, inactiveCount, linkedProducts] = await Promise.all([
    prisma.affiliateLink.count({
      where: { ...whereConditions, isActive: true },
    }),
    prisma.affiliateLink.count({
      where: { ...whereConditions, isActive: false },
    }),
    prisma.affiliateLink.findMany({
      where: whereConditions,
      select: { productId: true },
      distinct: ["productId"],
    }),
  ]);

  const stats = {
    totalAffiliates: total,
    active: activeCount,
    inactive: inactiveCount,
    productsLinked: linkedProducts.filter((p) => p.productId !== null).length,
  };

  return { items, total, page, limit, search, affiliateType, stats };
}

export async function getAffiliateLinkByCode(code: string) {
  const link = await prisma.affiliateLink.findUnique({
    where: { code },
    select: {
      code: true,
      isActive: true,
      discountType: true,
      discountValue: true,
      product: { select: { id: true, title: true } },
      vendor: { select: { id: true, email: true, name: true } },
    },
  });
  if (!link) throw new Error("Affiliate link not found");
  return link;
}

export async function getAffiliateLinkById(id: string) {
  const link = await prisma.affiliateLink.findUnique({
    where: { id },
    include: {
      product: { select: { id: true, title: true, slug: true, price: true } },
      vendor: {
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          extras: true,
          addresses: true,
        },
      },
    },
  });
  if (!link) throw new NotFoundError("Affiliate link not found");
  return link;
}

export async function updateAffiliateLink(
  id: string,
  data: UpdateAffiliateLinkPayload,
) {
  // Check if affiliate link exists
  const existing = await prisma.affiliateLink.findUnique({
    where: { id },
  });
  if (!existing) throw new NotFoundError("Affiliate link not found");

  // If productId is being updated, verify it exists
  if (data.productId) {
    const productExists = await prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!productExists) {
      throw new BadRequestError("Selected product does not exist");
    }
  }

  // If code is being updated, verify it's unique
  if (data.code && data.code !== existing.code) {
    const codeExists = await prisma.affiliateLink.findUnique({
      where: { code: data.code },
    });
    if (codeExists) {
      throw new BadRequestError("Affiliate code already exists");
    }
  }

  // Update the affiliate link
  const updated = await prisma.affiliateLink.update({
    where: { id },
    data,
    include: {
      product: { select: { id: true, title: true, slug: true, price: true } },
      vendor: { select: { id: true, email: true, extras: true } },
    },
  });

  return updated;
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
