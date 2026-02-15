import { describe, it, expect } from "vitest";
import {
  getAll,
  getById,
  getByCategory,
  getCategories,
} from "@/services/product-service";

describe("ProductService", () => {
  describe("getAll", () => {
    it("returns all products", () => {
      const products = getAll();
      expect(products.length).toBeGreaterThan(0);
    });

    it("returns products with correct structure", () => {
      const products = getAll();
      products.forEach((product) => {
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("name");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("category");
        expect(product).toHaveProperty("inStock");
      });
    });
  });

  describe("getById", () => {
    it("returns a product when given a valid id", () => {
      const product = getById("1");
      expect(product).toBeDefined();
      expect(product!.id).toBe("1");
    });

    it("returns undefined for a non-existent id", () => {
      const product = getById("999");
      expect(product).toBeUndefined();
    });

    it("returns undefined for an empty string id", () => {
      const product = getById("");
      expect(product).toBeUndefined();
    });
  });

  describe("getByCategory", () => {
    it("returns products matching the category", () => {
      const electronics = getByCategory("Electronics");
      expect(electronics.length).toBeGreaterThan(0);
      electronics.forEach((p) => {
        expect(p.category).toBe("Electronics");
      });
    });

    it("is case-insensitive", () => {
      const lower = getByCategory("electronics");
      const upper = getByCategory("ELECTRONICS");
      expect(lower).toEqual(upper);
      expect(lower.length).toBeGreaterThan(0);
    });

    it("returns empty array for non-existent category", () => {
      const result = getByCategory("NonExistent");
      expect(result).toEqual([]);
    });
  });

  describe("getCategories", () => {
    it("returns all unique categories", () => {
      const categories = getCategories();
      expect(categories.length).toBeGreaterThan(0);
      const uniqueCategories = new Set(categories);
      expect(uniqueCategories.size).toBe(categories.length);
    });

    it("returns categories sorted alphabetically", () => {
      const categories = getCategories();
      const sorted = [...categories].sort();
      expect(categories).toEqual(sorted);
    });

    it("includes expected categories", () => {
      const categories = getCategories();
      expect(categories).toContain("Electronics");
      expect(categories).toContain("Clothing");
      expect(categories).toContain("Books");
    });
  });
});
