import DashboardSidebar from "../../components/DashboardSidebar";
import { Tag, MapPin, MessageSquare, TrendingUp, Eye, Users } from "lucide-react";

export default function BusinessDashboard() {
  const stats = [
    { label: "Total Offers", value: "12", icon: Tag, color: "bg-blue-100 text-blue-600", change: "+2 this month" },
    { label: "Total Branches", value: "8", icon: MapPin, color: "bg-green-100 text-green-600", change: "+1 this month" },
    { label: "Total Inquiries", value: "45", icon: MessageSquare, color: "bg-amber-100 text-amber-600", change: "+12 this week" },
    { label: "Profile Views", value: "1,234", icon: Eye, color: "bg-purple-100 text-purple-600", change: "+234 this month" },
  ];

  const recentInquiries = [
    { id: 1, customer: "John Doe", subject: "12-month loan inquiry", date: "2026-05-30", status: "New" },
    { id: 2, customer: "Jane Smith", subject: "Branch location", date: "2026-05-29", status: "Replied" },
    { id: 3, customer: "Mike Johnson", subject: "Interest rates", date: "2026-05-28", status: "New" },
  ];

  const popularOffers = [
    { id: 1, name: "Regular 12-Month Loan", rate: "1.2%", views: 456, inquiries: 23 },
    { id: 2, name: "Premium 18-Month Loan", rate: "1.0%", views: 389, inquiries: 18 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard</h1>
            <p className="text-gray-600">Welcome back to Gold Star Finance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                <div className="text-xs text-green-600">{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Inquiries</h2>
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{inquiry.customer}</h3>
                      <p className="text-sm text-gray-600">{inquiry.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">{inquiry.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        inquiry.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Offers</h2>
              <div className="space-y-4">
                {popularOffers.map((offer) => (
                  <div key={offer.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{offer.name}</h3>
                      <span className="text-xl font-bold text-amber-600">{offer.rate}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{offer.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{offer.inquiries} inquiries</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-center">
                <Tag className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Create Offer</div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Add Branch</div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-center">
                <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">View Inquiries</div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-center">
                <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">View Analytics</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

