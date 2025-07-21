import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/AdminLayout";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp,
  Settings,
  Eye
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface AdPlacement {
  id: number;
  name: string;
  type: string;
  size: string;
  position: string;
  adUnitId: string;
  isActive: boolean;
  pageType: string;
}

export default function AdminAdsPage() {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const token = localStorage.getItem("admin_token");

  const { data: ads = [], isLoading } = useQuery<AdPlacement[]>({
    queryKey: ["/api/admin/adsense"],
    queryFn: async () => {
      const response = await fetch("/api/admin/adsense", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("/api/admin/adsense", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast({ title: "Ad placement created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/adsense"] });
      setIsCreating(false);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/admin/adsense/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast({ title: "Ad placement deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/adsense"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      await apiRequest(`/api/admin/adsense/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isActive }),
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/adsense"] });
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      type: "display",
      size: "responsive",
      position: "header",
      adUnitId: "",
      pageType: "all",
      isActive: true
    }
  });

  // Optimal ad placements based on Google AdSense guidelines
  const recommendedPlacements = [
    {
      name: "Header Banner",
      type: "display",
      size: "728x90",
      position: "header",
      description: "Above the fold, high visibility",
      pageType: "all"
    },
    {
      name: "Sidebar Rectangle",
      type: "display", 
      size: "300x250",
      position: "sidebar",
      description: "Medium rectangle, good performance",
      pageType: "calculator"
    },
    {
      name: "In-Article Ad",
      type: "display",
      size: "responsive",
      position: "article-middle",
      description: "Native placement in content",
      pageType: "blog"
    },
    {
      name: "Footer Banner",
      type: "display",
      size: "728x90", 
      position: "footer",
      description: "End of page engagement",
      pageType: "all"
    },
    {
      name: "Mobile Banner",
      type: "display",
      size: "320x100",
      position: "mobile-header",
      description: "Optimized for mobile screens",
      pageType: "all"
    }
  ];

  const onSubmit = (data: any) => {
    createMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading ads...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Ad Management</h1>
          <Button 
            onClick={() => setIsCreating(!isCreating)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            {isCreating ? "Cancel" : "New Ad Placement"}
          </Button>
        </div>

        {/* Create Ad Form */}
        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Ad Placement</CardTitle>
              <CardDescription>Add a new advertisement placement to your site</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Header Banner" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad Type</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded-md">
                              <option value="display">Display Ad</option>
                              <option value="in-article">In-Article</option>
                              <option value="multiplex">Multiplex</option>
                              <option value="matched-content">Matched Content</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad Size</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded-md">
                              <option value="responsive">Responsive</option>
                              <option value="728x90">Leaderboard (728x90)</option>
                              <option value="300x250">Medium Rectangle (300x250)</option>
                              <option value="320x100">Large Mobile Banner (320x100)</option>
                              <option value="160x600">Wide Skyscraper (160x600)</option>
                              <option value="320x50">Mobile Banner (320x50)</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded-md">
                              <option value="header">Header</option>
                              <option value="sidebar">Sidebar</option>
                              <option value="footer">Footer</option>
                              <option value="article-top">Article Top</option>
                              <option value="article-middle">Article Middle</option>
                              <option value="article-bottom">Article Bottom</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pageType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Page Type</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded-md">
                              <option value="all">All Pages</option>
                              <option value="calculator">Calculator Pages</option>
                              <option value="blog">Blog Pages</option>
                              <option value="homepage">Homepage Only</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="adUnitId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AdSense Ad Unit ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ca-pub-xxxxxxxxx/xxxxxxxxxx"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createMutation.isPending}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      {createMutation.isPending ? "Creating..." : "Create Ad Placement"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Recommended Placements Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
              Recommended Ad Placements
            </CardTitle>
            <CardDescription>
              Optimal ad placements based on Google AdSense best practices for maximum revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedPlacements.map((placement, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{placement.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {placement.size}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{placement.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-xs">
                      {placement.pageType}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        form.setValue("name", placement.name);
                        form.setValue("type", placement.type);
                        form.setValue("size", placement.size);
                        form.setValue("position", placement.position);
                        form.setValue("pageType", placement.pageType);
                        setIsCreating(true);
                      }}
                    >
                      Use
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Ad Placements */}
        <Card>
          <CardHeader>
            <CardTitle>Current Ad Placements</CardTitle>
            <CardDescription>
              Manage your existing advertisement placements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ads.length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No ad placements created yet</p>
                  <p className="text-sm text-gray-400">Get started by creating your first ad placement above</p>
                </div>
              ) : (
                ads.map((ad: AdPlacement) => (
                  <div key={ad.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant={ad.isActive ? "default" : "secondary"}>
                          {ad.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <h3 className="font-medium">{ad.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {ad.size}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Position: {ad.position}</span>
                        <span>Type: {ad.type}</span>
                        <span>Pages: {ad.pageType}</span>
                        {ad.adUnitId && <span>Unit ID: {ad.adUnitId.substring(0, 20)}...</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={ad.isActive}
                        onCheckedChange={(isActive) => 
                          toggleMutation.mutate({ id: ad.id, isActive })
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => deleteMutation.mutate(ad.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}