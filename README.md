# Affiliate E-Commerce Backend API

A robust Node.js/Express backend for an affiliate-based e-commerce platform, specifically designed for Nepal-based payment systems with comprehensive inventory tracking, COD verification, and vendor commission management.

## Features

### Core Functionality

- **🔐 OTP-based Authentication** - Secure email-based authentication with JWT
- **👥 Multi-role System** - Admin, Vendor, and Customer role management
- **🛍️ Order Management** - Complete order lifecycle with status tracking
- **📦 Inventory Tracking** - Ledger-based stock movement system
- **💳 Payment Integration** - eSewa & Khalti payment gateway support + COD
- **🤝 Affiliate System** - Vendor affiliate links with commission tracking
- **✅ COD Verification** - Admin-managed Cash on Delivery verification
- **📊 Real-time Health Monitoring** - Comprehensive API health checks

### Technical Features

- **🏗️ Modern Tech Stack** - TypeScript, Express 5, Prisma, PostgreSQL, Redis
- **📚 API Documentation** - OpenAPI/Swagger documentation
- **🔄 Background Jobs** - Email queuing with BullMQ
- **🏥 Health Monitoring** - Database & Redis connectivity checks
- **🌱 Database Seeding** - Pre-configured test data
- **📝 Structured Logging** - Pino logger integration
- **🛡️ Error Handling** - Comprehensive error management

## Tech Stack

| Category           | Technology      |
| ------------------ | --------------- |
| **Runtime**        | Node.js         |
| **Framework**      | Express.js 5    |
| **Language**       | TypeScript      |
| **Database**       | PostgreSQL      |
| **ORM**            | Prisma          |
| **Cache/Queue**    | Redis + BullMQ  |
| **Authentication** | JWT + OTP       |
| **Email**          | Nodemailer      |
| **Documentation**  | Swagger/OpenAPI |
| **Logging**        | Pino            |
| **Payments**       | eSewa, Khalti   |

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **PostgreSQL** (v14 or higher)
- **Redis** (v6 or higher)

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/dipeshkumarsah98/RK-ECommerce-BE.git
cd Rk-ECommerce-BE
pnpm install
```

### 2. Environment Setup

Create a `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/affiliate_ecommerce"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# App Configuration
NODE_ENV="development"
PORT=3000

# Payment Gateways (Optional)
ESEWA_MERCHANT_ID="your-esewa-merchant-id"
KHALTI_SECRET_KEY="your-khalti-secret-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm run prisma:generate

# Run database migrations
pnpm run prisma:migrate

# Seed with test data (optional)
pnpm run prisma:seed
```

### 4. Start Development Server

```bash
pnpm run dev
```

The API will be available at `http://localhost:3000/api`

## API Documentation

### Interactive Documentation

Visit `http://localhost:3000/api/docs` for the interactive Swagger UI

### API Endpoints Overview

| Category       | Endpoints                                       | Description           |
| -------------- | ----------------------------------------------- | --------------------- |
| **Health**     | `GET /healthz`, `/health`                       | API health monitoring |
| **Auth**       | `POST /auth/send-otp`, `/auth/verify-otp`       | OTP authentication    |
| **Users**      | `GET/PATCH /users/me`, `GET /users/:id`         | User management       |
| **Products**   | `GET/POST /products`, `GET/PATCH /products/:id` | Product catalogue     |
| **Orders**     | `GET/POST /orders`, `PATCH /orders/:id/status`  | Order management      |
| **Stock**      | `GET/POST /stock-movements`                     | Inventory tracking    |
| **Payments**   | `POST /payments/initiate`, `/payments/callback` | Payment processing    |
| **Affiliates** | `GET/POST /affiliates`, `GET /affiliates/:code` | Affiliate links       |
| **COD**        | `POST /cod-verifications`                       | COD verification      |
| **Earnings**   | `GET /earnings`                                 | Vendor commissions    |
| **Admin**      | `/admin/*`                                      | Admin-only endpoints  |

## Project Structure

```
src/
├── app.ts                 # Express app configuration
├── index.ts              # Server entry point
├── lib/                  # Utility libraries
│   ├── email.ts          # Email service
│   ├── errors.ts         # Custom error classes
│   ├── jwt.ts            # JWT utilities
│   ├── logger.ts         # Pino logger setup
│   ├── otp.ts           # OTP generation
│   ├── prisma.ts        # Prisma client
│   ├── redis.ts         # Redis connection
│   └── swagger.ts       # API documentation
├── middlewares/         # Express middlewares
│   ├── auth.ts          # JWT authentication
│   ├── errorHandler.ts  # Global error handler
│   └── validate.ts      # Request validation
├── queues/             # Background job processing
│   ├── emailQueue.ts   # Email queue setup
│   └── emailWorker.ts  # Email worker
├── routes/             # API route handlers
│   ├── admin.ts        # Admin endpoints
│   ├── affiliates.ts   # Affiliate management
│   ├── auth.ts         # Authentication
│   ├── earnings.ts     # Vendor earnings
│   ├── health.ts       # Health monitoring
│   ├── orders.ts       # Order management
│   ├── payments.ts     # Payment processing
│   ├── products.ts     # Product catalogue
│   └── users.ts        # User management
└── services/           # Business logic
    ├── affiliate.service.ts
    ├── auth.service.ts
    ├── order.service.ts
    └── [other services...]
```

## Health Monitoring

The API includes comprehensive health monitoring:

### Health Endpoints

- **`GET /api/healthz`** - Basic health check (for load balancers)
- **`GET /api/health`** - Comprehensive system health
- **`GET /api/health/database`** - Database connectivity check
- **`GET /api/health/redis`** - Redis connectivity check

### Sample Health Response

```json
{
  "status": "healthy",
  "timestamp": "2026-03-29T12:00:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "environment": "development",
  "services": {
    "database": { "status": "healthy", "responseTime": 45 },
    "redis": { "status": "healthy", "responseTime": 12 }
  }
}
```

## Database Seeding

The project includes a comprehensive seed script with test data:

```bash
# Run seed script
pnpm run prisma:seed
```

**Seeded Users:**

- `admin@mailinator.com` - Admin role
- `vendor@mailinator.com` - Vendor role
- `customer@mailinator.com` - Customer role
- `super@mailinator.com` - Admin + Vendor roles

## Background Jobs

Email processing is handled asynchronously using BullMQ:

- **Email Queue** - Order confirmations, OTP codes
- **Worker Processes** - Reliable email delivery
- **Redis Backend** - Queue persistence

## Available Scripts

| Command                    | Description                              |
| -------------------------- | ---------------------------------------- |
| `pnpm run dev`             | Start development server with hot reload |
| `pnpm run build`           | Build for production                     |
| `pnpm run start`           | Start production server                  |
| `pnpm run typecheck`       | Run TypeScript type checking             |
| `pnpm run prisma:generate` | Generate Prisma client                   |
| `pnpm run prisma:migrate`  | Run database migrations                  |
| `pnpm run prisma:seed`     | Seed database with test data             |
| `pnpm run prisma:push`     | Push schema changes to database          |

## Authentication Flow

1. **Send OTP**: `POST /api/auth/send-otp` with email
2. **Verify OTP**: `POST /api/auth/verify-otp` with email + code
3. **Receive JWT**: Valid for 7 days
4. **Use Token**: Include in Authorization header: `Bearer <token>`

## Payment Integration

### Supported Gateways

- **eSewa** - Nepal's leading digital wallet
- **Khalti** - Popular mobile payment platform
- **COD** - Cash on Delivery with admin verification

### Payment Flow

1. Create order with payment method
2. For online payments: `POST /api/payments/initiate`
3. Redirect user to gateway
4. Handle callback: `POST /api/payments/callback`
5. Update order status

## Affiliate System

### How It Works

1. **Vendors** create affiliate links with discount/commission rates
2. **Customers** use affiliate codes during checkout
3. **System** applies discounts and tracks commissions
4. **Vendors** earn commissions on successful orders
5. **Admins** can view all affiliate activities

## Security Features

- **JWT Authentication** - Secure token-based auth
- **OTP Verification** - Email-based OTP system
- **Role-based Access** - Admin/Vendor/Customer permissions
- **Request Validation** - Zod schema validation
- **Error Handling** - No sensitive data leakage
- **Rate Limiting** - Built-in request throttling

## Logging & Monitoring

- **Structured Logging** - JSON formatted logs with Pino
- **Request Logging** - All API requests tracked
- **Error Logging** - Comprehensive error tracking
- **Health Metrics** - System health monitoring
- **Performance Tracking** - Response time monitoring

## Production Deployment

### Environment Variables

Ensure all production environment variables are set:

```env
NODE_ENV=production
DATABASE_URL=<production-db-url>
REDIS_URL=<production-redis-url>
JWT_SECRET=<strong-production-secret>
# ... other production configs
```

### Deployment Steps

```bash
# Install dependencies
pnpm install --prod

# Build application
pnpm run build

# Run database migrations
pnpm run prisma:deploy

# Start production server
pnpm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm run typecheck`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request
