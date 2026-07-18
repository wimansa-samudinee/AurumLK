import { Link } from "react-router";
import DashboardSidebar from "../../components/DashboardSidebar";
import { MapPin, Phone, Clock, Edit, Trash2, Plus } from "lucide-react";

export default function BranchManagement() {
  const branches = [
    { id: 1, name: "Main Branch", address: "123 Main St, Colombo 03", phone: "+94 11 234 5678", status: "Active" },
    { id: 2, name: "Kandy Branch", address: "45 Main St, Kandy", phone: "+94 81 234 5678", status: "Active" },
    { id: 3, name: "Galle Branch", address: "78 Beach Rd, Galle", phone: "+94 91 234 5678", status: "Active" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Branch Management</h1>
              <p className="text-gray-600">Manage your branch locations</p>
            </div>
            <Link
              to="/business/branches/add"
              className="flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Branch</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{branch.name}</h3>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      {branch.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-600">{branch.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{branch.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Mon-Fri: 9AM-6PM</span>
                  </div>
                </div>

                <button className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

