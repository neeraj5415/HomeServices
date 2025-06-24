import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/provider/Sidebar";

export default function UsersRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    accessories: "",
    amount: "",
    note: "",
  });

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
        if (!res.ok) setError(data.message || "Failed to fetch requests");
        else setRequests(data.bookings);
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
        setRequests((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: data.booking.status } : b))
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch {
      alert("Network error");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPayment = (id) => {
    alert(
      `Payment confirmed for Booking #${id}\nAccessories: ${paymentDetails.accessories}\nAmount: ₹${paymentDetails.amount}\nNote: ${paymentDetails.note}`
    );
    window.open("https://pay.google.com/", "_blank"); // mock Google Pay
    // window.open("https://razorpay.com/payment-button/", "_blank"); // Or Razorpay
    setShowPaymentForm(null); // hide form after payment
  };

  return (
    <div className="flex min-h-screen pt-24">
      <Sidebar />
      <main className="flex-1 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-shadow-lg">
          User Booking Requests
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-shadow-lg">No requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-green-100 p-5 rounded-lg shadow border"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-blue-600 text-lg">
                      {req.user?.name} ({req.user?.email})
                    </h3>
                    <p><strong>Service:</strong> {req.service}</p>
                    <p><strong>Date:</strong> {req.date}</p>
                    <p><strong>Address:</strong> {req.address}</p>
                    <p><strong>Notes:</strong> {req.notes || "No notes"}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`$ {
                          req.status === "accepted"
                            ? "text-green-600"
                            : req.status === "cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        } font-medium`}
                      >
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {req.status === "pending" && (
                      <button
                        onClick={() => updateStatus(req._id, "accepted")}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Accept Request
                      </button>
                    )}
                    {req.status === "accepted" && (
                      <button
                        onClick={() => updateStatus(req._id, "cancelled")}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>

                {/* Payment Form */}
                {showPaymentForm === req._id && (
                  <div className="mt-4 bg-blue-100 p-4 rounded shadow">
                    <h4 className="font-semibold text-lg mb-2 text-shadow-lg">Enter Payment Details</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="accessories"
                        placeholder="Accessories Used"
                        value={paymentDetails.accessories}
                        onChange={handleFormChange}
                        className="w-full border px-4 py-2 rounded m-2"
                      />
                      <input
                        type="number"
                        name="amount"
                        placeholder="Total Amount (₹)"
                        value={paymentDetails.amount}
                        onChange={handleFormChange}
                        className="w-full border px-4 py-2 rounded m-2"
                      />
                      <textarea
                        name="note"
                        placeholder="Additional Note"
                        value={paymentDetails.note}
                        onChange={handleFormChange}
                        className="w-full border px-4 py-2 rounded m-2"
                      />
                      <button
                        onClick={() => handleConfirmPayment(req._id)}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition m-2"
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}