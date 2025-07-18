import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-tiktok-gray py-2">
      <div className="container mx-auto px-4">
        <nav className="text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-tiktok-pink hover:underline">
                Home
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-gray-500" />
                {item.href ? (
                  <Link href={item.href} className="text-tiktok-pink hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-600">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
