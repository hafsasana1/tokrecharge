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

export default function AdminAdsPage() {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const token = localStorage.getItem("admin_token");

  const { data: ads, isLoading } = useQuery({
    queryKey: ["/api/admin/ads"],
    queryFn: async () => {
      const response = await fetch("/api/admin/ads", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("/api/admin/ads", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast({ title: "Ad placement created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ads"] });
      setIsCreating(false);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/admin/ads/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast({ title: "Ad placement deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ads"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      await apiRequest(`/api/admin/ads/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isActive }),
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ads"] });
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      placement: "",
      adCode: "",
      isActive: true
    }
  });

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

                  <FormField
                    control={form.control}
                    name="placement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Placement Location</FormLabel>
                        <FormControl>
                          <Input placeholder="header, footer, sidebar" {...field} />
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
                        <FormLabel>Ad Code</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="<script>... ad code here ...</script>"
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {createMutation.isPending ? "Creating..." : "Create Ad Placement"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(ads || []).map((ad: any) => (
            <Card key={ad.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Badge variant={ad.isActive ? 'default' : 'secondary'}>
                      {ad.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge variant="outline">
                      {ad.placement}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
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
                <CardDescription>Placement: {ad.placement}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Ad Code Preview</p>
                    <p className="text-xs font-mono text-gray-500 truncate">
                      {ad.adCode.substring(0, 50)}...
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
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

        {(!ads || ads.length === 0) && (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No ad placements</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new ad placement.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}