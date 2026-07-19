import DashboardSidebar from "../../components/DashboardSidebar";
import { Building2, Mail, FileText, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import * as api from "../../lib/api";

export default function BusinessApproval() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const fetched = await api.fetchBusinessApprovals();
      setBusinesses(fetched);
    } catch (err) {
      console.error("Failed to load business approvals:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id: string) => {
    if (!window.confirm("Are you sure you want to approve this business?")) return;
    try {
      await api.approveBusiness(id);
      load();
    } catch (err) {
      alert("Failed to approve business.");
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm("Are you sure you want to reject/suspend this business?")) return;
    try {
      await api.rejectBusiness(id);
      load();
    } catch (err) {
      alert("Failed to reject business.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <DashboardSidebar role="admin" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Approvals</h1>
            <p className="text-gray-600">Review and approve business registrations</p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-semibold">Loading registrations...</div>
          ) : (
            <div className="space-y-6">
              {businesses.map((business) => (
                <div key={business.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{business.businessName}</h3>
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                          Pending Approval
                        </span>
                        <div className="mt-2 text-sm text-gray-500">Registered: {new Date(business.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{business.email}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Legal & License Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span>License Number: {business.licenseNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                      onClick={() => handleReject(business.id)}
                      className="flex items-center space-x-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-semibold text-sm cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject Registration</span>
                    </button>
                    <button
                      onClick={() => handleApprove(business.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve Registration</span>
                    </button>
                  </div>
                </div>
              ))}

              {businesses.length === 0 && (
                <div className="py-12 text-center bg-white border rounded-lg text-gray-500 font-semibold">
                  No pending registrations to approve.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
