import BlogPost from "@/pages/BlogPost";
import { notFound } from "next/navigation";

// This is a dynamic route that will match URLs like /blog/best-capture-cards
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Await the params object before accessing its properties
  const resolvedParams = await Promise.resolve(params);
  
  // Pass the slug from the URL to the BlogPost component
  return <BlogPost slug={resolvedParams.slug} />;
}