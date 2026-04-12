# Vendor Commission History by Affiliate — Implementation Plan

**Created:** 2026-04-12  
**Feature:** Grouped commission history per affiliate code for vendor dashboard

## Summary

Add a new API endpoint `GET /api/vendors/commissions` that returns commission history **grouped by affiliate code**. Each row represents one affiliate link and includes: the affiliate code, linked product info, total commission earned through that code, total number of completed orders, and the date of the last delivered (COMPLETED) order. This powers a vendor dashboard table showing per-affiliate performance at a glance.

## Data Flow Analysis

### Relevant Schema Relationships

```
AffiliateLink (tbl_affiliate_links)
  ├── vendorId → User (the vendor who owns this code)
  ├── productId? → Product (optional linked product)
  ├── code (unique affiliate code)
  ├── commissionType + commissionValue
  ├── discountType + discountValue
  ├── orders → Order[] (all orders placed with this code)
  └── vendorEarnings → VendorEarning[] (commission records)

VendorEarning (tbl_vendor_earnings)
  ├── vendorId → User
  ├── orderId → Order
  ├── affiliateId → AffiliateLink
  ├── commission (Float — the earned amount)
  └── createdAt

Order (tbl_orders)
  ├── status (OrderStatus enum — COMPLETED = delivered)
  ├── affiliateId → AffiliateLink
  └── createdAt / updatedAt
```

### Query Strategy

The most efficient approach is to query `AffiliateLink` records for the vendor, then use Prisma's relational includes to pull aggregated data. Since Prisma `groupBy` cannot include relations, we'll use `findMany` on `AffiliateLink` with nested `_count` and relation includes, then compute aggregates in JS.

**Approach:** Query `AffiliateLink.findMany()` for the vendor's links, including:

- `product` (select: id, title, slug, images, price)
- `vendorEarnings` (select: commission) — to sum total commission
- `orders` with filter `status: COMPLETED` — to count completed orders and find the last delivery date
- `_count` on `orders` — for total order count (all statuses except AWAITING_VERIFICATION)

This avoids N+1 queries by loading everything in a single Prisma call, then mapping/reducing in JS (same pattern used by `getVendorOrderStats`).

## API Design

### Endpoint

```
GET /api/vendors/commissions
```

### Auth

- `authenticate` → `requireRoles("vendor")`

### Query Parameters (optional)

| Param       | Type              | Default           | Description                                                          |
| ----------- | ----------------- | ----------------- | -------------------------------------------------------------------- |
| `page`      | integer           | 1                 | Page number for pagination                                           |
| `limit`     | integer           | 20                | Items per page (max 100)                                             |
| `sortBy`    | string            | `totalCommission` | Sort field: `totalCommission`, `orderCount`, `lastOrderDate`, `code` |
| `sortOrder` | string            | `desc`            | `asc` or `desc`                                                      |
| `isActive`  | boolean           | —                 | Filter by active/inactive affiliate links                            |
| `startDate` | string (ISO date) | —                 | Filter earnings from this date (inclusive)                           |
| `endDate`   | string (ISO date) | —                 | Filter earnings up to this date (inclusive)                          |

### Response Shape

```json
{
  "items": [
    {
      "affiliateLinkId": "uuid",
      "code": "ABC12345",
      "isActive": true,
      "product": {
        "id": "uuid",
        "title": "Product Name",
        "slug": "product-name",
        "images": ["url1"],
        "price": 1500
      },
      "commissionType": "PERCENTAGE",
      "commissionValue": 10,
      "discountType": "FIXED",
      "discountValue": 100,
      "totalCommission": 45000.0,
      "totalOrders": 25,
      "completedOrders": 20,
      "lastCompletedOrderDate": "2026-04-10T12:00:00.000Z",
      "createdAt": "2026-01-15T08:30:00.000Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 20
}
```

**Field Notes:**

- `product` — `null` when affiliate link is not tied to a specific product (general-purpose code)
- `totalCommission` — sum of `VendorEarning.commission` for this affiliate link
- `totalOrders` — count of all orders (excluding `AWAITING_VERIFICATION`) placed with this code
- `completedOrders` — count of orders with `status = COMPLETED`
- `lastCompletedOrderDate` — `updatedAt` of the most recent COMPLETED order (represents delivery date), `null` if no completed orders

## Implementation Steps

### 1. Add Zod types in `src/types/vendor.type.ts`

Add these schemas/types to the existing vendor type file:

- `VendorCommissionQuerySchema` — Zod schema for query params (`page`, `limit`, `sortBy`, `sortOrder`, `isActive`, `startDate`, `endDate`)
- `VendorCommissionQuery` — inferred type
- `VendorCommissionTrendsQuerySchema` — Zod schema for trends query params (`period`, `startDate`, `endDate`, `affiliateCode`)
- `VendorCommissionTrendsQuery` — inferred type
- `VendorCommissionTrendItem` — interface for a single trend data point (period, totalCommission, orderCount, affiliateBreakdown)
- `VendorCommissionItem` — interface for each grouped row in the response (affiliateLinkId, code, product, totalCommission, totalOrders, completedOrders, lastCompletedOrderDate, commissionType, commissionValue, discountType, discountValue, isActive, createdAt)
- `VendorCommissionResponse` — `{ items: VendorCommissionItem[], total: number, page: number, limit: number }`

### 2. Add service function in `src/services/vendor.service.ts`

Add a new exported function `getVendorCommissionHistory(vendorId, query)`:

**Helper: `buildCommissionItems`**

- Takes raw Prisma affiliate link results with included relations
- Maps each affiliate link to a `VendorCommissionItem`:
  - Sum `vendorEarnings[].commission` → `totalCommission`
  - Filter `orders` where `status !== AWAITING_VERIFICATION` → `totalOrders` count
  - Filter `orders` where `status === COMPLETED` → `completedOrders` count
  - Find max `updatedAt` among COMPLETED orders → `lastCompletedOrderDate`
- Returns the mapped array

**Main function: `getVendorCommissionHistory`**

1. Query `prisma.affiliateLink.findMany()` with:
   - `where: { vendorId, ...(isActive filter if provided) }`
   - `include`:
     - `product: { select: { id, title, slug, images, price } }`
     - `vendorEarnings: { where: { vendorId, ...(date range filter on createdAt if startDate/endDate provided) }, select: { commission: true } }`
     - `orders: { where: { status: { not: AWAITING_VERIFICATION }, ...(date range filter on createdAt if startDate/endDate provided) }, select: { status: true, updatedAt: true } }`
2. Count total affiliate links with `prisma.affiliateLink.count()` (same `where`)
3. Map results through `buildCommissionItems` helper
4. Sort in JS by the requested `sortBy` field
5. Apply pagination (slice) — or use Prisma `skip`/`take` for DB-level pagination (see edge case notes below)
6. Return `{ items, total, page, limit }`

**Note on pagination approach:** Since sorting is done on computed fields (`totalCommission`, `orderCount`, `lastOrderDate`), Prisma cannot sort by these at the DB level. Two options:

- **Option A (Recommended for <1000 affiliate links per vendor):** Fetch all, compute, sort, then slice in JS. Simpler and correct.
- **Option B (If scale becomes an issue):** Use raw SQL with `GROUP BY` and `ORDER BY` on aggregated columns.

Option A is recommended — vendors rarely have >100 affiliate links, making in-memory sort perfectly fine. This matches the existing `getVendorOrderStats` pattern which also loads and processes in JS.

If `sortBy` is `code` or `createdAt` (non-computed fields), Prisma `orderBy` can be used directly with `skip`/`take`.

### 3. Add route in `src/routes/vendors.ts`

Add two routes to the existing vendors router:

#### `GET /commissions` (grouped commission table)

- Import `getVendorCommissionHistory` from `vendor.service.js`
- Define inline Zod schema for query validation (page, limit, sortBy, sortOrder, isActive, startDate, endDate)
- Add `@openapi` JSDoc for Swagger docs
- Middleware chain: `authenticate → requireRoles("vendor") → validate(schema, "query") → handler`
- Handler calls service, returns `res.json(result)`

#### `GET /commissions/trends` (time-series trends)

- Import `getVendorCommissionTrends` from `vendor.service.js`
- Define inline Zod schema for query validation (period, startDate, endDate, affiliateCode)
- Add `@openapi` JSDoc for Swagger docs
- Middleware chain: `authenticate → requireRoles("vendor") → validate(schema, "query") → handler`
- Handler calls service, returns `res.json(result)`

**Mount position:** Place `/commissions/trends` BEFORE `/commissions` to avoid Express treating `trends` as a dynamic param. Group both after `/orders/stats` block.

### 4. Add service function for trends in `src/services/vendor.service.ts`

Add a new exported function `getVendorCommissionTrends(vendorId, query)`:

**Query strategy:** Fetch all `VendorEarning` records for the vendor within the date range, include the `affiliate` code and order `createdAt`/`status`. Group by time period in JS.

**Helper: `groupEarningsByPeriod`**

- Takes an array of earning records and a period granularity (`monthly` | `weekly` | `daily`)
- Groups by period key using `Date` truncation:
  - `monthly` → `YYYY-MM` (e.g., `2026-04`)
  - `weekly` → ISO week `YYYY-WXX` (e.g., `2026-W15`)
  - `daily` → `YYYY-MM-DD`
- For each period, computes:
  - `totalCommission`: sum of commissions
  - `orderCount`: count of earnings (1 earning = 1 order)
  - `affiliateBreakdown`: array of `{ code, commission, orderCount }` grouped by affiliate code within that period
- Returns sorted by period ascending (chronological)

**Main function: `getVendorCommissionTrends`**

1. Build date range filter from `startDate` / `endDate` (default: last 12 months if no dates provided)
2. If `affiliateCode` provided, resolve to `affiliateId` and validate it belongs to the vendor
3. Query `prisma.vendorEarning.findMany()` with:
   - `where: { vendorId, createdAt: { gte: startDate, lte: endDate }, ...(affiliateId filter) }`
   - `include: { affiliate: { select: { code: true } } }`
4. Group through `groupEarningsByPeriod` helper
5. Return `{ period, startDate, endDate, trends: VendorCommissionTrendItem[] }`

### API Design for Trends Endpoint

```
GET /api/vendors/commissions/trends
```

#### Query Parameters

| Param           | Type   | Default       | Description                                 |
| --------------- | ------ | ------------- | ------------------------------------------- |
| `period`        | string | `monthly`     | Granularity: `monthly`, `weekly`, `daily`   |
| `startDate`     | string | 12 months ago | ISO date string, start of range (inclusive) |
| `endDate`       | string | today         | ISO date string, end of range (inclusive)   |
| `affiliateCode` | string | —             | Filter to a specific affiliate code         |

#### Response Shape

```json
{
  "period": "monthly",
  "startDate": "2025-04-12",
  "endDate": "2026-04-12",
  "trends": [
    {
      "periodKey": "2026-01",
      "totalCommission": 12500.0,
      "orderCount": 8,
      "affiliateBreakdown": [
        { "code": "ABC123", "commission": 7500.0, "orderCount": 5 },
        { "code": "XYZ789", "commission": 5000.0, "orderCount": 3 }
      ]
    },
    {
      "periodKey": "2026-02",
      "totalCommission": 18000.0,
      "orderCount": 12,
      "affiliateBreakdown": [
        { "code": "ABC123", "commission": 10000.0, "orderCount": 7 },
        { "code": "XYZ789", "commission": 8000.0, "orderCount": 5 }
      ]
    }
  ]
}
```

**Notes:**

- `affiliateBreakdown` within each period lets the frontend render stacked bar charts or per-affiliate line charts
- When `affiliateCode` filter is applied, `affiliateBreakdown` will contain only that single code
- Empty periods (months with zero commission) are **not** included — the frontend should fill gaps for chart rendering

### 5. No schema changes needed

All required data already exists in the database:

- `AffiliateLink` has `vendorId`, `code`, `productId`, commission/discount config
- `VendorEarning` has `commission` amounts per affiliate link, `createdAt` for time-series
- `Order` has `status` and `updatedAt` for determining delivery date

## Edge Cases to Handle

1. **Vendor with no affiliate links** — Return `{ items: [], total: 0, page: 1, limit: 20 }` (same pattern as `getVendorOrderStats`)

2. **Affiliate link with no orders** — Return the affiliate link row with `totalCommission: 0`, `totalOrders: 0`, `completedOrders: 0`, `lastCompletedOrderDate: null`

3. **Affiliate link with no product** (`productId` is nullable) — `product` field should be `null` in the response

4. **Affiliate link with orders but no earnings** — Possible if orders exist but none reached COMPLETED status (earnings are created on completion). `totalCommission` should be `0`

5. **Deactivated affiliate links** (`isActive: false`) — Should be included by default unless `isActive` query filter is explicitly set. Vendors need to see historical performance of deactivated codes

6. **Sort stability** — When `totalCommission` values are equal, add a secondary sort by `createdAt` descending

7. **Floating point precision** — Commission sums may have floating point issues. Consider rounding to 2 decimal places (NPR currency)

8. **Large number of orders per affiliate** — The query loads all order statuses/dates into memory. For affiliates with thousands of orders, this could be heavy. Mitigation: only `select` the `status` and `updatedAt` fields (no full order data). If scale becomes an issue later, switch to raw SQL aggregation

9. **`lastCompletedOrderDate` semantic** — Use `updatedAt` (not `createdAt`) since `updatedAt` reflects when the order transitioned to COMPLETED status. `createdAt` is when the order was placed

10. **Date range with no earnings** — When `startDate`/`endDate` filter is applied and there are no earnings in that range, commission fields should be `0` (not omitted). Affiliate links should still appear with zeroed-out stats

11. **Trends with no data** — Return empty `trends: []` array. Frontend handles empty state

12. **Trends default date range** — Default to last 12 months to avoid loading entire history. Frontend should provide explicit date range for custom views

13. **Trends affiliate code validation** — If `affiliateCode` is provided but doesn't belong to the vendor, throw `ForbiddenError` (same pattern as `getVendorOrders`)

## Resolved Decisions

1. **Cancelled orders in `totalOrders`** — ✅ Include cancelled orders in `totalOrders` for transparency, but exclude from `completedOrders`. Only `AWAITING_VERIFICATION` is excluded from `totalOrders`.

2. **Date range filter** — ✅ Added `startDate`/`endDate` query params to `GET /vendors/commissions`. Filters both `vendorEarnings.createdAt` and `orders.createdAt` to scope the computed fields to the requested period. Affiliate links themselves are not filtered by date (they always appear), only their aggregated stats are scoped.

3. **Time-period trends** — ✅ New endpoint `GET /vendors/commissions/trends` added. Returns commission data grouped by `monthly`/`weekly`/`daily` period with per-affiliate breakdown. See Implementation Step 4 above.

## Remaining Open Questions

1. **Should empty periods be filled in the trends response?** — Current plan omits periods with zero data, letting the frontend fill gaps. Alternative: server fills all periods in the range with `{ totalCommission: 0, orderCount: 0 }`. Server-side fill is more convenient for charts but adds response size. _Recommendation: omit empty periods, frontend fills._
