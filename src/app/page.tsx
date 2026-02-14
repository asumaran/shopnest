"use client";

import { products } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  const allProducts = products.filter((p) => p.inStock);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-600">
          Browse our collection of {allProducts.length} products
        </p>
      </div>
      <ProductGrid products={allProducts} />
    </div>
  );
}
