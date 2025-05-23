'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, ThumbsUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import MainLayout from "@/layouts/MainLayout";
import { ShareButtons } from "@/components/ShareButtons";
import '../styles/content-styles.css'; // Import the shared styles
import { SITE_URL } from '@/config/api';
import { appendAmazonAffiliateTag } from '@/lib/amazon'; // Add this import

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
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll('h2, h3, h4');
    const sectionIds = Array.from(sections).map(section => section.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset to trigger a bit earlier

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }

      // If we're at the top of the page and no section is active
      if (scrollPosition < 300 && sectionIds.length > 0) {
        setActiveSection(sectionIds[0]);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Table of contents items
  const tocItems = [
    { id: "introduction", label: "Introduction" },
    { id: "requirements", label: "Requirements" },
    { id: "step-1", label: "Step 1: Getting Started" },
    { id: "step-2", label: "Step 2: Configuration" },
    { id: "conclusion", label: "Conclusion" }
  ];

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
                <ShareButtons title={guide.title} url={typeof window !== 'undefined' 
                  ? window.location.href 
                  : `${SITE_URL}/guides/${guide.slug}`} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-bold mb-4">Table of Contents</h3>
                  <ul className="space-y-2">
                    {tocItems.map((item) => (
                      <li key={item.id} className="flex items-center">
                        {activeSection === item.id && (
                          <ChevronRight size={16} className="text-primary mr-1 flex-shrink-0" />
                        )}
                        <a 
                          href={`#${item.id}`} 
                          className={`${
                            activeSection === item.id 
                              ? "text-primary font-medium" 
                              : "text-muted-foreground"
                          } hover:text-primary transition-colors ${
                            activeSection === item.id ? "" : "ml-6"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
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
                      <div className="grid grid-cols-1 gap-6">
                        {guide.relatedProducts.map((product, index) => (
                          <ProductCard
                            key={index}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            slug=""
                            rating={product.rating}
                            amazonUrl={appendAmazonAffiliateTag(product.amazonUrl)}
                            description={product.description}
                          />
                        ))}
                      </div>
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