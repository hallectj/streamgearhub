import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { appendAmazonAffiliateTag } from '@/lib/amazon';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  slug: string;
  rating: number;
  amazonUrl: string;
  description: string;
}

const ProductCard = ({ image, title, price, slug, rating, amazonUrl, description }: ProductCardProps) => {
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

  // Process the Amazon URL to include the affiliate tag
  const affiliateUrl = appendAmazonAffiliateTag(amazonUrl);

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card/50 hover:bg-card transition-colors h-full">
      {/* Product header with image and details */}
      <div className="p-4 flex gap-4">
        <div className="w-24 h-24 rounded bg-muted flex-shrink-0 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 flex flex-col">
          <h4 className="font-medium text-sm mb-1">
            {slug ? (
              <Link href={`/reviews/${slug}`} className="hover:text-primary transition-colors">
                {title}
              </Link>
            ) : (
              <span>{title}</span>
            )}
          </h4>
          <div className="flex items-center gap-1 mb-1">
            <div className="flex">
              {renderStars()}
            </div>
            <span className="text-xs text-muted-foreground">{rating.toFixed(1)}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          <span className="text-sm font-medium text-primary mt-1">{price}</span>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="p-3 pt-0 mt-auto border-t border-border/50">
        <div className="flex gap-2">
          <Button size="sm" asChild className="flex-1">
            <Link href={slug ? `/reviews/${slug}` : '#'}>
              Read Review
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild className="flex-1">
            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
              Buy on Amazon
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
