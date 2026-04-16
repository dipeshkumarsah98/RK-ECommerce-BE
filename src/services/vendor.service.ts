import { prisma, OrderStatus } from "../lib/prisma.js";
import { NotFoundError, ForbiddenError } from "../lib/errors.js";
import type {
  VendorOrderFilters,
  VendorOrderStats,
  VendorCommissionQuery,
  VendorCommissionResponse,
  VendorCommissionItem,
  VendorCommissionTrendsQuery,
  VendorCommissionTrendsResponse,
  VendorCommissionTrendItem,
  VendorCommissionSummary,
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
  const where: Record<string, unknown> = {
    status: {
      not: OrderStatus.AWAITING_VERIFICATION,
    },
  };

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

  const where = {
    status: { not: OrderStatus.AWAITING_VERIFICATION },
    affiliateId: { in: affiliateLinkIds },
  };

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
    where: {
      id: { in: affiliateLinkIds },
      orders: {
        some: {
          status: { not: OrderStatus.AWAITING_VERIFICATION },
        },
      },
    },
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

/**
 * Get vendor commission summary statistics
 * Includes total commission, active links, total orders, and completed orders
 */
export async function getVendorCommissionSummary(
  vendorId: string,
): Promise<VendorCommissionSummary> {
  // Fetch all affiliate links and earnings in parallel
  const [affiliateLinks, earnings, orders] = await Promise.all([
    prisma.affiliateLink.findMany({
      where: { vendorId },
      select: { id: true, isActive: true },
    }),
    prisma.vendorEarning.findMany({
      where: { vendorId },
      select: { commission: true },
    }),
    prisma.order.findMany({
      where: {
        affiliateId: {
          in: [
            /* Will be populated */
          ],
        },
        status: { not: OrderStatus.AWAITING_VERIFICATION },
      },
      select: { status: true },
    }),
  ]);

  const affiliateLinkIds = affiliateLinks.map((link) => link.id);

  // Calculate total commission
  const totalCommission = earnings.reduce(
    (sum, earning) => sum + earning.commission,
    0,
  );

  // Count active links
  const activeLinks = affiliateLinks.filter((link) => link.isActive).length;

  // If no affiliate links, return early
  if (affiliateLinkIds.length === 0) {
    return {
      totalCommission: 0,
      activeLinks: 0,
      totalOrders: 0,
      completedOrders: 0,
    };
  }

  // Fetch orders for the vendor's affiliate links
  const vendorOrders = await prisma.order.findMany({
    where: {
      affiliateId: { in: affiliateLinkIds },
      status: { not: OrderStatus.AWAITING_VERIFICATION },
    },
    select: { status: true },
  });

  // Count total orders
  const totalOrders = vendorOrders.length;

  // Count completed orders
  const completedOrders = vendorOrders.filter(
    (order) => order.status === OrderStatus.COMPLETED,
  ).length;

  return {
    totalCommission: Math.round(totalCommission * 100) / 100, // Round to 2 decimal places
    activeLinks,
    totalOrders,
    completedOrders,
  };
}

/**
 * Build commission items from raw affiliate link results
 */
function buildCommissionItems(
  affiliateLinks: Array<{
    id: string;
    code: string;
    product: {
      id: string;
      title: string;
      slug: string;
      images: string[];
      price: number;
    } | null;
    commissionType: string;
    commissionValue: number;
    discountType: string;
    discountValue: number;
    isActive: boolean;
    createdAt: Date;
    vendorEarnings: Array<{ commission: number }>;
    orders: Array<{ status: OrderStatus; updatedAt: Date }>;
  }>,
): VendorCommissionItem[] {
  return affiliateLinks.map((link) => {
    // Sum total commission
    const totalCommission = link.vendorEarnings.reduce(
      (sum, earning) => sum + earning.commission,
      0,
    );

    // Count total orders (all statuses except AWAITING_VERIFICATION)
    const totalOrders = link.orders.length;

    // Count completed orders
    const completedOrders = link.orders.filter(
      (order) => order.status === OrderStatus.COMPLETED,
    ).length;

    // Find last completed order date
    const completedOrderDates = link.orders
      .filter((order) => order.status === OrderStatus.COMPLETED)
      .map((order) => order.updatedAt);

    const lastCompletedOrderDate =
      completedOrderDates.length > 0
        ? new Date(Math.max(...completedOrderDates.map((d) => d.getTime())))
        : null;

    return {
      affiliateLinkId: link.id,
      code: link.code,
      product: link.product,
      totalCommission: Math.round(totalCommission * 100) / 100, // Round to 2 decimal places
      totalOrders,
      completedOrders,
      lastCompletedOrderDate,
      commissionType: link.commissionType,
      commissionValue: link.commissionValue,
      discountType: link.discountType,
      discountValue: link.discountValue,
      isActive: link.isActive,
      createdAt: link.createdAt,
    };
  });
}

/**
 * Get vendor commission history grouped by affiliate code
 */
export async function getVendorCommissionHistory(
  vendorId: string,
  query: VendorCommissionQuery,
): Promise<VendorCommissionResponse> {
  const { page, limit, sortBy, sortOrder, isActive, startDate, endDate } =
    query;

  const where: Record<string, unknown> = { vendorId };

  // Filter by active status if provided
  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  // Count total affiliate links
  const total = await prisma.affiliateLink.count({ where });

  if (total === 0) {
    return { items: [], total: 0, page, limit };
  }

  // Build date filter for earnings if provided
  const earningsDateFilter:
    | { createdAt: { gte?: Date; lte?: Date } }
    | undefined =
    startDate || endDate
      ? {
          createdAt: {
            ...(startDate ? { gte: new Date(startDate) } : {}),
            ...(endDate ? { lte: new Date(endDate) } : {}),
          },
        }
      : undefined;

  // Fetch all affiliate links with relations
  const affiliateLinks = await prisma.affiliateLink.findMany({
    where,
    include: {
      product: {
        select: {
          id: true,
          title: true,
          slug: true,
          images: true,
          price: true,
        },
      },
      vendorEarnings: earningsDateFilter
        ? {
            where: earningsDateFilter,
            select: { commission: true },
          }
        : {
            select: { commission: true },
          },
      orders: {
        where: {
          status: { not: OrderStatus.AWAITING_VERIFICATION },
        },
        select: {
          status: true,
          updatedAt: true,
        },
      },
    },
  });

  // Build commission items
  let items = buildCommissionItems(affiliateLinks);

  // Sort items
  items.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "totalCommission":
        comparison = a.totalCommission - b.totalCommission;
        break;
      case "orderCount":
        comparison = a.totalOrders - b.totalOrders;
        break;
      case "lastOrderDate":
        // Handle null dates
        if (
          a.lastCompletedOrderDate === null &&
          b.lastCompletedOrderDate === null
        ) {
          comparison = 0;
        } else if (a.lastCompletedOrderDate === null) {
          comparison = 1; // Nulls last
        } else if (b.lastCompletedOrderDate === null) {
          comparison = -1;
        } else {
          comparison =
            a.lastCompletedOrderDate.getTime() -
            b.lastCompletedOrderDate.getTime();
        }
        break;
      case "code":
        comparison = a.code.localeCompare(b.code);
        break;
    }

    // Apply sort order
    const result = sortOrder === "desc" ? -comparison : comparison;

    // Secondary sort by createdAt desc for stability
    if (result === 0) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }

    return result;
  });

  // Apply pagination
  const skip = (page - 1) * limit;
  items = items.slice(skip, skip + limit);

  return { items, total, page, limit };
}

/**
 * Group earnings by time period
 */
function groupEarningsByPeriod(
  earnings: Array<{
    commission: number;
    createdAt: Date;
    affiliate: { code: string };
  }>,
  period: "monthly" | "weekly" | "daily",
): VendorCommissionTrendItem[] {
  // Helper to get period key
  const getPeriodKey = (date: Date): string => {
    switch (period) {
      case "monthly":
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      case "weekly": {
        // Get ISO week number
        const yearStart = new Date(date.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(
          ((date.getTime() - yearStart.getTime()) / 86400000 +
            yearStart.getDay() +
            1) /
            7,
        );
        return `${date.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
      }
      case "daily":
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }
  };

  // Group by period
  const periodMap = new Map<
    string,
    {
      totalCommission: number;
      orderCount: number;
      affiliateMap: Map<string, { commission: number; orderCount: number }>;
    }
  >();

  for (const earning of earnings) {
    const periodKey = getPeriodKey(earning.createdAt);

    if (!periodMap.has(periodKey)) {
      periodMap.set(periodKey, {
        totalCommission: 0,
        orderCount: 0,
        affiliateMap: new Map(),
      });
    }

    const periodData = periodMap.get(periodKey)!;
    periodData.totalCommission += earning.commission;
    periodData.orderCount += 1;

    // Group by affiliate code
    if (!periodData.affiliateMap.has(earning.affiliate.code)) {
      periodData.affiliateMap.set(earning.affiliate.code, {
        commission: 0,
        orderCount: 0,
      });
    }

    const affiliateData = periodData.affiliateMap.get(earning.affiliate.code)!;
    affiliateData.commission += earning.commission;
    affiliateData.orderCount += 1;
  }

  // Convert to array and sort by period
  const trends: VendorCommissionTrendItem[] = Array.from(periodMap.entries())
    .map(([period, data]) => ({
      period,
      totalCommission: Math.round(data.totalCommission * 100) / 100,
      orderCount: data.orderCount,
      affiliateBreakdown: Array.from(data.affiliateMap.entries()).map(
        ([code, affiliateData]) => ({
          code,
          commission: Math.round(affiliateData.commission * 100) / 100,
          orderCount: affiliateData.orderCount,
        }),
      ),
    }))
    .sort((a, b) => a.period.localeCompare(b.period));

  return trends;
}

/**
 * Get vendor commission trends over time
 */
export async function getVendorCommissionTrends(
  vendorId: string,
  query: VendorCommissionTrendsQuery,
): Promise<VendorCommissionTrendsResponse> {
  const { period, startDate, endDate, affiliateCode } = query;

  // Default date range: last 12 months
  const defaultEndDate = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 12);

  const dateStart = startDate ? new Date(startDate) : defaultStartDate;
  const dateEnd = endDate ? new Date(endDate) : defaultEndDate;

  // Build where clause
  const where: Record<string, unknown> = {
    vendorId,
    createdAt: {
      gte: dateStart,
      lte: dateEnd,
    },
  };

  // If affiliate code provided, validate and filter
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
  }

  // Fetch earnings with affiliate code
  const earnings = await prisma.vendorEarning.findMany({
    where,
    select: {
      commission: true,
      createdAt: true,
      affiliate: {
        select: { code: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // Group by period
  const trends = groupEarningsByPeriod(earnings, period);

  return {
    period,
    startDate: dateStart.toISOString(),
    endDate: dateEnd.toISOString(),
    trends,
  };
}
