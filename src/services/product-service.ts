import { products } from "@/data/products";
import { Product, Category } from "@/types";

export function getAll(): Product[] {
  return products;
}

export function getById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getCategories(): Category[] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).sort();
}
