import { useParams, useSearch } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/calculations';
import type { Country, RechargePackage } from '@shared/schema';
import CountryFlag from '@/components/ui/CountryFlag';

export default function CountryPricingPage() {
  const { country } = useParams();
  const search = useSearch();
  const urlParams = new URLSearchParams(search);
  const countryParam = country || urlParams.get('country');
  
  console.log('CountryPricingPage rendered:', { country, search, countryParam });
  
  // Early return for debugging
  if (!countryParam) {
    console.log('No country param found, showing fallback');
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">Country Pricing Debug</h1>
          <p>Country param: {String(countryParam)}</p>
          <p>Raw country: {String(country)}</p>
          <p>Search: {search}</p>
        </div>
        <Footer />
      </>
    );
  }
  
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
    const countryNameSpaced = c.name.toLowerCase();
    const urlCountrySpaced = urlCountry.replace(/-/g, ' ');
    
    // Multiple matching strategies
    const matches = [
      countryNameSlug === urlCountry,                    // "united-states" === "united-states"
      countryNameSpaced === urlCountrySpaced,           // "united states" === "united states"
      c.code.toLowerCase() === urlCountry,              // "us" === "us"
      countryNameSpaced.includes(urlCountrySpaced),     // partial match
      urlCountrySpaced.includes(countryNameSpaced)      // reverse partial match
    ];
    
    console.log('Country matching debug:', {
      countryName: c.name,
      countryNameSlug,
      countryNameSpaced,
      urlParam: countryParam,
      urlCountry,
      urlCountrySpaced,
      matches,
      result: matches.some(m => m)
    });
    
    return matches.some(m => m);
  });

  const packages = allPackages.filter(pkg => pkg.countryId === countryData?.id);

  if (!countryData) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Country Not Found</h1>
          <p className="text-gray-600">The requested country pricing page could not be found.</p>
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
