# SERVICE LAYER PATTERNS

## OVERVIEW

Pure business logic layer between routes and Prisma, handling data transformation and transactions.

## SERVICE FILES

- auth.service.ts
- user.service.ts
- product.service.ts
- order.service.ts
- stock.service.ts
- payment.service.ts
- affiliate.service.ts
- earning.service.ts
- cod.service.ts

## PATTERNS

- **Pure Functions**: Services accept typed inputs and return typed outputs. No Express `req` or `res`.
- **Imports**: Access Prisma via `../lib/prisma.js` and throw errors from `../lib/errors.js`.
- **Transactions**: Use `prisma.$transaction(async (tx) => { ... })` for multi-step writes.
- **Atomic Operations**: Pass transaction client as an optional parameter: `serviceFunction(data, tx?)`.
- **Parallel Queries**: List functions use `Promise.all([findMany, count])` for performance.
- **Pagination**: Calculate `skip = (page - 1) * limit` and return `{ items, total, page, limit }`.
- **Service Composition**: Services call other services (e.g., `order.service` calls `stock.service`).
- **Computed Logic**: Functions like `computeDiscount()` handle logic for `PERCENTAGE` vs `FIXED` types.
- **Ledger-based Stock**: Update stock via `StockMovement` records. Restore stock on cancellations.
- **Static Earnings**: Create vendor earnings once on `COMPLETED` status. Never recalculate later.
- **File Naming**: Use kebab-case with `*.service.ts` suffix matching the route name.

## ANTI-PATTERNS

- **No Direct Stock Updates**: Never modify `Product.totalStock` without a `StockMovement` record.
- **No HTTP Context**: Never import Express types or access headers/cookies in this layer.
- **No Raw Errors**: Use `BadRequestError` or `NotFoundError` instead of generic `Error` objects.
- **No Recalculations**: Avoid logic that changes historical earning or commission records once set.
- **No Barrel Imports**: Import services and utilities directly from their specific files.
