import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

let mockItemCount = 0;

vi.mock("@/context/CartContext", () => ({
  useCart: () => ({
    addItem: vi.fn(),
    items: [],
    removeItem: vi.fn(),
    updateItemQuantity: vi.fn(),
    total: 0,
    itemCount: mockItemCount,
  }),
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

function renderHeaderWithCount(count: number) {
  mockItemCount = count;
  render(<Header />);
  return screen.getByRole("link", { name: /cart/i });
}

describe("Header cart badge", () => {
  it("renders no badge when the cart is empty", () => {
    const link = renderHeaderWithCount(0);
    expect(link).toHaveTextContent(/^Cart$/);
  });

  it("renders the exact count below the threshold", () => {
    const link = renderHeaderWithCount(5);
    expect(link).toHaveTextContent("Cart5");
  });

  it("renders 9 verbatim at the threshold", () => {
    const link = renderHeaderWithCount(9);
    expect(link).toHaveTextContent("Cart9");
  });

  it("renders 9+ above the threshold", () => {
    const link = renderHeaderWithCount(10);
    expect(link).toHaveTextContent("Cart9+");
    expect(screen.queryByText("10")).toBeNull();
  });
});
