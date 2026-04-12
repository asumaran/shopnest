"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "shopnest_wishlist";
const MAX_WISHLIST_SIZE = 50;

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setItems(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    if (items.length >= MAX_WISHLIST_SIZE) {
      alert("Wishlist is full!");
      return;
    }
    setItems([...items, product]);
  };

  const removeFromWishlist = (productId: string) => {
    setItems(items.filter((item) => item.id != productId));
  };

  const isInWishlist = (productId: string) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == productId) {
        return true;
      }
    }
    return false;
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  return context!;
}
