# Copilot Instructions

## Project Overview

Affiliate e-commerce backend API built with Express.js 5, TypeScript, PostgreSQL (Prisma ORM), Redis (BullMQ), and Nepal-specific payment integrations (eSewa, Khalti).

## Commands

```bash
pnpm run dev              # Start dev server with hot reload (tsx watch)
pnpm run build            # Bundle for production (esbuild → /dist)
pnpm run start            # Run production build
pnpm run typecheck        # TypeScript type check (no emit)

pnpm run prisma:generate  # Regenerate Prisma client after schema changes
pnpm run prisma:migrate   # Create and run a new migration
pnpm run prisma:push      # Push schema changes without a migration (dev only)
pnpm run prisma:seed      # Seed DB with test users
pnpm run prisma:reset     # Drop and recreate DB (destructive)
```

There are no lint or format scripts — Prettier is installed but run manually.

## Architecture

Layered MVC: routes → services → Prisma. No controllers layer.

```
src/
├── index.ts              # Entry: loads env, starts email worker, calls app.listen
├── app.ts                # Express setup: middleware stack, route mounting, error handler
├── routes/               # HTTP handlers + Zod validation; call services for logic
├── services/             # All business logic and DB queries via Prisma
├── middlewares/          # auth.ts, validate.ts, errorHandler.ts, cors.middleware.ts
├── lib/                  # Shared utilities: prisma.ts, jwt.ts, email.ts, errors.ts, logger.ts, redis.ts
├── queues/               # emailQueue.ts (enqueue) + emailWorker.ts (BullMQ consumer)
├── config/               # mailer.config.ts (Nodemailer SMTP)
└── types/                # Shared TS types (not Prisma-generated)
```

All routes are mounted under `/api`. Swagger UI lives at `/api/docs`.

The Prisma client is generated into `/generated/prisma/` (not the default location). Always import from there.

while creating feature, refer the schema in `prisma/schema.prisma` for the database structure and relationships. This will guide you in writing Prisma queries in the services layer.

## Key Conventions

**Error handling** — throw from `src/lib/errors.ts`, never construct raw `Error`:

- `BadRequestError` (400), `UnauthorizedError` (401), `ForbiddenError` (403), `NotFoundError` (404), `ConflictError` (409), `UnprocessableEntityError` (422), `InternalServerError` (500)
- The global `errorHandler` middleware in `middlewares/errorHandler.ts` handles Zod errors, `AppError` subclasses, and unknown errors uniformly.

**Request validation** — every route uses `validate(ZodSchema, 'body' | 'query' | 'params')` middleware before the handler. Define schemas inline in the route file.

**Authentication** — use `authenticate` middleware for protected routes, then `requireRoles('admin', 'vendor', ...)` for role gating. Authenticated routes receive `AuthRequest` (extends `Request` with a `user` field).

**Services** — pure functions that accept typed inputs and return typed outputs. No `req`/`res` in services. Transactions are used for multi-step DB writes (e.g., order creation + stock movements).

**DB table names** are prefixed with `tbl_` (e.g., `tbl_users`, `tbl_orders`) — this is set in the Prisma schema via `@@map`.

**Logging** — use the Pino logger from `src/lib/logger.ts`. Never use `console.log`.

**File naming**:

- Routes/services/middlewares: `kebab-case.ts`
- Services: `*.service.ts`
- Types: `*.type.ts`

**Modules** — ES modules throughout (`"module": "esnext"`). Use `.js` extensions in imports when needed by the bundler. No barrel `index.ts` re-exports.

**Type management** — all types live in `src/types/` following this pattern:

1. **Define Zod schemas first** (e.g., `CreateOrderInputSchema`)
2. **Infer TypeScript types** from schemas using `z.infer<typeof Schema>`
3. **Export both** schema and type from the same file
4. **Never duplicate** type definitions — schemas are the single source of truth
5. **Import types** with `import type { ... }` for tree-shaking

Example (`src/types/order.type.ts`):

```typescript
import { z } from "zod";

export const CreateOrderInputSchema = z.object({
  customerEmail: z.string().email(),
  items: z.array(OrderItemInputSchema).min(1),
  // ... more fields
});

export type CreateOrderInput = z.infer<typeof CreateOrderInputSchema>;
```

**Service structure** — break down complex functions into focused helpers:

- **Main exported functions** (public API) should be concise and readable
- **Helper functions** (private) should handle specific tasks with clear names
- Each helper should have a **single responsibility**
- Use **JSDoc comments** to document each function's purpose
- Pass `PrismaTransactionClient` as parameter for transaction-aware helpers
- Name helpers descriptively: `resolveUserFromEmail`, `validateProductsAndStock`, etc.

Example service pattern:

```typescript
// Helper functions (private, not exported)
async function resolveUserFromEmail(input, tx) {
  /* ... */
}
async function validateProductsAndStock(items, tx) {
  /* ... */
}
async function calculateOrderTotals(items, productMap, affiliateLink) {
  /* ... */
}

// Main function (public API)
export async function createOrder(input: CreateOrderInput) {
  return prisma.$transaction(async (tx) => {
    const userId = await resolveUserFromEmail(input, tx);
    const products = await validateProductsAndStock(input.items, tx);
    const totals = calculateOrderTotals(input.items, products, null);
    // ... clean sequential steps
  });
}
```

**OTP dev shortcut** — In development (`isDev` from `src/lib/constant.ts`), the OTP is hardcoded as `"123456"` instead of generating a random one.

## Anti-Patterns to Avoid

**Type Management**:

- ❌ Don't create duplicate interfaces and Zod schemas
- ❌ Don't define types inline in service files
- ❌ Don't use `interface` when a Zod schema exists — always infer from schema
- ✅ Always define Zod schema in `src/types/*.type.ts`, then infer the type

**Service Functions**:

- ❌ Don't write 200+ line functions with many responsibilities
- ❌ Don't inline all logic in the main exported function
- ❌ Don't use generic names like `handleData`, `processStuff`
- ✅ Break down into focused helpers with descriptive names
- ✅ Keep main functions under 60-80 lines by extracting helpers
- ✅ Use clear, action-based names: `validateStock`, `calculateTotals`, `createPaymentRecord`

**Code Organization**:

- ❌ Don't put business logic in route handlers
- ❌ Don't access Prisma directly from routes
- ❌ Don't mix concerns (validation + business logic + DB queries in one function)
- ✅ Routes handle HTTP concerns only (validation, auth, response)
- ✅ Services handle all business logic and DB access
- ✅ Each function has one clear purpose

## Database Schema (Prisma)

Core models: `User`, `Product`, `Order`, `OrderItem`, `Payment`, `AffiliateLink`, `VendorEarning`, `StockMovement`, `CODVerification`, `OtpCode`.

Key enums:

- `OrderStatus`: PENDING → AWAITING_VERIFICATION → VERIFIED → PROCESSING → SHIPPED → COMPLETED | CANCELLED
- `PaymentStatus`: PENDING, SUCCESS, FAILED
- `VerificationStatus`: PENDING, CONFIRMED, REJECTED
- `StockMovementType`: IN, OUT

Inventory is ledger-based via `StockMovement` — stock is computed from movements, not stored directly on `Product` (though `Product.totalStock` may be a cached/denormalized field).

## Environment Variables

Required in `.env`: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `PORT`, `NODE_ENV`, `SMTP_*` (host/port/user/pass), and payment keys (`ESEWA_*`, `KHALTI_*`).

## Seeded Test Accounts

| Email                     | Role           |
| ------------------------- | -------------- |
| `admin@mailinator.com`    | admin          |
| `vendor@mailinator.com`   | vendor         |
| `customer@mailinator.com` | customer       |
| `super@mailinator.com`    | admin + vendor |
