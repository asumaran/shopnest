import { describe, it, expect } from "vitest";
import { getAll, getById, getByCategory } from "@/services/product-service";

describe("Products API", () => {
  describe("GET /api/products", () => {
    it("returns all products", () => {
      expect(getAll().length).toBeGreaterThan(0);
    });

    it("each product has required fields", () => {
      getAll().forEach((product) => {
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
      const electronics = getByCategory("Electronics");
      expect(electronics.length).toBeGreaterThan(0);
      electronics.forEach((p) => {
        expect(p.category).toBe("Electronics");
      });
    });
  });

  describe("GET /api/products/:id", () => {
    it("finds a product by id", () => {
      const product = getById("1");
      expect(product).toBeDefined();
      expect(product!.id).toBe("1");
    });

    it("returns undefined for non-existent id", () => {
      const product = getById("999");
      expect(product).toBeUndefined();
    });
  });
});
