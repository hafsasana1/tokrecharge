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
  ArrowLeft,
  TrendingUp,
  MapPin,
  Eye
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminAdsPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  
  const token = localStorage.getItem("admin_token");
  if (!token) {
    setLocation("/admin/login");
    return null;
  }

  const { data: ads, isLoading } = useQuery({
    queryKey: ["/api/admin/adsense"],
    queryFn: async () => {
      return await fetch("/api/admin/adsense", {
        headers: { "Authorization": `Bearer ${token}` },
      }).then(res => res.json());
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
      toast({ title: "Ad created successfully" });
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
      toast({ title: "Ad deleted successfully" });
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
      location: "",
      adCode: "",
      description: "",
      isActive: true,
    },
  });

  const onSubmit = (data: any) => {
    createMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tiktok-pink mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading ads...</p>
        </div>
      </div>
    );
  }

  const adLocations = [
    { key: "header", label: "Header", description: "Top of the page" },
    { key: "sidebar", label: "Sidebar", description: "Right side of content" },
    { key: "footer", label: "Footer", description: "Bottom of the page" },
    { key: "content", label: "In Content", description: "Within article content" },
    { key: "popup", label: "Popup", description: "Modal/overlay ads" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setLocation("/admin/dashboard")}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Ad Manager</h1>
            </div>
            <Button 
              onClick={() => setIsCreating(!isCreating)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {isCreating ? "Cancel" : "New Ad"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Ad Form */}
        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Ad</CardTitle>
              <CardDescription>Add a new AdSense advertisement to your website</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Header Banner" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded-md">
                              <option value="">Select location...</option>
                              {adLocations.map(loc => (
                                <option key={loc.key} value={loc.key}>
                                  {loc.label} - {loc.description}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of the ad" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="adCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AdSense Code</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Paste your Google AdSense ad code here..." 
                            {...field} 
                            rows={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    {createMutation.isPending ? "Creating..." : "Create Ad"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads?.map((ad: any) => (
            <Card key={ad.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Badge variant={ad.isActive ? 'default' : 'secondary'}>
                      {ad.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge variant="outline">
                      <MapPin className="w-3 h-3 mr-1" />
                      {ad.location}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleMutation.mutate({ id: ad.id, isActive: !ad.isActive })}
                      disabled={toggleMutation.isPending}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteMutation.mutate(ad.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{ad.name}</CardTitle>
                <CardDescription>{ad.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    <p className="text-sm">
                      {adLocations.find(loc => loc.key === ad.location)?.label} - 
                      {adLocations.find(loc => loc.key === ad.location)?.description}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Ad Code Preview</p>
                    <p className="text-xs text-gray-500 font-mono truncate">
                      {ad.adCode.substring(0, 50)}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Status: {ad.isActive ? "Active" : "Inactive"}
                    </span>
                    <Switch
                      checked={ad.isActive}
                      onCheckedChange={(checked) => 
                        toggleMutation.mutate({ id: ad.id, isActive: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!ads || ads.length === 0) && !isCreating && (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="text-gray-400 text-lg mb-2">No ads created yet</div>
            <p className="text-gray-500 mb-4">Start monetizing your website with AdSense ads</p>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Ad
            </Button>
          </div>
        )}

        {/* Location Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ad Location Guide</CardTitle>
            <CardDescription>Best practices for ad placement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adLocations.map((location) => (
                <div key={location.key} className="p-4 border rounded-lg">
                  <h4 className="font-medium">{location.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{location.description}</p>
                  <Badge variant="outline" className="mt-2">
                    {location.key}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}