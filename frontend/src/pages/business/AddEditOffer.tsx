import DashboardSidebar from "../../components/DashboardSidebar";

export default function AddEditOffer() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="business" />

      <main className="flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Offer</h1>
            <p className="text-gray-600">Fill in the offer details below</p>
          </div>

          <div className="max-w-3xl">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Offer Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Regular 12-Month Gold Loan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Offer Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Regular</option>
                    <option>Express</option>
                    <option>Premium</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="1.2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Processing Fee (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="0.5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Loan Amount (LKR)</label>
                    <input
                      type="number"
                      placeholder="10000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Loan Amount (LKR)</label>
                    <input
                      type="number"
                      placeholder="10000000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Tenure (Months)</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>9 Months</option>
                    <option>12 Months</option>
                    <option>18 Months</option>
                    <option>24 Months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gold Purity Accepted</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["18K", "20K", "22K", "24K"].map((purity) => (
                      <label key={purity} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-amber-600 mr-2" />
                        <span className="text-sm text-gray-700">{purity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Processing Time</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Same Day</option>
                    <option>2-3 Hours</option>
                    <option>1-2 Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Features</label>
                  <textarea
                    rows={4}
                    placeholder="Enter key features, one per line..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-amber-600 mr-2" />
                    <span className="text-sm text-gray-700">Allow renewal option</span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Create Offer
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
