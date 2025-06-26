import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/SideBar.jsx";

const bgColors = [
  "bg-blue-100",
  "bg-pink-100",
  "bg-green-100",
  "bg-blue-200",
];

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/services?q=${searchTerm}`
      );
      setServices(res.data);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [searchTerm]);

  return (
    <div className="flex min-h-screen pt-40">
      <Sidebar />
      <div className="p-6 w-full rounded-xl">
        <h2 className="text-3xl font-bold text-shadow-lg mb-6">
          Our Services
        </h2>
        {/* Search */}
        <div className="mb-6 mt-6">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {services.map((service, index) => (
            <div
            key={service._id}
            className={`${bgColors[index % bgColors.length]} p-4 rounded-lg shadow-md text-center hover:shadow-xl hover:scale-112 transform transition duration-300`}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-20 h-20 mx-auto mb-4 object-cover "
              />
              <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
              <p className="text-sm text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}