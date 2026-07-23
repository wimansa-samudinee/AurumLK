import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Scale, FileSpreadsheet, KeyRound, AlertTriangle, HelpCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/70 to-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 mb-4 justify-center md:justify-start">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Scale className="w-9 h-9 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
                <p className="text-lg text-muted-foreground mt-1">
                  Last Updated: July 23, 2026
                </p>
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Please read these Terms of Service carefully before accessing or using our platform comparison features.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border space-y-10">
              
              {/* Acceptance of Terms */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <KeyRound className="w-6 h-6" />
                  <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using the AurumLK website (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you must discontinue using the platform immediately.
                </p>
              </div>

              {/* Description of Service */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <FileSpreadsheet className="w-6 h-6" />
                  <h2 className="text-2xl font-bold text-foreground">2. Description of Service</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  AurumLK acts as a matching and information portal. We provide pricing tools, calculator evaluations, and a platform for customers to browse and compare gold loan offers from verified pawning centers in Sri Lanka.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl text-sm leading-relaxed">
                  <strong>IMPORTANT NOTICE:</strong> AurumLK is not a banking institution, licensed pawnbroker, or direct financial lender. We do not issue loans, collect interest payments, or hold gold physical deposits ourselves. All loan agreements are completed directly between the customer and their chosen pawning center.
                </div>
              </div>

              {/* Merchant / Center Responsibilities */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <Scale className="w-6 h-6" />
                  <h2 className="text-2xl font-bold text-foreground">3. Merchant & Partner Obligations</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Registered pawning centers and businesses must guarantee:
                </p>
                <ul className="list-disc list-inside pl-4 text-muted-foreground space-y-2">
                  <li>All interest rates, tenures, and loan offerings listed are accurate and up to date.</li>
                  <li>They hold valid licenses issued by the Central Bank of Sri Lanka or corresponding local authorities.</li>
                  <li>They will treat customers in a professional, fair manner.</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                  <AlertTriangle className="w-6 h-6" />
                  <h2 className="text-2xl font-bold text-foreground">4. Disclaimers & Limitation of Liability</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  AurumLK provides comparison calculations "as is" and "as available." While we work to ensure partner information is accurate, we make no representations or warranties of any kind regarding the completeness or reliability of the rates listed.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall AurumLK be held liable for any disputes, losses, damage to collateral, or financial grievances arising from transactions entered into with any merchant partners featured on this platform.
                </p>
              </div>

              {/* Help & Support */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <span>Have questions regarding these terms? Contact us via our support page or email <a href="mailto:support@aurumlk.com" className="text-primary hover:underline font-semibold">support@aurumlk.com</a>.</span>
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
