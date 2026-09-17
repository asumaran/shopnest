import { describe, it, expect } from "vitest";
import { calculateCartTotal } from "@/lib/cart-utils";

// Fixture for the gotopr preview: the second test fails on purpose so the
// PR always carries a failed check. Do not merge.
describe("gotopr fixture", () => {
  it("passes", () => {
    expect(calculateCartTotal([])).toBe(0);
  });

  it("fails on purpose", () => {
    expect(calculateCartTotal([])).toBe(1);
  });
});
