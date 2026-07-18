import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { X, Check, ArrowRight } from "lucide-react";

export default function CompareOffers() {
  const offers = [
    {
      id: 1,
      center: "Gold Star Finance",
      rate: "1.2%",
      maxAmount: "10,000,000",
      minAmount: "10,000",
      tenure: "12 months",
      rating: 4.5,
      processingTime: "Same Day",
      processingFee: "0.5%",
      renewalOption: true,
      location: "Colombo",
    },
    {
      id: 2,
      center: "Lanka Pawning Services",
      rate: "1.5%",
      maxAmount: "5,000,000",
      minAmount: "5,000",
      tenure: "6 months",
      rating: 4.3,
      processingTime: "2-3 Hours",
      processingFee: "1%",
      renewalOption: true,
      location: "Kandy",
    },
    {
      id: 3,
      center: "City Gold Loans",
      rate: "1.8%",
      maxAmount: "8,000,000",
      minAmount: "15,000",
      tenure: "9 months",
      rating: 4.7,
      processingTime: "Same Day",
      processingFee: "0.75%",
      renewalOption: false,
      location: "Galle",
    },
  ];

  const comparisonRows = [
    { label: "Interest Rate (Monthly)", key: "rate" },
    { label: "Minimum Loan Amount", key: "minAmount", prefix: "LKR " },
    { label: "Maximum Loan Amount", key: "maxAmount", prefix: "LKR " },
    { label: "Loan Tenure", key: "tenure" },
    { label: "Rating", key: "rating", suffix: " ⭐" },
    { label: "Processing Time", key: "processingTime" },
    { label: "Processing Fee", key: "processingFee" },
    { label: "Renewal Option", key: "renewalOption", type: "boolean" },
    { label: "Location", key: "location" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare Offers</h1>
            <p className="text-lg text-gray-600">
              Side-by-side comparison to help you make the best decision
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-64">
                        Feature
                      </th>
                      {offers.map((offer) => (
                        <th key={offer.id} className="px-6 py-4 text-center min-w-[250px]">
                          <div className="space-y-2">
                            <div className="font-bold text-lg text-gray-900">{offer.center}</div>
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                              <X className="w-5 h-5 mx-auto" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {row.label}
                        </td>
                        {offers.map((offer) => (
                          <td key={offer.id} className="px-6 py-4 text-center">
                            {row.type === "boolean" ? (
                              offer[row.key as keyof typeof offer] ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-red-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-900">
                                {row.prefix || ""}
                                {offer[row.key as keyof typeof offer]}
                                {row.suffix || ""}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td className="px-6 py-4"></td>
                      {offers.map((offer) => (
                        <td key={offer.id} className="px-6 py-4 text-center">
                          <div className="space-y-2">
                            <Link
                              to={`/offers/${offer.id}`}
                              className="block px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                            >
                              View Details
                            </Link>
                            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              Send Inquiry
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                to="/offers"
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-white transition-colors"
              >
                <span>Add More Offers to Compare</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

