import Sidebar from "../../components/user/Sidebar.jsx"
import DashboardCard from '../../components/user/Dashboardcard.jsx'

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-white pt-30">
      <Sidebar />
      <main className="flex-1 p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-shadow-lg mb-6">
          Welcome to Your Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search for services like 'cleaning', 'electrician'..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 mb-10"
        />

        <div className="flex flex-wrap gap-6 mt-10">
          <DashboardCard />
        </div>
      </main>
    </div>
  );
}