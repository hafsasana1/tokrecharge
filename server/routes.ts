import type { Express } from "express";
import { createServer, type Server } from "http";
import { Request, Response } from "express";
import { storage } from "./storage";
import { AuthService, requireAuth, requireSuperAdmin, type AuthRequest } from "./auth";
import { apiLimiter, authLimiter, sanitizeInput } from "./middleware";
import multer from "multer";
import { 
  insertBlogPostSchema, insertToolSchema, insertCountrySchema, insertGiftSchema, insertRechargePackageSchema,
  insertAdminUserSchema, insertSiteSettingSchema, insertAdsenseSchema, insertCoinRateSchema, 
  insertCommissionSettingSchema, loginSchema, updateBlogPostSchema, siteSettingsResponseSchema
} from "@shared/schema";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply middleware
  app.use('/api', apiLimiter);
  app.use(sanitizeInput);

  // =============================================================================
  // PUBLIC API ENDPOINTS
  // =============================================================================

  // Site settings for frontend injection
  app.get("/api/site-settings", async (req: Request, res: Response) => {
    try {
      const settings = await storage.getSiteSettings();
      const settingsObj: Record<string, string> = {};
      
      settings.forEach(setting => {
        settingsObj[setting.key] = setting.value || '';
      });

      const result = siteSettingsResponseSchema.safeParse({
        title: settingsObj.title || 'TokRecharge.com',
        metaTitle: settingsObj.metaTitle || 'TikTok Coin Calculator & Tools',
        metaDescription: settingsObj.metaDescription || 'Calculate TikTok coin values and more',
        logo: settingsObj.logo,
        favicon: settingsObj.favicon,
        googleAnalytics: settingsObj.googleAnalytics,
        googleTagManager: settingsObj.googleTagManager,
        googleSearchConsole: settingsObj.googleSearchConsole,
        googleAdsense: settingsObj.googleAdsense,
        facebookPixel: settingsObj.facebookPixel,
        verificationMeta: settingsObj.verificationMeta,
      });

      res.json(result.success ? result.data : settingsObj);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch site settings" });
    }
  });

  // Tools endpoints
  app.get("/api/tools", async (req: Request, res: Response) => {
    try {
      const tools = await storage.getTools();
      res.json(tools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  });

  app.get("/api/tools/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const tool = await storage.getToolBySlug(slug);
      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }
      res.json(tool);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tool" });
    }
  });

  // Countries endpoints
  app.get("/api/countries", async (req: Request, res: Response) => {
    try {
      const countries = await storage.getCountries();
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  app.get("/api/countries/:code", async (req: Request, res: Response) => {
    try {
      const { code } = req.params;
      const country = await storage.getCountryByCode(code.toUpperCase());
      if (!country) {
        return res.status(404).json({ error: "Country not found" });
      }
      res.json(country);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch country" });
    }
  });

  // Gifts endpoints
  app.get("/api/gifts", async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const gifts = category 
        ? await storage.getGiftsByCategory(category as string)
        : await storage.getGifts();
      res.json(gifts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gifts" });
    }
  });

  // Blog posts endpoints (public - only published)
  app.get("/api/blog", async (req: Request, res: Response) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      if (!post || post.status !== 'published') {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Recharge packages endpoints
  app.get("/api/recharge-packages", async (req: Request, res: Response) => {
    try {
      const { countryId } = req.query;
      const packages = countryId 
        ? await storage.getRechargePackagesByCountry(parseInt(countryId as string))
        : await storage.getRechargePackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recharge packages" });
    }
  });

  // Coin rates endpoints
  app.get("/api/coin-rates", async (req: Request, res: Response) => {
    try {
      const { currency } = req.query;
      const rates = currency 
        ? await storage.getCoinRateByCurrency(currency as string)
        : await storage.getCoinRates();
      res.json(rates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch coin rates" });
    }
  });

  // Commission settings endpoints
  app.get("/api/commission/:platform", async (req: Request, res: Response) => {
    try {
      const { platform } = req.params;
      const setting = await storage.getCommissionSettingByPlatform(platform);
      if (!setting) {
        return res.status(404).json({ error: "Commission setting not found" });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch commission setting" });
    }
  });

  // AdSense ads by location (legacy endpoint)
  app.get("/api/ads/:location", async (req: Request, res: Response) => {
    try {
      const { location } = req.params;
      const ads = await storage.getAdsenseAdsByLocation(location);
      res.json(ads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ads" });
    }
  });

  // Public endpoint for active ads (no authentication required)
  app.get("/api/adsense/active", async (req: Request, res: Response) => {
    try {
      const ads = await storage.getAdsenseAds();
      // Only return active ads for public consumption
      const activeAds = ads.filter(ad => ad.isActive);
      res.json(activeAds);
    } catch (error) {
      console.error("Failed to fetch active ads:", error);
      res.json([]); // Return empty array instead of error to prevent frontend crashes
    }
  });

  // Public analytics tracking endpoint
  app.post("/api/track/visit", async (req: Request, res: Response) => {
    try {
      const { page, title, referer, sessionId } = req.body;
      const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
      const userAgent = req.headers['user-agent'] || '';
      
      // Create visitor log
      await storage.createVisitorLog({
        sessionId,
        ipAddress,
        page,
        pageTitle: title,
        referer,
        userAgent,
        country: null, // Will be populated by geo-IP lookup in production
        city: null,
        device: userAgent.includes('Mobile') ? 'mobile' : 'desktop',
        browser: userAgent.includes('Chrome') ? 'Chrome' : 'Other',
        isUnique: true
      });

      // Create page view
      await storage.createPageView({
        sessionId,
        ipAddress,
        page,
        pageTitle: title,
        referer,
        country: null,
        device: userAgent.includes('Mobile') ? 'mobile' : 'desktop',
        browser: userAgent.includes('Chrome') ? 'Chrome' : 'Other'
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Failed to track visit:', error);
      res.status(500).json({ error: 'Failed to track visit' });
    }
  });

  // Public real-time users endpoint
  app.post("/api/track/active", async (req: Request, res: Response) => {
    try {
      const { page, sessionId } = req.body;
      const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
      const userAgent = req.headers['user-agent'] || '';
      
      await storage.upsertActiveUser({
        sessionId,
        ipAddress,
        page,
        userAgent,
        country: null,
        city: null,
        device: userAgent.includes('Mobile') ? 'mobile' : 'desktop',
        browser: userAgent.includes('Chrome') ? 'Chrome' : 'Other'
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Failed to track active user:', error);
      res.status(500).json({ error: 'Failed to track active user' });
    }
  });

  // Sitemap.xml endpoint
  app.get("/sitemap.xml", async (req: Request, res: Response) => {
    try {
      const baseUrl = req.protocol + '://' + req.get('host');
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Get dynamic data
      const [tools, countries, blogPosts] = await Promise.all([
        storage.getTools(),
        storage.getCountries(),
        storage.getBlogPosts()
      ]);

      // Static pages
      const staticPages = [
        { url: '', priority: '1.0', changefreq: 'daily' },
        { url: '/about', priority: '0.8', changefreq: 'monthly' },
        { url: '/contact', priority: '0.8', changefreq: 'monthly' },
        { url: '/privacy', priority: '0.6', changefreq: 'yearly' },
        { url: '/terms', priority: '0.6', changefreq: 'yearly' },
        { url: '/trends', priority: '0.9', changefreq: 'weekly' },
        { url: '/country-pricing', priority: '0.9', changefreq: 'weekly' },
        { url: '/blog', priority: '0.9', changefreq: 'daily' }
      ];

      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      // Add static pages
      staticPages.forEach(page => {
        sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      });

      // Add tool pages
      tools.forEach(tool => {
        sitemap += `
  <url>
    <loc>${baseUrl}/${tool.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
      });

      // Add country pages
      countries.forEach(country => {
        const countrySlug = `coins-in-${country.name.toLowerCase().replace(/\s+/g, '-')}`;
        sitemap += `
  <url>
    <loc>${baseUrl}/${countrySlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });

      // Add blog posts
      blogPosts.filter(post => post.status === 'published').forEach(post => {
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt?.toISOString().split('T')[0] || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });

      sitemap += `
</urlset>`;

      res.set('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Failed to generate sitemap:', error);
      res.status(500).send('Failed to generate sitemap');
    }
  });

  // =============================================================================
  // AUTHENTICATION ENDPOINTS
  // =============================================================================

  app.post("/api/auth/login", authLimiter, async (req: Request, res: Response) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid input", details: result.error.errors });
      }

      const { username, password } = result.data;
      const authResult = await AuthService.login(username, password);
      
      res.json(authResult);
    } catch (error: any) {
      res.status(401).json({ error: error.message || "Login failed" });
    }
  });

  app.post("/api/auth/verify", requireAuth, async (req: AuthRequest, res: Response) => {
    res.json({ user: req.user });
  });

  // =============================================================================
  // ADMIN ENDPOINTS (Protected)
  // =============================================================================

  // Enhanced dashboard stats with comprehensive analytics
  app.get("/api/admin/dashboard", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const [
        totalTools,
        totalCountries,
        totalBlogPosts,
        analyticsData,
        activeUsersCount,
        popularPages,
        topTrafficSources
      ] = await Promise.all([
        storage.getTools().then(tools => tools.length),
        storage.getCountries().then(countries => countries.length),
        storage.getBlogPosts().then(posts => posts.length),
        storage.getAnalyticsSummary(30),
        storage.getActiveUsersCount(),
        storage.getPopularPages(5),
        storage.getTopTrafficSources(5)
      ]);

      res.json({
        stats: {
          totalTools,
          totalCountries,
          totalBlogPosts,
          totalVisitors: analyticsData.totalVisitors,
          uniqueVisitors: analyticsData.uniqueVisitors,
          pageViews: analyticsData.pageViews,
          activeUsers: activeUsersCount,
          growth: analyticsData.growth
        },
        analytics: {
          topCountries: analyticsData.topCountries,
          topPages: popularPages,
          topSources: topTrafficSources,
          bounceRate: analyticsData.bounceRate,
          avgSessionDuration: analyticsData.avgSessionDuration
        },
        charts: {
          performance: [
            { name: 'Page Views', value: analyticsData.pageViews, color: '#FF1744' },
            { name: 'Unique Visitors', value: analyticsData.uniqueVisitors, color: '#9C27B0' },
            { name: 'Total Visitors', value: analyticsData.totalVisitors, color: '#3F51B5' }
          ]
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  });

  // Admin user management
  app.get("/api/admin/users", requireAuth, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const users = await storage.getAdminUsers();
      // Remove password hashes from response
      const safeUsers = users.map(user => {
        const { passwordHash, ...safeUser } = user;
        return safeUser;
      });
      res.json(safeUsers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", requireAuth, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const result = insertAdminUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid input", details: result.error.errors });
      }

      const hashedPassword = await AuthService.hashPassword(result.data.passwordHash);
      const user = await storage.createAdminUser({
        ...result.data,
        passwordHash: hashedPassword
      });

      const { passwordHash, ...safeUser } = user;
      res.status(201).json(safeUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // Site settings management
  app.get("/api/admin/settings", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.put("/api/admin/settings/:key", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      
      if (!value && value !== '') {
        return res.status(400).json({ error: "Value is required" });
      }

      const setting = await storage.updateSiteSetting(key, value);
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }

      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to update setting" });
    }
  });

  // Comprehensive Analytics endpoints
  app.get("/api/admin/analytics/visitors", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const visitors = await storage.getVisitorLogs(limit);
      res.json(visitors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch visitor data" });
    }
  });

  app.get("/api/admin/analytics/overview", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 30;
      const summary = await storage.getAnalyticsSummary(days);
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics overview" });
    }
  });

  app.get("/api/admin/analytics/active-users", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const [activeUsers, count] = await Promise.all([
        storage.getActiveUsers(),
        storage.getActiveUsersCount()
      ]);
      res.json({
        activeUsers,
        count,
        updated: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active users" });
    }
  });

  app.get("/api/admin/analytics/page-views", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      
      let pageViews;
      if (startDate && endDate) {
        pageViews = await storage.getPageViewsByDateRange(startDate, endDate);
      } else {
        pageViews = await storage.getPageViews(limit);
      }
      
      res.json(pageViews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page views" });
    }
  });

  app.get("/api/admin/analytics/popular-pages", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const popularPages = await storage.getPopularPages(limit);
      res.json(popularPages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch popular pages" });
    }
  });

  app.get("/api/admin/analytics/traffic-sources", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const [allSources, topSources] = await Promise.all([
        storage.getTrafficSources(limit),
        storage.getTopTrafficSources(limit)
      ]);
      res.json({
        sources: allSources,
        topSources
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch traffic sources" });
    }
  });

  app.get("/api/admin/analytics/countries", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const stats = await storage.getVisitorStatsByCountry();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch country stats" });
    }
  });

  app.get("/api/admin/analytics/pages", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const stats = await storage.getVisitorStatsByPage();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page stats" });
    }
  });

  app.get("/api/admin/analytics/daily", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 30;
      const [dailyVisitors, dailyAnalytics] = await Promise.all([
        storage.getDailyVisitorCount(),
        storage.getDailyAnalytics(limit)
      ]);
      res.json({
        dailyVisitors: dailyVisitors.slice(-limit),
        dailyAnalytics
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch daily analytics" });
    }
  });

  // Blog management (admin - all posts)
  app.get("/api/admin/blog", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/admin/blog/:id", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPostById(id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/admin/blog", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid input", details: result.error.errors });
      }

      const post = await storage.createBlogPost(result.data);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.put("/api/admin/blog/:id", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = updateBlogPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid input", details: result.error.errors });
      }

      const post = await storage.updateBlogPost(id, result.data);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog/:id", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlogPost(id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // AdSense management
  app.get("/api/admin/adsense", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const ads = await storage.getAdsenseAds();
      res.json(ads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ads" });
    }
  });

  app.post("/api/admin/adsense", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const result = insertAdsenseSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid input", details: result.error.errors });
      }

      const ad = await storage.createAdsenseAd(result.data);
      res.status(201).json(ad);
    } catch (error) {
      res.status(500).json({ error: "Failed to create ad" });
    }
  });

  app.put("/api/admin/adsense/:id", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const ad = await storage.updateAdsenseAd(id, req.body);
      if (!ad) {
        return res.status(404).json({ error: "Ad not found" });
      }
      res.json(ad);
    } catch (error) {
      res.status(500).json({ error: "Failed to update ad" });
    }
  });

  app.delete("/api/admin/adsense/:id", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAdsenseAd(id);
      if (!success) {
        return res.status(404).json({ error: "Ad not found" });
      }
      res.json({ message: "Ad deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete ad" });
    }
  });

  // Tools management
  app.post("/api/admin/tools", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const result = insertToolSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid input", details: result.error.errors });
      }

      const tool = await storage.createTool(result.data);
      res.status(201).json(tool);
    } catch (error) {
      res.status(500).json({ error: "Failed to create tool" });
    }
  });

  app.put("/api/admin/tools/:id", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const tool = await storage.updateTool(id, req.body);
      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }
      res.json(tool);
    } catch (error) {
      res.status(500).json({ error: "Failed to update tool" });
    }
  });

  app.delete("/api/admin/tools/:id", requireAuth, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTool(id);
      if (!success) {
        return res.status(404).json({ error: "Tool not found" });
      }
      res.json({ message: "Tool deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tool" });
    }
  });

  // File upload endpoint
  app.post("/api/admin/upload", requireAuth, upload.single('file') as any, async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // In a real app, you'd save to cloud storage (AWS S3, Cloudinary, etc.)
      // For now, we'll just return a mock URL
      const filename = `${Date.now()}-${req.file.originalname}`;
      const url = `/uploads/${filename}`;

      res.json({ url, filename });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}