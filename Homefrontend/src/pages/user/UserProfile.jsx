import Sidebar from '../../components/user/Sidebar.jsx'

export default function UserProfile(){
    return(
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-shadow-lg">My Profile</h1>

                <div className="bg-blue-100 shadow-md rounded p-6 max-w-md m-10">
                    <p><strong>Name: </strong> User</p>
                    <p><strong>Email: </strong> Email</p>
                    <p><strong>Phone: </strong> Not provided</p>
                    <p><strong>Address: </strong>Not provided"</p>
                    <p><strong>Role: </strong>User</p>
                </div>
                <button type="submit" className="w-48 bg-green-400 text-white py-2 rounded hover:bg-green-600 ">Edit Profile</button>
             </main>
        </div>
    )
}