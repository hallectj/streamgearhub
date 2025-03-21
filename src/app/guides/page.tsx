import { Metadata } from 'next';
import GuidesDisplay from '@/components/GuidesDisplay';

// Fetch guides on the server
async function getGuides() {
  try {
    const response = await fetch(
      'http://localhost/mylocalwp/wp-json/wp/v2/guides?_embed',
      { next: { revalidate: 3600 } } // Revalidate every hour
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
      
      // Determine difficulty (this would need to be added as custom field in WordPress)
      // For now, we'll randomly assign a difficulty
      const difficulties = ["Beginner", "Intermediate", "Advanced"];
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      
      return {
        title: guide.title.rendered,
        excerpt: guide.excerpt.rendered,
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