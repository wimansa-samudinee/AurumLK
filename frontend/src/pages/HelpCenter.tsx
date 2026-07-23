import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HelpCircle, Search, ChevronDown, ChevronUp, BookOpen, Compass, Briefcase } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "customer" | "business";
}

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "general" | "customer" | "business">("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: "general",
      question: "What is AurumLK?",
      answer: "AurumLK is Sri Lanka's leading gold loan comparison platform. We compile interest rates, terms, and branches of registered pawning centers across the country, letting you find and compare options in one convenient dashboard.",
    },
    {
      category: "general",
      question: "Is AurumLK a bank or direct lender?",
      answer: "No, AurumLK is an information portal and connector. We do not offer loans, accept jewelry, or charge interest ourselves. We connect you directly with licensed, verified pawning partners.",
    },
    {
      category: "customer",
      question: "How do I choose the best gold loan offer?",
      answer: "Use our 'Compare Offers' tools and input your estimated weight or funding needs in our 'Loan Calculator'. Look at the monthly interest rate, maximum loan value (LTV), tenure constraints, and branch proximity before selecting the partner.",
    },
    {
      category: "customer",
      question: "Is my gold jewelry secure with your partners?",
      answer: "Yes. We only partner with and list verified pawnshops and finance institutions licensed by local financial regulators. They secure your physical items in certified vaults with full insurance coverage.",
    },
    {
      category: "customer",
      question: "How do I submit an inquiry?",
      answer: "Once you find a suitable loan offer, click 'View Details' and fill out the Inquiry form. The partner branch will receive your request and contact you directly via phone or email.",
    },
    {
      category: "business",
      question: "How can my financial center list offers on AurumLK?",
      answer: "To list your offers, click 'Register' and choose the 'Business' profile. Once our admin team verifies your business license and details, you'll gain access to a dashboard to publish branches and offers.",
    },
    {
      category: "business",
      question: "How much does it cost to list our business?",
      answer: "We offer entry level listing plans for local pawning centers. Please contact our merchant support team at partners@aurumlk.com to receive full catalog options.",
    },
  ];

  // Filter FAQs
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-background via-secondary/70 to-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-9 h-9 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Help Center & FAQ</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to commonly asked questions about comparing gold loans, center security, and account management.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for questions (e.g. interest rate, center...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl shadow-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Category Selectors */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { id: "all", label: "All FAQ", icon: BookOpen },
                { id: "general", label: "General", icon: Compass },
                { id: "customer", label: "For Customers", icon: HelpCircle },
                { id: "business", label: "For Businesses", icon: Briefcase },
              ].map((cat) => {
                const Icon = cat.icon;
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id as any);
                      setExpandedIndex(null);
                    }}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-primary text-white border-primary shadow-md scale-105"
                        : "bg-card text-muted-foreground border-border hover:bg-muted/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* FAQ Accordion List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full flex items-center justify-between p-6 text-left font-semibold text-lg hover:text-primary transition-colors cursor-pointer"
                    >
                      <span className="pr-4">{faq.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-96 opacity-100 border-t border-border" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="p-6 text-muted-foreground leading-relaxed bg-muted/5">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="py-12 text-center text-muted-foreground font-semibold bg-card rounded-2xl border">
                  No questions match your filter query. Please search with a different keyword.
                </div>
              )}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
