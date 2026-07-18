import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Phone, Mail, Clock, Star, Building2, Award } from "lucide-react";

export default function CenterDetails() {
  const center = {
    id: 1,
    name: "Gold Star Finance",
    rating: 4.5,
    reviews: 128,
    location: "Colombo",
    phone: "+94 11 234 5678",
    email: "info@goldstar.lk",
    description: "Gold Star Finance has been serving customers across Sri Lanka for over 15 years, providing reliable and transparent gold loan services. We pride ourselves on offering competitive rates and exceptional customer service.",
    established: "2009",
    license: "CB/PL/2009/123",
    branches: [
      { id: 1, name: "Main Branch", location: "Colombo 03", phone: "+94 11 234 5678" },
      { id: 2, name: "Kandy Branch", location: "Kandy", phone: "+94 81 234 5678" },
      { id: 3, name: "Galle Branch", location: "Galle", phone: "+94 91 234 5678" },
    ],
    offers: [
      { id: 1, type: "Regular", rate: "1.2%", tenure: "12 months" },
      { id: 2, type: "Express", rate: "1.5%", tenure: "6 months" },
      { id: 3, type: "Premium", rate: "1.0%", tenure: "18 months" },
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
              <Link to="/centers" className="hover:text-amber-600">Centers</Link>
              <span>/</span>
              <span className="text-gray-900">{center.name}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Building2 className="w-10 h-10 text-amber-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{center.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{center.rating}</span>
                      <span className="text-gray-600">({center.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{center.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600 mb-4">{center.description}</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-amber-600" />
                      <div>
                        <div className="text-sm text-gray-600">Established</div>
                        <div className="font-semibold">{center.established}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-amber-600" />
                      <div>
                        <div className="text-sm text-gray-600">License No.</div>
                        <div className="font-semibold">{center.license}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Offers</h2>
                  <div className="space-y-3">
                    {center.offers.map((offer) => (
                      <div key={offer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900">{offer.type} Loan</div>
                          <div className="text-sm text-gray-600">Tenure: {offer.tenure}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-amber-600">{offer.rate}</div>
                          <div className="text-sm text-gray-600">per month</div>
                        </div>
                        <Link
                          to={`/offers/${offer.id}`}
                          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Branch Locations</h2>
                  <div className="space-y-4">
                    {center.branches.map((branch) => (
                      <div key={branch.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>{branch.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                            <Phone className="w-4 h-4" />
                            <span>{branch.phone}</span>
                          </div>
                        </div>
                        <Link
                          to={`/branches/${branch.id}`}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
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
                          Excellent service and very professional staff. The loan process was smooth and quick.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-amber-600 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Phone</div>
                        <div className="font-medium">{center.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-amber-600 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Email</div>
                        <div className="font-medium">{center.email}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Location</div>
                        <div className="font-medium">{center.location}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-amber-600 mt-1" />
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Business Hours</div>
                        <div className="font-medium">Mon-Fri: 9AM-6PM</div>
                        <div className="font-medium">Sat: 9AM-1PM</div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold mt-6">
                    Send Inquiry
                  </button>
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

