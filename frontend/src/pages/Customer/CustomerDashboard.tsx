import { Link } from "react-router";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Heart, MessageSquare, TrendingUp, Clock, ArrowRight, Star } from "lucide-react";

export default function CustomerDashboard() {
  const savedOffers = [
    { id: 1, center: "Gold Star Finance", rate: "1.2%", location: "Colombo", rating: 4.5 },
    { id: 2, center: "City Gold Loans", rate: "1.8%", location: "Galle", rating: 4.7 },
  ];

  const recentComparisons = [
    { id: 1, date: "2026-05-28", offers: 3 },
    { id: 2, date: "2026-05-25", offers: 2 },
  ];

  const inquiries = [
    { id: 1, center: "Gold Star Finance", status: "Pending", date: "2026-05-29" },
    { id: 2, center: "Royal Pawning", status: "Replied", date: "2026-05-27" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="customer" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, John!</h1>
            <p className="text-gray-600">Here's what's happening with your account</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{savedOffers.length}</div>
              <div className="text-sm text-gray-600">Saved Offers</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{recentComparisons.length}</div>
              <div className="text-sm text-gray-600">Recent Comparisons</div>
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
              <div className="text-2xl font-bold text-gray-900 mb-1">1</div>
              <div className="text-sm text-gray-600">Pending Replies</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Saved Offers</h2>
                <Link to="/customer/favorites" className="text-amber-600 hover:text-amber-700 text-sm flex items-center space-x-1">
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {savedOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{offer.center}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-sm text-gray-600">{offer.location}</span>
                        <span className="text-sm flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{offer.rating}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-amber-600">{offer.rate}</div>
                      <div className="text-xs text-gray-600">per month</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
                <Link to="/customer/inquiries" className="text-amber-600 hover:text-amber-700 text-sm flex items-center space-x-1">
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{inquiry.center}</h3>
                      <div className="text-sm text-gray-600 mt-1">{inquiry.date}</div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        inquiry.status === "Replied"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
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
