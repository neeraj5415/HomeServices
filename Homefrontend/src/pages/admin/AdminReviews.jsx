import Sidebar from "../../components/admin/SideBar.jsx";
import ReviewList from "../../components/review/ReviewList";

export default function AdminReviews() {
  const providerReviews = [
    {
      reviewerName: "Neeraj Kumar",
      rating: 5,
      comment: "Great service from provider!",
    },
    {
      reviewerName: "Ritika Singh",
      rating: 4,
      comment: "Punctual and polite.",
    },
  ];

  const userReviews = [
    {
      reviewerName: "Raj Sharma",
      rating: 5,
      comment: "User was cooperative and paid on time.",
    },
    {
      reviewerName: "Anita Mehra",
      rating: 3,
      comment: "User was late but understanding.",
    },
  ];

  return (
    <div className="flex min-h-screen pt-30">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">All Ratings & Reviews</h1>

        <div className="mb-12">
          <ReviewList title="Reviews Given to Providers" reviews={providerReviews} />
        </div>

        <div>
          <ReviewList title="Reviews Given to Users" reviews={userReviews} />
        </div>
      </main>
    </div>
  );
}