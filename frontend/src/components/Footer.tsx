import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      {/* Top gradient bar */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #f15a14 0%, #f7a414 50%, #f7c31a 100%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)" }}
              >
                <span className="text-white font-bold text-lg leading-none">A</span>
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                Aurum<span className="text-gradient-brand">LK</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Sri Lanka's trusted platform for gold loan comparisons and pawning services.
            </p>
            {/* Social icons */}
            <div className="flex space-x-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-orange-50 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/offers", label: "Browse Offers" },
                { to: "/centers", label: "Pawning Centers" },
                { to: "/calculator", label: "Loan Calculator" },
                { to: "/compare", label: "Compare Offers" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
                { to: "#", label: "Privacy Policy" },
                { to: "#", label: "Terms of Service" },
                { to: "#", label: "Help Center" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>No. 42, Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@aurumlk.com</span>
              </li>
            </ul>

            {/* Newsletter mini */}
            <div className="mt-5">
              <p className="text-xs font-medium text-foreground mb-2">Get loan rate updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button
                  className="text-xs text-white px-3 py-2 rounded-lg font-semibold whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  style={{ background: "linear-gradient(135deg, #f15a14 0%, #f7c31a 100%)" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 AurumLK. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Licensed by the Central Bank of Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}

