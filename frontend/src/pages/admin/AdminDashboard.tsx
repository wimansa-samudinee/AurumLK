import DashboardSidebar from "../../components/DashboardSidebar";
import { Users, Building2, Tag, AlertCircle, TrendingUp, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,543", icon: Users, color: "bg-blue-100 text-blue-600", change: "+48 this month" },
    { label: "Registered Businesses", value: "156", icon: Building2, color: "bg-green-100 text-green-600", change: "+12 this month" },
    { label: "Active Offers", value: "487", icon: Tag, color: "bg-amber-100 text-amber-600", change: "+23 this week" },
    { label: "Pending Approvals", value: "8", icon: AlertCircle, color: "bg-red-100 text-red-600", change: "Needs attention" },
  ];

  const recentActivity = [
    { id: 1, type: "New Business", name: "Diamond Finance", action: "registered", date: "2026-05-30", status: "Pending" },
    { id: 2, type: "New Offer", name: "Gold Star Finance", action: "created offer", date: "2026-05-30", status: "Active" },
    { id: 3, type: "New User", name: "John Doe", action: "registered", date: "2026-05-29", status: "Active" },
  ];

  const pendingApprovals = [
    { id: 1, business: "Diamond Finance", type: "Business Registration", submitted: "2026-05-30" },
    { id: 2, business: "Sunrise Loans", type: "New Branch", submitted: "2026-05-29" },
    { id: 3, business: "Royal Pawning", type: "Offer Update", submitted: "2026-05-28" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="admin" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Platform overview and management</p>
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
                <div className={`text-xs ${index === 3 ? 'text-red-600' : 'text-green-600'}`}>{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Pending Approvals</h2>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  {pendingApprovals.length}
                </span>
              </div>
              <div className="space-y-3">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{approval.business}</h3>
                      <p className="text-sm text-gray-600">{approval.type}</p>
                      <p className="text-xs text-gray-500 mt-1">Submitted: {approval.submitted}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{activity.name}</span>
                        <span className="text-xs text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${
                        activity.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Platform Health</h3>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">System Status</span>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Database</span>
                  <span className="text-green-600 font-medium">Healthy</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">API Response</span>
                  <span className="text-green-600 font-medium">125ms</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">User Growth</h3>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Month</span>
                  <span className="text-blue-600 font-medium">+48 users</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className="text-blue-600 font-medium">+3.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Users</span>
                  <span className="text-blue-600 font-medium">1,234</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Business Activity</h3>
                <Building2 className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Businesses</span>
                  <span className="text-amber-600 font-medium">148</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">New This Month</span>
                  <span className="text-amber-600 font-medium">+12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Offers</span>
                  <span className="text-amber-600 font-medium">487</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

