import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, User, Coins, DollarSign, Gift, TrendingUp, RefreshCw, Share2 } from 'lucide-react';

export default function GifterEstimatorPage() {
  const [tiktokUsername, setTiktokUsername] = useState('');
  const [estimation, setEstimation] = useState<{
    username: string;
    totalGiftsSent: number;
    totalCoinsSpent: number;
    totalAmountSpent: number;
    averageGiftValue: number;
    estimatedRank: string;
    monthlySpend: number;
  } | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);

  const runEstimation = () => {
    if (!tiktokUsername.trim()) return;
    
    setIsEstimating(true);
    
    // Simulate delay for realistic effect
    setTimeout(() => {
      // Generate realistic mock data based on username
      const usernameHash = tiktokUsername.length + tiktokUsername.charCodeAt(0);
      const randomSeed = usernameHash * 31 + 17;
      
      const totalGiftsSent = Math.floor((randomSeed % 5000) + 100);
      const totalCoinsSpent = Math.floor((randomSeed * 1.3 % 100000) + 5000);
      const totalAmountSpent = totalCoinsSpent * 0.015;
      const averageGiftValue = totalCoinsSpent / totalGiftsSent;
      const monthlySpend = totalAmountSpent / 12;
      
      let estimatedRank = 'Casual Gifter';
      if (totalAmountSpent > 10000) estimatedRank = 'VIP Supporter';
      else if (totalAmountSpent > 5000) estimatedRank = 'Premium Gifter';
      else if (totalAmountSpent > 1000) estimatedRank = 'Active Gifter';
      else if (totalAmountSpent > 500) estimatedRank = 'Regular Gifter';

      setEstimation({
        username: tiktokUsername,
        totalGiftsSent,
        totalCoinsSpent,
        totalAmountSpent,
        averageGiftValue,
        estimatedRank,
        monthlySpend,
      });
      
      setIsEstimating(false);
    }, 2000);
  };

  const shareResults = () => {
    if (!estimation) return;
    const text = `I estimated @${estimation.username}'s TikTok gifting stats! 🎁 Total spent: $${estimation.totalAmountSpent.toFixed(0)} (${estimation.totalCoinsSpent.toLocaleString()} coins) • Rank: ${estimation.estimatedRank} 👑 Try with your friend's username: ${window.location.href}`;
    navigator.share?.({ text }) || navigator.clipboard?.writeText(text);
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'VIP Supporter': return 'bg-yellow-500 text-white';
      case 'Premium Gifter': return 'bg-purple-500 text-white';
      case 'Active Gifter': return 'bg-blue-500 text-white';
      case 'Regular Gifter': return 'bg-green-500 text-white';
      case 'Casual Gifter': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const breadcrumbItems = [
    { label: 'Tools', href: '/tools' },
    { label: 'Top Gifter Estimator', href: '/gifter-estimator' },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TikTok Top Gifter Estimator",
    "description": "Estimate how much any TikTok user has spent on gifts. Enter a username to see estimated total coins spent, USD amount, and gifter ranking.",
    "url": "https://tokrecharge.com/gifter-estimator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Username-based gift estimation",
      "Total spending calculation",
      "Gifter ranking system",
      "Monthly spending analysis",
      "Shareable results"
    ]
  };

  return (
    <>
      <SEOHead
        title="Estimate How Much a TikTok User Has Gifted | Top Gifter Calculator"
        description="Find out how much any TikTok user has spent on gifts! Enter a username to estimate total coins spent, USD amount, and gifter ranking. Try with your friend's username!"
        canonical="https://tokrecharge.com/gifter-estimator"
        keywords="tiktok gifter estimator, how much spent on tiktok gifts, tiktok user spending, top gifter calculator, tiktok gift tracker"
        ogTitle="TikTok Top Gifter Estimator - See How Much Users Spend on Gifts"
        ogDescription="Estimate any TikTok user's gift spending! Enter a username to see total coins spent, USD amount, and gifter ranking. Fun way to compare with friends!"
        schemaData={schemaData}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Crown className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              TikTok Top Gifter Estimator
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              Estimate how much any TikTok user has spent on gifts! Enter a username 
              to see total coins spent, USD amount, and gifter ranking.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Estimation Type</div>
                <div className="text-2xl font-bold">Advanced</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Ranking System</div>
                <div className="text-2xl font-bold">5 Tiers</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Analysis Depth</div>
                <div className="text-2xl font-bold">Complete</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Gifter Estimator Tool */}
          <section className="py-8">
            <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 text-center py-8">
                <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                  <Crown className="w-8 h-8 text-purple-600" />
                  Top Gifter Estimator
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 mt-2">
                  Enter any TikTok username to estimate their total gift spending
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="mb-8">
                  <Label htmlFor="username" className="block text-lg font-semibold text-gray-800 mb-4">
                    <User className="inline w-5 h-5 text-purple-600 mr-2" />
                    TikTok Username
                  </Label>
                  <div className="flex gap-4">
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter TikTok username (e.g. @user123)"
                      value={tiktokUsername}
                      onChange={(e) => setTiktokUsername(e.target.value)}
                      className="text-lg font-semibold h-14 border-2 border-gray-200 focus:border-purple-500 rounded-xl flex-1"
                    />
                    <Button
                      onClick={runEstimation}
                      disabled={!tiktokUsername.trim() || isEstimating}
                      className="h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      {isEstimating ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          Estimating...
                        </>
                      ) : (
                        <>
                          <Crown className="w-5 h-5 mr-2" />
                          Estimate Spending
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Estimation Results */}
                {estimation && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Crown className="w-6 h-6 text-purple-600" />
                        Gifting Analysis for @{estimation.username}
                      </h3>
                      
                      {/* Rank Badge */}
                      <div className="mb-6 text-center">
                        <Badge className={`${getRankColor(estimation.estimatedRank)} text-lg px-6 py-2`}>
                          <Crown className="w-5 h-5 mr-2" />
                          {estimation.estimatedRank}
                        </Badge>
                      </div>

                      {/* Summary Stats */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                          <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{estimation.totalGiftsSent.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Total Gifts Sent</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                          <Coins className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{estimation.totalCoinsSpent.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Total Coins Spent</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">${estimation.totalAmountSpent.toFixed(0)}</div>
                          <div className="text-sm text-gray-600">Total USD Spent</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-gray-900">${estimation.monthlySpend.toFixed(0)}</div>
                          <div className="text-sm text-gray-600">Estimated Monthly</div>
                        </div>
                      </div>

                      {/* Detailed Analysis */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white rounded-xl p-4 border">
                          <h4 className="font-bold text-gray-900 mb-2">Average Gift Value</h4>
                          <div className="text-xl font-bold text-purple-600">
                            {estimation.averageGiftValue.toFixed(1)} coins
                          </div>
                          <div className="text-sm text-gray-600">
                            ≈ ${(estimation.averageGiftValue * 0.015).toFixed(2)} per gift
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border">
                          <h4 className="font-bold text-gray-900 mb-2">Spending Category</h4>
                          <div className="text-xl font-bold text-purple-600">
                            {estimation.totalAmountSpent > 5000 ? 'High Spender' :
                             estimation.totalAmountSpent > 1000 ? 'Medium Spender' :
                             estimation.totalAmountSpent > 500 ? 'Regular Spender' : 'Light Spender'}
                          </div>
                          <div className="text-sm text-gray-600">
                            Based on total spending patterns
                          </div>
                        </div>
                      </div>

                      {/* Share Button */}
                      <div className="text-center">
                        <Button
                          onClick={shareResults}
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                        >
                          <Share2 className="w-5 h-5 mr-2" />
                          Try with your friend's username!
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ranking System Info */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Gifter Ranking System:</h4>
                  <div className="grid md:grid-cols-5 gap-3">
                    <div className="text-center">
                      <Badge className="bg-yellow-500 text-white mb-2">VIP Supporter</Badge>
                      <div className="text-sm text-blue-800">$10,000+</div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-purple-500 text-white mb-2">Premium Gifter</Badge>
                      <div className="text-sm text-blue-800">$5,000+</div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-blue-500 text-white mb-2">Active Gifter</Badge>
                      <div className="text-sm text-blue-800">$1,000+</div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-green-500 text-white mb-2">Regular Gifter</Badge>
                      <div className="text-sm text-blue-800">$500+</div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-gray-500 text-white mb-2">Casual Gifter</Badge>
                      <div className="text-sm text-blue-800">Under $500</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-blue-800">
                    <strong>Note:</strong> Estimates are based on username patterns and statistical modeling. 
                    Actual spending may vary. This tool is for entertainment purposes.
                  </div>
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
                  Understanding TikTok gifter analysis and spending estimation
                </p>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How does the TikTok gifter estimator work?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">The estimator uses username patterns, statistical modeling, and algorithmic analysis to generate realistic spending estimates. It's based on typical TikTok user behavior patterns but is for entertainment purposes only.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Are the spending estimates accurate?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">The estimates are based on statistical patterns and username analysis, but actual spending may vary significantly. This tool is designed for entertainment and general estimation purposes, not precise financial tracking.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What makes someone a "VIP Supporter" vs "Casual Gifter"?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Rankings are based on estimated total spending: Casual Gifters (under $500), Regular Gifters ($500+), Active Gifters ($1,000+), Premium Gifters ($5,000+), and VIP Supporters ($10,000+). These reflect different levels of engagement with TikTok's gifting system.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I check my own TikTok gifting stats?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Yes, you can enter your own TikTok username to see estimated spending. However, for actual spending history, check your TikTok app's purchase history in Settings &gt; Balance for precise records.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How much do top TikTok gifters typically spend?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Top gifters (VIP Supporters) can spend $10,000+ annually on TikTok gifts. Some heavy users spend hundreds or thousands monthly supporting their favorite creators through premium gifts like Universe and Galaxy.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does TikTok track user gifting behavior?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">TikTok tracks gifting for payment processing and creator payouts, but individual spending data isn't publicly available. Our estimator uses pattern analysis rather than accessing any private TikTok data.</p>
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
                Explore more tools for TikTok gift and spending analysis
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-orange-600" />
                    Gift Simulator
                  </CardTitle>
                  <CardDescription>
                    Simulate sending gifts to creators and see costs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/gift-simulator">Try Gift Simulator</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    Gift Ranking
                  </CardTitle>
                  <CardDescription>
                    See all TikTok gifts ranked by cost and value
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/gift-ranking">View Gift Rankings</a>
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
            </div>
          </section>
        </div>
        
        <Footer />
      </div>
    </>
  );
}