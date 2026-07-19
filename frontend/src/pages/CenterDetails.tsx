import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Phone, Mail, Clock, Star, Building2, Award, Calendar, ArrowRight } from "lucide-react";
import * as api from "../lib/api";

export default function CenterDetails() {
  const { id } = useParams<{ id: string }>();
  const [center, setCenter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const fetched = await api.fetchCenter(id);
        setCenter(fetched);
      } catch (err) {
        console.error("Failed to load center details:", err);
        setError("Center not found.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500 font-semibold">Loading center details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !center) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Center Not Found</h2>
            <Link to="/centers" className="text-amber-600 hover:underline">Back to browse centers</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link to="/" className="hover:text-amber-600 font-semibold">Home</Link>
              <span>/</span>
              <Link to="/centers" className="hover:text-amber-600 font-semibold">Centers</Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{center.name}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Building2 className="w-10 h-10 text-amber-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{center.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{center.rating || 4.5}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{center.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600 mb-4">
                    {center.description || "No description provided for this center."}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-amber-600" />
                      <span>{center.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{center.address}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Gold Loan Offers</h2>
                  <div className="space-y-4">
                    {center.offers?.map((offer: any) => (
                      <div key={offer.id} className="border p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
                          <div className="flex gap-2 text-xs mt-1">
                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-semibold">{offer.type}</span>
                            <span className="text-gray-500">Tenure: {offer.tenure}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-6">
                          <div>
                            <div className="text-xs text-gray-500">Interest Rate</div>
                            <div className="text-lg font-bold text-amber-600">{offer.rate}%/mo</div>
                          </div>
                          <Link
                            to={`/offers/${offer.id}`}
                            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm font-semibold"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                    {(!center.offers || center.offers.length === 0) && (
                      <p className="text-gray-500 text-sm">No active loan offers at this center.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Branches</h2>
                  <div className="space-y-4">
                    {center.branches?.map((branch: any) => (
                      <div key={branch.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-950 text-base">{branch.name}</h3>
                            <div className="text-sm text-gray-500 mt-1 flex items-center space-x-1">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{branch.address}, {branch.city}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">Hours: {branch.openingHours}</div>
                          </div>
                          <Link
                            to={`/branches/${branch.id}`}
                            className="text-amber-600 hover:text-amber-700 text-sm font-semibold flex items-center space-x-1"
                          >
                            <span>Branch Info</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                    {(!center.branches || center.branches.length === 0) && (
                      <p className="text-gray-500 text-sm">No branches configured for this center.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
