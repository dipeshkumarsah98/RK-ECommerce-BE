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
