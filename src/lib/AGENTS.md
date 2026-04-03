# LIB UTILITIES GUIDE

## OVERVIEW

Shared utility modules for DB access, authentication, error handling, logging, and background services.

## MODULES

### Prisma (prisma.ts)

Prisma client singleton using `@prisma/adapter-pg`. Re-exports all Prisma types from `../../generated/prisma/index.js`. Always import the client and types from this module.

### Errors (errors.ts)

Base `AppError` class and HTTP subclasses: `BadRequestError` (400), `UnauthorizedError` (401), `ForbiddenError` (403), `NotFoundError` (404), `ConflictError` (409), `UnprocessableEntityError` (422), `InternalServerError` (500), and `ServiceUnavailableError` (503). `InternalServerError` marks `isOperational=false`.

### JWT (jwt.ts)

Functions `signToken` and `verifyToken`. Uses `SESSION_SECRET` (not `JWT_SECRET`) with a "fallback-secret" default. Tokens last 7 days. Payload structure: `{ userId: string, roles: string[] }`.

### Logger (logger.ts)

Pino logger instance. Redacts sensitive auth headers and cookies. Uses `pino-pretty` when `NODE_ENV` isn't production.

### Redis (redis.ts)

IORedis singleton requiring `REDIS_URL`. Configured for BullMQ compatibility with `maxRetriesPerRequest: null`.

### Email (email.ts)

Handles `sendOtpEmail()`. Creates a Nodemailer transporter inline. In development, logs the OTP to the console instead of sending.

### OTP (otp.ts)

Utility `generateOtp()` creates 6-digit crypto-random strings. `otpExpiresAt()` returns a timestamp 10 minutes in the future.

### Constants & IDs

- `constant.ts`: Exports `isDev` boolean.
- `nanoid.ts`: Custom alphanumeric `nanoid()` using `crypto.randomBytes`. Default length 21.

### Swagger (swagger.ts)

`swagger-jsdoc` configuration. Scans `src/routes/*.ts` for `@openapi` JSDoc tags. Documentation served at `/api/docs`.

## KEY GOTCHAS

- **JWT Secret**: Always use `SESSION_SECRET` environment variable.
- **Prisma Types**: Never import directly from `generated/prisma`. Use this lib's re-exports.
- **BullMQ**: Ensure Redis connection remains shared to avoid connection limit issues.
- **Operational Errors**: Only `InternalServerError` triggers non-operational status.
- **Email Config**: This module ignores `src/config/mailer.config.ts` and sets up its own transporter.
