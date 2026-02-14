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
