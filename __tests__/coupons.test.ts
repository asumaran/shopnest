import { describe, expect, it } from "vitest";
import { findCoupon } from "@/lib/coupons";

describe("findCoupon", () => {
  it("finds a coupon regardless of case and surrounding spaces", () => {
    expect(findCoupon("  welcome10 ")?.code).toBe("WELCOME10");
  });

  it("returns undefined for an unknown code", () => {
    expect(findCoupon("NOPE")).toBeUndefined();
  });
});
