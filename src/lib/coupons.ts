export type Coupon =
  | { code: string; type: "percent"; value: number }
  | { code: string; type: "fixed"; value: number };

const COUPONS: Coupon[] = [
  { code: "WELCOME10", type: "percent", value: 10 },
  { code: "SAVE20", type: "fixed", value: 20 },
];

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((coupon) => coupon.code === normalized);
}

export function applyCoupon(total: number, coupon: Coupon): number {
  if (coupon.type === "percent") {
    return total - total * (coupon.value / 10);
  }

  return total - coupon.value;
}
