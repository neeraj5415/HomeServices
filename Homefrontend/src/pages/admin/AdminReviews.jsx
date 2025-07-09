import { useState, useEffect } from "react";
import Sidebar from "../../components/admin/SideBar.jsx";
import ReviewList from "../../components/review/ReviewList";

export default function AdminReviews() {
  const [providerReviews, setProviderReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch all users to get their reviews
      const token = localStorage.getItem("token");
      const usersRes = await fetch("https://homeservices-5vng.onrender.com/api/auth/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = await usersRes.json();
      
      if (usersRes.ok) {
        const providers = usersData.filter(user => user.role === 'provider');
        const users = usersData.filter(user => user.role === 'user');
        
        // Fetch reviews for providers (reviews given to providers)
        const providerReviewsData = [];
        for (const provider of providers) {
          const reviewsRes = await fetch(`https://homeservices-5vng.onrender.com/api/reviews/user/${provider._id}`);
          const reviewsData = await reviewsRes.json();
          
          if (reviewsRes.ok) {
            providerReviewsData.push(...reviewsData.reviews.map(review => ({
              reviewerName: review.reviewer.name,
              rating: review.rating,
              comment: review.comment,
              date: new Date(review.createdAt).toLocaleDateString(),
              service: review.booking.service,
              reviewedProvider: provider.name
            })));
          }
        }
        setProviderReviews(providerReviewsData);
        
        // Fetch reviews for users (reviews given to users)
        const userReviewsData = [];
        for (const user of users) {
          const reviewsRes = await fetch(`https://homeservices-5vng.onrender.com/api/reviews/user/${user._id}`);
          const reviewsData = await reviewsRes.json();
          
          if (reviewsRes.ok) {
            userReviewsData.push(...reviewsData.reviews.map(review => ({
              reviewerName: review.reviewer.name,
              rating: review.rating,
              comment: review.comment,
              date: new Date(review.createdAt).toLocaleDateString(),
              service: review.booking.service,
              reviewedUser: user.name
            })));
          }
        }
        setUserReviews(userReviewsData);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen pt-40">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">All Ratings & Reviews</h1>

        {loading ? (
          <div className="text-center">
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <ReviewList title="Reviews Given to Providers" reviews={providerReviews} />
            </div>

            <div>
              <ReviewList title="Reviews Given to Users" reviews={userReviews} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}