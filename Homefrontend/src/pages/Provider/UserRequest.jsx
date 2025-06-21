import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/provider/Sidebar";

const initialRequests = [
  {
    id: 101,
    name: "Amit Verma",
    email: "amit.verma@gmail.com",
    service: "AC Repair",
    date: "2025-06-24",
    address: "789 Sector 21, Gurugram",
    notes: "Window AC making noise",
    status: "Pending",
  },
  {
    id: 102,
    name: "Riya Mehra",
    email: "riya.mehra@example.com",
    service: "Home Cleaning",
    date: "2025-06-27",
    address: "23/A Janakpuri, New Delhi",
    notes: "Full home deep clean needed",
    status: "Accepted",
  },
];

export default function UsersRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [showPaymentForm, setShowPaymentForm] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    accessories: "",
    amount: "",
    note: "",
  });

  const handleAccept = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: "Accepted" } : req
    );
    setRequests(updated);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPayment = (id) => {
    alert(
      `Payment confirmed for Booking #${id}\nAccessories: ${paymentDetails.accessories}\nAmount: ₹${paymentDetails.amount}\nNote: ${paymentDetails.note}`
    );
    window.open("https://pay.google.com/", "_blank"); // mock Google Pay
    // window.open("https://razorpay.com/payment-button/", "_blank"); // Or Razorpay
    setShowPaymentForm(null); // hide form after payment
  };

  return (
    <div className="flex min-h-screen pt-24">
      <Sidebar />
      <main className="flex-1 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-shadow-lg">
          User Booking Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-shadow-lg">No requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-green-100 p-5 rounded-lg shadow border"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-blue-600 text-lg">
                      {req.name} ({req.email})
                    </h3>
                    <p><strong>Service:</strong> {req.service}</p>
                    <p><strong>Date:</strong> {req.date}</p>
                    <p><strong>Address:</strong> {req.address}</p>
                    <p><strong>Notes:</strong> {req.notes || "No notes"}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`${
                          req.status === "Accepted"
                            ? "text-green-600"
                            : "text-yellow-600"
                        } font-medium`}
                      >
                        {req.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {req.status === "Pending" && (
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Accept Request
                      </button>
                    )}

                    {req.status === "Accepted" && (
                      <button
                        onClick={() =>
                          setShowPaymentForm(
                            showPaymentForm === req.id ? null : req.id
                          )
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Complete Task & Collect Payment
                      </button>
                    )}
                  </div>
                </div>

                {/* Payment Form */}
                {showPaymentForm === req.id && (
                  <div className="mt-4 bg-blue-100 p-4 rounded shadow">
                    <h4 className="font-semibold text-lg mb-2 text-shadow-lg">Enter Payment Details</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="accessories"
                        placeholder="Accessories Used"
                        value={paymentDetails.accessories}
                        onChange={handleFormChange}
                        className="w-full border px-4 py-2 rounded m-2"
                      />
                      <input
                        type="number"
                        name="amount"
                        placeholder="Total Amount (₹)"
                        value={paymentDetails.amount}
                        onChange={handleFormChange}
                        className="w-full border px-4 py-2 rounded m-2"
                      />
                      <textarea
                        name="note"
                        placeholder="Additional Note"
                        value={paymentDetails.note}
                        onChange={handleFormChange}
                        className="w-full border px-4 py-2 rounded m-2"
                      />
                      <button
                        onClick={() => handleConfirmPayment(req.id)}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition m-2"
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}