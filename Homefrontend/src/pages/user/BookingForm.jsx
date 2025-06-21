import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Service "${serviceName}" booked successfully!`);
    // Optionally: Send to backend with axios
    // axios.post('/api/bookings', { ...formData, service: serviceName })
    navigate("/user/UserDashbord");; // redirect after booking
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Book {serviceName}
        </h2>

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
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}