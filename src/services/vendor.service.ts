import { prisma, OrderStatus } from "../lib/prisma.js";
import { NotFoundError, ForbiddenError } from "../lib/errors.js";
import type {
  VendorOrderFilters,
  VendorOrderStats,
} from "../types/vendor.type.js";

/**
 * Get all affiliate link IDs for a vendor
 */
async function getVendorAffiliateLinkIds(vendorId: string): Promise<string[]> {
  const affiliateLinks = await prisma.affiliateLink.findMany({
    where: { vendorId, isActive: true },
    select: { id: true },
  });
  return affiliateLinks.map((link) => link.id);
}

/**
 * Get orders associated with a vendor through their affiliate links
 * Vendors can only see orders placed using their affiliate codes
 */
export async function getVendorOrders(
  vendorId: string,
  filters: VendorOrderFilters,
) {
  const { status, affiliateCode, page = 1, limit = 20 } = filters;
  const skip = (page - 1) * limit;

  // Build where clause
  const where: Record<string, unknown> = {};

  // Filter by affiliate code if provided
  if (affiliateCode) {
    const affiliateLink = await prisma.affiliateLink.findUnique({
      where: { code: affiliateCode },
      select: { id: true, vendorId: true },
    });

    if (!affiliateLink) {
      throw new NotFoundError("Affiliate code not found");
    }

    if (affiliateLink.vendorId !== vendorId) {
      throw new ForbiddenError("This affiliate code does not belong to you");
    }

    where.affiliateId = affiliateLink.id;
  } else {
    // Get all vendor's affiliate link IDs
    const affiliateLinkIds = await getVendorAffiliateLinkIds(vendorId);

    if (affiliateLinkIds.length === 0) {
      // Vendor has no affiliate links, return empty result
      return { items: [], total: 0, page, limit };
    }

    where.affiliateId = { in: affiliateLinkIds };
  }

  // Filter by status if provided
  if (status) {
    where.status = status;
  }

  const [items, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      include: {
        items: {
          include: {
            product: {
              select: { id: true, title: true, slug: true },
            },
          },
        },
        affiliate: {
          select: {
            code: true,
            discountType: true,
            discountValue: true,
            commissionType: true,
            commissionValue: true,
          },
        },
        user: {
          select: { email: true, name: true },
        },
        payment: {
          select: {
            paymentMethod: true,
            amount: true,
            status: true,
            paidAt: true,
          },
        },
        earnings: {
          where: { vendorId },
          select: {
            commission: true,
            currency: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where }),
  ]);

  return { items, total, page, limit };
}

/**
 * Get a single vendor order by ID
 * Ensures the order belongs to the vendor's affiliate links
 */
export async function getVendorOrderById(vendorId: string, orderId: string) {
  // Get vendor's affiliate link IDs
  const affiliateLinkIds = await getVendorAffiliateLinkIds(vendorId);

  if (affiliateLinkIds.length === 0) {
    throw new ForbiddenError("You have no affiliate links");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      affiliateId: { in: affiliateLinkIds },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      affiliate: true,
      user: {
        select: { email: true, name: true, phone: true },
      },
      payment: true,
      verification: true,
      earnings: {
        where: { vendorId },
      },
    },
  });

  if (!order) {
    throw new NotFoundError(
      "Order not found or does not belong to your affiliate links",
    );
  }

  // Fetch addresses if available
  if (order.shippingAddressId || order.billingAddressId) {
    const addressIds = [order.shippingAddressId, order.billingAddressId].filter(
      Boolean,
    ) as string[];

    const addresses = await prisma.address.findMany({
      where: { id: { in: addressIds } },
    });

    const addressMap = new Map(addresses.map((a) => [a.id, a]));

    return {
      ...order,
      shippingAddress: order.shippingAddressId
        ? addressMap.get(order.shippingAddressId) || null
        : null,
      billingAddress: order.billingAddressId
        ? addressMap.get(order.billingAddressId) || null
        : null,
    };
  }

  return order;
}

/**
 * Get comprehensive statistics for vendor's orders
 * Includes total orders, revenue, commission, and breakdown by status and affiliate link
 */
export async function getVendorOrderStats(
  vendorId: string,
): Promise<VendorOrderStats> {
  // Get vendor's affiliate link IDs
  const affiliateLinkIds = await getVendorAffiliateLinkIds(vendorId);

  if (affiliateLinkIds.length === 0) {
    // Return empty stats
    return {
      totalOrders: 0,
      totalRevenue: 0,
      totalCommission: 0,
      ordersByStatus: {} as Record<OrderStatus, number>,
      topAffiliateLinks: [],
    };
  }

  const where = { affiliateId: { in: affiliateLinkIds } };

  // Fetch all orders for the vendor
  const [totalOrders, orders, earnings] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      select: {
        status: true,
        totalAmount: true,
        affiliateId: true,
      },
    }),
    prisma.vendorEarning.findMany({
      where: { vendorId },
      select: {
        commission: true,
      },
    }),
  ]);

  // Calculate total revenue (sum of all order amounts)
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );

  // Calculate total commission
  const totalCommission = earnings.reduce(
    (sum, earning) => sum + earning.commission,
    0,
  );

  // Group orders by status
  const ordersByStatus = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {} as Record<OrderStatus, number>,
  );

  // Get top affiliate links by performance
  const affiliateLinkStats = await prisma.affiliateLink.findMany({
    where: { id: { in: affiliateLinkIds } },
    select: {
      id: true,
      code: true,
      orders: {
        select: {
          totalAmount: true,
        },
      },
      vendorEarnings: {
        select: {
          commission: true,
        },
      },
    },
  });

  const topAffiliateLinks = affiliateLinkStats
    .map((link) => ({
      code: link.code,
      orderCount: link.orders.length,
      revenue: link.orders.reduce((sum, o) => sum + o.totalAmount, 0),
      commission: link.vendorEarnings.reduce((sum, e) => sum + e.commission, 0),
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10); // Top 10 affiliate links

  return {
    totalOrders,
    totalRevenue,
    totalCommission,
    ordersByStatus,
    topAffiliateLinks,
  };
}
