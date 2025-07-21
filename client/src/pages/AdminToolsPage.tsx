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
  Calculator,
  Settings,
  Eye
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminToolsPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  
  const token = localStorage.getItem("admin_token");
  if (!token) {
    setLocation("/admin/login");
    return null;
  }

  const { data: tools, isLoading } = useQuery({
    queryKey: ["/api/tools"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("/api/admin/tools", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast({ title: "Tool created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/tools"] });
      setIsCreating(false);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/admin/tools/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast({ title: "Tool deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/tools"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      await apiRequest(`/api/admin/tools/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isActive }),
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tools"] });
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      icon: "",
      color: "",
      category: "",
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
          <p className="mt-4 text-gray-600">Loading tools...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { key: "calculator", label: "Calculator" },
    { key: "converter", label: "Converter" },
    { key: "comparison", label: "Comparison" },
    { key: "utility", label: "Utility" },
  ];

  const iconOptions = [
    "calculator", "credit-card", "chart-line", "gem", "money-bill-wave", "gift", "coins", "diamond"
  ];

  const colorOptions = [
    "from-tiktok-pink to-tiktok-cyan",
    "from-purple-500 to-blue-500",
    "from-green-500 to-tiktok-cyan",
    "from-orange-500 to-red-500",
    "from-blue-500 to-purple-500",
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
              <h1 className="text-xl font-semibold text-gray-900">Manage Tools</h1>
            </div>
            <Button 
              onClick={() => setIsCreating(!isCreating)}
              className="bg-gradient-to-r from-tiktok-pink to-tiktok-cyan hover:from-tiktok-pink/90 hover:to-tiktok-cyan/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              {isCreating ? "Cancel" : "New Tool"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Tool Form */}
        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Tool</CardTitle>
              <CardDescription>Add a new calculator or utility tool to your website</CardDescription>
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
                          <FormLabel>Tool Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Coin Calculator" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Slug</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., coin-calculator" {...field} />
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
                          <Textarea 
                            placeholder="Brief description of what this tool does..." 
                            {...field} 
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded-md">
                              <option value="">Select category...</option>
                              {categories.map(cat => (
                                <option key={cat.key} value={cat.key}>
                                  {cat.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded-md">
                              <option value="">Select icon...</option>
                              {iconOptions.map(icon => (
                                <option key={icon} value={icon}>
                                  {icon}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color Scheme</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded-md">
                              <option value="">Select colors...</option>
                              {colorOptions.map((color, index) => (
                                <option key={index} value={color}>
                                  Gradient {index + 1}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending}
                    className="bg-gradient-to-r from-tiktok-pink to-tiktok-cyan hover:from-tiktok-pink/90 hover:to-tiktok-cyan/90"
                  >
                    {createMutation.isPending ? "Creating..." : "Create Tool"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools?.map((tool: any) => (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Badge variant={tool.isActive ? 'default' : 'secondary'}>
                      {tool.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge variant="outline">
                      {tool.category}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`/${tool.slug}`, '_blank')}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteMutation.mutate(tool.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">URL Slug</p>
                    <p className="text-sm font-mono">/{tool.slug}</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Details</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Icon: {tool.icon}</span>
                      <span>Category: {tool.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Status: {tool.isActive ? "Active" : "Inactive"}
                    </span>
                    <Switch
                      checked={tool.isActive}
                      onCheckedChange={(checked) => 
                        toggleMutation.mutate({ id: tool.id, isActive: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!tools || tools.length === 0) && !isCreating && (
          <div className="text-center py-12">
            <Calculator className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="text-gray-400 text-lg mb-2">No tools found</div>
            <p className="text-gray-500 mb-4">Create calculator and utility tools for your users</p>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-tiktok-pink to-tiktok-cyan hover:from-tiktok-pink/90 hover:to-tiktok-cyan/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Tool
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}