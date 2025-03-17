
import React from 'react';
import { Star } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  rating: number;
  amazonUrl: string;
  description?: string;
}

const ProductCard = ({ image, title, price, rating, amazonUrl, description }: ProductCardProps) => {
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
        
        {description && (
          <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{description}</p>
        )}
        
        <div className="mt-auto">
          <div className="text-xl font-bold text-primary mb-3">{price}</div>
          <a 
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full flex justify-center items-center text-center"
          >
            View on Amazon
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
