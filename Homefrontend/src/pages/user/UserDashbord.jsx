import Sidebar from "../../components/user/Sidebar.jsx"
import DashboardCard from '../../components/user/Dashboardcard.jsx'

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-white pt-40">
      <Sidebar />
      <main className="flex-1 p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-shadow-lg mb-6">
          Welcome to Your Dashboard
        </h1>
        <div className="flex flex-wrap gap-6 mt-10">
          <DashboardCard />
        </div>
      </main>
    </div>
  );
}