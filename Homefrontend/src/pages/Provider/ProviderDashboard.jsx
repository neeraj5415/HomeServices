import Sidebar from "../../components/provider/Sidebar.jsx";

export default function ProviderDashboard() {
  return (
    <div className="flex min-h-screen pt-40">
      <Sidebar />
      <main className="flex-1 p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-shadow-lg ">
          Welcome, Service Provider
        </h1>
        <div className="mt-6 mb-6">
        <input
          type="text"
          placeholder="Search for services like 'cleaning', 'electrician'..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-pink-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-blue-600">Total Bookings</h2>
            <p className="text-3xl font-bold mt-2">25</p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-green-600">Pending Requests</h2>
            <p className="text-3xl font-bold mt-2">4</p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold text-red-600">Completed Services</h2>
            <p className="text-3xl font-bold mt-2">18</p>
          </div>
        </div>
      </main>
    </div>
  );
}
