import { Link, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import {
  LayoutDashboard,
  Heart,
  MessageSquare,
  User,
  Building2,
  MapPin,
  Tag,
  BarChart3,
  Users,
  CheckCircle,
  FileText,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  role: "customer" | "business" | "admin";
}

export default function DashboardSidebar({ role }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const customerLinks = [
    { to: "/customer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/customer/favorites", icon: Heart, label: "Favorites" },
    { to: "/customer/inquiries", icon: MessageSquare, label: "My Inquiries" },
    { to: "/customer/profile", icon: User, label: "Profile" },
  ];

  const businessLinks = [
    { to: "/business/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/business/profile", icon: Building2, label: "Business Profile" },
    { to: "/business/branches", icon: MapPin, label: "Branches" },
    { to: "/business/offers", icon: Tag, label: "Offers" },
    { to: "/business/inquiries", icon: MessageSquare, label: "Inquiries" },
    { to: "/business/analytics", icon: BarChart3, label: "Analytics" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/approvals", icon: CheckCircle, label: "Approvals" },
    { to: "/admin/offers", icon: Tag, label: "Offers" },
    { to: "/admin/reports", icon: FileText, label: "Reports" },
  ];

  const links = role === "customer" ? customerLinks : role === "business" ? businessLinks : adminLinks;

  return (
    <div className="w-64 bg-background border-r border-white/10 min-h-screen">
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold text-foreground">AurumLK</span>
        </Link>
      </div>

      <nav className="px-4 py-6 space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all font-medium ${
              isActive(link.to)
                ? "bg-primary/15 text-primary shadow-sm"
                : "text-foreground hover:bg-white/5 hover:text-primary"
            }`}
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </Link>
        ))}

        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-destructive transition-all font-medium mt-8"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

