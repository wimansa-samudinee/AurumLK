import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Target, Eye, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/70 to-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">About AurumLK</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Sri Lanka's premier platform for comparing gold loan offers and connecting customers with trusted pawning centers.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  AurumLK was founded with a simple mission: to bring transparency and convenience to the gold loan industry in Sri Lanka. We recognized that finding the best gold loan rates was often a time-consuming and confusing process for customers.
                </p>
                <p className="text-muted-foreground mb-4">
                  Today, we're proud to be the leading platform connecting thousands of customers with verified pawning centers across the country, making it easier than ever to compare offers and make informed financial decisions.
                </p>
                <p className="text-muted-foreground">
                  Our platform serves as a trusted intermediary, ensuring that all listed pawning centers meet our strict verification standards and providing customers with the tools they need to find the best deals.
                </p>
              </div>
              <div className="bg-card rounded-3xl h-96 flex items-center justify-center shadow-lg border border-border overflow-hidden p-6 bg-white/50 backdrop-blur-sm">
                <img
                  src="/about-image.png"
                  alt="AurumLK Logo"
                  className="max-h-full max-w-full object-contain transition-transform hover:scale-105 duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Target, label: "Mission", description: "Empower customers with transparent information to make better financial decisions" },
                { icon: Eye, label: "Vision", description: "Become the most trusted platform for financial services in Sri Lanka" },
                { icon: Award, label: "Quality", description: "Maintain highest standards in partner verification and service delivery" },
                { icon: Users, label: "Community", description: "Build trust and lasting relationships with customers and partners" },
              ].map((item) => (
                <div key={item.label} className="text-center bg-card rounded-3xl p-8 border border-border shadow-sm">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{item.label}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">By The Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { value: "10,000+", label: "Happy Customers" },
                { value: "150+", label: "Partner Centers" },
                { value: "500+", label: "Branch Locations" },
                { value: "₨5B+", label: "Loans Facilitated" },
              ].map((item) => (
                <div key={item.label} className="text-center bg-card rounded-3xl p-8 border border-border shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                  <div className="text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
