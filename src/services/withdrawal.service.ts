import { prisma } from "../lib/prisma.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../lib/errors.js";
import {
  MIN_WITHDRAWAL_AMOUNT,
  WITHDRAWAL_COOLDOWN_DAYS,
} from "../lib/constant.js";
import { WithdrawalStatus } from "../types/withdrawal.type.js";
import type {
  CreateWithdrawalRequest,
  ApproveWithdrawalInput,
  RejectWithdrawalInput,
  ListWithdrawalQuery,
  VendorBalanceResponse,
} from "../types/withdrawal.type.js";
import { appEvents, AppEvent } from "../events/index.js";
import { getSignedR2Url } from "../lib/storage.js";

/**
 * Helper: Sign transactionProof URL if present
 */
async function signTransactionProof<
  T extends { transactionProof: string | null },
>(withdrawal: T): Promise<T> {
  if (!withdrawal.transactionProof) {
    return withdrawal;
  }

  const signedUrl = await getSignedR2Url(withdrawal.transactionProof, 3600);
  return {
    ...withdrawal,
    transactionProof: signedUrl || withdrawal.transactionProof,
  };
}

/**
 * Helper: Sign transactionProof URLs for an array of withdrawals
 */
async function signTransactionProofs<
  T extends { transactionProof: string | null },
>(withdrawals: T[]): Promise<T[]> {
  return Promise.all(withdrawals.map(signTransactionProof));
}

/**
 * Helper: Compute available balance for a vendor
 */
async function computeAvailableBalance(vendorId: string): Promise<number> {
  const [
    totalEarningsResult,
    pendingWithdrawalsResult,
    approvedWithdrawalsResult,
  ] = await Promise.all([
    prisma.vendorEarning.aggregate({
      where: { vendorId },
      _sum: { commission: true },
    }),
    prisma.withdrawalRequest.aggregate({
      where: { vendorId, status: WithdrawalStatus.PENDING },
      _sum: { amount: true },
    }),
    prisma.withdrawalRequest.aggregate({
      where: { vendorId, status: WithdrawalStatus.APPROVED },
      _sum: { amount: true },
    }),
  ]);

  const totalEarnings = totalEarningsResult._sum.commission || 0;
  const pendingWithdrawals = pendingWithdrawalsResult._sum.amount || 0;
  const approvedWithdrawals = approvedWithdrawalsResult._sum.amount || 0;

  return totalEarnings - pendingWithdrawals - approvedWithdrawals;
}

/**
 * Helper: Validate withdrawal eligibility (minimum amount, no pending requests, cooldown, sufficient balance)
 */
async function validateWithdrawalEligibility(
  vendorId: string,
  amount: number,
): Promise<void> {
  // Check for existing pending request
  const existingPending = await prisma.withdrawalRequest.findFirst({
    where: { vendorId, status: WithdrawalStatus.PENDING },
  });

  if (existingPending) {
    throw new ConflictError("You already have a pending withdrawal request");
  }

  // Check cooldown period
  const lastProcessed = await prisma.withdrawalRequest.findFirst({
    where: {
      vendorId,
      status: { in: [WithdrawalStatus.APPROVED, WithdrawalStatus.REJECTED] },
      processedAt: { not: null },
    },
    orderBy: { processedAt: "desc" },
  });

  // Check minimum amount
  if (amount < MIN_WITHDRAWAL_AMOUNT) {
    if (lastProcessed && lastProcessed.processedAt) {
      const cooldownEnd = new Date(lastProcessed.processedAt);
      cooldownEnd.setDate(cooldownEnd.getDate() + WITHDRAWAL_COOLDOWN_DAYS);

      if (cooldownEnd > new Date()) {
        const daysLeft = Math.ceil(
          (cooldownEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        );
        throw new BadRequestError(
          `You must wait ${daysLeft} more day(s) between withdrawal requests. Next eligible: ${cooldownEnd.toLocaleDateString()}`,
        );
      }
    } else {
      throw new BadRequestError(
        `Minimum withdrawal amount is NPR ${MIN_WITHDRAWAL_AMOUNT}`,
      );
    }
  }

  // Check available balance
  const availableBalance = await computeAvailableBalance(vendorId);

  if (amount > availableBalance) {
    throw new BadRequestError(
      `Insufficient balance. Available: NPR ${availableBalance.toFixed(2)}`,
    );
  }

  // Check if vendor has any earnings at all
  if (availableBalance <= 0) {
    throw new BadRequestError("No earnings available for withdrawal");
  }
}

/**
 * Helper: Assert withdrawal request exists and is PENDING
 */
async function assertWithdrawalPending(withdrawalId: string) {
  const withdrawal = await prisma.withdrawalRequest.findUnique({
    where: { id: withdrawalId },
    include: {
      vendor: { select: { id: true, name: true, email: true } },
    },
  });

  if (!withdrawal) {
    throw new NotFoundError("Withdrawal request not found");
  }

  if (withdrawal.status !== WithdrawalStatus.PENDING) {
    throw new BadRequestError("Withdrawal request has already been processed");
  }

  return withdrawal;
}

/**
 * Create a new withdrawal request
 */
export async function createWithdrawalRequest(
  vendorId: string,
  input: CreateWithdrawalRequest,
) {
  // Validate eligibility first
  // await validateWithdrawalEligibility(vendorId, input.amount);

  // Create the withdrawal request
  const withdrawal = await prisma.withdrawalRequest.create({
    data: {
      vendorId,
      amount: input.amount,
      status: WithdrawalStatus.PENDING,
      remarks: input.remarks,
    },
    include: {
      vendor: { select: { name: true, email: true } },
    },
  });

  // Emit withdrawal requested event
  appEvents.emit(AppEvent.WITHDRAWAL_REQUESTED, {
    withdrawalId: withdrawal.id,
    vendorId: withdrawal.vendorId,
    vendorName: withdrawal.vendor.name,
    vendorEmail: withdrawal.vendor.email,
    amount: withdrawal.amount,
    remarks: input.remarks,
  });

  return withdrawal;
}

/**
 * List vendor's own withdrawal requests
 */
export async function listVendorWithdrawals(
  vendorId: string,
  filters: ListWithdrawalQuery,
) {
  const { status, page = 1, limit = 20 } = filters;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { vendorId };
  if (status) {
    where.status = status;
  }

  const [items, total] = await Promise.all([
    prisma.withdrawalRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { requestedAt: "desc" },
    }),
    prisma.withdrawalRequest.count({ where }),
  ]);

  // Sign transaction proof URLs
  const signedItems = await signTransactionProofs(items);

  return { items: signedItems, total, page, limit };
}

/**
 * Get single withdrawal request for vendor (ensures ownership)
 */
export async function getVendorWithdrawalById(
  vendorId: string,
  withdrawalId: string,
) {
  const withdrawal = await prisma.withdrawalRequest.findFirst({
    where: { id: withdrawalId, vendorId },
  });

  if (!withdrawal) {
    throw new NotFoundError("Withdrawal request not found");
  }

  // Sign transaction proof URL
  return signTransactionProof(withdrawal);
}

/**
 * Get vendor balance breakdown
 */
export async function getVendorBalance(
  vendorId: string,
): Promise<VendorBalanceResponse> {
  const [
    totalEarningsResult,
    pendingWithdrawalsResult,
    approvedWithdrawalsResult,
  ] = await Promise.all([
    prisma.vendorEarning.aggregate({
      where: { vendorId },
      _sum: { commission: true },
    }),
    prisma.withdrawalRequest.aggregate({
      where: { vendorId, status: WithdrawalStatus.PENDING },
      _sum: { amount: true },
    }),
    prisma.withdrawalRequest.aggregate({
      where: { vendorId, status: WithdrawalStatus.APPROVED },
      _sum: { amount: true },
    }),
  ]);

  const totalEarnings = totalEarningsResult._sum.commission || 0;
  const pendingWithdrawals = pendingWithdrawalsResult._sum.amount || 0;
  const approvedWithdrawals = approvedWithdrawalsResult._sum.amount || 0;
  const availableBalance =
    totalEarnings - pendingWithdrawals - approvedWithdrawals;

  return {
    totalEarnings,
    pendingWithdrawals,
    approvedWithdrawals,
    availableBalance,
  };
}

/**
 * List all withdrawal requests (admin)
 */
export async function listAllWithdrawals(filters: ListWithdrawalQuery) {
  const { status, search, page = 1, limit = 20 } = filters;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (status) {
    where.status = status;
  }

  // Add search filter for withdrawal ID, vendor name, or vendor email
  if (search) {
    where.OR = [
      { id: { contains: search, mode: "insensitive" } },
      { vendor: { name: { contains: search, mode: "insensitive" } } },
      { vendor: { email: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.withdrawalRequest.findMany({
      where,
      skip,
      take: limit,
      include: {
        vendor: { select: { id: true, name: true, email: true, extras: true } },
      },
      orderBy: { requestedAt: "desc" },
    }),
    prisma.withdrawalRequest.count({ where }),
  ]);

  // Sign transaction proof URLs
  const signedItems = await signTransactionProofs(items);

  return { items: signedItems, total, page, limit };
}

/**
 * Get single withdrawal request by ID (admin)
 */
export async function getWithdrawalById(withdrawalId: string) {
  const withdrawal = await prisma.withdrawalRequest.findUnique({
    where: { id: withdrawalId },
    include: {
      vendor: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          extras: true,
        },
      },
      admin: { select: { id: true, name: true, email: true } },
    },
  });

  if (!withdrawal) {
    throw new NotFoundError("Withdrawal request not found");
  }

  // Sign transaction proof URL
  return signTransactionProof(withdrawal);
}

/**
 * Approve withdrawal request
 */
export async function approveWithdrawal(
  adminId: string,
  withdrawalId: string,
  input: ApproveWithdrawalInput,
) {
  // Assert withdrawal is pending
  const withdrawal = await assertWithdrawalPending(withdrawalId);

  // Update the withdrawal request
  const updated = await prisma.withdrawalRequest.update({
    where: { id: withdrawalId },
    data: {
      status: WithdrawalStatus.APPROVED,
      processedBy: adminId,
      processedAt: new Date(),
      transactionProof: input.transactionProof,
      remarks: input.remarks,
    },
    include: {
      vendor: { select: { name: true, email: true } },
    },
  });

  // Emit withdrawal approved event
  appEvents.emit(AppEvent.WITHDRAWAL_APPROVED, {
    withdrawalId: updated.id,
    vendorId: updated.vendorId,
    vendorName: updated.vendor.name,
    vendorEmail: updated.vendor.email,
    amount: updated.amount,
    transactionProof: input.transactionProof,
    remarks: input.remarks,
    approvedBy: adminId,
  });

  // Sign transaction proof URL before returning
  return signTransactionProof(updated);
}

/**
 * Reject withdrawal request
 */
export async function rejectWithdrawal(
  adminId: string,
  withdrawalId: string,
  input: RejectWithdrawalInput,
) {
  // Assert withdrawal is pending
  const withdrawal = await assertWithdrawalPending(withdrawalId);

  // Update the withdrawal request
  const updated = await prisma.withdrawalRequest.update({
    where: { id: withdrawalId },
    data: {
      status: WithdrawalStatus.REJECTED,
      processedBy: adminId,
      processedAt: new Date(),
      rejectionReason: input.rejectionReason,
      remarks: input.remarks,
    },
    include: {
      vendor: { select: { name: true, email: true } },
    },
  });

  // Emit withdrawal rejected event
  appEvents.emit(AppEvent.WITHDRAWAL_REJECTED, {
    withdrawalId: updated.id,
    vendorId: updated.vendorId,
    vendorName: updated.vendor.name,
    vendorEmail: updated.vendor.email,
    amount: updated.amount,
    rejectionReason: input.rejectionReason,
    remarks: input.remarks,
    rejectedBy: adminId,
  });

  return updated;
}

/**
 * Get withdrawal statistics (admin)
 */
export async function getWithdrawalStats() {
  const [total, pending, approved, rejected] = await Promise.all([
    prisma.withdrawalRequest.count(),
    prisma.withdrawalRequest.count({
      where: { status: WithdrawalStatus.PENDING },
    }),
    prisma.withdrawalRequest.count({
      where: { status: WithdrawalStatus.APPROVED },
    }),
    prisma.withdrawalRequest.count({
      where: { status: WithdrawalStatus.REJECTED },
    }),
  ]);

  return {
    totalRequests: total,
    pending,
    approved,
    rejected,
  };
}
