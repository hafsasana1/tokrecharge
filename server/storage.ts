import { tools, countries, gifts, blogPosts, rechargePackages, type Tool, type Country, type Gift, type BlogPost, type RechargePackage, type InsertTool, type InsertCountry, type InsertGift, type InsertBlogPost, type InsertRechargePackage } from "@shared/schema";

export interface IStorage {
  // Tools
  getTools(): Promise<Tool[]>;
  getToolBySlug(slug: string): Promise<Tool | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  
  // Countries
  getCountries(): Promise<Country[]>;
  getCountryByCode(code: string): Promise<Country | undefined>;
  createCountry(country: InsertCountry): Promise<Country>;
  
  // Gifts
  getGifts(): Promise<Gift[]>;
  getGiftsByCategory(category: string): Promise<Gift[]>;
  createGift(gift: InsertGift): Promise<Gift>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  
  // Recharge Packages
  getRechargePackages(): Promise<RechargePackage[]>;
  getRechargePackagesByCountry(countryId: number): Promise<RechargePackage[]>;
  createRechargePackage(rechargePackage: InsertRechargePackage): Promise<RechargePackage>;
}

export class MemStorage implements IStorage {
  private tools: Map<number, Tool> = new Map();
  private countries: Map<number, Country> = new Map();
  private gifts: Map<number, Gift> = new Map();
  private blogPosts: Map<number, BlogPost> = new Map();
  private rechargePackages: Map<number, RechargePackage> = new Map();
  private currentId: number = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize tools
    const toolsData = [
      { id: 1, name: "Coin Calculator", slug: "coin-calculator", description: "Convert coins to currency", icon: "calculator", color: "from-tiktok-pink to-tiktok-cyan", category: "calculator", isActive: true, createdAt: new Date() },
      { id: 2, name: "Gift Value Estimator", slug: "gift-value", description: "Check gift costs", icon: "gift", color: "from-purple-500 to-tiktok-cyan", category: "calculator", isActive: true, createdAt: new Date() },
      { id: 3, name: "Recharge Prices", slug: "recharge-prices", description: "Compare country rates", icon: "credit-card", color: "from-tiktok-cyan to-blue-500", category: "comparison", isActive: true, createdAt: new Date() },
      { id: 4, name: "Earnings Estimator", slug: "earnings-estimator", description: "Calculate creator income", icon: "chart-line", color: "from-green-500 to-tiktok-cyan", category: "calculator", isActive: true, createdAt: new Date() },
      { id: 5, name: "Coins to Diamonds", slug: "coin-to-diamond", description: "Convert currencies", icon: "gem", color: "from-tiktok-pink to-purple-500", category: "converter", isActive: true, createdAt: new Date() },
      { id: 6, name: "Withdraw Calculator", slug: "withdraw-value", description: "Net withdrawal amount", icon: "money-bill-wave", color: "from-orange-500 to-tiktok-pink", category: "calculator", isActive: true, createdAt: new Date() },
    ];

    toolsData.forEach(tool => this.tools.set(tool.id, tool));

    // Initialize countries
    const countriesData = [
      { id: 1, name: "United States", code: "US", currency: "USD", coinRate: "0.015000", flag: "🇺🇸", isActive: true },
      { id: 2, name: "India", code: "IN", currency: "INR", coinRate: "1.250000", flag: "🇮🇳", isActive: true },
      { id: 3, name: "Pakistan", code: "PK", currency: "PKR", coinRate: "4.200000", flag: "🇵🇰", isActive: true },
      { id: 4, name: "United Kingdom", code: "GB", currency: "GBP", coinRate: "0.012000", flag: "🇬🇧", isActive: true },
      { id: 5, name: "Canada", code: "CA", currency: "CAD", coinRate: "0.020000", flag: "🇨🇦", isActive: true },
    ];

    countriesData.forEach(country => this.countries.set(country.id, country));

    // Initialize gifts
    const giftsData = [
      { id: 1, name: "Rose", coinCost: 1, diamondValue: 1, category: "Basic", rarity: "Common", isActive: true },
      { id: 2, name: "TikTok", coinCost: 5, diamondValue: 5, category: "Basic", rarity: "Common", isActive: true },
      { id: 3, name: "Sunglasses", coinCost: 10, diamondValue: 10, category: "Basic", rarity: "Common", isActive: true },
      { id: 4, name: "Heart Me", coinCost: 15, diamondValue: 15, category: "Basic", rarity: "Common", isActive: true },
      { id: 5, name: "Perfume", coinCost: 20, diamondValue: 20, category: "Basic", rarity: "Common", isActive: true },
      { id: 6, name: "Paper Crane", coinCost: 99, diamondValue: 99, category: "Premium", rarity: "Rare", isActive: true },
      { id: 7, name: "Galaxy", coinCost: 1000, diamondValue: 1000, category: "Premium", rarity: "Epic", isActive: true },
      { id: 8, name: "Universe", coinCost: 34999, diamondValue: 34999, category: "Premium", rarity: "Legendary", isActive: true },
    ];

    giftsData.forEach(gift => this.gifts.set(gift.id, gift));

    // Initialize blog posts
    const blogPostsData = [
      {
        id: 1,
        title: "How Much Is 1000 TikTok Coins?",
        slug: "1000-tiktok-coins-value",
        excerpt: "Complete breakdown of TikTok coin values and conversion rates across different countries.",
        content: "TikTok coins are the virtual currency used within the TikTok app...",
        metaDescription: "Learn the exact value of 1000 TikTok coins in different currencies and countries.",
        keywords: "tiktok coins value, 1000 tiktok coins, tiktok coin calculator",
        publishedAt: new Date(),
        isPublished: true,
      },
      {
        id: 2,
        title: "TikTok Recharge Prices: India vs USA",
        slug: "tiktok-recharge-prices-comparison",
        excerpt: "Compare TikTok coin prices across different countries and find the best deals.",
        content: "TikTok coin prices vary significantly between countries...",
        metaDescription: "Compare TikTok coin recharge prices between India and USA to find the best deals.",
        keywords: "tiktok recharge price, tiktok coins india, tiktok coins usa",
        publishedAt: new Date(),
        isPublished: true,
      },
      {
        id: 3,
        title: "Which TikTok Gifts Give the Most Cash?",
        slug: "best-value-tiktok-gifts",
        excerpt: "Discover which TikTok gifts provide the best value for money for creators.",
        content: "When it comes to TikTok monetization, not all gifts are created equal...",
        metaDescription: "Find out which TikTok gifts give creators the best return on investment.",
        keywords: "tiktok gifts value, tiktok monetization, tiktok creator earnings",
        publishedAt: new Date(),
        isPublished: true,
      },
    ];

    blogPostsData.forEach(post => this.blogPosts.set(post.id, post));

    // Initialize recharge packages
    const rechargePackagesData = [
      { id: 1, countryId: 1, coins: 70, price: "1.09", currency: "USD", isActive: true },
      { id: 2, countryId: 1, coins: 350, price: "5.49", currency: "USD", isActive: true },
      { id: 3, countryId: 1, coins: 700, price: "10.99", currency: "USD", isActive: true },
      { id: 4, countryId: 2, coins: 70, price: "89.00", currency: "INR", isActive: true },
      { id: 5, countryId: 2, coins: 350, price: "449.00", currency: "INR", isActive: true },
      { id: 6, countryId: 2, coins: 700, price: "899.00", currency: "INR", isActive: true },
      { id: 7, countryId: 3, coins: 70, price: "309.00", currency: "PKR", isActive: true },
      { id: 8, countryId: 3, coins: 350, price: "1549.00", currency: "PKR", isActive: true },
      { id: 9, countryId: 3, coins: 700, price: "3099.00", currency: "PKR", isActive: true },
    ];

    rechargePackagesData.forEach(pkg => this.rechargePackages.set(pkg.id, pkg));

    this.currentId = 100;
  }

  async getTools(): Promise<Tool[]> {
    return Array.from(this.tools.values());
  }

  async getToolBySlug(slug: string): Promise<Tool | undefined> {
    return Array.from(this.tools.values()).find(tool => tool.slug === slug);
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = this.currentId++;
    const tool: Tool = { ...insertTool, id, createdAt: new Date() };
    this.tools.set(id, tool);
    return tool;
  }

  async getCountries(): Promise<Country[]> {
    return Array.from(this.countries.values());
  }

  async getCountryByCode(code: string): Promise<Country | undefined> {
    return Array.from(this.countries.values()).find(country => country.code === code);
  }

  async createCountry(insertCountry: InsertCountry): Promise<Country> {
    const id = this.currentId++;
    const country: Country = { ...insertCountry, id };
    this.countries.set(id, country);
    return country;
  }

  async getGifts(): Promise<Gift[]> {
    return Array.from(this.gifts.values());
  }

  async getGiftsByCategory(category: string): Promise<Gift[]> {
    return Array.from(this.gifts.values()).filter(gift => gift.category === category);
  }

  async createGift(insertGift: InsertGift): Promise<Gift> {
    const id = this.currentId++;
    const gift: Gift = { ...insertGift, id };
    this.gifts.set(id, gift);
    return gift;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentId++;
    const blogPost: BlogPost = { ...insertBlogPost, id, publishedAt: new Date() };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async getRechargePackages(): Promise<RechargePackage[]> {
    return Array.from(this.rechargePackages.values());
  }

  async getRechargePackagesByCountry(countryId: number): Promise<RechargePackage[]> {
    return Array.from(this.rechargePackages.values()).filter(pkg => pkg.countryId === countryId);
  }

  async createRechargePackage(insertRechargePackage: InsertRechargePackage): Promise<RechargePackage> {
    const id = this.currentId++;
    const rechargePackage: RechargePackage = { ...insertRechargePackage, id };
    this.rechargePackages.set(id, rechargePackage);
    return rechargePackage;
  }
}

export const storage = new MemStorage();
