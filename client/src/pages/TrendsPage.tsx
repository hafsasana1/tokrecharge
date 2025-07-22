import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/common/SEOHead';
import { TrendingUp, DollarSign, Users, Gift, Calculator, Eye, Clock, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface TrendData {
  id: number;
  title: string;
  category: string;
  coinValue: number;
  growthPercentage: number;
  popularity: 'Hot' | 'Rising' | 'Stable';
  description: string;
  relatedTools: string[];
}

// Mock trending data - in production this would come from an API
const trendingData: TrendData[] = [
  {
    id: 1,
    title: "Live Streaming Gifts Surge",
    category: "Gift Trends",
    coinValue: 2500,
    growthPercentage: 45,
    popularity: "Hot",
    description: "Virtual gifts during live streams have increased by 45% this month, with premium gifts like 'Universe' and 'Drama Queen' leading the trend.",
    relatedTools: ["gift-value", "earnings-estimator"]
  },
  {
    id: 2,
    title: "Cross-Country Coin Arbitrage",
    category: "Pricing Trends",
    coinValue: 1000,
    growthPercentage: 23,
    popularity: "Rising",
    description: "Users are discovering significant savings by comparing TikTok coin prices across different countries, with up to 30% cost differences.",
    relatedTools: ["recharge-prices", "coin-calculator"]
  },
  {
    id: 3,
    title: "Creator Monetization Growth",
    category: "Earnings Trends",
    coinValue: 5000,
    growthPercentage: 67,
    popularity: "Hot",
    description: "TikTok creator earnings from virtual gifts have grown by 67% as more users engage with live content and support their favorite creators.",
    relatedTools: ["earnings-estimator", "withdraw-value"]
  },
  {
    id: 4,
    title: "Diamond Conversion Optimization",
    category: "Currency Trends",
    coinValue: 1500,
    growthPercentage: 18,
    popularity: "Stable",
    description: "Creators are optimizing their diamond-to-cash conversion strategies, understanding the most efficient withdrawal methods.",
    relatedTools: ["coin-to-diamond", "withdraw-value"]
  }
];

const countryTrends = [
  { country: "United States", flag: "🇺🇸", coinPrice: "$0.0134", trend: "+12%", savings: "Base Price" },
  { country: "India", flag: "🇮🇳", coinPrice: "₹0.89", trend: "+8%", savings: "Save 25%" },
  { country: "Pakistan", flag: "🇵🇰", coinPrice: "PKR 2.1", trend: "+15%", savings: "Save 30%" },
  { country: "United Kingdom", flag: "🇬🇧", coinPrice: "£0.011", trend: "+5%", savings: "Save 10%" }
];

export default function TrendsPage() {
  const { data: countries } = useQuery({
    queryKey: ['/api/countries'],
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TikTok Trends & Market Analysis",
    "description": "Latest TikTok coin trends, gift popularity, creator earnings insights, and market analysis. Stay updated with real-time TikTok monetization trends.",
    "url": "https://tokrecharge.com/trends",
    "mainEntity": {
      "@type": "ItemList",
      "name": "TikTok Market Trends",
      "itemListElement": trendingData.map((trend, index) => ({
        "@type": "Article",
        "position": index + 1,
        "name": trend.title,
        "description": trend.description,
        "about": {
          "@type": "Thing",
          "name": trend.category
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tokrecharge.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Trends",
          "item": "https://tokrecharge.com/trends"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead 
        title="TikTok Trends & Market Analysis - Coin Prices, Gift Popularity & Creator Earnings | TokRecharge.com"
        description="Discover latest TikTok trends: coin price fluctuations, popular gifts, creator earnings growth, and market insights. Real-time analysis of TikTok monetization trends across global markets."
        keywords="tiktok trends, tiktok coin trends, tiktok gift trends, creator earnings trends, tiktok market analysis, viral gifts, coin price trends, tiktok monetization trends"
        canonical="https://tokrecharge.com/trends"
        schemaData={schemaData}
      />
      
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TikTok Trends & Market Analysis
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Stay ahead with real-time insights on TikTok coin prices, gift popularity, creator earnings, and market trends across global regions
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Eye className="w-4 h-4 mr-1" />
              Real-time Analysis
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Globe className="w-4 h-4 mr-1" />
              Global Markets
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Clock className="w-4 h-4 mr-1" />
              Updated Daily
            </Badge>
          </div>
        </div>
      </section>



      {/* Trending Now Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Trending Now</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the hottest trends in TikTok monetization, from viral gifts to creator earnings patterns
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {trendingData.map((trend) => (
              <Card key={trend.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant={trend.popularity === 'Hot' ? 'destructive' : trend.popularity === 'Rising' ? 'default' : 'secondary'}
                      className="flex items-center gap-1"
                    >
                      {trend.popularity === 'Hot' && <TrendingUp className="w-3 h-3" />}
                      {trend.popularity}
                    </Badge>
                    <div className="flex items-center text-green-600 font-semibold">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +{trend.growthPercentage}%
                    </div>
                  </div>
                  <CardTitle className="text-xl">{trend.title}</CardTitle>
                  <CardDescription className="text-sm text-purple-600 font-medium">
                    {trend.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{trend.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-lg font-bold text-gray-900">
                      <DollarSign className="w-5 h-5 mr-1" />
                      {(trend.coinValue * 0.0134).toFixed(2)} USD
                    </div>
                    <div className="text-sm text-gray-500">
                      {trend.coinValue.toLocaleString()} coins
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trend.relatedTools.map((tool) => (
                      <Link key={tool} href={`/${tool}`}>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Calculator className="w-3 h-3 mr-1" />
                          {tool.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Country Pricing Trends */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Global Pricing Trends</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track TikTok coin pricing trends across different countries and identify the best value opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {countryTrends.map((country, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="text-4xl mb-2">{country.flag}</div>
                  <CardTitle className="text-lg">{country.country}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {country.coinPrice}
                  </div>
                  <div className="flex items-center justify-center text-green-600 font-semibold mb-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {country.trend}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {country.savings}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/recharge-prices">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Globe className="w-5 h-5 mr-2" />
                Compare All Countries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Market Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key statistics and insights about TikTok's virtual economy and creator monetization
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Creator Growth</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">+67%</div>
              <p className="text-gray-600 text-sm">
                Monthly increase in creator earnings from virtual gifts and live streaming
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Popular Gifts</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">+45%</div>
              <p className="text-gray-600 text-sm">
                Increase in premium gift usage during live streams and special events
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cost Savings</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
              <p className="text-gray-600 text-sm">
                Maximum savings possible by comparing coin prices across different countries
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Using Our TikTok Tools</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Take advantage of these trends with our comprehensive TikTok calculator tools
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/coin-calculator">
              <Button size="lg" variant="secondary">
                <Calculator className="w-5 h-5 mr-2" />
                Coin Calculator
              </Button>
            </Link>
            <Link href="/gift-value">
              <Button size="lg" variant="secondary">
                <Gift className="w-5 h-5 mr-2" />
                Gift Value Calculator
              </Button>
            </Link>
            <Link href="/earnings-estimator">
              <Button size="lg" variant="secondary">
                <DollarSign className="w-5 h-5 mr-2" />
                Earnings Estimator
              </Button>
            </Link>
          </div>
        </div>
      </section>



      <Footer />
    </>
  );
}