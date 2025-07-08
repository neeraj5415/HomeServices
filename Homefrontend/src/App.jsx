import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';


import HomeHeader from "./components/Homepages/HomeHeader.jsx";
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';

import UserDashbord from './pages/user/UserDashbord.jsx';
import BookingService from "./pages/user/BookingService.jsx";
import BookForm from "./pages/user/BookingForm.jsx";
import UserProfile from './pages/user/UserProfile.jsx';
import SubmitReviewToProvider from "./pages/user/SubmitReviewToProvider.jsx";
import BookingHistory from './pages/user/BookingHistory.jsx';

import ProviderDashboard from "./pages/Provider/ProviderDashboard.jsx";
import ProviderProfile from "./pages/Provider/ProviderProfile.jsx";
import SubmitReviewToUser from "./pages/Provider/SubmitReviewToUser.jsx";
import ProviderBookings from "./pages/Provider/ProviderBookings.jsx";
import UsersRequests from "./pages/Provider/UserRequest.jsx";
import ProviderPayment from "./pages/Provider/ProviderPayment.jsx";

import AdminDashboard from './pages/admin/AdminDashborad.jsx';
import AdminUser from './pages/admin/AdminUsers.jsx';
import AdminProviders from './pages/admin/AdminProviders.jsx';
import AdminReviews from "./pages/admin/AdminReviews.jsx";
import AdminBooking from './pages/admin/AdminBooking.jsx';
import AdminServices from './pages/admin/AdminServices.jsx';

import WhoWeAre from "./components/Homepages/WhoWeAre.jsx";
import HomeFooter from "./components/Homepages/HomeFooter.jsx";

export default function App() {
  const location = useLocation();
  const path = location.pathname;

  // These pages should NOT show the header
  const hideHeaderRoutes = ["/login", "/signup"];
  const shouldShowHeader = !hideHeaderRoutes.includes(path);

  // Home page should NOT show WhoWeAre and Footer (it's already included there)
  const isHomePage = path === "/";

  return (
    <>
      {shouldShowHeader && <HomeHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


        <Route path="/user/UserDashbord" element={<UserDashbord />} />
        <Route path="/services" element={<BookingService />} />
        <Route path="/book/:serviceName" element={<BookForm />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/review/provider" element={<SubmitReviewToProvider />} />
        <Route path="/user/bookings" element={<BookingHistory />} />

        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/profile" element={<ProviderProfile />} />
        <Route path="/review/user" element={<SubmitReviewToUser />} />
        <Route path="/provider/bookings" element={<ProviderBookings />} />
        <Route path="/provider/requests" element={<UsersRequests />} />
        <Route path="/provider/payment/:id" element={<ProviderPayment />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUser />} />
        <Route path="/admin/providers" element={<AdminProviders />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/bookings" element={<AdminBooking />} />
        <Route path="/admin/services" element={<AdminServices />} />
      </Routes>

      {/* Only show on non-home pages */}
      {!isHomePage && (
        <>
          <WhoWeAre />
          <HomeFooter />
        </>
      )}
    </>
  );
}