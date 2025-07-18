import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
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
  ArrowLeft,
  Globe,
  Search,
  BarChart3,
  Image
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminSettingsPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const token = localStorage.getItem("admin_token");
  if (!token) {
    setLocation("/admin/login");
    return null;
  }

  const { data: settings, isLoading } = useQuery({
    queryKey: ["/api/admin/settings"],
    queryFn: async () => {
      return await fetch("/api/admin/settings", {
        headers: { "Authorization": `Bearer ${token}` },
      }).then(res => res.json());
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
        { key: "googleAnalytics", label: "Google Analytics", type: "text", description: "GA tracking code" },
        { key: "googleSearchConsole", label: "Search Console", type: "text", description: "GSC verification code" },
        { key: "facebookPixel", label: "Facebook Pixel", type: "text", description: "FB Pixel code" },
      ]
    },
    {
      section: "SEO",
      icon: Search,
      settings: [
        { key: "verificationMeta", label: "Verification Meta", type: "textarea", description: "Additional meta tags" },
      ]
    }
  ];

  const handleSave = (key: string, value: string) => {
    updateMutation.mutate({ key, value });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tiktok-pink mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  const settingsMap = settings?.reduce((acc: any, setting: any) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {}) || {};

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
              <h1 className="text-xl font-semibold text-gray-900">Site Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {settingsConfig.map((section) => (
            <Card key={section.section}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <section.icon className="w-5 h-5 mr-2" />
                  {section.section}
                </CardTitle>
                <CardDescription>
                  Configure {section.section.toLowerCase()} settings for your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.settings.map((setting) => {
                  const [localValue, setLocalValue] = useState(settingsMap[setting.key] || "");
                  
                  return (
                    <div key={setting.key} className="space-y-2">
                      <label className="text-sm font-medium">{setting.label}</label>
                      <p className="text-xs text-gray-500">{setting.description}</p>
                      <div className="flex space-x-2">
                        {setting.type === "textarea" ? (
                          <Textarea
                            value={localValue}
                            onChange={(e) => setLocalValue(e.target.value)}
                            placeholder={`Enter ${setting.label.toLowerCase()}...`}
                            className="flex-1"
                            rows={3}
                          />
                        ) : (
                          <Input
                            value={localValue}
                            onChange={(e) => setLocalValue(e.target.value)}
                            placeholder={`Enter ${setting.label.toLowerCase()}...`}
                            className="flex-1"
                          />
                        )}
                        <Button
                          onClick={() => handleSave(setting.key, localValue)}
                          disabled={updateMutation.isPending}
                          size="sm"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}