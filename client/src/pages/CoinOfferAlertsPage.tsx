import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Bell, Mail, Globe, CheckCircle, Star, Zap, Gift, AlertCircle } from 'lucide-react';

export default function CoinOfferAlertsPage() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [alertTypes, setAlertTypes] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  ];

  const alertTypeOptions = [
    { id: 'discount', name: 'Price Discounts', icon: <Gift className="w-4 h-4" />, description: 'Coin recharge discounts & sales' },
    { id: 'bundle', name: 'Bundle Offers', icon: <Star className="w-4 h-4" />, description: 'Special coin bundle deals' },
    { id: 'promotion', name: 'Promotions', icon: <Zap className="w-4 h-4" />, description: 'Limited-time promotional offers' },
    { id: 'new_rates', name: 'Rate Changes', icon: <AlertCircle className="w-4 h-4" />, description: 'Coin rate updates in your region' },
  ];

  const toggleAlertType = (typeId: string) => {
    setAlertTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSubscribe = async () => {
    if (!email || !country || alertTypes.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select at least one alert type.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive TikTok coin offer alerts at your email address.",
      });
    }, 1500);
  };

  const breadcrumbItems = [
    { label: 'Tools', href: '/tools' },
    { label: 'Coin Offer Alerts', href: '/coin-offer-alerts' },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TikTok Coin Offer Alerts",
    "description": "Get notified about TikTok coin recharge offers, discounts, and promotions. Subscribe for email alerts about the best coin deals in your region.",
    "url": "https://tokrecharge.com/coin-offer-alerts",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Email subscription service",
      "Regional offer notifications",
      "Discount alerts",
      "Bundle deal notifications",
      "Rate change updates"
    ]
  };

  return (
    <>
      <SEOHead
        title="Get Notified About TikTok Recharge Offers | Coin Discount Alerts"
        description="Never miss TikTok coin discounts again! Subscribe for email alerts about coin bundle sales, recharge promotions, and special offers in your region."
        canonical="https://tokrecharge.com/coin-offer-alerts"
        keywords="tiktok coin discount, tiktok coin bundle sale, cheap recharge alert, tiktok promotion notifications, coin offer alerts"
        ogTitle="TikTok Coin Offer Alerts - Never Miss a Discount Again"
        ogDescription="Get instant notifications about TikTok coin discounts, bundle deals, and special promotions. Free email alerts for the best coin recharge offers!"
        schemaData={schemaData}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Bell className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              TikTok Coin Offer Alerts
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              Never miss a TikTok coin discount again! Get instant email notifications 
              about coin bundle sales, recharge promotions, and special offers.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Alert Types</div>
                <div className="text-2xl font-bold">4</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Countries Supported</div>
                <div className="text-2xl font-bold">10+</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Service</div>
                <div className="text-2xl font-bold">Free</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Subscription Form */}
          <section className="py-8">
            <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 text-center py-8">
                <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                  <Bell className="w-8 h-8 text-blue-600" />
                  {isSubscribed ? 'Subscription Confirmed!' : 'Subscribe for Alerts'}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 mt-2">
                  {isSubscribed 
                    ? 'You\'ll receive email notifications about TikTok coin offers'
                    : 'Get notified about the best TikTok coin deals and discounts'
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                {!isSubscribed ? (
                  <div className="space-y-6">
                    {/* Email Input */}
                    <div>
                      <Label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-3">
                        <Mail className="inline w-5 h-5 text-blue-600 mr-2" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-lg font-semibold h-14 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                    </div>

                    {/* Country Selection */}
                    <div>
                      <Label htmlFor="country" className="block text-lg font-semibold text-gray-800 mb-3">
                        <Globe className="inline w-5 h-5 text-cyan-600 mr-2" />
                        Your Country
                      </Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 rounded-xl text-lg font-semibold">
                          <SelectValue placeholder="Select your country for relevant offers" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.code} value={c.code}>
                              <div className="flex items-center space-x-3">
                                <span className="text-xl">{c.flag}</span>
                                <span className="font-semibold">{c.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Alert Types */}
                    <div>
                      <Label className="block text-lg font-semibold text-gray-800 mb-3">
                        <Bell className="inline w-5 h-5 text-blue-600 mr-2" />
                        Alert Types (Select one or more)
                      </Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {alertTypeOptions.map((alertType) => (
                          <div
                            key={alertType.id}
                            onClick={() => toggleAlertType(alertType.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                              alertTypes.includes(alertType.id)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-lg ${
                                alertTypes.includes(alertType.id) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {alertType.icon}
                              </div>
                              <div className="font-semibold text-gray-900">{alertType.name}</div>
                              {alertTypes.includes(alertType.id) && (
                                <CheckCircle className="w-5 h-5 text-blue-500 ml-auto" />
                              )}
                            </div>
                            <div className="text-sm text-gray-600">{alertType.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Subscribe Button */}
                    <div className="text-center pt-4">
                      <Button
                        onClick={handleSubscribe}
                        disabled={isSubmitting}
                        className="h-14 px-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Bell className="w-5 h-5 mr-2 animate-pulse" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Bell className="w-5 h-5 mr-2" />
                            Subscribe for Free Alerts
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Success State */
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <div className="bg-green-100 p-6 rounded-full">
                        <CheckCircle className="w-16 h-16 text-green-600" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        You're All Set! 🎉
                      </h3>
                      <p className="text-lg text-gray-600 mb-4">
                        We've sent a confirmation email to <strong>{email}</strong>
                      </p>
                      <div className="text-sm text-gray-500">
                        You'll receive alerts for: {alertTypes.join(', ')} in {countries.find(c => c.code === country)?.name}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-3">What Happens Next:</h4>
                      <ul className="text-blue-800 text-left space-y-2">
                        <li>• Check your email for a confirmation message</li>
                        <li>• You'll receive alerts about relevant coin offers in your region</li>
                        <li>• Unsubscribe anytime with one click</li>
                        <li>• No spam - only valuable coin deals and discounts</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Benefits Section */}
          <section className="py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Why Subscribe to Coin Offer Alerts?
              </h2>
              <p className="text-xl text-gray-600">
                Stay ahead of the best TikTok coin deals and save money
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-green-100 p-4 rounded-full mb-4 w-fit">
                    <Gift className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle>Save Money</CardTitle>
                  <CardDescription>
                    Get notified about discounts up to 50% off regular coin prices
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-blue-100 p-4 rounded-full mb-4 w-fit">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle>Instant Notifications</CardTitle>
                  <CardDescription>
                    Be the first to know about limited-time offers and flash sales
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-purple-100 p-4 rounded-full mb-4 w-fit">
                    <Bell className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle>Regional Offers</CardTitle>
                  <CardDescription>
                    Receive alerts for deals specifically available in your country
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600">
                  Everything about TikTok coin offers and discount notifications
                </p>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How often do TikTok coin discounts happen?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">TikTok coin discounts typically occur during major holidays, special events, and promotional periods. Bundle offers and regional promotions can happen monthly, while major discounts (20-50% off) are less frequent but more valuable.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What types of coin offers will I receive alerts for?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">You'll receive alerts for price discounts (percentage off regular prices), bundle offers (bonus coins with purchase), limited-time promotions, and regional rate changes that could save you money.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Are the alerts really free?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Yes, our coin offer alert service is completely free. We monitor TikTok pricing across regions and notify subscribers about legitimate money-saving opportunities without any cost or subscription fees.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How much money can I save with coin offer alerts?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Savings vary by offer type and region. Bundle deals can provide 10-25% extra coins, while major promotional discounts can save 20-50% off regular prices. Regional arbitrage can save 15-30% by purchasing from lower-cost countries.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I unsubscribe from coin offer alerts?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Absolutely. Every alert email includes an unsubscribe link for instant removal. You can also modify your alert preferences or pause notifications temporarily without losing your subscription.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Which countries have the best TikTok coin prices?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Coin prices vary by region due to local economic factors. Countries like India, Pakistan, and some Eastern European regions often have lower coin prices, while Western countries typically have higher rates. Our alerts help you find the best current deals.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Related TikTok Tools
              </h2>
              <p className="text-xl text-gray-600">
                Calculate coin costs and compare prices while you wait for offers
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-cyan-600" />
                    Recharge Prices
                  </CardTitle>
                  <CardDescription>
                    Compare TikTok coin prices across different countries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/recharge-prices">Compare Prices</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-pink-600" />
                    Coin Calculator
                  </CardTitle>
                  <CardDescription>
                    Convert TikTok coins to real money values
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/coin-calculator">Try Calculator</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    Gift Ranking
                  </CardTitle>
                  <CardDescription>
                    See all TikTok gifts ranked by price and value
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/gift-ranking">View Rankings</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
        
        <Footer />
      </div>
    </>
  );
}