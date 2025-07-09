import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/SideBar";

export default function AdminProvider() {
  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch providers (admin only)
  const fetchProviders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://homeservices-5vng.onrender.com/api/auth/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Only providers
      setProviders(data.filter((u) => u.role === "provider"));
    } catch (err) {
      setMessage("Failed to fetch providers");
    }
  };
  useEffect(() => {
    fetchProviders();
  }, []);

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("https://homeservices-5vng.onrender.com/api/services");
        const data = await res.json();
        setServices(data);
        if (data.length === 0) {
          setMessage("No services available. Please add services first.");
        }
      } catch (err) {
        setMessage("Failed to fetch services");
      }
    };
    fetchServices();
  }, []);

  const filteredProviders = providers.filter((p) =>
    (p.name + (p.services?.map(s => s.name).join(' ') || "") + (p.location || "")).toLowerCase().includes(search.toLowerCase())
  );

  // Open edit services modal
  const handleEditServices = (provider) => {
    setSelectedProvider(provider);
    // Fix: Handle both populated and unpopulated services
    const currentServices = provider.services || [];
    const serviceIds = currentServices.map(s => {
      // If service is populated (has _id), use _id, otherwise use the service itself
      return typeof s === 'object' && s._id ? s._id : s;
    });
    setSelectedServices(serviceIds);
    setEditMode(true);
    setMessage("");
  };

  // Save updated services
  const handleSaveServices = async () => {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      console.log("Sending services:", selectedServices); // Debug log
      
      const res = await fetch(`https://homeservices-5vng.onrender.com/api/auth/providers/${selectedProvider._id}/services`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ services: selectedServices }),
      });
      
      const data = await res.json();
      console.log("Response:", data); // Debug log
      
      if (res.ok) {
        setMessage("Services updated successfully");
        // Update local state
        await fetchProviders(); // Refresh providers from backend
        setEditMode(false);
      } else {
        setMessage(data.message || "Failed to update services");
      }
    } catch (err) {
      console.error("Error updating services:", err); // Debug log
      setMessage("Failed to update services");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen pt-40">
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
              key={provider._id}
              onClick={() => {
                const freshProvider = providers.find(p => p._id === provider._id);
                setSelectedProvider(freshProvider || provider);
              }}
              className="cursor-pointer bg-green-100  p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">{provider.name}</h2>
              <p className="text-gray-600">{provider.services?.map(s => s.name).join(", ")}</p>
              <p className="text-gray-500 text-sm">{provider.location}</p>
            </div>
          ))}
        </div>

        {selectedProvider && !editMode && (
          <div className="mt-8 bg-blue-200 p-6 rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Provider Details
            </h2>
            <p><strong>Name:</strong> {selectedProvider.name}</p>
            <p><strong>Services:</strong> {
              selectedProvider.services && selectedProvider.services.length > 0
                ? selectedProvider.services.map(s =>
                    typeof s === 'object' && s.name
                      ? s.name
                      : (services.find(serv => serv._id === (s._id || s)) || {}).name
                  ).filter(Boolean).join(", ")
                : "None"
            }</p>
            <p><strong>Email:</strong> {selectedProvider.email}</p>
            <button
              onClick={() => handleEditServices(selectedProvider)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Edit Services
            </button>
            <button
              onClick={() => setSelectedProvider(null)}
              className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Close
            </button>
            {message && <div className="mt-2 text-red-600">{message}</div>}
          </div>
        )}

        {editMode && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md border">
            <h2 className="text-xl font-bold mb-4">Edit Services for {selectedProvider.name}</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Assign Services:</label>
              {services.length === 0 ? (
                <div className="text-red-600 mb-4">
                  No services available. Please add services first through the Services page.
                </div>
              ) : (
              <select
                multiple
                className="w-full border rounded p-2"
                value={selectedServices}
                onChange={e => {
                  const options = Array.from(e.target.options);
                  setSelectedServices(options.filter(o => o.selected).map(o => o.value));
                }}
              >
                {services.map(service => (
                  <option key={service._id} value={service._id}>{service.name}</option>
                ))}
              </select>
              )}
            </div>
            <button
              onClick={handleSaveServices}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              disabled={loading || services.length === 0}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              disabled={loading}
            >
              Cancel
            </button>
            {message && <div className="mt-2 text-red-600">{message}</div>}
          </div>
        )}
      </div>
    </div>
  );
}