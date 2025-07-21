import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import AdminLayout from "@/components/layout/AdminLayout";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Search,
  Calendar,
  Tag
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminBlogNewPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [previewMode, setPreviewMode] = useState(false);
  const token = localStorage.getItem("admin_token");

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("/api/admin/blog", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Authorization": `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast({ title: "Blog post created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      setLocation("/admin/blog");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: "",
      status: "draft",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      canonicalUrl: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
      publishedAt: "",
      isPublished: false
    }
  });

  const onSubmit = (data: any) => {
    const postData = {
      ...data,
      status: data.isPublished ? 'published' : 'draft',
      publishedAt: data.isPublished ? (data.publishedAt || new Date().toISOString()) : null
    };
    createMutation.mutate(postData);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    form.setValue('title', title);
    if (!form.getValues('slug')) {
      form.setValue('slug', generateSlug(title));
    }
    if (!form.getValues('metaTitle')) {
      form.setValue('metaTitle', title);
    }
    if (!form.getValues('ogTitle')) {
      form.setValue('ogTitle', title);
    }
    if (!form.getValues('twitterTitle')) {
      form.setValue('twitterTitle', title);
    }
  };

  const watchedContent = form.watch('content');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/admin/blog")}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={createMutation.isPending}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Save className="w-4 h-4 mr-2" />
              {createMutation.isPending ? 'Creating...' : 'Create Post'}
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {!previewMode ? (
                <>
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-orange-500" />
                        <CardTitle>Post Content</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Post Title *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter post title..." 
                                {...field}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="text-lg font-medium"
                              />
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
                            <FormLabel>URL Slug *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="url-slug" 
                                {...field}
                                className="font-mono text-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Post Excerpt</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief description of the post..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Post Content *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write your blog post content here..."
                                rows={20}
                                {...field}
                                className="min-h-[500px] font-mono text-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* SEO Settings */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Search className="w-5 h-5 text-orange-500" />
                        <CardTitle>SEO Settings</CardTitle>
                      </div>
                      <CardDescription>
                        Optimize your post for search engines
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="metaTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="SEO optimized title (60 characters max)"
                                maxLength={60}
                                {...field}
                              />
                            </FormControl>
                            <div className="text-xs text-gray-500">
                              {field.value?.length || 0}/60 characters
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="metaDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="SEO meta description (160 characters max)"
                                rows={3}
                                maxLength={160}
                                {...field}
                              />
                            </FormControl>
                            <div className="text-xs text-gray-500">
                              {field.value?.length || 0}/160 characters
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="keywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Keywords</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="keyword1, keyword2, keyword3"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="canonicalUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Canonical URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/blog/post-slug"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Social Media Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Social Media Optimization</CardTitle>
                      <CardDescription>
                        Configure how your post appears on social media platforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Open Graph */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm">Open Graph (Facebook, LinkedIn)</h4>
                        <FormField
                          control={form.control}
                          name="ogTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OG Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Title for social sharing" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ogDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OG Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Description for social sharing"
                                  rows={2}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ogImage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>OG Image URL</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="https://example.com/image.jpg"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Twitter Card */}
                      <div className="space-y-4 pt-4 border-t">
                        <h4 className="font-semibold text-sm">Twitter Card</h4>
                        <FormField
                          control={form.control}
                          name="twitterTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Title for Twitter" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="twitterDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Description for Twitter"
                                  rows={2}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="twitterImage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter Image URL</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="https://example.com/image.jpg"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                /* Preview Mode */
                <Card>
                  <CardHeader>
                    <CardTitle>Post Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <article className="prose max-w-none">
                      <h1>{form.getValues('title') || 'Untitled Post'}</h1>
                      {form.getValues('excerpt') && (
                        <div className="text-gray-600 italic border-l-4 border-orange-500 pl-4 my-4">
                          {form.getValues('excerpt')}
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">
                        {watchedContent || 'No content yet...'}
                      </div>
                    </article>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <CardTitle>Publish Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Publish immediately</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            Make this post live on the website
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch('isPublished') && (
                    <FormField
                      control={form.control}
                      name="publishedAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Publish Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="datetime-local"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-orange-500" />
                    <CardTitle>Categories</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="guides">Guides</SelectItem>
                            <SelectItem value="tutorials">Tutorials</SelectItem>
                            <SelectItem value="news">News</SelectItem>
                            <SelectItem value="comparison">Comparison</SelectItem>
                            <SelectItem value="monetization">Monetization</SelectItem>
                            <SelectItem value="tips">Tips</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* SEO Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-blue-600 text-sm hover:underline cursor-pointer">
                      {form.getValues('canonicalUrl') || 'https://example.com/blog/post-slug'}
                    </div>
                    <div className="text-lg text-blue-800 hover:underline cursor-pointer">
                      {form.getValues('metaTitle') || form.getValues('title') || 'Post Title'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {form.getValues('metaDescription') || form.getValues('excerpt') || 'Post description will appear here...'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}