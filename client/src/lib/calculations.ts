import { EXCHANGE_RATES, TIKTOK_COMMISSION_RATE, COIN_TO_DIAMOND_RATE } from './constants';

export function calculateCoinValue(coins: number, currency: keyof typeof EXCHANGE_RATES): number {
  const rate = EXCHANGE_RATES[currency];
  return coins * rate;
}

export function calculateCreatorEarnings(coins: number, currency: keyof typeof EXCHANGE_RATES): number {
  const totalValue = calculateCoinValue(coins, currency);
  return totalValue * TIKTOK_COMMISSION_RATE;
}

export function calculateWithdrawalAmount(coins: number, currency: keyof typeof EXCHANGE_RATES, withdrawalFee: number = 0.05): number {
  const creatorEarnings = calculateCreatorEarnings(coins, currency);
  return creatorEarnings * (1 - withdrawalFee);
}

export function convertCoinsToDiamonds(coins: number): number {
  return Math.floor(coins * COIN_TO_DIAMOND_RATE);
}

export function convertDiamondsToCoins(diamonds: number): number {
  return diamonds / COIN_TO_DIAMOND_RATE;
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateCoinRatePerDollar(currency: keyof typeof EXCHANGE_RATES): number {
  const rate = EXCHANGE_RATES[currency];
  return 1 / rate;
}

export function calculateBestValueGifts(gifts: Array<{name: string, coinCost: number, diamondValue: number}>) {
  return gifts
    .map(gift => ({
      ...gift,
      efficiency: gift.diamondValue / gift.coinCost,
      creatorValue: gift.coinCost * TIKTOK_COMMISSION_RATE
    }))
    .sort((a, b) => b.efficiency - a.efficiency);
}
