import DashboardSidebar from "../../components/DashboardSidebar";
import { MapPin, Phone, Clock } from "lucide-react";

export default function AddEditBranch() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Branch</h1>
            <p className="text-gray-600">Fill in the branch details below</p>
          </div>

          <div className="max-w-3xl">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Kandy Branch"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      rows={3}
                      placeholder="Full address"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+94 11 234 5678"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="branch@goldstar.lk"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="w-32 text-sm text-gray-700">Monday - Friday</span>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <span className="text-gray-600">to</span>
                      <input
                        type="time"
                        defaultValue="18:00"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="w-32 text-sm text-gray-700">Saturday</span>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <span className="text-gray-600">to</span>
                      <input
                        type="time"
                        defaultValue="13:00"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="w-32 text-sm text-gray-700">Sunday</span>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-amber-600 mr-2" />
                        <span className="text-sm text-gray-700">Closed</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Secure vault", "Private consultation", "Free parking", "Wheelchair accessible", "ATM available", "Wi-Fi"].map(
                      (facility) => (
                        <label key={facility} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-amber-600 mr-2" />
                          <span className="text-sm text-gray-700">{facility}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Save Branch
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
