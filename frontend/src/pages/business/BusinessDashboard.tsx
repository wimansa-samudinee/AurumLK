import DashboardSidebar from "../../components/DashboardSidebar";
import { Tag, MapPin, MessageSquare, Clock, Eye, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";
import { Link } from "react-router-dom";

export default function BusinessDashboard() {
  const { user } = useAuth();
  const [center, setCenter] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        // Find center belonging to this business name
        const centers = await api.fetchCenters();
        const myCenter = centers.find(
          c => c.name.toLowerCase() === (user.businessName || "").toLowerCase()
        );
        setCenter(myCenter);

        // Fetch inquiries addressed to this merchant
        const fetchedInquiries = await api.fetchInquiries();
        setInquiries(fetchedInquiries);
      } catch (err) {
        console.error("Failed to load business stats:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  const totalOffers = center?.offers?.length || 0;
  const totalBranches = center?.branches?.length || 0;
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter(i => i.status === "NEW").length;

  const stats = [
    { label: "Total Offers", value: totalOffers, icon: Tag, color: "bg-blue-100 text-blue-600" },
    { label: "Total Branches", value: totalBranches, icon: MapPin, color: "bg-green-100 text-green-600" },
    { label: "Total Inquiries", value: totalInquiries, icon: MessageSquare, color: "bg-amber-100 text-amber-600" },
    { label: "Pending Replies", value: pendingInquiries, icon: Clock, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard</h1>
            <p className="text-gray-600">Welcome back to {user?.businessName || "your Pawning Portal"}</p>
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
                {/* Inquiries */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
                    <Link to="/business/inquiries" className="text-amber-600 hover:text-amber-700 text-sm font-semibold">View All</Link>
                  </div>
                  <div className="space-y-4">
                    {inquiries.slice(0, 3).map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{inquiry.customer?.name}</h3>
                          <p className="text-sm text-gray-600">{inquiry.subject}</p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            inquiry.status === "NEW"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {inquiry.status === "NEW" ? "Pending" : "Replied"}
                        </span>
                      </div>
                    ))}
                    {inquiries.length === 0 && (
                      <p className="text-sm text-gray-500 py-6 text-center">No customer inquiries received yet.</p>
                    )}
                  </div>
                </div>

                {/* Popular Offers */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Active Offers</h2>
                    <Link to="/business/offers" className="text-amber-600 hover:text-amber-700 text-sm font-semibold">Manage Offers</Link>
                  </div>
                  <div className="space-y-4">
                    {center?.offers?.slice(0, 3).map((offer: any) => (
                      <div key={offer.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                          <span className="text-sm font-bold text-amber-600">{offer.rate}%/mo</span>
                        </div>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>Max Amount: LKR {offer.maxAmount.toLocaleString()}</span>
                          <span>Tenure: {offer.tenure}</span>
                        </div>
                      </div>
                    ))}
                    {(!center?.offers || center?.offers.length === 0) && (
                      <p className="text-sm text-gray-500 py-6 text-center">No active offers created yet.</p>
                    )}
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
