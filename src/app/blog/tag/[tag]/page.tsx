import { Metadata } from 'next';
import { wpApiUrl } from '@/config/api';
import BlogList from "@/components/BlogList";

// Fetch blog posts by tag
async function getPostsByTag(tag: string) {
  try {
    // Use the slug parameter to get the exact tag
    const tagsResponse = await fetch(
      wpApiUrl(`tags?slug=${tag}`)
    );
    
    if (!tagsResponse.ok) {
      throw new Error(`Failed to fetch tags: ${tagsResponse.status}`);
    }
    
    const tags = await tagsResponse.json();
    
    // If no tag found, return empty array
    if (!tags.length) {
      console.log(`No tag found with slug: ${tag}`);
      return [];
    }
    
    // Get the tag ID
    const tagId = tags[0].id;
    console.log(`Found tag ID ${tagId} for slug: ${tag}`);
    
    // Now fetch posts with this tag
    const response = await fetch(
      wpApiUrl(`posts?tags=${tagId}&_embed&per_page=100`)
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts = await response.json();
    
    return posts.map((post: any) => {
      // Get featured image if available
      let featuredImage = "/placeholder.svg";
      if (post._embedded && 
          post._embedded['wp:featuredmedia'] && 
          post._embedded['wp:featuredmedia'][0] &&
          post._embedded['wp:featuredmedia'][0].source_url) {
        featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
      }
      
      // Get author name
      let authorName = "Unknown Author";
      if (post._embedded && 
          post._embedded['author'] && 
          post._embedded['author'][0] &&
          post._embedded['author'][0].name) {
        authorName = post._embedded['author'][0].name;
      }
      
      // Get categories
      let categories: string[] = [];
      if (post._embedded && 
          post._embedded['wp:term'] && 
          post._embedded['wp:term'][0]) {
        categories = post._embedded['wp:term'][0].map((term: any) => term.name);
      }
      
      return {
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        date: new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        author: authorName,
        slug: post.slug,
        featuredImage: featuredImage,
        categories: categories,
      };
    });
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.tag;
  
  return {
    title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Articles | StreamGearHub Blog`,
    description: `Browse our articles about ${tag} for streamers and content creators.`,
    openGraph: {
      title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Articles | StreamGearHub Blog`,
      description: `Browse our articles about ${tag} for streamers and content creators.`,
      type: 'website',
    },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const resolvedParams = await params;
  const tag = resolvedParams.tag;
  
  const posts = await getPostsByTag(tag);
  
  return (
    <BlogList 
      initialPosts={posts} 
      title={`Articles tagged "${tag}"`}
      description={`Browse our collection of articles about ${tag} for streamers and content creators.`}
    />
  );
}