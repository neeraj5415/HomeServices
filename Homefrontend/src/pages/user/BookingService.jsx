import { useNavigate } from "react-router-dom";
import img1 from "../../assets/images/Plumber.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";

const services = [
  {
    id: 1,
    name: "Plumber",
    description: "Fix leaks, install fixtures, and handle all plumbing needs.",
    image: img1,
  },
  {
    id: 2,
    name: "Beautician",
    description: "At-home beauty treatments by certified beauticians.",
    image: img2,
  },
  {
    id: 3,
    name: "Pest Control",
    description: "Get rid of pests and insects with our expert services.",
    image: img3,
  },
  {
    id: 4,
    name: "Electrician",
    description: "Wiring, installations, and electric repairs by pros.",
    image: img4,
  },
];

export default function BookingService() {
  const navigate = useNavigate();

  const handleBook = (serviceName) => {
    alert(`Proceeding to book a ${serviceName}`);
    // Later you can navigate to a detailed form like:
    // navigate(`/book/${serviceId}`);
    navigate(`/book/${serviceName}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
        Book a Service
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {service.name}
            </h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
            <button
              onClick={() => handleBook(service.name)}
              className="mt-4 px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}