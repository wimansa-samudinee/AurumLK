import DashboardSidebar from "../../components/DashboardSidebar";
import { Building2, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";

export default function BusinessProfile() {
  const { user, refresh } = useAuth();
  const [center, setCenter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const centers = await api.fetchCenters();
        const myCenter = centers.find(
          c => c.name.toLowerCase() === (user.businessName || "").toLowerCase()
        );
        if (myCenter) {
          setCenter(myCenter);
          setName(myCenter.name || "");
          setDescription(myCenter.description || "");
          setAddress(myCenter.address || "");
          setCity(myCenter.city || "");
          setPhone(myCenter.phone || "");
        } else {
          setName(user.businessName || "");
        }
        setLicenseNumber(user.licenseNumber || "");
      } catch (err) {
        console.error("Failed to load business profile:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!center) return;
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await api.updateCenter(center.id, {
        name,
        description,
        address,
        city,
        phone,
      });
      await refresh();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Profile</h1>
            <p className="text-gray-600">Manage your business profile and center information</p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-semibold">Loading profile...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Pawning Center Details</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pawning Center Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 h-32"
                        required
                      />
                    </div>

                    {success && (
                      <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200 font-semibold">
                        Profile updated successfully!
                      </p>
                    )}

                    {error && (
                      <p className="text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 font-semibold">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Verification Info</h2>
                  <div className="space-y-4 text-sm text-gray-600">
                    <div>
                      <strong>License Number:</strong>
                      <div className="mt-1 text-gray-900">{licenseNumber || "N/A"}</div>
                    </div>
                    <div>
                      <strong>Account Status:</strong>
                      <div className="mt-1">
                        <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          Approved & Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
