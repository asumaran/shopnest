import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let result = products;

  if (category) {
    result = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  return NextResponse.json(result);
}
