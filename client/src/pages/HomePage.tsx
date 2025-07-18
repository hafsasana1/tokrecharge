import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import CoinCalculator from '@/components/calculators/CoinCalculator';
import ToolCard from '@/components/common/ToolCard';
import CountryCard from '@/components/common/CountryCard';
import BlogCard from '@/components/common/BlogCard';
import FAQSection from '@/components/common/FAQSection';
import { FAQ_DATA } from '@/lib/constants';
import type { Tool, Country, BlogPost } from '@shared/schema';

export default function HomePage() {
  const { data: tools = [] } = useQuery<Tool[]>({
    queryKey: ['/api/tools'],
  });

  const { data: countries = [] } = useQuery<Country[]>({
    queryKey: ['/api/countries'],
  });

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TokRecharge.com",
    "description": "TikTok Coin Calculator and Recharge Tools",
    "url": "https://tokrecharge.com",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEOHead 
        title="TokRecharge.com - TikTok Coin Calculator & Recharge Tools"
        description="Calculate TikTok coin values, compare recharge prices, estimate earnings, and convert gifts to cash. Free TikTok calculator tools for creators and fans."
        keywords="tiktok coin calculator, tiktok recharge price, tiktok gift value, tiktok earnings calculator"
        canonical="https://tokrecharge.com"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[{ label: 'TikTok Tools' }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-tiktok-pink via-purple-500 to-tiktok-cyan text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            TikTok Coin Calculator & Tools
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Calculate coin values, compare recharge prices, estimate earnings, and convert gifts to real cash. 
            All your TikTok money tools in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-tiktok-pink hover:bg-gray-100">
              <a href="#coin-calculator">Start Calculating</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-tiktok-pink">
              <a href="#tools">View All Tools</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Calculator */}
      <section id="coin-calculator" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">TikTok Coin to Currency Calculator</h2>
              <p className="text-gray-600">Convert TikTok coins to real money instantly</p>
            </div>
            
            <CoinCalculator />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16 bg-tiktok-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">All TikTok Tools</h2>
            <p className="text-gray-600">Comprehensive suite of calculators and converters</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Country-Specific Pages */}
      <section id="countries" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Country-Specific Pricing</h2>
            <p className="text-gray-600">TikTok coin rates vary by country. Find your local pricing.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {countries.slice(0, 3).map((country) => (
              <CountryCard 
                key={country.id} 
                country={country}
                samplePrice={`70 coins = ${country.currency} ${(70 * parseFloat(country.coinRate)).toFixed(2)}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 bg-tiktok-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">TikTok Money Blog</h2>
            <p className="text-gray-600">Latest guides and insights about TikTok monetization</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={FAQ_DATA} />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-tiktok-pink to-tiktok-cyan text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Using Our TikTok Tools</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of creators and fans who use our calculators daily</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-tiktok-pink hover:bg-gray-100">
              <a href="#coin-calculator">Calculate Coins Now</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-tiktok-pink">
              <a href="#tools">Browse All Tools</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
