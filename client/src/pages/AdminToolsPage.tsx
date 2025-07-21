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
  Calculator,
  Settings,
  Eye
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminToolsPage() {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const token = localStorage.getItem("admin_token");

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
      category: "",
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
            <p className="mt-4 text-gray-600">Loading tools...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Tools Management</h1>
          <Button 
            onClick={() => setIsCreating(!isCreating)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            {isCreating ? "Cancel" : "New Tool"}
          </Button>
        </div>

        {/* Create Tool Form */}
        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Tool</CardTitle>
              <CardDescription>Add a new calculator tool to the platform</CardDescription>
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
                            <Input placeholder="Coin Calculator" {...field} />
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
                            <Input placeholder="coin-calculator" {...field} />
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
                            placeholder="Convert TikTok coins to real money..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon</FormLabel>
                          <FormControl>
                            <Input placeholder="Calculator" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input placeholder="converter" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending}
                    className="bg-orange-500 hover:bg-orange-600"
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
          {(tools || []).map((tool: any) => (
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
                    <Button size="sm" variant="outline">
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
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
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

        {(!tools || tools.length === 0) && (
          <div className="text-center py-12">
            <Calculator className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tools</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new tool.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}