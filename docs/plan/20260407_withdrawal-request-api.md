# Withdrawal Request API — Implementation Plan

**Created:** 2026-04-07  
**Updated:** 2026-04-07  
**Feature:** Vendor commission withdrawal with admin approval workflow

## Summary

Implement a withdrawal request flow where vendors request to withdraw their earned commission, and admins review, then approve (with transaction proof image URL) or reject (with reason). This requires new **Zod types**, a **withdrawal service**, route additions to **vendors.ts** and **admin.ts**, **email notifications** via the existing BullMQ queue, and new **constants** for business rules.

> **Note:** Schema migration (`processedBy String → String?`) is handled separately by the developer.

---

## Business Rules (Decided)

| Rule                          | Value                                                    | Defined in                                         |
| ----------------------------- | -------------------------------------------------------- | -------------------------------------------------- |
| Minimum withdrawal amount     | NPR 500                                                  | `src/lib/constant.ts` → `MIN_WITHDRAWAL_AMOUNT`    |
| Cooldown between withdrawals  | 7 days                                                   | `src/lib/constant.ts` → `WITHDRAWAL_COOLDOWN_DAYS` |
| One pending request at a time | Yes                                                      | Service-level check                                |
| Transaction proof             | Image URL string (frontend uploads to cloud, passes URL) | Zod `.url()` validation                            |

---

## Implementation Steps

### Step 1 — Add Constants (`src/lib/constant.ts`)

Add two new constants:

```typescript
export const MIN_WITHDRAWAL_AMOUNT = 500; // NPR
export const WITHDRAWAL_COOLDOWN_DAYS = 7;
```

### Step 2 — Create Types (`src/types/withdrawal.type.ts`)

Define Zod schemas and inferred types following the project pattern (schema-first, infer types):

| Schema                          | Purpose                                                           |
| ------------------------------- | ----------------------------------------------------------------- |
| `CreateWithdrawalRequestSchema` | Vendor creates a withdrawal — `{ amount: number }`                |
| `ApproveWithdrawalSchema`       | Admin approves — `{ transactionProof: string, remarks?: string }` |
| `RejectWithdrawalSchema`        | Admin rejects — `{ rejectionReason: string, remarks?: string }`   |
| `ListWithdrawalQuerySchema`     | Shared list filters — `{ status?, page?, limit? }`                |
| `WithdrawalStatus` enum         | `PENDING`, `APPROVED`, `REJECTED`                                 |

**Schema details:**

```typescript
import { z } from "zod";

export enum WithdrawalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const CreateWithdrawalRequestSchema = z.object({
  amount: z.number().positive("Withdrawal amount must be positive"),
});

export const ApproveWithdrawalSchema = z.object({
  transactionProof: z.string().url("Must be a valid URL"),
  remarks: z.string().optional(),
});

export const RejectWithdrawalSchema = z.object({
  rejectionReason: z.string().min(1, "Rejection reason is required"),
  remarks: z.string().optional(),
});

export const ListWithdrawalQuerySchema = z.object({
  status: z.nativeEnum(WithdrawalStatus).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});
```

Export inferred types: `CreateWithdrawalRequest`, `ApproveWithdrawalInput`, `RejectWithdrawalInput`, `ListWithdrawalQuery`.

### Step 3 — Add Email Job Types (`src/queues/emailQueue.ts`)

Add two new job data interfaces to the existing discriminated union:

```typescript
export interface WithdrawalRequestedJobData {
  type: "WITHDRAWAL_REQUESTED";
  vendorName: string;
  vendorEmail: string;
  amount: number;
  withdrawalId: string;
}

export interface WithdrawalProcessedJobData {
  type: "WITHDRAWAL_PROCESSED";
  to: string; // vendor email
  vendorName: string;
  amount: number;
  status: "APPROVED" | "REJECTED";
  transactionProof?: string; // only for APPROVED
  rejectionReason?: string; // only for REJECTED
  remarks?: string;
}
```

Update the `EmailJobData` union type:

```typescript
export type EmailJobData =
  | OrderConfirmationJobData
  | AdminNewOrderJobData
  | WithdrawalRequestedJobData
  | WithdrawalProcessedJobData;
```

Add two enqueue helpers:

```typescript
export async function enqueueWithdrawalRequested(
  data: Omit<WithdrawalRequestedJobData, "type">,
) {
  return emailQueue.add("withdrawal-requested", {
    type: "WITHDRAWAL_REQUESTED",
    ...data,
  });
}

export async function enqueueWithdrawalProcessed(
  data: Omit<WithdrawalProcessedJobData, "type">,
) {
  return emailQueue.add("withdrawal-processed", {
    type: "WITHDRAWAL_PROCESSED",
    ...data,
  });
}
```

### Step 4 — Add Email Worker Handlers (`src/queues/emailWorker.ts`)

Add two new `if` blocks in `processEmailJob()` following the existing pattern:

**`WITHDRAWAL_REQUESTED`** — Sends email to `ADMIN_EMAIL` notifying that a vendor has requested a withdrawal. Body includes vendor name, email, amount, and withdrawal ID.

**`WITHDRAWAL_PROCESSED`** — Sends email to the vendor notifying approval (with transaction proof link) or rejection (with reason).

Both follow the existing dev-mode guard pattern: in non-production, log the email body instead of sending.

### Step 5 — Create Service (`src/services/withdrawal.service.ts`)

**Helper functions (private):**

| Function                                          | Purpose                                                                                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `computeAvailableBalance(vendorId)`               | Sums total earnings, subtracts approved+pending withdrawal amounts                                                                                                           |
| `validateWithdrawalEligibility(vendorId, amount)` | Checks: minimum amount (≥ `MIN_WITHDRAWAL_AMOUNT`), no existing PENDING request, cooldown since last processed withdrawal (≥ `WITHDRAWAL_COOLDOWN_DAYS`), sufficient balance |
| `assertWithdrawalPending(withdrawalId)`           | Fetches the request, throws `NotFoundError` if missing, `BadRequestError` if not PENDING                                                                                     |

**Exported functions (public API):**

| Function                                          | Role   | Description                                                                                  |
| ------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| `createWithdrawalRequest(vendorId, input)`        | Vendor | Validate eligibility, create PENDING record, enqueue admin notification email                |
| `listVendorWithdrawals(vendorId, filters)`        | Vendor | List own withdrawal requests (paginated)                                                     |
| `getVendorWithdrawalById(vendorId, id)`           | Vendor | Get single request (ensures ownership)                                                       |
| `getVendorBalance(vendorId)`                      | Vendor | Return `{ totalEarnings, pendingWithdrawals, approvedWithdrawals, availableBalance }`        |
| `listAllWithdrawals(filters)`                     | Admin  | List all withdrawal requests (paginated) with vendor info                                    |
| `getWithdrawalById(id)`                           | Admin  | Get single request with vendor and admin details                                             |
| `approveWithdrawal(adminId, withdrawalId, input)` | Admin  | Set status=APPROVED, processedBy, processedAt, transactionProof, enqueue vendor notification |
| `rejectWithdrawal(adminId, withdrawalId, input)`  | Admin  | Set status=REJECTED, processedBy, processedAt, rejectionReason, enqueue vendor notification  |

**Balance calculation logic:**

```
totalEarnings     = SUM(VendorEarning.commission)      WHERE vendorId
pendingWithdrawals  = SUM(WithdrawalRequest.amount)    WHERE vendorId AND status='PENDING'
approvedWithdrawals = SUM(WithdrawalRequest.amount)    WHERE vendorId AND status='APPROVED'
availableBalance    = totalEarnings - pendingWithdrawals - approvedWithdrawals
```

**Eligibility checks in `validateWithdrawalEligibility()`:**

1. `amount >= MIN_WITHDRAWAL_AMOUNT` → else `BadRequestError("Minimum withdrawal amount is NPR 500")`
2. No existing PENDING request → `findFirst({ where: { vendorId, status: "PENDING" } })` → else `ConflictError("You already have a pending withdrawal request")`
3. Cooldown check → find last processed (APPROVED/REJECTED) request ordered by `processedAt desc` → if `processedAt + WITHDRAWAL_COOLDOWN_DAYS > now` → `BadRequestError("You must wait X days between withdrawal requests. Next eligible: <date>")`
4. `amount <= availableBalance` → else `BadRequestError("Insufficient balance. Available: NPR X")`

**Notification calls:**

- `createWithdrawalRequest` → calls `enqueueWithdrawalRequested({ vendorName, vendorEmail, amount, withdrawalId })` after creation. Must fetch vendor user to get name/email.
- `approveWithdrawal` / `rejectWithdrawal` → calls `enqueueWithdrawalProcessed({ to: vendor.email, vendorName, amount, status, transactionProof?, rejectionReason?, remarks? })` after update. Must include vendor from the withdrawal record.

### Step 6 — Add Vendor Withdrawal Routes to `src/routes/vendors.ts`

Add to the existing `vendors.ts` route file (which already handles vendor orders):

| Method | Path                           | Auth   | Description                                                    |
| ------ | ------------------------------ | ------ | -------------------------------------------------------------- |
| `GET`  | `/vendors/withdrawals/balance` | vendor | Get available balance breakdown                                |
| `POST` | `/vendors/withdrawals`         | vendor | Create a withdrawal request (validates eligibility)            |
| `GET`  | `/vendors/withdrawals`         | vendor | List own withdrawal requests (paginated, filterable by status) |
| `GET`  | `/vendors/withdrawals/:id`     | vendor | Get single withdrawal request detail                           |

**Pattern to follow:** Same as existing vendor order routes — `authenticate`, `requireRoles("vendor")`, `validate()`, `try/catch/next`. Use `AuthRequest` type cast for `req.user`.

**Important:** Place `/withdrawals/balance` route BEFORE `/withdrawals/:id` to avoid Express treating `balance` as a UUID param.

Define the Zod validation schemas inline in the route file (per project convention):

```typescript
const CreateWithdrawalSchema = z.object({
  amount: z.number().positive(),
});

const WithdrawalQuerySchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});
```

### Step 7 — Add Admin Withdrawal Routes to `src/routes/admin.ts`

Add to the existing `admin.ts` route file:

| Method  | Path                             | Auth  | Description                                                    |
| ------- | -------------------------------- | ----- | -------------------------------------------------------------- |
| `GET`   | `/admin/withdrawals`             | admin | List all withdrawal requests (paginated, filterable by status) |
| `GET`   | `/admin/withdrawals/:id`         | admin | Get single withdrawal request with vendor + admin details      |
| `PATCH` | `/admin/withdrawals/:id/approve` | admin | Approve with transactionProof URL                              |
| `PATCH` | `/admin/withdrawals/:id/reject`  | admin | Reject with rejectionReason                                    |

Define inline Zod schemas:

```typescript
const AdminWithdrawalQuerySchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

const ApproveWithdrawalSchema = z.object({
  transactionProof: z.string().url(),
  remarks: z.string().optional(),
});

const RejectWithdrawalSchema = z.object({
  rejectionReason: z.string().min(1),
  remarks: z.string().optional(),
});
```

### Step 8 — Add Swagger JSDoc

Add `@openapi` comments above each route following the existing pattern seen in `cod-verifications.ts` and `vendors.ts`. Include request/response schemas, security requirements, and parameter descriptions.

---

## Edge Cases to Handle

| Edge Case                                     | Handling                                                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Vendor has zero earnings                      | `BadRequestError("No earnings available for withdrawal")`                                                        |
| Withdrawal amount > available balance         | `BadRequestError("Insufficient balance. Available: NPR X")` — include available amount in message                |
| Withdrawal amount < 500                       | `BadRequestError("Minimum withdrawal amount is NPR 500")`                                                        |
| Withdrawal amount ≤ 0                         | Zod validation rejects (`z.number().positive()`)                                                                 |
| Vendor already has a PENDING request          | `ConflictError("You already have a pending withdrawal request")`                                                 |
| Vendor's last withdrawal was < 7 days ago     | `BadRequestError("You must wait X days between withdrawal requests. Next eligible: <date>")`                     |
| Approve/reject already-processed request      | `BadRequestError("Withdrawal request has already been processed")`                                               |
| Vendor tries to view another vendor's request | `NotFoundError` — query scoped by vendorId, so foreign IDs return not found                                      |
| Admin approves without transactionProof       | Zod validation rejects (required `.url()` field)                                                                 |
| Admin rejects without rejectionReason         | Zod validation rejects (required `.min(1)` field)                                                                |
| Concurrent withdrawal requests race condition | Use Prisma transaction for the create flow: check pending + check balance + create — all within `$transaction()` |
| Withdrawal request not found                  | `NotFoundError("Withdrawal request not found")`                                                                  |

---

## Resolved Decisions

| #   | Question                           | Decision                                                                                                  |
| --- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1   | Image upload for transaction proof | Frontend uploads to cloud storage, passes image URL string to backend                                     |
| 2   | Minimum withdrawal amount          | NPR 500 minimum, defined as `MIN_WITHDRAWAL_AMOUNT` in `src/lib/constant.ts`                              |
| 3   | Multiple pending requests          | One pending request at a time per vendor; `ConflictError` if existing PENDING                             |
| 4   | Cooldown period                    | 7-day cooldown between processed requests, defined as `WITHDRAWAL_COOLDOWN_DAYS` in `src/lib/constant.ts` |
| 5   | Email notifications                | On creation → notify all admins; on approve/reject → notify vendor. Uses existing BullMQ email queue      |

---

## Files to Create/Modify

| Action     | File                                 | Description                                                    |
| ---------- | ------------------------------------ | -------------------------------------------------------------- |
| **Modify** | `src/lib/constant.ts`                | Add `MIN_WITHDRAWAL_AMOUNT` and `WITHDRAWAL_COOLDOWN_DAYS`     |
| **Create** | `src/types/withdrawal.type.ts`       | Zod schemas + inferred types + `WithdrawalStatus` enum         |
| **Modify** | `src/queues/emailQueue.ts`           | Add withdrawal job data interfaces + enqueue helpers           |
| **Modify** | `src/queues/emailWorker.ts`          | Add `WITHDRAWAL_REQUESTED` and `WITHDRAWAL_PROCESSED` handlers |
| **Create** | `src/services/withdrawal.service.ts` | All withdrawal business logic + notifications                  |
| **Modify** | `src/routes/vendors.ts`              | Add vendor withdrawal endpoints (balance, create, list, get)   |
| **Modify** | `src/routes/admin.ts`                | Add admin withdrawal endpoints (list, get, approve, reject)    |

No new route files. No changes to `src/routes/index.ts` — both route files are already registered.

---

## Execution Order

```
1. (User) Schema fix + migrate + generate          ← handled by developer
2. Add constants to src/lib/constant.ts
3. Create src/types/withdrawal.type.ts
4. Add email job types to src/queues/emailQueue.ts
5. Add email handlers to src/queues/emailWorker.ts
6. Create src/services/withdrawal.service.ts
7. Add vendor routes to src/routes/vendors.ts
8. Add admin routes to src/routes/admin.ts
9. Typecheck (pnpm run typecheck)
10. Manual test with seeded accounts
```
