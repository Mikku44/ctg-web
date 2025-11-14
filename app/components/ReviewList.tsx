import { useEffect, useState } from "react";
import type { Review } from "~/models/review";
import { ReviewsService } from "~/services/reviewService";


export default function ReviewList({ tourId }: { tourId?: string }) {
  const [reviews, setReviews] = useState<(Review & { id: string })[]>([]);

  useEffect(() => {
    if (tourId) {
      return ReviewsService.listenBy("tour_id", tourId, (data) => {
        setReviews(data.filter((i) => i.status === "approved"));
      });
    }

    return ReviewsService.listenBy("status", "approved", setReviews);
  }, [tourId]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 bg-white shadow rounded-xl border"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="font-semibold">{rev.name}</div>

              <div className="flex text-yellow-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>

            <p className="text-gray-700">{rev.message}</p>

            <div className="text-gray-400 text-sm mt-2">
              {rev.created_at?.toDate?.().toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
