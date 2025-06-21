import Sidebar from "../../components/provider/Sidebar";
import { useState } from "react";

export default function ProviderProfile() {
  const [profile, setProfile] = useState({
    name: "Raj Sharma",
    email: "raj@example.com",
    phone: "9876543210",
    serviceCategory: "Electrician",
    experience: "5 years",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // Optionally send updated profile to backend
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6 text-shadow-lg">Provider Profile</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-pink-100 shadow-md rounded-lg p-6 max-w-xl"
        >
          <div className="mb-4">
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Service Category</label>
            <input
              type="text"
              name="serviceCategory"
              value={profile.serviceCategory}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
}