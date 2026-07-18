import { Link } from "react-router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Star, Building2, Filter } from "lucide-react";

export default function BrowseCenters() {
  const [filterOpen, setFilterOpen] = useState(false);

  const centers = [
    {
      id: 1,
      name: "Gold Star Finance",
      rating: 4.5,
      reviews: 128,
      branches: 12,
      location: "Colombo",
      offers: 8,
      description: "Trusted gold loan provider with 15+ years of experience",
    },
    {
      id: 2,
      name: "Lanka Pawning Services",
      rating: 4.3,
      reviews: 95,
      branches: 8,
      location: "Kandy",
      offers: 5,
      description: "Quick and reliable pawning services across Sri Lanka",
    },
    {
      id: 3,
      name: "City Gold Loans",
      rating: 4.7,
      reviews: 156,
      branches: 15,
      location: "Galle",
      offers: 10,
      description: "Premium gold loan services with competitive rates",
    },
    {
      id: 4,
      name: "Royal Pawning",
      rating: 4.6,
      reviews: 142,
      branches: 10,
      location: "Colombo",
      offers: 12,
      description: "Established pawning center with excellent customer service",
    },
    {
      id: 5,
      name: "Diamond Finance",
      rating: 4.4,
      reviews: 87,
      branches: 6,
      location: "Negombo",
      offers: 6,
      description: "Fast approval and flexible repayment options",
    },
    {
      id: 6,
      name: "Sunrise Loans",
      rating: 4.2,
      reviews: 73,
      branches: 5,
      location: "Matara",
      offers: 4,
      description: "Your trusted partner for gold loan solutions",
    },
  ];

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
                        Minimum Rating
                      </label>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>All Ratings</option>
                        <option>4.5+ ⭐</option>
                        <option>4.0+ ⭐</option>
                        <option>3.5+ ⭐</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Number of Branches
                      </label>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Any</option>
                        <option>10+ branches</option>
                        <option>5+ branches</option>
                      </select>
                    </div>

                    <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-muted-foreground">Showing {centers.length} centers</div>
                  <button
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-card/80 text-muted-foreground"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {centers.map((center) => (
                    <div key={center.id} className="bg-card rounded-3xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">{center.name}</h3>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{center.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">{center.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-2 bg-card/80 rounded">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Star className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-foreground">{center.rating}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{center.reviews} reviews</div>
                        </div>
                        <div className="text-center p-2 bg-card/80 rounded">
                          <div className="font-semibold text-foreground mb-1">{center.branches}</div>
                          <div className="text-xs text-muted-foreground">Branches</div>
                        </div>
                        <div className="text-center p-2 bg-card/80 rounded">
                          <div className="font-semibold text-foreground mb-1">{center.offers}</div>
                          <div className="text-xs text-muted-foreground">Offers</div>
                        </div>
                      </div>

                      <Link
                        to={`/centers/${center.id}`}
                        className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        View Details
                      </Link>
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

