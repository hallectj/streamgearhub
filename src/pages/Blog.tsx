
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock blog data
const blogPosts = [
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
  },
  {
    slug: "best-streaming-microphones",
    title: "Top 5 Streaming Microphones for Every Budget",
    excerpt: "From budget-friendly to pro-level, find the perfect microphone to make your voice sound crystal clear.",
    category: "Gear",
    image: "/placeholder.svg",
    date: "July 22, 2023"
  },
  {
    slug: "streaming-pc-build-guide",
    title: "Ultimate Streaming PC Build Guide for 2023",
    excerpt: "Component recommendations and build instructions for a PC that can handle both gaming and streaming.",
    category: "Build Guide",
    image: "/placeholder.svg",
    date: "July 15, 2023"
  },
  {
    slug: "monetize-your-stream",
    title: "10 Ways to Monetize Your Stream Beyond Subscriptions",
    excerpt: "Diversify your income streams with these proven monetization strategies for content creators.",
    category: "Business",
    image: "/placeholder.svg",
    date: "July 8, 2023"
  }
];

// Recent posts (for sidebar)
const recentPosts = blogPosts.slice(0, 3);

// Recommended products (for sidebar)
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
  }
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search query
  const filteredPosts = searchQuery 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted/50 py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Streaming Blog</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Expert guides, reviews, and tips for streaming success
          </p>
          
          {/* Search bar */}
          <div className="flex max-w-md">
            <Input 
              type="search" 
              placeholder="Search articles..." 
              className="mr-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - Article listings */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <ArticleCard 
                    key={post.slug}
                    image={post.image} 
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.category}
                    url={`/blog/${post.slug}`}
                    date={post.date}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* In case you missed it */}
            <Card>
              <CardHeader>
                <CardTitle>In Case You Missed It</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.slug} className="flex items-start space-x-4">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="font-medium hover:text-primary line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">
                        {post.date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Recommended gear */}
            <div>
              <h3 className="text-lg font-bold mb-4">Recommended Gear</h3>
              <div className="space-y-4">
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
            </div>
            
            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Subscribe to Our Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest streaming tips and gear reviews delivered to your inbox.
                </p>
                <form className="space-y-2">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full"
                  />
                  <Button className="w-full">Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
