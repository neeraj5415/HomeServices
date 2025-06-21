import ReviewForm from "../../components/review/ReviewForm.jsx";

export default function SubmitReviewToProvider() {
  const handleReviewSubmit = (review) => {
    console.log("User reviewing provider:", review);
    alert("Review submitted!");
    // You can send this data to the backend later
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Review Provider</h2>
      <ReviewForm reviewerRole="provider" onSubmit={handleReviewSubmit} />
    </div>
  );
}