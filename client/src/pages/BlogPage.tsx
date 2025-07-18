import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import BlogCard from '@/components/common/BlogCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useState } from 'react';
import type { BlogPost } from '@shared/schema';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['All', 'Monetization', 'Guides', 'Tips', 'News'];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "TikTok Money Blog",
    "description": "Latest guides and insights about TikTok monetization, coin values, and creator earnings",
    "url": "https://tokrecharge.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "TokRecharge.com"
    }
  };

  return (
    <>
      <SEOHead 
        title="TikTok Money Blog - Monetization Guides & Tips | TokRecharge.com"
        description="Latest guides and insights about TikTok monetization, coin values, creator earnings, and platform updates. Stay informed with our expert analysis."
        keywords="tiktok blog, tiktok monetization, tiktok creator tips, tiktok earnings guide, tiktok coin news"
        canonical="https://tokrecharge.com/blog"
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Blog' }
      ]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-tiktok-pink to-purple-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TikTok Money Blog
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Latest guides, tips, and insights about TikTok monetization, coin values, and creator earnings
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category} variant="outline" className="cursor-pointer hover:bg-tiktok-pink hover:text-white">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-tiktok-pink"></div>
                <p className="mt-4 text-gray-600">Loading articles...</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Topics</h2>
              <p className="text-gray-600">Explore our most popular TikTok monetization topics</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="font-semibold mb-2">Monetization</h3>
                <p className="text-sm text-gray-600">Learn how to earn money on TikTok</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-4">🪙</div>
                <h3 className="font-semibold mb-2">Coin Values</h3>
                <p className="text-sm text-gray-600">Understanding TikTok coin rates</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-4">🎁</div>
                <h3 className="font-semibold mb-2">Gift Guides</h3>
                <p className="text-sm text-gray-600">Best value gifts and strategies</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-sm text-gray-600">Track your TikTok performance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
