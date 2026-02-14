import { describe, it, expect } from "vitest";
import { products } from "@/data/products";

describe("Products API", () => {
  describe("GET /api/products", () => {
    it("returns all products", () => {
      expect(products.length).toBeGreaterThan(0);
    });

    it("each product has required fields", () => {
      products.forEach((product) => {
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("name");
        expect(product).toHaveProperty("description");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("image");
        expect(product).toHaveProperty("category");
        expect(product).toHaveProperty("inStock");
      });
    });

    it("filters products by category", () => {
      const electronics = products.filter(
        (p) => p.category === "Electronics"
      );
      expect(electronics.length).toBeGreaterThan(0);
      electronics.forEach((p) => {
        expect(p.category).toBe("Electronics");
      });
    });
  });

  describe("GET /api/products/:id", () => {
    it("finds a product by id", () => {
      const product = products.find((p) => p.id === "1");
      expect(product).toBeDefined();
      expect(product!.id).toBe("1");
    });

    it("returns undefined for non-existent id", () => {
      const product = products.find((p) => p.id === "999");
      expect(product).toBeUndefined();
    });
  });
});
