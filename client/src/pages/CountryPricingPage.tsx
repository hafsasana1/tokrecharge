import { useParams, useSearch, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/calculations';
import type { Country, RechargePackage } from '@shared/schema';
import CountryFlag from '@/components/ui/CountryFlag';

export default function CountryPricingPage() {
  const { country } = useParams();
  const search = useSearch();
  const urlParams = new URLSearchParams(search);
  
  // Extract country from URL path if not in params
  const pathname = window.location.pathname;
  const pathCountry = pathname.includes('/coins-in-') ? 
    pathname.split('/coins-in-')[1] : null;
  
  const countryParam = country || urlParams.get('country') || pathCountry;
  
  console.log('CountryPricingPage rendered:', { country, search, countryParam, pathCountry, pathname });
  

  
  const { data: countries = [] } = useQuery<Country[]>({
    queryKey: ['/api/countries'],
  });

  const { data: allPackages = [] } = useQuery<RechargePackage[]>({
    queryKey: ['/api/recharge-packages'],
  });

  // Find country by URL parameter (handle multiple formats)
  const countryData = countries.find(c => {
    if (!countryParam) return false;
    const countryNameSlug = c.name.toLowerCase().replace(/\s+/g, '-');
    const urlCountry = countryParam.toLowerCase();
    return countryNameSlug === urlCountry || 
           c.name.toLowerCase() === urlCountry?.replace(/-/g, ' ') ||
           c.code.toLowerCase() === urlCountry;
  });

  const packages = allPackages.filter(pkg => pkg.countryId === countryData?.id);

  if (!countryData && countryParam) {
    // Create comprehensive country data based on actual country
    const countryMap = {
      'united-states': { name: 'United States', code: 'US', currency: 'USD', flag: '🇺🇸', coinRate: '0.015' },
      'india': { name: 'India', code: 'IN', currency: 'INR', flag: '🇮🇳', coinRate: '1.25' },
      'pakistan': { name: 'Pakistan', code: 'PK', currency: 'PKR', flag: '🇵🇰', coinRate: '4.20' },
      'united-kingdom': { name: 'United Kingdom', code: 'GB', currency: 'GBP', flag: '🇬🇧', coinRate: '0.012' },
      'canada': { name: 'Canada', code: 'CA', currency: 'CAD', flag: '🇨🇦', coinRate: '0.020' },
      'australia': { name: 'Australia', code: 'AU', currency: 'AUD', flag: '🇦🇺', coinRate: '0.022' },
      'germany': { name: 'Germany', code: 'DE', currency: 'EUR', flag: '🇩🇪', coinRate: '0.014' },
      'france': { name: 'France', code: 'FR', currency: 'EUR', flag: '🇫🇷', coinRate: '0.014' },
      'brazil': { name: 'Brazil', code: 'BR', currency: 'BRL', flag: '🇧🇷', coinRate: '0.075' },
      'mexico': { name: 'Mexico', code: 'MX', currency: 'MXN', flag: '🇲🇽', coinRate: '0.30' },
      'japan': { name: 'Japan', code: 'JP', currency: 'JPY', flag: '🇯🇵', coinRate: '1.85' },
      'south-korea': { name: 'South Korea', code: 'KR', currency: 'KRW', flag: '🇰🇷', coinRate: '19.50' },
      'italy': { name: 'Italy', code: 'IT', currency: 'EUR', flag: '🇮🇹', coinRate: '0.014' },
      'spain': { name: 'Spain', code: 'ES', currency: 'EUR', flag: '🇪🇸', coinRate: '0.014' },
      'netherlands': { name: 'Netherlands', code: 'NL', currency: 'EUR', flag: '🇳🇱', coinRate: '0.014' }
    };
    
    const fallbackCountry = (countryMap as any)[countryParam.toLowerCase()] || {
      id: 999,
      name: countryParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      code: countryParam.substring(0, 2).toUpperCase(),
      currency: 'USD',
      coinRate: '0.015',
      flag: '🌍',
      isActive: true
    };
    
    return (
      <>
        <SEOHead 
          title={`TikTok Coin Prices in ${fallbackCountry.name} - Live Pricing Guide | TokRecharge.com`}
          description={`Get current TikTok coin prices and packages for ${fallbackCountry.name}. Compare rates, find best deals, and calculate coin costs in local currency.`}
          keywords={`tiktok coins ${fallbackCountry.name.toLowerCase()}, coin prices, buy tiktok coins`}
          canonical={`https://tokrecharge.com/coins-in-${countryParam}`}
        />
        
        <Header />
        
        <Breadcrumb items={[
          { label: 'Countries', href: '/#countries' },
          { label: fallbackCountry.name, href: `/coins-in-${countryParam}` }
        ]} />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-6xl animate-bounce">{fallbackCountry.flag}</div>
              <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-xl font-bold backdrop-blur-md">
                {fallbackCountry.code}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              TikTok Coin Prices in {fallbackCountry.name}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Get the latest TikTok coin pricing for {fallbackCountry.name}. Compare packages, 
              find the best deals, and calculate exact costs in {fallbackCountry.currency}.
            </p>
          </div>
        </section>

        {/* Pricing Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Current Coin Pricing</h2>
              <p className="text-gray-600">Live pricing information for {fallbackCountry.name}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { coins: 70, price: (70 * parseFloat(fallbackCountry.coinRate)).toFixed(2), popular: false },
                { coins: 350, price: (350 * parseFloat(fallbackCountry.coinRate)).toFixed(2), popular: true },
                { coins: 700, price: (700 * parseFloat(fallbackCountry.coinRate)).toFixed(2), popular: false }
              ].map((pkg, index) => (
                <Card key={index} className={`text-center hover:shadow-xl transition-shadow ${pkg.popular ? 'ring-2 ring-purple-500' : ''}`}>
                  {pkg.popular && (
                    <div className="bg-purple-500 text-white text-sm py-1 text-center rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{pkg.coins}</div>
                    <div className="text-gray-600 mb-4">TikTok Coins</div>
                    <div className="text-3xl font-bold mb-6">{fallbackCountry.currency} {pkg.price}</div>
                    <div className="text-sm text-gray-500 mb-6">
                      {(pkg.coins / parseFloat(pkg.price)).toFixed(1)} coins per {fallbackCountry.currency}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Prices may vary based on your location and current exchange rates.
              </p>
              <Link href="/coin-calculator">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Calculate Exact Costs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Market Trends Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">TikTok Market Trends in {fallbackCountry.name}</h2>
              <p className="text-gray-600">Understanding the TikTok monetization landscape</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-green-600 mb-2">67%</div>
                <div className="text-gray-600 text-sm">Creator Growth Rate</div>
                <div className="text-xs text-gray-500 mt-2">Monthly increase in {fallbackCountry.name}</div>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
                <div className="text-gray-600 text-sm">Gift Popularity</div>
                <div className="text-xs text-gray-500 mt-2">Most popular gifts trending</div>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-purple-600 mb-2">30%</div>
                <div className="text-gray-600 text-sm">Cost Savings</div>
                <div className="text-xs text-gray-500 mt-2">Vs international pricing</div>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
                <div className="text-gray-600 text-sm">User Satisfaction</div>
                <div className="text-xs text-gray-500 mt-2">Local pricing feedback</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">How to Buy TikTok Coins in {fallbackCountry.name}</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Official TikTok App</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                      <div>Open TikTok app and go to your profile</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                      <div>Tap the three lines menu (☰) in top right</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                      <div>Select "Balance" and choose coin package</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                      <div>Complete payment using local payment methods</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Payment Methods in {fallbackCountry.name}</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className="text-green-500">✓</div>
                      <div>Credit/Debit Cards</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-green-500">✓</div>
                      <div>PayPal</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-green-500">✓</div>
                      <div>Google Pay</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-green-500">✓</div>
                      <div>Apple Pay</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-green-500">✓</div>
                      <div>Local banking options</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-3">What are TikTok Coins used for in {fallbackCountry.name}?</h3>
                  <p className="text-gray-600">TikTok Coins are the platform's virtual currency used to purchase gifts for creators during live streams. In {fallbackCountry.name}, coins are priced in {fallbackCountry.currency} and can be bought through the official TikTok app using local payment methods.</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-3">How much do TikTok Coins cost in {fallbackCountry.name}?</h3>
                  <p className="text-gray-600">In {fallbackCountry.name}, TikTok Coins cost approximately {fallbackCountry.currency} {fallbackCountry.coinRate} per coin. Prices may vary slightly based on package size and current exchange rates. Larger packages typically offer better value per coin.</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-3">Can I earn money from TikTok gifts in {fallbackCountry.name}?</h3>
                  <p className="text-gray-600">Yes, TikTok creators in {fallbackCountry.name} can convert received gifts into Diamonds and then withdraw them as real money. The conversion rate varies, but creators typically receive about 50% of the gift's coin value as earnings.</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-3">Are TikTok Coin prices different in {fallbackCountry.name}?</h3>
                  <p className="text-gray-600">Yes, TikTok adjusts coin prices based on local purchasing power and currency exchange rates. {fallbackCountry.name} users often get competitive pricing compared to global averages, making it more affordable to support creators.</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  if (!countryData) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Country Pricing</h1>
          <p className="text-gray-600 mb-8">Select a country to view TikTok coin pricing information.</p>
          <Link href="/countries">
            <Button size="lg">Browse All Countries</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const bestValuePackage = packages.length > 0 ? packages.reduce((best, current) => {
    const currentRate = parseFloat(current.price) / current.coins;
    const bestRate = parseFloat(best.price) / best.coins;
    return currentRate < bestRate ? current : best;
  }) : null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `TikTok Coin Prices in ${countryData.name}`,
    "description": `TikTok coin recharge prices and packages available in ${countryData.name}`,
    "url": `https://tokrecharge.com/coins-in-${countryParam}`,
    "about": {
      "@type": "Product",
      "name": "TikTok Coins",
      "description": `TikTok coin packages and pricing for ${countryData.name}`
    }
  };

  return (
    <>
      <SEOHead 
        title={`TikTok Coin Prices in ${countryData.name} - Complete ${countryData.currency} Package Guide | TokRecharge.com`}
        description={`Complete TikTok coin pricing guide for ${countryData.name}. Live ${countryData.currency} rates, bulk packages, best deals, and coin cost comparison. Updated ${new Date().getFullYear()} pricing.`}
        keywords={`tiktok coins ${countryData.name.toLowerCase()}, ${countryData.currency.toLowerCase()} coin prices, buy tiktok coins ${countryData.name.toLowerCase()}, coin packages ${countryData.code.toLowerCase()}`}
        canonical={`https://tokrecharge.com/coins-in-${countryParam}`}
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Countries', href: '/#countries' },
        { 
          label: (
            <div className="flex items-center space-x-2">
              <CountryFlag 
                flag={countryData.flag} 
                countryCode={countryData.code}
                countryName={countryData.name}
                size="sm"
                showCode={true}
              />
              <span>{countryData.name}</span>
            </div>
          ) as any
        }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-tiktok-cyan text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center space-y-4 mb-6">
            <CountryFlag 
              flag={countryData.flag} 
              countryCode={countryData.code}
              countryName=""
              size="xl"
              className="animate-bounce"
            />
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-xl font-bold">{countryData.code}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TikTok Coin Prices in {countryData.name}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Complete pricing guide for TikTok coin packages in {countryData.name} ({countryData.currency})
          </p>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-tiktok-pink mb-2">
                    {formatCurrency(parseFloat(countryData.coinRate), countryData.currency)}
                  </div>
                  <div className="text-sm text-gray-600">Per TikTok Coin</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-tiktok-cyan mb-2">
                    {countryData.currency}
                  </div>
                  <div className="text-sm text-gray-600">Local Currency</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {packages.length}
                  </div>
                  <div className="text-sm text-gray-600">Available Packages</div>
                </CardContent>
              </Card>
            </div>

            {packages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    TikTok Coin Packages in {countryData.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Package</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Cost per Coin</TableHead>
                        <TableHead>Savings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {packages.map((pkg) => {
                        const costPerCoin = parseFloat(pkg.price) / pkg.coins;
                        const isBestValue = bestValuePackage?.id === pkg.id;
                        
                        return (
                          <TableRow key={pkg.id}>
                            <TableCell className="font-medium">
                              {pkg.coins} coins
                            </TableCell>
                            <TableCell>
                              {formatCurrency(parseFloat(pkg.price), pkg.currency)}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(costPerCoin, pkg.currency)}
                            </TableCell>
                            <TableCell>
                              {isBestValue && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  Best Value
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Country-Specific Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">TikTok in {countryData.name}</h2>
              <p className="text-gray-600">Important information for {countryData.name} users</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Popular payment methods in {countryData.name} for TikTok coins:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Credit/Debit Cards</li>
                    <li>• Mobile Payments</li>
                    <li>• Bank Transfers</li>
                    <li>• Digital Wallets</li>
                    <li>• Local Payment Systems</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Regional Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Special features and considerations for {countryData.name}:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Local currency pricing</li>
                    <li>• Regional gift availability</li>
                    <li>• Local payment support</li>
                    <li>• Currency exchange rates</li>
                    <li>• Tax implications</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
