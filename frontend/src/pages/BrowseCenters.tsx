import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Star, Building2, Filter } from "lucide-react";
import * as api from "../lib/api";

export default function BrowseCenters() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [rawCenters, setRawCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0.0);

  const mockCenters = [
    {
      id: "1",
      name: "Gold Star Finance",
      rating: 4.5,
      reviews: 128,
      branchesCount: 12,
      location: "Colombo",
      offersCount: 8,
      description: "Trusted gold loan provider with 15+ years of experience",
    },
    {
      id: "2",
      name: "Lanka Pawning Services",
      rating: 4.3,
      reviews: 95,
      branchesCount: 8,
      location: "Kandy",
      offersCount: 5,
      description: "Quick and reliable pawning services across Sri Lanka",
    },
    {
      id: "3",
      name: "City Gold Loans",
      rating: 4.7,
      reviews: 156,
      branchesCount: 15,
      location: "Galle",
      offersCount: 10,
      description: "Premium gold loan services with competitive rates",
    },
  ];

  useEffect(() => {
    async function load() {
      try {
        const fetched = await api.fetchCenters();
        setRawCenters(fetched);
      } catch (err) {
        console.error("Failed to load centers:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const locations = Array.from(
    new Set(rawCenters.map(c => c.city).filter(Boolean))
  );

  const displayCenters = rawCenters.length > 0
    ? rawCenters.map(c => ({
        id: c.id,
        name: c.name,
        rating: c.rating || 4.5,
        reviews: 120, // Static review count fallback
        branchesCount: c.branches?.length || 0,
        location: c.city,
        offersCount: c.offers?.length || 0,
        description: c.description || "Verified pawning provider on AurumLK.",
      }))
    : mockCenters;

  const filteredCenters = displayCenters.filter(center => {
    const searchMatch = !searchTerm || center.name.toLowerCase().includes(searchTerm.toLowerCase()) || center.description.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = !selectedLocation || center.location.toLowerCase() === selectedLocation.toLowerCase();
    const ratingMatch = center.rating >= minRating;
    return searchMatch && locationMatch && ratingMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/70 to-secondary py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Pawning Centers</h1>
            <p className="text-lg text-muted-foreground">
              Browse verified and trusted pawning centers across Sri Lanka.
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
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Search</label>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search centers..."
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

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

                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedLocation("");
                        setMinRating(0);
                      }}
                      className="w-full px-4 py-2 border border-border rounded-lg text-muted-foreground hover:bg-orange-50 hover:text-primary transition-all font-semibold cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div className="text-muted-foreground">
                    {loading ? "Loading centers..." : `Showing ${filteredCenters.length} centers`}
                  </div>
                  <button
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-card/80 text-muted-foreground cursor-pointer"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                </div>

                {loading ? (
                  <div className="py-12 text-center text-muted-foreground font-semibold">Loading centers...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCenters.map((center) => (
                      <div key={center.id} className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{center.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{center.location || "Sri Lanka"}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-sm font-semibold">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span>{center.rating}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{center.description}</p>

                        <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4 text-primary" />
                            <span>{center.branchesCount} Branches</span>
                          </div>
                          <div>
                            <strong className="text-foreground">{center.offersCount}</strong> Active Offers
                          </div>
                        </div>

                        <Link
                          to={`/centers/${center.id}`}
                          className="block text-center w-full py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md"
                        >
                          View Center & Branches
                        </Link>
                      </div>
                    ))}

                    {filteredCenters.length === 0 && (
                      <div className="col-span-2 py-12 text-center bg-card border border-border text-muted-foreground rounded-3xl">
                        No pawning centers match your search parameters.
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
