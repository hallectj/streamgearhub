import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ReviewCardProps {
  title: string;
  excerpt: string;
  rating: number;
  category: string;
  image: string;
  slug: string;
}

// Update the stars generation in ReviewCard.tsx
const ReviewCard = ({ title, excerpt, rating, category, image, slug }: ReviewCardProps) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`}
          size={16} 
          className="fill-yellow-400 text-yellow-400"
        />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative" style={{ width: '16px', height: '16px' }}>
          <Star size={16} className="absolute text-gray-300" />
          <div className="absolute overflow-hidden" style={{ width: '8px', height: '16px' }}>
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star 
          key={`empty-${i}`}
          size={16} 
          className="text-gray-300"
        />
      );
    }
    
    return stars;
  };

  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 right-2">{category}</Badge>
      </div>
      <CardContent className="pt-6 flex-grow">
        <div className="flex items-center mb-2">
          {renderStars()}
          <span className="ml-1 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <div 
          className="text-muted-foreground line-clamp-3 text-sm"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </CardContent>
      <CardFooter>
        <Link 
          href={`/reviews/${slug}`} 
          className="text-primary font-medium hover:underline"
        >
          Read Full Review
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;