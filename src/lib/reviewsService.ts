import { wpApiUrl } from '@/config/api';

// Server-side function to fetch reviews
export async function fetchReviews() {
  try {
    const response = await fetch(wpApiUrl('review?_embed&per_page=100'), {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      // Consider more specific error handling based on status code if needed
      throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
    }
    
    // Add basic type safety if possible, otherwise use 'any'
    const reviewsData: any[] = await response.json(); 
    return reviewsData;

  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Return an empty array or handle the error appropriately for the UI
    return []; 
  }
}

// You could add more review-related fetching functions here in the future