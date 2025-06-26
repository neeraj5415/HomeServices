import Sidebar from "../../components/provider/Sidebar";
import ReviewList from "../../components/review/ReviewList";
import { useState } from "react";

export default function ProviderProfile() {
  const [profile, setProfile] = useState({
    name: "Raj Sharma",
    email: "raj@example.com",
    phone: "9876543210",
    serviceCategory: "Electrician",
    experience: "5 years",
  });
    const [editMode, setEditMode] = useState(false);

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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex min-h-screen pt-30">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Provider Profile</h2>

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
              <div className="mb-2">
                <label className="font-semibold">Service Category : </label>
                <input name="address" value={form.address} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <div className="mb-2">
                <label className="font-semibold">Experience : </label>
                <input name="address" value={form.address} onChange={handleChange} className="border rounded p-1 ml-2" />
              </div>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Save</button>
              <button onClick={() => setEditMode(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
            </>
          ) : (<div></div>)//(
            // <>
            //   <p><strong>Name:</strong> {user.name}</p>
            //   <p><strong>Email:</strong> {user.email}</p>
            //   <p><strong>Phone:</strong> {user.phone}</p>
            //   <p><strong>Address:</strong> {user.address}</p>
            //   <p><strong>Role:</strong> {user.role}</p>
            //   <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-500 text-white px-4 py-1 rounded">Edit</button>
            // </>
          //)
          }
        </div>

        <div className="mt-10">
          <ReviewList title="User Reviews of You" reviews={userReviews} />
        </div>
      </main>
    </div>
  );
}