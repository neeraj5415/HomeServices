
import { Link } from "react-router-dom";

export default function DashboardCard(){
    return(
         <div className="bg-blue-100 shadow-md border border-red-200 rounded-lg p-6 w-full max-w-xl text-center">
            <h3 className="text-xl font-semibold text-red-700">
                You havent booked any services yet
            </h3>
            <p className="text-gray-600 mt-2">
                Start by finding services near you
            </p>
            <Link
                to="/services"
                className="inline-block mt-4 px-6 py-2 bg-green-400 text-white rounded hover:bg-green-600 transition"
            >
                Book Now
            </Link>
        </div>
    )
}