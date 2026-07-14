import DashboardSidebar from "../../components/DashboardSidebar";
import { TrendingUp, Users, Eye, MessageSquare } from "lucide-react";

export default function BusinessAnalytics() {
  const monthlyData = [
    { month: "Jan", views: 450, inquiries: 28, conversions: 12 },
    { month: "Feb", views: 523, inquiries: 35, conversions: 15 },
    { month: "Mar", views: 612, inquiries: 42, conversions: 18 },
    { month: "Apr", views: 734, inquiries: 51, conversions: 22 },
    { month: "May", views: 856, inquiries: 63, conversions: 27 },
  ];

  const topOffers = [
    { name: "Regular 12-Month Loan", views: 456, inquiries: 23, conversion: "5.0%" },
    { name: "Premium 18-Month Loan", views: 389, inquiries: 18, conversion: "4.6%" },
    { name: "Express 6-Month Loan", views: 234, inquiries: 12, conversion: "5.1%" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Analytics</h1>
            <p className="text-gray-600">Track your performance and insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">2,765</div>
              <div className="text-sm text-gray-600 mb-2">Total Views</div>
              <div className="text-xs text-green-600">+15% from last month</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">187</div>
              <div className="text-sm text-gray-600 mb-2">Total Inquiries</div>
              <div className="text-xs text-green-600">+23% from last month</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">94</div>
              <div className="text-sm text-gray-600 mb-2">Conversions</div>
              <div className="text-xs text-green-600">+18% from last month</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">5.1%</div>
              <div className="text-sm text-gray-600 mb-2">Conversion Rate</div>
              <div className="text-xs text-green-600">+0.3% from last month</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Performance</h2>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${(data.views / 1000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-16">{data.views} views</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-20">{data.inquiries} inquiries</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Offers</h2>
              <div className="space-y-4">
                {topOffers.map((offer, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">{offer.name}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Views</div>
                        <div className="font-semibold">{offer.views}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Inquiries</div>
                        <div className="font-semibold">{offer.inquiries}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Conversion</div>
                        <div className="font-semibold text-green-600">{offer.conversion}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Insights & Recommendations</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Growing Interest</h4>
                  <p className="text-sm text-blue-800">
                    Your 12-Month Regular Loan has seen a 25% increase in views this month. Consider creating similar offers.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <MessageSquare className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">High Engagement</h4>
                  <p className="text-sm text-green-800">
                    Your average response time to inquiries is 2 hours, which is excellent. Keep up the good work!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
