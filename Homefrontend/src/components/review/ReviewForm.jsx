import { useState } from "react";

export default function ReviewForm({ reviewerRole, onSubmit }) {
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ rating: 5, comment: "" }); // Reset
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg pt-30">
      <label className="block mb-2 font-semibold">Rating</label>
      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-4"
      >
        {[5, 4, 3, 2, 1].map((val) => (
          <option key={val} value={val}>
            {val} Star{val > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Comment</label>
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        rows="4"
        className="w-full border px-3 py-2 rounded mb-4"
        placeholder={`Write a review for the ${reviewerRole}...`}
        required
      ></textarea>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Submit Review
      </button>
    </form>
  );
}