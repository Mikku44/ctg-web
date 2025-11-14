import { useState } from "react";
import type { Review } from "~/models/review";
import { ReviewsService } from "~/services/reviewService";


export default function ReviewForm({ tourId }: { tourId?: string }) {
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await ReviewsService.create({
      ...form,
      tour_id: tourId || "",
      status: "pending",
    } as Omit<Review, "created_at">);

    setLoading(false);
    setSuccess(true);

    setForm({ name: "", message: "", rating: 5 });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

      {success && (
        <div className="mb-3 p-3 bg-green-100 text-green-700 rounded">
          Thank you! Your review is pending approval.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full p-3 border rounded-md"
          required
        />

        {/* Rating */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleChange("rating", star)}
              className={`text-2xl ${
                form.rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Message */}
        <textarea
          placeholder="Your review"
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="w-full p-3 border rounded-md h-32"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
