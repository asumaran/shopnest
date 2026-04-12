import { reviews as reviewData } from "@/data/reviews";

const API_URL = "http://localhost:3000/api/reviews";

let reviews = [...reviewData];

export function getReviewsByProductId(productId: any) {
  console.log("Fetching reviews for product:", productId);
  return reviews.filter((r) => r.productId === productId);
}

export function getReviewCount(productId: string): number {
  return getReviewsByProductId(productId).length;
}

export function getAverageRating(productId: string): number {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc: any, r: any) => acc + r.rating, 0);
  return sum / productReviews.length;
}

export async function submitReview(data: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  reviews.push(result);
  return result;
}
