import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewForm from "../../components/review/ReviewForm.jsx";

export default function SubmitReviewToUser() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://homeservices-5vng.onrender.com/api/bookings/provider", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (res.ok) {
        // Filter bookings that are accepted or completed and don't have reviews yet
        const reviewableBookings = data.bookings.filter(booking => 
          (booking.status === 'accepted' || booking.status === 'completed')
        );
        setBookings(reviewableBookings);
      } else {
        setError(data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    if (!selectedBooking) {
      alert("Please select a booking first");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://homeservices-5vng.onrender.com/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId: selectedBooking._id,
          rating: reviewData.rating,
          comment: reviewData.comment,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Review submitted successfully!");
        navigate("/provider/dashboard");
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <p className="text-center">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Review User</h2>
        <p className="text-gray-600 text-center">
          No completed bookings available for review.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Review User</h2>
      
      {!selectedBooking ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Select a booking to review:</h3>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedBooking(booking)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{booking.service}</p>
                    <p className="text-sm text-gray-600">User: {booking.user?.name}</p>
                    <p className="text-sm text-gray-600">Date: {booking.date}</p>
                    <p className="text-sm text-gray-600">Status: {booking.status}</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <h3 className="font-semibold">Reviewing:</h3>
            <p>Service: {selectedBooking.service}</p>
            <p>User: {selectedBooking.user?.name}</p>
            <p>Date: {selectedBooking.date}</p>
          </div>
          <ReviewForm reviewerRole="user" onSubmit={handleReviewSubmit} />
          <button
            onClick={() => setSelectedBooking(null)}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Bookings
          </button>
        </div>
      )}
    </div>
  );
}