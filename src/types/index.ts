export type Category =
  | "Electronics"
  | "Clothing"
  | "Home & Kitchen"
  | "Books"
  | "Sports";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface OrderRequest {
  items: { productId: string; quantity: number }[];
  couponCode?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  couponCode?: string;
  shipping: number;
  total: number;
  createdAt: string;
}
