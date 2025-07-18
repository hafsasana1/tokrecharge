import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Tool } from '@shared/schema';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const iconMap: Record<string, string> = {
    'calculator': '🧮',
    'gift': '🎁',
    'credit-card': '💳',
    'chart-line': '📈',
    'gem': '💎',
    'money-bill-wave': '💰',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mr-4`}>
            <span className="text-2xl">{iconMap[tool.icon] || '🔧'}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{tool.name}</h3>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          {tool.name === 'Coin Calculator' && 'Calculate the real money value of your TikTok coins in multiple currencies.'}
          {tool.name === 'Gift Value Estimator' && 'Find out how much each TikTok gift costs in real money.'}
          {tool.name === 'Recharge Prices' && 'Compare TikTok coin recharge prices across different countries.'}
          {tool.name === 'Earnings Estimator' && 'Estimate your TikTok earnings from gifts and live streams.'}
          {tool.name === 'Coins to Diamonds' && 'Convert TikTok coins to diamonds and understand the internal currency system.'}
          {tool.name === 'Withdraw Calculator' && 'Calculate your final withdrawal amount after TikTok fees.'}
        </p>
        <Link href={`/${tool.slug}`} className="text-tiktok-pink hover:text-pink-600 font-medium inline-flex items-center">
          Use Tool <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
