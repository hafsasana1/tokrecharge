interface CountryFlagProps {
  flag: string;
  countryCode: string;
  countryName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCode?: boolean;
  showName?: boolean;
  className?: string;
}

export default function CountryFlag({ 
  flag, 
  countryCode, 
  countryName, 
  size = 'md',
  showCode = false,
  showName = false,
  className = "" 
}: CountryFlagProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className={`${sizeClasses[size]} transition-transform duration-300 hover:scale-110`}>
        {flag}
      </span>
      {showCode && (
        <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-bold">
          {countryCode}
        </div>
      )}
      {showName && (
        <span className="font-semibold text-gray-800">{countryName}</span>
      )}
    </div>
  );
}