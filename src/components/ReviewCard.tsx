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

const ReviewCard = ({ title, excerpt, rating, category, image, slug }: ReviewCardProps) => {
  // Generate stars based on rating
  const stars = Array(5).fill(0).map((_, i) => (
    <Star 
      key={i} 
      size={16} 
      className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
    />
  ));

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
          {stars}
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