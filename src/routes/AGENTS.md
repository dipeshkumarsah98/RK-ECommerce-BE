# ROUTES KNOWLEDGE BASE

## OVERVIEW

Handler-specific patterns for Express 5 routes, Zod validation, and services integration.

## ROUTE FILES

- `admin.ts`
- `affiliates.ts`
- `auth.ts`
- `cod-verifications.ts`
- `earnings.ts`
- `health.ts`
- `orders.ts`
- `payments.ts`
- `products.ts`
- `stock-movements.ts`
- `users.ts`

## PATTERNS

- **Structure**: Import `Router` from `express`, define `const router = Router()`, and `export default router`.
- **Zod**: Define schemas inline at the top of the file (e.g., `const LoginSchema = z.object({...})`).
- **Validation**: Use `validate(Schema, 'body'|'query'|'params')` middleware before handlers.
- **Auth**: Chain `authenticate` followed by `requireRoles('admin', 'vendor', ...)` for protection.
- **Swagger**: Write `@openapi` JSDoc comments directly above each route for auto-docs.
- **Handlers**: Use `async (req, res, next) => { try { ... } catch (err) { next(err) } }`.
- **Services**: Routes call services for logic. Never use Prisma directly in a route file.
- **Typing**: Use `(req as any).user` cast for `AuthRequest` properties (seen in `products.ts`).
- **Pagination**: Handle `page` and `limit` query params with 1 and 20 as respective defaults.
- **Errors**: Catch service errors and wrap them in `AppError` subclasses before calling `next(err)`.
- **Mounting**: All route files registered in `routes/index.ts`, which is mounted at `/api` in `app.ts`.

## ANTI-PATTERNS

- **Direct DB access**: No `prisma.tbl_...` calls. Move this to a service file.
- **Business logic**: Keep handlers thin. Logic goes in `src/services/`.
- **Raw errors**: Don't use `throw new Error()`. Use classes from `src/lib/errors.ts`.
- **Missing validation**: Every endpoint must have a Zod schema and `validate` middleware.
- **External Schemas**: Don't import Zod schemas from other files. Keep them inline for route clarity.
