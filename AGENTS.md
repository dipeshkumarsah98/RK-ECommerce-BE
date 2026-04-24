# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-24
**Commit:** 026c743
**Branch:** main

## OVERVIEW

Affiliate e-commerce backend API for Nepal — Express 5, TypeScript, PostgreSQL (Prisma 7), Redis (BullMQ), JWT+OTP auth, eSewa/Khalti payments.

## STRUCTURE

```
src/
├── index.ts              # Entry: dotenv, email worker, app.listen
├── app.ts                # Express middleware stack + route mounting
├── routes/               # HTTP handlers + Zod validation + Swagger JSDoc
├── services/             # Business logic (pure functions, no req/res)
├── middlewares/          # auth, validate, errorHandler, cors, notFound
├── lib/                  # Shared utilities (prisma, jwt, email, logger, redis, errors)
├── queues/               # BullMQ email queue + worker
├── config/               # mailer.config.ts
└── types/                # Shared TS types + Zod schemas (not Prisma-generated)
prisma/
├── schema.prisma         # DB schema — tables prefixed tbl_*
├── seed.ts               # Test data seeder
└── migrations/           # Prisma migrations
generated/prisma/         # Prisma client output (non-default location)
```

## WHERE TO LOOK

| Task                 | Location                        | Notes                                                                      |
| -------------------- | ------------------------------- | -------------------------------------------------------------------------- |
| Add new API endpoint | `src/routes/` + `src/services/` | Route file + matching service file                                         |
| Add middleware       | `src/middlewares/`              | Follow `auth.ts` or `validate.ts` pattern                                  |
| Custom error class   | `src/lib/errors.ts`             | Extend `AppError`                                                          |
| DB schema change     | `prisma/schema.prisma`          | Run `prisma:migrate` after                                                 |
| Background job       | `src/queues/`                   | Follow emailQueue/emailWorker pattern                                      |
| Shared types         | `src/types/`                    | Suffix `.type.ts`                                                          |
| Swagger docs         | Inline JSDoc in route files     | Auto-parsed by `swagger-jsdoc`                                             |
| Prisma client import | `src/lib/prisma.ts`             | Re-exports from `generated/prisma/`                                        |
| Environment vars     | `.env` / `.env.example`         | Required: DATABASE*URL, REDIS_URL, SESSION_SECRET, PORT, NODE_ENV, SMTP*\* |

## CONVENTIONS

- **Architecture**: routes -> services -> Prisma. No controllers layer.
- **Error handling**: Always throw from `src/lib/errors.ts` (`BadRequestError`, `NotFoundError`, etc.). Never construct raw `Error` for HTTP responses.
- **Validation**: Every route uses `validate(ZodSchema, 'body'|'query'|'params')` middleware. Schemas defined inline in route files.
- **Auth flow**: `authenticate` middleware -> `requireRoles(...)` -> handler receives `AuthRequest` with `user` field.
- **Services**: Pure functions — typed inputs, typed outputs. No `req`/`res`. Use Prisma transactions for multi-step writes.
- **DB tables**: All prefixed `tbl_` via `@@map` in Prisma schema.
- **Prisma client**: Generated to `generated/prisma/` (not default). Import via `src/lib/prisma.ts` which re-exports everything.
- **Logging**: Pino logger from `src/lib/logger.ts`. Never `console.log`.
- **File naming**: kebab-case. Services: `*.service.ts`. Types: `*.type.ts`.
- **Modules**: ES modules (`"module": "esnext"`). Use `.js` extensions in imports.
- **Response shape**: `{ success: false, error: "..." }` for errors. `{ success: false, error: "Validation failed", details: ... }` for Zod errors.
- **Pagination**: `{ items, total, page, limit }` pattern.
- **OTP dev shortcut**: In development, OTP is hardcoded `"123456"` (see `src/services/auth.service.ts:20`).

## ANTI-PATTERNS (THIS PROJECT)

- **Stock is NEVER updated directly** — only via `StockMovement` records (ledger pattern). `Product.totalStock` is a denormalized cache.
- **Vendor earnings are never recalculated** — computed once on order completion, preserving historical accuracy.
- **No barrel re-exports** — no `index.ts` barrel files. Import directly from the specific module.
- **No `console.log`** — use `logger` from `src/lib/logger.ts`.
- **No raw `Error` for HTTP** — use `AppError` subclasses from `src/lib/errors.ts`.

## COMMANDS

```bash
pnpm run dev              # Start dev server (tsx watch, hot reload)
                          # NOTE: predev hook runs prisma:generate && build first
pnpm run build            # Bundle for production (esbuild -> /dist)
pnpm run start            # Run production build
pnpm run typecheck        # TypeScript type check (no emit)

pnpm run prisma:generate  # Regenerate client after schema changes
pnpm run prisma:migrate   # Create + run migration (alias: migrate:dev)
pnpm run prisma:push      # Push schema without migration (dev only)
pnpm run prisma:seed      # Seed DB with test accounts
pnpm run prisma:reset     # Drop + recreate DB (DESTRUCTIVE, alias: migrate:reset)
pnpm run prisma:deploy    # Deploy migrations (production, alias: migrate:deploy)
```

No lint/format scripts. Prettier installed but run manually.

## NOTES

- **Express 5** — not Express 4. Error handling uses `next(err)` pattern. Import `express-async-errors` for async route handlers.
- **Prisma 7 with pg adapter** — uses `@prisma/adapter-pg` and `prisma.config.ts` for custom config instead of default Prisma setup.
- **No tests** — no test framework, no test files, no test scripts.
- **No CI/CD** — no GitHub Actions workflows (`.github/workflows/` doesn't exist). Build/deploy is manual.
- **CORS whitelist**: localhost:3000, :5173, :5000 only.
- **JWT secret env var**: Code uses `SESSION_SECRET` (see `src/lib/jwt.ts:3`), but `.env.example` shows `JWT_SECRET_KEY`. Use `SESSION_SECRET` in your `.env`. Fallback: `"fallback-secret"`.
- **esbuild bundles** to `dist/` with ESM output (.mjs). `build.mjs` copies Prisma client from `src/generated/prisma` to `dist/generated/prisma`.
- **Seeded accounts**: admin/vendor/customer/super @mailinator.com.
- **`notFoundHandler.middleware.ts` exists** in `src/middlewares/` but is NOT mounted in `app.ts`.
- **`mailer.config.ts`** exists in `src/config/` but emailWorker creates its own transporter inline.

## RELATED DOCS

- [`src/routes/AGENTS.md`](src/routes/AGENTS.md) — Route handler patterns
- [`src/services/AGENTS.md`](src/services/AGENTS.md) — Service layer patterns
- [`src/lib/AGENTS.md`](src/lib/AGENTS.md) — Utility library guide
- [`.github/copilot-instructions.md`](.github/copilot-instructions.md) — Additional project conventions and patterns
- [`.agents/skills/`](.agents/skills/) — OpenCode skills (coder, nodejs-express-server, typescript-advanced-types)
