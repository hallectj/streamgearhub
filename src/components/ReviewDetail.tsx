'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MainLayout from "@/layouts/MainLayout";
import { ShareButtons } from "@/components/ShareButtons";
import ProductCard from "@/components/ProductCard";
import "@/styles/content-styles.css"; // Import the content styles
import { SITE_URL } from '@/config/api';
import { appendAmazonAffiliateTag } from '@/lib/amazon'; // Add this import

// Update the interface to match the actual API response
interface ReviewData {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  star_rating: number;
  pros: string[];
  cons: string[];
  verdict: string;
  amazon_link: string;
  price: number;
  featured_media: number;
  categories: number[];
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

interface RelatedProduct {
  title: string;
  price: string;
  image: string;
  rating: number;
  amazonUrl: string;
  description: string;
}

interface ReviewDetailProps {
  review: ReviewData;
  relatedProducts?: RelatedProduct[];
}

const ReviewDetail = ({ review, relatedProducts = [] }: ReviewDetailProps) => {
  // No need for useState, useEffect, or loading states since we get the data from props
  
  // Get category name from embedded terms
  const category = review._embedded?.['wp:term']?.[0]?.[0]?.name || 'Gear';
  
  // Get featured image URL
  const featuredImage = review._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg';
  
  // Format price as USD
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(review.price);

  // Render stars based on rating
  // Update the renderStars function in ReviewDetail.tsx
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(review.star_rating);
    const hasHalfStar = review.star_rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`}
          className="w-5 h-5 text-yellow-400 fill-yellow-400"
        />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-5 h-5">
          <Star className="absolute w-5 h-5 text-gray-300" />
          <div className="absolute w-2.5 h-5 overflow-hidden">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      );
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300"
        />
      );
    }
    
    return stars;
  };
  
  // Also update where the rating is displayed
  <span className="text-lg font-medium">{review.star_rating.toFixed(1)}/5</span>
  
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
                  {category}
                </span>
              </div>
              
              {/* Review title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {review.title.rendered}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {renderStars()}
                </div>
                <span className="text-lg font-medium">{review.star_rating}/5</span>
              </div>

              {/* Featured image */}
              <div className="rounded-lg overflow-hidden mb-8 bg-card p-8 border border-muted flex justify-center">
                <img 
                  src={featuredImage} 
                  alt={review.title.rendered}
                  className="max-h-80 object-contain"
                />
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-100 dark:border-green-900">
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">Pros</h3>
                  <ul className="space-y-2">
                    {review.pros.map((pro, index) => (
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
                    {review.cons.map((con, index) => (
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

              {/* Review content - Apply the guide-content class */}
              <div 
                className="guide-content mb-8"
                dangerouslySetInnerHTML={{ __html: review.content.rendered }}
              />
              
              {/* Buy button */}
              <div className="mt-8 mb-12">
                // Process the Amazon URL to include the affiliate tag
                const affiliateUrl = review.amazon_link ? appendAmazonAffiliateTag(review.amazon_link) : '#';
                
                // Update the Buy on Amazon button
                <Button size="lg" asChild className="gap-2">
                  <a href={review.amazon_link ? appendAmazonAffiliateTag(review.amazon_link) : '#'} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart size={18} />
                    Buy on Amazon - {formattedPrice}
                  </a>
                </Button>
              </div>
              
              {/* Article actions */}
              <div className="flex items-center justify-between py-6 border-t border-b border-border mb-8">
                <ShareButtons 
                  title={review.title.rendered} 
                  url={typeof window !== 'undefined' 
                    ? window.location.href 
                    : `${SITE_URL}/reviews/${review.slug}`} 
                />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Price card */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-bold mb-2">Price</h3>
                <p className="text-2xl font-bold text-primary mb-4">{formattedPrice}</p>
                <Button asChild className="w-full">
                  <a href={review.amazon_link} target="_blank" rel="noopener noreferrer">
                    View on Amazon
                  </a>
                </Button>
              </div>

              {/* Related products */}
              {relatedProducts && relatedProducts.length > 0 && (
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-bold mb-4">Recommended Accessories</h3>
                  <div className="space-y-4">
                    // Update the related products section
                    <div className="grid grid-cols-1 gap-6">
                      {relatedProducts.map((product, index) => (
                        <ProductCard
                          key={index}
                          image={product.image}
                          title={product.title}
                          price={product.price}
                          slug=""
                          rating={product.rating}
                          amazonUrl={appendAmazonAffiliateTag(product.amazonUrl)}
                          description={product.description}
                        />
                      ))}
                    </div>
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