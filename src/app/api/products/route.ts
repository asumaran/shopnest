import { NextResponse } from "next/server";
import { getAll, getByCategory } from "@/services/product-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const result = category ? getByCategory(category) : getAll();

  return NextResponse.json(result);
}
