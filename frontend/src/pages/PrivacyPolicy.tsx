import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Shield, Eye, Lock, FileText, Globe } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/70 to-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 mb-4 justify-center md:justify-start">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-9 h-9 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
                <p className="text-lg text-muted-foreground mt-1">
                  Last Updated: July 23, 2026
                </p>
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              AurumLK is committed to protecting your privacy and ensuring your personal information is handled securely and responsibly.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border space-y-10">
              
              {/* Introduction */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <Globe className="w-6 h-6" />
                  <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to AurumLK ("we," "our," "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (AurumLK) and use our comparison services for gold loans and pawning.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By using our website, you consent to the data practices described in this policy. If you do not agree with the terms of this privacy policy, please do not access or use the platform.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <Eye className="w-6 h-6" />
                  <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information to provide a better user experience and facilitate inquiries with our merchant partners. This information includes:
                </p>
                <ul className="list-disc list-inside pl-4 text-muted-foreground space-y-2">
                  <li><strong>Personal Identification Info:</strong> Name, email address, phone number, and account passwords when registering as a customer.</li>
                  <li><strong>Merchant Registration Info:</strong> Business name, license registration details, physical address, and contact information for pawning centers.</li>
                  <li><strong>Inquiry Content:</strong> Information you voluntarily provide when submitting inquiries regarding gold loan offers.</li>
                  <li><strong>Usage Data:</strong> Dynamic technical details such as browser type, device information, IP address, and platform usage behavior collected via cookies.</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <FileText className="w-6 h-6" />
                  <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Your information is utilized for the following purposes:
                </p>
                <ul className="list-disc list-inside pl-4 text-muted-foreground space-y-2">
                  <li>To present and personalize loan comparison data and centers.</li>
                  <li>To facilitate communication between customers and registered pawning centers regarding specific inquiries.</li>
                  <li>To verify and approve merchant applications on the platform.</li>
                  <li>To improve platform security, address technical bugs, and analyze user interaction metrics.</li>
                  <li>To comply with regulatory guidelines established by financial authorities in Sri Lanka.</li>
                </ul>
              </div>

              {/* Data Security */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <Lock className="w-6 h-6" />
                  <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We implement robust administrative, technical, and physical security measures to safeguard your personal data. This includes secure database access controls, password encryption, and transmission encryption protocols.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  However, please note that no internet transmission or computer storage system is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
                </p>
              </div>

              {/* Contact Us */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">Have Questions About Our Privacy Policy?</h3>
                <p className="text-muted-foreground text-sm">
                  Please feel free to email our Data Compliance Officer at <a href="mailto:privacy@aurumlk.com" className="text-primary hover:underline font-semibold">privacy@aurumlk.com</a>.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
