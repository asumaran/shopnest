import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

const mockAddItem = vi.fn();

vi.mock("@/context/CartContext", () => ({
  useCart: () => ({
    addItem: mockAddItem,
    items: [],
    removeItem: vi.fn(),
    updateItemQuantity: vi.fn(),
    total: 0,
    itemCount: 0,
  }),
}));

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, ...rest } = props;
    return <img {...rest} data-fill={fill ? "true" : undefined} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  description: "A wonderful test product for testing",
  price: 29.99,
  image: "https://example.com/image.jpg",
  category: "Electronics",
  inStock: true,
};

const outOfStockProduct: Product = {
  ...mockProduct,
  id: "2",
  name: "Out of Stock Product",
  inStock: false,
};

describe("ProductCard", () => {
  it("renders product name and price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("renders product category", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  it("shows Add to Cart button for in-stock products", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("shows Out of Stock for unavailable products", () => {
    render(<ProductCard product={outOfStockProduct} />);
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
    expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
  });

  it("calls addItem when Add to Cart is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);
    await user.click(screen.getByText("Add to Cart"));
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });

  it("links to product detail page", () => {
    render(<ProductCard product={mockProduct} />);
    const links = screen.getAllByRole("link");
    const productLinks = links.filter(
      (link) => link.getAttribute("href") === "/products/1"
    );
    expect(productLinks.length).toBeGreaterThan(0);
  });
});
