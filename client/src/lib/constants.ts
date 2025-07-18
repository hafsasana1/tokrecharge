export const TIKTOK_COLORS = {
  pink: '#FF0050',
  cyan: '#25F4EE',
  dark: '#161823',
  gray: '#F8F9FA',
} as const;

export const EXCHANGE_RATES = {
  USD: 0.015,
  INR: 1.25,
  PKR: 4.2,
  EUR: 0.014,
  GBP: 0.012,
  CAD: 0.020,
} as const;

export const TIKTOK_COMMISSION_RATE = 0.5; // 50% commission for creators

export const COIN_TO_DIAMOND_RATE = 0.5; // 2 coins = 1 diamond

export const FAQ_DATA = [
  {
    question: "How much is 1 TikTok coin worth?",
    answer: "1 TikTok coin is approximately worth $0.015 USD, but the exact value can vary slightly based on your location and current exchange rates."
  },
  {
    question: "Do TikTok coin prices vary by country?",
    answer: "Yes, TikTok coin prices vary significantly by country due to local currency rates and regional pricing strategies. Our country-specific tools help you find your local rates."
  },
  {
    question: "How much do creators earn from TikTok gifts?",
    answer: "Creators typically receive about 50% of the gift value after TikTok takes its commission. Use our earnings estimator to calculate your potential income."
  },
  {
    question: "What's the difference between coins and diamonds?",
    answer: "Coins are what users purchase, while diamonds are what creators receive. The conversion is typically 2 coins = 1 diamond, with diamonds being worth about half a coin's value."
  },
  {
    question: "Can I withdraw my TikTok earnings?",
    answer: "Yes, creators can withdraw their earnings once they reach the minimum threshold (usually $20-50 depending on your region). TikTok takes a commission on withdrawals."
  },
  {
    question: "How often are coin exchange rates updated?",
    answer: "TikTok coin exchange rates are generally stable but can change based on currency fluctuations and regional pricing adjustments. We update our rates regularly to reflect current values."
  }
] as const;
