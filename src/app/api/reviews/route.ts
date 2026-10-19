import { NextResponse } from "next/server";

let storedReviews: any[] = [];

export async function POST(request: Request) {
  const body = await request.json();

  const review = {
    id: `r${Date.now()}`,
    productId: body.productId,
    userName: body.userName,
    rating: body.rating,
    comment: body.comment,
    createdAt: new Date().toISOString(),
  };

  storedReviews.push(review);

  return NextResponse.json(review);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (productId) {
    return NextResponse.json(
      storedReviews.filter((r) => r.productId === productId),
    );
  }

  return NextResponse.json(storedReviews);
}
