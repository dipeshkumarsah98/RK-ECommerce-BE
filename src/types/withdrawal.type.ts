import { z } from "zod";

/**
 * Withdrawal request status enum
 */
export enum WithdrawalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

/**
 * Create withdrawal request input schema
 */
export const CreateWithdrawalRequestSchema = z.object({
  amount: z.number().positive("Withdrawal amount must be positive"),
  remarks: z.string().optional(),
});

export type CreateWithdrawalRequest = z.infer<
  typeof CreateWithdrawalRequestSchema
>;

/**
 * Approve withdrawal input schema
 */
export const ApproveWithdrawalSchema = z.object({
  transactionProof: z.string().url("Must be a valid URL"),
  remarks: z.string().optional(),
});

export type ApproveWithdrawalInput = z.infer<typeof ApproveWithdrawalSchema>;

/**
 * Reject withdrawal input schema
 */
export const RejectWithdrawalSchema = z.object({
  rejectionReason: z.string().min(1, "Rejection reason is required"),
  remarks: z.string().optional(),
});

export type RejectWithdrawalInput = z.infer<typeof RejectWithdrawalSchema>;

/**
 * List withdrawal query filters
 */
export const ListWithdrawalQuerySchema = z.object({
  status: z.nativeEnum(WithdrawalStatus).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
});

export type ListWithdrawalQuery = z.infer<typeof ListWithdrawalQuerySchema>;

export const WithdrawalQuerySchema = z.object({
  status: z.nativeEnum(WithdrawalStatus).optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});
/**
 * Vendor balance response
 */
export interface VendorBalanceResponse {
  totalEarnings: number;
  pendingWithdrawals: number;
  approvedWithdrawals: number;
  availableBalance: number;
}

/**
 * Withdrawal statistics response (admin)
 */
export interface WithdrawalStatsResponse {
  totalRequests: number;
  pending: number;
  approved: number;
  rejected: number;
}
