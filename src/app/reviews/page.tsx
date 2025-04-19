import { Metadata } from 'next';
import Reviews from '@/components/Reviews';
// Remove wpApiUrl import if no longer needed here
// import { wpApiUrl } from '@/config/api'; 
import { fetchReviews } from '../../lib/reviewsService'; // Import from the service file

export const metadata: Metadata = {
  title: 'Streaming Gear Reviews | StreamGearHub',
  description: 'Honest, in-depth reviews of the best streaming equipment to elevate your content',
};

// This is a server component that will render the Reviews client component
export default async function ReviewsPage() {
  // Fetch reviews on the server using the imported function
  const reviews = await fetchReviews();
  
  // Pass the reviews data to the client component
  return <Reviews initialReviews={reviews} />;
}

// REMOVE the function definition from this file
/* 
export async function fetchReviews() {
  try {
    const response = await fetch(wpApiUrl('review?_embed&per_page=100'), {
      //next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}
*/