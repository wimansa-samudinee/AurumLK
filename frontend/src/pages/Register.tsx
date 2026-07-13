import { Link } from "react-router";
import { useState } from "react";
import { Mail, Lock, User, Building2, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [userType, setUserType] = useState<"customer" | "business">("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #fff8f4 0%, #fffbea 60%, #fff4e0 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #f7c31a, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #f15a14, transparent 70%)" }} />
      </div>

      <div className="relative max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-6">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)" }}
            >
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              Aurum<span className="text-gradient-brand">LK</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join AurumLK and get started today</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-border p-8">

          {/* Account type toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setUserType("customer")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={
                userType === "customer"
                  ? { background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)", color: "#fff", boxShadow: "0 2px 8px rgba(241,90,20,0.3)" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              <User className="w-4 h-4" />
              Customer
            </button>
            <button
              onClick={() => setUserType("business")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={
                userType === "business"
                  ? { background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)", color: "#fff", boxShadow: "0 2px 8px rgba(241,90,20,0.3)" }
                  : { color: "var(--muted-foreground)" }
              }
            >
              <Building2 className="w-4 h-4" />
              Business
            </button>
          </div>

          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                {userType === "customer" ? "Full Name" : "Business Name"}
              </label>
              <div className="relative">
                {userType === "customer"
                  ? <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  : <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                }
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  placeholder={userType === "customer" ? "John Doe" : "Gold Star Finance"}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* License (business only) */}
            {userType === "business" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Business License Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  placeholder="CB/PL/2009/123"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-11 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full pl-10 pr-11 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                className="rounded border-border mt-0.5 w-4 h-4 accent-orange-500"
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="#" className="text-primary hover:underline font-medium">Terms of Service</Link>
                {" "}and{" "}
                <Link to="#" className="text-primary hover:underline font-medium">Privacy Policy</Link>
              </span>
            </div>

            {/* Business notice */}
            {userType === "business" && (
              <div className="p-3.5 rounded-xl border text-sm" style={{ background: "rgba(241,90,20,0.05)", borderColor: "rgba(241,90,20,0.2)", color: "var(--foreground)" }}>
                📝 Business accounts require admin verification before approval. You'll be notified once reviewed.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg, #f15a14 0%, #f7a414 55%, #f7c31a 100%)" }}
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
