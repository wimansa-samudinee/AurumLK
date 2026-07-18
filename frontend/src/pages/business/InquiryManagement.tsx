import DashboardSidebar from "../../components/DashboardSidebar";
import { MessageSquare, Clock, CheckCircle, User } from "lucide-react";

export default function InquiryManagement() {
  const inquiries = [
    {
      id: 1,
      customer: "John Doe",
      email: "john@email.com",
      subject: "12-month loan inquiry",
      message: "I'm interested in your 12-month gold loan offer. Could you provide more details?",
      status: "new",
      date: "2026-05-30",
    },
    {
      id: 2,
      customer: "Jane Smith",
      email: "jane@email.com",
      subject: "Branch location",
      message: "Do you have any branches in Kandy?",
      status: "replied",
      date: "2026-05-29",
      reply: "Yes, we have a branch in Kandy at 45 Main Street...",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      email: "mike@email.com",
      subject: "Interest rates",
      message: "What are your current interest rates for premium loans?",
      status: "new",
      date: "2026-05-28",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiry Management</h1>
            <p className="text-gray-600">Manage customer inquiries and responses</p>
          </div>

          <div className="flex space-x-4 mb-6">
            <button className="px-4 py-2 bg-amber-500 text-white rounded-lg">All Inquiries</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">New</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Replied</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Closed</button>
          </div>

          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{inquiry.customer}</h3>
                        <p className="text-sm text-gray-600">{inquiry.email}</p>
                        <p className="text-xs text-gray-500 mt-1">{inquiry.date}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                        inquiry.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : inquiry.status === "replied"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {inquiry.status === "new" ? (
                        <>
                          <Clock className="w-4 h-4" />
                          <span>New</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Replied</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{inquiry.subject}</h4>
                    <p className="text-gray-600">{inquiry.message}</p>
                  </div>

                  {inquiry.status === "replied" && inquiry.reply && (
                    <div className="bg-green-50 border-l-4 border-green-500 rounded p-4 mb-4">
                      <div className="text-sm font-medium text-green-900 mb-1">Your Reply:</div>
                      <p className="text-green-800">{inquiry.reply}</p>
                    </div>
                  )}

                  {inquiry.status === "new" && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <textarea
                        rows={3}
                        placeholder="Type your reply..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 mb-3"
                      />
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                          Send Reply
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Mark as Closed
                        </button>
                      </div>
                    </div>
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

