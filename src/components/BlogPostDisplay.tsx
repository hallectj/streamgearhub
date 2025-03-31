'use client'

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import { ShareButtons } from "@/components/ShareButtons";
import { usePathname } from 'next/navigation';
import '../styles/content-styles.css'; // Import the shared styles

interface RelatedProduct {
  title: string;
  price: string;
  image: string;
  rating: number;
  amazonUrl: string;
  description: string;
}

// First, let's update the interface to include related posts
interface RelatedPost {
  title: string;
  date: string;
  slug: string;
  image?: string;
}

interface BlogPostDisplayProps {
  post: {
    title: string;
    content: string;
    excerpt: string;
    date: string;
    author: string;
    readTime: string;
    coverImage: string;
    category: string;
    tags: string[];
    mini_recommended_products?: string;
    relatedProducts?: RelatedProduct[];
  };
  relatedPosts?: RelatedPost[];
}

const BlogPostDisplay = ({ post, relatedPosts = [] }: BlogPostDisplayProps) => {
  const pathname = usePathname();
  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}${pathname}` 
    : 'https://streamgearhub.com';

  // Parse the mini_recommended_products string if it exists
  let relatedProducts: RelatedProduct[] = [];
  
  if (post.mini_recommended_products) {
    try {
      // Check if it's already an object/array
      if (typeof post.mini_recommended_products === 'object') {
        relatedProducts = Array.isArray(post.mini_recommended_products) 
          ? post.mini_recommended_products 
          : Object.values(post.mini_recommended_products);
      } else if (typeof post.mini_recommended_products === 'string') {
        
        try {
          // Parse the string as JSON
          const parsedData = JSON.parse(post.mini_recommended_products);
          
          // If it's an object with numeric keys, convert to array
          if (parsedData && typeof parsedData === 'object' && !Array.isArray(parsedData)) {
            relatedProducts = Object.values(parsedData);
          } else if (Array.isArray(parsedData)) {
            relatedProducts = parsedData;
          }
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError);
        }
      }
    } catch (error) {
      console.error('Error parsing recommended products:', error);
    }
  } else if (post.relatedProducts) {
    // Use existing relatedProducts if available
    relatedProducts = post.relatedProducts;
  }
  
  // Ensure all required fields exist in each product
  relatedProducts = relatedProducts.map(product => ({
    title: product.title || "Product Name",
    price: product.price || "Price unavailable",
    image: product.image || "/images/imageNotFound.png",
    rating: product.rating || 0,
    amazonUrl: product.amazonUrl || "#",
    description: product.description || ""
  }));

  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/blog">
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden mb-8">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
              <div
                className="blog-content prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="mt-10 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-xs font-medium hover:bg-muted/80 transition-colors"
                    >
                      <Tag size={12} />
                      {tag}
                    </Link>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <ShareButtons title={post.title} url={url} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Author info */}
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-bold mb-4">About the Author</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-muted-foreground">Content Creator</p>
                    </div>
                  </div>
                </div>
                
                {/* Related posts - now dynamic */}
                {relatedPosts.length > 0 && (
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h3 className="font-bold mb-4">Related Posts</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost, index) => (
                        <Link href={`/blog/${relatedPost.slug}`} key={index}>
                          <div className="flex gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors">
                            <div className="w-16 h-16 rounded bg-muted flex-shrink-0">
                              {relatedPost.image && (
                                <img 
                                  src={relatedPost.image} 
                                  alt={relatedPost.title}
                                  className="w-full h-full object-cover rounded"
                                />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm line-clamp-2">{relatedPost.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{relatedPost.date}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Related products */}
                {relatedProducts.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-4">Recommended Products</h3>
                    <div className="space-y-4">
                      {relatedProducts.map((product, index) => (
                        <div key={index} className="bg-card rounded-lg p-4 border border-border">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 rounded bg-muted flex-shrink-0">
                              <img 
                                src={product.image || "/images/ImageNotFound.png"} 
                                alt={product.title}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{product.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{product.price}</p>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="p-0 h-auto text-xs mt-1"
                                asChild
                              >
                                <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                                  View on Amazon
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPostDisplay;