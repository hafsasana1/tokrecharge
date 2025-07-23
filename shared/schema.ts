import { pgTable, text, serial, integer, decimal, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  category: text("category").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  currency: text("currency").notNull(),
  coinRate: decimal("coin_rate", { precision: 10, scale: 6 }).notNull(),
  flag: text("flag").notNull(),
  isActive: boolean("is_active").default(true),
});

export const gifts = pgTable("gifts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  coinCost: integer("coin_cost").notNull(),
  diamondValue: integer("diamond_value").notNull(),
  category: text("category").notNull(),
  rarity: text("rarity").notNull(),
  isActive: boolean("is_active").default(true),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  keywords: text("keywords"),
  canonicalUrl: text("canonical_url"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),
  category: text("category").default("general"),
  tags: text("tags").array(),
  coverImage: text("cover_image"),
  status: text("status").default("draft"), // draft, published, scheduled
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rechargePackages = pgTable("recharge_packages", {
  id: serial("id").primaryKey(),
  countryId: integer("country_id").references(() => countries.id),
  coins: integer("coins").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull(),
  isActive: boolean("is_active").default(true),
});

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("admin"), // admin, super_admin
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Site settings table
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  type: text("type").default("text"), // text, image, json, boolean
  description: text("description"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced visitor tracking table
export const visitorLogs = pgTable("visitor_logs", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  country: text("country"),
  city: text("city"),
  region: text("region"),
  timezone: text("timezone"),
  userAgent: text("user_agent"),
  browser: text("browser"),
  os: text("os"),
  device: text("device"), // mobile, desktop, tablet
  referer: text("referer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  page: text("page").notNull(),
  pageTitle: text("page_title"),
  timeOnPage: integer("time_on_page"), // seconds
  isUnique: boolean("is_unique").default(true),
  visitedAt: timestamp("visited_at").defaultNow(),
});

// Page views tracking
export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  page: text("page").notNull(),
  pageTitle: text("page_title"),
  referer: text("referer"),
  timeOnPage: integer("time_on_page"), // seconds
  scrollDepth: integer("scroll_depth"), // percentage
  country: text("country"),
  device: text("device"),
  browser: text("browser"),
  viewedAt: timestamp("viewed_at").defaultNow(),
});

// Real-time active users
export const activeUsers = pgTable("active_users", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull().unique(),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  country: text("country"),
  city: text("city"),
  page: text("page").notNull(),
  userAgent: text("user_agent"),
  browser: text("browser"),
  device: text("device"),
  lastSeen: timestamp("last_seen").defaultNow(),
  firstSeen: timestamp("first_seen").defaultNow(),
});

// Traffic sources tracking
export const trafficSources = pgTable("traffic_sources", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }),
  source: text("source").notNull(), // direct, google, facebook, twitter, etc
  medium: text("medium"), // organic, referral, cpc, email, etc
  campaign: text("campaign"),
  term: text("term"),
  content: text("content"),
  referer: text("referer"),
  landingPage: text("landing_page").notNull(),
  country: text("country"),
  sessions: integer("sessions").default(1),
  pageViews: integer("page_views").default(1),
  bounceRate: decimal("bounce_rate", { precision: 5, scale: 2 }),
  avgSessionDuration: integer("avg_session_duration"), // seconds
  createdAt: timestamp("created_at").defaultNow(),
});

// Daily analytics summary
export const dailyAnalytics = pgTable("daily_analytics", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  totalVisitors: integer("total_visitors").default(0),
  uniqueVisitors: integer("unique_visitors").default(0),
  pageViews: integer("page_views").default(0),
  sessions: integer("sessions").default(0),
  bounceRate: decimal("bounce_rate", { precision: 5, scale: 2 }),
  avgSessionDuration: integer("avg_session_duration"), // seconds
  topCountries: json("top_countries"), // {country: count}
  topPages: json("top_pages"), // {page: views}
  topSources: json("top_sources"), // {source: sessions}
  deviceBreakdown: json("device_breakdown"), // {device: count}
  browserBreakdown: json("browser_breakdown"), // {browser: count}
  createdAt: timestamp("created_at").defaultNow(),
});

// AdSense ads table
export const adsense = pgTable("adsense", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  adCode: text("ad_code").notNull(),
  location: text("location").notNull(), // header, sidebar, footer, inside-tool
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Coin rates table for dynamic management
export const coinRates = pgTable("coin_rates", {
  id: serial("id").primaryKey(),
  currency: text("currency").notNull().unique(), // USD, EUR, INR, etc.
  rate: decimal("rate", { precision: 10, scale: 6 }).notNull(), // 1 coin = rate in currency
  symbol: text("symbol").notNull(), // $, €, ₹, etc.
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Commission settings
export const commissionSettings = pgTable("commission_settings", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull().unique(), // tiktok, youtube, etc.
  commissionPercent: decimal("commission_percent", { precision: 5, scale: 2 }).notNull(),
  minimumWithdraw: decimal("minimum_withdraw", { precision: 10, scale: 2 }),
  currency: text("currency").notNull(),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertToolSchema = createInsertSchema(tools).omit({
  id: true,
  createdAt: true,
});

export const insertCountrySchema = createInsertSchema(countries).omit({
  id: true,
});

export const insertGiftSchema = createInsertSchema(gifts).omit({
  id: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRechargePackageSchema = createInsertSchema(rechargePackages).omit({
  id: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
});

export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({
  id: true,
  updatedAt: true,
});

export const insertVisitorLogSchema = createInsertSchema(visitorLogs).omit({
  id: true,
  visitedAt: true,
});

export const insertPageViewSchema = createInsertSchema(pageViews).omit({
  id: true,
  viewedAt: true,
});

export const insertActiveUserSchema = createInsertSchema(activeUsers).omit({
  id: true,
  lastSeen: true,
  firstSeen: true,
});

export const insertTrafficSourceSchema = createInsertSchema(trafficSources).omit({
  id: true,
  createdAt: true,
});

export const insertDailyAnalyticsSchema = createInsertSchema(dailyAnalytics).omit({
  id: true,
  createdAt: true,
});

export const insertAdsenseSchema = createInsertSchema(adsense).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCoinRateSchema = createInsertSchema(coinRates).omit({
  id: true,
  updatedAt: true,
});

export const insertCommissionSettingSchema = createInsertSchema(commissionSettings).omit({
  id: true,
  updatedAt: true,
});

// Login schema
export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

// Update blog post schema
export const updateBlogPostSchema = insertBlogPostSchema.partial();

// Site settings response schema
export const siteSettingsResponseSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  googleAnalytics: z.string().optional(),
  googleTagManager: z.string().optional(),
  googleSearchConsole: z.string().optional(),
  googleAdsense: z.string().optional(),
  facebookPixel: z.string().optional(),
  verificationMeta: z.string().optional(),
});

export type Tool = typeof tools.$inferSelect;
export type InsertTool = z.infer<typeof insertToolSchema>;
export type Country = typeof countries.$inferSelect;
export type InsertCountry = z.infer<typeof insertCountrySchema>;
export type Gift = typeof gifts.$inferSelect;
export type InsertGift = z.infer<typeof insertGiftSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type RechargePackage = typeof rechargePackages.$inferSelect;
export type InsertRechargePackage = z.infer<typeof insertRechargePackageSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
export type VisitorLog = typeof visitorLogs.$inferSelect;
export type InsertVisitorLog = z.infer<typeof insertVisitorLogSchema>;
export type Adsense = typeof adsense.$inferSelect;
export type InsertAdsense = z.infer<typeof insertAdsenseSchema>;
export type CoinRate = typeof coinRates.$inferSelect;
export type InsertCoinRate = z.infer<typeof insertCoinRateSchema>;
export type CommissionSetting = typeof commissionSettings.$inferSelect;
export type InsertCommissionSetting = z.infer<typeof insertCommissionSettingSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SiteSettingsResponse = z.infer<typeof siteSettingsResponseSchema>;

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = z.infer<typeof insertPageViewSchema>;

export type ActiveUser = typeof activeUsers.$inferSelect;
export type InsertActiveUser = z.infer<typeof insertActiveUserSchema>;

export type TrafficSource = typeof trafficSources.$inferSelect;
export type InsertTrafficSource = z.infer<typeof insertTrafficSourceSchema>;

export type DailyAnalytics = typeof dailyAnalytics.$inferSelect;
export type InsertDailyAnalytics = z.infer<typeof insertDailyAnalyticsSchema>;
