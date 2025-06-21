import Sidebar from "../../components/user/Sidebar";
import ReviewList from "../../components/review/ReviewList";

export default function UserProfile() {
  const user = {
    name: "Neeraj Kumar",
    email: "neeraj@example.com",
    phone: "9876543210",
    address: "Patna, Bihar",
    role: "User",
  };

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
    <div className="flex min-h-screen pt-30">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">User Profile</h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-xl">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <ReviewList title="Provider Reviews of You" reviews={providerReviews} />
      </main>
    </div>
  );
}