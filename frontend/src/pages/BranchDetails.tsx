import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import * as api from "../lib/api";

export default function BranchDetails() {
  const { id } = useParams<{ id: string }>();
  const [branch, setBranch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const fetched = await api.fetchBranch(id);
        setBranch(fetched);
      } catch (err) {
        console.error("Failed to load branch details:", err);
        setError("Branch not found.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500 font-semibold">Loading branch details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !branch) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Branch Not Found</h2>
            <Link to="/centers" className="text-amber-600 hover:underline">Back to browse centers</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link to="/" className="hover:text-amber-600 font-semibold">Home</Link>
              <span>/</span>
              <Link to="/centers" className="hover:text-amber-600 font-semibold">Centers</Link>
              <span>/</span>
              <Link to={`/centers/${branch.centerId}`} className="hover:text-amber-600 font-semibold">
                {branch.center?.name || "Center"}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{branch.name}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{branch.center?.name} - {branch.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{branch.address}, {branch.city}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Branch Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Address</div>
                        <div className="text-gray-600 mt-1">{branch.address}, {branch.city}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Phone Number</div>
                        <div className="text-gray-600 mt-1">{branch.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-gray-900">Opening Hours</div>
                        <div className="text-gray-600 mt-1">{branch.openingHours}</div>
                      </div>
                    </div>
                  </div>
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
