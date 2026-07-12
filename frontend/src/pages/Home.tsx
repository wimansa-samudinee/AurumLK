import { Link } from "react-router";
import { Search, TrendingUp, Shield, Clock, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const featuredOffers = [
    {
      id: 1,
      center: "Gold Star Finance",
      rate: "1.2%",
      maxAmount: "10,000,000",
      tenure: "12 months",
      rating: 4.5,
    },
    {
      id: 2,
      center: "Lanka Pawning Services",
      rate: "1.5%",
      maxAmount: "5,000,000",
      tenure: "6 months",
      rating: 4.3,
    },
    {
      id: 3,
      center: "City Gold Loans",
      rate: "1.8%",
      maxAmount: "8,000,000",
      tenure: "9 months",
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden" style={{background: 'linear-gradient(135deg, #fff8f4 0%, #fffbea 60%, #fff4e0 100%)'}}>
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 70% 40%, rgba(247,195,26,0.35), transparent 55%), radial-gradient(circle at 20% 70%, rgba(241,90,20,0.18), transparent 50%)'}}></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Find the Best Gold Loan Rates in
                <span className="text-gradient-brand"> Sri Lanka</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Compare offers from trusted pawning centers and get the loan you need
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for offers or centers..."
                    className="w-full px-6 py-4 bg-card border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                </div>
                <Link
                  to="/offers"
                  className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all inline-flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Browse Offers</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-card border border-border rounded-xl hover:border-primary/30 transition-all hover:-translate-y-1 shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Best Rates</h3>
                <p className="text-muted-foreground">
                  Compare and find the most competitive interest rates
                </p>
              </div>
              <div className="text-center p-8 bg-card border border-border rounded-xl hover:border-primary/30 transition-all hover:-translate-y-1 shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Trusted Centers</h3>
                <p className="text-muted-foreground">
                  All partnered centers are verified and licensed
                </p>
              </div>
              <div className="text-center p-8 bg-card border border-border rounded-xl hover:border-primary/30 transition-all hover:-translate-y-1 shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Quick Process</h3>
                <p className="text-muted-foreground">
                  Find and apply for loans in minutes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Offers Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">Featured Offers</h2>
              <Link to="/offers" className="text-primary hover:text-primary/80 flex items-center space-x-2 font-medium transition-colors">
                <span>View All</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredOffers.map((offer) => (
                <div key={offer.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1 shadow-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-4">{offer.center}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-semibold text-primary">{offer.rate}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Amount</span>
                      <span className="font-semibold text-foreground">LKR {offer.maxAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenure</span>
                      <span className="font-semibold text-foreground">{offer.tenure}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-semibold text-foreground">{offer.rating} ⭐</span>
                    </div>
                  </div>
                  <Link
                    to={`/offers/${offer.id}`}
                    className="mt-6 w-full block text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-12 text-center shadow-2xl" style={{background: 'linear-gradient(135deg, #f15a14 0%, #f7a414 50%, #f7c31a 100%)', boxShadow: '0 20px 60px rgba(241,90,20,0.30)'}}>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-white/90 mb-8">Calculate your loan amount and compare offers today</p>
              <Link
                to="/calculator"
                className="inline-block px-8 py-4 bg-white text-primary rounded-lg hover:bg-white/90 transition-all font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Try Our Calculator
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
