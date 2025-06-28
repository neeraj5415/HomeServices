import SideBar from '../../components/user/Sidebar.jsx'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError("");
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/bookings/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (!res.ok) setError(data.message || "Failed to fetch bookings");
                else setBookings(data.bookings);
            } catch (err) {
                setError("Network error");
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleReview = (booking) => {
        // Navigate to review page with booking info
        navigate("/review/provider", { state: { selectedBooking: booking } });
    };

    return (
        <div className='flex min-h-screen bg-white pt-40'>
            <SideBar/>
            <div className="p-10 rounded-xl w-full">
                <h2 className="text-2xl font-bold mb-4 text-shadow-lg">My Bookings</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="p-8 bg-blue-100 rounded shadow border flex justify-between items-center">
                                <div>
                                    <p className="font-semibold ">{booking.service}</p>
                                    <p className="text-sm ">{booking.date}</p>
                                    <p className="text-sm ">Provider: {booking.provider?.name}</p>
                                    <p className="text-sm ">Status: {booking.status}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded text-black text-sm font-medium ${booking.status === 'accepted' ? 'bg-green-600' : booking.status === 'cancelled' ? 'bg-red-500' : booking.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-400'}`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                    {(booking.status === 'accepted' || booking.status === 'completed') && (
                                        <button
                                            onClick={() => handleReview(booking)}
                                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                                        >
                                            Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}