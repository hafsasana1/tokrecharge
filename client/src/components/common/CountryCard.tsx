import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Country } from '@shared/schema';

interface CountryCardProps {
  country: Country;
  samplePrice?: string;
}

export default function CountryCard({ country, samplePrice }: CountryCardProps) {
  const countrySlug = country.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Card className="text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden group">
      <CardContent className="p-6">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{country.flag}</div>
        <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{country.name}</h3>
        <p className="text-gray-600 mb-6 text-lg font-medium">
          {samplePrice || `70 coins = ${country.currency} ${(70 * parseFloat(country.coinRate)).toFixed(2)}`}
        </p>
        <Link 
          href={`/coins-in-${countrySlug}`}
          className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center group-hover:translate-x-1 transition-all duration-300"
        >
          View {country.name} Prices <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </CardContent>
    </Card>
  );
}
