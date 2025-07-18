import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import EarningsCalculator from '@/components/calculators/EarningsCalculator';
import FAQSection from '@/components/common/FAQSection';

export default function EarningsEstimatorPage() {
  const earningsFAQs = [
    {
      question: "How much does TikTok pay per 1000 views?",
      answer: "TikTok doesn't pay directly for views. Creators earn money through the Creator Fund, live gifts, and brand partnerships. Live gifts are the primary way to earn from TikTok coins."
    },
    {
      question: "What percentage does TikTok take from gifts?",
      answer: "TikTok typically takes around 50% commission from gifts. So if someone sends you a gift worth $10, you'll receive approximately $5."
    },
    {
      question: "When can I withdraw my TikTok earnings?",
      answer: "You can withdraw your earnings once you reach the minimum threshold (usually $20-50 depending on your region) and have connected a valid payment method."
    },
    {
      question: "Are there other ways to earn on TikTok?",
      answer: "Yes, besides gifts, creators can earn through the Creator Fund, brand partnerships, affiliate marketing, and promoting their own products or services."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TikTok Earnings Calculator",
    "description": "Calculate your TikTok earnings from gifts and live streams",
    "url": "https://tokrecharge.com/earnings-estimator",
    "applicationCategory": "UtilityApplication"
  };

  return (
    <>
      <SEOHead 
        title="TikTok Earnings Calculator - Estimate Creator Income | TokRecharge.com"
        description="Calculate your TikTok earnings from gifts and live streams. Estimate how much you can earn as a TikTok creator with our free earnings calculator."
        keywords="tiktok earnings calculator, tiktok live earnings, tiktok creator income, tiktok monetization"
        canonical="https://tokrecharge.com/earnings-estimator"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Tools', href: '/#tools' },
        { label: 'Earnings Calculator' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-tiktok-cyan text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TikTok Earnings Calculator
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Estimate your TikTok earnings from gifts and live streams after TikTok's commission
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <EarningsCalculator />
          </div>
        </div>
      </section>

      {/* Monetization Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">TikTok Monetization Tips</h2>
              <p className="text-gray-600">Maximize your earnings as a TikTok creator</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Go Live Regularly</h3>
                <p className="text-gray-600">
                  Live streaming is the primary way to receive gifts on TikTok. 
                  Consistent live streaming helps build a loyal audience who are 
                  more likely to send gifts and support your content.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Engage with Your Audience</h3>
                <p className="text-gray-600">
                  Respond to comments, acknowledge gift senders, and create 
                  interactive content. The more engaged your audience feels, 
                  the more likely they are to support you with gifts.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Create Quality Content</h3>
                <p className="text-gray-600">
                  High-quality, entertaining content attracts more viewers and 
                  followers. Focus on trends, use good lighting, and create 
                  content that resonates with your target audience.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Diversify Income Streams</h3>
                <p className="text-gray-600">
                  Don't rely solely on gifts. Explore brand partnerships, 
                  affiliate marketing, merchandise sales, and other monetization 
                  opportunities to maximize your earnings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={earningsFAQs}
        title="TikTok Earnings FAQ"
        description="Common questions about TikTok monetization and earnings"
      />

      <Footer />
    </>
  );
}
