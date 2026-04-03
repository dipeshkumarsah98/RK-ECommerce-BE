# Frontend: Create Order Page Requirements

## Overview

Build a flexible order creation interface that supports:

- **Guest checkout** (public-facing store)
- **Customer orders** (authenticated customers)
- **Admin order creation** (admin dashboard - create orders on behalf of customers)

The backend automatically handles user lookup/creation by email, so the frontend can focus on collecting the right information based on context.

---

## Backend API Contract

**Endpoint**: `POST /api/orders`

**Request Body**:

```typescript
{
  // Customer Information (always required)
  customerEmail: string;          // Required - used to find/create user
  customerName: string;            // Required
  customerPhone?: string;          // Optional

  // Admin Override (dashboard only)
  userId?: string;                 // Optional - admin can specify exact user

  // Shipping Address (required - pick ONE approach)
  shippingAddressId?: string;      // Option 1: Use existing address
  shippingAddress?: {              // Option 2: Create new address
    street_address?: string;
    city: string;                  // Required
    state?: string;
    postal_code?: string;
  };

  // Billing Address (optional)
  billingAddressId?: string;       // Use existing address
  billingAddress?: {               // Create new address
    street_address?: string;
    city: string;
    state?: string;
    postal_code?: string;
  };
  // Note: If billing not provided, defaults to shipping

  // Order Details
  paymentMethod: "ESEWA" | "KHALTI" | "COD";  // Required
  items: [                                     // Required, min 1
    {
      productId: string;
      quantity: number;             // Positive integer
    }
  ];
  affiliateCode?: string;           // Optional - for discounts
  notes?: string;                   // Optional - delivery instructions
}
```

**Response**: Order object with items, payment, user info, and addresses

**Validation Errors**:

- Returns 400 for validation errors (e.g., missing required fields, invalid email)
- Returns 400 for insufficient stock with specific product name and available quantity
- Returns 400 for invalid/inactive affiliate code

---

## Use Cases to Support

### 1. Guest Checkout (Public Store)

**Scenario**: Anonymous user wants to purchase products

**UI Flow**:

```
1. Shopping Cart → Proceed to Checkout
2. Collect customer info:
   - Email (will auto-find existing user or create new)
   - Name
   - Phone (optional)
3. Shipping address form:
   - If email matches existing user → offer saved addresses + "Add new address"
   - If new user → just show address form
4. Billing address:
   - Checkbox: "Same as shipping" (default checked)
   - If unchecked → show billing address form
5. Select payment method (ESEWA/KHALTI/COD)
6. Optional: Affiliate code input
7. Optional: Delivery notes
8. Review order summary
9. Place Order
```

**Key Points**:

- No authentication required
- Backend handles user creation automatically
- If email exists, user info gets updated (name, phone)
- Load saved addresses via `GET /api/users/by-email?email={email}` (if such endpoint exists) or handle in order response

---

### 2. Authenticated Customer Order (Public Store)

**Scenario**: Logged-in customer wants to purchase

**UI Flow**:

```
1. Shopping Cart → Proceed to Checkout
2. Auto-fill customer info from auth context:
   - Email (pre-filled, read-only)
   - Name (pre-filled, editable)
   - Phone (pre-filled, editable)
3. Shipping address:
   - Dropdown: Select from saved addresses
   - Option: "Add new address"
4. Billing address:
   - Checkbox: "Same as shipping"
   - Dropdown: Select from saved addresses or add new
5. Payment method selection
6. Optional: Affiliate code
7. Optional: Delivery notes
8. Review order summary
9. Place Order
```

**Key Points**:

- Customer info pre-filled from session
- Show saved addresses from user profile
- Allow adding new addresses (saved for future use)
- Consider "Set as default address" checkbox for new addresses

---

### 3. Admin Creates Order on Behalf of Customer (Dashboard)

**Scenario**: Admin/vendor creates order for phone/WhatsApp customers

**UI Flow**:

```
1. Dashboard → Orders → Create Order
2. Customer Selection:
   - Search by email/phone/name
   - If found → auto-fill info, load addresses
   - If not found → manual entry (will create new user)
   - Display: Name, Email, Phone (all editable)
3. Product Selection:
   - Search/select products
   - Set quantity for each
   - Show real-time stock availability
   - Display price, subtotal
4. Shipping Address:
   - If existing customer → dropdown of saved addresses
   - "Add new address" button
   - Manual address entry form
5. Billing Address:
   - Same as shipping checkbox
   - Select from saved or add new
6. Payment Method: ESEWA/KHALTI/COD
7. Affiliate Code: Optional input
8. Order Notes: Text area for internal notes
9. Order Summary:
   - List items with quantities
   - Show subtotal, discount (if affiliate), tax, shipping, total
10. "Create Order" button
```

**Key Points**:

- Admin can search existing customers or create new ones
- Show customer's order history in sidebar (if found)
- Display stock warnings before submission
- Support creating orders for walk-in customers (immediate order creation)
- Consider "Send confirmation email" checkbox

---

## UI Components to Build

### 1. Customer Info Section

```typescript
interface CustomerInfoProps {
  mode: "guest" | "authenticated" | "admin";
  onEmailChange?: (email: string) => void; // For user lookup
}
```

- Email input (with fuzzy search for admin)
- Name input
- Phone input
- For admin: "Search existing customer" feature

### 2. Address Selector/Form Component

```typescript
interface AddressFormProps {
  type: "shipping" | "billing";
  userId?: string; // For loading saved addresses
  existingAddresses?: Address[]; // List of saved addresses
  onSelect?: (addressId: string) => void;
  onCreateNew?: (address: AddressInput) => void;
  allowSaveAddress?: boolean; // Show "Save for future" checkbox
}
```

- Dropdown (if addresses exist)
- Form fields (street, city, state, postal code)
- "Same as shipping" option for billing
- Validation (city is required)

### 3. Product Item Selector (Admin)

```typescript
interface ProductSelectorProps {
  onAddItem: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
}
```

- Search/autocomplete for products
- Quantity input with stock validation
- Remove item button
- Price calculation per item

### 4. Order Summary Component

```typescript
interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount?: number; // From affiliate code
  tax: number;
  shipping: number;
  total: number;
}
```

- Line items with product name, quantity, price
- Applied discount (if affiliate code valid)
- Tax breakdown
- Shipping cost
- Grand total

### 5. Payment Method Selector

```typescript
interface PaymentMethodProps {
  selected: "ESEWA" | "KHALTI" | "COD";
  onChange: (method: string) => void;
}
```

- Radio buttons or cards for each payment option
- Icons for payment providers
- Show COD fee if applicable

---

## State Management Requirements

### Form State Schema

```typescript
interface OrderFormState {
  // Customer
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  userId?: string; // Admin override

  // Addresses
  shippingAddressId?: string;
  shippingAddress?: AddressInput;
  billingAddressId?: string;
  billingAddress?: AddressInput;
  sameAsBilling: boolean; // UI toggle

  // Order details
  items: Array<{
    productId: string;
    quantity: number;
    // Local only (for display):
    product?: Product;
    price?: number;
  }>;
  paymentMethod: "ESEWA" | "KHALTI" | "COD";
  affiliateCode?: string;
  notes?: string;

  // UI state
  isLoadingUser: boolean;
  savedAddresses: Address[];
  validationErrors: Record<string, string>;
}
```

### Key Actions

- `setCustomerEmail(email)` → trigger user lookup
- `loadSavedAddresses(userId)` → fetch addresses
- `selectAddress(type, addressId)` → set shipping/billing
- `createNewAddress(type, address)` → add to form
- `addCartItem(productId, quantity)` → add to items array
- `validateAffiliateCode(code)` → call API, show discount
- `submitOrder()` → POST to /api/orders

---

## UX Considerations

### Real-time Feedback

- **Email validation**: Show green checkmark if user found, "New customer" badge if not
- **Stock validation**: Show "In stock (X available)" or "Low stock (X left)" or "Out of stock"
- **Affiliate code**: Show discount amount in real-time or "Invalid code" error
- **Address validation**: Highlight required field (city)

### Error Handling

- **Validation errors**: Show field-level errors (e.g., "Invalid email format")
- **Stock errors**: "Insufficient stock for {product}. Only {X} available."
- **Network errors**: "Failed to create order. Please try again."
- **Success**: Redirect to order confirmation page with order ID

### Loading States

- **User lookup**: Show spinner while searching by email
- **Address loading**: Skeleton loader for address dropdown
- **Submit**: Disable button, show "Creating order..." spinner
- **Affiliate validation**: Show loading spinner in realtime

### Accessibility

- Proper form labels
- Error announcements for screen readers
- Keyboard navigation for dropdowns
- Focus management (auto-focus email field)

### Mobile Responsiveness

- Stack address forms vertically on mobile
- Sticky order summary on desktop, collapsible on mobile
- Large tap targets for payment methods
- Autofill support for address fields

---

## API Integration Examples

### User Lookup by Email (for auto-fill)

```typescript
async function handleEmailChange(email: string) {
  if (!isValidEmail(email)) return;

  setIsLoadingUser(true);
  try {
    // Assuming you have an endpoint to get user by email
    const user = await fetchUserByEmail(email);
    if (user) {
      setCustomerName(user.name);
      setCustomerPhone(user.phone || "");
      setUserId(user.id);
      setSavedAddresses(user.addresses || []);
    }
  } catch (error) {
    // User not found - will be created on order submission
    setSavedAddresses([]);
  } finally {
    setIsLoadingUser(false);
  }
}
```

### Affiliate Code Validation

```typescript
async function validateAffiliateCode(code: string) {
  if (!code) {
    setDiscount(0);
    return;
  }

  try {
    // Call backend to validate and get discount info
    const affiliate = await fetch(`/api/affiliates/${code}`).then((r) =>
      r.json(),
    );

    if (affiliate.isActive) {
      // Calculate discount locally for preview
      const discount = calculateDiscount(
        subtotal,
        affiliate.discountType,
        affiliate.discountValue,
      );
      setDiscount(discount);
      setAffiliateError(null);
    }
  } catch (error) {
    setAffiliateError("Invalid or inactive affiliate code");
    setDiscount(0);
  }
}
```

### Submit Order

```typescript
async function handleSubmitOrder() {
  setIsSubmitting(true);

  const payload = {
    customerEmail: formState.customerEmail,
    customerName: formState.customerName,
    customerPhone: formState.customerPhone,
    userId: formState.userId, // Only in admin mode

    shippingAddressId: formState.shippingAddressId,
    shippingAddress: !formState.shippingAddressId
      ? formState.shippingAddress
      : undefined,

    billingAddressId: formState.sameAsBilling
      ? formState.shippingAddressId
      : formState.billingAddressId,
    billingAddress: formState.sameAsBilling
      ? undefined
      : formState.billingAddress,

    paymentMethod: formState.paymentMethod,
    items: formState.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
    affiliateCode: formState.affiliateCode,
    notes: formState.notes,
  };

  try {
    const order = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => r.json());

    // Success: redirect to order confirmation
    router.push(`/orders/${order.id}/confirmation`);
  } catch (error) {
    if (error.status === 400) {
      setValidationErrors(error.details);
    } else {
      toast.error("Failed to create order. Please try again.");
    }
  } finally {
    setIsSubmitting(false);
  }
}
```

---

## Testing Checklist

### Guest Checkout

- [ ] New customer can complete order with new address
- [ ] Existing customer email auto-fills name/phone
- [ ] Existing customer can select saved addresses
- [ ] Billing defaults to shipping correctly
- [ ] Custom billing address can be added
- [ ] Affiliate code applies discount correctly
- [ ] Invalid affiliate code shows error

### Authenticated Customer

- [ ] Customer info pre-filled from session
- [ ] Saved addresses load correctly
- [ ] New address can be added
- [ ] "Save address for future" works
- [ ] Order appears in customer's order history

### Admin Dashboard

- [ ] Can search and select existing customers
- [ ] Can create order for new customer
- [ ] Product search/selection works
- [ ] Stock warnings appear for low inventory
- [ ] Can override userId for specific user
- [ ] Order notes save correctly
- [ ] Email confirmation option works

### Validation

- [ ] Required fields show errors when empty
- [ ] Email format validated
- [ ] Stock validation prevents over-ordering
- [ ] City (required address field) validated
- [ ] Quantity must be positive integer

### Error Handling

- [ ] Network errors show user-friendly message
- [ ] Insufficient stock error shows product name and available quantity
- [ ] Invalid affiliate code shows clear error
- [ ] Form stays populated after error (no data loss)

---

## Design System Recommendations

### Layout

```
Desktop (3 column):
[Customer Info]  [Address Forms]  [Order Summary (sticky)]

Mobile (stacked):
[Customer Info]
[Address Forms]
[Order Summary (collapsible)]
```

### Color Coding

- Green: User found, in stock, valid affiliate code
- Yellow: Low stock warning
- Red: Validation errors, out of stock, invalid codes
- Blue: Info messages, optional fields

### Micro-interactions

- Smooth transitions when switching between saved/new address forms
- Animate discount application in order summary
- Confetti or success animation on order creation
- Progress indicator for multi-step checkout (if applicable)

---

## Future Enhancements (Optional)

1. **Auto-save draft orders** (localStorage or backend)
2. **Bulk order upload** (CSV for admin)
3. **Quick reorder** (from order history)
4. **Address validation API** (Google Maps, postal service)
5. **Tax calculation integration** (based on location)
6. **Shipping cost calculator** (based on weight/distance)
7. **Email/SMS notifications** (order confirmation)
8. **Printable invoice** generation
9. **Order templates** (for frequent orders)
10. **Multi-currency support**

---

## API Endpoints You May Need

Based on the order creation flow, you may need these additional endpoints:

1. `GET /api/users/by-email?email={email}` - Get user by email with addresses
2. `GET /api/users/{userId}/addresses` - Get user's saved addresses
3. `GET /api/products?search={query}` - Product search for admin
4. `GET /api/products/{id}` - Get product details including stock
5. `GET /api/affiliates/{code}` - Validate affiliate code
6. `POST /api/addresses` - Create standalone address (optional)

If these don't exist, coordinate with backend team to add them or adjust the frontend flow accordingly.
