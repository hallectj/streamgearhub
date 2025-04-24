import { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import ProductCard from "@/components/ProductCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { wpApiUrl } from "@/config/api"; // Import the helper function

// Fetch recent posts from WordPress
async function getRecentPosts() {
  try {
    const response = await fetch(
      wpApiUrl('posts?_embed&per_page=3'),
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
    // Return empty array instead of fallback data
    return [];
  }
}

// Fetch hero image from WordPress
async function fetchHeroImage() {
  try {
    const res = await fetch(wpApiUrl('media?search=hero-setup'), 
      //{ next: { revalidate: 3600 } }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch hero image: ${res.status}`);
    }
    
    const data = await res.json();
    return data.length > 0 ? data[0].source_url : "/images/placeholder-hero.jpg";
  } catch (error) {
    console.error('Error fetching hero image:', error);
    return "/images/placeholder-hero.jpg";
  }
}

export const metadata: Metadata = {
  title: 'StreamGearHub - Your Ultimate Resource for Streaming Equipment',
  description: 'Find the best streaming gear, setup guides, and expert reviews to level up your content creation.',
};

// Import the fetchReviews function
import { fetchReviews } from '../lib/reviewsService';

// Add a function to process reviews for product cards
async function getReviewsForProductCards() {
  try {
    const reviews = await fetchReviews();
    
    // Take only the first 3 reviews
    return reviews.slice(0, 3).map((review: any) => {
      // Get featured image if available
      let featuredImage = "/placeholder.svg";
      if (review._embedded && 
          review._embedded['wp:featuredmedia'] && 
          review._embedded['wp:featuredmedia'][0] &&
          review._embedded['wp:featuredmedia'][0].source_url) {
        featuredImage = review._embedded['wp:featuredmedia'][0].source_url;
      }
      
      // Extract price, rating, and description from custom fields if available
      let price = "$0.00";
      let rating = 4.5;
      let description = "";
      let slug = "";
      
      // Use custom fields instead of ACF
      if (review.price) price = "$" + review.price.toFixed(2);
      if (review.star_rating) rating = parseFloat(review.star_rating);
      if (review.link) slug = review.slug;
      //if (review.product_short_description) description = review.product_short_description;
      
      return {
        title: review.title.rendered,
        price: price,
        image: featuredImage,
        rating: rating,
        amazonUrl: review.amazon_link || "https://amazon.com",
        description: description || "Check out our review for more details",
        slug: review.slug
      };
    });
  } catch (error) {
    console.error('Error processing reviews for product cards:', error);
    // Return empty array instead of fallback data
    return [];
  }
}

// Add this import instead
import StreamerCarousel from "@/components/StreamerCarousel";

// Add a function to fetch streamers
async function getPopularStreamers() {
  try {
    const response = await fetch(
      wpApiUrl('streamer?_embed&per_page=5'),
      //{ next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch streamers: ${response.status}`);
    }
    
    const streamers = await response.json();
    
    return streamers.map((streamer: any) => {
      // Get featured image if available
      let image = "/placeholder.svg";
      if (streamer._embedded && 
          streamer._embedded['wp:featuredmedia'] && 
          streamer._embedded['wp:featuredmedia'][0] &&
          streamer._embedded['wp:featuredmedia'][0].source_url) {
        image = streamer._embedded['wp:featuredmedia'][0].source_url;
      }
      
      // Also check for streamer_profile_picture or streamer_other_picture
      if (streamer.streamer_profile_picture) {
        image = streamer.streamer_profile_picture;
      } else if (streamer.streamer_other_picture) {
        image = streamer.streamer_other_picture;
      }
      
      return {
        title: streamer.title.rendered,
        slug: streamer.slug,
        image: image, // Use the image property that matches StreamersList
        featuredImage: image, // Keep for backward compatibility
        excerpt: streamer.excerpt.rendered,
        _embedded: streamer._embedded // Pass through the embedded data
      };
    });
  } catch (error) {
    console.error('Error fetching streamers:', error);
    // Return empty array instead of fallback data
    return [];
  }
}

// In your Home component, update Promise.all to include streamers
export default async function Home() {
  // Fetch all data in parallel
  const [recentPosts, heroImageUrl, recommendedProducts, popularStreamers] = await Promise.all([
    getRecentPosts(),
    fetchHeroImage(),
    getReviewsForProductCards(),
    getPopularStreamers()
  ]);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/5 dark:to-background">
        <div className="container max-w-7xl mx-auto px-4 py-20 md:py-32">
          {/* Top Hero Text - Centered */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Level Up Your <span className="text-primary">Streaming</span> Setup
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Find the best gear, expert reviews, and setup guides to create professional-quality streams.
            </p>
            {/* Buttons moved to below the hero image */}
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Hero Image */}
            <div className="flex flex-col h-full">
              <div className="relative h-full">
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl h-full">
                  <img 
                    src={heroImageUrl} 
                    alt="Professional Streaming Setup" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-1/3 h-1/3 bg-primary/10 rounded-lg -z-10"></div>
                <div className="absolute -top-4 -left-4 w-1/4 h-1/4 bg-secondary/10 rounded-lg -z-10"></div>
              </div>
              
              {/* Buttons moved here */}
              <div className="mt-6 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/blog">
                      Explore Our Blog
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/guides">
                      Read Guides
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Streamer Builds Slider */}
            <div className="flex flex-col h-full">
              <StreamerCarousel streamers={popularStreamers} />
              
              <div className="mt-6 text-center">
                <Button variant="outline" asChild className="gap-2">
                  <Link href="/streamers">
                    View All Streamer Builds
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Reviewed Gear</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedProducts.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                title={product.title}
                price={product.price}
                slug={product.slug}
                rating={product.rating}
                amazonUrl={product.amazonUrl}
                description={product.description}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/reviews">
                View All Reviews
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
{/*       <section className="py-20 bg-primary/5">
        <div className="container max-w-7xl mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section> */}
    </MainLayout>
  );
}
