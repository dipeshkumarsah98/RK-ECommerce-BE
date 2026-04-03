import { z } from "zod";

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}

export enum CommissionType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}

export enum AffiliateVendorType {
  INFLUENCER = "INFLUENCER",
  RESELLER = "RESELLER",
  REFERRAL = "REFERRAL",
  PARTNER = "PARTNER",
}

export const VendorInfoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  affiliateType: z.nativeEnum(AffiliateVendorType),
  contact: z.string().optional(),
  address: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
});

export const AffiliateLinkInfoSchema = z.object({
  productId: z.string().uuid().optional(),
  code: z.string().min(4).optional(),
  discountType: z.nativeEnum(DiscountType),
  discountValue: z.number().min(0),
  commissionType: z.nativeEnum(CommissionType),
  commissionValue: z.number().min(0),
});

export const CreateVendorAffiliateLinkSchema = z.object({
  vendor: VendorInfoSchema,
  affiliate: AffiliateLinkInfoSchema,
});

export const UpdateAffiliateLinkSchema = z.object({
  productId: z.string().uuid().optional(),
  code: z.string().min(4).optional(),
  discountType: z.nativeEnum(DiscountType).optional(),
  discountValue: z.number().min(0).optional(),
  commissionType: z.nativeEnum(CommissionType).optional(),
  commissionValue: z.number().min(0).optional(),
});

export type VendorInfo = z.infer<typeof VendorInfoSchema>;
export type AffiliateLinkInfo = z.infer<typeof AffiliateLinkInfoSchema>;
export type CreateVendorAffiliateLinkPayload = z.infer<
  typeof CreateVendorAffiliateLinkSchema
>;
export type UpdateAffiliateLinkPayload = z.infer<
  typeof UpdateAffiliateLinkSchema
>;
