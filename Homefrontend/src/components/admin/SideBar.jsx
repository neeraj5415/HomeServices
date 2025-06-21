import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-84 text-shadow-lg min-h-screen bg-red-100 p-4 space-y-4">
      <h2 className="text-shadow-lg text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-6 mt-5 text-xl">
        <Link to="/admin/dashboard" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/admin/users" className="hover:text-yellow-400">Users</Link>
        <Link to="/admin/providers" className="hover:text-yellow-400">Providers</Link>
        <Link to="/admin/bookings" className="hover:text-yellow-400">Bookings</Link>
        <Link to="/admin/services" className="hover:text-yellow-400">Services</Link>
      </nav>
    </aside>
  );
}