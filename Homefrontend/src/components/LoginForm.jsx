import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Login</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up here
        </Link>
      </p>
    </form>
  );
}