import { CartItem } from "@/types";
import { calculateCartTotal, isCartEmpty } from "./cart-utils";

export const FREE_SHIPPING_THRESHOLD = 50;
export const STANDARD_SHIPPING_RATE = 5.99;

export function qualifiesForFreeShipping(items: CartItem[]): boolean {
  return calculateCartTotal(items) > FREE_SHIPPING_THRESHOLD;
}

export function calculateShipping(items: CartItem[]): number {
  if (isCartEmpty(items)) {
    return 0;
  }
  return qualifiesForFreeShipping(items) ? 0 : STANDARD_SHIPPING_RATE;
}

export function amountUntilFreeShipping(items: CartItem[]): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - calculateCartTotal(items));
}
