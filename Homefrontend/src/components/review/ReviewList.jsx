import { Star } from "lucide-react";

export default function ReviewList({ title, reviews }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6 pt-30">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((review, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0"
          >
            <div className="flex items-center mb-1">
              <span className="font-semibold mr-2">{review.reviewerName}</span>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "fill-yellow-500" : "fill-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}