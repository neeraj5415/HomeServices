import SideBar from '../../components/user/Sidebar.jsx'

export default function BookingHistory(){
    return(
        <div className='flex min-h-screen bg-white'>
            <SideBar/>
            <div className="p-10 ">
                <h2 className="text-2xl font-bold mb-4 text-shadow-lg">My Bookings</h2>
                <p className="">No bookings found.</p>
                <div className="space-y-4">
                    <div className="p-8 bg-blue-100 rounded shadow border flex justify-between items-center">
                        <div>
                            <p className="font-semibold ">booking.service</p>
                            <p className="text-sm ">booking.date at booking.time</p>
                        </div>
                        <span className="px-3 py-1 rounded text-black text-sm font-medium bg-green-600 ml-5">Complated</span>
                    </div>
                </div>
            </div>
        </div>
    )
}