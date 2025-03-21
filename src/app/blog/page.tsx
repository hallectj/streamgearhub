import { Metadata } from 'next';
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import BlogList from "@/components/BlogList";

// Fetch blog posts on the server
async function getBlogPosts() {
  try {
    const response = await fetch(
      `http://localhost/mylocalwp/wp-json/wp/v2/posts?_embed&per_page=9`,
      { next: { revalidate: 3600 } } // Revalidate every hour
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
    console.error('Error fetching posts:', error);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Blog | StreamGearHub',
  description: 'Latest news, guides, and reviews for streamers and content creators.',
  openGraph: {
    title: 'Blog | StreamGearHub',
    description: 'Latest news, guides, and reviews for streamers and content creators.',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  return (
    <BlogList initialPosts={posts} />
  );
}