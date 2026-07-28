import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { UserRole } from "../lib/types";
import { Clock } from "lucide-react";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #fff8f4 0%, #fffbea 60%, #fff4e0 100%)" }}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" style={{ borderColor: "#f15a14", borderTopColor: "transparent" }}></div>
          <p className="font-semibold text-lg" style={{ color: "#f15a14" }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "BUSINESS" && !user.approved) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #fff8f4 0%, #fffbea 60%, #fff4e0 100%)" }}>
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Verification Pending</h1>
          <p className="text-gray-600 mb-6">
            Your business account <strong>{user.businessName}</strong> is currently pending administrator verification. We will verify your license details and approve your portal access shortly.
          </p>
          <button
            onClick={logout}
            className="w-full py-3 text-white rounded-xl shadow-md transition-all font-semibold cursor-pointer"
            style={{ background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === "BUSINESS") {
      return <Navigate to="/business/dashboard" replace />;
    } else {
      return <Navigate to="/customer/dashboard" replace />;
    }
  }

  return <Outlet />;
}
