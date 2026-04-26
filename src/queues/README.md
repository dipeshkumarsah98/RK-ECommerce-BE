# Queue System Documentation

## Overview

The queue system uses **BullMQ** with **Redis** for background job processing. It implements **Singleton** and **Factory** design patterns for centralized queue management.

## Architecture

### Queues

The system supports three main queues:

1. **AUTH** - Authentication & account-related emails (OTP, welcome, password reset)
2. **ORDERS** - Order-related notifications (confirmation, status updates, shipping)
3. **PERSONAL** - User-specific notifications (withdrawals, profile updates, security alerts)

### Design Patterns

- **Singleton Pattern**: `QueueManager` and `WorkerManager` ensure single instances
- **Factory Pattern**: `QueueFactory` creates queues with consistent configuration
- **Job Processor Pattern**: Workers monitor job names and dispatch to appropriate handlers

### File Structure

```
src/queues/
├── index.ts                    # Main entry point with helper functions
├── types.ts                    # Base types and interfaces
├── QueueManager.ts             # Singleton for queue management
├── WorkerManager.ts            # Singleton for worker management
├── QueueFactory.ts             # Factory for creating queues
├── jobs/
│   ├── auth.jobs.ts           # AUTH queue job types
│   ├── orders.jobs.ts         # ORDERS queue job types
│   └── personal.jobs.ts       # PERSONAL queue job types
└── processors/
    ├── auth.processor.ts      # AUTH job handlers
    ├── orders.processor.ts    # ORDERS job handlers
    └── personal.processor.ts  # PERSONAL job handlers
```

## Usage

### 1. Start Workers

In your main application entry point (`src/index.ts`):

```typescript
import { workerManager } from "./queues/index.js";

// Start all workers
workerManager.startAllWorkers();
```

### 2. Adding Jobs to Queues

#### Method 1: Using Helper Functions (Recommended)

```typescript
import {
  sendOTP,
  sendOrderConfirmation,
  sendWithdrawalRequested,
} from "./queues/index.js";

// AUTH queue - Send OTP
await sendOTP({
  to: "user@example.com",
  otp: "123456",
  purpose: "LOGIN",
});

// ORDERS queue - Order confirmation
await sendOrderConfirmation({
  to: "customer@example.com",
  orderId: "ord_123",
  finalAmount: 5000,
  paymentMethod: "ESEWA",
  items: [
    { title: "Product A", quantity: 2, price: 2500 },
  ],
});

// PERSONAL queue - Withdrawal request
await sendWithdrawalRequested({
  vendorName: "John Doe",
  vendorEmail: "vendor@example.com",
  amount: 10000,
  withdrawalId: "wdr_123",
});
```

#### Method 2: Using Queue Manager Directly

```typescript
import { queueManager, QueueName } from "./queues/index.js";

// Add any job to any queue
await queueManager.addJob(QueueName.AUTH, "send-otp", {
  type: "SEND_OTP",
  to: "user@example.com",
  otp: "123456",
  purpose: "LOGIN",
});
```

#### Method 3: Using Queue Instance

```typescript
import { queueManager } from "./queues/index.js";

const authQueue = queueManager.authQueue;
const ordersQueue = queueManager.ordersQueue;
const personalQueue = queueManager.personalQueue;

// Add jobs directly
await authQueue.add("send-welcome-email", {
  type: "SEND_WELCOME_EMAIL",
  to: "user@example.com",
  userName: "John Doe",
  role: "CUSTOMER",
});
```

## Available Job Types

### AUTH Queue

| Job Name | Job Type | Description |
|----------|----------|-------------|
| `send-otp` | `SEND_OTP` | Send OTP for login/registration/password reset |
| `send-welcome-email` | `SEND_WELCOME_EMAIL` | Send welcome email to new users |
| `send-password-reset` | `SEND_PASSWORD_RESET` | Send password reset email |
| `send-account-verification` | `SEND_ACCOUNT_VERIFICATION` | Send account verification email |

**Helper Functions:**
- `sendOTP(data)`
- `sendWelcomeEmail(data)`
- `sendPasswordReset(data)`
- `sendAccountVerification(data)`

### ORDERS Queue

| Job Name | Job Type | Description |
|----------|----------|-------------|
| `order-confirmation` | `ORDER_CONFIRMATION` | Send order confirmation to customer |
| `admin-new-order` | `ADMIN_NEW_ORDER` | Notify admin of new order |
| `order-status-update` | `ORDER_STATUS_UPDATE` | Send order status update |
| `order-cancelled` | `ORDER_CANCELLED` | Notify customer of order cancellation |
| `order-shipped` | `ORDER_SHIPPED` | Notify customer of order shipment |

**Helper Functions:**
- `sendOrderConfirmation(data)`
- `sendAdminNewOrder(data)`
- `sendOrderStatusUpdate(data)`
- `sendOrderCancelled(data)`
- `sendOrderShipped(data)`

### PERSONAL Queue

| Job Name | Job Type | Description |
|----------|----------|-------------|
| `withdrawal-requested` | `WITHDRAWAL_REQUESTED` | Notify admin of withdrawal request |
| `withdrawal-processed` | `WITHDRAWAL_PROCESSED` | Notify vendor of withdrawal decision |
| `profile-update-notification` | `PROFILE_UPDATE_NOTIFICATION` | Notify user of profile changes |
| `security-alert` | `SECURITY_ALERT` | Send security alert to user |

**Helper Functions:**
- `sendWithdrawalRequested(data)`
- `sendWithdrawalProcessed(data)`
- `sendProfileUpdateNotification(data)`
- `sendSecurityAlert(data)`

## Configuration

### Queue Configuration

Each queue has default configurations in `QueueFactory.ts`:

```typescript
{
  [QueueName.AUTH]: {
    workerConcurrency: 10,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
      removeOnComplete: { count: 50, age: 3600 },
      removeOnFail: { count: 100, age: 86400 },
    }
  },
  // ... other queues
}
```

### Environment Variables

Required environment variables:

```bash
# Redis
REDIS_URL=redis://:password@localhost:6379/0

# SMTP (for production email sending)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
SMTP_FROM=noreply@example.com

# Admin email for notifications
ADMIN_EMAIL=admin@example.com

# Environment
NODE_ENV=production  # In dev mode, emails are logged instead of sent
```

## Worker Management

### Basic Operations

```typescript
import { workerManager, QueueName } from "./queues/index.js";

// Start all workers
workerManager.startAllWorkers();

// Stop a specific worker
await workerManager.stopWorker(QueueName.AUTH);

// Stop all workers
await workerManager.stopAllWorkers();

// Pause/Resume workers
await workerManager.pauseWorker(QueueName.ORDERS);
await workerManager.resumeWorker(QueueName.ORDERS);

// Get worker statuses
const statuses = workerManager.getWorkerStatuses();
// { auth: true, orders: true, personal: true }
```

### Queue Stats

```typescript
import { queueManager, QueueName } from "./queues/index.js";

// Get queue statistics
const stats = await queueManager.getQueueStats(QueueName.AUTH);
// { waiting: 5, active: 2, completed: 100, failed: 3, delayed: 0 }
```

## Job Processing

### How It Works

1. Job is added to a queue with a specific **job name**
2. Worker monitors the queue and picks up jobs
3. Worker calls the appropriate processor based on queue name
4. Processor dispatches to handler based on **job name**
5. Handler processes the job (e.g., sends email)

### Job Flow Example

```
User Code → sendOTP() 
  ↓
QueueManager.addJob(AUTH, "send-otp", data)
  ↓
BullMQ Queue (AUTH)
  ↓
WorkerManager (AUTH Worker)
  ↓
processAuthJob() [processor]
  ↓
handleSendOTP() [handler based on job name]
  ↓
Send Email via Nodemailer
```

## Development vs Production

### Development Mode

- Emails are **NOT sent**, only logged
- Triggered when: `NODE_ENV !== "production"` OR `SMTP_HOST` is not set
- Email body is logged for preview

### Production Mode

- Emails are sent via SMTP
- Requires all SMTP environment variables
- Failed jobs are retried with exponential backoff

## Error Handling

### Job Retry Strategy

- Jobs automatically retry on failure
- Exponential/fixed backoff between retries
- Configurable retry attempts per queue
- Failed jobs are kept for debugging

### Silent Failures

Services use `.catch(() => {})` to prevent email failures from breaking core functionality:

```typescript
sendOrderConfirmation({...}).catch(() => {}); // Silent fail
```

## Adding New Job Types

### 1. Define Job Type

Add to `src/queues/jobs/[queue].jobs.ts`:

```typescript
export interface MyNewJobData extends BaseJobData {
  type: "MY_NEW_JOB";
  to: string;
  customField: string;
}

export enum MyQueueJobName {
  MY_NEW_JOB = "my-new-job",
}

export type MyQueueJobData = ExistingJobData | MyNewJobData;
```

### 2. Create Job Handler

Add to `src/queues/processors/[queue].processor.ts`:

```typescript
export async function processMyQueueJob(job: Job<MyQueueJobData>): Promise<void> {
  const { name, data } = job;

  switch (name) {
    case MyQueueJobName.MY_NEW_JOB:
      await handleMyNewJob(job);
      break;
    // ... other cases
  }
}

async function handleMyNewJob(job: Job<MyQueueJobData>): Promise<void> {
  if (job.data.type !== "MY_NEW_JOB") return;
  
  const { to, customField } = job.data;
  
  // Your email sending logic here
}
```

### 3. Add Helper Function

Add to `src/queues/index.ts`:

```typescript
export async function sendMyNewJob(
  data: Omit<MyNewJobData, "type">,
): Promise<Job<MyQueueJobData>> {
  return addMyQueueJob(MyQueueJobName.MY_NEW_JOB, {
    type: "MY_NEW_JOB",
    ...data,
  });
}
```

## Migration from Old System

### Before (Old System)

```typescript
import { enqueueOrderConfirmation } from "../queues/emailQueue.js";

await enqueueOrderConfirmation({
  to: "user@example.com",
  orderId: "ord_123",
  finalAmount: 5000,
  paymentMethod: "ESEWA",
  items: [...],
});
```

### After (New System)

```typescript
import { sendOrderConfirmation } from "../queues/index.js";

await sendOrderConfirmation({
  to: "user@example.com",
  orderId: "ord_123",
  finalAmount: 5000,
  paymentMethod: "ESEWA",
  items: [...],
});
```

**Changes:**
- `enqueueOrderConfirmation` → `sendOrderConfirmation`
- Import from `../queues/index.js` instead of `../queues/emailQueue.js`
- Start workers using `workerManager.startAllWorkers()` in `index.ts`

## Best Practices

1. **Use Helper Functions**: Always prefer helper functions over direct queue access
2. **Type Safety**: Let TypeScript guide you with proper types for job data
3. **Silent Failures**: Use `.catch(() => {})` for non-critical email jobs
4. **Job Names**: Use descriptive kebab-case job names
5. **Monitoring**: Check queue stats regularly in production
6. **Cleanup**: Configure appropriate retention policies for completed/failed jobs
7. **Graceful Shutdown**: Stop workers before closing the application

## Troubleshooting

### Jobs Not Processing

1. Check if workers are started: `workerManager.getWorkerStatuses()`
2. Verify Redis connection: `REDIS_URL` environment variable
3. Check worker logs for errors

### Emails Not Sending

1. Verify SMTP configuration in environment variables
2. Check if in development mode (emails are only logged)
3. Review failed job logs in Redis

### High Memory Usage

1. Adjust `removeOnComplete` and `removeOnFail` counts
2. Reduce worker concurrency
3. Implement job result cleanup

## Examples

### Complete Example - Order Creation

```typescript
import { sendOrderConfirmation, sendAdminNewOrder } from "./queues/index.js";

async function createOrder(orderData) {
  // ... create order logic ...
  
  const order = await prisma.order.create({...});
  
  // Send customer confirmation
  sendOrderConfirmation({
    to: order.user.email,
    orderId: order.id,
    finalAmount: order.totalAmount,
    paymentMethod: order.paymentMethod,
    items: order.items.map(i => ({
      title: i.product.title,
      quantity: i.quantity,
      price: i.unitPrice,
    })),
  }).catch(() => {}); // Silent fail
  
  // Send admin notification
  sendAdminNewOrder({
    orderId: order.id,
    finalAmount: order.totalAmount,
    paymentMethod: order.paymentMethod,
    customerEmail: order.user.email,
  }).catch(() => {});
  
  return order;
}
```

### Complete Example - User Registration

```typescript
import { sendWelcomeEmail, sendOTP } from "./queues/index.js";

async function registerUser(userData) {
  // Generate OTP
  const otp = generateOTP();
  
  // Send OTP
  await sendOTP({
    to: userData.email,
    otp,
    purpose: "REGISTRATION",
  });
  
  // After verification, send welcome email
  await sendWelcomeEmail({
    to: userData.email,
    userName: userData.name,
    role: "CUSTOMER",
  });
}
```

## Monitoring & Debugging

### View Queue Stats

```typescript
import { queueManager, QueueName } from "./queues/index.js";

async function checkQueueHealth() {
  const authStats = await queueManager.getQueueStats(QueueName.AUTH);
  const ordersStats = await queueManager.getQueueStats(QueueName.ORDERS);
  const personalStats = await queueManager.getQueueStats(QueueName.PERSONAL);
  
  console.log("Queue Health:", {
    auth: authStats,
    orders: ordersStats,
    personal: personalStats,
  });
}
```

### Graceful Shutdown

```typescript
import { workerManager, queueManager } from "./queues/index.js";

async function shutdown() {
  console.log("Shutting down gracefully...");
  
  // Stop all workers
  await workerManager.stopAllWorkers();
  
  // Close all queues
  await queueManager.closeAll();
  
  console.log("Shutdown complete");
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
```
