"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/types";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  calculateCartTotal,
  getCartItemCount,
} from "@/lib/cart-utils";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => addToCart(prev, product));
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => removeFromCart(prev, productId));
  }, []);

  const updateItemQuantity = useCallback(
    (productId: string, quantity: number) => {
      setItems((prev) => updateQuantity(prev, productId, quantity));
    },
    []
  );

  const total = calculateCartTotal(items);
  const itemCount = getCartItemCount(items);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateItemQuantity, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
