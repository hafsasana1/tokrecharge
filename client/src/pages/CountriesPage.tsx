import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Search, TrendingUp, ArrowRight, Star, DollarSign } from 'lucide-react';
import { Link } from 'wouter';
import { formatCurrency } from '@/lib/calculations';
import type { Country } from '@shared/schema';

export default function CountriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null);

  const { data: countries = [], isLoading } = useQuery<Country[]>({
    queryKey: ['/api/countries'],
  });

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TikTok Coin Prices by Country - Global Pricing Guide",
    "description": "Complete guide to TikTok coin prices across different countries. Compare rates, find the best deals, and understand regional pricing differences for TikTok coins worldwide.",
    "url": "https://tokrecharge.com/countries",
    "mainEntity": {
      "@type": "ItemList",
      "name": "TikTok Coin Prices by Country",
      "numberOfItems": countries.length,
      "itemListElement": countries.map((country, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `TikTok Coins in ${country.name}`,
          "offers": {
            "@type": "Offer",
            "priceCurrency": country.currency,
            "price": country.coinRate
          }
        }
      }))
    }
  };

  const stats = [
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      label: "Countries",
      value: countries.length
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      label: "Currencies",
      value: new Set(countries.map(c => c.currency)).size
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      label: "Live Rates",
      value: "24/7"
    }
  ];

  return (
    <>
      <SEOHead 
        title="TikTok Coin Prices by Country - Global Pricing Guide | TokRecharge.com"
        description="Compare TikTok coin prices across 20+ countries. Find the best rates, understand regional pricing differences, and discover cost-saving opportunities for TikTok coin purchases worldwide."
        keywords="tiktok coin prices by country, global tiktok pricing, coin rates worldwide, tiktok currency comparison, international coin prices, best tiktok coin deals, country pricing guide"
        canonical="https://tokrecharge.com/countries"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Countries' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Globe className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            TikTok Prices by Country
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Compare TikTok coin prices across different countries and find the best deals worldwide
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {stat.icon}
                  <span className="text-sm opacity-75">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search countries, currencies, or codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Global TikTok Coin Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {searchTerm ? `Showing ${filteredCountries.length} results for "${searchTerm}"` : 
               'Click any country to view detailed pricing and packages'}
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries.map((country) => {
                const coinRate = parseFloat(country.coinRate);
                const sampleCoins = 70;
                const samplePrice = coinRate * sampleCoins;
                const isAffordable = coinRate < 1;
                
                return (
                  <Card 
                    key={country.id}
                    className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                    onMouseEnter={() => setHoveredCountry(country.id)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`text-4xl transition-transform duration-300 ${
                            hoveredCountry === country.id ? 'scale-110 animate-bounce' : ''
                          }`}>
                            {country.flag}
                          </div>
                          <div>
                            <div className="bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold mb-1">
                              {country.code}
                            </div>
                            <CardTitle className="text-lg font-bold">{country.name}</CardTitle>
                          </div>
                        </div>
                        {isAffordable && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse">
                            Great Value
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Currency</span>
                          <span className="font-semibold">{country.currency}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Per Coin</span>
                          <span className="text-xl font-bold text-purple-600">
                            {formatCurrency(coinRate, country.currency)}
                          </span>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-500 mb-1">Sample: {sampleCoins} coins</div>
                          <div className="text-lg font-bold text-gray-800">
                            {formatCurrency(samplePrice, country.currency)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <Link href={`/country-pricing?country=${country.code.toLowerCase()}`}>
                        <Button 
                          variant="ghost" 
                          className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300"
                        >
                          <div className="flex items-center space-x-2">
                            <span>{country.flag}</span>
                            <span>View {country.name} Prices</span>
                          </div>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {filteredCountries.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No countries found</h3>
              <p className="text-gray-500">Try searching with different keywords</p>
            </div>
          )}
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Pricing Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding global TikTok coin pricing patterns
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Best Value Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Some countries offer significantly better coin rates due to regional pricing strategies and local economic factors.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Regional Differences</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Pricing varies significantly across regions, with emerging markets often offering more competitive rates than developed countries.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Smart Shopping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Compare prices across countries to find the best deals and maximize the value of your TikTok coin purchases.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}