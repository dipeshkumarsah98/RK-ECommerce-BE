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
  },
  apis: [
    path.join(__dirname, "../routes/*.ts"),
    path.join(__dirname, "../routes/*.js"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
