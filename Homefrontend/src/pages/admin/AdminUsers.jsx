import React, { useState, useEffect } from "react";
import Sidebar from '../../components/admin/SideBar.jsx'
import axios from "axios";

export default function AdminUser() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/auth/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    (user.name + user.email + (user.city || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen pt-40">
      <Sidebar />
      <div className=" p-4 rounded-xl">
      <h1 className="text-xl font-bold text-shadow-lg">All Users</h1>
      <div className="mb-6 mt-6">
        <input
          type="text"
          placeholder="Search by name, email, or city"
          className="w-full max-w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
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
            <p className="text-sm">{user.city || "-"}</p>
          </div>
        ))}
      </div>
      )}

      {selectedUser && (
        <div className="mt-8 bg-pink-100 p-6 rounded-xl shadow-md border">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            User Details
          </h2>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone:</strong> {selectedUser.phone || "-"}</p>
          <p><strong>City:</strong> {selectedUser.city || "-"}</p>
          <p><strong>Joined:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "-"}</p>
          <p><strong>Status:</strong> {selectedUser.status || "-"}</p>

          <button
            onClick={() => setSelectedUser(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      )}
      </div>
    </div>
  );
}