# Event System Documentation

## Overview

The event system uses **Node.js EventEmitter** to decouple business logic from side effects (emails, notifications, analytics, logging). Services emit events when significant actions occur, and event handlers respond by queueing jobs, sending notifications, or performing other async operations.

## Architecture

### Event Flow

```
Service Layer (Business Logic)
    ↓
Emit Event (appEvents.emit)
    ↓
Event Handler (Listener)
    ↓
Queue Job / Perform Side Effect
    ↓
Worker Processes Job
```

### Benefits

✅ **Decoupling** - Services don't know about queues or emails  
✅ **Flexibility** - Multiple handlers can listen to the same event  
✅ **Testability** - Easy to test business logic without side effects  
✅ **Maintainability** - Easy to add/remove side effects  
✅ **Type Safety** - Full TypeScript support with event-payload mapping  

## File Structure

```
src/events/
├── index.ts                    # Main exports
├── types.ts                    # Event types and payload interfaces
├── emitter.ts                  # EventEmitter singleton
├── register.ts                 # Event handler registration
└── handlers/
    ├── auth.events.ts         # AUTH event handlers
    ├── order.events.ts        # ORDER event handlers
    ├── withdrawal.events.ts   # WITHDRAWAL event handlers
    └── user.events.ts         # USER event handlers
```

## Available Events

### Order Events

| Event Name | When Emitted | Triggers |
|------------|--------------|----------|
| `ORDER_CREATED` | After order is successfully created | Customer confirmation email + Admin notification |
| `ORDER_STATUS_UPDATED` | When order status changes | Order status update email to customer |
| `ORDER_CANCELLED` | When order is cancelled | Cancellation email with refund info |
| `ORDER_SHIPPED` | When order ships | Shipping notification with tracking |
| `ORDER_DELIVERED` | When order is delivered | Delivery confirmation (placeholder) |

### Withdrawal Events

| Event Name | When Emitted | Triggers |
|------------|--------------|----------|
| `WITHDRAWAL_REQUESTED` | Vendor requests withdrawal | Admin notification email |
| `WITHDRAWAL_APPROVED` | Admin approves withdrawal | Vendor approval email with proof |
| `WITHDRAWAL_REJECTED` | Admin rejects withdrawal | Vendor rejection email with reason |

### Auth Events

| Event Name | When Emitted | Triggers |
|------------|--------------|----------|
| `OTP_REQUESTED` | User requests OTP | Send OTP email |
| `USER_REGISTERED` | New user registration | Welcome email |
| `PASSWORD_RESET_REQUESTED` | User requests password reset | Password reset email with token |
| `USER_LOGIN` | User logs in | Analytics/tracking (placeholder) |
| `PASSWORD_CHANGED` | User changes password | Security alert email |

### User/Profile Events

| Event Name | When Emitted | Triggers |
|------------|--------------|----------|
| `PROFILE_UPDATED` | User updates profile | Profile update notification |
| `EMAIL_CHANGED` | User changes email | Security alerts to old & new email |
| `SECURITY_ALERT` | Suspicious activity detected | Security alert email |

## Usage

### 1. Emitting Events (in Services)

```typescript
import { appEvents, AppEvent } from "../events/index.js";

// In order.service.ts
export async function createOrder(input: CreateOrderInput) {
  // ... business logic to create order ...
  
  const order = await prisma.order.create({...});
  
  // Emit event - handler will take care of emails
  appEvents.emit(AppEvent.ORDER_CREATED, {
    orderId: order.id,
    userId: order.userId,
    userEmail: order.user?.email,
    totalAmount: order.totalAmount,
    finalAmount: order.finalAmount,
    paymentMethod: order.paymentMethod,
    items: order.items.map(item => ({
      productId: item.productId,
      title: item.product.title,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
  });
  
  return order;
}
```

### 2. Listening to Events (in Event Handlers)

```typescript
import { appEvents } from "../emitter.js";
import { AppEvent } from "../types.js";
import { sendOrderConfirmation } from "../../queues/index.js";

export function registerOrderEventHandlers() {
  appEvents.on(AppEvent.ORDER_CREATED, async (payload) => {
    // Automatically queues order confirmation email
    if (payload.userEmail) {
      await sendOrderConfirmation({
        to: payload.userEmail,
        orderId: payload.orderId,
        finalAmount: payload.finalAmount,
        paymentMethod: payload.paymentMethod,
        items: payload.items,
      });
    }
    
    // Could also trigger analytics, webhooks, etc.
  });
}
```

### 3. Type-Safe Events

The event system is fully type-safe:

```typescript
// ✅ Correct - TypeScript validates payload
appEvents.emit(AppEvent.ORDER_CREATED, {
  orderId: "ord_123",
  userId: "user_456",
  userEmail: "customer@example.com",
  totalAmount: 5000,
  finalAmount: 4500,
  paymentMethod: "ESEWA",
  items: [...],
});

// ❌ Error - Missing required fields
appEvents.emit(AppEvent.ORDER_CREATED, {
  orderId: "ord_123",
  // TypeScript error: missing userId, totalAmount, etc.
});

// ❌ Error - Wrong payload type
appEvents.emit(AppEvent.ORDER_CREATED, {
  // TypeScript error: completely wrong structure
  foo: "bar",
});
```

## Event Payloads

### ORDER_CREATED

```typescript
{
  orderId: string;
  userId: string;
  userEmail?: string;
  totalAmount: number;
  finalAmount: number;
  paymentMethod: string;
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    unitPrice: number;
  }>;
}
```

### WITHDRAWAL_REQUESTED

```typescript
{
  withdrawalId: string;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  amount: number;
  remarks?: string;
}
```

### OTP_REQUESTED

```typescript
{
  email: string;
  otp: string;
  purpose: "LOGIN" | "REGISTRATION" | "PASSWORD_RESET";
}
```

### USER_REGISTERED

```typescript
{
  userId: string;
  email: string;
  name: string;
  role: string;
}
```

_See `src/events/types.ts` for complete payload definitions._

## Setup & Registration

### Application Startup

Event handlers must be registered during app startup (in `src/index.ts`):

```typescript
import { registerAllEventHandlers } from "./events/index.js";
import { workerManager } from "./queues/index.js";

// 1. Register event handlers FIRST
registerAllEventHandlers();

// 2. Then start workers
workerManager.startAllWorkers();

// 3. Then start HTTP server
app.listen(port);
```

**Important:** Event handlers must be registered **before** emitting any events, otherwise events will be lost.

## Adding New Events

### 1. Define Event Type

Add to `src/events/types.ts`:

```typescript
// Add event name to enum
export enum AppEvent {
  // ... existing events
  PRODUCT_OUT_OF_STOCK = "product:out_of_stock",
}

// Define payload interface
export interface ProductOutOfStockPayload extends BaseEventPayload {
  productId: string;
  productTitle: string;
  vendorId: string;
  vendorEmail: string;
}

// Add to event-payload map
export interface EventPayloadMap {
  // ... existing mappings
  [AppEvent.PRODUCT_OUT_OF_STOCK]: ProductOutOfStockPayload;
}
```

### 2. Create Event Handler

Add to `src/events/handlers/product.events.ts` (new file):

```typescript
import { appEvents } from "../emitter.js";
import { AppEvent } from "../types.js";
import { logger } from "../../lib/logger.js";

export function registerProductEventHandlers() {
  appEvents.on(AppEvent.PRODUCT_OUT_OF_STOCK, async (payload) => {
    logger.warn(
      { productId: payload.productId },
      "Product out of stock",
    );
    
    // Send notification to vendor
    // await sendOutOfStockAlert({...});
  });
  
  logger.info("PRODUCT event handlers registered");
}
```

### 3. Register Handler

Update `src/events/register.ts`:

```typescript
import { registerProductEventHandlers } from "./handlers/product.events.js";

export function registerAllEventHandlers(): void {
  // ... existing registrations
  registerProductEventHandlers();
}
```

### 4. Emit Event

In your service (`src/services/stock.service.ts`):

```typescript
import { appEvents, AppEvent } from "../events/index.js";

export async function updateStock(productId: string, quantity: number) {
  // ... update stock logic ...
  
  if (newStock === 0) {
    appEvents.emit(AppEvent.PRODUCT_OUT_OF_STOCK, {
      productId,
      productTitle: product.title,
      vendorId: product.vendorId,
      vendorEmail: product.vendor.email,
    });
  }
}
```

## Error Handling

Event handlers automatically catch and log errors without breaking the event chain:

```typescript
appEvents.on(AppEvent.ORDER_CREATED, async (payload) => {
  // If this throws, it's caught and logged
  throw new Error("Something went wrong");
  // Other handlers still execute
});
```

All handler errors are logged with:
- Event name
- Payload data
- Error message and stack trace

## Advanced Usage

### One-Time Listeners

```typescript
// Listen only once
appEvents.once(AppEvent.USER_REGISTERED, async (payload) => {
  console.log("First user registered!");
});
```

### Remove Listeners

```typescript
const handler = async (payload) => { /* ... */ };

appEvents.on(AppEvent.ORDER_CREATED, handler);

// Later...
appEvents.off(AppEvent.ORDER_CREATED, handler);
```

### Check Listener Count

```typescript
const count = appEvents.listenerCount(AppEvent.ORDER_CREATED);
console.log(`${count} handlers for ORDER_CREATED`);
```

### Get All Events

```typescript
const events = appEvents.eventNames();
console.log("Registered events:", events);
```

## Testing

### Unit Testing Services

Events make services easy to test without mocking email/queue systems:

```typescript
import { appEvents, AppEvent } from "../events/index.js";
import { createOrder } from "./order.service.js";

describe("createOrder", () => {
  it("should emit ORDER_CREATED event", async () => {
    const emitSpy = jest.spyOn(appEvents, "emit");
    
    await createOrder(mockOrderInput);
    
    expect(emitSpy).toHaveBeenCalledWith(
      AppEvent.ORDER_CREATED,
      expect.objectContaining({
        orderId: expect.any(String),
        userId: mockOrderInput.userId,
      }),
    );
  });
});
```

### Testing Event Handlers

```typescript
import { appEvents, AppEvent } from "../events/index.js";
import { sendOrderConfirmation } from "../../queues/index.js";

jest.mock("../../queues/index.js");

describe("Order event handlers", () => {
  it("should queue confirmation email on ORDER_CREATED", async () => {
    const mockPayload = {
      orderId: "ord_123",
      userId: "user_456",
      userEmail: "test@example.com",
      // ... other fields
    };
    
    await appEvents.emit(AppEvent.ORDER_CREATED, mockPayload);
    
    // Wait for async handlers
    await new Promise(resolve => setImmediate(resolve));
    
    expect(sendOrderConfirmation).toHaveBeenCalledWith({
      to: mockPayload.userEmail,
      orderId: mockPayload.orderId,
      // ...
    });
  });
});
```

## Best Practices

1. **Event Naming** - Use `resource:action` format (e.g., `order:created`, `user:login`)
2. **Payload Design** - Include all data needed by handlers to avoid DB lookups
3. **No Await** - Don't `await` event emissions in services (they're async already)
4. **Single Responsibility** - Each handler should do one thing
5. **Idempotency** - Handlers should be safe to retry
6. **Logging** - Log important events with context
7. **Error Recovery** - Handlers should not throw; use try-catch internally
8. **Registration Order** - Register handlers before starting the app

## Anti-Patterns

❌ **Don't** await event emissions:
```typescript
// ❌ Bad - blocks the service
await appEvents.emit(AppEvent.ORDER_CREATED, {...});

// ✅ Good - fire and forget
appEvents.emit(AppEvent.ORDER_CREATED, {...});
```

❌ **Don't** put business logic in handlers:
```typescript
// ❌ Bad - business logic in handler
appEvents.on(AppEvent.ORDER_CREATED, async (payload) => {
  await prisma.inventory.update({...}); // Business logic!
});

// ✅ Good - only side effects
appEvents.on(AppEvent.ORDER_CREATED, async (payload) => {
  await sendOrderConfirmation({...}); // Side effect
});
```

❌ **Don't** emit events from handlers (avoid cascading events):
```typescript
// ❌ Bad - can create loops
appEvents.on(AppEvent.ORDER_CREATED, async (payload) => {
  appEvents.emit(AppEvent.INVENTORY_UPDATED, {...});
});

// ✅ Good - services emit events
```

## Migration Guide

### Before (Old Approach)

```typescript
// order.service.ts
import { sendOrderConfirmation } from "../queues/index.js";

export async function createOrder(input) {
  const order = await prisma.order.create({...});
  
  // Tightly coupled to queue system
  await sendOrderConfirmation({
    to: order.user.email,
    orderId: order.id,
    // ...
  });
  
  return order;
}
```

### After (Event-Driven Approach)

```typescript
// order.service.ts
import { appEvents, AppEvent } from "../events/index.js";

export async function createOrder(input) {
  const order = await prisma.order.create({...});
  
  // Decoupled - just emit event
  appEvents.emit(AppEvent.ORDER_CREATED, {
    orderId: order.id,
    userId: order.userId,
    userEmail: order.user?.email,
    // ...
  });
  
  return order;
}
```

The handler (in `src/events/handlers/order.events.ts`) takes care of queueing emails.

## Debugging

### Enable Debug Logging

The event emitter logs all events at `debug` level. To see them:

```typescript
import { logger } from "./lib/logger.js";

// Set log level to debug
logger.level = "debug";
```

### View Registered Handlers

```typescript
import { appEvents } from "./events/index.js";

console.log("Event names:", appEvents.eventNames());
console.log("ORDER_CREATED handlers:", appEvents.listenerCount(AppEvent.ORDER_CREATED));
```

## Performance Considerations

- Events are **synchronous** by default but handlers are **async**
- Handlers run **in parallel** (multiple handlers for same event)
- Use events for **side effects**, not critical path operations
- Event payload is **cloned** (timestamp added), keep payloads small
- Default max listeners: **50** (configurable in `emitter.ts`)

## Common Use Cases

### Send Multiple Notifications

```typescript
appEvents.on(AppEvent.ORDER_CREATED, async (payload) => {
  // Customer email
  await sendOrderConfirmation({...});
  
  // Admin email
  await sendAdminNewOrder({...});
  
  // SMS notification
  await sendSMS({...});
  
  // Push notification
  await sendPushNotification({...});
});
```

### Analytics Tracking

```typescript
appEvents.on(AppEvent.USER_LOGIN, async (payload) => {
  await analytics.track({
    event: "User Login",
    userId: payload.userId,
    properties: {
      role: payload.role,
      ipAddress: payload.ipAddress,
    },
  });
});
```

### Webhooks

```typescript
appEvents.on(AppEvent.ORDER_CREATED, async (payload) => {
  await fetch("https://webhook.example.com/order-created", {
    method: "POST",
    body: JSON.stringify(payload),
  });
});
```

### Audit Logging

```typescript
appEvents.on(AppEvent.WITHDRAWAL_APPROVED, async (payload) => {
  await prisma.auditLog.create({
    data: {
      action: "WITHDRAWAL_APPROVED",
      performedBy: payload.approvedBy,
      resourceId: payload.withdrawalId,
      metadata: payload,
    },
  });
});
```

## Troubleshooting

### Events Not Firing

1. Check handlers are registered: `registerAllEventHandlers()` called before emissions
2. Check event name matches exactly (case-sensitive)
3. Check handler file is imported in `register.ts`

### Handlers Not Executing

1. Check for errors in handler code (check logs)
2. Verify queue workers are running
3. Check Redis connection

### Memory Leaks

1. Remove unused listeners: `appEvents.off()`
2. Check for event loops (handler emitting same event)
3. Monitor listener count: `appEvents.listenerCount()`

---

For more information, see:
- `src/events/types.ts` - All event types and payloads
- `src/events/handlers/` - Event handler implementations
- `src/queues/README.md` - Queue system documentation
