import { useState } from 'react';
import { Gem, ArrowRight, Coins } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { convertCoinsToDiamonds, convertDiamondsToCoins } from '@/lib/calculations';

export default function CoinToDiamondConverter() {
  const [coins, setCoins] = useState(1000);
  const [diamonds, setDiamonds] = useState(500);
  const [convertedCoins, setConvertedCoins] = useState(0);
  const [convertedDiamonds, setConvertedDiamonds] = useState(0);

  const handleCoinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCoins(value);
    // Auto-convert
    const converted = convertCoinsToDiamonds(value);
    setConvertedDiamonds(converted);
  };

  const handleDiamondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setDiamonds(value);
    // Auto-convert
    const converted = convertDiamondsToCoins(value);
    setConvertedCoins(converted);
  };

  // Initialize with default conversions
  useState(() => {
    setConvertedDiamonds(convertCoinsToDiamonds(coins));
    setConvertedCoins(convertDiamondsToCoins(diamonds));
  });

  return (
    <Card className="shadow-lg border">
      <CardContent className="p-8">
        <Tabs defaultValue="coins-to-diamonds" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="coins-to-diamonds">Coins to Diamonds</TabsTrigger>
            <TabsTrigger value="diamonds-to-coins">Diamonds to Coins</TabsTrigger>
          </TabsList>
          
          <TabsContent value="coins-to-diamonds" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Label htmlFor="coins-input" className="block text-sm font-medium text-gray-700 mb-2">
                  <Coins className="inline w-4 h-4 text-tiktok-pink mr-2" />
                  TikTok Coins
                </Label>
                <Input
                  id="coins-input"
                  type="number"
                  placeholder="Enter coins"
                  value={coins}
                  onChange={handleCoinsChange}
                  className="text-lg"
                />
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-tiktok-cyan" />
              </div>

              <div className="md:col-start-2">
                <div className="p-6 bg-gradient-to-r from-tiktok-pink to-purple-500 rounded-lg text-white text-center">
                  <div className="text-sm opacity-90 mb-2">Converted to Diamonds</div>
                  <div className="text-4xl font-bold flex items-center justify-center">
                    <Gem className="w-8 h-8 mr-2" />
                    {convertedDiamonds}
                  </div>
                  <div className="text-sm opacity-90 mt-2">
                    Conversion Rate: 2 Coins = 1 Diamond
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="diamonds-to-coins" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Label htmlFor="diamonds-input" className="block text-sm font-medium text-gray-700 mb-2">
                  <Gem className="inline w-4 h-4 text-purple-500 mr-2" />
                  TikTok Diamonds
                </Label>
                <Input
                  id="diamonds-input"
                  type="number"
                  placeholder="Enter diamonds"
                  value={diamonds}
                  onChange={handleDiamondsChange}
                  className="text-lg"
                />
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-tiktok-cyan" />
              </div>

              <div className="md:col-start-2">
                <div className="p-6 bg-gradient-to-r from-purple-500 to-tiktok-pink rounded-lg text-white text-center">
                  <div className="text-sm opacity-90 mb-2">Converted to Coins</div>
                  <div className="text-4xl font-bold flex items-center justify-center">
                    <Coins className="w-8 h-8 mr-2" />
                    {convertedCoins}
                  </div>
                  <div className="text-sm opacity-90 mt-2">
                    Conversion Rate: 1 Diamond = 2 Coins
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-4">Understanding TikTok's Currency System</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• <strong>Coins:</strong> Virtual currency that users purchase with real money</p>
            <p>• <strong>Diamonds:</strong> What creators receive when users send gifts (2 coins = 1 diamond)</p>
            <p>• <strong>Conversion:</strong> Creators can convert diamonds to real money through TikTok's withdrawal system</p>
            <p>• <strong>Commission:</strong> TikTok takes approximately 50% commission on all transactions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
