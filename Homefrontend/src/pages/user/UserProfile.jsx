import Sidebar from '../../components/user/Sidebar.jsx'

export default function UserProfile(){
    return(
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 bg-red-200 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-red-800">My Profile</h1>

                <div className="bg-red-400 shadow-md rounded p-6 max-w-md m-10">
                    <p><strong>Name:</strong> User</p>
                    <p><strong>Email:</strong> Email</p>
                    <p><strong>Phone:</strong> Not provided</p>
                    <p><strong>Address:</strong>Not provided"</p>
                    <p><strong>Role:</strong>User</p>
                </div>
                <button type="submit" className="w-48 bg-blue-600 text-white py-2 rounded hover:bg-red-400 ">Edit Profile</button>
             </main>
        </div>
    )
}