import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/AdminLayout";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Save, 
  Globe,
  Search,
  BarChart3,
  Image
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const token = localStorage.getItem("admin_token");

  const { data: settings, isLoading } = useQuery({
    queryKey: ["/api/admin/settings"],
    queryFn: async () => {
      const response = await fetch("/api/admin/settings", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      await apiRequest(`/api/admin/settings/${key}`, {
        method: "PUT",
        body: JSON.stringify({ value }),
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast({ title: "Settings updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
    },
  });

  const form = useForm();

  const settingsConfig = [
    {
      section: "General",
      icon: Globe,
      settings: [
        { key: "title", label: "Website Title", type: "text", description: "Main website title" },
        { key: "metaTitle", label: "Meta Title", type: "text", description: "SEO meta title" },
        { key: "metaDescription", label: "Meta Description", type: "textarea", description: "SEO meta description" },
      ]
    },
    {
      section: "Branding",
      icon: Image,
      settings: [
        { key: "logo", label: "Logo URL", type: "text", description: "Website logo path" },
        { key: "favicon", label: "Favicon URL", type: "text", description: "Website favicon path" },
      ]
    },
    {
      section: "Analytics",
      icon: BarChart3,
      settings: [
        { key: "googleAnalytics", label: "Google Analytics ID", type: "text", description: "GA tracking ID" },
        { key: "googleTagManager", label: "Google Tag Manager ID", type: "text", description: "GTM container ID" },
      ]
    },
    {
      section: "SEO",
      icon: Search,
      settings: [
        { key: "canonicalUrl", label: "Canonical URL", type: "text", description: "Base canonical URL" },
        { key: "robots", label: "Robots.txt", type: "textarea", description: "Robots.txt content" },
      ]
    }
  ];

  const handleSave = (key: string, value: string) => {
    updateMutation.mutate({ key, value });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading settings...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        
        <div className="grid gap-6">
          {settingsConfig.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.section}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-orange-500" />
                    <CardTitle>{section.section}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.settings.map((setting) => (
                    <div key={setting.key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                      <div>
                        <label className="text-sm font-medium">{setting.label}</label>
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      </div>
                      <div className="md:col-span-2 flex gap-2">
                        {setting.type === 'textarea' ? (
                          <Textarea
                            defaultValue={settings?.[setting.key] || ""}
                            onChange={(e) => handleSave(setting.key, e.target.value)}
                            placeholder={`Enter ${setting.label.toLowerCase()}`}
                            className="flex-1"
                          />
                        ) : (
                          <Input
                            defaultValue={settings?.[setting.key] || ""}
                            onChange={(e) => handleSave(setting.key, e.target.value)}
                            placeholder={`Enter ${setting.label.toLowerCase()}`}
                            className="flex-1"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}