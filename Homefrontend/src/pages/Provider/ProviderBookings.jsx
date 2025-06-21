import Sidebar from "../../components/provider/Sidebar";

const mockBookings = [
  {
    id: 1,
    customer: "Neeraj Kumar",
    email: "neeraj@example.com",
    service: "Plumbing",
    date: "2025-06-25",
    address: "123 Main Street, Delhi",
    notes: "Fix leaking kitchen tap",
  },
  {
    id: 2,
    customer: "Priya Sharma",
    email: "priya@example.com",
    service: "Plumbing",
    date: "2025-06-26",
    address: "456 MG Road, Delhi",
    notes: "Bathroom pipe leakage",
  },
];

export default function ProviderBookings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6 text-shadow-lg">Your Bookings</h2>

        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-blue-100 shadow-md rounded-lg p-4 border"
            >
              <h3 className="text-lg font-semibold text-blue-600">
                {booking.customer} ({booking.email})
              </h3>
              <p className="text-gray-700">
                <strong>Service:</strong> {booking.service}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong> {booking.date}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {booking.address}
              </p>
              <p className="text-gray-700">
                <strong>Notes:</strong> {booking.notes || "None"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}