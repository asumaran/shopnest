"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getById } from "@/services/product-service";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();

  const product = getById(params.id as string);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">
          Product not found
        </h1>
        <Link
          href="/"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        &larr; Back to products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <p className="mt-6 text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <div className="mt-6">
            {product.inStock ? (
              <button
                onClick={() => addItem(product)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            ) : (
              <p className="text-red-500 font-medium">
                This product is currently out of stock
              </p>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
}
