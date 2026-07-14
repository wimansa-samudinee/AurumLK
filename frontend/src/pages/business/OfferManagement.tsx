import { Link } from "react-router";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Tag, Eye, MessageSquare, Edit, Trash2, Plus } from "lucide-react";

export default function OfferManagement() {
  const offers = [
    { id: 1, name: "Regular 12-Month Loan", rate: "1.2%", maxAmount: "10,000,000", status: "Active", views: 456, inquiries: 23 },
    { id: 2, name: "Premium 18-Month Loan", rate: "1.0%", maxAmount: "15,000,000", status: "Active", views: 389, inquiries: 18 },
    { id: 3, name: "Express 6-Month Loan", rate: "1.5%", maxAmount: "5,000,000", status: "Inactive", views: 234, inquiries: 12 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Offer Management</h1>
              <p className="text-gray-600">Manage your gold loan offers</p>
            </div>
            <Link
              to="/business/offers/add"
              className="flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Offer</span>
            </Link>
          </div>

          <div className="space-y-4">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{offer.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          offer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {offer.status}
                      </span>
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

                  <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
                    <button className="flex-1 md:flex-none px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      {offer.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
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

