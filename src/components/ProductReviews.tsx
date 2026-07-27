"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Review } from "@/types";
import {
  getReviewsByProductId,
  getAverageRating,
  submitReview,
} from "@/services/review-service";

interface ProductReviewsProps {
  productId: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const data = getReviewsByProductId(productId);
    setReviews(data);
  }, []);

  const averageRating = getAverageRating(productId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newReview = await submitReview({
      productId,
      userName,
      rating,
      comment,
    });

    setReviews([...reviews, newReview]);
    setUserName("");
    setComment("");
    setRating(5);
    setSubmitting(false);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>

      <div className="mt-2 flex items-center gap-3">
        <StarRating rating={Math.round(averageRating)} />
        <span className="text-gray-600">
          {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
        </span>
      </div>

      <div className="mt-8 space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">
                  {review.userName}
                </span>
                <StarRating rating={review.rating} />
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div
              className="mt-2 text-gray-600"
              dangerouslySetInnerHTML={{ __html: review.comment }}
            />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-10 border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Terrible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Share your experience..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
