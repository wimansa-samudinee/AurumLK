import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import { MessageSquare, Clock, CheckCircle, XCircle, User } from "lucide-react";
import * as api from "../../lib/api";

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  async function loadData() {
    try {
      const fetched = await api.fetchInquiries();
      setInquiries(fetched);
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.updateInquiry(id, { status });
      loadData();
    } catch (err) {
      alert("Failed to update inquiry status.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ANSWERED":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Replied</span>
          </span>
        );
      case "NEW":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
            <Clock className="w-4 h-4" />
            <span>Pending</span>
          </span>
        );
      case "CLOSED":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
            <XCircle className="w-4 h-4" />
            <span>Closed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            <span>{status}</span>
          </span>
        );
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    if (activeTab === "new") return i.status === "NEW";
    if (activeTab === "replied") return i.status === "ANSWERED";
    if (activeTab === "closed") return i.status === "CLOSED";
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiry Management</h1>
            <p className="text-gray-600">Manage customer inquiries and responses</p>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${activeTab === "all" ? "bg-amber-500 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"}`}
            >
              All Inquiries
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${activeTab === "new" ? "bg-amber-500 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"}`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("replied")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${activeTab === "replied" ? "bg-amber-500 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"}`}
            >
              Replied
            </button>
            <button
              onClick={() => setActiveTab("closed")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${activeTab === "closed" ? "bg-amber-500 text-white" : "bg-white text-gray-700 border hover:bg-gray-50"}`}
            >
              Closed
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-semibold">Loading inquiries...</div>
          ) : (
            <div className="space-y-4">
              {filteredInquiries.map((inquiry) => (
                <div key={inquiry.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{inquiry.customer?.name}</h3>
                        <p className="text-sm text-gray-600">{inquiry.customer?.email}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div>{getStatusBadge(inquiry.status)}</div>
                  </div>

                  <div className="mb-4 pt-2 border-t">
                    <h4 className="font-semibold text-gray-900 mb-2">{inquiry.subject}</h4>
                    <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{inquiry.message}</p>
                  </div>

                  {inquiry.status === "NEW" && (
                    <div className="flex justify-end space-x-2 pt-4 border-t">
                      <button
                        onClick={() => handleUpdateStatus(inquiry.id, "ANSWERED")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm cursor-pointer"
                      >
                        Mark as Replied
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(inquiry.id, "CLOSED")}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm cursor-pointer"
                      >
                        Mark as Closed
                      </button>
                    </div>
                  )}

                  {inquiry.status === "ANSWERED" && (
                    <div className="flex justify-end pt-4 border-t">
                      <button
                        onClick={() => handleUpdateStatus(inquiry.id, "CLOSED")}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm cursor-pointer"
                      >
                        Close Inquiry
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {filteredInquiries.length === 0 && (
                <div className="py-12 text-center bg-white border rounded-lg text-gray-500 font-semibold">
                  No inquiries found in this tab.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
