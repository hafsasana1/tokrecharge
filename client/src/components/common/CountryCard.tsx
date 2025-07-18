import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Country } from '@shared/schema';

interface CountryCardProps {
  country: Country;
  samplePrice?: string;
}

export default function CountryCard({ country, samplePrice }: CountryCardProps) {
  const countrySlug = country.name.toLowerCase().replace(' ', '-');
  
  return (
    <Card className="text-center hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="text-4xl mb-4">{country.flag}</div>
        <h3 className="font-semibold text-lg mb-2">{country.name}</h3>
        <p className="text-gray-600 mb-4">
          {samplePrice || `70 coins = ${country.currency} ${(70 * parseFloat(country.coinRate)).toFixed(2)}`}
        </p>
        <Link 
          href={`/coins-in-${countrySlug}`}
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          View {country.name} Prices <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
