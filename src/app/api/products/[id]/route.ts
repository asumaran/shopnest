import { NextResponse } from "next/server";
import { getById } from "@/services/product-service";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const product = getById(params.id);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
