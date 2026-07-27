import { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    userName: "Alice Johnson",
    rating: 5,
    comment: "Absolutely love this product! <b>Best purchase</b> I've ever made.",
    createdAt: "2024-12-15T10:30:00Z",
  },
  {
    id: "r2",
    productId: "1",
    userName: "Bob Smith",
    rating: 4,
    comment: "Great quality, fast shipping. Would recommend to anyone looking for a good deal.",
    createdAt: "2024-12-20T14:22:00Z",
  },
  {
    id: "r3",
    productId: "1",
    userName: "Charlie Brown",
    rating: 2,
    comment: "Not what I expected. The description was misleading <script>alert('xss')</script>",
    createdAt: "2025-01-02T09:15:00Z",
  },
  {
    id: "r4",
    productId: "2",
    userName: "Diana Prince",
    rating: 5,
    comment: "Perfect fit and amazing material!",
    createdAt: "2025-01-05T16:45:00Z",
  },
  {
    id: "r5",
    productId: "3",
    userName: "Eve Wilson",
    rating: 3,
    comment: "It's okay, nothing special. Works as advertised though.",
    createdAt: "2025-01-10T11:00:00Z",
  },
];
