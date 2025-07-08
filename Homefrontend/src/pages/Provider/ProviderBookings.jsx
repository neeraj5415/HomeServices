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
        const res = await fetch("http://homeservices-5vng.onrender.com/api/bookings/provider", {
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
      const res = await fetch(`http://homeservices-5vng.onrender.com/api/bookings/${id}/status`, {
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
    <div className="flex min-h-screen pt-40">
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
                  {booking.status === "pending" && (
                    <button
                      onClick={() => updateStatus(booking._id, "accepted")}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Accept Request
                    </button>
                  )}
                  {booking.status === "accepted" && (
                    <>
                      <button
                        onClick={() => updateStatus(booking._id, "completed")}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => updateStatus(booking._id, "cancelled")}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Cancel Request
                      </button>
                    </>
                  )}
                  {booking.status === "completed" && (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded">
                      Completed
                    </span>
                  )}
                  {booking.status === "cancelled" && (
                    <span className="px-4 py-2 bg-red-100 text-red-700 rounded">
                      Cancelled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}