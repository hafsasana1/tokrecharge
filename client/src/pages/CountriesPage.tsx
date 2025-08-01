import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Search, TrendingUp, ArrowRight, Star, DollarSign, MapPin } from 'lucide-react';
import { Link } from 'wouter';
import { formatCurrency } from '@/lib/calculations';
import { worldwideCountriesData, countriesByRegion, regionColors } from '@/data/worldwideCountries';

export default function CountriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>('all');

  // Use comprehensive worldwide data instead of API data for display
  const allCountries = worldwideCountriesData;
  
  const filteredCountries = allCountries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.currency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = activeRegion === 'all' || country.region === activeRegion;
    
    return matchesSearch && matchesRegion;
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TikTok Coin Prices by Country - Global Pricing Guide",
    "description": "Complete guide to TikTok coin prices across different countries. Compare rates, find the best deals, and understand regional pricing differences for TikTok coins worldwide.",
    "url": "https://tokrecharge.com/countries",
    "mainEntity": {
      "@type": "ItemList",
      "name": "TikTok Coin Prices by Country",
      "numberOfItems": allCountries.length,
      "itemListElement": allCountries.map((country, index) => ({
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
      value: allCountries.length
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      label: "Currencies",
      value: new Set(allCountries.map(c => c.currency)).size
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-600" />,
      label: "Regions",
      value: Object.keys(countriesByRegion).length
    }
  ];

  return (
    <>
      <SEOHead 
        title="TikTok Coin Prices by Country - Global Pricing Guide | TokRecharge.com"
        description="Compare TikTok coin prices across 40+ countries worldwide. Find the best rates, understand regional pricing differences, and discover cost-saving opportunities for TikTok coin purchases globally."
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
            TikTok Prices Worldwide
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Compare TikTok coin prices across {allCountries.length} countries and 6 regions worldwide
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
          <div className="max-w-md mx-auto mb-6">
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

          {/* Region Filter Tabs */}
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveRegion}>
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="North America">N. America</TabsTrigger>
                <TabsTrigger value="Europe">Europe</TabsTrigger>
                <TabsTrigger value="Asia Pacific">Asia Pacific</TabsTrigger>
                <TabsTrigger value="South America">S. America</TabsTrigger>
                <TabsTrigger value="Africa">Africa</TabsTrigger>
                <TabsTrigger value="Middle East">Middle East</TabsTrigger>
              </TabsList>
            </Tabs>
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
              {searchTerm ? 
                `Showing ${filteredCountries.length} results for "${searchTerm}"` : 
                activeRegion === 'all' ? 
                  'Explore pricing across all regions' : 
                  `Countries in ${activeRegion}`
              }
            </p>
          </div>
          
          {activeRegion === 'all' ? (
            // Show regions separately when "All" is selected
            Object.keys(countriesByRegion).map((region) => {
              const regionCountries = filteredCountries.filter(c => c.region === region);
              if (regionCountries.length === 0) return null;
              
              return (
                <div key={region} className="mb-16">
                  <div className="mb-8">
                    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${regionColors[region as keyof typeof regionColors]} text-white px-6 py-2 rounded-full`}>
                      <MapPin className="w-4 h-4" />
                      <span className="font-semibold">{region}</span>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {regionCountries.length} countries
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {regionCountries.map((country) => (
                      <CountryCard 
                        key={country.id} 
                        country={country} 
                        hoveredCountry={hoveredCountry}
                        setHoveredCountry={setHoveredCountry}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Show filtered countries when specific region is selected
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries.map((country) => (
                <CountryCard 
                  key={country.id} 
                  country={country} 
                  hoveredCountry={hoveredCountry}
                  setHoveredCountry={setHoveredCountry}
                />
              ))}
            </div>
          )}

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No countries found</h3>
              <p className="text-gray-500">Try searching with different keywords or select a different region</p>
            </div>
          )}
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Global Pricing Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding TikTok coin pricing patterns across different regions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Best Value Markets</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Emerging markets often offer significantly better coin rates due to regional pricing strategies and local purchasing power adjustments.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Regional Variations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Pricing varies significantly across regions, with Asia Pacific and South America typically offering more competitive rates than North America and Europe.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Smart Shopping Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Compare prices across different countries to maximize value. Some regions offer up to 70% savings compared to premium markets.
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

interface CountryCardProps {
  country: any;
  hoveredCountry: number | null;
  setHoveredCountry: (id: number | null) => void;
}

function CountryCard({ country, hoveredCountry, setHoveredCountry }: CountryCardProps) {
  const coinRate = parseFloat(country.coinRate);
  const sampleCoins = 70;
  const samplePrice = coinRate * sampleCoins;
  const isAffordable = coinRate < 1;
  
  return (
    <Card 
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
}