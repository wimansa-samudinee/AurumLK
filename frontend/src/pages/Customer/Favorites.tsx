import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Heart, Star, Trash2, ArrowRight } from "lucide-react";
import * as api from "../../lib/api";

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("aurumlk_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("aurumlk_favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    async function load() {
      try {
        if (favoriteIds.length === 0) {
          setOffers([]);
          setLoading(false);
          return;
        }
        const fetched = await api.fetchOffers({ active: true });
        const filtered = fetched.filter((o: any) => favoriteIds.includes(o.id));
        setOffers(filtered);
      } catch (err) {
        console.error("Failed to load favorite offers:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [favoriteIds]);

  const removeFavorite = (id: string) => {
    setFavoriteIds(prev => prev.filter(fId => fId !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <DashboardSidebar role="customer" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Offers</h1>
            <p className="text-gray-600">Your favorited gold loan offers</p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-semibold">Loading saved offers...</div>
          ) : offers.length > 0 ? (
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {offer.title} - <span className="text-gray-500 font-normal">{offer.center?.name}</span>
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-600">{offer.center?.city || "Sri Lanka"}</span>
                            <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-semibold">{offer.type}</span>
                          </div>
                        </div>
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
                          <div className="text-sm text-gray-600">Rating</div>
                          <div className="text-lg font-semibold">{offer.center?.rating || 4.5} ⭐</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2 min-w-[150px]">
                      <Link
                        to={`/offers/${offer.id}`}
                        className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-center flex items-center justify-center space-x-2 font-semibold text-sm"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => removeFavorite(offer.id)}
                        className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors flex items-center justify-center space-x-2 font-semibold text-sm cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Offers Yet</h3>
              <p className="text-gray-600 mb-6">
                Start browsing offers and save your favorites for easy comparison.
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
