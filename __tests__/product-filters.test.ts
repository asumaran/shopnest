import { describe, it, expect } from "vitest";
import {
  filterBySearch,
  filterByCategory,
  getCategories,
  applyFilters,
} from "@/lib/product-filters";
import { Product } from "@/types";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Great headphones",
    price: 79.99,
    image: "https://example.com/1.jpg",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Cotton T-Shirt",
    description: "Soft shirt",
    price: 24.99,
    image: "https://example.com/2.jpg",
    category: "Clothing",
    inStock: true,
  },
  {
    id: "3",
    name: "Water Bottle",
    description: "Steel bottle",
    price: 29.99,
    image: "https://example.com/3.jpg",
    category: "Home & Kitchen",
    inStock: true,
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    description: "Portable speaker",
    price: 44.99,
    image: "https://example.com/4.jpg",
    category: "Electronics",
    inStock: true,
  },
];

describe("filterBySearch", () => {
  it("returns all products for empty query", () => {
    expect(filterBySearch(mockProducts, "")).toHaveLength(4);
    expect(filterBySearch(mockProducts, "  ")).toHaveLength(4);
  });

  it("filters by partial name match", () => {
    const result = filterBySearch(mockProducts, "head");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("is case-insensitive", () => {
    const result = filterBySearch(mockProducts, "BLUETOOTH");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("4");
  });

  it("returns empty array when no match", () => {
    expect(filterBySearch(mockProducts, "nonexistent")).toHaveLength(0);
  });
});

describe("filterByCategory", () => {
  it("returns all products when category is null", () => {
    expect(filterByCategory(mockProducts, null)).toHaveLength(4);
  });

  it("filters by category", () => {
    const result = filterByCategory(mockProducts, "Electronics");
    expect(result).toHaveLength(2);
    result.forEach((p) => expect(p.category).toBe("Electronics"));
  });

  it("returns empty array for category with no products", () => {
    expect(filterByCategory(mockProducts, "Books")).toHaveLength(0);
  });
});

describe("getCategories", () => {
  it("returns unique sorted categories", () => {
    const categories = getCategories(mockProducts);
    expect(categories).toEqual(["Clothing", "Electronics", "Home & Kitchen"]);
  });

  it("returns empty array for no products", () => {
    expect(getCategories([])).toEqual([]);
  });
});

describe("applyFilters", () => {
  it("applies both search and category filter", () => {
    const result = applyFilters(mockProducts, "bluetooth", "Electronics");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Bluetooth Speaker");
  });

  it("returns all when no filters active", () => {
    expect(applyFilters(mockProducts, "", null)).toHaveLength(4);
  });

  it("returns empty when filters exclude everything", () => {
    expect(applyFilters(mockProducts, "headphones", "Clothing")).toHaveLength(0);
  });
});
