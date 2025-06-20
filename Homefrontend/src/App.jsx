import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import UserDashbord from './pages/user/UserDashbord.jsx';
import UserProfile from './pages/user/UserProfile.jsx';
import BookingHistory from './pages/user/BookingHistory.jsx';
import AdminDashboard from './pages/admin/AdminDashborad.jsx'; // note spelling fix

function App() {
  return (
      <Routes>
    
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/user/UserDashbord" element={<UserDashbord />} />
        <Route path="/user/UserProfile" element={<UserProfile />} />
        <Route path="/user/BookingHistory" element={<BookingHistory />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
  );
}

export default App;