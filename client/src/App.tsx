import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import TrendsPage from "@/pages/TrendsPage";
import CoinCalculatorPage from "@/pages/CoinCalculatorPage";
import GiftValuePage from "@/pages/GiftValuePage";
import EarningsEstimatorPage from "@/pages/EarningsEstimatorPage";
import RechargePricesPage from "@/pages/RechargePricesPage";
import CoinToDiamondPage from "@/pages/CoinToDiamondPage";
import WithdrawValuePage from "@/pages/WithdrawValuePage";
import CountryPricingPage from "@/pages/CountryPricingPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminBlogPage from "@/pages/AdminBlogPage";
import AdminBlogNewPage from "@/pages/AdminBlogNewPage";
import AdminBlogEditPage from "@/pages/AdminBlogEditPage";
import AdminSettingsPage from "@/pages/AdminSettingsPage";
import EnhancedAdminAnalyticsPage from "@/pages/EnhancedAdminAnalyticsPage";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import AdminAdsPage from "@/pages/AdminAdsPage";
import AdminToolsPage from "@/pages/AdminToolsPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import ToolsPage from "@/pages/ToolsPage";
import CountriesPage from "@/pages/CountriesPage";
import GiftSimulatorPage from "@/pages/GiftSimulatorPage";
import GiftRankingPage from "@/pages/GiftRankingPage";
import GifterEstimatorPage from "@/pages/GifterEstimatorPage";
import CoinOfferAlertsPage from "@/pages/CoinOfferAlertsPage";

function Router() {
  console.log('Router component loaded');
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tools" component={ToolsPage} />
      <Route path="/countries" component={CountriesPage} />
      <Route path="/coin-calculator" component={CoinCalculatorPage} />
      <Route path="/gift-value" component={GiftValuePage} />
      <Route path="/earnings-estimator" component={EarningsEstimatorPage} />
      <Route path="/recharge-prices" component={RechargePricesPage} />
      <Route path="/coin-to-diamond" component={CoinToDiamondPage} />
      <Route path="/withdraw-value" component={WithdrawValuePage} />
      <Route path="/gift-simulator" component={GiftSimulatorPage} />
      <Route path="/gift-ranking" component={GiftRankingPage} />
      <Route path="/gifter-estimator" component={GifterEstimatorPage} />
      <Route path="/coin-offer-alerts" component={CoinOfferAlertsPage} />
      <Route path="/country-pricing" component={CountryPricingPage} />
      <Route path="/country-pricing/:country" component={CountryPricingPage} />
      <Route path="/coins-in-united-states" component={CountryPricingPage} />
      <Route path="/coins-in-india" component={CountryPricingPage} />
      <Route path="/coins-in-pakistan" component={CountryPricingPage} />
      <Route path="/coins-in-united-kingdom" component={CountryPricingPage} />
      <Route path="/coins-in-canada" component={CountryPricingPage} />
      <Route path="/coins-in-australia" component={CountryPricingPage} />
      <Route path="/coins-in-germany" component={CountryPricingPage} />
      <Route path="/coins-in-france" component={CountryPricingPage} />
      <Route path="/coins-in-brazil" component={CountryPricingPage} />
      <Route path="/coins-in-mexico" component={CountryPricingPage} />
      <Route path="/coins-in-japan" component={CountryPricingPage} />
      <Route path="/coins-in-south-korea" component={CountryPricingPage} />
      <Route path="/coins-in-italy" component={CountryPricingPage} />
      <Route path="/coins-in-spain" component={CountryPricingPage} />
      <Route path="/coins-in-netherlands" component={CountryPricingPage} />
      <Route path="/coins-in-turkey" component={CountryPricingPage} />
      <Route path="/coins-in-russia" component={CountryPricingPage} />
      <Route path="/coins-in-china" component={CountryPricingPage} />
      <Route path="/coins-in-singapore" component={CountryPricingPage} />
      <Route path="/coins-in-thailand" component={CountryPricingPage} />
      <Route path="/coins-in-malaysia" component={CountryPricingPage} />
      <Route path="/coins-in-philippines" component={CountryPricingPage} />
      <Route path="/coins-in-indonesia" component={CountryPricingPage} />
      <Route path="/coins-in-vietnam" component={CountryPricingPage} />
      <Route path="/coins-in-saudi-arabia" component={CountryPricingPage} />
      <Route path="/coins-in-uae" component={CountryPricingPage} />
      <Route path="/coins-in/:country" component={CountryPricingPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/trends" component={TrendsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPolicyPage} />
      <Route path="/terms" component={TermsOfServicePage} />
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route path="/admin/blog/new" component={AdminBlogNewPage} />
      <Route path="/admin/blog/edit/:id" component={AdminBlogEditPage} />
      <Route path="/admin/blog" component={AdminBlogPage} />
      <Route path="/admin/settings" component={AdminSettingsPage} />
      <Route path="/admin/analytics" component={EnhancedAdminAnalyticsPage} />
      <Route path="/admin/ads" component={AdminAdsPage} />
      <Route path="/admin/tools" component={AdminToolsPage} />
      <Route path="/admin/countries" component={AdminDashboardPage} />
      <Route path="/admin" component={AdminDashboardPage} />
      <Route path="/admin/*" component={AdminDashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AnalyticsTracker />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
