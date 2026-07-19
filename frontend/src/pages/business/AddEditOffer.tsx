import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";

export default function AddEditOffer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [centerId, setCenterId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Regular");
  const [rate, setRate] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);

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
          const offer = await api.fetchOffer(id);
          setTitle(offer.title);
          setType(offer.type);
          setRate(String(offer.rate));
          setMaxAmount(String(offer.maxAmount));
          setTenure(offer.tenure);
          setDescription(offer.description);
          setActive(offer.active);
        }
      } catch (err) {
        console.error("Failed to load offer form details:", err);
        setError("Failed to load offer details.");
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
      const payload = {
        title,
        type,
        rate: Number(rate),
        maxAmount: Number(maxAmount),
        tenure,
        description,
        centerId,
        active,
      };

      if (id) {
        await api.updateOffer(id, payload);
      } else {
        await api.createOffer(payload);
      }
      navigate("/business/offers");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save offer.");
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{id ? "Edit Offer" : "Create New Offer"}</h1>
            <p className="text-gray-600">Provide rates and terms for your pawning offer</p>
          </div>

          {loading ? (
            <div className="py-6 text-gray-500 font-semibold">Loading details...</div>
          ) : (
            <div className="max-w-3xl">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Offer Name / Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Regular 12-Month Gold Loan"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Offer Type</label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Regular">Regular</option>
                        <option value="Express">Express</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="e.g. 1.2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Loan Amount (LKR)</label>
                      <input
                        type="number"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        placeholder="e.g. 10000000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loan Tenure Description</label>
                      <input
                        type="text"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        placeholder="e.g. 12 Months"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Specify loan benefits, requirements, or terms..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="active"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      className="rounded text-primary accent-amber-500 mr-2"
                    />
                    <label htmlFor="active" className="text-sm font-semibold text-gray-700 cursor-pointer">
                      Offer is Active and Publicly Searchable
                    </label>
                  </div>

                  {error && (
                    <p className="text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 font-semibold">
                      {error}
                    </p>
                  )}

                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => navigate("/business/offers")}
                      className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {saving ? "Saving..." : "Save Offer"}
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
