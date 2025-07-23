import { Link } from 'wouter';
import { Coins } from 'lucide-react';

export default function Footer() {
  const toolLinks = [
    { name: 'Coin Calculator', href: '/coin-calculator' },
    { name: 'Gift Value Estimator', href: '/gift-value' },
    { name: 'Earnings Calculator', href: '/earnings-estimator' },
    { name: 'Recharge Prices', href: '/recharge-prices' },
  ];

  const countryLinks = [
    { 
      id: 'usa',
      name: '🇺🇸 USA Pricing',
      href: '/coins-in-united-states',
      flag: '🇺🇸',
      code: 'US',
      label: 'USA Pricing'
    },
    { 
      id: 'india',
      name: '🇮🇳 India Pricing',
      href: '/coins-in-india',
      flag: '🇮🇳',
      code: 'IN',
      label: 'India Pricing'
    },
    { 
      id: 'pakistan',
      name: '🇵🇰 Pakistan Pricing',
      href: '/coins-in-pakistan',
      flag: '🇵🇰',
      code: 'PK',
      label: 'Pakistan Pricing'
    },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="bg-tiktok-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-tiktok-pink to-tiktok-cyan rounded-full flex items-center justify-center">
                <Coins className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">TokRecharge.com</h3>
            </Link>
            <p className="text-gray-400">
              Your complete toolkit for TikTok monetization and coin calculations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Countries</h4>
            <ul className="space-y-2">
              {countryLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                    <span className="text-lg">{link.flag}</span>
                    <div className="bg-gray-600 text-white px-1 py-0.5 rounded text-xs font-bold">{link.code}</div>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TokRecharge.com. All rights reserved. Not affiliated with TikTok.</p>
        </div>
      </div>
    </footer>
  );
}
