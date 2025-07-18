import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { BlogPost } from '@shared/schema';

interface BlogCardProps {
  post: BlogPost;
  imageUrl?: string;
}

export default function BlogCard({ post, imageUrl }: BlogCardProps) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1611162617263-4ec3060a058e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
  ];

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <img
        src={imageUrl || defaultImages[post.id % 3]}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-tiktok-pink hover:text-pink-600 font-medium inline-flex items-center"
        >
          Read More <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
