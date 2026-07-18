import DashboardSidebar from "../../components/DashboardSidebar";
import { Tag, Eye, MessageSquare, Building2, Ban, CheckCircle } from "lucide-react";

export default function AdminOfferManagement() {
  const offers = [
    {
      id: 1,
      name: "Regular 12-Month Loan",
      business: "Gold Star Finance",
      rate: "1.2%",
      maxAmount: "10,000,000",
      status: "Active",
      views: 456,
      inquiries: 23,
    },
    {
      id: 2,
      name: "Premium 18-Month Loan",
      business: "Royal Pawning",
      rate: "1.0%",
      maxAmount: "15,000,000",
      status: "Active",
      views: 389,
      inquiries: 18,
    },
    {
      id: 3,
      name: "Express 6-Month Loan",
      business: "City Gold Loans",
      rate: "1.5%",
      maxAmount: "5,000,000",
      status: "Under Review",
      views: 0,
      inquiries: 0,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="admin" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Offer Management</h1>
            <p className="text-gray-600">Monitor and manage all platform offers</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search offers..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex space-x-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>All Businesses</option>
                  <option>Gold Star Finance</option>
                  <option>Royal Pawning</option>
                  <option>City Gold Loans</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Under Review</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{offer.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          offer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : offer.status === "Under Review"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <Building2 className="w-4 h-4" />
                      <span>{offer.business}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Interest Rate</div>
                        <div className="text-lg font-semibold text-amber-600">{offer.rate}/mo</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Max Amount</div>
                        <div className="text-lg font-semibold">LKR {offer.maxAmount}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Views</div>
                        <div className="text-lg font-semibold flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span>{offer.views}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Inquiries</div>
                        <div className="text-lg font-semibold flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          <span>{offer.inquiries}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                    {offer.status === "Under Review" ? (
                      <>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                          Reject
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
                          <Ban className="w-4 h-4" />
                          <span>Suspend</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

