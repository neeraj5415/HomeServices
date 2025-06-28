import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/SideBar";

export default function AdminUser() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch users with role: user (admin only)
  const fetchUsers = async () => {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/auth/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response from server");
      }
      setUsers(data.filter((u) => u.role === "user"));
    } catch (err) {
      setMessage("Failed to fetch users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    (user.name + user.email + (user.address || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen pt-40">
      <Sidebar />
      <div className="p-6 bg-gray-100 w-full rounded-xl">
        <h1 className="text-shadow-lg text-3xl font-bold text-gray-800 mb-6">All Users</h1>

        <div className="mb-6 mt-6">
          <input
            type="text"
            placeholder="Search by name, email, or address"
            className="w-full max-w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className="cursor-pointer bg-blue-100 p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="">{user.email}</p>
                <p className="text-sm">{user.address || "-"}</p>
              </div>
            ))}
          </div>
        )}

        {selectedUser && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              User Details
            </h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone || "-"}</p>
            <p><strong>Address:</strong> {selectedUser.address || "-"}</p>
            <p><strong>Joined:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "-"}</p>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Close
            </button>
            {message && <div className="mt-2 text-red-600">{message}</div>}
          </div>
        )}
      </div>
    </div>
  );
}