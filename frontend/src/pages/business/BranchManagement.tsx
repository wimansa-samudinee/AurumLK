import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import { MapPin, Phone, Clock, Edit, Trash2, Plus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";

export default function BranchManagement() {
  const { user } = useAuth();
  const [center, setCenter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    if (!user) return;
    try {
      const centers = await api.fetchCenters();
      const myCenter = centers.find(
        c => c.name.toLowerCase() === (user.businessName || "").toLowerCase()
      );
      setCenter(myCenter);
    } catch (err) {
      console.error("Failed to load branches:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    try {
      await api.deleteBranch(id);
      loadData();
    } catch (err) {
      alert("Failed to delete branch.");
    }
  };

  const branches = center?.branches || [];

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Branch Management</h1>
              <p className="text-gray-600">Manage your branch locations</p>
            </div>
            <Link
              to="/business/branches/add"
              className="flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              <span>Add Branch</span>
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 font-semibold">Loading branches...</div>
          ) : branches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch: any) => (
                <div key={branch.id} className="bg-white rounded-lg shadow-sm border p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{branch.name}</h3>
                        <span className="inline-block mt-1 px-2.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">
                          Active
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <Link
                          to={`/business/branches/edit/${branch.id}`}
                          className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(branch.id)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span className="text-sm text-gray-600">{branch.address}, {branch.city}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{branch.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{branch.openingHours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Branches Configured</h3>
              <p className="text-gray-600 mb-6">
                Add your business branch locations to help customers locate you.
              </p>
              <Link
                to="/business/branches/add"
                className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
              >
                Add Your First Branch
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
