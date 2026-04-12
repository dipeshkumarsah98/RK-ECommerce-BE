import { z } from "zod";
import { OrderStatus } from "../lib/prisma.js";

/**
 * Query filters for vendor orders
 */
export const VendorOrderFiltersSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  affiliateCode: z.string().optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
});

export type VendorOrderFilters = z.infer<typeof VendorOrderFiltersSchema>;

/**
 * Vendor order statistics
 */
export interface VendorOrderStats {
  totalOrders: number;
  totalRevenue: number;
  totalCommission: number;
  ordersByStatus: Record<OrderStatus, number>;
  topAffiliateLinks: Array<{
    code: string;
    orderCount: number;
    revenue: number;
    commission: number;
  }>;
}

/**
 * Query filters for vendor commission history
 */
export const VendorCommissionQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  sortBy: z
    .enum(["totalCommission", "orderCount", "lastOrderDate", "code"])
    .optional()
    .default("totalCommission"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  isActive: z.coerce.boolean().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type VendorCommissionQuery = z.infer<typeof VendorCommissionQuerySchema>;

/**
 * Query filters for vendor commission trends
 */
export const VendorCommissionTrendsQuerySchema = z.object({
  period: z.enum(["monthly", "weekly", "daily"]).optional().default("monthly"),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  affiliateCode: z.string().optional(),
});

export type VendorCommissionTrendsQuery = z.infer<
  typeof VendorCommissionTrendsQuerySchema
>;

/**
 * Single commission item in grouped commission history
 */
export interface VendorCommissionItem {
  affiliateLinkId: string;
  code: string;
  product: {
    id: string;
    title: string;
    slug: string;
    images: string[];
    price: number;
  } | null;
  totalCommission: number;
  totalOrders: number;
  completedOrders: number;
  lastCompletedOrderDate: Date | null;
  commissionType: string;
  commissionValue: number;
  discountType: string;
  discountValue: number;
  isActive: boolean;
  createdAt: Date;
}

/**
 * Response for vendor commission history
 */
export interface VendorCommissionResponse {
  items: VendorCommissionItem[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Single trend item for time-series commission data
 */
export interface VendorCommissionTrendItem {
  period: string;
  totalCommission: number;
  orderCount: number;
  affiliateBreakdown: Array<{
    code: string;
    commission: number;
    orderCount: number;
  }>;
}

/**
 * Response for vendor commission trends
 */
export interface VendorCommissionTrendsResponse {
  period: "monthly" | "weekly" | "daily";
  startDate: string;
  endDate: string;
  trends: VendorCommissionTrendItem[];
}

/**
 * Vendor commission summary statistics
 */
export interface VendorCommissionSummary {
  totalCommission: number;
  activeLinks: number;
  totalOrders: number;
  completedOrders: number;
}
