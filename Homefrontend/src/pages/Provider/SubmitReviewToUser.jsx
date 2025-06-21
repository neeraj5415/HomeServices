import ReviewForm from "../../components/review/ReviewForm.jsx";

export default function SubmitReviewToUser() {
  const handleReviewSubmit = (review) => {
    console.log("Provider reviewing user:", review);
    alert("Review submitted!");
    // You can send this data to the backend later
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Review User</h2>
      <ReviewForm reviewerRole="user" onSubmit={handleReviewSubmit} />
    </div>
  );
}