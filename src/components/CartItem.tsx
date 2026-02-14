"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateItemQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500">
          ${item.product.price.toFixed(2)} each
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            updateItemQuantity(item.product.id, item.quantity - 1)
          }
          className="w-8 h-8 rounded-full border text-gray-600 hover:bg-gray-100 flex items-center justify-center"
        >
          -
        </button>
        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() =>
            updateItemQuantity(item.product.id, item.quantity + 1)
          }
          className="w-8 h-8 rounded-full border text-gray-600 hover:bg-gray-100 flex items-center justify-center"
        >
          +
        </button>
      </div>
      <div className="text-right w-20">
        <p className="text-sm font-semibold text-gray-900">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => removeItem(item.product.id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    </div>
  );
}
