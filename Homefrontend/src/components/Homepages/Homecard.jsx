export default function DashboardCard(){
    return(
        <div>
            <div className="bg-red-300 shadow rounded p-6 text-center w-full sm:w-1/2 lg:w-1/4">
                <h3 className="text-lg font-semibold text-red-800">You have not booked any services till yet</h3>
                <p className="text-2xl font-bold text-black-600 mt-2">Click here for book</p>
            </div>
        </div>
    )
}