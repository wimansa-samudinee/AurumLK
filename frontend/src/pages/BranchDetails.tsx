import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Phone, Clock, Navigation, Star } from "lucide-react";

export default function BranchDetails() {
  const branch = {
    id: 1,
    name: "Main Branch",
    center: "Gold Star Finance",
    centerId: 1,
    address: "123 Main Street, Colombo 03",
    phone: "+94 11 234 5678",
    email: "colombo@goldstar.lk",
    hours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed",
    },
    facilities: [
      "Secure vault",
      "Private consultation rooms",
      "Free parking",
      "Wheelchair accessible",
      "ATM available",
    ],
    rating: 4.6,
    reviews: 45,
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
              <Link to={`/centers/${branch.centerId}`} className="hover:text-amber-600">
                {branch.center}
              </Link>
              <span>/</span>
              <span className="text-gray-900">{branch.name}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{branch.center} - {branch.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{branch.rating}</span>
                <span className="text-gray-600">({branch.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{branch.address}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                  <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4">
                    <span className="text-gray-600">Map Integration Placeholder</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <span className="text-gray-700">{branch.address}</span>
                  </div>
                  <button className="mt-4 flex items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Facilities & Amenities</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {branch.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs">✓</span>
                        </div>
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Branch Reviews</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            <div>
                              <div className="font-semibold">Customer Name</div>
                              <div className="text-sm text-gray-600">3 weeks ago</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">4.5</span>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          Very convenient location with ample parking. Staff was friendly and helpful throughout the process.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-amber-600" />
                        <div>
                          <div className="text-sm text-gray-600">Phone</div>
                          <div className="font-medium">{branch.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-amber-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Monday - Friday</span>
                            <span className="font-medium">{branch.hours.weekdays}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Saturday</span>
                            <span className="font-medium">{branch.hours.saturday}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Sunday</span>
                            <span className="font-medium text-red-600">{branch.hours.sunday}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <button className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold">
                      Send Inquiry
                    </button>
                    <Link
                      to={`/centers/${branch.centerId}`}
                      className="w-full block text-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View All Branches
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
