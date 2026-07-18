import DashboardSidebar from "../../components/DashboardSidebar";
import { Building2, Mail, Phone, FileText, CheckCircle, XCircle } from "lucide-react";

export default function BusinessApproval() {
  const pendingBusinesses = [
    {
      id: 1,
      name: "Diamond Finance",
      email: "info@diamond.lk",
      phone: "+94 11 345 6789",
      license: "CB/PL/2026/145",
      submitted: "2026-05-30",
      documents: 4,
    },
    {
      id: 2,
      name: "Sunrise Loans",
      email: "contact@sunrise.lk",
      phone: "+94 11 456 7890",
      license: "CB/PL/2026/146",
      submitted: "2026-05-29",
      documents: 5,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="admin" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Approvals</h1>
            <p className="text-gray-600">Review and approve business registrations</p>
          </div>

          <div className="space-y-6">
            {pendingBusinesses.map((business) => (
              <div key={business.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{business.name}</h3>
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        Pending Review
                      </span>
                      <div className="mt-2 text-sm text-gray-500">Submitted: {business.submitted}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{business.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{business.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">License: {business.license}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Submitted Documents</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">Business License</span>
                        <button className="text-xs text-amber-600 hover:text-amber-700">View</button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">Registration Certificate</span>
                        <button className="text-xs text-amber-600 hover:text-amber-700">View</button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">ID Proof</span>
                        <button className="text-xs text-amber-600 hover:text-amber-700">View</button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">Address Proof</span>
                        <button className="text-xs text-amber-600 hover:text-amber-700">View</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve Business</span>
                    </button>
                    <button className="flex items-center space-x-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                      <XCircle className="w-4 h-4" />
                      <span>Reject Application</span>
                    </button>
                    <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Request More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pendingBusinesses.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
              <p className="text-gray-600">No pending business approvals at the moment</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

