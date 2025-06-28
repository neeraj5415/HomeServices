import Sidebar from "../../components/provider/Sidebar";
import ReviewList from "../../components/review/ReviewList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProviderProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceCategory: "",
    experience: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const userReviews = [
    {
      reviewerName: "Neeraj Kumar",
      rating: 5,
      comment: "Raj was extremely professional and solved the issue quickly.",
    },
    {
      reviewerName: "Ritika Singh",
      rating: 4,
      comment: "Came on time and completed the work neatly.",
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          serviceCategory: res.data.serviceCategory || "",
          experience: res.data.experience || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch("http://localhost:5000/api/auth/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="flex min-h-screen pt-40">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Provider Profile</h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-xl">
          {editMode ? (
            <>
              <div className="mb-2">
                <label className="font-semibold">Full Name:</label>
                <input name="name" value={profile.name} onChange={handleChange} className="border rounded p-1 ml-2 w-full" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Email:</label>
                <input name="email" value={profile.email} onChange={handleChange} className="border rounded p-1 ml-2 w-full" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Phone:</label>
                <input name="phone" value={profile.phone} onChange={handleChange} className="border rounded p-1 ml-2 w-full" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Address:</label>
                <input name="address" value={profile.address} onChange={handleChange} className="border rounded p-1 ml-2 w-full" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Service Category:</label>
                <input name="serviceCategory" value={profile.serviceCategory} onChange={handleChange} className="border rounded p-1 ml-2 w-full" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Experience:</label>
                <input name="experience" value={profile.experience} onChange={handleChange} className="border rounded p-1 ml-2 w-full" />
              </div>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Save</button>
              <button onClick={() => setEditMode(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              <p><strong>Service Category:</strong> {profile.serviceCategory}</p>
              <p><strong>Experience:</strong> {profile.experience}</p>
              <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-500 text-white px-4 py-1 rounded">Edit</button>
            </>
          )}
        </div>

        <div className="mt-10">
          <ReviewList title="User Reviews of You" reviews={userReviews} />
        </div>
      </main>
    </div>
  );
}