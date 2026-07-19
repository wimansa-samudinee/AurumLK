import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { X, Check, ArrowRight } from "lucide-react";
import * as api from "../lib/api";

export default function CompareOffers() {
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("aurumlk_compare");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("aurumlk_compare", JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    async function load() {
      try {
        if (compareIds.length === 0) {
          setOffers([]);
          setLoading(false);
          return;
        }
        const fetched = await api.fetchOffers({ active: true });
        const filtered = fetched.filter((o: any) => compareIds.includes(o.id));
        setOffers(filtered);
      } catch (err) {
        console.error("Failed to load offers for comparison:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [compareIds]);

  const removeCompare = (id: string) => {
    setCompareIds(prev => prev.filter(cId => cId !== id));
  };

  const comparisonRows = [
    { label: "Interest Rate (Monthly)", key: "rate", suffix: "%" },
    { label: "Maximum Loan Amount", key: "maxAmount", prefix: "LKR " },
    { label: "Loan Tenure", key: "tenure" },
    { label: "Rating", key: "rating", suffix: " ⭐" },
    { label: "Type", key: "type" },
    { label: "Location", key: "location" },
  ];

  const getOfferValue = (offer: any, rowKey: string) => {
    if (rowKey === "rating") return offer.center?.rating || 4.5;
    if (rowKey === "location") return offer.center?.city || "Colombo";
    return offer[rowKey];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare Offers</h1>
            <p className="text-lg text-gray-600">
              Side-by-side comparison to help you make the best decision
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="py-12 text-center text-gray-500">Loading comparison details...</div>
            ) : offers.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-64">
                          Feature
                        </th>
                        {offers.map((offer) => (
                          <th key={offer.id} className="px-6 py-4 text-center min-w-[250px]">
                            <div className="space-y-2">
                              <div className="font-bold text-lg text-gray-900">
                                {offer.title}
                                <div className="text-xs font-normal text-gray-500 mt-0.5">
                                  {offer.center?.name}
                                </div>
                              </div>
                              <button
                                onClick={() => removeCompare(offer.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                              >
                                <X className="w-5 h-5 mx-auto" />
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {row.label}
                          </td>
                          {offers.map((offer) => {
                            const val = getOfferValue(offer, row.key);
                            return (
                              <td key={offer.id} className="px-6 py-4 text-center text-sm">
                                <span className="text-gray-900 font-semibold">
                                  {row.prefix || ""}
                                  {typeof val === "number" ? val.toLocaleString() : String(val)}
                                  {row.suffix || ""}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      <tr>
                        <td className="px-6 py-4"></td>
                        {offers.map((offer) => (
                          <td key={offer.id} className="px-6 py-4 text-center">
                            <div className="space-y-2">
                              <Link
                                to={`/offers/${offer.id}`}
                                className="block px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-semibold"
                              >
                                View Details
                              </Link>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <X className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Offers to Compare</h3>
                <p className="text-gray-600 mb-6">
                  Add some gold loan offers to compare them side-by-side.
                </p>
                <Link
                  to="/offers"
                  className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                >
                  Browse Offers
                </Link>
              </div>
            )}

            {offers.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Link
                  to="/offers"
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-white transition-colors text-sm font-semibold"
                >
                  <span>Add More Offers to Compare</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
