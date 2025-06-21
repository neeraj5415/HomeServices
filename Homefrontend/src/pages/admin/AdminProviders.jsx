import React, { useState } from "react";
import Sidebar from "../../components/admin/SideBar";

// Sample static provider data
const sampleProviders = [
  {
    id: 1,
    name: "Anjali Sharma",
    service: "Hair Stylist",
    location: "Delhi",
    phone: "9876543210",
    email: "anjali@example.com",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Rahul Mehta",
    service: "Electrician",
    location: "Mumbai",
    phone: "9871234567",
    email: "rahul@example.com",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Sneha Patel",
    service: "Home Cleaning",
    location: "Bangalore",
    phone: "9879876543",
    email: "sneha@example.com",
    rating: 4.8,
  },
];

export default function AdminProvider() {
  const [search, setSearch] = useState("");
  const [providers] = useState(sampleProviders);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const filteredProviders = providers.filter((p) =>
    (p.name + p.service + p.location).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen pt-30">
      <Sidebar />
      <div className="p-6 bg-gray-100 w-full rounded-xl">
      <h1 className="text-shadow-lg text-3xl font-bold text-gray-800 mb-6">All Providers</h1>

      <div className="mb-6 mt-6">
        <input
          type="text"
          placeholder="Search by name, service, or location"
          className="w-full max-w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            onClick={() => setSelectedProvider(provider)}
            className="cursor-pointer bg-green-100  p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">{provider.name}</h2>
            <p className="text-gray-600">{provider.service}</p>
            <p className="text-gray-500 text-sm">{provider.location}</p>
          </div>
        ))}
      </div>

      {selectedProvider && (
        <div className="mt-8 bg-blue-200 p-6 rounded-xl shadow-md border">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Provider Details
          </h2>
          <p><strong>Name:</strong> {selectedProvider.name}</p>
          <p><strong>Service:</strong> {selectedProvider.service}</p>
          <p><strong>Location:</strong> {selectedProvider.location}</p>
          <p><strong>Phone:</strong> {selectedProvider.phone}</p>
          <p><strong>Email:</strong> {selectedProvider.email}</p>
          <p><strong>Rating:</strong> ⭐ {selectedProvider.rating}</p>

          <button
            onClick={() => setSelectedProvider(null)}
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