'use client'

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import MainLayout from "@/layouts/MainLayout";
import './guide-content.css'; // We'll create this CSS file for styling the guide content

interface GuideDetailDisplayProps {
  guide: {
    title: string;
    content: string;
    excerpt: string;
    date: string;
    slug: string;
    featuredImage: string;
    difficulty: string;
    readTime: string;
    relatedProducts: {
      title: string;
      price: string;
      image: string;
      rating: number;
      amazonUrl: string;
      description: string;
    }[];
  };
}

const GuideDetailDisplay = ({ guide }: GuideDetailDisplayProps) => {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/guides">
                <ArrowLeft size={16} />
                Back to Guides
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {guide.difficulty}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{guide.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{guide.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{guide.readTime}</span>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden mb-8">
                <img
                  src={guide.featuredImage}
                  alt={guide.title}
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
              <div
                className="guide-content prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />
              
              <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 size={16} className="mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark size={16} className="mr-1" />
                    Save
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <ThumbsUp size={16} className="mr-1" />
                  Helpful
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-bold mb-4">Table of Contents</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#introduction" className="text-muted-foreground hover:text-primary transition-colors">
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a href="#requirements" className="text-muted-foreground hover:text-primary transition-colors">
                        Requirements
                      </a>
                    </li>
                    <li>
                      <a href="#step-1" className="text-muted-foreground hover:text-primary transition-colors">
                        Step 1: Getting Started
                      </a>
                    </li>
                    <li>
                      <a href="#step-2" className="text-muted-foreground hover:text-primary transition-colors">
                        Step 2: Configuration
                      </a>
                    </li>
                    <li>
                      <a href="#conclusion" className="text-muted-foreground hover:text-primary transition-colors">
                        Conclusion
                      </a>
                    </li>
                  </ul>
                </div>
                
                {/* Difficulty level */}
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-bold mb-4">Difficulty Level</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ 
                          width: guide.difficulty === 'Beginner' ? '33%' : 
                                 guide.difficulty === 'Intermediate' ? '66%' : '100%' 
                        }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{guide.difficulty}</span>
                  </div>
                </div>
                
                {/* Related products */}
                {guide.relatedProducts && guide.relatedProducts.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-4">Recommended Products</h3>
                    <div className="space-y-4">
                      {guide.relatedProducts.map((product, index) => (
                        <ProductCard
                          key={index}
                          image={product.image}
                          title={product.title}
                          price={product.price}
                          rating={product.rating}
                          amazonUrl={product.amazonUrl}
                          description={product.description}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GuideDetailDisplay;