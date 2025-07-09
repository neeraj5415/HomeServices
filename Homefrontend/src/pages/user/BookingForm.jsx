import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BookForm() {
  const { serviceName } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    address: "",
    notes: "",
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState("");
  const [assignedProvider, setAssignedProvider] = useState(null);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://homeservices-5vng.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          service: serviceName,
          date: formData.date,
          address: formData.address,
          notes: formData.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Booking failed");
      } else {
        setBookingConfirmed(true);
        setBookingId(data.booking._id);
        setAssignedProvider(data.provider);
        alert(`Booking confirmed! Your service provider is ${data.provider.name}. You can now proceed to payment.`);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Test key
      amount: 50000, // Amount in paise (500.00 INR)
      currency: "INR",
      name: "Home Services",
      description: `Booking for ${serviceName}`,
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        navigate("/user/UserDashbord");
      },
      prefill: {
        name: formData.name,
        email: formData.email,
      },
      notes: {
        address: formData.address,
        service: serviceName,
        provider: assignedProvider?.name || "Unknown",
      },
      theme: {
        color: "#38a169",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center pt-40">
      <form
        className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Book {serviceName}
        </h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        {assignedProvider && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Assigned Provider:</strong> {assignedProvider.name}
            </p>
            <p className="text-sm text-blue-600">
              <strong>Email:</strong> {assignedProvider.email}
            </p>
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          className="w-full mb-4 px-4 py-2 border rounded"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full mb-4 px-4 py-2 border rounded"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="w-full mb-4 px-4 py-2 border rounded"
          required
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Service Address"
          className="w-full mb-4 px-4 py-2 border rounded"
          required
          value={formData.address}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Additional Notes (optional)"
          className="w-full mb-4 px-4 py-2 border rounded resize-none"
          rows="3"
          value={formData.notes}
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={handleConfirmBooking}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mb-4"
          disabled={isSubmitting || bookingConfirmed}
        >
          {bookingConfirmed ? "Booking Confirmed" : isSubmitting ? "Confirming..." : "Confirm Booking"}
        </button>
        <button
          type="button"
          onClick={handlePayment}
          className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition ${!bookingConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!bookingConfirmed}
        >
          Make Payment
        </button>
      </form>
    </div>
  );
}