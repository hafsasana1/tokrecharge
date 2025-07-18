import { useState } from 'react';
import { Coins, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { calculateCoinValue, formatCurrency } from '@/lib/calculations';
import { EXCHANGE_RATES } from '@/lib/constants';

export default function CoinCalculator() {
  const [coinAmount, setCoinAmount] = useState(1000);
  const [selectedCurrency, setSelectedCurrency] = useState<keyof typeof EXCHANGE_RATES>('USD');
  const [calculatedValue, setCalculatedValue] = useState(0);

  const handleCalculate = () => {
    const value = calculateCoinValue(coinAmount, selectedCurrency);
    setCalculatedValue(value);
  };

  const handleCoinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCoinAmount(value);
    // Auto-calculate on input change
    const calculated = calculateCoinValue(value, selectedCurrency);
    setCalculatedValue(calculated);
  };

  const handleCurrencyChange = (currency: keyof typeof EXCHANGE_RATES) => {
    setSelectedCurrency(currency);
    // Auto-calculate on currency change
    const calculated = calculateCoinValue(coinAmount, currency);
    setCalculatedValue(calculated);
  };

  // Initialize with default calculation
  useState(() => {
    const initialValue = calculateCoinValue(coinAmount, selectedCurrency);
    setCalculatedValue(initialValue);
  });

  return (
    <Card className="shadow-lg border">
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Label htmlFor="coin-amount" className="block text-sm font-medium text-gray-700 mb-2">
              <Coins className="inline w-4 h-4 text-tiktok-pink mr-2" />
              TikTok Coins
            </Label>
            <Input
              id="coin-amount"
              type="number"
              placeholder="Enter coin amount"
              value={coinAmount}
              onChange={handleCoinAmountChange}
              className="text-lg"
            />
          </div>

          <div>
            <Label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="inline w-4 h-4 text-tiktok-cyan mr-2" />
              Currency
            </Label>
            <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-tiktok-pink to-tiktok-cyan rounded-lg text-white">
          <div className="text-center">
            <div className="text-sm opacity-90 mb-2">Estimated Value</div>
            <div className="text-4xl font-bold">
              {formatCurrency(calculatedValue, selectedCurrency)}
            </div>
            <div className="text-sm opacity-90 mt-2">
              1 TikTok Coin ≈ {formatCurrency(EXCHANGE_RATES[selectedCurrency], selectedCurrency)}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button 
            onClick={handleCalculate}
            className="bg-tiktok-pink hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Calculate Value
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
