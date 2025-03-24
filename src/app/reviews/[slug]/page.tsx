import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReviewDetail from '@/components/ReviewDetail';

// Generate metadata for the page
//export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element>
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

//export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {

// This is a server component that will render the ReviewDetail client component
export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const review = await fetchReview(resolvedParams.slug);
  
  if (!review) {
    notFound();
  }
  
  // Mock data for recommended accessories
  const recommendedAccessories = [
    {
      title: "Cloudlifter CL-1",
      price: "$149.99",
      image: "/images/accessories/cloudlifter.jpg",
      rating: 4.8,
      amazonUrl: "https://www.amazon.com/Cloud-Microphones-CL-1-Cloudlifter-1-channel/dp/B004MQSV04",
      description: "Mic activator that provides +25dB of clean gain for dynamic microphones"
    },
    {
      title: "RØDE PSA1+ Professional Studio Arm",
      price: "$129.00",
      image: "/images/accessories/rode-psa1.jpg",
      rating: 4.7,
      amazonUrl: "https://www.amazon.com/RODE-PSA1-Professional-Studio-Arm/dp/B001D7UYBO",
      description: "Professional studio boom arm with internal springs and 360-degree rotation"
    },
    {
      title: "Focusrite Scarlett 2i2",
      price: "$179.99",
      image: "/images/accessories/scarlett-2i2.jpg",
      rating: 4.9,
      amazonUrl: "https://www.amazon.com/Focusrite-Scarlett-Audio-Interface-Tools/dp/B07QR6Z1JB",
      description: "USB audio interface with two high-quality mic preamps for streaming and recording"
    }
  ];
  
  return <ReviewDetail review={review} relatedProducts={recommendedAccessories} />;
}

// Server-side function to fetch a single review
async function fetchReview(slug: string) {
  try {
    const response = await fetch(`http://localhost/mylocalwp/wp-json/wp/v2/review?slug=${slug}&_embed`, {
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