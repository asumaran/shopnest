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

export type SortOption = "price-asc" | "price-desc" | "name";

export function sortProducts(
  products: Product[],
  sort: SortOption
): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}
