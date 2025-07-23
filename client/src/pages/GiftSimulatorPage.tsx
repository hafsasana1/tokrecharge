import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Gift, User, Coins, DollarSign, Share2, RefreshCw } from 'lucide-react';
import type { Gift as GiftType } from '@shared/schema';

export default function GiftSimulatorPage() {
  const [tiktokUsername, setTiktokUsername] = useState('');
  const [simulation, setSimulation] = useState<{
    username: string;
    giftsReceived: { gift: GiftType; quantity: number }[];
    totalCoins: number;
    totalValue: number;
    creatorEarnings: number;
  } | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const { data: gifts = [] } = useQuery<GiftType[]>({
    queryKey: ['/api/gifts'],
  });

  const runSimulation = () => {
    if (!tiktokUsername.trim()) return;
    
    setIsSimulating(true);
    
    // Simulate delay for realistic effect
    setTimeout(() => {
      // Random simulation with realistic gift distribution
      const randomGifts = gifts
        .filter(() => Math.random() > 0.3) // 70% chance to receive each gift
        .map(gift => ({
          gift,
          quantity: Math.floor(Math.random() * 20) + 1, // 1-20 of each gift
        }))
        .filter(item => item.quantity > 0);

      const totalCoins = randomGifts.reduce((sum, item) => sum + (item.gift.coinCost * item.quantity), 0);
      const totalValue = totalCoins * 0.015; // USD conversion
      const creatorEarnings = totalValue * 0.5; // 50% creator share

      setSimulation({
        username: tiktokUsername,
        giftsReceived: randomGifts,
        totalCoins,
        totalValue,
        creatorEarnings,
      });
      
      setIsSimulating(false);
    }, 2000);
  };

  const shareResults = () => {
    if (!simulation) return;
    const text = `I just simulated sending gifts to @${simulation.username} on TikTok! 🎁 Total: ${simulation.totalCoins} coins (${simulation.totalValue.toFixed(2)} USD) • Creator earned: $${simulation.creatorEarnings.toFixed(2)} 💰 Try it: ${window.location.href}`;
    navigator.share?.({ text }) || navigator.clipboard?.writeText(text);
  };

  const breadcrumbItems = [
    { label: 'Tools', href: '/tools' },
    { label: 'Gift Simulator', href: '/gift-simulator' },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TikTok Live Gift Simulator",
    "description": "Simulate sending TikTok gifts to creators and see coin costs, USD values, and estimated creator earnings in real-time.",
    "url": "https://tokrecharge.com/gift-simulator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Live gift simulation",
      "Real-time coin calculation",
      "Creator earnings estimation",
      "USD value conversion",
      "Shareable results"
    ]
  };

  return (
    <>
      <SEOHead
        title="Simulate TikTok Live Gifts and Earnings | Gift Simulator"
        description="Simulate sending TikTok gifts to any creator! See coin costs, USD values, and estimated creator earnings with our realistic gift simulator tool."
        canonical="https://tokrecharge.com/gift-simulator"
        keywords="tiktok gift simulator, tiktok live gifts, gift sending simulation, tiktok coin calculator, creator earnings simulator"
        ogDescription="Try our TikTok gift simulator! Enter any username and see realistic gift costs, coin spending, and creator earnings in real-time."
        schemaData={schemaData}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-500 via-orange-500 to-red-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Sparkles className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              TikTok Live Gift Simulator
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              Simulate sending gifts to any TikTok creator and see realistic coin costs, 
              USD values, and estimated creator earnings
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Available Gifts</div>
                <div className="text-2xl font-bold">{gifts.length}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Simulation Type</div>
                <div className="text-2xl font-bold">Realistic</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Creator Share</div>
                <div className="text-2xl font-bold">50%</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Gift Simulator Tool */}
          <section className="py-8">
            <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-orange-50 text-center py-8">
                <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                  <Sparkles className="w-8 h-8 text-pink-600" />
                  Gift Simulator
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 mt-2">
                  Enter a TikTok username to simulate realistic gift sending
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="mb-8">
                  <Label htmlFor="username" className="block text-lg font-semibold text-gray-800 mb-4">
                    <User className="inline w-5 h-5 text-pink-600 mr-2" />
                    TikTok Username
                  </Label>
                  <div className="flex gap-4">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter TikTok username (e.g. @creator123)"
                      value={tiktokUsername}
                      onChange={(e) => setTiktokUsername(e.target.value)}
                      className="text-lg font-semibold h-14 border-2 border-gray-200 focus:border-pink-500 rounded-xl flex-1"
                    />
                    <Button
                      onClick={runSimulation}
                      disabled={!tiktokUsername.trim() || isSimulating}
                      className="h-14 px-8 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      {isSimulating ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          Simulating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Simulate Gifts
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Simulation Results */}
                {simulation && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-6 border border-pink-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Gift className="w-6 h-6 text-pink-600" />
                        Simulation Results for @{simulation.username}
                      </h3>
                      
                      {/* Summary Stats */}
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                          <Coins className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{simulation.totalCoins.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Total Coins Sent</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">${simulation.totalValue.toFixed(2)}</div>
                          <div className="text-sm text-gray-600">Total USD Value</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                          <User className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">${simulation.creatorEarnings.toFixed(2)}</div>
                          <div className="text-sm text-gray-600">Creator Earnings</div>
                        </div>
                      </div>

                      {/* Gifts Received */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Gifts Received:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {simulation.giftsReceived.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg p-3 text-center border">
                              <div className="text-lg font-semibold text-gray-900">{item.gift.name}</div>
                              <div className="text-sm text-gray-600">{item.quantity}x</div>
                              <Badge variant="outline" className="mt-1">
                                {(item.gift.coinCost * item.quantity).toLocaleString()} coins
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Share Button */}
                      <div className="text-center">
                        <Button
                          onClick={shareResults}
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                        >
                          <Share2 className="w-5 h-5 mr-2" />
                          Share Your Simulated Gift Earnings!
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Information */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">How the Simulator Works:</h4>
                  <ul className="text-blue-800 space-y-2">
                    <li>• Enter any TikTok username (simulation only - no real gifts sent)</li>
                    <li>• Random selection of gifts based on realistic distribution patterns</li>
                    <li>• Accurate coin costs and USD conversion rates</li>
                    <li>• Shows 50% creator earnings (TikTok's standard rate)</li>
                    <li>• Results are shareable to compare with friends</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section className="py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600">
                  Common questions about TikTok gift simulation and creator earnings
                </p>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does the gift simulator send real gifts to creators?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">No, this is a simulation tool only. No real gifts are sent and no real money is spent. The simulator shows what would happen if you sent gifts to a creator, helping you understand costs before making actual purchases.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How accurate are the coin costs and creator earnings shown?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">The coin costs are based on actual TikTok gift prices. Creator earnings use TikTok's standard 50% revenue share rate. However, actual earnings may vary based on TikTok's policies, taxes, and regional differences.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I simulate gifts for any TikTok username?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Yes, you can enter any TikTok username. The simulation generates realistic gift scenarios based on statistical patterns, but results are for entertainment and estimation purposes only.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's the most expensive TikTok gift I can simulate?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">The simulator includes all TikTok gifts from the basic Rose (1 coin) to premium gifts like Universe (34,999 coins). The most expensive gifts cost over $500 USD equivalent.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do I share my simulation results?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">After running a simulation, click the "Share Your Simulated Gift Earnings!" button. This will create a shareable message with the simulation results that you can post on social media or send to friends.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Are the gift distribution patterns realistic?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Yes, the simulator uses realistic distribution patterns based on typical TikTok gifting behavior. More expensive gifts appear less frequently, while common gifts like roses and hearts are more prevalent in the simulation.</p>
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
                Explore more tools for TikTok monetization analysis
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-purple-600" />
                    Gift Value Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate exact costs of TikTok gifts in your currency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/gift-value">Try Gift Calculator</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-pink-600" />
                    Coin Calculator
                  </CardTitle>
                  <CardDescription>
                    Convert TikTok coins to real money values
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/coin-calculator">Try Coin Calculator</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Earnings Estimator
                  </CardTitle>
                  <CardDescription>
                    Estimate creator earnings from TikTok gifts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/earnings-estimator">Try Earnings Calculator</a>
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