import SideBar from '../../components/admin/SideBar.jsx'
export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      < SideBar />
    <div className="p-6 bg-gray-100 w-full">
      <h1 className="text-3xl font-bold text-shadow-lg mb-6">Admin Dashboard</h1>
      <div className="mb-6 mt-6">
        <input
          type="text"
          placeholder="Search bookings, users, providers..."
          className="w-full max-w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Bookings</h2>
          <p className="text-3xl font-bold text-blue-600">1240</p>
        </div>
        <div className="bg-pink-100 shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-green-600">980</p>
        </div>
        <div className="bg-green-100 shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Providers</h2>
          <p className="text-3xl font-bold text-purple-600">220</p>
        </div>
        <div className="bg-blue-200 shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Services</h2>
          <p className="text-3xl font-bold text-pink-600">35</p>
        </div>
      </div>
    </div>
    </div>
  );
}