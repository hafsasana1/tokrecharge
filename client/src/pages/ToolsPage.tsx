import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import ToolCard from '@/components/common/ToolCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Coins, DollarSign, Globe, TrendingUp, Zap } from 'lucide-react';
import type { Tool } from '@shared/schema';

export default function ToolsPage() {
  const { data: tools = [], isLoading } = useQuery<Tool[]>({
    queryKey: ['/api/tools'],
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TikTok Tools - Complete Calculator Suite",
    "description": "Comprehensive collection of TikTok monetization tools including coin calculators, earnings estimators, gift value calculators, and pricing comparisons.",
    "url": "https://tokrecharge.com/tools",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "TikTok Calculator Tools",
      "applicationCategory": "FinanceApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };

  const features = [
    {
      icon: <Calculator className="w-8 h-8 text-purple-600" />,
      title: "Accurate Calculations",
      description: "Precise coin-to-currency conversions with real-time exchange rates"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Global Coverage",
      description: "Support for multiple countries and currencies worldwide"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Trend Analysis",
      description: "Track pricing trends and identify the best value opportunities"
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: "Instant Results",
      description: "Get immediate calculations and comparisons with live data"
    }
  ];

  return (
    <>
      <SEOHead 
        title="TikTok Tools - Complete Calculator & Converter Suite | TokRecharge.com"
        description="Free TikTok monetization tools including coin calculators, earnings estimators, gift value converters, withdrawal calculators, and global pricing comparisons. Get accurate real-time calculations for all TikTok currencies."
        keywords="tiktok tools, coin calculator, earnings calculator, gift value calculator, tiktok monetization tools, coin converter, withdrawal calculator, pricing comparison, tiktok currency tools"
        canonical="https://tokrecharge.com/tools"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Tools' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Calculator className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            TikTok Calculator Tools
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Complete suite of free calculators and converters for TikTok monetization, 
            earnings estimation, and pricing analysis
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-sm opacity-75">Total Tools</div>
              <div className="text-2xl font-bold">{tools.length}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-sm opacity-75">Free to Use</div>
              <div className="text-2xl font-bold">100%</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-sm opacity-75">Countries Supported</div>
              <div className="text-2xl font-bold">20+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              All TikTok Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to calculate, convert, and analyze TikTok monetization data
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose Our Tools?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade calculators designed for accuracy and ease of use
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Calculating Your TikTok Earnings
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Use our free tools to optimize your TikTok monetization strategy and maximize your earnings
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#tools" 
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <Coins className="w-5 h-5" />
                <span>Try Coin Calculator</span>
              </a>
              <a 
                href="/earnings-estimator" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center space-x-2"
              >
                <DollarSign className="w-5 h-5" />
                <span>Estimate Earnings</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}