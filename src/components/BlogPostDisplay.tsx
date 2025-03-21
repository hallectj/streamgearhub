'use client'

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import '../styles/content-styles.css'; // Import the shared styles

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
    relatedProducts: {
      title: string;
      price: string;
      image: string;
      rating: number;
      amazonUrl: string;
      description: string;
    }[];
  };
}

const BlogPostDisplay = ({ post }: BlogPostDisplayProps) => {
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
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 size={16} className="mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark size={16} className="mr-1" />
                      Save
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp size={16} className="mr-1" />
                    Helpful
                  </Button>
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
                
                {/* Related posts */}
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-bold mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded bg-muted flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">Best Microphones for Streaming in 2025</h4>
                        <p className="text-xs text-muted-foreground mt-1">March 15, 2025</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded bg-muted flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">How to Grow Your Audience on Twitch</h4>
                        <p className="text-xs text-muted-foreground mt-1">February 28, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Related products */}
                {post.relatedProducts && post.relatedProducts.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-4">Recommended Products</h3>
                    <div className="space-y-4">
                      {post.relatedProducts.map((product, index) => (
                        <div key={index} className="bg-card rounded-lg p-4 border border-border">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 rounded bg-muted flex-shrink-0">
                              <img 
                                src={product.image} 
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