import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { HeaderAd, FooterAd } from '@/components/ads/AdSenseAd';
import { Users, Target, Shield, Award } from 'lucide-react';

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About TokRecharge.com",
    "description": "Learn about TokRecharge.com - Your trusted source for TikTok coin calculations and monetization tools",
    "url": "https://tokrecharge.com/about"
  };

  return (
    <>
      <SEOHead 
        title="About Us - TokRecharge.com | TikTok Coin Calculator Experts"
        description="Learn about TokRecharge.com - your trusted source for accurate TikTok coin calculations, gift values, and creator monetization tools. Serving creators worldwide since 2024."
        keywords="about tokrecharge, tiktok calculator team, coin conversion experts, tiktok monetization tools"
        canonical="https://tokrecharge.com/about"
        schemaData={schemaData}
      />
      
      <Header />
      
      <HeaderAd pageType="about" />
      
      <Breadcrumb items={[{ label: 'About Us', href: '/about' }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              About TokRecharge.com
            </h1>
            <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in TikTok monetization, providing accurate coin calculations and valuable insights for creators and fans worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At TokRecharge.com, we're dedicated to empowering TikTok creators and fans with accurate, 
                up-to-date information about coin values, gift prices, and monetization opportunities.
              </p>
              <p className="text-lg text-gray-600">
                We believe that understanding TikTok's virtual economy shouldn't be complicated. 
                That's why we've created simple, reliable tools that help you make informed decisions 
                about your TikTok investments and earnings.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <Target className="w-16 h-16 text-purple-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Why We Started</h3>
              <p className="text-gray-600">
                We noticed creators struggling to understand TikTok's complex pricing structures across different countries. 
                Our goal is to bring transparency and clarity to the TikTok economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at TokRecharge.com
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Accuracy First</h3>
              <p className="text-gray-600">
                We provide only verified, up-to-date information about TikTok coin rates and pricing across all supported countries.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Creator-Focused</h3>
              <p className="text-gray-600">
                Every tool we build is designed with creators in mind, helping you maximize your TikTok earnings and understand your audience better.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Award className="w-12 h-12 text-pink-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Always Free</h3>
              <p className="text-gray-600">
                We believe essential monetization tools should be accessible to all creators, which is why all our calculators are completely free to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights for TikTok monetization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🪙</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Coin Calculator</h3>
              <p className="text-gray-600">
                Convert TikTok coins to real currency with accurate exchange rates for your country.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Gift Value Analysis</h3>
              <p className="text-gray-600">
                Understand the real value of TikTok gifts and plan your gifting strategy effectively.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Earnings Estimator</h3>
              <p className="text-gray-600">
                Calculate potential earnings from your TikTok live streams and gift interactions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Global Pricing</h3>
              <p className="text-gray-600">
                Compare TikTok coin prices across different countries and find the best deals.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Analytics Tools</h3>
              <p className="text-gray-600">
                Track your monetization performance and optimize your earning strategies.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Educational Content</h3>
              <p className="text-gray-600">
                Stay updated with the latest TikTok monetization tips and industry insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Thousands of Creators</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start using our free tools today and take control of your TikTok monetization journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/coin-calculator" 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
            >
              Start Calculating
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-block"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <FooterAd pageType="about" />
      
      <Footer />
    </>
  );
}