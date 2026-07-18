import { Link } from "react-router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Filter, ArrowUpDown, Heart } from "lucide-react";

export default function BrowseOffers() {
  const [filterOpen, setFilterOpen] = useState(false);

  const offers = [
    {
      id: 1,
      center: "Gold Star Finance",
      rate: "1.2%",
      maxAmount: "10,000,000",
      tenure: "12 months",
      rating: 4.5,
      location: "Colombo",
      type: "Regular",
    },
    {
      id: 2,
      center: "Lanka Pawning Services",
      rate: "1.5%",
      maxAmount: "5,000,000",
      tenure: "6 months",
      rating: 4.3,
      location: "Kandy",
      type: "Express",
    },
    {
      id: 3,
      center: "City Gold Loans",
      rate: "1.8%",
      maxAmount: "8,000,000",
      tenure: "9 months",
      rating: 4.7,
      location: "Galle",
      type: "Regular",
    },
    {
      id: 4,
      center: "Royal Pawning",
      rate: "1.3%",
      maxAmount: "15,000,000",
      tenure: "18 months",
      rating: 4.6,
      location: "Colombo",
      type: "Premium",
    },
    {
      id: 5,
      center: "Diamond Finance",
      rate: "1.4%",
      maxAmount: "7,000,000",
      tenure: "12 months",
      rating: 4.4,
      location: "Negombo",
      type: "Regular",
    },
    {
      id: 6,
      center: "Sunrise Loans",
      rate: "1.6%",
      maxAmount: "6,000,000",
      tenure: "6 months",
      rating: 4.2,
      location: "Matara",
      type: "Express",
    },
  ];

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
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Location
                      </label>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>All Locations</option>
                        <option>Colombo</option>
                        <option>Kandy</option>
                        <option>Galle</option>
                        <option>Negombo</option>
                        <option>Matara</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Loan Type
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center text-muted-foreground">
                          <input type="checkbox" className="rounded text-primary mr-2" />
                          <span className="text-sm">Regular</span>
                        </label>
                        <label className="flex items-center text-muted-foreground">
                          <input type="checkbox" className="rounded text-primary mr-2" />
                          <span className="text-sm">Express</span>
                        </label>
                        <label className="flex items-center text-muted-foreground">
                          <input type="checkbox" className="rounded text-primary mr-2" />
                          <span className="text-sm">Premium</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Interest Rate (Max)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1%</span>
                        <span>3%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Minimum Rating
                      </label>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>All Ratings</option>
                        <option>4.5+ ⭐</option>
                        <option>4.0+ ⭐</option>
                        <option>3.5+ ⭐</option>
                      </select>
                    </div>

                    <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div className="text-muted-foreground">Showing {offers.length} offers</div>
                  <div className="flex gap-3">
                    <button
                      className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-card/80 text-muted-foreground"
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-card/80 text-muted-foreground">
                      <ArrowUpDown className="w-4 h-4" />
                      <span>Sort By</span>
                    </button>
                    <Link
                      to="/compare"
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Compare Selected
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  {offers.map((offer) => (
                    <div key={offer.id} className="bg-card rounded-3xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3 gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-foreground">{offer.center}</h3>
                              <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                                <span>{offer.location}</span>
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                                  {offer.type}
                                </span>
                              </div>
                            </div>
                            <button className="text-muted-foreground hover:text-primary transition-colors">
                              <Heart className="w-6 h-6" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground">Interest Rate</div>
                              <div className="text-lg font-semibold text-primary">{offer.rate}/mo</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Max Amount</div>
                              <div className="text-lg font-semibold text-foreground">LKR {offer.maxAmount}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Tenure</div>
                              <div className="text-lg font-semibold text-foreground">{offer.tenure}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Rating</div>
                              <div className="text-lg font-semibold text-foreground">{offer.rating} ⭐</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-3">
                          <Link
                            to={`/offers/${offer.id}`}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center"
                          >
                            View Details
                          </Link>
                          <button className="px-6 py-2 border border-border rounded-lg hover:bg-card/80 transition-colors text-muted-foreground">
                            Add to Compare
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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

