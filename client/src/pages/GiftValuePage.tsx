import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import GiftValueCalculator from '@/components/calculators/GiftValueCalculator';
import FAQSection from '@/components/common/FAQSection';

export default function GiftValuePage() {
  const giftValueFAQs = [
    {
      question: "What's the most expensive TikTok gift?",
      answer: "The Universe gift is currently the most expensive TikTok gift, costing 34,999 coins (approximately $524 USD)."
    },
    {
      question: "Do creators get the full value of gifts?",
      answer: "No, creators typically receive about 50% of the gift's value after TikTok takes its commission. The exact percentage may vary."
    },
    {
      question: "Can I send gifts to any TikTok user?",
      answer: "Gifts can only be sent during live streams or to creators who have enabled gifts on their videos. Not all users can receive gifts."
    },
    {
      question: "Are there different gift categories?",
      answer: "Yes, TikTok gifts are categorized into Basic, Premium, and Special categories, with varying coin costs and visual effects."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TikTok Gift Value Calculator",
    "description": "Calculate the real money cost of TikTok gifts and their value to creators",
    "url": "https://tokrecharge.com/gift-value",
    "applicationCategory": "UtilityApplication"
  };

  return (
    <>
      <SEOHead 
        title="TikTok Gift Value Calculator - Check Gift Costs | TokRecharge.com"
        description="Calculate the real money cost of TikTok gifts including Rose, Lion, Galaxy, and Universe. See how much creators earn from each gift."
        keywords="tiktok gift value, tiktok gift cost, tiktok gift calculator, lion gift tiktok"
        canonical="https://tokrecharge.com/gift-value"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Tools', href: '/#tools' },
        { label: 'Gift Value Calculator' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-500 to-tiktok-cyan text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TikTok Gift Value Calculator
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Calculate the real money cost of TikTok gifts and see how much creators earn from each gift
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GiftValueCalculator />
          </div>
        </div>
      </section>

      {/* Gift Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">TikTok Gift Categories</h2>
              <p className="text-gray-600">Understanding different types of TikTok gifts</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-green-600">Basic Gifts</h3>
                <p className="text-gray-600 mb-4">
                  Affordable gifts that are perfect for regular interactions and showing appreciation.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Rose (1 coin)</li>
                  <li>• TikTok (5 coins)</li>
                  <li>• Sunglasses (10 coins)</li>
                  <li>• Heart Me (15 coins)</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Premium Gifts</h3>
                <p className="text-gray-600 mb-4">
                  Mid-range gifts with special animations and effects for bigger moments.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Paper Crane (99 coins)</li>
                  <li>• Lion (500 coins)</li>
                  <li>• Galaxy (1000 coins)</li>
                  <li>• Rocket (1500 coins)</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Legendary Gifts</h3>
                <p className="text-gray-600 mb-4">
                  High-value gifts with spectacular effects for the ultimate appreciation.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Adam's Dream (15,000 coins)</li>
                  <li>• Falcon (25,000 coins)</li>
                  <li>• Universe (34,999 coins)</li>
                  <li>• Drama Queen (5,000 coins)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={giftValueFAQs}
        title="TikTok Gift Value FAQ"
        description="Common questions about TikTok gift values and costs"
      />

      <Footer />
    </>
  );
}
