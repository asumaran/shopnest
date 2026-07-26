"use client";

import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { total, shipping, amountToFreeShipping, itemCount } = useCart();
  const grandTotal = total + shipping;

  return (
    <div className="bg-gray-50 rounded-lg p-6 border">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Items ({itemCount})</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        {amountToFreeShipping > 0 && (
          <p className="text-xs text-blue-600">
            Add ${amountToFreeShipping.toFixed(2)} more for free shipping.
            Orders $50+ ship free.
          </p>
        )}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Checkout
      </button>
    </div>
  );
}
