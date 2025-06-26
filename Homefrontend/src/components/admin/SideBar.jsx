import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `block px-4 py-2 rounded transition ${
      location.pathname === path ? "bg-red-400 text-white" : "hover:text-red-400"
    }`;

  return (
    <aside className="w-64 bg-red-100 text-shadow-lg h-screen p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-3 text-lg mt-6">
        <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>Dashboard</Link>
        <Link to="/admin/users" className={linkClass("/admin/users")}>Users</Link>
        <Link to="/admin/providers" className={linkClass("/admin/providers")}>Providers</Link>
        <Link to="/admin/reviews" className={linkClass("/admin/reviews")}>Rating & Reviews</Link>
        <Link to="/admin/bookings" className={linkClass("/admin/bookings")}>Bookings</Link>
        <Link to="/admin/services" className={linkClass("/admin/services")}>Services</Link>
      </nav>
    </aside>
  );
}