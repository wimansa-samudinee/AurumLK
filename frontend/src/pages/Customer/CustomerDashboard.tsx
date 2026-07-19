import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Heart, MessageSquare, TrendingUp, Clock, ArrowRight, Star } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [savedOffers, setSavedOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Favorites & Compare from LocalStorage
  const [favoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("aurumlk_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("aurumlk_compare");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    async function load() {
      try {
        // Fetch inquiries
        const fetchedInquiries = await api.fetchInquiries();
        setInquiries(fetchedInquiries);

        // Fetch favorites detailed info
        if (favoriteIds.length > 0) {
          const fetchedOffers = await api.fetchOffers({ active: true });
          const filtered = fetchedOffers.filter((o: any) => favoriteIds.includes(o.id));
          setSavedOffers(filtered.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load customer stats:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [favoriteIds]);

  const pendingReplies = inquiries.filter(i => i.status === "NEW").length;

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <DashboardSidebar role="customer" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, {user?.name || "Customer"}!</h1>
            <p className="text-gray-600">Here's what's happening with your account</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{favoriteIds.length}</div>
              <div className="text-sm text-gray-600">Saved Offers</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{compareIds.length}</div>
              <div className="text-sm text-gray-600">Offers in Compare</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{inquiries.length}</div>
              <div className="text-sm text-gray-600">Total Inquiries</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{pendingReplies}</div>
              <div className="text-sm text-gray-600">Pending Replies</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Saved Offers Panel */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Saved Offers</h2>
                <Link to="/customer/favorites" className="text-amber-600 hover:text-amber-700 text-sm flex items-center space-x-1 font-semibold">
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : savedOffers.length > 0 ? (
                <div className="space-y-4">
                  {savedOffers.map((offer) => (
                    <div key={offer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600">{offer.center?.name}</span>
                          <span className="text-sm flex items-center space-x-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{offer.center?.rating || 4.5}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-amber-600">{offer.rate}%</div>
                        <div className="text-xs text-gray-600">per month</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-gray-500">No saved offers yet.</div>
              )}
            </div>

            {/* Inquiries Panel */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
                <Link to="/customer/inquiries" className="text-amber-600 hover:text-amber-700 text-sm flex items-center space-x-1 font-semibold">
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : inquiries.length > 0 ? (
                <div className="space-y-4">
                  {inquiries.slice(0, 3).map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{inquiry.subject}</h3>
                        <div className="text-sm text-gray-600 mt-1">{inquiry.business?.businessName || "Gold Loan Center"}</div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          inquiry.status === "ANSWERED"
                            ? "bg-green-100 text-green-700"
                            : inquiry.status === "NEW"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {inquiry.status === "NEW" ? "Pending" : inquiry.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-gray-500">No inquiries submitted yet.</div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Looking for a Gold Loan?</h2>
                <p className="text-amber-50">Compare offers and find the best rates today</p>
              </div>
              <Link
                to="/offers"
                className="px-6 py-3 bg-white text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-semibold"
              >
                Browse Offers
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
