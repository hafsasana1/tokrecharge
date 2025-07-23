import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Coins, DollarSign, Star, Crown, Gem, Gift } from 'lucide-react';
import type { Gift as GiftType } from '@shared/schema';

export default function GiftRankingPage() {
  const { data: gifts = [], isLoading } = useQuery<GiftType[]>({
    queryKey: ['/api/gifts'],
  });

  // Sort gifts by coin cost (most expensive first)
  const sortedGifts = [...gifts].sort((a, b) => b.coinCost - a.coinCost);

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'bg-yellow-500 text-white';
      case 'epic': return 'bg-purple-500 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      case 'common': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return <Crown className="w-4 h-4" />;
      case 'epic': return <Star className="w-4 h-4" />;
      case 'rare': return <Gem className="w-4 h-4" />;
      case 'common': return <Gift className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const breadcrumbItems = [
    { label: 'Tools', href: '/tools' },
    { label: 'Gift Ranking', href: '/gift-ranking' },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TikTok Gift Price List - Most Expensive to Cheapest 2025",
    "description": "Complete ranking of all TikTok gifts sorted by coin cost and USD equivalent. Find the most expensive TikTok gifts including Lion, Universe, and more.",
    "url": "https://tokrecharge.com/gift-ranking",
    "mainEntity": {
      "@type": "ItemList",
      "name": "TikTok Gifts Ranking by Price",
      "numberOfItems": gifts.length,
      "itemListElement": sortedGifts.map((gift, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": gift.name,
        "description": `${gift.coinCost} TikTok coins - ${(gift.coinCost * 0.015).toFixed(2)} USD`,
        "offers": {
          "@type": "Offer",
          "price": gift.coinCost,
          "priceCurrency": "TikTok Coins"
        }
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="TikTok Gift Price List – Most Expensive to Cheapest 2025"
        description="Complete ranking of TikTok gifts by coin cost and USD value. Find Lion gift cost, Universe price, and all TikTok gift prices in one comprehensive list."
        canonical="https://tokrecharge.com/gift-ranking"
        keywords="tiktok gift list 2025, lion gift cost, tiktok gift coin price, universe gift price, most expensive tiktok gifts, tiktok gift ranking"
        ogTitle="TikTok Gift Ranking - Complete Price List 2025 | Most Expensive Gifts"
        ogDescription="See all TikTok gifts ranked by price! From the most expensive Universe gift to cheapest Rose - complete coin costs and USD values."
        schemaData={schemaData}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Trophy className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              TikTok Gift Price List
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
              Complete ranking of all TikTok gifts sorted by coin cost and USD equivalent.
              Find the most expensive gifts like Lion and Universe!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Total Gifts</div>
                <div className="text-2xl font-bold">{gifts.length}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Most Expensive</div>
                <div className="text-2xl font-bold">{sortedGifts[0]?.coinCost.toLocaleString() || '—'} coins</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-sm opacity-75">Price Range</div>
                <div className="text-2xl font-bold">${sortedGifts[sortedGifts.length - 1]?.coinCost * 0.015 || 0} - ${sortedGifts[0]?.coinCost * 0.015 || 0}</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Gift Ranking Table */}
          <section className="py-8">
            <Card className="shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 text-center py-8">
                <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  TikTok Gift Ranking 2025
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 mt-2">
                  All gifts ranked from most expensive to cheapest
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-8">
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="bg-gray-200 h-16 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                          <th className="text-left p-4 font-bold text-gray-900">Rank</th>
                          <th className="text-left p-4 font-bold text-gray-900">Gift Name</th>
                          <th className="text-left p-4 font-bold text-gray-900">Rarity</th>
                          <th className="text-left p-4 font-bold text-gray-900">Category</th>
                          <th className="text-left p-4 font-bold text-gray-900">Coin Cost</th>
                          <th className="text-left p-4 font-bold text-gray-900">USD Value</th>
                          <th className="text-left p-4 font-bold text-gray-900">Diamond Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedGifts.map((gift, index) => (
                          <tr 
                            key={gift.id} 
                            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                              index === 0 ? 'bg-yellow-50' : 
                              index === 1 ? 'bg-gray-50' : 
                              index === 2 ? 'bg-orange-50' : ''
                            }`}
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {index === 0 && <Crown className="w-5 h-5 text-yellow-500" />}
                                {index === 1 && <Trophy className="w-5 h-5 text-gray-500" />}
                                {index === 2 && <Star className="w-5 h-5 text-orange-500" />}
                                <span className="font-bold text-lg">#{index + 1}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-lg text-gray-900">{gift.name}</div>
                            </td>
                            <td className="p-4">
                              <Badge className={`${getRarityColor(gift.rarity)} flex items-center gap-1 w-fit`}>
                                {getRarityIcon(gift.rarity)}
                                {gift.rarity}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline">{gift.category}</Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Coins className="w-4 h-4 text-pink-600" />
                                <span className="font-bold text-lg">{gift.coinCost.toLocaleString()}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="font-bold text-lg text-green-600">
                                  ${(gift.coinCost * 0.015).toFixed(2)}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Gem className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold">{gift.diamondValue.toLocaleString()}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Gift Categories */}
          <section className="py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Gift Categories Breakdown
              </h2>
              <p className="text-xl text-gray-600">
                Understanding TikTok gift categories and rarity levels
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Legendary Gifts */}
              <Card className="hover:shadow-lg transition-shadow border-yellow-200">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100">
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <Crown className="w-5 h-5" />
                    Legendary
                  </CardTitle>
                  <CardDescription>
                    Most expensive and prestigious gifts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">
                    {sortedGifts.filter(g => g.rarity.toLowerCase() === 'legendary').length} gifts
                  </div>
                  <div className="text-sm text-gray-600">
                    Starting from {Math.min(...sortedGifts.filter(g => g.rarity.toLowerCase() === 'legendary').map(g => g.coinCost)).toLocaleString()} coins
                  </div>
                </CardContent>
              </Card>

              {/* Epic Gifts */}
              <Card className="hover:shadow-lg transition-shadow border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Star className="w-5 h-5" />
                    Epic
                  </CardTitle>
                  <CardDescription>
                    High-value premium gifts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {sortedGifts.filter(g => g.rarity.toLowerCase() === 'epic').length} gifts
                  </div>
                  <div className="text-sm text-gray-600">
                    Starting from {Math.min(...sortedGifts.filter(g => g.rarity.toLowerCase() === 'epic').map(g => g.coinCost)).toLocaleString()} coins
                  </div>
                </CardContent>
              </Card>

              {/* Rare Gifts */}
              <Card className="hover:shadow-lg transition-shadow border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Gem className="w-5 h-5" />
                    Rare
                  </CardTitle>
                  <CardDescription>
                    Mid-tier valuable gifts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {sortedGifts.filter(g => g.rarity.toLowerCase() === 'rare').length} gifts
                  </div>
                  <div className="text-sm text-gray-600">
                    Starting from {Math.min(...sortedGifts.filter(g => g.rarity.toLowerCase() === 'rare').map(g => g.coinCost)).toLocaleString()} coins
                  </div>
                </CardContent>
              </Card>

              {/* Common Gifts */}
              <Card className="hover:shadow-lg transition-shadow border-gray-200">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Gift className="w-5 h-5" />
                    Common
                  </CardTitle>
                  <CardDescription>
                    Affordable everyday gifts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-2xl font-bold text-gray-600 mb-2">
                    {sortedGifts.filter(g => g.rarity.toLowerCase() === 'common').length} gifts
                  </div>
                  <div className="text-sm text-gray-600">
                    Starting from {Math.min(...sortedGifts.filter(g => g.rarity.toLowerCase() === 'common').map(g => g.coinCost)).toLocaleString()} coins
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Related Tools */}
          <section className="py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Related TikTok Tools
              </h2>
              <p className="text-xl text-gray-600">
                Calculate gift costs and simulate gift sending
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
                    Calculate exact costs of any TikTok gift in your currency
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
                    <Trophy className="w-5 h-5 text-orange-600" />
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