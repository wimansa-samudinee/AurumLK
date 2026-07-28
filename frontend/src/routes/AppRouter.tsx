import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import BrowseOffers from "../pages/BrowseOffers";
import OfferDetails from "../pages/OfferDetails";
import CompareOffers from "../pages/CompareOffers";
import BrowseCenters from "../pages/BrowseCenters";
import CenterDetails from "../pages/CenterDetails";
import BranchDetails from "../pages/BranchDetails";
import Calculator from "../pages/Calculator";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

import CustomerDashboard from "../pages/Customer/CustomerDashboard";
import Favorites from "../pages/Customer/Favorites";
import MyInquiries from "../pages/Customer/MyInquiries";
import ProfileManagement from "../pages/Customer/ProfileManagement";

import BusinessDashboard from "../pages/business/BusinessDashboard";
import BusinessProfile from "../pages/business/BusinessProfile";
import BranchManagement from "../pages/business/BranchManagement";
import AddEditBranch from "../pages/business/AddEditBranch";
import OfferManagement from "../pages/business/OfferManagement";
import AddEditOffer from "../pages/business/AddEditOffer";
import InquiryManagement from "../pages/business/InquiryManagement";
import BusinessAnalytics from "../pages/business/BusinessAnalytics";

import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import BusinessApproval from "../pages/admin/BusinessApproval";
import AdminOfferManagement from "../pages/admin/AdminOfferManagement";
import ReportsAnalytics from "../pages/admin/ReportsAnalytics";

import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import HelpCenter from "../pages/HelpCenter";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/offers" element={<BrowseOffers />} />
      <Route path="/offers/:id" element={<OfferDetails />} />
      <Route path="/compare" element={<CompareOffers />} />
      <Route path="/centers" element={<BrowseCenters />} />
      <Route path="/centers/:id" element={<CenterDetails />} />
      <Route path="/branches/:id" element={<BranchDetails />} />
      <Route path="/calculator" element={<Calculator />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Customer Routes */}
      <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/favorites" element={<Favorites />} />
        <Route path="/customer/inquiries" element={<MyInquiries />} />
        <Route path="/customer/profile" element={<ProfileManagement />} />
      </Route>

      {/* Business Routes */}
      <Route element={<ProtectedRoute allowedRoles={["BUSINESS"]} />}>
        <Route path="/business/dashboard" element={<BusinessDashboard />} />
        <Route path="/business/profile" element={<BusinessProfile />} />
        <Route path="/business/branches" element={<BranchManagement />} />
        <Route path="/business/branches/add" element={<AddEditBranch />} />
        <Route path="/business/branches/edit/:id" element={<AddEditBranch />} />
        <Route path="/business/offers" element={<OfferManagement />} />
        <Route path="/business/offers/add" element={<AddEditOffer />} />
        <Route path="/business/offers/edit/:id" element={<AddEditOffer />} />
        <Route path="/business/inquiries" element={<InquiryManagement />} />
        <Route path="/business/analytics" element={<BusinessAnalytics />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/approvals" element={<BusinessApproval />} />
        <Route path="/admin/offers" element={<AdminOfferManagement />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
      </Route>
    </Routes>
  );
}