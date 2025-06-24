import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `block px-4 py-2 rounded transition ${
      location.pathname === path ? "bg-red-300 text-white" : "hover:bg-red-200"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-red-100 text-shadow-lg h-screen p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-6">User Panel</h2>
      <nav className="space-y-3 text-lg mt-6">
        <Link to="/user/UserDashbord" className={linkClass("/user/UserDashbord")}>Dashboard</Link>
        <Link to="/user/profile" className={linkClass("/user/profile")}>Profile</Link>
        <Link to="/user/bookings" className={linkClass("/user/bookings")}>Booking History</Link>
        <Link to="/user/settings" className={linkClass("/user/settings")}>Settings</Link>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-lg font-semibold w-full"
      >
        Logout
      </button>
    </aside>
  );
}