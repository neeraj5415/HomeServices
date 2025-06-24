import SideBar from '../../components/user/Sidebar.jsx'
import { useEffect, useState } from 'react';

export default function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    return (
        <div className='flex min-h-screen bg-white pt-30'>
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
                                <span className={`px-3 py-1 rounded text-black text-sm font-medium ml-5 ${booking.status === 'accepted' ? 'bg-green-600' : booking.status === 'cancelled' ? 'bg-red-500' : 'bg-yellow-400'}`}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}