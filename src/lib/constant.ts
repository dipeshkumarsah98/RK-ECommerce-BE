import "dotenv/config";
export const isDev = process.env.NODE_ENV === "development";
export const TAX_RATE = 0.13; // 13% tax rate
export const SHIPPING_CHARGE = 100; // Flat shipping charge
export const MIN_WITHDRAWAL_AMOUNT = 500; // NPR
export const WITHDRAWAL_COOLDOWN_DAYS = 7;
