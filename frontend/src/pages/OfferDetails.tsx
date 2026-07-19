import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Heart, MapPin, Clock, DollarSign, Calendar, Shield, ArrowRight, Star, MessageSquare } from "lucide-react";
import * as api from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

export default function OfferDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [offer, setOffer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Inquiry Form States
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState("");

  // Favorites & Compare from LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("aurumlk_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("aurumlk_compare");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("aurumlk_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("aurumlk_compare", JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const fetched = await api.fetchOffer(id);
        setOffer(fetched);
      } catch (err) {
        console.error("Failed to load offer:", err);
        setError("Offer not found.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const toggleCompare = () => {
    if (!id) return;
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "CUSTOMER") {
      setInquiryError("Only customers can submit inquiries.");
      return;
    }
    if (!id) return;

    setInquiryLoading(true);
    setInquiryError("");
    setInquirySuccess(false);

    try {
      await api.createInquiry({ subject, message, offerId: id });
      setInquirySuccess(true);
      setSubject("");
      setMessage("");
      setTimeout(() => setInquiryOpen(false), 2000);
    } catch (err) {
      setInquiryError(err instanceof Error ? err.message : "Failed to submit inquiry.");
    } finally {
      setInquiryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Loading offer details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Offer Not Found</h2>
            <Link to="/offers" className="text-amber-600 hover:underline font-semibold">Back to browse offers</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isFavorite = favorites.includes(offer.id);
  const isCompared = compareList.includes(offer.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link to="/" className="hover:text-amber-600 font-medium">Home</Link>
              <span>/</span>
              <Link to="/offers" className="hover:text-amber-600 font-medium">Offers</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{offer.center?.name}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{offer.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{offer.center?.rating || 4.5}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{offer.center?.city || "Colombo"}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleFavorite}
                className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                <span>{isFavorite ? "Saved" : "Save Offer"}</span>
              </button>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Offer Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Interest Rate</div>
                        <div className="text-xl font-semibold text-amber-600">{offer.rate}% per month</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Maximum Loan Amount</div>
                        <div className="text-lg font-semibold">LKR {offer.maxAmount.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Loan Tenure</div>
                        <div className="text-lg font-semibold">{offer.tenure}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Type</div>
                        <div className="text-lg font-semibold">{offer.type}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Merchant Info</div>
                        <div className="text-lg font-semibold">{offer.business?.businessName || offer.center?.name}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-600 mb-4">
                    {offer.description || "No description provided for this offer."}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About {offer.center?.name}</h2>
                  <p className="text-gray-600 mb-4">
                    {offer.center?.description || `${offer.center?.name} is a verified pawning provider on AurumLK.`}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t text-sm text-gray-600">
                    <div>
                      <strong>Address:</strong> {offer.center?.address}
                    </div>
                    <div>
                      <strong>Phone:</strong> {offer.center?.phone}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-amber-600 mb-2">
                      {offer.rate}%
                    </div>
                    <div className="text-gray-600">Interest Rate per Month</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => setInquiryOpen(true)}
                      className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold cursor-pointer"
                    >
                      Send Inquiry
                    </button>
                    <Link
                      to="/calculator"
                      className="w-full block text-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Calculate Loan
                    </Link>
                    <button
                      onClick={toggleCompare}
                      className={`w-full px-6 py-3 border rounded-lg transition-colors font-semibold cursor-pointer ${
                        isCompared ? "bg-orange-50 border-primary text-primary" : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {isCompared ? "Remove Compare" : "Add to Compare"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Inquiry Form Modal */}
      {inquiryOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setInquiryOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-amber-500" />
              <span>Send Inquiry</span>
            </h2>

            {!user ? (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">You must be logged in as a customer to submit inquiries.</p>
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold inline-block"
                >
                  Log In
                </Link>
              </div>
            ) : user.role !== "CUSTOMER" ? (
              <p className="text-red-600 py-4 text-center">Only customer accounts can submit gold loan inquiries.</p>
            ) : inquirySuccess ? (
              <div className="text-center py-6 text-green-600">
                <p className="font-semibold text-lg mb-2">Inquiry Submitted Successfully!</p>
                <p className="text-sm text-gray-500">The merchant will review and respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Loan Rate Details"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message to the gold loan center here..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 h-32"
                    required
                  />
                </div>

                {inquiryError && <p className="text-sm text-red-600">{inquiryError}</p>}

                <button
                  type="submit"
                  disabled={inquiryLoading}
                  className="w-full py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold disabled:opacity-60 cursor-pointer"
                >
                  {inquiryLoading ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
