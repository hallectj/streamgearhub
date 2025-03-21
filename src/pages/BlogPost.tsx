'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import MainLayout from "@/layouts/MainLayout";

// Add proper interface for component props
interface BlogPostProps {
  slug?: string;
}

// Update component to accept props
const BlogPost = ({ slug: propSlug }: BlogPostProps) => {
  const params = useParams();
  // Use the prop slug if provided, otherwise use the slug from params
  const slug = propSlug || (params?.slug as string);
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        // Replace with your actual WordPress URL
        const response = await fetch(
          `http://localhost/mylocalwp/wp-json/wp/v2/posts?slug=${slug}&_embed`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.length) {
          setError('Post not found');
          setLoading(false);
          return;
        }
        
        const wpPost = data[0];
        
        // Get featured image if available
        let featuredImage = "/placeholder.svg";
        if (wpPost._embedded && 
            wpPost._embedded['wp:featuredmedia'] && 
            wpPost._embedded['wp:featuredmedia'][0] &&
            wpPost._embedded['wp:featuredmedia'][0].source_url) {
          featuredImage = wpPost._embedded['wp:featuredmedia'][0].source_url;
        }
        
        // Get author name
        let authorName = "Unknown Author";
        if (wpPost._embedded && 
            wpPost._embedded['author'] && 
            wpPost._embedded['author'][0] &&
            wpPost._embedded['author'][0].name) {
          authorName = wpPost._embedded['author'][0].name;
        }
        
        // Get categories
        let categories: string[] = [];
        if (wpPost._embedded && 
            wpPost._embedded['wp:term'] && 
            wpPost._embedded['wp:term'][0]) {
          categories = wpPost._embedded['wp:term'][0].map((term: any) => term.name);
        }
        
        // Get tags
        let tags: string[] = [];
        if (wpPost._embedded && 
            wpPost._embedded['wp:term'] && 
            wpPost._embedded['wp:term'][1]) {
          tags = wpPost._embedded['wp:term'][1].map((term: any) => term.name);
        }
        
        // Calculate read time (rough estimate)
        const wordCount = wpPost.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200) + ' min read'; // Assuming 200 words per minute
        
        const formattedPost = {
          title: wpPost.title.rendered,
          content: wpPost.content.rendered,
          excerpt: wpPost.excerpt.rendered,
          date: new Date(wpPost.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          author: authorName,
          readTime,
          coverImage: featuredImage,
          category: categories.length > 0 ? categories[0] : 'Blog',
          tags: tags.length > 0 ? tags : ['streaming'],
          relatedProducts: [
            {
              title: "Elgato Stream Deck MK.2",
              price: "$149.99",
              image: "/placeholder.svg",
              rating: 4.8,
              amazonUrl: "https://amazon.com",
              description: "Customize your stream with 15 LCD keys",
            },
            {
              title: "Shure SM7B Vocal Microphone",
              price: "$399.00",
              image: "/placeholder.svg",
              rating: 4.9,
              amazonUrl: "https://amazon.com",
              description: "Industry standard vocal microphone",
            },
          ],
        };
        
        setPost(formattedPost);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
    window.scrollTo(0, 0); // Scroll to top on load
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <p>Loading post...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !post) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1>Post not found</h1>
          <p className="mt-4">The blog post you're looking for doesn't exist.</p>
          <Button asChild className="mt-6">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

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
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="mt-8">
                <h4 className="text-lg font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="bg-muted px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
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

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Author info */}
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-bold mb-4">About the Author</h3>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                      <User size={24} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{post.author}</h4>
                      <p className="text-sm text-muted-foreground">Content Creator</p>
                    </div>
                  </div>
                </div>
                
                {/* Related products */}
                {post.relatedProducts && post.relatedProducts.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-4">Recommended Products</h3>
                    <div className="space-y-4">
                      {post.relatedProducts.map((product: any, index: number) => (
                        <ProductCard
                          key={index}
                          image={product.image}
                          title={product.title}
                          price={product.price}
                          rating={product.rating}
                          amazonUrl={product.amazonUrl}
                          description={product.description}
                        />
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

export default BlogPost;
