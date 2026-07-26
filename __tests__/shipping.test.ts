import { describe, it, expect } from "vitest";
import {
  STANDARD_SHIPPING_RATE,
  qualifiesForFreeShipping,
  calculateShipping,
  amountUntilFreeShipping,
} from "@/lib/shipping";
import { CartItem, Product } from "@/types";

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  description: "A test product",
  price: 24.99,
  image: "https://example.com/image.jpg",
  category: "Electronics",
  inStock: true,
};

function cartWith(quantity: number): CartItem[] {
  return [
    {
      product: mockProduct,
      quantity,
      subtotal: mockProduct.price * quantity,
    },
  ];
}

describe("qualifiesForFreeShipping", () => {
  it("does not qualify below the threshold", () => {
    expect(qualifiesForFreeShipping(cartWith(1))).toBe(false);
  });

  it("qualifies above the threshold", () => {
    expect(qualifiesForFreeShipping(cartWith(3))).toBe(true);
  });
});

describe("calculateShipping", () => {
  it("returns 0 for an empty cart", () => {
    expect(calculateShipping([])).toBe(0);
  });

  it("charges the standard rate below the threshold", () => {
    expect(calculateShipping(cartWith(1))).toBe(STANDARD_SHIPPING_RATE);
  });

  it("is free above the threshold", () => {
    expect(calculateShipping(cartWith(3))).toBe(0);
  });
});

describe("amountUntilFreeShipping", () => {
  it("reports the remaining amount below the threshold", () => {
    expect(amountUntilFreeShipping(cartWith(1))).toBeCloseTo(25.01, 2);
  });

  it("returns 0 once the cart qualifies", () => {
    expect(amountUntilFreeShipping(cartWith(3))).toBe(0);
  });
});
