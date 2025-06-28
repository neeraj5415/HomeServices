import Sidebar from "../../components/provider/Sidebar";
import ReviewList from "../../components/review/ReviewList";
import { useState, useEffect } from "react";

export default function ProviderProfile() {
  const [profile, setProfile] = useState({
    name: "Raj Sharma",
    email: "raj@example.com",
    phone: "9876543210",
    serviceCategory: "Electrician",
    experience: "5 years",
  });
  const [editMode, setEditMode] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchReviews();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProfile({
          name: data.name || "Provider",
          email: data.email || "",
          phone: data.phone || "",
          serviceCategory: data.services?.map(s => s.name).join(", ") || "No services",
          experience: "5 years", // This could be added to user model later
        });
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await res.json();
      
      if (res.ok && userData._id) {
        const reviewsRes = await fetch(`http://localhost:5000/api/reviews/user/${userData._id}`);
        const reviewsData = await reviewsRes.json();
        
        if (reviewsRes.ok) {
          setReviews(reviewsData.reviews.map(review => ({
            reviewerName: review.reviewer.name,
            rating: review.rating,
            comment: review.comment,
            date: new Date(review.createdAt).toLocaleDateString(),
            service: review.booking.service
          })));
        }
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex min-h-screen pt-40">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Provider Profile</h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-xl">
          {editMode ? (
            <>
              <div className="mb-2">
                <label className="font-semibold">Full Name : </label>
                <input name="name" value={profile.name} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Email : </label>
                <input name="email" value={profile.email} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Phone : </label>
                <input name="phone" value={profile.phone} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Service Category : </label>
                <input name="serviceCategory" value={profile.serviceCategory} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Experience : </label>
                <input name="experience" value={profile.experience} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Save</button>
              <button onClick={() => setEditMode(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Service Category:</strong> {profile.serviceCategory}</p>
              <p><strong>Experience:</strong> {profile.experience}</p>
              <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-500 text-white px-4 py-1 rounded">Edit</button>
            </>
          )}
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="text-center">
              <p className="text-gray-600">Loading reviews...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <ReviewList title="User Reviews of You" reviews={reviews} />
          )}
        </div>
      </main>
    </div>
  );
}