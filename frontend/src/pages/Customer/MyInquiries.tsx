import DashboardSidebar from "../../components/DashboardSidebar";
import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";

export default function MyInquiries() {
  const inquiries = [
    {
      id: 1,
      center: "Gold Star Finance",
      subject: "Inquiry about 12-month gold loan",
      message: "I'm interested in your 12-month gold loan offer. Could you provide more details?",
      status: "replied",
      date: "2026-05-29",
      reply: "Thank you for your inquiry. Our 12-month gold loan offers competitive rates starting at 1.2% per month...",
      replyDate: "2026-05-30",
    },
    {
      id: 2,
      center: "Royal Pawning",
      subject: "Question about maximum loan amount",
      message: "What is the maximum amount I can borrow for 18K gold items?",
      status: "pending",
      date: "2026-05-27",
    },
    {
      id: 3,
      center: "City Gold Loans",
      subject: "Branch location inquiry",
      message: "Do you have any branches in Kandy?",
      status: "replied",
      date: "2026-05-25",
      reply: "Yes, we have a branch in Kandy at 45 Main Street. Our hours are Monday-Friday 9AM-6PM...",
      replyDate: "2026-05-26",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "replied":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Replied</span>
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            <span>Pending</span>
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            <XCircle className="w-4 h-4" />
            <span>Closed</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="customer" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Inquiries</h1>
            <p className="text-gray-600">Track your inquiries and responses</p>
          </div>

          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{inquiry.subject}</h3>
                        {getStatusBadge(inquiry.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-medium">{inquiry.center}</span>
                        <span>•</span>
                        <span>{inquiry.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 mb-1">Your Message:</div>
                        <p className="text-gray-600">{inquiry.message}</p>
                      </div>
                    </div>
                  </div>

                  {inquiry.status === "replied" && inquiry.reply && (
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium text-blue-900">Response from {inquiry.center}:</div>
                            <div className="text-xs text-blue-700">{inquiry.replyDate}</div>
                          </div>
                          <p className="text-blue-800">{inquiry.reply}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t">
                  <button className="text-sm text-gray-600 hover:text-gray-900">View Details</button>
                  {inquiry.status === "replied" && (
                    <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                      Mark as Closed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}