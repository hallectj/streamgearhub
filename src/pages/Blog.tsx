'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

// Blog post card component
interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  featuredImage?: string;
  categories: string[];
}

const BlogPostCard = ({ title, excerpt, date, author, slug, featuredImage, categories }: BlogPostProps) => {
  return (
    <div className="card-hover rounded-lg overflow-hidden bg-card border border-muted flex flex-col h-full">
      <div className="relative">
        <img 
          src={featuredImage || "/placeholder.svg"} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        {categories && categories.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              {categories[0]}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <div className="flex items-center mr-4">
            <User size={14} className="mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <div 
          className="text-muted-foreground mb-4 flex-grow"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        
        <Button asChild variant="outline" className="mt-auto w-full justify-between">
          <Link href={`/blog/${slug}`}>
            Read Article
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with your actual WordPress URL
        const response = await fetch('http://localhost/mylocalwp/wp-json/wp/v2/posts?_embed');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform WordPress data to our format
        const formattedPosts = data.map((post: any) => {
          // Get featured image if available
          let featuredImage = "/placeholder.svg";
          if (post._embedded && 
              post._embedded['wp:featuredmedia'] && 
              post._embedded['wp:featuredmedia'][0] &&
              post._embedded['wp:featuredmedia'][0].source_url) {
            featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
          }
          
          // Get author name
          let authorName = "Unknown Author";
          if (post._embedded && 
              post._embedded['author'] && 
              post._embedded['author'][0] &&
              post._embedded['author'][0].name) {
            authorName = post._embedded['author'][0].name;
          }
          
          // Get categories
          let categories: string[] = [];
          if (post._embedded && 
              post._embedded['wp:term'] && 
              post._embedded['wp:term'][0]) {
            categories = post._embedded['wp:term'][0].map((term: any) => term.name);
          }
          
          return {
            title: post.title.rendered,
            excerpt: post.excerpt.rendered,
            date: new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            author: authorName,
            slug: post.slug,
            featuredImage,
            categories
          };
        });
        
        setPosts(formattedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Blog</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Latest news, guides, and insights for streamers
        </p>
        
        {loading && (
          <div className="text-center py-12">
            <p>Loading blog posts...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        )}
        
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <p>No blog posts found.</p>
          </div>
        )}
        
        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogPostCard key={index} {...post} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Blog;