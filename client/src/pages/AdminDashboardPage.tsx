import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  BarChart3, 
  Users, 
  Globe, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AdminDashboardPage() {
  const token = localStorage.getItem("admin_token");

  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      return response.json();
    },
    enabled: !!token, // Only run query if token exists
  });

  // Handle authentication error
  if (error && !token) {
    window.location.href = '/admin/login';
    return null;
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Mock data for performance chart
  const performanceData = [
    { name: 'Jan', pageViews: 40, clicks: 24 },
    { name: 'Feb', pageViews: 30, clicks: 13 },
    { name: 'Mar', pageViews: 20, clicks: 98 },
    { name: 'Apr', pageViews: 27, clicks: 39 },
    { name: 'May', pageViews: 18, clicks: 48 },
    { name: 'Jun', pageViews: 23, clicks: 38 },
    { name: 'Jul', pageViews: 34, clicks: 43 }
  ];

  return (
    <AdminLayout>
      {/* Alert Message */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
            ⚠️
          </div>
          <p className="text-sm text-orange-800">
            We regret to inform you that our server is currently experiencing technical difficulties.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Tools */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">Total Tools</CardTitle>
            <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 mb-1">
              {dashboardData?.stats.totalTools || 13}
            </div>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">7.1%</span>
              <span className="text-gray-600 ml-1">Last Week</span>
            </div>
          </CardContent>
        </Card>

        {/* New Leads */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">New Leads</CardTitle>
            <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 mb-1">
              9,526
            </div>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">8.1%</span>
              <span className="text-gray-600 ml-1">Last Month</span>
            </div>
          </CardContent>
        </Card>

        {/* Deals */}
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-900">Deals</CardTitle>
            <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-900 mb-1">976</div>
            <div className="flex items-center text-sm">
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-600 font-medium">4.3%</span>
              <span className="text-gray-600 ml-1">Last Month</span>
            </div>
          </CardContent>
        </Card>

        {/* Booked Revenue */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Booked Revenue</CardTitle>
            <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 mb-1">$123.6k</div>
            <div className="flex items-center text-sm">
              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-600 font-medium">10.6%</span>
              <span className="text-gray-600 ml-1">Last Month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Performance</CardTitle>
              <div className="flex space-x-2 text-sm">
                <button className="px-3 py-1 bg-gray-100 rounded-md">ALL</button>
                <button className="px-3 py-1 text-gray-600">1M</button>
                <button className="px-3 py-1 text-gray-600">6M</button>
                <button className="px-3 py-1 text-gray-600">1Y</button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pageViews" fill="#FF6B35" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" fill="#06D6A0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Page Views</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Clicks</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversions */}
        <Card>
          <CardHeader>
            <CardTitle>Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Returning', value: 65.2 },
                        { name: 'New', value: 34.8 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={450}
                      dataKey="value"
                    >
                      <Cell fill="#FF6B35" />
                      <Cell fill="#E5E5E5" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">65.2%</div>
                    <div className="text-sm text-gray-500">Returning Customer</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">This Week</span>
                <span className="font-semibold">23.5k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Week</span>
                <span className="font-semibold">41.05k</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions by Country */}
        <Card>
          <CardHeader>
            <CardTitle>Sessions by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { country: 'Canada', visitors: 2500, color: 'bg-blue-500' },
                { country: 'United States', visitors: 1800, color: 'bg-orange-500' },
                { country: 'Brazil', visitors: 1200, color: 'bg-gray-400' }
              ].map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${country.color}`}></div>
                    <span className="text-sm">{country.country}</span>
                  </div>
                  <span className="font-medium">{country.visitors}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>This Week</span>
                <span>Last Week</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>23.5k</span>
                <span>41.05k</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Top Pages</CardTitle>
              <Button variant="link" size="sm" className="text-orange-500">
                View all...
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500">
                <span>Page Path</span>
                <span>Page Views</span>
                <span>Exit Rate</span>
                <span></span>
              </div>
              {[
                { path: '/coin-calculator', views: 485, rate: '44%', trend: 'up' },
                { path: '/gift-value', views: 426, rate: '28.5%', trend: 'down' },
                { path: '/earnings', views: 254, rate: '12.2%', trend: 'up' },
                { path: '/blog', views: 1369, rate: '5.1%', trend: 'up' },
                { path: '/countries', views: 985, rate: '44.2%', trend: 'down' },
              ].map((page, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center py-2 text-sm">
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    {page.path}
                  </span>
                  <span>{page.views}</span>
                  <span className={page.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {page.rate}
                  </span>
                  <span className={`text-xs ${page.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {page.trend === 'up' ? '+' : '-'}1.1%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}