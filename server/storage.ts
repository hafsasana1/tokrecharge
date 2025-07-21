import { 
  tools, countries, gifts, blogPosts, rechargePackages, adminUsers, siteSettings, visitorLogs, adsense, coinRates, commissionSettings,
  type Tool, type Country, type Gift, type BlogPost, type RechargePackage, type AdminUser, type SiteSetting, type VisitorLog, 
  type Adsense, type CoinRate, type CommissionSetting, type InsertTool, type InsertCountry, type InsertGift, type InsertBlogPost, 
  type InsertRechargePackage, type InsertAdminUser, type InsertSiteSetting, type InsertVisitorLog, type InsertAdsense, 
  type InsertCoinRate, type InsertCommissionSetting 
} from "@shared/schema";

export interface IStorage {
  // Tools
  getTools(): Promise<Tool[]>;
  getToolBySlug(slug: string): Promise<Tool | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  updateTool(id: number, tool: Partial<InsertTool>): Promise<Tool | undefined>;
  deleteTool(id: number): Promise<boolean>;
  
  // Countries
  getCountries(): Promise<Country[]>;
  getCountryByCode(code: string): Promise<Country | undefined>;
  createCountry(country: InsertCountry): Promise<Country>;
  updateCountry(id: number, country: Partial<InsertCountry>): Promise<Country | undefined>;
  deleteCountry(id: number): Promise<boolean>;
  
  // Gifts
  getGifts(): Promise<Gift[]>;
  getGiftsByCategory(category: string): Promise<Gift[]>;
  createGift(gift: InsertGift): Promise<Gift>;
  updateGift(id: number, gift: Partial<InsertGift>): Promise<Gift | undefined>;
  deleteGift(id: number): Promise<boolean>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  
  // Recharge Packages
  getRechargePackages(): Promise<RechargePackage[]>;
  getRechargePackagesByCountry(countryId: number): Promise<RechargePackage[]>;
  createRechargePackage(rechargePackage: InsertRechargePackage): Promise<RechargePackage>;
  updateRechargePackage(id: number, rechargePackage: Partial<InsertRechargePackage>): Promise<RechargePackage | undefined>;
  deleteRechargePackage(id: number): Promise<boolean>;
  
  // Admin Users
  getAdminUsers(): Promise<AdminUser[]>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: number, adminUser: Partial<InsertAdminUser>): Promise<AdminUser | undefined>;
  updateAdminUserLastLogin(id: number): Promise<void>;
  
  // Site Settings
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSettingByKey(key: string): Promise<SiteSetting | undefined>;
  setSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
  updateSiteSetting(key: string, value: string): Promise<SiteSetting | undefined>;
  
  // Visitor Logs
  getVisitorLogs(limit?: number): Promise<VisitorLog[]>;
  createVisitorLog(visitorLog: InsertVisitorLog): Promise<VisitorLog>;
  getVisitorStatsByCountry(): Promise<{ country: string; count: number }[]>;
  getVisitorStatsByPage(): Promise<{ page: string; count: number }[]>;
  getDailyVisitorCount(): Promise<{ date: string; count: number }[]>;
  
  // AdSense
  getAdsenseAds(): Promise<Adsense[]>;
  getAdsenseAdsByLocation(location: string): Promise<Adsense[]>;
  createAdsenseAd(ad: InsertAdsense): Promise<Adsense>;
  updateAdsenseAd(id: number, ad: Partial<InsertAdsense>): Promise<Adsense | undefined>;
  deleteAdsenseAd(id: number): Promise<boolean>;
  
  // Coin Rates
  getCoinRates(): Promise<CoinRate[]>;
  getCoinRateByCurrency(currency: string): Promise<CoinRate | undefined>;
  setCoinRate(coinRate: InsertCoinRate): Promise<CoinRate>;
  updateCoinRate(currency: string, rate: string): Promise<CoinRate | undefined>;
  
  // Commission Settings
  getCommissionSettings(): Promise<CommissionSetting[]>;
  getCommissionSettingByPlatform(platform: string): Promise<CommissionSetting | undefined>;
  setCommissionSetting(setting: InsertCommissionSetting): Promise<CommissionSetting>;
  updateCommissionSetting(platform: string, setting: Partial<InsertCommissionSetting>): Promise<CommissionSetting | undefined>;
}

export class MemStorage implements IStorage {
  private tools: Map<number, Tool> = new Map();
  private countries: Map<number, Country> = new Map();
  private gifts: Map<number, Gift> = new Map();
  private blogPosts: Map<number, BlogPost> = new Map();
  private rechargePackages: Map<number, RechargePackage> = new Map();
  private adminUsers: Map<number, AdminUser> = new Map();
  private siteSettings: Map<string, SiteSetting> = new Map();
  private visitorLogs: VisitorLog[] = [];
  private adsenseAds: Map<number, Adsense> = new Map();
  private coinRates: Map<string, CoinRate> = new Map();
  private commissionSettings: Map<string, CommissionSetting> = new Map();
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
        slug: "how-much-is-1000-tiktok-coins",
        excerpt: "Complete breakdown of TikTok coin values and conversion rates across different countries.",
        content: "TikTok coins are the virtual currency used within the TikTok app...",
        metaTitle: "How Much Is 1000 TikTok Coins Worth? | TokRecharge Calculator",
        metaDescription: "Learn the exact value of 1000 TikTok coins in different currencies and countries.",
        keywords: "tiktok coins value, 1000 tiktok coins, tiktok coin calculator",
        category: "guides",
        tags: ["tiktok", "coins", "calculator", "value"],
        coverImage: null,
        status: "published",
        scheduledAt: null,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "TikTok Recharge Prices: India vs USA",
        slug: "tiktok-recharge-prices-india-vs-usa",
        excerpt: "Compare TikTok coin prices across different countries and find the best deals.",
        content: "TikTok coin prices vary significantly between countries...",
        metaTitle: "TikTok Recharge Prices Comparison: India vs USA | Best Deals",
        metaDescription: "Compare TikTok coin recharge prices between India and USA to find the best deals.",
        keywords: "tiktok recharge price, tiktok coins india, tiktok coins usa",
        category: "comparison",
        tags: ["tiktok", "recharge", "india", "usa", "pricing"],
        coverImage: null,
        status: "published",
        scheduledAt: null,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: "Which TikTok Gifts Give the Most Cash?",
        slug: "best-value-tiktok-gifts-for-creators",
        excerpt: "Discover which TikTok gifts provide the best value for money for creators.",
        content: "When it comes to TikTok monetization, not all gifts are created equal...",
        metaTitle: "Best Value TikTok Gifts for Creators | Maximize Your Earnings",
        metaDescription: "Find out which TikTok gifts give creators the best return on investment.",
        keywords: "tiktok gifts value, tiktok monetization, tiktok creator earnings",
        category: "monetization",
        tags: ["tiktok", "gifts", "creators", "earnings", "monetization"],
        coverImage: null,
        status: "published",
        scheduledAt: null,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        title: "What Is Meant By Lorem Ipsum In Website?",
        slug: "what-is-meant-by-lorem-ipsum-in-website",
        excerpt: "What Is Meant By Lorem Ipsum In Website?",
        content: `<h2>What Is Meant By Lorem Ipsum In Website?</h2>

<p>The word lorem ipsum is derived from the Latin word which means "pain itself". It is a kind of a text filler tool that is used by the webmaster on the website.</p>

<p>Basically, this tool is used to create dummy content on the website when it's new.</p>

<h3>Why Lorem Ipsum Is Used?</h3>

<p>It helps the designer plan where the content will sit, it helps in creating drafts of the content on the pages of the website. It originates from the Latin text but is seen as gibberish.</p>

<p>Sometimes, the reader gets distracted while creating or working on the website. That's why this language is important.</p>

<p>This tool makes the work easier for the webmaster.</p>

<h3>How Lorem Ipsum Can Be Used?</h3>

<p>When using lorem ipsum for creating dummy content for your newly created website, you can select the text formats you want from the tool. Like, words, sentences, or paragraphs.</p>`,
        metaTitle: "How Can I Use Lorem Ipsum Tool For My Website?",
        metaDescription: "How Can I Use Lorem Ipsum Tool For My Website?sqdsqsqhy bxc wgrh tf xxxv birthshtrt bcv h et",
        keywords: "",
        category: "tutorials",
        tags: ["lorem", "ipsum", "website", "content"],
        coverImage: null,
        status: "published",
        scheduledAt: null,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
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

    // Initialize admin users (default admin)
    const adminUsersData = [
      {
        id: 1,
        username: "admin",
        email: "admin@tokrecharge.com",
        passwordHash: "$2b$10$IDDB9.Zv3SgXfm97e6C8yOmHNzIOcbnHd0eq1DW8D84Cwf3X4wL9q", // password: secret
        role: "super_admin",
        isActive: true,
        lastLogin: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    adminUsersData.forEach(user => this.adminUsers.set(user.id, user));

    // Initialize site settings
    const siteSettingsData = [
      { key: "title", value: "TokRecharge.com - TikTok Coin Calculator & Tools", type: "text", description: "Website title" },
      { key: "metaTitle", value: "TikTok Coin Calculator & Recharge Tools | TokRecharge.com", type: "text", description: "Meta title for SEO" },
      { key: "metaDescription", value: "Calculate TikTok coin values, compare recharge prices, estimate creator earnings, and explore gift values with our comprehensive TikTok monetization toolkit.", type: "text", description: "Meta description for SEO" },
      { key: "logo", value: "/assets/logo.svg", type: "image", description: "Website logo" },
      { key: "favicon", value: "/assets/favicon.ico", type: "image", description: "Website favicon" },
      { key: "googleAnalytics", value: "", type: "text", description: "Google Analytics tracking code" },
      { key: "googleTagManager", value: "", type: "text", description: "Google Tag Manager container ID" },
      { key: "googleAdsense", value: "", type: "text", description: "Google AdSense verification or auto ads code" },
      { key: "googleSearchConsole", value: "", type: "text", description: "Google Search Console verification" },
      { key: "facebookPixel", value: "", type: "text", description: "Facebook Pixel code" },
      { key: "verificationMeta", value: "", type: "text", description: "Verification meta tags" },
    ];

    siteSettingsData.forEach(setting => {
      const siteSettingData = { 
        id: this.currentId++, 
        ...setting, 
        updatedAt: new Date() 
      };
      this.siteSettings.set(setting.key, siteSettingData);
    });

    // Initialize coin rates
    const coinRatesData = [
      { id: 1, currency: "USD", rate: "0.015000", symbol: "$", isActive: true, updatedAt: new Date() },
      { id: 2, currency: "EUR", rate: "0.014000", symbol: "€", isActive: true, updatedAt: new Date() },
      { id: 3, currency: "INR", rate: "1.250000", symbol: "₹", isActive: true, updatedAt: new Date() },
      { id: 4, currency: "PKR", rate: "4.200000", symbol: "Rs", isActive: true, updatedAt: new Date() },
      { id: 5, currency: "GBP", rate: "0.012000", symbol: "£", isActive: true, updatedAt: new Date() },
    ];

    coinRatesData.forEach(rate => this.coinRates.set(rate.currency, rate));

    // Initialize commission settings
    const commissionSettingsData = [
      { id: 1, platform: "tiktok", commissionPercent: "50.00", minimumWithdraw: "10.00", currency: "USD", isActive: true, updatedAt: new Date() },
    ];

    commissionSettingsData.forEach(setting => this.commissionSettings.set(setting.platform, setting));

    this.currentId = 200;
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

  async updateTool(id: number, updates: Partial<InsertTool>): Promise<Tool | undefined> {
    const tool = this.tools.get(id);
    if (!tool) return undefined;
    const updatedTool = { ...tool, ...updates };
    this.tools.set(id, updatedTool);
    return updatedTool;
  }

  async deleteTool(id: number): Promise<boolean> {
    return this.tools.delete(id);
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

  async updateCountry(id: number, updates: Partial<InsertCountry>): Promise<Country | undefined> {
    const country = this.countries.get(id);
    if (!country) return undefined;
    const updatedCountry = { ...country, ...updates };
    this.countries.set(id, updatedCountry);
    return updatedCountry;
  }

  async deleteCountry(id: number): Promise<boolean> {
    return this.countries.delete(id);
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

  async updateGift(id: number, updates: Partial<InsertGift>): Promise<Gift | undefined> {
    const gift = this.gifts.get(id);
    if (!gift) return undefined;
    const updatedGift = { ...gift, ...updates };
    this.gifts.set(id, updatedGift);
    return updatedGift;
  }

  async deleteGift(id: number): Promise<boolean> {
    return this.gifts.delete(id);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentId++;
    const now = new Date();
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id, 
      publishedAt: insertBlogPost.status === 'published' ? now : null,
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: number, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const blogPost = this.blogPosts.get(id);
    if (!blogPost) return undefined;
    const now = new Date();
    const updatedBlogPost = { 
      ...blogPost, 
      ...updates, 
      updatedAt: now,
      publishedAt: updates.status === 'published' && !blogPost.publishedAt ? now : blogPost.publishedAt
    };
    this.blogPosts.set(id, updatedBlogPost);
    return updatedBlogPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.status === 'published');
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

  async updateRechargePackage(id: number, updates: Partial<InsertRechargePackage>): Promise<RechargePackage | undefined> {
    const rechargePackage = this.rechargePackages.get(id);
    if (!rechargePackage) return undefined;
    const updatedPackage = { ...rechargePackage, ...updates };
    this.rechargePackages.set(id, updatedPackage);
    return updatedPackage;
  }

  async deleteRechargePackage(id: number): Promise<boolean> {
    return this.rechargePackages.delete(id);
  }

  // Admin Users
  async getAdminUsers(): Promise<AdminUser[]> {
    return Array.from(this.adminUsers.values());
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(user => user.username === username);
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(user => user.email === email);
  }

  async createAdminUser(insertAdminUser: InsertAdminUser): Promise<AdminUser> {
    const id = this.currentId++;
    const now = new Date();
    const adminUser: AdminUser = { 
      ...insertAdminUser, 
      id, 
      lastLogin: null,
      createdAt: now,
      updatedAt: now
    };
    this.adminUsers.set(id, adminUser);
    return adminUser;
  }

  async updateAdminUser(id: number, updates: Partial<InsertAdminUser>): Promise<AdminUser | undefined> {
    const adminUser = this.adminUsers.get(id);
    if (!adminUser) return undefined;
    const updatedUser = { ...adminUser, ...updates, updatedAt: new Date() };
    this.adminUsers.set(id, updatedUser);
    return updatedUser;
  }

  async updateAdminUserLastLogin(id: number): Promise<void> {
    const adminUser = this.adminUsers.get(id);
    if (adminUser) {
      adminUser.lastLogin = new Date();
      this.adminUsers.set(id, adminUser);
    }
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSetting[]> {
    return Array.from(this.siteSettings.values());
  }

  async getSiteSettingByKey(key: string): Promise<SiteSetting | undefined> {
    return this.siteSettings.get(key);
  }

  async setSiteSetting(insertSetting: InsertSiteSetting): Promise<SiteSetting> {
    const existing = this.siteSettings.get(insertSetting.key);
    const id = existing?.id || this.currentId++;
    const setting: SiteSetting = { 
      ...insertSetting, 
      id, 
      updatedAt: new Date() 
    };
    this.siteSettings.set(insertSetting.key, setting);
    return setting;
  }

  async updateSiteSetting(key: string, value: string): Promise<SiteSetting | undefined> {
    const setting = this.siteSettings.get(key);
    if (!setting) return undefined;
    const updatedSetting = { ...setting, value, updatedAt: new Date() };
    this.siteSettings.set(key, updatedSetting);
    return updatedSetting;
  }

  // Visitor Logs
  async getVisitorLogs(limit?: number): Promise<VisitorLog[]> {
    const logs = [...this.visitorLogs].sort((a, b) => 
      new Date(b.visitedAt!).getTime() - new Date(a.visitedAt!).getTime()
    );
    return limit ? logs.slice(0, limit) : logs;
  }

  async createVisitorLog(insertLog: InsertVisitorLog): Promise<VisitorLog> {
    const id = this.currentId++;
    const visitorLog: VisitorLog = { 
      ...insertLog, 
      id, 
      visitedAt: new Date() 
    };
    this.visitorLogs.push(visitorLog);
    return visitorLog;
  }

  async getVisitorStatsByCountry(): Promise<{ country: string; count: number }[]> {
    const countryStats = new Map<string, number>();
    this.visitorLogs.forEach(log => {
      if (log.country) {
        countryStats.set(log.country, (countryStats.get(log.country) || 0) + 1);
      }
    });
    return Array.from(countryStats.entries()).map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);
  }

  async getVisitorStatsByPage(): Promise<{ page: string; count: number }[]> {
    const pageStats = new Map<string, number>();
    this.visitorLogs.forEach(log => {
      pageStats.set(log.page, (pageStats.get(log.page) || 0) + 1);
    });
    return Array.from(pageStats.entries()).map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);
  }

  async getDailyVisitorCount(): Promise<{ date: string; count: number }[]> {
    const dailyStats = new Map<string, number>();
    this.visitorLogs.forEach(log => {
      const date = new Date(log.visitedAt!).toISOString().split('T')[0];
      dailyStats.set(date, (dailyStats.get(date) || 0) + 1);
    });
    return Array.from(dailyStats.entries()).map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // AdSense
  async getAdsenseAds(): Promise<Adsense[]> {
    return Array.from(this.adsenseAds.values());
  }

  async getAdsenseAdsByLocation(location: string): Promise<Adsense[]> {
    return Array.from(this.adsenseAds.values()).filter(ad => ad.location === location && ad.isActive);
  }

  async createAdsenseAd(insertAd: InsertAdsense): Promise<Adsense> {
    const id = this.currentId++;
    const now = new Date();
    const ad: Adsense = { 
      ...insertAd, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.adsenseAds.set(id, ad);
    return ad;
  }

  async updateAdsenseAd(id: number, updates: Partial<InsertAdsense>): Promise<Adsense | undefined> {
    const ad = this.adsenseAds.get(id);
    if (!ad) return undefined;
    const updatedAd = { ...ad, ...updates, updatedAt: new Date() };
    this.adsenseAds.set(id, updatedAd);
    return updatedAd;
  }

  async deleteAdsenseAd(id: number): Promise<boolean> {
    return this.adsenseAds.delete(id);
  }

  // Coin Rates
  async getCoinRates(): Promise<CoinRate[]> {
    return Array.from(this.coinRates.values());
  }

  async getCoinRateByCurrency(currency: string): Promise<CoinRate | undefined> {
    return this.coinRates.get(currency);
  }

  async setCoinRate(insertRate: InsertCoinRate): Promise<CoinRate> {
    const existing = this.coinRates.get(insertRate.currency);
    const id = existing?.id || this.currentId++;
    const coinRate: CoinRate = { 
      ...insertRate, 
      id, 
      updatedAt: new Date() 
    };
    this.coinRates.set(insertRate.currency, coinRate);
    return coinRate;
  }

  async updateCoinRate(currency: string, rate: string): Promise<CoinRate | undefined> {
    const coinRate = this.coinRates.get(currency);
    if (!coinRate) return undefined;
    const updatedRate = { ...coinRate, rate, updatedAt: new Date() };
    this.coinRates.set(currency, updatedRate);
    return updatedRate;
  }

  // Commission Settings
  async getCommissionSettings(): Promise<CommissionSetting[]> {
    return Array.from(this.commissionSettings.values());
  }

  async getCommissionSettingByPlatform(platform: string): Promise<CommissionSetting | undefined> {
    return this.commissionSettings.get(platform);
  }

  async setCommissionSetting(insertSetting: InsertCommissionSetting): Promise<CommissionSetting> {
    const existing = this.commissionSettings.get(insertSetting.platform);
    const id = existing?.id || this.currentId++;
    const setting: CommissionSetting = { 
      ...insertSetting, 
      id, 
      updatedAt: new Date() 
    };
    this.commissionSettings.set(insertSetting.platform, setting);
    return setting;
  }

  async updateCommissionSetting(platform: string, updates: Partial<InsertCommissionSetting>): Promise<CommissionSetting | undefined> {
    const setting = this.commissionSettings.get(platform);
    if (!setting) return undefined;
    const updatedSetting = { ...setting, ...updates, updatedAt: new Date() };
    this.commissionSettings.set(platform, updatedSetting);
    return updatedSetting;
  }
}

export const storage = new MemStorage();
