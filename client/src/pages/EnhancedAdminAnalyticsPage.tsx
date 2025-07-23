import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Users, 
  Globe, 
  Eye,
  TrendingUp,
  Activity,
  MousePointer,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  RefreshCw
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const COLORS = ['#FF1744', '#9C27B0', '#3F51B5', '#2196F3', '#009688', '#4CAF50', '#FF9800', '#795548'];

export default function EnhancedAdminAnalyticsPage() {
  const token = localStorage.getItem("admin_token");

  // Enhanced dashboard data with comprehensive analytics
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/admin/dashboard", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Real-time active users
  const { data: activeUsersData } = useQuery({
    queryKey: ["/api/admin/analytics/active-users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/active-users", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
    refetchInterval: 10000, // Refresh every 10 seconds for real-time data
  });

  // Analytics overview
  const { data: analyticsOverview } = useQuery({
    queryKey: ["/api/admin/analytics/overview"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/overview?days=30", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
    refetchInterval: 60000, // Refresh every minute
  });

  // Popular pages
  const { data: popularPages } = useQuery({
    queryKey: ["/api/admin/analytics/popular-pages"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/popular-pages?limit=10", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
  });

  // Traffic sources
  const { data: trafficSources } = useQuery({
    queryKey: ["/api/admin/analytics/traffic-sources"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/traffic-sources?limit=10", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
  });

  // Daily analytics
  const { data: dailyAnalytics } = useQuery({
    queryKey: ["/api/admin/analytics/daily"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/daily?limit=14", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
  });

  // Country statistics
  const { data: countryStats } = useQuery({
    queryKey: ["/api/admin/analytics/countries"],
    queryFn: async () => {
      const response = await fetch("/api/admin/analytics/countries", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
  });

  if (dashboardLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-12 w-12 animate-spin text-orange-500 mx-auto" />
            <p className="mt-4 text-gray-600">Loading real-time analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Real-Time Analytics</h1>
            <p className="text-gray-600 mt-1">Live insights into your platform performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600">Live Data</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {activeUsersData?.count || 0} Active Now
            </Badge>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {dashboardData?.stats?.totalVisitors?.toLocaleString() || 0}
              </div>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {dashboardData?.stats?.growth > 0 ? '+' : ''}{dashboardData?.stats?.growth?.toFixed(1) || 0}% vs last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {dashboardData?.stats?.pageViews?.toLocaleString() || 0}
              </div>
              <p className="text-xs text-gray-600">Pages viewed this month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <MousePointer className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {dashboardData?.stats?.uniqueVisitors?.toLocaleString() || 0}
              </div>
              <p className="text-xs text-gray-600">Individual users this month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {activeUsersData?.count || 0}
              </div>
              <p className="text-xs text-gray-600">Users active right now</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Traffic Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  Daily Traffic Trend
                </CardTitle>
                <p className="text-sm text-gray-600">Last 14 days visitor activity</p>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyAnalytics?.dailyVisitors || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={12}
                    tick={{ fill: '#6B7280' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis fontSize={12} tick={{ fill: '#6B7280' }} />
                  <Tooltip 
                    formatter={(value, name) => [value, 'Visitors']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#FF1744" 
                    fill="#FF1744" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Top Countries
                </CardTitle>
                <p className="text-sm text-gray-600">Visitor breakdown by country</p>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={countryStats?.slice(0, 6) || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({country, percent}) => `${country} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {(countryStats?.slice(0, 6) || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Popular Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                Popular Pages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {popularPages?.slice(0, 8).map((page, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {page.page === '/' ? 'Homepage' : page.page}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (page.views / (popularPages[0]?.views || 1)) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 w-12 text-right">
                      {page.views}
                    </span>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No page data available</p>
              )}
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trafficSources?.topSources?.slice(0, 8).map((source, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {source.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, (source.sessions / (trafficSources.topSources[0]?.sessions || 1)) * 100)}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 w-8 text-right">
                      {source.sessions}
                    </span>
                  </div>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">No traffic source data available</p>
              )}
            </CardContent>
          </Card>

          {/* Real-Time Active Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-500" />
                Active Users Now
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {activeUsersData?.count || 0}
                </div>
                <p className="text-sm text-gray-600">Users browsing now</p>
              </div>
              
              <div className="space-y-2 mt-4">
                {activeUsersData?.activeUsers?.slice(0, 5).map((user, index) => (
                  <div key={index} className="flex items-center justify-between py-2 bg-gray-50 rounded-lg px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-gray-700 truncate max-w-[120px]">
                        {user.page === '/' ? 'Homepage' : user.page}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">{user.device}</span>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4 text-sm">No active users</p>
                )}
              </div>
              
              <div className="text-xs text-gray-500 text-center mt-3">
                Last updated: {activeUsersData?.updated ? new Date(activeUsersData.updated).toLocaleTimeString() : 'Never'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}