import Sidebar from "../../components/provider/Sidebar";
import { useEffect, useState } from "react";

export default function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/bookings/provider", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) setError(data.message || "Failed to fetch bookings");
        else setBookings(data.bookings);
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: data.booking.status } : b))
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch {
      alert("Network error");
    }
  };

  return (
    <div className="flex min-h-screen pt-30">
      <Sidebar />
      <main className="flex-1 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-shadow-lg">Your Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-blue-100 shadow-md rounded-lg p-4 border"
              >
                <h3 className="text-lg font-semibold text-blue-600">
                  {booking.user?.name} ({booking.user?.email})
                </h3>
                <p className="text-gray-700">
                  <strong>Service:</strong> {booking.service}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {booking.date}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {booking.address}
                </p>
                <p className="text-gray-700">
                  <strong>Notes:</strong> {booking.notes || "None"}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {booking.status}
                </p>
                <div className="flex gap-4 mt-2">
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                    disabled={booking.status === "accepted"}
                    onClick={() => updateStatus(booking._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                    disabled={booking.status === "cancelled"}
                    onClick={() => updateStatus(booking._id, "cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}