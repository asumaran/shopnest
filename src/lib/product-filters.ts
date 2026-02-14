import { Product, Category } from "@/types";

export function filterBySearch(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;
  const lowerQuery = query.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(lowerQuery));
}

export function filterByCategory(
  products: Product[],
  category: Category | null
): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getCategories(products: Product[]): Category[] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).sort();
}

export function applyFilters(
  products: Product[],
  query: string,
  category: Category | null
): Product[] {
  return filterByCategory(filterBySearch(products, query), category);
}
