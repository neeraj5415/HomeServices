import Sidebar from "../../components/user/Sidebar";
import ReviewList from "../../components/review/ReviewList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://homeservices-5vng.onrender.com/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
        });
        fetchReviews(res.data._id);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const fetchReviews = async (userId) => {
    try {
      setReviewsLoading(true);
      const res = await fetch(`https://homeservices-5vng.onrender.com/api/reviews/user/${userId}`);
      const data = await res.json();
      
      if (res.ok) {
        setReviews(data.reviews.map(review => ({
          reviewerName: review.reviewer.name,
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.createdAt).toLocaleDateString(),
          service: review.booking.service
        })));
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch("https://homeservices-5vng.onrender.com/api/auth/profile", form, {
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

  return (
    <div className="flex min-h-screen pt-40">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-xl">
          {editMode ? (
            <>
              <div className="mb-2">
                <label className="font-semibold">Full Name : </label>
                <input name="name" value={form.name} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Email : </label>
                <input name="email" value={form.email} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Phone : </label>
                <input name="phone" value={form.phone} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Address: </label>
                <input name="address" value={form.address} onChange={handleChange} className="border rounded p-1 ml-2" />
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
        
        {reviewsLoading ? (
          <div className="text-center">
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : (
          <ReviewList title="Provider Reviews of You" reviews={reviews} />
        )}
      </main>
    </div>
  );
}