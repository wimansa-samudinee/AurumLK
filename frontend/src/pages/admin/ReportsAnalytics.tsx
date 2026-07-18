import DashboardSidebar from "../../components/DashboardSidebar";
import { TrendingUp, Users, Building2, Tag, Download, Calendar } from "lucide-react";

export default function ReportsAnalytics() {
  const platformStats = [
    { month: "Jan", users: 1234, businesses: 120, offers: 398, inquiries: 2340 },
    { month: "Feb", users: 1298, businesses: 128, offers: 423, inquiries: 2567 },
    { month: "Mar", users: 1376, businesses: 135, offers: 445, inquiries: 2789 },
    { month: "Apr", users: 1445, businesses: 144, offers: 465, inquiries: 3012 },
    { month: "May", users: 1543, businesses: 156, offers: 487, inquiries: 3245 },
  ];

  const topBusinesses = [
    { name: "Gold Star Finance", offers: 12, views: 4567, inquiries: 234, rating: 4.5 },
    { name: "Royal Pawning", offers: 10, views: 3892, inquiries: 198, rating: 4.6 },
    { name: "City Gold Loans", offers: 10, views: 3654, inquiries: 187, rating: 4.7 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="admin" />

      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">Platform insights and performance metrics</p>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700">Date Range:</span>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">1,543</div>
              <div className="text-sm text-gray-600 mb-2">Total Users</div>
              <div className="text-xs text-green-600">+25% from last month</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">156</div>
              <div className="text-sm text-gray-600 mb-2">Active Businesses</div>
              <div className="text-xs text-green-600">+8% from last month</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Tag className="w-6 h-6 text-amber-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">487</div>
              <div className="text-sm text-gray-600 mb-2">Total Offers</div>
              <div className="text-xs text-green-600">+5% from last month</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">3,245</div>
              <div className="text-sm text-gray-600 mb-2">Total Inquiries</div>
              <div className="text-xs text-green-600">+8% from last month</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Growth</h2>
              <div className="space-y-4">
                {platformStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{stat.month}</span>
                      <span className="text-sm text-gray-600">{stat.users} users</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${(stat.users / 2000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Businesses</h2>
              <div className="space-y-4">
                {topBusinesses.map((business, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{business.name}</h3>
                      <span className="text-sm text-amber-600">{business.rating} ⭐</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="text-gray-600">Offers</div>
                        <div className="font-semibold">{business.offers}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Views</div>
                        <div className="font-semibold">{business.views}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Inquiries</div>
                        <div className="font-semibold">{business.inquiries}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <h4 className="font-semibold text-blue-900 mb-1">User Engagement</h4>
                <p className="text-sm text-blue-800">
                  Average session duration has increased by 15% this month, indicating improved user engagement.
                </p>
              </div>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <h4 className="font-semibold text-green-900 mb-1">Business Growth</h4>
                <p className="text-sm text-green-800">
                  12 new businesses registered this month, the highest growth rate in the past 6 months.
                </p>
              </div>
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                <h4 className="font-semibold text-amber-900 mb-1">Offer Activity</h4>
                <p className="text-sm text-amber-800">
                  487 active offers across the platform, with an average of 3.1 offers per business.
                </p>
              </div>
              <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                <h4 className="font-semibold text-purple-900 mb-1">Customer Satisfaction</h4>
                <p className="text-sm text-purple-800">
                  Overall platform rating stands at 4.6/5 based on customer reviews and feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

