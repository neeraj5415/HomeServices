import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AuthForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        alert("Signup successful. Please log in.");
        navigate("/login");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

 return (
    <form
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Sign Up</h2>

      {error && (
        <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold text-gray-700">Role</label>
        <select
          name="role"
          required
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="provider">Service Provider</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
}