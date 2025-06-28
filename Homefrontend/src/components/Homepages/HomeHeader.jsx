import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function HomeHeader() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.role) {
      setUser(userData);
      setUserRole(userData.role);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserRole(null);
    setDropdownOpen(false);
    navigate("/");
  };

  const handleDashboard = () => {
    setDropdownOpen(false);
    if (userRole === "user") navigate("/user/UserDashbord");
    else if (userRole === "provider") navigate("/provider/dashboard");
    else if (userRole === "admin") navigate("/admin/dashboard");
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-10 shadow-md bg-gradient-to-r from-blue-600 to-blue-200 text-white rounded-xl fixed top-0 left-0 w-full z-50">
      <h1 className="text-xl font-bold text-white">HOME SERVICES</h1>

      <button
      className="lg:hidden text-white text-3xl focus:outline-none"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      ☰
    </button>

      <nav  className={`lg:flex gap-6 items-center relative text-2xl ${isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 bg-white text-black w-full p-6 z-50' : 'hidden'} lg:static lg:bg-transparent lg:w-auto`}>
        <Link to="/" className="text-gray-800 hover:text-blue-500 lg:inline-block py-2">Home</Link>
        <Link to="/about" className="text-gray-800 hover:text-blue-500 lg:inline-block py-2">About Us</Link>
        <Link to="/services" className="text-gray-800 hover:text-blue-500 lg:inline-block py-2">Services</Link>
        <Link to="/#contact" className="text-gray-800 hover:text-blue-500 lg:inline-block py-2">Contact Us</Link>

        {!userRole ? (
          <>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 lg:inline-block mt-2 lg:mt-0">Login</Link>
            <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 lg:inline-block mt-2 lg:mt-0">SignUp</Link>
          </>
        ) : (
          <div className="relative flex items-center gap-2" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center bg-white rounded-full px-4 py-1 shadow text-blue-700 font-bold text-lg focus:outline-none hover:shadow-lg transition"
              style={{ minWidth: 'fit-content' }}
            >
              <span className="mr-2">{user?.name}</span>
              <FaUserCircle className="text-xl align-middle" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={handleDashboard}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}