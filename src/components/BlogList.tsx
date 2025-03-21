'use client'

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

// Blog post card component
interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  featuredImage?: string;
  categories: string[];
}

const BlogPostCard = ({ title, excerpt, date, author, slug, featuredImage, categories }: BlogPostProps) => {
  return (
    <div className="card-hover rounded-lg overflow-hidden bg-card border border-muted flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={featuredImage || "/placeholder.svg"} 
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        {categories && categories.length > 0 && (
          <span className="absolute top-3 left-3 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            {categories[0]}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">
          <Link href={`/blog/${slug}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>
        <div 
          className="text-muted-foreground mb-4 line-clamp-3 text-sm"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BlogListProps {
  initialPosts: BlogPostProps[];
}

const BlogList = ({ initialPosts }: BlogListProps) => {
  const [posts] = useState<BlogPostProps[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const categories = ["All", "Guides", "Reviews", "News", "Tips"];
  
  // Filter posts by category (if needed)
  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.categories.includes(activeCategory));
  
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">StreamGearHub Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest news, guides, and reviews for streamers and content creators.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Blog posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogPostCard key={index} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found in this category.</p>
          </div>
        )}
        
        {/* Load more button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="gap-2">
              Load More
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BlogList;