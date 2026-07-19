import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import { MapPin, Phone, Clock } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";

export default function AddEditBranch() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [centerId, setCenterId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [openingHours, setOpeningHours] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      try {
        const centers = await api.fetchCenters();
        const myCenter = centers.find(
          c => c.name.toLowerCase() === (user.businessName || "").toLowerCase()
        );
        if (myCenter) {
          setCenterId(myCenter.id);
        }

        if (id) {
          const branch = await api.fetchBranch(id);
          setName(branch.name);
          setAddress(branch.address);
          setCity(branch.city);
          setPhone(branch.phone);
          setOpeningHours(branch.openingHours);
        }
      } catch (err) {
        console.error("Failed to load branch form details:", err);
        setError("Failed to load branch details.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!centerId) {
      setError("No pawning center found for this merchant. Please complete your profile first.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (id) {
        await api.updateBranch(id, { name, address, city, phone, openingHours, centerId });
      } else {
        await api.createBranch({ name, address, city, phone, openingHours, centerId });
      }
      navigate("/business/branches");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save branch.");
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{id ? "Edit Branch" : "Add New Branch"}</h1>
            <p className="text-gray-600">Provide details of your pawning branch location</p>
          </div>

          {loading ? (
            <div className="py-6 text-gray-500 font-semibold">Loading branch details...</div>
          ) : (
            <div className="max-w-3xl">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kandy Branch"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Kandy"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +94 81 234 5678"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 45 Main Street, Kandy"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Opening Hours</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={openingHours}
                        onChange={(e) => setOpeningHours(e.target.value)}
                        placeholder="e.g. Mon-Fri 9:00 AM - 5:00 PM"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 font-semibold">
                      {error}
                    </p>
                  )}

                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => navigate("/business/branches")}
                      className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {saving ? "Saving..." : "Save Branch"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
