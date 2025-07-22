import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import CoinToDiamondConverter from '@/components/calculators/CoinToDiamondConverter';
import FAQSection from '@/components/common/FAQSection';

export default function CoinToDiamondPage() {
  const diamondFAQs = [
    {
      question: "What's the difference between TikTok coins and diamonds?",
      answer: "Coins are purchased by users to send gifts, while diamonds are what creators receive. The conversion is typically 2 coins = 1 diamond, representing TikTok's commission structure."
    },
    {
      question: "Can I convert diamonds back to coins?",
      answer: "No, diamonds cannot be converted back to coins. Diamonds are the creator's earnings and can only be converted to real money through TikTok's withdrawal system."
    },
    {
      question: "Why do creators get diamonds instead of coins?",
      answer: "The diamond system represents TikTok's commission structure. When users send gifts worth coins, creators receive diamonds (typically 50% of the coin value) as their earnings."
    },
    {
      question: "How do I withdraw diamonds as cash?",
      answer: "Creators can withdraw diamonds as real money through TikTok's creator dashboard once they reach the minimum withdrawal threshold (varies by region)."
    },
    {
      question: "Do all gifts convert at the same rate?",
      answer: "Yes, all gifts follow the same conversion rate of 2 coins = 1 diamond. However, the final amount may vary based on regional policies and fees."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TikTok Coins to Diamonds Converter",
    "description": "Convert TikTok coins to diamonds and understand the internal currency system",
    "url": "https://tokrecharge.com/coin-to-diamond",
    "applicationCategory": "UtilityApplication"
  };

  return (
    <>
      <SEOHead 
        title="TikTok Coins to Diamonds Converter - 2:1 Conversion Rate Calculator | TokRecharge.com"
        description="Convert TikTok coins to diamonds with exact 2:1 ratio. Understand creator currency system, commission rates, and how diamonds work for withdrawals. Free conversion calculator."
        keywords="coins to diamonds tiktok, tiktok diamond converter, 2 coins 1 diamond, tiktok creator currency, diamond withdrawal calculator"
        canonical="https://tokrecharge.com/coin-to-diamond"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Tools', href: '/#tools' },
        { label: 'Coins to Diamonds' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-tiktok-pink to-purple-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TikTok Coins to Diamonds Converter
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Understand TikTok's internal currency system and convert between coins and diamonds
          </p>
        </div>
      </section>

      {/* Converter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <CoinToDiamondConverter />
          </div>
        </div>
      </section>

      {/* Currency System Explanation */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">TikTok's Currency System Explained</h2>
              <p className="text-gray-600">How coins and diamonds work in TikTok's ecosystem</p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-3">🪙</span>
                  TikTok Coins (User Currency)
                </h3>
                <p className="text-gray-600 mb-4">
                  Coins are the virtual currency that users purchase with real money to send gifts to creators. 
                  They're the input currency of TikTok's economy.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Purchased by users with real money</li>
                  <li>• Used to buy gifts for creators</li>
                  <li>• Cannot be converted back to cash</li>
                  <li>• Prices vary by country and package size</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-3">💎</span>
                  TikTok Diamonds (Creator Currency)
                </h3>
                <p className="text-gray-600 mb-4">
                  Diamonds are what creators receive when users send them gifts. 
                  They represent the creator's earnings and can be converted to real money.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Received by creators from gifts</li>
                  <li>• Can be withdrawn as real money</li>
                  <li>• Conversion rate: 2 coins = 1 diamond</li>
                  <li>• Minimum withdrawal thresholds apply</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-3">🔄</span>
                  Conversion Process
                </h3>
                <p className="text-gray-600 mb-4">
                  The conversion from coins to diamonds represents TikTok's commission structure 
                  and the platform's revenue model.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">Example Transaction</div>
                    <div className="space-y-2 text-sm">
                      <div>User sends 1000 coins worth of gifts</div>
                      <div>↓</div>
                      <div>Creator receives 500 diamonds</div>
                      <div>↓</div>
                      <div>Creator can withdraw ~$7.50 USD</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={diamondFAQs}
        title="Coins to Diamonds FAQ"
        description="Common questions about TikTok's currency conversion system"
      />

      <Footer />
    </>
  );
}
