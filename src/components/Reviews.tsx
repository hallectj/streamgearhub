'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { wpApiUrl } from "@/config/api"; // Import the helper function

// Review card component
interface ReviewCardProps {
  image: string;
  title: string;
  price: string;
  rating: number;
  snippet: string;
  slug: string;
}

const ReviewCard = ({ image, title, price, rating, snippet, slug }: ReviewCardProps) => {
  // Render stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="card-hover rounded-lg overflow-hidden bg-card border border-muted flex flex-col h-full">
      <div className="relative pt-4 px-4 flex justify-center">
        <img 
          src={image} 
          alt={title}
          className="h-48 object-contain"
        />
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center mb-1">
          {renderStars()}
          <span className="ml-1 text-xs text-foreground/70">({rating}/5)</span>
        </div>
        
        <h3 className="font-semibold mb-1 line-clamp-2">{title}</h3>
        <p className="text-primary font-bold mb-2">{price}</p>
        
        <p className="text-sm text-foreground/80 mb-3 line-clamp-3">{snippet}</p>
        
        <div className="mt-auto">
          <Button asChild className="w-full">
            <Link href={`/reviews/${slug}`}>Read Full Review</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Category section component
interface CategorySectionProps {
  title: string;
  reviews: ReviewCardProps[];
}

const CategorySection = ({ title, reviews }: CategorySectionProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Show only first 3 reviews initially
  const visibleReviews = expanded ? reviews : reviews.slice(0, 3);
  
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 font-heading">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleReviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
      
      {reviews.length > 3 && (
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => setExpanded(!expanded)}
            className="gap-2"
          >
            {expanded ? "Show Less" : `See More ${title} Reviews`}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      )}
    </section>
  );
};

// Interface for WordPress API response
interface WordPressReview {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  star_rating: number;
  price: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

interface ReviewsProps {
  initialReviews: WordPressReview[];
}

const Reviews = ({ initialReviews = [] }: ReviewsProps) => {
  const [reviewsByCategory, setReviewsByCategory] = useState<Record<string, ReviewCardProps[]>>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(initialReviews.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have initial reviews from the server, process them
    if (initialReviews.length > 0) {
      processReviews(initialReviews);
      return;
    }

    // Otherwise fetch them client-side
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(wpApiUrl('review?_embed&per_page=100'));
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data: WordPressReview[] = await response.json();
        processReviews(data);
        
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, [initialReviews]);

  // Function to process reviews data
  const processReviews = (data: WordPressReview[]) => {
    const reviewsByCategory: Record<string, ReviewCardProps[]> = {};
    const categorySet = new Set<string>();
    
    data.forEach(review => {
      // Get the category from embedded terms
      const category = review._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
      categorySet.add(category);
      
      // Get the featured image URL
      const imageUrl = review._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg';
      
      // Format price as USD
      const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(review.price);
      
      // Create a review card object
      const reviewCard: ReviewCardProps = {
        image: imageUrl,
        title: review.title.rendered,
        price: formattedPrice,
        rating: review.star_rating,
        snippet: review.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150) + "...",
        slug: review.slug
      };
      
      // Add to the category
      if (!reviewsByCategory[category]) {
        reviewsByCategory[category] = [];
      }
      reviewsByCategory[category].push(reviewCard);
    });
    
    setReviewsByCategory(reviewsByCategory);
    setCategories(Array.from(categorySet));
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Streaming Gear Reviews</h1>
          <p className="text-xl mb-8">Loading reviews...</p>
        </div>
      </MainLayout>
    );
  }

  if (error && Object.keys(reviewsByCategory).length === 0) {
    return (
      <MainLayout>
        <div className="container max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Streaming Gear Reviews</h1>
          <p className="text-xl text-red-500 mb-8">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Streaming Gear Reviews</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Honest, in-depth reviews of the best streaming equipment to elevate your content
        </p>
        
        {categories.map(category => (
          <CategorySection 
            key={category} 
            title={category} 
            reviews={reviewsByCategory[category] || []} 
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Reviews;