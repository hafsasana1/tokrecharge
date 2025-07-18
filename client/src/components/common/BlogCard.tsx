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
    <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl || defaultImages[post.id % 3]}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">{post.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center group-hover:translate-x-1 transition-all duration-300"
        >
          Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </CardContent>
    </Card>
  );
}
