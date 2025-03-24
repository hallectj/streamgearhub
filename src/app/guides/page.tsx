import { Metadata } from 'next';
import GuidesDisplay from '@/components/GuidesDisplay';

const getDifficulty = (guide) => {
  if (!guide?._embedded?.['wp:term']) {
    return 'beginner'; // Fallback if no terms are embedded
  }

  const difficultyTerm = guide._embedded['wp:term']
    .flat() // Flatten the array of term arrays
    .find(term => term.taxonomy === 'difficulty');

  return difficultyTerm?.name || 'beginner'; // Use term name or fallback
};

// Fetch guides on the server
async function getGuides() {
  try {
    const response = await fetch(
      'http://localhost/mylocalwp/wp-json/wp/v2/guides?_embed',
      //{ next: { revalidate: 3600 } } // Revalidate every hour
      { cache: 'no-store' }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch guides: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((guide: any) => {
      // Get featured image if available
      let featuredImage = "/placeholder.svg";
      if (guide.uagb_featured_image_src && guide.uagb_featured_image_src.full) {
        featuredImage = guide.uagb_featured_image_src.full[0];
      } else if (guide._embedded && 
          guide._embedded['wp:featuredmedia'] && 
          guide._embedded['wp:featuredmedia'][0] &&
          guide._embedded['wp:featuredmedia'][0].source_url) {
        featuredImage = guide._embedded['wp:featuredmedia'][0].source_url;
      }
      
      // Calculate read time (rough estimate)
      const wordCount = guide.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200) + ' min read'; // Assuming 200 words per minute
      const difficulty = getDifficulty(guide);
      
      return {
        title: guide.title.rendered,
        excerpt: guide.excerpt.rendered
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .substring(0, 150) + '...', // Limit to 150 characters and add ellipsis
        date: new Date(guide.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        slug: guide.slug,
        featuredImage,
        difficulty,
        readTime
      };
    });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Streaming Guides | StreamGearHub',
  description: 'Step-by-step tutorials to help you level up your streaming setup and skills',
  openGraph: {
    title: 'Streaming Guides | StreamGearHub',
    description: 'Step-by-step tutorials to help you level up your streaming setup and skills',
    type: 'website',
  },
};

export default async function GuidesPage() {
  const guides = await getGuides();
  
  return <GuidesDisplay initialGuides={guides} />;
}