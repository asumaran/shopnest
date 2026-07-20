"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useWishlist } from "@/context/WishlistContext";

interface WishlistButtonProps {
  product: Product;
}

export default function WishlistButton({ product }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const inList = isInWishlist(product.id);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setIsAnimating(true);

    if (inList) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-all ${
        inList
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
      } ${isAnimating ? "scale-125" : "scale-100"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={inList ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
