import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingService() {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, [query]);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/services?q=${query}`);
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  const handleBook = (serviceName) => {
    navigate(`/book/${serviceName}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 rounded-xl pt-30">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
        Book a Service
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">
            No services found.
          </p>
        ) : (
          services.map((service, i) => (
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
              <button
                onClick={() => handleBook(service.name)}
                className="mt-4 px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}