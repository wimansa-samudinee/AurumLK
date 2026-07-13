import { Link } from "react-router";
import { Search, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
                style={{ background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)" }}
              >
                <span className="text-white font-bold text-lg leading-none">A</span>
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                Aurum<span className="text-gradient-brand">LK</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { to: "/", label: "Home" },
              { to: "/offers", label: "Browse Offers" },
              { to: "/centers", label: "Centers" },
              { to: "/calculator", label: "Calculator" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-orange-50 transition-all rounded-lg"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-orange-50 transition-all rounded-lg">
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              <>
                <Link
                  to={
                    user.role === "ADMIN"
                      ? "/admin/dashboard"
                      : user.role === "BUSINESS"
                      ? "/business/dashboard"
                      : "/customer/dashboard"
                  }
                  className="hidden md:flex items-center space-x-2 px-4 py-2 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)" }}
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="hidden md:flex items-center px-4 py-2 border border-border text-muted-foreground rounded-xl text-sm font-semibold hover:border-primary hover:text-primary transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 px-4 py-2 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)" }}
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            <button
              className="md:hidden p-2 text-muted-foreground hover:text-primary hover:bg-orange-50 transition-all rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 space-y-1 border-t border-border">
            {[
              { to: "/", label: "Home" },
              { to: "/offers", label: "Browse Offers" },
              { to: "/centers", label: "Pawning Centers" },
              { to: "/calculator", label: "Calculator" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-orange-50 hover:text-primary rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/login"
              className="block text-center px-4 py-3 text-white rounded-xl font-semibold mt-2 shadow-md"
              style={{ background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

