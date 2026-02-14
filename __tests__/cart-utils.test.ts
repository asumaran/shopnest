import { describe, it, expect } from "vitest";
import {
  addToCart,
  removeFromCart,
  calculateCartTotal,
  getCartItemCount,
} from "@/lib/cart-utils";
import { CartItem, Product } from "@/types";

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  description: "A test product",
  price: 29.99,
  image: "https://example.com/image.jpg",
  category: "Electronics",
  inStock: true,
};

const mockProduct2: Product = {
  id: "2",
  name: "Another Product",
  description: "Another test product",
  price: 49.99,
  image: "https://example.com/image2.jpg",
  category: "Books",
  inStock: true,
};

describe("addToCart", () => {
  it("adds a new product to an empty cart", () => {
    const result = addToCart([], mockProduct);
    expect(result).toHaveLength(1);
    expect(result[0].product.id).toBe("1");
    expect(result[0].quantity).toBe(1);
    expect(result[0].subtotal).toBe(29.99);
  });

  it("increments quantity when adding an existing product", () => {
    const cart: CartItem[] = [
      { product: mockProduct, quantity: 1, subtotal: 29.99 },
    ];
    const result = addToCart(cart, mockProduct);
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
    expect(result[0].subtotal).toBe(59.98);
  });

  it("adds a different product alongside existing items", () => {
    const cart: CartItem[] = [
      { product: mockProduct, quantity: 1, subtotal: 29.99 },
    ];
    const result = addToCart(cart, mockProduct2);
    expect(result).toHaveLength(2);
  });
});

describe("removeFromCart", () => {
  it("removes a product from the cart", () => {
    const cart: CartItem[] = [
      { product: mockProduct, quantity: 1, subtotal: 29.99 },
      { product: mockProduct2, quantity: 1, subtotal: 49.99 },
    ];
    const result = removeFromCart(cart, "1");
    expect(result).toHaveLength(1);
    expect(result[0].product.id).toBe("2");
  });

  it("returns empty array when removing last item", () => {
    const cart: CartItem[] = [
      { product: mockProduct, quantity: 1, subtotal: 29.99 },
    ];
    const result = removeFromCart(cart, "1");
    expect(result).toHaveLength(0);
  });

  it("returns same array when product not found", () => {
    const cart: CartItem[] = [
      { product: mockProduct, quantity: 1, subtotal: 29.99 },
    ];
    const result = removeFromCart(cart, "999");
    expect(result).toHaveLength(1);
  });
});

describe("calculateCartTotal", () => {
  it("returns 0 for empty cart", () => {
    expect(calculateCartTotal([])).toBe(0);
  });

  it("calculates total for a single item", () => {
    const cart: CartItem[] = [
      { product: mockProduct, quantity: 1, subtotal: 29.99 },
    ];
    expect(calculateCartTotal(cart)).toBe(29.99);
  });

  it("calculates total for multiple items", () => {
    const cart: CartItem[] = [
      { product: mockProduct, quantity: 1, subtotal: 29.99 },
      { product: mockProduct2, quantity: 1, subtotal: 49.99 },
    ];
    expect(calculateCartTotal(cart)).toBeCloseTo(79.98);
  });
});

describe("getCartItemCount", () => {
  it("returns 0 for empty cart", () => {
    expect(getCartItemCount([])).toBe(0);
  });

  it("sums all item quantities", () => {
    const cart: CartItem[] = [
      { product: mockProduct, quantity: 2, subtotal: 59.98 },
      { product: mockProduct2, quantity: 3, subtotal: 149.97 },
    ];
    expect(getCartItemCount(cart)).toBe(5);
  });
});
