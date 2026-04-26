/**
 * Email Template Constants and Branding
 */

// Brand Colors
export const BRAND_COLORS = {
  PRIMARY: "#D60B47", // Brand Pink
  ACCENT: "#DCA11F", // Gold Accent
  WHITE: "#FFFFFF",
  BACKGROUND: "#F5F5F5",
  TEXT_PRIMARY: "#333333",
  TEXT_SECONDARY: "#666666",
  BORDER: "#E0E0E0",
  SUCCESS: "#10B981",
  WARNING: "#F59E0B",
  DANGER: "#EF4444",
} as const;

// Brand Logo (Update this URL with your actual logo)
export const BRAND_LOGO_URL =
  "https://via.placeholder.com/150x50/D60B47/FFFFFF?text=YourLogo";

// Brand Information
export const BRAND_INFO = {
  NAME: "Khatriin",
  TAGLINE: "Your Brand Tagline",
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || "support@example.com",
  WEBSITE_URL: process.env.WEBSITE_URL || "http://localhost:3000.com",
  ADDRESS: "Your Company Address, City, Country",
  PHONE: "+977 XXX XXXX XXX",
} as const;

// Social Media Links (Update with your actual links)
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/yourpage",
  INSTAGRAM: "https://instagram.com/yourpage",
  TWITTER: "https://twitter.com/yourpage",
} as const;

// Typography
export const FONT_FAMILY = "'Poppins', 'Helvetica Neue', Arial, sans-serif";

// Email Settings
export const EMAIL_SETTINGS = {
  MAX_WIDTH: "600px",
  PADDING: "40px 20px",
  BORDER_RADIUS: "8px",
} as const;
