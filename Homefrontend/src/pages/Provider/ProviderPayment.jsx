import { useParams } from "react-router-dom";
import Sidebar from "../../components/provider/Sidebar";

export default function ProviderPayment() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen pt-30">
      <Sidebar />
      <main className="flex-1 p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-shadow-lg">
          Payment for Booking #{id}
        </h1>

        <div className="bg-blue-200 p-6 rounded shadow max-w-xl mt-6">
          <p className="text-lg mb-4">Total Amount: ₹999</p>
          <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Confirm Payment
          </button>
        </div>
      </main>
    </div>
  );
}