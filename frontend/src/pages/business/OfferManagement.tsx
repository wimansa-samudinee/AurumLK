import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Tag, Edit, Trash2, Plus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";

export default function OfferManagement() {
  const { user } = useAuth();
  const [center, setCenter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    if (!user) return;
    try {
      const centers = await api.fetchCenters();
      const myCenter = centers.find(
        c => c.name.toLowerCase() === (user.businessName || "").toLowerCase()
      );
      setCenter(myCenter);
    } catch (err) {
      console.error("Failed to load offers:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    try {
      await api.deleteOffer(id);
      loadData();
    } catch (err) {
      alert("Failed to delete offer.");
    }
  };

  const offers = center?.offers || [];

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
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
              className="flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span>Create Offer</span>
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-semibold">Loading offers...</div>
          ) : offers.length > 0 ? (
            <div className="space-y-4">
              {offers.map((offer: any) => (
                <div key={offer.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{offer.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            offer.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {offer.active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Interest Rate</div>
                          <div className="text-lg font-semibold text-amber-600">{offer.rate}%/mo</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Max Amount</div>
                          <div className="text-lg font-semibold">LKR {offer.maxAmount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Tenure</div>
                          <div className="text-lg font-semibold">{offer.tenure}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Type</div>
                          <div className="text-lg font-semibold">{offer.type}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 flex items-center space-x-2">
                      <Link
                        to={`/business/offers/edit/${offer.id}`}
                        className="p-2.5 text-gray-600 hover:text-amber-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(offer.id)}
                        className="p-2.5 text-gray-600 hover:text-red-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Offers Created</h3>
              <p className="text-gray-600 mb-6">
                Create gold loan offers to attract customers to your pawning center.
              </p>
              <Link
                to="/business/offers/add"
                className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
              >
                Create Your First Offer
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
