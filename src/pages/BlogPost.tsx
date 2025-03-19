'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import MainLayout from "@/layouts/MainLayout";

// Mock blog post data - in a real app, this would come from an API
const blogData = {
  "grow-your-twitch-channel": {
    title: "How to Grow Your Twitch Channel from Zero",
    author: "Alex Stream",
    date: "August 15, 2023",
    readTime: "12 min read",
    category: "Guide",
    coverImage: "/placeholder.svg",
    content: `
      <h2>Getting Started with Twitch</h2>
      <p>Starting a Twitch channel can be both exciting and overwhelming. With millions of streamers competing for viewers' attention, standing out requires strategy, consistency, and authenticity.</p>
      
      <p>This comprehensive guide will walk you through proven strategies to build your audience from scratch and create a thriving Twitch community that supports your streaming journey.</p>
      
      <h2>Define Your Streaming Niche</h2>
      <p>The first step to growing your Twitch channel is finding your unique angle. While it's tempting to stream whatever is popular, successful streamers typically have a clear focus that helps viewers understand what to expect.</p>
      
      <p>Consider these approaches to defining your niche:</p>
      <ul>
        <li><strong>Game specialist</strong>: Become known as an expert in a specific game</li>
        <li><strong>Genre focus</strong>: Build expertise in a particular game genre (FPS, MOBA, RPG, etc.)</li>
        <li><strong>Unique skill</strong>: Showcase special talents like speedrunning, achievement hunting, or competitive play</li>
        <li><strong>Entertainment style</strong>: Develop a distinctive personality or approach (educational, comedic, laid-back)</li>
      </ul>
      
      <h2>Optimize Your Stream Quality</h2>
      <p>Technical quality matters significantly when viewers decide whether to stay on your channel. Invest time in setting up your stream correctly:</p>
      
      <h3>Essential Equipment</h3>
      <p>While you don't need to spend thousands right away, these basics will dramatically improve your stream quality:</p>
      <ul>
        <li>A decent microphone (audio quality is more important than video)</li>
        <li>Stable internet connection (wired is better than WiFi)</li>
        <li>Appropriate lighting</li>
        <li>Webcam (if doing face-cam streams)</li>
      </ul>
      
      <h3>Stream Settings</h3>
      <p>Configure OBS or your preferred streaming software properly:</p>
      <ul>
        <li>Optimize bitrate based on your internet speed</li>
        <li>Set appropriate resolution (720p60 is often better than unstable 1080p)</li>
        <li>Create professional scenes, transitions, and alerts</li>
      </ul>
      
      <h2>Consistency is Key</h2>
      <p>One of the most important factors for channel growth is a consistent streaming schedule. Viewers need to know when to find you online.</p>
      
      <p>Establish a realistic schedule you can maintain, even if it's just 2-3 times per week at the same times. Make this schedule visible on your Twitch page and social media profiles.</p>
    `,
    tags: ["twitch", "streaming", "growth", "audience building"],
    relatedProducts: [
      {
        title: "Elgato Stream Deck MK.2",
        price: "$149.99",
        image: "/placeholder.svg",
        rating: 4.8,
        amazonUrl: "https://amazon.com",
        description: "Customize your stream with 15 LCD keys for instant control of apps and platforms"
      },
      {
        title: "Shure SM7B Vocal Microphone",
        price: "$399.00",
        image: "/placeholder.svg",
        rating: 4.9,
        amazonUrl: "https://amazon.com",
        description: "Industry standard vocal microphone preferred by top streamers and podcasters"
      }
    ]
  }
};

// Update the component to accept slug as a prop
const BlogPost = ({ slug }: { slug?: string }) => {
  const [post, setPost] = useState<any>(null);
  
  useEffect(() => {
    // In a real application, fetch the blog post data based on the slug
    // For now, we're using mock data
    if (slug && blogData[slug as keyof typeof blogData]) {
      setPost(blogData[slug as keyof typeof blogData]);
    }
    
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!post) {
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
          {/* Back navigation */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/blog">
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Category badge */}
              <div className="mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              
              {/* Article title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              {/* Meta information */}
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

              {/* Featured image */}
              <div className="rounded-lg overflow-hidden mb-8">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>

              {/* Article content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
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

              {/* Share and bookmark */}
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

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <div className="rounded-lg border border-border p-6 bg-card">
                  <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
                  <nav className="space-y-2 text-sm">
                    <a href="#" className="block text-muted-foreground hover:text-primary">Getting Started with Twitch</a>
                    <a href="#" className="block text-muted-foreground hover:text-primary">Define Your Streaming Niche</a>
                    <a href="#" className="block text-muted-foreground hover:text-primary">Optimize Your Stream Quality</a>
                    <a href="#" className="block pl-4 text-muted-foreground hover:text-primary">Essential Equipment</a>
                    <a href="#" className="block pl-4 text-muted-foreground hover:text-primary">Stream Settings</a>
                    <a href="#" className="block text-muted-foreground hover:text-primary">Consistency is Key</a>
                  </nav>
                </div>

                {/* Recommended Products */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Recommended Gear</h3>
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
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="w-full">View All Recommended Gear</Button>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="rounded-lg border border-border p-6 bg-card">
                  <h3 className="text-lg font-bold mb-2">Get Streaming Tips</h3>
                  <p className="text-sm text-muted-foreground mb-4">Join our newsletter for weekly streaming tips and gear deals.</p>
                  <form className="space-y-2">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-4 py-2 rounded-md bg-background border border-input"
                    />
                    <Button className="w-full">Subscribe</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPost;
