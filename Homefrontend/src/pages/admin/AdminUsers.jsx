import React, { useState } from "react";

// Sample static user data
const sampleUsers = [
  {
    id: 1,
    name: "Neeraj Kumar",
    email: "neeraj@example.com",
    phone: "9876543210",
    city: "Delhi",
    joined: "2023-11-10",
    status: "Active",
  },
  {
    id: 2,
    name: "Pooja Singh",
    email: "pooja@example.com",
    phone: "9871234567",
    city: "Mumbai",
    joined: "2024-02-15",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Ravi Sharma",
    email: "ravi@example.com",
    phone: "9879876543",
    city: "Bangalore",
    joined: "2023-08-22",
    status: "Active",
  },
];

export default function AdminUser() {
  const [search, setSearch] = useState("");
  const [users] = useState(sampleUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((user) =>
    (user.name + user.email + user.city).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Users</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or city"
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 text-sm">{user.city}</p>
          </div>
        ))}
      </div>

      {/* User Details */}
      {selectedUser && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            User Details
          </h2>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone:</strong> {selectedUser.phone}</p>
          <p><strong>City:</strong> {selectedUser.city}</p>
          <p><strong>Joined:</strong> {selectedUser.joined}</p>
          <p><strong>Status:</strong> {selectedUser.status}</p>

          <button
            onClick={() => setSelectedUser(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}