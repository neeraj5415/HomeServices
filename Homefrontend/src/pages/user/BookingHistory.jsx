export default function BookingHistory(){
    return(
        <div>
            <div className="p-6 bg-red-400">
                <h2 className="text-2xl font-bold mb-4 text-red-800">My Bookings</h2>
                <p className="text-red-800">No bookings found.</p>
                <div className="space-y-4">
                    <div className="p-4 bg-red-200 rounded shadow border flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-red-800">booking.service</p>
                            <p className="text-sm text-red-800">booking.date at booking.time</p>
                        </div>
                        <span className="px-3 py-1 rounded text-black text-sm font-medium bg-green-600">Complated</span>
                    </div>
                </div>
            </div>
        </div>
    )
}