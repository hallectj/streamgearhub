'use client'

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import { ShareButtons } from "@/components/ShareButtons";
import { usePathname } from 'next/navigation';

// Guide card component interface
interface GuideProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  featuredImage?: string;
  difficulty?: string;
  readTime?: string;
  url?: string;
}

const GuideCard = ({ title, excerpt, date, slug, featuredImage, difficulty, readTime, url }: GuideProps) => {
  // Generate the full URL if not provided
  const pathname = usePathname();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://streamgearhub.com';
  const fullUrl = url || `${baseUrl}/guides/${slug}`;
  
  return (
    <div className="card-hover rounded-lg overflow-hidden bg-card border border-muted flex flex-col h-full">
      <div className="relative">
        <img 
          src={featuredImage || "/placeholder.svg"} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        {difficulty && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              {difficulty}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <div className="flex items-center mr-4">
            <BookOpen size={14} className="mr-1" />
            <span>Guide</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
          {readTime && (
            <div className="flex items-center ml-4">
              <Clock size={14} className="mr-1" />
              <span>{readTime}</span>
            </div>
          )}
        </div>
        
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <div 
          className="text-muted-foreground mb-4 flex-grow"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        
        <div className="flex flex-col gap-3 mt-auto">
          <ShareButtons title={title} url={fullUrl} />
          
          <Button asChild variant="outline" className="w-full justify-between">
            <Link href={`/guides/${slug}`}>
              Read Guide
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

interface GuidesDisplayProps {
  initialGuides: GuideProps[];
}

const GuidesDisplay = ({ initialGuides }: GuidesDisplayProps) => {
  const [guides] = useState<GuideProps[]>(initialGuides);
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter guides based on active filter
  const filteredGuides = activeFilter === "All" 
    ? guides 
    : guides.filter(guide => guide.difficulty === activeFilter);

  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Streaming Guides</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Step-by-step tutorials to help you level up your streaming setup and skills
        </p>
        
        {/* Difficulty filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Beginner", "Intermediate", "Advanced"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>
        
        {filteredGuides.length === 0 ? (
          <div className="text-center py-12">
            <p>No guides found for the selected difficulty level.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => (
              <GuideCard key={index} {...guide} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GuidesDisplay;