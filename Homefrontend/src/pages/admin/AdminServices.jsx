import img1 from "../../assets/images/plumber.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import Sidebar from '../../components/admin/SideBar.jsx'

export default function ServicesSection() {
  return (
    <div className="flex min-h-screen pt-30">
        <Sidebar/>
    <div className="p-6 w-full rounded-xl">
      <h2 className="text-3xl font-bold text-shadow-lg mb-6">
        Our Services
      </h2>

      <div className="mb-6 mt-6">
        <input
          type="text"
          placeholder="Search bookings, users, providers..."
          className="w-full max-w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
          <img
            src={img1}
            alt="Plumber"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold mb-1">Plumber</h3>
          <p className="text-sm text-gray-700">
            Reliable plumbers for any plumbing issues
          </p>
        </div>

        <div className="bg-pink-100 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
          <img
            src={img2}
            alt="Beautician"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold mb-1">Beautician</h3>
          <p className="text-sm text-gray-700">
            Get salon-like experience with professional beauticians
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
          <img
            src={img3}
            alt="Pest Control"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold mb-1">Pest Control</h3>
          <p className="text-sm text-gray-700">
            Effective pest control solution for healthy homes
          </p>
        </div>

        <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
          <img
            src={img4}
            alt="Electrician"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold mb-1">Electrician</h3>
          <p className="text-sm text-gray-700">
            Certified electricians for all your electrical needs
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}