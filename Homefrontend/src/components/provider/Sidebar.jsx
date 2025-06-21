import { Link } from "react-router-dom";

export default function Sidebar(){
    return(
        <div>
             <aside className="w-64 bg-red-100 text-shadow-lg h-screen p-6">
                <h2 className="text-xl font-bold mb-6">Provider Panel</h2>
                <nav className="space-y-3 text-lg mt-6">
                    <Link to="/UserProfile" className="block px-4 py-2 rounded hover:bg-red-300">Profile</Link>
                    <Link to="/BookingHistory" className="block px-4 py-2 rounded hover:bg-red-300">Booking History</Link>
                    <Link to="/Settings" className="block px-4 py-2 rounded hover:bg-red-300">All Requests</Link>
                </nav>
            </aside>
        </div>
    )
}