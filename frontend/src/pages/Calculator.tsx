import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calculator as CalcIcon, TrendingUp, DollarSign } from "lucide-react";

export default function Calculator() {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interestRate, setInterestRate] = useState("1.5");
  const [tenure, setTenure] = useState("6");

  const calculateMonthlyInterest = () => {
    const amount = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    return (amount * rate) / 100;
  };

  const calculateTotalRepayment = () => {
    const amount = parseFloat(loanAmount) || 0;
    const months = parseInt(tenure) || 0;
    return amount + calculateMonthlyInterest() * months;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/70 to-secondary py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <CalcIcon className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">Gold Loan Calculator</h1>
              <p className="text-lg text-muted-foreground">
                Calculate your monthly interest and total repayment amount.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card rounded-3xl shadow-sm border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Loan Details</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Loan Amount (LKR)
                    </label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                      placeholder="100000"
                    />
                    <input
                      type="range"
                      min="10000"
                      max="10000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full mt-3"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>10,000</span>
                      <span>10,000,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Monthly Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                      placeholder="1.5"
                    />
                    <input
                      type="range"
                      min="0.5"
                      max="5"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full mt-3"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0.5%</span>
                      <span>5%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Loan Tenure (Months)
                    </label>
                    <select
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                    >
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="9">9 Months</option>
                      <option value="12">12 Months</option>
                      <option value="18">18 Months</option>
                      <option value="24">24 Months</option>
                    </select>
                  </div>

                  <button className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg">
                    Recalculate
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card rounded-3xl shadow-sm border border-border p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Calculation Results</h2>

                  <div className="space-y-6">
                    <div className="bg-primary/10 rounded-3xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <DollarSign className="w-6 h-6 text-primary" />
                        <span className="text-muted-foreground">Principal Amount</span>
                      </div>
                      <div className="text-3xl font-bold text-foreground">
                        LKR {parseFloat(loanAmount).toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-secondary/10 rounded-3xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <TrendingUp className="w-6 h-6 text-secondary" />
                        <span className="text-muted-foreground">Monthly Interest</span>
                      </div>
                      <div className="text-3xl font-bold text-foreground">
                        LKR {calculateMonthlyInterest().toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Per month for {tenure} months
                      </div>
                    </div>

                    <div className="bg-card/80 rounded-3xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <CalcIcon className="w-6 h-6 text-primary" />
                        <span className="text-muted-foreground">Total Repayment</span>
                      </div>
                      <div className="text-3xl font-bold text-foreground">
                        LKR {calculateTotalRepayment().toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Principal + Interest for {tenure} months
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="font-semibold text-foreground mb-3">Breakdown</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Total Interest:</span>
                          <span className="font-semibold text-foreground">
                            LKR {(calculateMonthlyInterest() * parseInt(tenure)).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Interest Rate:</span>
                          <span className="font-semibold text-foreground">{(parseFloat(interestRate) * 12).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/30 rounded-3xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">💡 Pro Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare offers from multiple centers to find the best interest rate and save money on your loan!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-card rounded-3xl border border-border shadow-sm p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Find the Best Rates
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Now that you know your loan requirements, browse our verified offers to find the best deal.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/offers"
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-center"
                >
                  Browse Offers
                </a>
                <a
                  href="/compare"
                  className="px-8 py-3 border border-border rounded-lg hover:bg-card/80 transition-colors font-semibold text-center text-foreground"
                >
                  Compare Offers
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

