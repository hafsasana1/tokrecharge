import { useState, useEffect } from "react";
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
  Image,
  Loader2
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface SettingValues {
  [key: string]: string;
}

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const token = localStorage.getItem("admin_token");
  const [hasChanges, setHasChanges] = useState(false);
  const [formValues, setFormValues] = useState<SettingValues>({});

  const { data: settings, isLoading } = useQuery({
    queryKey: ["/api/admin/settings"],
    queryFn: async () => {
      const response = await fetch("/api/admin/settings", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.json();
    },
  });

  // Initialize form values when settings are loaded
  useEffect(() => {
    if (settings && Array.isArray(settings)) {
      const initialValues: SettingValues = {};
      settings.forEach((setting: any) => {
        initialValues[setting.key] = setting.value || "";
      });
      setFormValues(initialValues);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (updates: { key: string; value: string }[]) => {
      // Update all changed settings in parallel
      await Promise.all(
        updates.map(({ key, value }) =>
          apiRequest(`/api/admin/settings/${key}`, {
            method: "PUT",
            body: JSON.stringify({ value }),
            headers: { "Authorization": `Bearer ${token}` },
          })
        )
      );
    },
    onSuccess: () => {
      toast({ 
        title: "Settings saved successfully",
        description: "All changes have been applied to your website."
      });
      setHasChanges(false);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error saving settings",
        description: error.message || "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    }
  });

  const settingsConfig = [
    {
      section: "General",
      icon: Globe,
      settings: [
        { key: "title", label: "Website Title", type: "text", description: "Main website title displayed in browser tab" },
        { key: "metaTitle", label: "Meta Title", type: "text", description: "SEO meta title for search engines" },
        { key: "metaDescription", label: "Meta Description", type: "textarea", description: "SEO meta description for search results" },
      ]
    },
    {
      section: "Branding",
      icon: Image,
      settings: [
        { key: "logo", label: "Logo URL", type: "text", description: "Website logo path (e.g., /assets/logo.svg)" },
        { key: "favicon", label: "Favicon URL", type: "text", description: "Website favicon path (e.g., /assets/favicon.ico)" },
      ]
    },
    {
      section: "Analytics & Tracking",
      icon: BarChart3,
      settings: [
        { key: "googleAnalytics", label: "Google Analytics ID", type: "text", description: "GA4 Measurement ID (e.g., G-XXXXXXXXXX)" },
        { key: "googleTagManager", label: "Google Tag Manager ID", type: "text", description: "GTM Container ID (e.g., GTM-XXXXXXX)" },
        { key: "googleSearchConsole", label: "Google Search Console HTML Tag", type: "text", description: 'HTML verification tag (e.g., <meta name="google-site-verification" content="...">)' },
        { key: "googleAdsense", label: "Google AdSense Code", type: "textarea", description: "AdSense verification meta tag or auto ads code" },
        { key: "facebookPixel", label: "Facebook Pixel ID", type: "text", description: "Facebook Pixel tracking ID (numbers only)" },
        { key: "verificationMeta", label: "Custom Verification Meta Tags", type: "textarea", description: "Additional verification meta tags (one per line)" },
      ]
    },
    {
      section: "SEO Configuration",
      icon: Search,
      settings: [
        { key: "canonicalUrl", label: "Canonical URL", type: "text", description: "Base canonical URL (e.g., https://example.com)" },
        { key: "robots", label: "Robots.txt Content", type: "textarea", description: "Robots.txt file content for search crawlers" },
      ]
    }
  ];

  const handleInputChange = (key: string, value: string) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    if (!settings || !hasChanges) return;

    const updates: { key: string; value: string }[] = [];
    
    // Find all changed values
    settings.forEach((setting: any) => {
      const currentValue = formValues[setting.key] || "";
      const originalValue = setting.value || "";
      
      if (currentValue !== originalValue) {
        updates.push({ key: setting.key, value: currentValue });
      }
    });

    if (updates.length > 0) {
      updateMutation.mutate(updates);
    }
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          {hasChanges && (
            <Button 
              onClick={handleSaveChanges}
              disabled={updateMutation.isPending}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          )}
        </div>
        
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
                <CardContent className="space-y-6">
                  {section.settings.map((setting) => (
                    <div key={setting.key} className="space-y-2">
                      <div>
                        <label className="text-sm font-medium text-gray-900">{setting.label}</label>
                        <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                      </div>
                      <div className="w-full">
                        {setting.type === 'textarea' ? (
                          <Textarea
                            value={formValues[setting.key] || ""}
                            onChange={(e) => handleInputChange(setting.key, e.target.value)}
                            placeholder={`Enter ${setting.label.toLowerCase()}`}
                            className="min-h-[100px] resize-vertical"
                            rows={4}
                          />
                        ) : (
                          <Input
                            value={formValues[setting.key] || ""}
                            onChange={(e) => handleInputChange(setting.key, e.target.value)}
                            placeholder={`Enter ${setting.label.toLowerCase()}`}
                            className="w-full"
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

        {hasChanges && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-orange-800">You have unsaved changes</span>
                </div>
                <Button 
                  onClick={handleSaveChanges}
                  disabled={updateMutation.isPending}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}