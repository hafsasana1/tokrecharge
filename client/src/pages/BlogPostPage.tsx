import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SEOHead from '@/components/common/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import type { BlogPost } from '@shared/schema';

export default function BlogPostPage() {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ['/api/blog', slug],
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-tiktok-pink"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The requested article could not be found.</p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "TokRecharge.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TokRecharge.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tokrecharge.com/blog/${post.slug}`
    }
  };

  return (
    <>
      <SEOHead 
        title={`${post.title} | TokRecharge.com Blog`}
        description={post.metaDescription || post.excerpt}
        keywords={post.keywords || ''}
        canonical={`https://tokrecharge.com/blog/${post.slug}`}
        schemaData={schemaData}
      />
      
      <Header />
      
      <Breadcrumb items={[
        { label: 'Blog', href: '/blog' },
        { label: post.title }
      ]} />

      {/* Article Header */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Button asChild variant="ghost" className="mb-6">
                <Link href="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  5 min read
                </div>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {/* Article content would normally be rendered from markdown or rich text */}
                <div className="space-y-6">
                  {post.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Sample structured content for demonstration */}
                {post.slug === '1000-tiktok-coins-value' && (
                  <div className="mt-8 space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Understanding TikTok Coin Values</h2>
                    <p className="text-gray-700 leading-relaxed">
                      TikTok coins are the virtual currency used within the TikTok platform to purchase gifts for creators during live streams. 
                      The value of these coins varies by country and region, making it important to understand the local pricing structure.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3">Current Coin Rates</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>United States: 1 coin ≈ $0.015 USD</li>
                      <li>India: 1 coin ≈ ₹1.25 INR</li>
                      <li>Pakistan: 1 coin ≈ ₨4.20 PKR</li>
                      <li>United Kingdom: 1 coin ≈ £0.012 GBP</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mb-3">Calculating 1000 Coins</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Based on current exchange rates, 1000 TikTok coins would be worth approximately:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>$15.00 USD in the United States</li>
                      <li>₹1,250 INR in India</li>
                      <li>₨4,200 PKR in Pakistan</li>
                      <li>£12.00 GBP in the United Kingdom</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">TikTok Recharge Prices: India vs USA</h3>
                <p className="text-gray-600 mb-4">Compare TikTok coin prices across different countries and find the best deals.</p>
                <Link href="/blog/tiktok-recharge-prices-comparison" className="text-tiktok-pink hover:text-pink-600 font-medium">
                  Read More →
                </Link>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Which TikTok Gifts Give the Most Cash?</h3>
                <p className="text-gray-600 mb-4">Discover which TikTok gifts provide the best value for money for creators.</p>
                <Link href="/blog/best-value-tiktok-gifts" className="text-tiktok-pink hover:text-pink-600 font-medium">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
