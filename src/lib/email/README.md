# Email Templates Documentation

## Overview

Professional HTML email templates with consistent branding, using your brand colors and Poppins font.

## Brand Configuration

### Update Brand Settings

All brand settings are centralized in `src/lib/email/constants.ts:1`

**Update these constants:**

```typescript
// 1. LOGO URL (IMPORTANT - Update this with your actual logo URL)
export const BRAND_LOGO_URL = "https://your-cdn.com/logo.png";

// 2. Brand Information
export const BRAND_INFO = {
  NAME: "Your Brand Name",
  TAGLINE: "Your Brand Tagline",
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || "support@yourdomain.com",
  WEBSITE_URL: process.env.WEBSITE_URL || "https://yourdomain.com",
  ADDRESS: "Your Company Address, City, Country",
  PHONE: "+977 XXX XXXX XXX",
};

// 3. Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/yourpage",
  INSTAGRAM: "https://instagram.com/yourpage",
  TWITTER: "https://twitter.com/yourpage",
};
```

### Brand Colors (Already Configured)

```typescript
export const BRAND_COLORS = {
  PRIMARY: "#D60B47",    // Brand Pink
  ACCENT: "#DCA11F",     // Gold Accent
  WHITE: "#FFFFFF",
  // ... other colors
};
```

### Font (Already Configured)

- **Primary Font:** Poppins (loaded from Google Fonts)
- **Fallback:** Helvetica Neue, Arial, sans-serif
- **Monospace** (for OTP/codes): Courier New

## Email Templates

### AUTH Templates

**File:** `src/lib/email/templates/auth.templates.ts:1`

1. **OTP Email** - `createOTPEmail()`
   - Large, styled OTP display
   - 5-minute expiration notice
   - Security warnings

2. **Welcome Email** - `createWelcomeEmail()`
   - Celebratory design
   - Getting started guide
   - Call-to-action button

3. **Password Reset** - `createPasswordResetEmail()`
   - Reset token display
   - Security warnings
   - 1-hour expiration

4. **Account Verification** - `createAccountVerificationEmail()`
   - Verification token display
   - 24-hour expiration

### ORDER Templates

**File:** `src/lib/email/templates/order.templates.ts:1`

1. **Order Confirmation** - `createOrderConfirmationEmail()`
   - Order details table
   - Items list with quantities & prices
   - Total amount highlight
   - "Track Order" button

2. **Admin New Order** - `createAdminNewOrderEmail()`
   - Alert-style notification
   - Order summary
   - "Review Order" button

3. **Order Status Update** - `createOrderStatusUpdateEmail()`
   - Status highlight
   - Optional tracking number
   - "View Details" button

4. **Order Cancelled** - `createOrderCancelledEmail()`
   - Cancellation notice
   - Optional reason
   - Refund information

5. **Order Shipped** - `createOrderShippedEmail()`
   - Tracking number display
   - Courier information
   - Estimated delivery
   - "Track Package" button

### WITHDRAWAL Templates

**File:** `src/lib/email/templates/withdrawal.templates.ts:1`

1. **Withdrawal Requested** - `createWithdrawalRequestedEmail()` (Admin)
   - Vendor details
   - Amount
   - "Review Request" button

2. **Withdrawal Approved** - `createWithdrawalApprovedEmail()`
   - Success badge
   - Transaction proof
   - Admin remarks
   - Processing timeline

3. **Withdrawal Rejected** - `createWithdrawalRejectedEmail()`
   - Rejection notice
   - Reason display
   - "Contact Support" button

### USER Templates

**File:** `src/lib/email/templates/user.templates.ts:1`

1. **Profile Update** - `createProfileUpdateEmail()`
   - Updated fields list
   - Security warning
   - "View Profile" button

2. **Security Alert** - `createSecurityAlertEmail()`
   - Alert-style design
   - Alert type, time, IP
   - Action buttons
   - Security recommendations

## Design Features

### Responsive Design
- Max width: 600px
- Mobile-optimized
- Stacks on small screens

### Visual Elements
- **Gradients** - Primary pink gradient headers
- **Badges** - Status indicators (Confirmed, Shipped, etc.)
- **Highlight Boxes** - Important information with colored borders
- **Info Boxes** - Key-value pair displays
- **Buttons** - Prominent CTAs with hover effects
- **Tables** - Order items with clean styling

### Email Structure

Every email includes:
1. **Header** - Logo with gradient background
2. **Body** - Template-specific content
3. **Footer** - 
   - Brand info
   - Social media links
   - Contact information
   - Copyright notice

## Usage in Processors

All processors automatically use these templates:

```typescript
// In processors/auth.processor.ts
const { subject, html } = createOTPEmail({ otp, purpose });

await mailer.sendMail({
  from: SMTP_FROM,
  to,
  subject,
  html, // HTML email
});
```

## Development Mode

In development (`NODE_ENV !== "production"` or no `SMTP_HOST`):
- Emails are **NOT sent**
- Email subject is **logged**
- Perfect for testing templates

## Customization

### Modify Existing Templates

Edit template files in `src/lib/email/templates/`:
- `auth.templates.ts` - Auth emails
- `order.templates.ts` - Order emails
- `withdrawal.templates.ts` - Withdrawal emails
- `user.templates.ts` - User/profile emails

### Create New Templates

1. Add template function to appropriate file
2. Import in processor
3. Use in job handler

Example:
```typescript
// In order.templates.ts
export function createOrderRefundEmail(data) {
  const content = `
    <h1>Refund Processed</h1>
    <p>Your refund of NPR ${data.amount} has been processed.</p>
  `;
  
  return {
    subject: "Refund Processed",
    html: createEmailTemplate(content, "Refund confirmation"),
  };
}
```

### Modify Colors/Styles

Update `src/lib/email/constants.ts:1`:

```typescript
export const BRAND_COLORS = {
  PRIMARY: "#YourColor",    // Change primary color
  ACCENT: "#YourAccent",    // Change accent color
  // ...
};
```

All templates will automatically use new colors!

## Testing

### Preview Emails

1. Run in development mode
2. Trigger email action
3. Check logs for email subject
4. For full preview, temporarily enable email sending

### Test with Real Email

```bash
# Set SMTP credentials in .env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com

# Set to production
NODE_ENV=production
```

## Email Client Compatibility

Templates are tested and work with:
- ✅ Gmail
- ✅ Outlook
- ✅ Apple Mail
- ✅ Yahoo Mail
- ✅ Mobile clients (iOS, Android)

Features:
- Web font fallbacks for Outlook
- Inline styles (no external CSS)
- Table-based layout for compatibility
- Responsive media queries

## Best Practices

1. **Keep Logo Small** - Recommended: 150x50px or 200x60px
2. **Use CDN for Logo** - Host logo on CDN for fast loading
3. **Test Before Deploying** - Send test emails to multiple clients
4. **Keep Content Concise** - Mobile users prefer short emails
5. **Clear CTAs** - One primary action per email
6. **Alt Text** - Always add alt text to logo

## Troubleshooting

### Logo Not Showing
- Check BRAND_LOGO_URL is correct
- Ensure logo is publicly accessible
- Use HTTPS URL

### Fonts Not Loading
- Poppins loads from Google Fonts
- Fallback fonts work if Google Fonts blocked
- Outlook uses Arial (doesn't support web fonts)

### Layout Broken
- Test in multiple email clients
- Check for unclosed HTML tags
- Validate email HTML

### Colors Wrong
- Verify hex codes in constants.ts
- Clear email client cache
- Check dark mode compatibility

## Quick Start Checklist

- [ ] Update `BRAND_LOGO_URL` in `constants.ts`
- [ ] Update `BRAND_INFO` (name, tagline, address, phone)
- [ ] Update `SOCIAL_LINKS` (Facebook, Instagram, Twitter)
- [ ] Update `.env` with `SUPPORT_EMAIL` and `WEBSITE_URL`
- [ ] Test email in development mode
- [ ] Send test email to real inbox
- [ ] Verify on mobile device

---

**Location:** `src/lib/email/`
**Main Entry:** `src/lib/email/index.ts`
**Configuration:** `src/lib/email/constants.ts`
