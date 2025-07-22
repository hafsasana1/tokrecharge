import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import WithdrawCalculator from '@/components/calculators/WithdrawCalculator';
import FAQSection from '@/components/common/FAQSection';

export default function WithdrawValuePage() {
  const withdrawFAQs = [
    {
      question: "What's the minimum withdrawal amount on TikTok?",
      answer: "The minimum withdrawal amount varies by region: $20 USD in the US, ₹1500 in India, and similar equivalent amounts in other countries."
    },
    {
      question: "How long does it take to withdraw TikTok earnings?",
      answer: "TikTok withdrawals typically take 3-5 business days to process, though this can vary based on your payment method and region."
    },
    {
      question: "What payment methods are available for withdrawals?",
      answer: "TikTok supports various payment methods including bank transfers, PayPal, and local payment systems depending on your country."
    },
    {
      question: "Are there additional fees for withdrawing?",
      answer: "Yes, TikTok may charge withdrawal fees ranging from 2-7% depending on your region and payment method. Some payment providers may also charge their own fees."
    },
    {
      question: "Can I withdraw earnings in any currency?",
      answer: "You can typically withdraw in your local currency. TikTok will convert diamonds to your local currency at current exchange rates."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TikTok Withdrawal Calculator",
    "description": "Calculate your final TikTok withdrawal amount after all fees and commissions",
    "url": "https://tokrecharge.com/withdraw-value",
    "applicationCategory": "UtilityApplication"
  };

  return (
    <>
      <SEOHead 
        title="TikTok Withdrawal Calculator - Calculate Final Payout After Fees | TokRecharge.com"
        description="Calculate exact TikTok withdrawal amount after all fees, taxes, and commissions. See minimum withdrawal limits, processing fees, and final payout for diamonds to cash conversion."
        keywords="tiktok withdrawal calculator, diamond to cash calculator, tiktok payout fees, withdrawal minimum amount, creator cash out"
        canonical="https://tokrecharge.com/withdraw-value"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Tools', href: '/#tools' },
        { label: 'Withdrawal Calculator' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-tiktok-pink text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TikTok Withdrawal Calculator
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Calculate your final withdrawal amount after TikTok fees and commissions
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <WithdrawCalculator />
          </div>
        </div>
      </section>

      {/* Withdrawal Guide Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">TikTok Withdrawal Guide</h2>
              <p className="text-gray-600">Step-by-step guide to withdrawing your earnings</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-tiktok-pink text-white rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Meet the Minimum Threshold</h3>
                    <p className="text-gray-600">
                      Ensure you have enough diamonds to meet the minimum withdrawal requirement for your region. 
                      This is typically $20 USD or equivalent in your local currency.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-tiktok-pink text-white rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Set Up Payment Method</h3>
                    <p className="text-gray-600">
                      Go to your TikTok Creator Dashboard and add a valid payment method such as bank account, 
                      PayPal, or other supported payment systems in your region.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-tiktok-pink text-white rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Request Withdrawal</h3>
                    <p className="text-gray-600">
                      Navigate to the withdrawal section in your creator dashboard, select your payment method, 
                      and request the withdrawal of your diamonds.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-tiktok-pink text-white rounded-full flex items-center justify-center font-bold mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Wait for Processing</h3>
                    <p className="text-gray-600">
                      TikTok will process your withdrawal request within 3-5 business days. 
                      You'll receive a notification when the payment is completed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={withdrawFAQs}
        title="TikTok Withdrawal FAQ"
        description="Common questions about withdrawing TikTok earnings"
      />

      <Footer />
    </>
  );
}
