import "dotenv/config";
export const isDev = process.env.NODE_ENV === "development";
export const TAX_RATE = 0.13; // 13% tax rate
export const SHIPPING_CHARGE = 100; // Flat shipping charge
