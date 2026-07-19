import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Filter, ArrowUpDown, Heart } from "lucide-react";
import * as api from "../lib/api";

export default function BrowseOffers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [rawOffers, setRawOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [maxRate, setMaxRate] = useState(3.0);
  const [minRating, setMinRating] = useState(0.0);
  const [sortOption, setSortOption] = useState("rate-asc");

  // Favorites & Compare state
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

  // Initial Data Fetch
  useEffect(() => {
    async function load() {
      try {
        const fetched = await api.fetchOffers({ active: true });
        setRawOffers(fetched);
      } catch (err) {
        console.error("Failed to load offers:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Sync search input with query parameter changes
  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const toggleTypeFilter = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Gather unique locations from database centers
  const locations = Array.from(
    new Set(rawOffers.map(o => o.center?.city).filter(Boolean))
  );

  const filteredOffers = rawOffers
    .filter(offer => {
      const searchMatch =
        !searchTerm ||
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (offer.center?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase());

      const locationMatch =
        !selectedLocation ||
        (offer.center?.city || "").toLowerCase() === selectedLocation.toLowerCase();

      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(offer.type);

      const rateMatch = offer.rate <= maxRate;

      const ratingMatch = (offer.center?.rating || 0) >= minRating;

      return searchMatch && locationMatch && typeMatch && rateMatch && ratingMatch;
    })
    .sort((a, b) => {
      if (sortOption === "rate-asc") return a.rate - b.rate;
      if (sortOption === "rate-desc") return b.rate - a.rate;
      if (sortOption === "amount-desc") return b.maxAmount - a.maxAmount;
      if (sortOption === "rating-desc") return (b.center?.rating || 0) - (a.center?.rating || 0);
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/70 to-secondary py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Browse Gold Loan Offers</h1>
            <p className="text-lg text-muted-foreground">
              Compare rates and terms from verified pawning centers across Sri Lanka.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className={`lg:w-64 ${filterOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-card rounded-3xl shadow-sm border border-border p-6 sticky top-8">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Filters</h2>

                  <div className="space-y-6">
                    {/* Search */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Search</label>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setSearchParams(e.target.value ? { search: e.target.value } : {});
                        }}
                        placeholder="Search..."
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Location</label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">All Locations</option>
                        {locations.map((loc: any) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    {/* Loan Type */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Loan Type</label>
                      <div className="space-y-2">
                        {["Regular", "Express", "Premium"].map(type => (
                          <label key={type} className="flex items-center text-muted-foreground cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type)}
                              onChange={() => toggleTypeFilter(type)}
                              className="rounded text-primary mr-2 accent-orange-500"
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Interest Rate (Max): <span className="font-semibold text-primary">{maxRate}%</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={maxRate}
                        onChange={(e) => setMaxRate(Number(e.target.value))}
                        className="w-full accent-orange-500"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1%</span>
                        <span>3%</span>
                      </div>
                    </div>

                    {/* Min Rating */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Minimum Rating</label>
                      <select
                        value={minRating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value={0}>All Ratings</option>
                        <option value={4.5}>4.5+ ⭐</option>
                        <option value={4.0}>4.0+ ⭐</option>
                        <option value={3.5}>3.5+ ⭐</option>
                      </select>
                    </div>

                    {/* Reset Filters */}
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSearchParams({});
                        setSelectedLocation("");
                        setSelectedTypes([]);
                        setMaxRate(3.0);
                        setMinRating(0);
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg text-muted-foreground hover:bg-orange-50 hover:text-primary transition-all font-semibold cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div className="text-muted-foreground">
                    {loading ? "Loading offers..." : `Showing ${filteredOffers.length} offers`}
                  </div>
                  <div className="flex gap-3 items-center">
                    <button
                      className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-card/80 text-muted-foreground cursor-pointer"
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                    </button>

                    <div className="relative flex items-center space-x-2">
                      <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                      <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-3 py-2 bg-background border border-border rounded-lg text-muted-foreground text-sm focus:outline-none focus:ring-2"
                      >
                        <option value="rate-asc">Interest: Low to High</option>
                        <option value="rate-desc">Interest: High to Low</option>
                        <option value="amount-desc">Max Amount: High to Low</option>
                        <option value="rating-desc">Rating: High to Low</option>
                      </select>
                    </div>

                    <Link
                      to="/compare"
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm shadow-md"
                    >
                      Compare ({compareList.length})
                    </Link>
                  </div>
                </div>

                {loading ? (
                  <div className="py-12 text-center text-muted-foreground">Loading available gold loan offers...</div>
                ) : (
                  <div className="space-y-4">
                    {filteredOffers.map((offer) => {
                      const isFavorite = favorites.includes(offer.id);
                      const isCompared = compareList.includes(offer.id);

                      return (
                        <div key={offer.id} className="bg-card rounded-3xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3 gap-4">
                                <div>
                                  <h3 className="text-xl font-semibold text-foreground">
                                    {offer.title} - <span className="text-muted-foreground font-normal">{offer.center?.name}</span>
                                  </h3>
                                  <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                                    <span>{offer.center?.city || "Sri Lanka"}</span>
                                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                                      {offer.type}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => toggleFavorite(offer.id)}
                                  className="text-muted-foreground hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50"
                                >
                                  <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                </button>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <div className="text-sm text-muted-foreground">Interest Rate</div>
                                  <div className="text-lg font-semibold text-primary">{offer.rate}%/mo</div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Max Amount</div>
                                  <div className="text-lg font-semibold text-foreground">LKR {offer.maxAmount.toLocaleString()}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Tenure</div>
                                  <div className="text-lg font-semibold text-foreground">{offer.tenure}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Rating</div>
                                  <div className="text-lg font-semibold text-foreground">{offer.center?.rating || 4.5} ⭐</div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-3 min-w-[150px]">
                              <Link
                                to={`/offers/${offer.id}`}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center font-semibold"
                              >
                                View Details
                              </Link>
                              <button
                                onClick={() => toggleCompare(offer.id)}
                                className={`px-6 py-2 border rounded-lg transition-colors text-sm font-semibold cursor-pointer ${
                                  isCompared
                                    ? "bg-orange-50 border-primary text-primary hover:bg-orange-100"
                                    : "border-border text-muted-foreground hover:bg-card/80"
                                }`}
                              >
                                {isCompared ? "Remove Compare" : "Add to Compare"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {filteredOffers.length === 0 && (
                      <div className="py-12 text-center bg-card rounded-3xl border border-border text-muted-foreground">
                        No gold loan offers match your active filters.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
