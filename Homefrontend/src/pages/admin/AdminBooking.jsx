import React, { useState } from "react";
import Sidebar from '../../components/admin/SideBar.jsx'

// Sample static bookings data
const initialBookings = [
  {
    id: 1,
    time: "2025-06-20 10:00 AM",
    location: "Delhi",
    provider: "Anjali Sharma",
    user: "Neeraj Kumar",
    payment: "₹1200 - UPI",
    status: "Completed",
  },
  {
    id: 2,
    time: "2025-06-19 03:00 PM",
    location: "Mumbai",
    provider: "Rahul Mehta",
    user: "Pooja Singh",
    payment: "₹850 - Card",
    status: "Pending",
  },
  {
    id: 3,
    time: "2025-06-18 05:30 PM",
    location: "Bangalore",
    provider: "Sneha Patel",
    user: "Ravi Kumar",
    payment: "₹1500 - COD",
    status: "Completed",
  },
];

export default function AdminBooking() {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState(initialBookings);

  const handleDelete = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
  };

  const filteredBookings = bookings.filter((booking) =>
    (booking.location + booking.provider + booking.time)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen pt-30">
      <Sidebar />
      <div className="p-6 bg-gray-100 w-full rounded-xl">
      <h1 className="text-shadow-lg text-3xl font-bold text-gray-800 mb-6">All Bookings</h1>

      {/* Search Bar */}
      <div className="mb-6 mt-6">
        <input
          type="text"
          placeholder="Search by date, provider, or location"
          className="w-full max-w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-green-100 shadow-md rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              <div>
                <p className="text-sm text-gray-500">Booking Time:</p>
                <p className="font-medium text-gray-800">{booking.time}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Location:</p>
                <p className="font-medium text-gray-800">{booking.location}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Provider:</p>
                <p className="font-medium text-blue-700">{booking.provider}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">User:</p>
                <p className="font-medium text-green-700">{booking.user}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Payment:</p>
                <p className="font-medium text-purple-700">{booking.payment}</p>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col items-start sm:items-center">
                <span
                  className={`text-sm px-3 py-1 rounded-full font-semibold ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}