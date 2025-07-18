import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import RechargeComparison from '@/components/calculators/RechargeComparison';
import FAQSection from '@/components/common/FAQSection';

export default function RechargePricesPage() {
  const rechargeFAQs = [
    {
      question: "Why do TikTok coin prices vary by country?",
      answer: "TikTok adjusts coin prices based on local currency values, purchasing power, and regional market conditions. This ensures fair pricing across different economies."
    },
    {
      question: "Which country has the cheapest TikTok coins?",
      answer: "Coin prices vary frequently, but generally countries with weaker currencies may have relatively cheaper coin rates. However, this is balanced by TikTok's regional pricing strategy."
    },
    {
      question: "Can I buy TikTok coins from a different country?",
      answer: "TikTok detects your location and applies local pricing. Using VPNs or changing locations to get cheaper coins may violate TikTok's terms of service."
    },
    {
      question: "Are there bulk discounts for TikTok coins?",
      answer: "Yes, larger coin packages typically offer better value per coin. The per-coin cost usually decreases as you purchase larger quantities."
    },
    {
      question: "How often do TikTok coin prices change?",
      answer: "TikTok coin prices are generally stable but can change based on currency fluctuations, regional economic conditions, and platform updates."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TikTok Recharge Prices Comparison",
    "description": "Compare TikTok coin recharge prices across different countries and packages",
    "url": "https://tokrecharge.com/recharge-prices",
    "applicationCategory": "UtilityApplication"
  };

  return (
    <>
      <SEOHead 
        title="TikTok Recharge Prices - Compare Coin Packages by Country | TokRecharge.com"
        description="Compare TikTok coin recharge prices across different countries. Find the best value packages and see pricing differences between regions."
        keywords="tiktok recharge prices, tiktok coin packages, buy tiktok coins, tiktok coin price comparison"
        canonical="https://tokrecharge.com/recharge-prices"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Tools', href: '/#tools' },
        { label: 'Recharge Prices' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-tiktok-cyan to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TikTok Recharge Prices Comparison
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Compare TikTok coin packages across different countries and find the best value for your money
          </p>
        </div>
      </section>

      {/* Comparison Tool Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Country-wise Coin Packages</h2>
              <p className="text-gray-600">Select a country to see available coin packages and pricing</p>
            </div>
            
            <RechargeComparison />
          </div>
        </div>
      </section>

      {/* Pricing Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Smart Buying Tips</h2>
              <p className="text-gray-600">Get the most value from your TikTok coin purchases</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Buy in Bulk</h3>
                <p className="text-gray-600">
                  Larger coin packages typically offer better value per coin. 
                  If you're a regular TikTok user, consider buying larger packages 
                  to get more coins for your money.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Watch for Promotions</h3>
                <p className="text-gray-600">
                  TikTok occasionally offers bonus coins or special promotions. 
                  Keep an eye out for these deals, especially during holidays 
                  or special events.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Compare Payment Methods</h3>
                <p className="text-gray-600">
                  Different payment methods may have varying fees or exchange rates. 
                  Compare options like credit cards, PayPal, or mobile payments 
                  to find the best deal.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Budget Wisely</h3>
                <p className="text-gray-600">
                  Set a monthly budget for TikTok coins and stick to it. 
                  Virtual gifts can add up quickly, so it's important to 
                  spend responsibly within your means.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={rechargeFAQs}
        title="TikTok Recharge Prices FAQ"
        description="Common questions about TikTok coin pricing and purchases"
      />

      <Footer />
    </>
  );
}
