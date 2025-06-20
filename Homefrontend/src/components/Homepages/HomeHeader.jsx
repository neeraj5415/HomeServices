import { Link } from "react-router-dom";

export default function HomeHeader() {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <h1 className="text-xl font-bold text-blue-600">HOME SERVE</h1>

      <nav className="flex gap-6 items-center">
        <Link to="/" className="text-gray-800 hover:text-blue-500">
          Home
        </Link>
        <Link to="/about" className="text-gray-800 hover:text-blue-500">
          About Us
        </Link>
        <Link to="/services" className="text-gray-800 hover:text-blue-500">
          Services
        </Link>
        <Link to="/contact" className="text-gray-800 hover:text-blue-500">
          Contact Us
        </Link>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          SignUp
        </Link>
      </nav>
    </header>
  );
}