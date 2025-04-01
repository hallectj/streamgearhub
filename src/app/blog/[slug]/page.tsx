import { Metadata } from 'next';
import { notFound } from "next/navigation";
import BlogPostDisplay from "@/components/BlogPostDisplay";
import { wpApiUrl } from '@/config/api'; // Import the helper function

// Fetch related posts based on category and tags
async function getRelatedPosts(currentSlug: string, category: string, tags: string[], limit = 2) {
  try {
    // First try to get posts with the same category name
    // We need to get all posts and filter them since we have the category name, not ID
    const allPostsResponse = await fetch(
      wpApiUrl(`posts?per_page=${limit + 1}&_embed`)
    );
    
    if (!allPostsResponse.ok) {
      throw new Error(`Failed to fetch posts: ${allPostsResponse.status}`);
    }
    
    const allPosts = await allPostsResponse.json();
    
    // Filter posts to exclude current post and match category
    let relatedPosts = allPosts
      .filter((post: any) => post.slug !== currentSlug)
      .filter((post: any) => {
        if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
          const postCategories = post._embedded['wp:term'][0].map((term: any) => term.name);
          return postCategories.includes(category);
        }
        return false;
      })
      .slice(0, limit);
    
    // If we don't have enough posts from the same category, add posts with similar tags
    if (relatedPosts.length < limit) {
      const remainingPosts = allPosts
        .filter((post: any) => post.slug !== currentSlug)
        .filter((post: any) => !relatedPosts.some((rp: any) => rp.id === post.id))
        .filter((post: any) => {
          if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][1]) {
            const postTags = post._embedded['wp:term'][1].map((term: any) => term.name);
            return tags.some(tag => postTags.includes(tag));
          }
          return false;
        })
        .slice(0, limit - relatedPosts.length);
      
      relatedPosts = [...relatedPosts, ...remainingPosts];
    }
    
    // Format the related posts
    return relatedPosts.map((post: any) => {
      // Get featured image if available
      let featuredImage = "/placeholder.svg";
      if (post._embedded && 
          post._embedded['wp:featuredmedia'] && 
          post._embedded['wp:featuredmedia'][0] &&
          post._embedded['wp:featuredmedia'][0].source_url) {
        featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
      }
      
      return {
        title: post.title.rendered,
        date: new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        slug: post.slug,
        image: featuredImage
      };
    });
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Fetch the post data on the server
async function getPost(slug: string) {
  try {
    const response = await fetch(
      wpApiUrl(`posts?slug=${slug}&_embed`),
      //{ next: { revalidate: 3600 } } // Revalidate every hour
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.length) {
      return null;
    }
    
    const wpPost = data[0];
    
    // Get featured image if available
    let featuredImage = "/placeholder.svg";
    if (wpPost._embedded && 
        wpPost._embedded['wp:featuredmedia'] && 
        wpPost._embedded['wp:featuredmedia'][0] &&
        wpPost._embedded['wp:featuredmedia'][0].source_url) {
      featuredImage = wpPost._embedded['wp:featuredmedia'][0].source_url;
    }
    
    // Get author name
    let authorName = "Unknown Author";
    if (wpPost._embedded && 
        wpPost._embedded['author'] && 
        wpPost._embedded['author'][0] &&
        wpPost._embedded['author'][0].name) {
      authorName = wpPost._embedded['author'][0].name;
    }
    
    // Get categories
    let categories: string[] = [];
    if (wpPost._embedded && 
        wpPost._embedded['wp:term'] && 
        wpPost._embedded['wp:term'][0]) {
      categories = wpPost._embedded['wp:term'][0].map((term: any) => term.name);
    }
    
    // Get tags
    let tags: string[] = [];
    if (wpPost._embedded && 
        wpPost._embedded['wp:term'] && 
        wpPost._embedded['wp:term'][1]) {
      tags = wpPost._embedded['wp:term'][1].map((term: any) => term.name);
    }
    
    // Extract meta description from Yoast SEO data if available
    let metaDescription = '';
    if (wpPost.yoast_head) {
      const ogDescriptionMatch = wpPost.yoast_head.match(/<meta property="og:description" content="([^"]+)"/);
      if (ogDescriptionMatch && ogDescriptionMatch[1]) {
        metaDescription = ogDescriptionMatch[1]
          .replace(/&hellip;/g, '...')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
      }
    }
    
    // Fallback to excerpt if no Yoast meta description
    if (!metaDescription) {
      metaDescription = wpPost.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
    }
    
    // Calculate read time (rough estimate)
    const wordCount = wpPost.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200) + ' min read'; // Assuming 200 words per minute
    
    // Get recommended products from meta field if available
    const mini_recommended_products = typeof wpPost.mini_recommended_products === 'string' 
      ? wpPost.mini_recommended_products 
      : JSON.stringify(wpPost.mini_recommended_products);
    
    return {
      title: wpPost.title.rendered,
      content: wpPost.content.rendered,
      excerpt: wpPost.excerpt.rendered,
      metaDescription, // Add the extracted meta description
      date: new Date(wpPost.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      author: authorName,
      readTime,
      coverImage: featuredImage,
      category: categories.length > 0 ? categories[0] : 'Blog',
      tags: tags.length > 0 ? tags : ['streaming'],
      mini_recommended_products,
      relatedProducts: [],
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params;
  
  if (!resolvedParams.slug) {
    return {
      title: 'Post Not Found | StreamGearHub',
      description: 'The requested blog post could not be found.'
    };
  }
  
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | StreamGearHub',
      description: 'The requested blog post could not be found.'
    };
  }
  
  return {
    title: `${post.title} | StreamGearHub Blog`,
    description: post.metaDescription, // Use the extracted meta description
    openGraph: {
      title: post.title,
      description: post.metaDescription, // Use the extracted meta description
      images: [post.coverImage],
      type: 'article',
    },
    metadataBase: new URL('http://localhost:3000'),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }>}) {
  const resolvedParams = await params;
  
  if (!resolvedParams.slug) {
    return notFound();
  }
  
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    return notFound();
  }
  
  // Fetch related posts based on the current post's category and tags
  const relatedPosts = await getRelatedPosts(
    resolvedParams.slug,
    post.category,
    post.tags
  );
  
  return <BlogPostDisplay post={post} relatedPosts={relatedPosts} />;
}
