'use client'

import Link from "next/link"; // Changed from React Router Link
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

// Make sure all Link components use href instead of to
// <Link href="/path">...</Link>
import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import MainLayout from "@/layouts/MainLayout";

// Mock data for featured articles
const featuredArticles = [
  {
    slug: "best-capture-cards",
    title: "Best Capture Cards for Streaming in 2023",
    excerpt: "Discover the top capture cards that will give you lag-free, high-quality streams across all platforms.",
    category: "Gear",
    image: "/placeholder.svg",
    date: "August 28, 2023"
  },
  {
    slug: "grow-your-twitch-channel",
    title: "How to Grow Your Twitch Channel from Zero",
    excerpt: "A complete guide with proven strategies to build your audience and create a thriving Twitch community.",
    category: "Guide",
    image: "/placeholder.svg",
    date: "August 15, 2023"
  },
  {
    slug: "professional-obs-setup",
    title: "Setting Up OBS for Professional Streams",
    excerpt: "Learn how to configure OBS for optimal performance and create professional-looking scenes and transitions.",
    category: "Tutorial",
    image: "/placeholder.svg",
    date: "August 5, 2023"
  }
];

// Mock data for recommended products
const recommendedProducts = [
  {
    image: "/placeholder.svg",
    title: "Elgato Stream Deck MK.2",
    price: "$149.99",
    rating: 4.8,
    amazonUrl: "https://amazon.com",
    description: "Customize your stream with 15 LCD keys"
  },
  {
    image: "/placeholder.svg",
    title: "Shure SM7B Microphone",
    price: "$399.00",
    rating: 4.9,
    amazonUrl: "https://amazon.com",
    description: "Industry standard vocal microphone"
  },
  {
    image: "/placeholder.svg",
    title: "Logitech C922x Webcam",
    price: "$99.99",
    rating: 4.7,
    amazonUrl: "https://amazon.com",
    description: "Stream in Full HD 1080p at 60 fps"
  }
];

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-24 bg-muted/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold font-heading tracking-tight">
                Your Hub for Streaming Success
              </h1>
              <p className="text-xl text-muted-foreground">
                Unlock the secrets to captivating content, gear reviews, and expert tips for Twitch, YouTube, and beyond.
              </p>
              <div className="flex space-x-4">
                <Button asChild size="lg">
                  <Link href="/blog">Explore Blog</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/guides">View Guides</Link>
                </Button>
              </div>
            </div>
            <img
              src="https://images.pexels.com/photos/28993052/pexels-photo-28993052/free-photo-of-gamer-playing-video-game-on-desktop-setup.jpeg"
              alt="Streaming Setup"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      
      {/* Featured Articles Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 font-heading">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                image={article.image}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                url={`/blog/${article.slug}`}
                date={article.date}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Recommended Products Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 font-heading">Recommended Gear</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedProducts.map((product, index) => (
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
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/recommended-gear">View All Recommended Gear</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="py-16">
        <NewsletterSignup />
      </section>
    </MainLayout>
  );
};

export default Index;
