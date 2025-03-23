import { Metadata } from 'next';
import { notFound } from "next/navigation";
import BlogPostDisplay from "@/components/BlogPostDisplay";

// Fetch the post data on the server
async function getPost(slug: string) {
  try {
    const response = await fetch(
      `http://localhost/mylocalwp/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } } // Revalidate every hour
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
    
    // Calculate read time (rough estimate)
    const wordCount = wpPost.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200) + ' min read'; // Assuming 200 words per minute
    
    return {
      title: wpPost.title.rendered,
      content: wpPost.content.rendered,
      excerpt: wpPost.excerpt.rendered,
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
      relatedProducts: [
        {
          title: "Elgato Stream Deck MK.2",
          price: "$149.99",
          image: "/placeholder.svg",
          rating: 4.8,
          amazonUrl: "https://amazon.com",
          description: "Customize your stream with 15 LCD keys",
        },
        {
          title: "Shure SM7B Vocal Microphone",
          price: "$399.00",
          image: "/placeholder.svg",
          rating: 4.9,
          amazonUrl: "https://amazon.com",
          description: "Industry standard vocal microphone",
        },
      ],
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
    description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
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
  
  return <BlogPostDisplay post={post} />;
}
