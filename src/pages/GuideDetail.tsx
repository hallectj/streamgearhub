'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import ProductCard from "@/components/ProductCard";

// Mock guide data - in a real app, this would come from an API
const guidesData = {
  "setting-up-first-streaming-pc": {
    title: "Setting Up Your First Streaming PC: A Complete Guide",
    category: "Hardware",
    level: "Beginner",
    author: "Alex Stream",
    date: "September 15, 2023",
    readTime: "15 min read",
    coverImage: "/placeholder.svg",
    content: `
      <h2>Introduction</h2>
      <p>Building or buying your first streaming PC can be an overwhelming experience. With so many components to consider and technical specifications to understand, it's easy to feel lost in the process.</p>
      
      <p>This comprehensive guide will walk you through everything you need to know about setting up a streaming PC, whether you're building one from scratch or buying a pre-built system.</p>
      
      <h2>Single PC vs. Dual PC Setup</h2>
      <p>Before diving into components, you need to decide whether you want a single PC setup or a dual PC setup:</p>
      
      <h3>Single PC Setup</h3>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>More cost-effective</li>
        <li>Requires less space</li>
        <li>Simpler to set up and manage</li>
        <li>Modern hardware can handle gaming and streaming simultaneously</li>
      </ul>
      
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Higher performance requirements</li>
        <li>May experience performance issues in demanding games</li>
        <li>CPU and GPU resources are shared between gaming and streaming</li>
      </ul>
      
      <h3>Dual PC Setup</h3>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Dedicated resources for gaming and streaming</li>
        <li>Better performance in demanding games</li>
        <li>More reliable streaming quality</li>
      </ul>
      
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Significantly more expensive</li>
        <li>Requires more space and power</li>
        <li>More complex setup with capture cards and audio routing</li>
      </ul>
      
      <p>For most beginners, a single PC setup is recommended. Modern hardware has become powerful enough to handle both gaming and streaming, and you can always upgrade to a dual PC setup later if needed.</p>
      
      <h2>Essential Components for a Streaming PC</h2>
      
      <h3>CPU (Processor)</h3>
      <p>The CPU is the brain of your streaming PC and one of the most important components for streaming. Streaming is a CPU-intensive task, especially if you're using software encoding.</p>
      
      <p><strong>Recommendations:</strong></p>
      <ul>
        <li><strong>Budget:</strong> AMD Ryzen 5 5600X or Intel Core i5-12600K</li>
        <li><strong>Mid-range:</strong> AMD Ryzen 7 5800X3D or Intel Core i7-12700K</li>
        <li><strong>High-end:</strong> AMD Ryzen 9 5950X or Intel Core i9-12900K</li>
      </ul>
      
      <p>Look for processors with at least 6 cores and 12 threads. More cores and threads will provide better multitasking performance for streaming while gaming.</p>
      
      <h3>GPU (Graphics Card)</h3>
      <p>While the CPU handles most of the streaming workload with software encoding (x264), a powerful GPU can take some of the burden off your CPU with hardware encoding (NVENC for NVIDIA or AMF for AMD).</p>
      
      <p><strong>Recommendations:</strong></p>
      <ul>
        <li><strong>Budget:</strong> NVIDIA RTX 3060 or AMD RX 6600 XT</li>
        <li><strong>Mid-range:</strong> NVIDIA RTX 3070 or AMD RX 6700 XT</li>
        <li><strong>High-end:</strong> NVIDIA RTX 3080 or AMD RX 6800 XT</li>
      </ul>
      
      <p>NVIDIA GPUs are generally preferred for streaming due to their superior NVENC encoder, which provides excellent quality with minimal performance impact.</p>
    `,
    relatedProducts: [
      {
        title: "AMD Ryzen 7 5800X3D",
        price: "$449.99",
        image: "/placeholder.svg",
        rating: 4.8,
        amazonUrl: "https://amazon.com",
        description: "8-core, 16-thread processor with 3D V-Cache technology for gaming"
      },
      {
        title: "NVIDIA GeForce RTX 3070",
        price: "$599.99",
        image: "/placeholder.svg",
        rating: 4.7,
        amazonUrl: "https://amazon.com",
        description: "8GB GDDR6 graphics card with NVENC encoder for streaming"
      }
    ],
    tableOfContents: [
      { title: "Introduction", id: "introduction" },
      { title: "Single PC vs. Dual PC Setup", id: "single-pc-vs-dual-pc-setup" },
      { title: "Essential Components for a Streaming PC", id: "essential-components-for-a-streaming-pc" },
      { title: "CPU (Processor)", id: "cpu-processor" },
      { title: "GPU (Graphics Card)", id: "gpu-graphics-card" }
    ]
  }
};

const GuideDetail = ({ slug }: { slug?: string }) => {
  const [guide, setGuide] = useState<any>(null);
  
  useEffect(() => {
    // In a real application, fetch the guide data based on the slug
    // For now, we're using mock data
    if (slug && guidesData[slug as keyof typeof guidesData]) {
      setGuide(guidesData[slug as keyof typeof guidesData]);
    }
    
    // Scroll to top when guide changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!guide) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1>Guide not found</h1>
          <p className="mt-4">The guide you're looking for doesn't exist.</p>
          <Button asChild className="mt-6">
            <Link href="/guides">Back to Guides</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Get level color
  const getLevelColor = () => {
    switch (guide.level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Back navigation */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/guides">
                <ArrowLeft size={16} />
                Back to Guides
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Category and level badges */}
              <div className="mb-4 flex gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {guide.category}
                </span>
                <span className={`${getLevelColor()} px-3 py-1 rounded-full text-sm font-medium`}>
                  {guide.level}
                </span>
              </div>
              
              {/* Guide title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {guide.title}
              </h1>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{guide.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{guide.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{guide.readTime}</span>
                </div>
              </div>

              {/* Featured image */}
              <div className="rounded-lg overflow-hidden mb-8">
                <img 
                  src={guide.coverImage} 
                  alt={guide.title}
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>

              {/* Guide content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />

              {/* Article actions */}
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
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Table of contents */}
              <div className="bg-card rounded-lg p-6 border border-border sticky top-24">
                <h3 className="font-bold mb-4">Table of Contents</h3>
                <ul className="space-y-2">
                  {guide.tableOfContents.map((item: any, index: number) => (
                    <li key={index}>
                      <a 
                        href={`#${item.id}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Related products */}
              {guide.relatedProducts && guide.relatedProducts.length > 0 && (
                <div>
                  <h3 className="font-bold mb-4">Recommended Products</h3>
                  <div className="space-y-4">
                    {guide.relatedProducts.map((product: any, index: number) => (
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
    </MainLayout>
  );
};

export default GuideDetail;