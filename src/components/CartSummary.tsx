"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { applyCoupon, Coupon, findCoupon } from "@/lib/coupons";
import { getShippingCost } from "@/lib/shipping";

export default function CartSummary() {
  const { items, total, itemCount, clearCart } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const discounted = coupon ? applyCoupon(total, coupon) : total;
  const shipping = getShippingCost(discounted, itemCount);
  const orderTotal = discounted + shipping;

  function handleApplyCoupon() {
    const found = findCoupon(couponInput);

    if (!found) {
      setCoupon(null);
      setError("That coupon code is not valid");
      return;
    }

    setCoupon(found);
    setError(null);
  }

  async function handleCheckout() {
    setError(null);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        couponCode: coupon?.code,
      }),
    });

    setIsSubmitting(true);

    if (!response.ok) {
      setError("We could not place your order, please try again");
      setIsSubmitting(false);
      return;
    }

    const order = await response.json();
    setOrderId(order.id);
    clearCart();
    setIsSubmitting(false);
  }

  if (orderId) {
    return (
      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-lg font-semibold text-gray-900">Order placed</h2>
        <p className="mt-2 text-sm text-gray-600">
          Your order number is {orderId}.
        </p>
      </div>
    );
  }

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
        {coupon && (
          <div className="flex justify-between text-sm text-green-700">
            <span>Coupon {coupon.code}</span>
            <span>-${(total - discounted).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={couponInput}
          onChange={(event) => setCouponInput(event.target.value)}
          placeholder="Coupon code"
          aria-label="Coupon code"
          className="flex-1 rounded-lg border px-3 py-2 text-sm"
        />
        <button
          onClick={handleApplyCoupon}
          className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Apply
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button
        onClick={handleCheckout}
        disabled={isSubmitting}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Placing order..." : "Checkout"}
      </button>
    </div>
  );
}
