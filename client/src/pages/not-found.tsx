import { Link } from 'wouter';
import { Home, AlertCircle, Calculator, BookOpen, Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  const quickLinks = [
    { 
      name: 'Coin Calculator', 
      href: '/coin-calculator', 
      icon: Calculator,
      description: 'Convert TikTok coins to real money'
    },
    { 
      name: 'Blog', 
      href: '/blog', 
      icon: BookOpen,
      description: 'Read our latest guides and tips'
    },
    { 
      name: 'Country Pricing', 
      href: '/country-pricing', 
      icon: Globe,
      description: 'Compare prices across countries'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="relative inline-block">
              <AlertCircle className="mx-auto h-32 w-32 text-purple-600 mb-4 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-3xl"></div>
            </div>
            <h1 className="text-8xl font-bold text-gray-900 mb-2 tracking-tight">404</h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Sorry, we couldn't find the TikTok calculator or page you're looking for. 
              But don't worry - we have plenty of other helpful tools and resources available!
            </p>
          </div>
          
          <div className="mb-12">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Home className="mr-3 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Popular TikTok Tools & Resources
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.name} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                      <h4 className="text-xl font-semibold mb-2 text-gray-800">{link.name}</h4>
                      <p className="text-gray-600">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              What You Can Do on TokRecharge.com
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-gray-800">Calculator Tools</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• TikTok Coin to Currency Calculator</li>
                  <li>• Gift Value Estimator</li>
                  <li>• Creator Earnings Calculator</li>
                  <li>• Withdrawal Value Calculator</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-gray-800">Global Features</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Country-specific pricing</li>
                  <li>• Multi-currency support</li>
                  <li>• Real-time exchange rates</li>
                  <li>• Regional recharge guides</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
