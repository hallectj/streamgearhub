import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  rating: number;
  amazonUrl: string;
  description: string;
}

const ProductCard = ({ image, title, price, rating, amazonUrl, description }: ProductCardProps) => {
  // Render stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-3 h-3 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex gap-3 p-3 rounded-lg border border-muted bg-card">
      <div className="flex-shrink-0 w-20 h-20 bg-muted rounded flex items-center justify-center">
        <img src={image} alt={title} className="max-w-full max-h-full p-1" />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-medium text-sm line-clamp-1">{title}</h4>
        <div className="flex items-center mt-1 mb-1">
          {renderStars()}
          <span className="ml-1 text-xs text-muted-foreground">({rating})</span>
        </div>
        <p className="text-sm font-bold text-primary">{price}</p>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{description}</p>
        <Button 
          asChild 
          variant="link" 
          className="h-auto p-0 text-xs mt-1"
        >
          <a href={amazonUrl} target="_blank" rel="noopener noreferrer">
            View on Amazon
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
