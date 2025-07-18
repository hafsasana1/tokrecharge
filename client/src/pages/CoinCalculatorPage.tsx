import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import CoinCalculator from '@/components/calculators/CoinCalculator';
import FAQSection from '@/components/common/FAQSection';

export default function CoinCalculatorPage() {
  const coinCalculatorFAQs = [
    {
      question: "How accurate is the TikTok coin calculator?",
      answer: "Our calculator uses the most up-to-date exchange rates and TikTok's official coin values. However, exact rates may vary slightly based on your location and current promotions."
    },
    {
      question: "Can I use this calculator for any currency?",
      answer: "Yes, our calculator supports multiple currencies including USD, INR, PKR, EUR, GBP, and CAD. We regularly update exchange rates to ensure accuracy."
    },
    {
      question: "Does TikTok coin value change?",
      answer: "TikTok coin values are generally stable, but they can fluctuate based on regional pricing strategies and currency exchange rates."
    },
    {
      question: "Is there a minimum number of coins I need to calculate?",
      answer: "No, you can calculate the value of any number of TikTok coins, from 1 coin to thousands of coins."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TikTok Coin Calculator",
    "description": "Calculate the real money value of TikTok coins in multiple currencies",
    "url": "https://tokrecharge.com/coin-calculator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All"
  };

  return (
    <>
      <SEOHead 
        title="TikTok Coin Calculator - Convert Coins to Real Money | TokRecharge.com"
        description="Calculate the exact value of your TikTok coins in multiple currencies. Convert TikTok coins to USD, INR, PKR, EUR, GBP, and more with our free calculator."
        keywords="tiktok coin calculator, tiktok coin value, convert tiktok coins, tiktok coin worth"
        canonical="https://tokrecharge.com/coin-calculator"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Tools', href: '/#tools' },
        { label: 'Coin Calculator' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-tiktok-pink to-tiktok-cyan text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TikTok Coin Calculator
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Calculate the real money value of your TikTok coins in multiple currencies instantly
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <CoinCalculator />
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How TikTok Coins Work</h2>
              <p className="text-gray-600">Understanding TikTok's virtual currency system</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">What are TikTok Coins?</h3>
                <p className="text-gray-600">
                  TikTok coins are virtual currency that users can purchase with real money. 
                  These coins are used to buy gifts for creators during live streams or to 
                  show appreciation for their content.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">How to Buy TikTok Coins</h3>
                <p className="text-gray-600">
                  You can purchase TikTok coins directly through the app using various payment 
                  methods including credit cards, PayPal, and mobile payments. Prices vary by 
                  region and currency.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Coin Values by Region</h3>
                <p className="text-gray-600">
                  TikTok coin prices differ across countries due to local currency rates and 
                  regional pricing strategies. Our calculator accounts for these differences 
                  to provide accurate conversions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Using Coins for Gifts</h3>
                <p className="text-gray-600">
                  Coins can be used to purchase virtual gifts ranging from roses (1 coin) 
                  to expensive items like the Universe gift (34,999 coins). Each gift has 
                  a specific coin cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={coinCalculatorFAQs}
        title="TikTok Coin Calculator FAQ"
        description="Common questions about calculating TikTok coin values"
      />

      <Footer />
    </>
  );
}
