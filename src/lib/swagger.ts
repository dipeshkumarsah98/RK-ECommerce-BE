import swaggerJsdoc from "swagger-jsdoc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Affiliate E-Commerce API",
      version: "1.0.0",
      description:
        "Backend API for an affiliate-based e-commerce platform with inventory tracking, COD verification, and Nepal-based payment integration (eSewa/Khalti).",
      contact: { name: "API Support" },
    },
    servers: [{ url: "/api", description: "API base path" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token obtained from POST /auth/verify-otp",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
          required: ["error"],
        },
        ValidationError: {
          type: "object",
          properties: {
            error: { type: "string", example: "Validation failed" },
            details: {
              type: "object",
              properties: {
                formErrors: { type: "array", items: { type: "string" } },
                fieldErrors: { type: "object" },
              },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            email: { type: "string", format: "email" },
            phone: { type: "string", nullable: true },
            address: { type: "string", nullable: true },
            roles: { type: "array", items: { type: "string" } },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            slug: { type: "string" },
            title: { type: "string" },
            description: { type: "string", nullable: true },
            price: { type: "number" },
            totalStock: { type: "integer" },
            status: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        StockMovement: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            productId: { type: "string", format: "uuid" },
            type: { type: "string", enum: ["IN", "OUT"] },
            quantity: { type: "integer" },
            reason: {
              type: "string",
              enum: [
                "RESTOCK",
                "ORDER_PLACED",
                "ORDER_CANCELLED",
                "RETURN",
                "CORRECTION",
              ],
            },
            orderId: { type: "string", format: "uuid", nullable: true },
            userId: { type: "string", format: "uuid", nullable: true },
            notes: { type: "string", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid", nullable: true },
            affiliateId: { type: "string", format: "uuid", nullable: true },
            totalAmount: { type: "number" },
            discountAmount: { type: "number" },
            finalAmount: { type: "number" },
            paymentMethod: { type: "string", enum: ["ESEWA", "KHALTI", "COD"] },
            status: {
              type: "string",
              enum: [
                "PENDING",
                "AWAITING_VERIFICATION",
                "VERIFIED",
                "PROCESSING",
                "SHIPPED",
                "COMPLETED",
                "CANCELLED",
              ],
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            productId: { type: "string", format: "uuid" },
            quantity: { type: "integer", minimum: 1 },
          },
          required: ["productId", "quantity"],
        },
        Payment: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            orderId: { type: "string", format: "uuid" },
            provider: { type: "string" },
            amount: { type: "number" },
            transactionId: { type: "string", nullable: true },
            status: { type: "string", enum: ["PENDING", "SUCCESS", "FAILED"] },
            paidAt: { type: "string", format: "date-time", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        AffiliateLink: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            code: { type: "string" },
            vendorId: { type: "string", format: "uuid" },
            productId: { type: "string", format: "uuid", nullable: true },
            discountType: { type: "string", enum: ["PERCENTAGE", "FIXED"] },
            discountValue: { type: "number" },
            commissionType: { type: "string", enum: ["PERCENTAGE", "FIXED"] },
            commissionValue: { type: "number" },
            isActive: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        VendorEarning: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            vendorId: { type: "string", format: "uuid" },
            orderId: { type: "string", format: "uuid" },
            affiliateId: { type: "string", format: "uuid" },
            commission: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        CODVerification: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            orderId: { type: "string", format: "uuid" },
            verifiedBy: { type: "string", format: "uuid" },
            verificationStatus: {
              type: "string",
              enum: ["PENDING", "CONFIRMED", "REJECTED"],
            },
            customerResponse: { type: "string" },
            remarks: { type: "string", nullable: true },
            verifiedAt: { type: "string", format: "date-time", nullable: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        HealthStatus: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["healthy", "unhealthy", "degraded"],
              example: "healthy",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2026-03-29T12:00:00.000Z",
            },
            uptime: {
              type: "number",
              example: 3600,
              description: "Server uptime in seconds",
            },
            version: {
              type: "string",
              example: "1.0.0",
            },
            environment: {
              type: "string",
              example: "development",
            },
            services: {
              type: "object",
              properties: {
                database: { $ref: "#/components/schemas/ServiceStatus" },
                redis: { $ref: "#/components/schemas/ServiceStatus" },
              },
            },
          },
        },
        ServiceStatus: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["healthy", "unhealthy"],
              example: "healthy",
            },
            responseTime: {
              type: "number",
              example: 45,
              description: "Response time in milliseconds",
            },
            error: {
              type: "string",
              description: "Error message if service is unhealthy",
            },
          },
        },
        BasicHealthStatus: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "healthy",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2026-03-29T12:00:00.000Z",
            },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            total: { type: "integer" },
            page: { type: "integer" },
            limit: { type: "integer" },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "OTP-based authentication" },
      { name: "Users", description: "User profile management" },
      { name: "Products", description: "Product catalogue" },
      { name: "Stock", description: "Ledger-based inventory movements" },
      { name: "Orders", description: "Order lifecycle management" },
      { name: "Payments", description: "eSewa/Khalti payment integration" },
      {
        name: "COD Verification",
        description: "Cash on Delivery verification by admin",
      },
      {
        name: "Affiliates",
        description: "Affiliate link management for vendors",
      },
      { name: "Earnings", description: "Vendor commission earnings" },
      { name: "Admin", description: "Admin-only views" },
      { name: "Health", description: "API health monitoring and diagnostics" },
    ],
    paths: {
      "/healthz": {
        get: {
          tags: ["Health"],
          summary: "Basic health check",
          operationId: "basicHealthCheck",
          description:
            "Returns basic health status of the API for load balancers and monitoring systems",
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BasicHealthStatus" },
                },
              },
            },
            "503": {
              description: "Service is unhealthy",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BasicHealthStatus" },
                },
              },
            },
          },
        },
      },
      "/health": {
        get: {
          tags: ["Health"],
          summary: "Comprehensive health check",
          operationId: "comprehensiveHealthCheck",
          description:
            "Returns detailed health status including database and Redis connectivity with response times",
          responses: {
            "200": {
              description: "All services are healthy",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/HealthStatus" },
                },
              },
            },
            "503": {
              description: "One or more services are unhealthy",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/HealthStatus" },
                },
              },
            },
          },
        },
      },
      "/health/database": {
        get: {
          tags: ["Health"],
          summary: "Database health check",
          operationId: "databaseHealthCheck",
          description:
            "Check PostgreSQL database connectivity and response time",
          responses: {
            "200": {
              description: "Database is healthy",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ServiceStatus" },
                      {
                        type: "object",
                        properties: {
                          service: { type: "string", example: "database" },
                          timestamp: { type: "string", format: "date-time" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "503": {
              description: "Database is unhealthy",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ServiceStatus" },
                      {
                        type: "object",
                        properties: {
                          service: { type: "string", example: "database" },
                          timestamp: { type: "string", format: "date-time" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/health/redis": {
        get: {
          tags: ["Health"],
          summary: "Redis health check",
          operationId: "redisHealthCheck",
          description: "Check Redis connectivity and response time",
          responses: {
            "200": {
              description: "Redis is healthy",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ServiceStatus" },
                      {
                        type: "object",
                        properties: {
                          service: { type: "string", example: "redis" },
                          timestamp: { type: "string", format: "date-time" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "503": {
              description: "Redis is unhealthy",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/ServiceStatus" },
                      {
                        type: "object",
                        properties: {
                          service: { type: "string", example: "redis" },
                          timestamp: { type: "string", format: "date-time" },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/auth/send-otp": {
        post: {
          tags: ["Auth"],
          summary: "Send OTP to email",
          operationId: "sendOtp",
          description:
            "Sends a 6-digit OTP to the provided email. OTP expires in 10 minutes.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: { email: { type: "string", format: "email" } },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "OTP sent",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { message: { type: "string" } },
                  },
                },
              },
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ValidationError" },
                },
              },
            },
          },
        },
      },
      "/auth/verify-otp": {
        post: {
          tags: ["Auth"],
          summary: "Verify OTP and receive JWT",
          operationId: "verifyOtp",
          description:
            "Verifies the OTP. Creates a new user account if the email is new. Returns a JWT valid for 7 days.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "code"],
                  properties: {
                    email: { type: "string", format: "email" },
                    code: { type: "string", minLength: 6, maxLength: 6 },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Authenticated",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: { type: "string" },
                      user: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid OTP",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/users/me": {
        get: {
          tags: ["Users"],
          summary: "Get own profile",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Current user",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            "401": { description: "Unauthenticated" },
          },
        },
        patch: {
          tags: ["Users"],
          summary: "Update own profile",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    phone: { type: "string" },
                    address: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Updated user",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            "401": { description: "Unauthenticated" },
          },
        },
      },
      "/users/{id}": {
        get: {
          tags: ["Users"],
          summary: "Get any user by ID (admin only)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          responses: {
            "200": {
              description: "User",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            "403": { description: "Forbidden" },
            "404": { description: "Not found" },
          },
        },
      },
      "/products": {
        get: {
          tags: ["Products"],
          summary: "List all products",
          parameters: [
            {
              in: "query",
              name: "page",
              schema: { type: "integer", default: 1 },
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 20 },
            },
          ],
          responses: {
            "200": {
              description: "Paginated products",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/Pagination" },
                      {
                        type: "object",
                        properties: {
                          items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Product" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Products"],
          summary: "Create a product (admin only)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["slug", "title", "price", "status"],
                  properties: {
                    slug: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" },
                    status: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            "409": {
              description: "Slug conflict",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/products/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get a product by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          responses: {
            "200": {
              description: "Product",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            "404": { description: "Not found" },
          },
        },
        patch: {
          tags: ["Products"],
          summary: "Update a product (admin only)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    slug: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" },
                    status: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            "404": { description: "Not found" },
          },
        },
      },
      "/stock-movements": {
        post: {
          tags: ["Stock"],
          summary: "Create a manual stock movement (admin only)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["productId", "type", "quantity", "reason"],
                  properties: {
                    productId: { type: "string", format: "uuid" },
                    type: { type: "string", enum: ["IN", "OUT"] },
                    quantity: { type: "integer", minimum: 1 },
                    reason: {
                      type: "string",
                      enum: [
                        "RESTOCK",
                        "ORDER_PLACED",
                        "ORDER_CANCELLED",
                        "RETURN",
                        "CORRECTION",
                      ],
                    },
                    notes: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Movement recorded",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/StockMovement" },
                },
              },
            },
            "400": {
              description: "Insufficient stock",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
        get: {
          tags: ["Stock"],
          summary: "List stock movements (admin only)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "query",
              name: "product_id",
              schema: { type: "string", format: "uuid" },
            },
          ],
          responses: {
            "200": {
              description: "Movements",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/StockMovement" },
                  },
                },
              },
            },
          },
        },
      },
      "/orders": {
        post: {
          tags: ["Orders"],
          summary: "Place an order",
          description:
            "Creates an order atomically. COD orders start in AWAITING_VERIFICATION. Confirmation email queued on success.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["paymentMethod", "items"],
                  properties: {
                    paymentMethod: {
                      type: "string",
                      enum: ["ESEWA", "KHALTI", "COD"],
                    },
                    affiliateCode: { type: "string" },
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/OrderItem" },
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Order created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            "400": {
              description: "Insufficient stock or invalid input",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
        get: {
          tags: ["Orders"],
          summary: "List orders (own for customer, all for admin)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "query",
              name: "page",
              schema: { type: "integer", default: 1 },
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 20 },
            },
            {
              in: "query",
              name: "status",
              schema: {
                type: "string",
                enum: [
                  "PENDING",
                  "AWAITING_VERIFICATION",
                  "VERIFIED",
                  "PROCESSING",
                  "SHIPPED",
                  "COMPLETED",
                  "CANCELLED",
                ],
              },
            },
            {
              in: "query",
              name: "user_id",
              schema: { type: "string", format: "uuid" },
              description: "Admin only",
            },
          ],
          responses: {
            "200": {
              description: "Orders",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/Pagination" },
                      {
                        type: "object",
                        properties: {
                          items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Order" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
      "/orders/{id}": {
        get: {
          tags: ["Orders"],
          summary: "Get a single order",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          responses: {
            "200": {
              description: "Order",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            "403": { description: "Forbidden" },
            "404": { description: "Not found" },
          },
        },
      },
      "/orders/{id}/status": {
        patch: {
          tags: ["Orders"],
          summary: "Update order status (admin only)",
          description:
            "Cancelling restores stock. Completing triggers affiliate earnings.",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string", format: "uuid" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: {
                    status: {
                      type: "string",
                      enum: [
                        "PENDING",
                        "AWAITING_VERIFICATION",
                        "VERIFIED",
                        "PROCESSING",
                        "SHIPPED",
                        "COMPLETED",
                        "CANCELLED",
                      ],
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Updated order",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            "400": { description: "Error" },
          },
        },
      },
      "/payments/initiate": {
        post: {
          tags: ["Payments"],
          summary: "Initiate online payment",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["orderId", "provider", "returnUrl"],
                  properties: {
                    orderId: { type: "string", format: "uuid" },
                    provider: { type: "string", enum: ["ESEWA", "KHALTI"] },
                    returnUrl: { type: "string", format: "uri" },
                    failureUrl: { type: "string", format: "uri" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Payment URL",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      paymentUrl: { type: "string" },
                      orderId: { type: "string" },
                      amount: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/payments/callback": {
        post: {
          tags: ["Payments"],
          summary: "Handle payment gateway webhook (idempotent)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["provider", "orderId", "transactionId", "status"],
                  properties: {
                    provider: { type: "string", enum: ["ESEWA", "KHALTI"] },
                    orderId: { type: "string" },
                    transactionId: { type: "string" },
                    status: { type: "string", enum: ["SUCCESS", "FAILED"] },
                    amount: { type: "number" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Processed" },
          },
        },
      },
      "/cod-verifications": {
        post: {
          tags: ["COD Verification"],
          summary: "Verify a COD order (admin only)",
          description:
            "CONFIRMED → PROCESSING + earnings. REJECTED → CANCELLED + stock restored.",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "orderId",
                    "verificationStatus",
                    "customerResponse",
                  ],
                  properties: {
                    orderId: { type: "string", format: "uuid" },
                    verificationStatus: {
                      type: "string",
                      enum: ["PENDING", "CONFIRMED", "REJECTED"],
                    },
                    customerResponse: {
                      type: "string",
                      enum: ["intentional", "not_intentional"],
                    },
                    remarks: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Verification recorded",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/CODVerification" },
                },
              },
            },
          },
        },
      },
      "/affiliates": {
        post: {
          tags: ["Affiliates"],
          summary: "Create an affiliate link (vendor/admin)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "discountType",
                    "discountValue",
                    "commissionType",
                    "commissionValue",
                  ],
                  properties: {
                    productId: { type: "string", format: "uuid" },
                    discountType: {
                      type: "string",
                      enum: ["PERCENTAGE", "FIXED"],
                    },
                    discountValue: { type: "number" },
                    commissionType: {
                      type: "string",
                      enum: ["PERCENTAGE", "FIXED"],
                    },
                    commissionValue: { type: "number" },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AffiliateLink" },
                },
              },
            },
          },
        },
        get: {
          tags: ["Affiliates"],
          summary: "List own affiliate links (vendor/admin)",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Links",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/AffiliateLink" },
                  },
                },
              },
            },
          },
        },
      },
      "/affiliates/{code}": {
        get: {
          tags: ["Affiliates"],
          summary: "Look up affiliate link by code (public)",
          parameters: [
            {
              in: "path",
              name: "code",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Link",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AffiliateLink" },
                },
              },
            },
            "404": { description: "Not found" },
          },
        },
      },
      "/earnings": {
        get: {
          tags: ["Earnings"],
          summary: "Get vendor earnings (vendor/admin)",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Earnings",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      totalCommission: { type: "number" },
                      earnings: {
                        type: "array",
                        items: { $ref: "#/components/schemas/VendorEarning" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/admin/orders": {
        get: {
          tags: ["Admin"],
          summary: "List all orders with filters (admin only)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "query",
              name: "page",
              schema: { type: "integer", default: 1 },
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 20 },
            },
            { in: "query", name: "status", schema: { type: "string" } },
            {
              in: "query",
              name: "user_id",
              schema: { type: "string", format: "uuid" },
            },
          ],
          responses: {
            "200": { description: "Orders" },
          },
        },
      },
      "/admin/products": {
        get: {
          tags: ["Admin"],
          summary: "List all products (admin only)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "query",
              name: "page",
              schema: { type: "integer", default: 1 },
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 20 },
            },
          ],
          responses: {
            "200": { description: "Products" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
