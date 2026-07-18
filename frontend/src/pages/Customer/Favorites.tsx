import { Link } from "react-router";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Heart, Star, Trash2, ArrowRight } from "lucide-react";

export default function Favorites() {
  const favorites = [
    {
      id: 1,
      center: "Gold Star Finance",
      rate: "1.2%",
      maxAmount: "10,000,000",
      tenure: "12 months",
      rating: 4.5,
      location: "Colombo",
      savedDate: "2026-05-28",
    },
    {
      id: 2,
      center: "City Gold Loans",
      rate: "1.8%",
      maxAmount: "8,000,000",
      tenure: "9 months",
      rating: 4.7,
      location: "Galle",
      savedDate: "2026-05-26",
    },
    {
      id: 3,
      center: "Royal Pawning",
      rate: "1.3%",
      maxAmount: "15,000,000",
      tenure: "18 months",
      rating: 4.6,
      location: "Colombo",
      savedDate: "2026-05-25",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="customer" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Offers</h1>
            <p className="text-gray-600">Your favorited gold loan offers</p>
          </div>

          <div className="space-y-4">
            {favorites.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{offer.center}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">{offer.location}</span>
                          <span className="text-sm flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{offer.rating}</span>
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Saved on {offer.savedDate}</div>
                      </div>
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
                        <div className="text-sm text-gray-600">Tenure</div>
                        <div className="text-lg font-semibold">{offer.tenure}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Rating</div>
                        <div className="text-lg font-semibold">{offer.rating} ⭐</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                    <Link
                      to={`/offers/${offer.id}`}
                      className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-center flex items-center justify-center space-x-2"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      <span>Saved</span>
                    </button>
                    <button className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {favorites.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Offers Yet</h3>
              <p className="text-gray-600 mb-6">
                Start browsing offers and save your favorites for easy comparison
              </p>
              <Link
                to="/offers"
                className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
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

