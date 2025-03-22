'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, ThumbsUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MainLayout from "@/layouts/MainLayout";
import ProductCard from "@/components/ProductCard";

// Mock review data - in a real app, this would come from an API
const reviewsData = {
  "shure-sm7b-vocal-microphone": {
    title: "Shure SM7B Vocal Microphone Review",
    category: "Microphones",
    rating: 4.9,
    price: "$399.00",
    amazonUrl: "https://amazon.com",
    image: "/placeholder.svg",
    pros: [
      "Exceptional sound quality with rich, broadcast-ready vocals",
      "Excellent rejection of background noise",
      "Built-in pop filter and shock mount",
      "Durable construction that will last for years",
      "Industry standard used by top streamers and podcasters"
    ],
    cons: [
      "Requires a powerful preamp or audio interface",
      "Expensive compared to entry-level options",
      "Quite heavy and requires a sturdy boom arm",
      "No USB connectivity option",
      "Learning curve to get optimal sound"
    ],
    verdict: "The Shure SM7B is the gold standard for streaming microphones for a reason. While it comes with a premium price tag and requires additional equipment to get the most out of it, the sound quality is unmatched for those serious about their audio.",
    content: `
      <h2>Introduction</h2>
      <p>When it comes to professional-grade microphones for streaming, podcasting, and vocal recording, the Shure SM7B stands as an industry icon. Used by countless professionals from Joe Rogan to top Twitch streamers, this dynamic microphone has earned its reputation through decades of consistent performance.</p>
      
      <p>But at nearly $400, is it worth the investment for your streaming setup? This comprehensive review will help you decide if the SM7B deserves a place in your content creation arsenal.</p>
      
      <h2>Build Quality and Design</h2>
      <p>The SM7B is built like a tank. Its all-metal construction feels premium and durable, designed to last for decades rather than years. The microphone has a professional, understated appearance that looks great on camera without drawing unnecessary attention.</p>
      
      <p>The integrated shock mount effectively reduces vibrations from desk bumps or keyboard typing, while the included windscreen does an excellent job minimizing plosives (those harsh "p" and "b" sounds) without needing an external pop filter.</p>
      
      <h2>Sound Quality</h2>
      <p>This is where the SM7B truly shines. The microphone delivers warm, rich vocals with a presence that's hard to match. The frequency response is tailored specifically for speech, with a slight presence boost that makes voices sound natural yet polished.</p>
      
      <p>As a dynamic microphone, the SM7B excels at rejecting background noise. It won't pick up your mechanical keyboard, computer fans, or ambient room noise nearly as much as condenser alternatives. This focused pickup pattern means you can stream in less-than-ideal acoustic environments while still sounding professional.</p>
      
      <h2>Setup and Requirements</h2>
      <p>Here's where potential buyers should pay close attention: the SM7B is a gain-hungry microphone. It requires significant amplification to reach optimal recording levels. You'll need either:</p>
      
      <ul>
        <li>A powerful audio interface with high-gain preamps (like the Focusrite Scarlett 2i2 3rd Gen or better)</li>
        <li>A dedicated preamp like the Cloudlifter CL-1</li>
        <li>A mixer with sufficient gain</li>
      </ul>
      
      <p>This additional equipment requirement adds to the already premium cost of the microphone itself. You'll also want a sturdy boom arm to position the relatively heavy microphone properly.</p>
      
      <h2>Performance for Streaming</h2>
      <p>For streamers, the SM7B offers several advantages:</p>
      
      <ul>
        <li>Consistent sound regardless of how you move in relation to the microphone</li>
        <li>Excellent rejection of keyboard, mouse, and controller sounds</li>
        <li>Professional broadcast quality that viewers will notice</li>
        <li>Durability to withstand long streaming sessions and regular use</li>
      </ul>
      
      <p>The microphone's cardioid polar pattern means it primarily captures sound from the front while rejecting sound from the sides and rear. This is ideal for streaming setups where you want to focus on your voice while minimizing background noise.</p>
    `,
    relatedProducts: [
      {
        title: "Cloudlifter CL-1",
        price: "$149.00",
        image: "/placeholder.svg",
        rating: 4.8,
        amazonUrl: "https://amazon.com",
        description: "Mic activator that provides +25dB of clean gain for dynamic microphones"
      },
      {
        title: "Rode PSA1+ Professional Studio Arm",
        price: "$129.00",
        image: "/placeholder.svg",
        rating: 4.7,
        amazonUrl: "https://amazon.com",
        description: "Premium studio boom arm with silent operation and superior stability"
      }
    ]
  }
};

const ReviewDetail = ({ slug }: { slug?: string }) => {
  const [review, setReview] = useState<any>(null);
  
  useEffect(() => {
    // In a real application, fetch the review data based on the slug
    // For now, we're using mock data
    if (slug && reviewsData[slug as keyof typeof reviewsData]) {
      setReview(reviewsData[slug as keyof typeof reviewsData]);
    }
    
    // Scroll to top when review changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!review) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1>Review not found</h1>
          <p className="mt-4">The review you're looking for doesn't exist.</p>
          <Button asChild className="mt-6">
            <Link href="/reviews">Back to Reviews</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Render stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-5 h-5 ${i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Back navigation */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/reviews">
                <ArrowLeft size={16} />
                Back to Reviews
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Category badge */}
              <div className="mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {review.category}
                </span>
              </div>
              
              {/* Review title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {review.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {renderStars()}
                </div>
                <span className="text-lg font-medium">{review.rating}/5</span>
              </div>

              {/* Featured image */}
              <div className="rounded-lg overflow-hidden mb-8 bg-card p-8 border border-muted flex justify-center">
                <img 
                  src={review.image} 
                  alt={review.title}
                  className="max-h-80 object-contain"
                />
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-100 dark:border-green-900">
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">Pros</h3>
                  <ul className="space-y-2">
                    {review.pros.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border border-red-100 dark:border-red-900">
                  <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">Cons</h3>
                  <ul className="space-y-2">
                    {review.cons.map((con: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verdict */}
              <div className="bg-card p-6 rounded-lg border border-muted mb-8">
                <h3 className="text-xl font-bold mb-2">Verdict</h3>
                <p className="text-foreground/90">{review.verdict}</p>
              </div>

              {/* Review content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: review.content }}
              />
              
              {/* Buy button */}
              <div className="mt-8 mb-12">
                <Button asChild size="lg" className="gap-2">
                  <a href={review.amazonUrl} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart size={18} />
                    Buy on Amazon for {review.price}
                  </a>
                </Button>
              </div>
              
              {/* Article actions */}
              <div className="flex items-center justify-between py-6 border-t border-b border-border mb-8">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp size={16} />
                    <span>Helpful</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Price card */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-bold mb-2">Price</h3>
                <p className="text-2xl font-bold text-primary mb-4">{review.price}</p>
                <Button asChild className="w-full">
                  <a href={review.amazonUrl} target="_blank" rel="noopener noreferrer">
                    View on Amazon
                  </a>
                </Button>
              </div>
              
              {/* Related products */}
              {review.relatedProducts && review.relatedProducts.length > 0 && (
                <div>
                  <h3 className="font-bold mb-4">Recommended Accessories</h3>
                  <div className="space-y-4">
                    {review.relatedProducts.map((product: any, index: number) => (
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

export default ReviewDetail;