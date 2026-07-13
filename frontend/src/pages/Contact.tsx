import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/70 to-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
                <div className="space-y-6">
                  {[
                    { icon: Phone, title: "Phone", lines: ["+94 11 234 5678", "+94 77 123 4567"] },
                    { icon: Mail, title: "Email", lines: ["info@aurumlk.com", "support@aurumlk.com"] },
                    { icon: MapPin, title: "Address", lines: ["123 Main Street,", "Colombo 03,", "Sri Lanka"] },
                    { icon: Clock, title: "Business Hours", lines: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 1:00 PM", "Sunday: Closed"] },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <div className="text-muted-foreground text-sm leading-6">
                          {item.lines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send Us A Message</h2>
                <form className="space-y-6">
                  {[
                    { label: "Full Name", type: "text", placeholder: "John Doe" },
                    { label: "Email Address", type: "email", placeholder: "john@example.com" },
                    { label: "Phone Number", type: "tel", placeholder: "+94 77 123 4567" },
                    { label: "Subject", type: "text", placeholder: "How can we help?" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Find Us On The Map</h2>
            <div className="bg-card rounded-3xl h-96 flex items-center justify-center border border-border">
              <span className="text-muted-foreground text-xl">Map Integration Placeholder</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
