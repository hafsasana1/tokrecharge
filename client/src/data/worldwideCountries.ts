// Comprehensive worldwide countries data with TikTok coin pricing
export const worldwideCountriesData = [
  // North America
  { id: 1, name: "United States", code: "US", currency: "USD", coinRate: "0.0150", flag: "🇺🇸", region: "North America", isActive: true },
  { id: 2, name: "Canada", code: "CA", currency: "CAD", coinRate: "0.0200", flag: "🇨🇦", region: "North America", isActive: true },
  { id: 3, name: "Mexico", code: "MX", currency: "MXN", coinRate: "0.2700", flag: "🇲🇽", region: "North America", isActive: true },

  // Europe
  { id: 4, name: "United Kingdom", code: "GB", currency: "GBP", coinRate: "0.0120", flag: "🇬🇧", region: "Europe", isActive: true },
  { id: 5, name: "Germany", code: "DE", currency: "EUR", coinRate: "0.0140", flag: "🇩🇪", region: "Europe", isActive: true },
  { id: 6, name: "France", code: "FR", currency: "EUR", coinRate: "0.0140", flag: "🇫🇷", region: "Europe", isActive: true },
  { id: 7, name: "Italy", code: "IT", currency: "EUR", coinRate: "0.0140", flag: "🇮🇹", region: "Europe", isActive: true },
  { id: 8, name: "Spain", code: "ES", currency: "EUR", coinRate: "0.0140", flag: "🇪🇸", region: "Europe", isActive: true },
  { id: 9, name: "Netherlands", code: "NL", currency: "EUR", coinRate: "0.0140", flag: "🇳🇱", region: "Europe", isActive: true },
  { id: 10, name: "Poland", code: "PL", currency: "PLN", coinRate: "0.0650", flag: "🇵🇱", region: "Europe", isActive: true },
  { id: 11, name: "Turkey", code: "TR", currency: "TRY", coinRate: "0.4500", flag: "🇹🇷", region: "Europe", isActive: true },

  // Asia Pacific
  { id: 12, name: "India", code: "IN", currency: "INR", coinRate: "1.2500", flag: "🇮🇳", region: "Asia Pacific", isActive: true },
  { id: 13, name: "Pakistan", code: "PK", currency: "PKR", coinRate: "4.2000", flag: "🇵🇰", region: "Asia Pacific", isActive: true },
  { id: 14, name: "Japan", code: "JP", currency: "JPY", coinRate: "2.2000", flag: "🇯🇵", region: "Asia Pacific", isActive: true },
  { id: 15, name: "South Korea", code: "KR", currency: "KRW", coinRate: "20.5000", flag: "🇰🇷", region: "Asia Pacific", isActive: true },
  { id: 16, name: "China", code: "CN", currency: "CNY", coinRate: "0.1100", flag: "🇨🇳", region: "Asia Pacific", isActive: true },
  { id: 17, name: "Australia", code: "AU", currency: "AUD", coinRate: "0.0230", flag: "🇦🇺", region: "Asia Pacific", isActive: true },
  { id: 18, name: "Philippines", code: "PH", currency: "PHP", coinRate: "0.8500", flag: "🇵🇭", region: "Asia Pacific", isActive: true },
  { id: 19, name: "Thailand", code: "TH", currency: "THB", coinRate: "0.5400", flag: "🇹🇭", region: "Asia Pacific", isActive: true },
  { id: 20, name: "Vietnam", code: "VN", currency: "VND", coinRate: "380.0000", flag: "🇻🇳", region: "Asia Pacific", isActive: true },
  { id: 21, name: "Malaysia", code: "MY", currency: "MYR", coinRate: "0.0700", flag: "🇲🇾", region: "Asia Pacific", isActive: true },
  { id: 22, name: "Singapore", code: "SG", currency: "SGD", coinRate: "0.0200", flag: "🇸🇬", region: "Asia Pacific", isActive: true },
  { id: 23, name: "Indonesia", code: "ID", currency: "IDR", coinRate: "230.0000", flag: "🇮🇩", region: "Asia Pacific", isActive: true },

  // South America
  { id: 24, name: "Brazil", code: "BR", currency: "BRL", coinRate: "0.0750", flag: "🇧🇷", region: "South America", isActive: true },
  { id: 25, name: "Argentina", code: "AR", currency: "ARS", coinRate: "13.5000", flag: "🇦🇷", region: "South America", isActive: true },
  { id: 26, name: "Chile", code: "CL", currency: "CLP", coinRate: "14.2000", flag: "🇨🇱", region: "South America", isActive: true },
  { id: 27, name: "Colombia", code: "CO", currency: "COP", coinRate: "62.5000", flag: "🇨🇴", region: "South America", isActive: true },

  // Africa
  { id: 28, name: "South Africa", code: "ZA", currency: "ZAR", coinRate: "0.2800", flag: "🇿🇦", region: "Africa", isActive: true },
  { id: 29, name: "Nigeria", code: "NG", currency: "NGN", coinRate: "12.3000", flag: "🇳🇬", region: "Africa", isActive: true },
  { id: 30, name: "Egypt", code: "EG", currency: "EGP", coinRate: "0.4650", flag: "🇪🇬", region: "Africa", isActive: true },

  // Middle East
  { id: 31, name: "Saudi Arabia", code: "SA", currency: "SAR", coinRate: "0.0560", flag: "🇸🇦", region: "Middle East", isActive: true },
  { id: 32, name: "United Arab Emirates", code: "AE", currency: "AED", coinRate: "0.0550", flag: "🇦🇪", region: "Middle East", isActive: true },
  { id: 33, name: "Israel", code: "IL", currency: "ILS", coinRate: "0.0550", flag: "🇮🇱", region: "Middle East", isActive: true },

  // Additional Popular Countries
  { id: 34, name: "Russia", code: "RU", currency: "RUB", coinRate: "1.4000", flag: "🇷🇺", region: "Europe", isActive: true },
  { id: 35, name: "Bangladesh", code: "BD", currency: "BDT", coinRate: "1.6500", flag: "🇧🇩", region: "Asia Pacific", isActive: true },
  { id: 36, name: "Sri Lanka", code: "LK", currency: "LKR", coinRate: "4.8500", flag: "🇱🇰", region: "Asia Pacific", isActive: true },
  { id: 37, name: "Nepal", code: "NP", currency: "NPR", coinRate: "2.0000", flag: "🇳🇵", region: "Asia Pacific", isActive: true },
  { id: 38, name: "Afghanistan", code: "AF", currency: "AFN", coinRate: "1.3200", flag: "🇦🇫", region: "Asia Pacific", isActive: true },
  { id: 39, name: "Kazakhstan", code: "KZ", currency: "KZT", coinRate: "6.8000", flag: "🇰🇿", region: "Asia Pacific", isActive: true },
  { id: 40, name: "Ukraine", code: "UA", currency: "UAH", coinRate: "0.5500", flag: "🇺🇦", region: "Europe", isActive: true }
];

// Group countries by region for better organization
export const countriesByRegion = {
  "North America": worldwideCountriesData.filter(c => c.region === "North America"),
  "Europe": worldwideCountriesData.filter(c => c.region === "Europe"),
  "Asia Pacific": worldwideCountriesData.filter(c => c.region === "Asia Pacific"),
  "South America": worldwideCountriesData.filter(c => c.region === "South America"),
  "Africa": worldwideCountriesData.filter(c => c.region === "Africa"),
  "Middle East": worldwideCountriesData.filter(c => c.region === "Middle East")
};

export const regionColors = {
  "North America": "from-blue-500 to-cyan-500",
  "Europe": "from-purple-500 to-pink-500",
  "Asia Pacific": "from-green-500 to-teal-500",
  "South America": "from-orange-500 to-red-500",
  "Africa": "from-yellow-500 to-orange-600",
  "Middle East": "from-indigo-500 to-purple-600"
};