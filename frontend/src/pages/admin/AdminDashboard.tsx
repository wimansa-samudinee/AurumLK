import DashboardSidebar from "../../components/DashboardSidebar";
import { Users, Building2, Tag, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../../lib/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const fetchedUsers = await api.fetchUsers();
        setUsers(fetchedUsers);

        const fetchedOffers = await api.fetchOffers();
        setOffers(fetchedOffers);

        const fetchedApprovals = await api.fetchBusinessApprovals();
        setApprovals(fetchedApprovals);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalUsers = users.length;
  const totalBusinesses = users.filter(u => u.role === "BUSINESS").length;
  const activeOffers = offers.filter(o => o.active).length;
  const pendingApprovalsCount = approvals.length;

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Registered Businesses", value: totalBusinesses, icon: Building2, color: "bg-green-100 text-green-600" },
    { label: "Active Offers", value: activeOffers, icon: Tag, color: "bg-amber-100 text-amber-600" },
    { label: "Pending Approvals", value: pendingApprovalsCount, icon: AlertCircle, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <DashboardSidebar role="admin" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Platform overview and management</p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-semibold">Loading stats...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Pending Approvals Panel */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Pending Approvals</h2>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      {approvals.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {approvals.map((approval) => (
                      <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{approval.businessName}</h3>
                          <div className="text-sm text-gray-600 mt-1">License: {approval.licenseNumber}</div>
                        </div>
                        <Link
                          to="/admin/approvals"
                          className="px-4 py-1.5 bg-amber-500 text-white rounded text-sm font-semibold hover:bg-amber-600"
                        >
                          Review
                        </Link>
                      </div>
                    ))}
                    {approvals.length === 0 && (
                      <p className="text-sm text-gray-500 py-6 text-center">No pending approvals at the moment.</p>
                    )}
                  </div>
                </div>

                {/* User Directory quick stats */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Platform Signups</h2>
                  <div className="space-y-4">
                    {users.slice(0, 4).map((userItem) => (
                      <div key={userItem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900">{userItem.name}</div>
                          <div className="text-xs text-gray-500">{userItem.email}</div>
                        </div>
                        <span className="px-2.5 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                          {userItem.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
