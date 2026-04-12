"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const totalValue = items.reduce((sum, p) => sum + p.price, 0);

  const handleMoveToCart = (product: any) => {
    addItem(product);
    removeFromWishlist(product.id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        {items.length > 0 && (
          <button
            onClick={() => clearWishlist()}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear all
          </button>
        )}
      </div>

      <p className="text-gray-500 mb-4">
        {items.length} item{items.length !== 1 ? "s" : ""} · Total value: $
        {totalValue.toFixed(2)}
      </p>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Browse products
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden"
          >
            <Link href={`/products/${product.id}`}>
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Link>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="mt-1 text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="px-3 py-2 text-gray-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
