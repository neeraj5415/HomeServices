import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ProviderSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `block px-4 py-2 rounded transition ${
      location.pathname === path ? "bg-red-300" : "hover:bg-red-300"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-red-100 text-shadow-lg h-screen p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-6">Provider Panel</h2>
      <nav className="space-y-3 text-lg mt-6">
        <Link to="/provider/dashboard" className="block px-4 py-2 rounded hover:bg-red-300">Dashboard</Link>
        <Link to="/provider/profile" className={linkClass("/provider/profile")}>Profile</Link>
        <Link to="/provider/bookings" className={linkClass("/provider/bookings")}>Booking History</Link>
        <Link to="/provider/requests" className={linkClass("/provider/requests")}>All Requests</Link>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-lg font-semibold w-full"
      >
        Logout
      </button>
    </aside>
  );
}