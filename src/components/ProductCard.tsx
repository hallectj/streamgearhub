import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { appendAmazonAffiliateTag } from '@/lib/amazon'; // Import the utility function

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

  // Rest of the component remains the same, but use affiliateUrl instead of amazonUrl
  return (
    <div className="flex flex-col gap-3 p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors h-full">
      <div className='flex gap-3'>
        <div className="w-16 h-16 rounded bg-muted flex-shrink-0 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
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
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{description}</p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">{price}</span>
          <Button variant="outline" size="sm" asChild className="h-7 text-xs px-2">
            <a href={amazonUrl} target="_blank" rel="noopener noreferrer">
              View on Amazon
            </a>
          </Button>
        </div>
      </div>
      
      {/* Use the processed URL with the affiliate tag */}
      <div className="p-4 mt-auto">
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={slug ? `/reviews/${slug}` : '#'}>
              Read Review
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
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
