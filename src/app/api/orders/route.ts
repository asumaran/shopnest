import { NextResponse } from "next/server";
import { getById } from "@/services/product-service";
import { calculateCartTotal, getCartItemCount } from "@/lib/cart-utils";
import { applyCoupon, findCoupon } from "@/lib/coupons";
import { getShippingCost } from "@/lib/shipping";
import { CartItem, Order, OrderRequest } from "@/types";

const orders: Order[] = [];

export async function POST(request: Request) {
  const body = (await request.json()) as OrderRequest;

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Order has no items" }, { status: 400 });
  }

  const lines: CartItem[] = [];

  for (const line of body.items) {
    const product = getById(line.productId);

    if (!product) {
      return NextResponse.json(
        { error: `Unknown product ${line.productId}` },
        { status: 400 }
      );
    }

    if (!Number.isInteger(line.quantity) || line.quantity < 1) {
      return NextResponse.json(
        { error: `Invalid quantity for ${line.productId}` },
        { status: 400 }
      );
    }

    lines.push({
      product,
      quantity: line.quantity,
      subtotal: product.price * line.quantity,
    });
  }

  const subtotal = calculateCartTotal(lines);
  const coupon = body.couponCode ? findCoupon(body.couponCode) : undefined;
  const discounted = coupon ? applyCoupon(subtotal, coupon) : subtotal;
  const shipping = getShippingCost(discounted, getCartItemCount(lines));

  const order: Order = {
    id: `ord_${orders.length + 1}`,
    items: lines,
    couponCode: coupon?.code,
    shipping,
    total: discounted + shipping,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return NextResponse.json(
    { id: order.id, total: order.total, coupon: order.coupon },
    { status: 201 }
  );
}
