import { CartItem, Product } from "@/types";

export function addToCart(items: CartItem[], product: Product): CartItem[] {
  const existingItem = items.find((item) => item.product.id === product.id);

  if (existingItem) {
    return items.map((item) =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.product.price,
          }
        : item
    );
  }

  return [
    ...items,
    {
      product,
      quantity: 1,
      subtotal: product.price,
    },
  ];
}

export function removeFromCart(items: CartItem[], productId: string): CartItem[] {
  return items.filter((item) => item.product.id !== productId);
}

export function updateQuantity(
  items: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(items, productId);
  }

  return items.map((item) =>
    item.product.id === productId
      ? {
          ...item,
          quantity,
          // BUG: subtotal is NOT recalculated here — it keeps the original value
        }
      : item
  );
}

export function calculateCartTotal(items: CartItem[]): number {
  // BUG: uses item.subtotal which is stale after quantity updates
  return items.reduce((total, item) => total + item.subtotal, 0);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}
