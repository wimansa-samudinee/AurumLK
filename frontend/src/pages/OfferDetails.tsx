import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Heart, MapPin, Clock, DollarSign, Calendar, Shield, ArrowRight, Star } from "lucide-react";

export default function OfferDetails() {
  const offer = {
    id: 1,
    center: "Gold Star Finance",
    rate: "1.2%",
    maxAmount: "10,000,000",
    minAmount: "10,000",
    tenure: "12 months",
    rating: 4.5,
    reviews: 128,
    location: "Colombo",
    type: "Regular",
    processingTime: "Same Day",
    goldPurity: "18K - 24K",
    renewalOption: "Yes",
    features: [
      "No hidden charges",
      "Flexible repayment",
      "Quick approval",
      "Competitive rates",
      "Secure storage",
      "Insurance coverage",
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link to="/" className="hover:text-amber-600">Home</Link>
              <span>/</span>
              <Link to="/offers" className="hover:text-amber-600">Offers</Link>
              <span>/</span>
              <span className="text-gray-900">{offer.center}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{offer.center}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{offer.rating}</span>
                    <span className="text-gray-600">({offer.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{offer.location}</span>
                  </div>
                </div>
              </div>
              <button className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                <Heart className="w-5 h-5" />
                <span>Save Offer</span>
              </button>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Offer Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Interest Rate</div>
                        <div className="text-xl font-semibold text-amber-600">{offer.rate} per month</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Loan Amount Range</div>
                        <div className="text-lg font-semibold">LKR {offer.minAmount} - {offer.maxAmount}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Loan Tenure</div>
                        <div className="text-lg font-semibold">{offer.tenure}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Processing Time</div>
                        <div className="text-lg font-semibold">{offer.processingTime}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Gold Purity Accepted</div>
                        <div className="text-lg font-semibold">{offer.goldPurity}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Renewal Option</div>
                        <div className="text-lg font-semibold">{offer.renewalOption}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {offer.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About {offer.center}</h2>
                  <p className="text-gray-600 mb-4">
                    {offer.center} has been serving customers across Sri Lanka for over 15 years, providing reliable and transparent gold loan services. We pride ourselves on offering competitive rates and exceptional customer service.
                  </p>
                  <p className="text-gray-600">
                    Our experienced team ensures a smooth and hassle-free loan process, with same-day approvals and flexible repayment options. We maintain the highest standards of security for your valuable gold items.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            <div>
                              <div className="font-semibold">Customer Name</div>
                              <div className="text-sm text-gray-600">2 weeks ago</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">4.5</span>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          Great service! Very professional and the process was quick and easy. Would definitely recommend.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-amber-600 mb-2">
                      {offer.rate}
                    </div>
                    <div className="text-gray-600">Interest Rate per Month</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <button className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold">
                      Send Inquiry
                    </button>
                    <Link
                      to="/calculator"
                      className="w-full block text-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Calculate Loan
                    </Link>
                    <Link
                      to="/compare"
                      className="w-full block text-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Add to Compare
                    </Link>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Contact us for more information about this offer
                    </p>
                    <Link
                      to="/contact"
                      className="text-amber-600 hover:text-amber-700 text-sm flex items-center space-x-1"
                    >
                      <span>Contact Support</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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

