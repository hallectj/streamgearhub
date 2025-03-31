import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReviewDetail from '@/components/ReviewDetail';
import { wpApiUrl, customApiUrl } from '@/config/api'; // Import the helper functions

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const review = await fetchReview(resolvedParams.slug);
  
  if (!review) {
    return {
      title: 'Review Not Found | StreamGearHub',
      description: 'The review you are looking for could not be found.',
    };
  }
  
  return {
    title: `${review.title.rendered} | StreamGearHub Reviews`,
    description: review.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160),
  };
}

// This is a server component that will render the ReviewDetail client component
export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const review = await fetchReview(resolvedParams.slug);
  
  if (!review) {
    notFound();
  }
  
  // Fetch recommended accessories from the API
  let recommendedAccessories = [];
  try {
    const accessoriesResponse = await fetch(
      customApiUrl('products')
    );
    
    if (accessoriesResponse.ok) {
      const accessoriesData = await accessoriesResponse.json();
      recommendedAccessories = accessoriesData.map(product => ({
        title: product.title || "Product",
        price: "$" + product.price || "$0.00",
        image: product.product_url || "/placeholder.svg",
        rating: product.rating || 4.5,
        amazonUrl: product.amazon_url || "https://amazon.com",
        description: product.description || "Check out this recommended product",
        slug: "" // No slug available from the API data
      }));
    }
  } catch (error) {
    console.error('Error fetching recommended accessories:', error);
    // No fallback needed as per your instructions
  }
  
  return <ReviewDetail review={review} relatedProducts={recommendedAccessories} />;
}

// Server-side function to fetch a single review
async function fetchReview(slug: string) {
  try {
    const response = await fetch(wpApiUrl(`review?slug=${slug}&_embed`), {
      //next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch review');
    }
    
    const reviews = await response.json();
    
    // The API returns an array, so we need to get the first item
    if (reviews && Array.isArray(reviews) && reviews.length > 0) {
      return reviews[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching review:', error);
    return null;
  }
}