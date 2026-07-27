import DashboardSidebar from "../../components/DashboardSidebar";
import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../../lib/api";

export default function MyInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const fetched = await api.fetchInquiries();
        setInquiries(fetched);
      } catch (err) {
        console.error("Failed to load inquiries:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <DashboardSidebar role="customer" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Inquiries</h1>
            <p className="text-gray-600">Track your inquiries and responses</p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-semibold">Loading inquiries...</div>
          ) : inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{inquiry.subject}</h3>
                          {getStatusBadge(inquiry.status)}
                        </div>
                        <p className="text-sm text-gray-600">To: {inquiry.business?.businessName || inquiry.offer?.center?.name || "Gold Loan Center"}</p>
                        <p className="text-xs text-gray-400 mt-1">Submitted on {new Date(inquiry.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700">
                      <strong>My Message:</strong>
                      <p className="mt-1 whitespace-pre-wrap">{inquiry.message}</p>
                    </div>

                    {/* Display reply if status is ANSWERED */}
                    {inquiry.status === "ANSWERED" && (
                      <div className="bg-green-50/50 rounded-lg border border-green-100 p-4 text-sm text-gray-800">
                        <strong>Response from {inquiry.business?.businessName || inquiry.offer?.center?.name || "Provider"}:</strong>
                        {inquiry.reply ? (
                          <p className="mt-2 whitespace-pre-wrap font-semibold text-gray-900 bg-white/60 p-3 rounded border border-green-200/50">
                            {inquiry.reply}
                          </p>
                        ) : (
                          <p className="mt-1 whitespace-pre-wrap font-medium">
                            The gold loan center reviewed your inquiry and replied. Please contact them at{" "}
                            <span className="text-amber-600 font-semibold">{inquiry.business?.email}</span> to finalize negotiations.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Inquiries Found</h3>
              <p className="text-gray-600 mb-6">
                You haven't submitted any inquiries yet. Find gold loan offers and ask questions!
              </p>
              <Link
                to="/offers"
                className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
              >
                Browse Offers
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}