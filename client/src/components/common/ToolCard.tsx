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
    <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-start mb-6">
          <div className={`w-14 h-14 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-2xl">{iconMap[tool.icon] || '🔧'}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">{tool.name}</h3>
            <p className="text-sm text-gray-500 font-medium">{tool.description}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {tool.name === 'Coin Calculator' && 'Calculate the real money value of your TikTok coins in multiple currencies.'}
          {tool.name === 'Gift Value Estimator' && 'Find out how much each TikTok gift costs in real money.'}
          {tool.name === 'Recharge Prices' && 'Compare TikTok coin recharge prices across different countries.'}
          {tool.name === 'Earnings Estimator' && 'Estimate your TikTok earnings from gifts and live streams.'}
          {tool.name === 'Coins to Diamonds' && 'Convert TikTok coins to diamonds and understand the internal currency system.'}
          {tool.name === 'Withdraw Calculator' && 'Calculate your final withdrawal amount after TikTok fees.'}
        </p>
        <Link href={`/${tool.slug}`} className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center group-hover:translate-x-1 transition-all duration-300">
          Use Tool <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </CardContent>
    </Card>
  );
}
