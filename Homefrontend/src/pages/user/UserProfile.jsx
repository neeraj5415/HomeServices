import Sidebar from "../../components/user/Sidebar";
import ReviewList from "../../components/review/ReviewList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
        });
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch("http://localhost:5000/api/auth/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      // handle error
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Profile not found</div>;

  const providerReviews = [
    {
      reviewerName: "Ravi Provider",
      rating: 5,
      comment: "Great experience with Neeraj. Very polite and punctual!",
    },
    {
      reviewerName: "Asha Service",
      rating: 4,
      comment: "Smooth communication and prompt response.",
    },
  ];

  return (
    <div className="flex min-h-screen pt-40">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-xl">
          {editMode ? (
            <>
              <div className="mb-2">
                <label className="font-semibold">Name: </label>
                <input name="name" value={form.name} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Email: </label>
                <input name="email" value={form.email} onChange={handleChange} className="border rounded p-1 ml-2" placeholder="enter email address" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Phone: </label>
                <input name="phone" value={form.phone} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Address: </label>
                <input name="address" value={form.address} onChange={handleChange} className="border rounded p-1 ml-2" placeholder="enter address" />
              </div>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Save</button>
              <button onClick={() => setEditMode(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email ? user.email : <span style={{color:'#b0b0b0'}}>enter email address</span>}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address ? user.address : <span style={{color:'#b0b0b0'}}>enter address</span>}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-500 text-white px-4 py-1 rounded">Edit</button>
            </>
          )}
        </div>
        <ReviewList title="Provider Reviews of You" reviews={providerReviews} />
      </main>
    </div>
  );
}