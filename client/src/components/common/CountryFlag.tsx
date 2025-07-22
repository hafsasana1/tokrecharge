interface CountryFlagProps {
  flag: string;
  code: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCode?: boolean;
  showName?: boolean;
  className?: string;
}

export default function CountryFlag({ 
  flag, 
  code, 
  name, 
  size = 'md', 
  showCode = false, 
  showName = false,
  className = ''
}: CountryFlagProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl', 
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const codeClasses = {
    sm: 'text-xs px-1 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2 py-1', 
    xl: 'text-sm px-3 py-1'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex flex-col items-center space-y-1">
        <div className={`${sizeClasses[size]} transition-transform duration-300 hover:scale-110`}>
          {flag}
        </div>
        {showCode && (
          <div className={`bg-gray-800 text-white rounded font-bold ${codeClasses[size]}`}>
            {code}
          </div>
        )}
      </div>
      {showName && name && (
        <span className="font-semibold text-gray-800">{name}</span>
      )}
    </div>
  );
}