import { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import ProductCard from "@/components/ProductCard";
import NewsletterSignup from "@/components/NewsletterSignup";

// Fetch recent posts from WordPress
async function getRecentPosts() {
  try {
    const response = await fetch(
      'http://localhost/mylocalwp/wp-json/wp/v2/posts?_embed&per_page=3',
      //{ next: { revalidate: 3600 } } // Revalidate every hour
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts = await response.json();
    
    return posts.map((post: any) => {
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
        category: categories.length > 0 ? categories[0] : 'Blog',
      };
    });
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    // Return fallback data in case of error
    return [
      {
        title: "Best Streaming Setup for Beginners",
        excerpt: "Get started with streaming without breaking the bank...",
        date: "March 15, 2025",
        author: "StreamGearHub Team",
        slug: "best-streaming-setup-beginners",
        featuredImage: "/placeholder.svg",
        category: "Guides",
      },
      {
        title: "Top 10 Microphones for Streamers",
        excerpt: "Find the perfect microphone for your streaming needs...",
        date: "March 10, 2025",
        author: "Audio Expert",
        slug: "top-10-microphones-streamers",
        featuredImage: "/placeholder.svg",
        category: "Reviews",
      },
      {
        title: "How to Grow Your Audience on Twitch",
        excerpt: "Proven strategies to increase your viewership and followers...",
        date: "March 5, 2025",
        author: "Marketing Guru",
        slug: "grow-audience-twitch",
        featuredImage: "/placeholder.svg",
        category: "Tips",
      }
    ];
  }
}

// Fetch hero image from WordPress
async function fetchHeroImage() {
  try {
    const res = await fetch("http://localhost/mylocalwp/wp-json/wp/v2/media?search=hero-setup", 
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch hero image: ${res.status}`);
    }
    
    const data = await res.json();
    return data.length > 0 ? data[0].source_url : "http://localhost/mylocalwp/wp-content/uploads/2025/03/hero-setup.jpg";
  } catch (error) {
    console.error('Error fetching hero image:', error);
    return "http://localhost/mylocalwp/wp-content/uploads/2025/03/hero-setup.jpg";
  }
}

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

export const metadata: Metadata = {
  title: 'StreamGearHub - Your Ultimate Resource for Streaming Equipment',
  description: 'Find the best streaming gear, setup guides, and expert reviews to level up your content creation.',
};

export default async function Home() {
  // Fetch recent posts for the blog section
  const recentPosts = await getRecentPosts();
  // Fetch hero image
  const heroImageUrl = await fetchHeroImage();
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/5 dark:to-background">
        <div className="container max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Level Up Your <span className="text-primary">Streaming</span> Setup
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find the best gear, expert reviews, and setup guides to create professional-quality streams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Explore Products
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/guides">
                    Read Guides
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={heroImageUrl} 
                  alt="Professional Streaming Setup" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/10 rounded-lg -z-10"></div>
              <div className="absolute -top-6 -left-6 w-1/2 h-1/2 bg-secondary/10 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Recommended Gear</h2>
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
            <Button variant="outline" asChild className="gap-2">
              <Link href="/recommended-gear">
                View All Recommended Gear
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tips, guides, and news for content creators
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <div key={index} className="card-hover bg-card rounded-lg overflow-hidden border border-border flex flex-col h-full">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <div 
                    className="text-muted-foreground mb-4 line-clamp-3 text-sm"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href="/blog">
                View All Articles
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary/5">
        <div className="container max-w-7xl mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </MainLayout>
  );
}