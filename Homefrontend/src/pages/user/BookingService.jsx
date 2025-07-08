import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingService() {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, [query]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");
      // Use the new endpoint that only returns services with providers
      const res = await axios.get(`http://homeservices-5vng.onrender.com/api/services/available?q=${query}`);
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Failed to fetch available services");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (serviceName) => {
    navigate(`/book/${serviceName}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 rounded-xl pt-40">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
        Book a Service
      </h2>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for services..."
          className="w-full max-w-md mx-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">
          <p className="text-gray-600">Loading available services...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">
            {query ? "No services found matching your search." : "No services are currently available. Please check back later."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-20 h-20 mx-auto mb-4 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {service.name}
              </h3>
              <p className="text-gray-600 mt-2">
                {service.description}
              </p>
              <p className="text-sm text-blue-600 mt-2">
                {service.providerCount} provider{service.providerCount !== 1 ? 's' : ''} available
              </p>
              <button
                onClick={() => handleBook(service.name)}
                className="mt-4 px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}