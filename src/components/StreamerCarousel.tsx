"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCallback } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

// Update interface to match your data structure
interface Streamer {
  title: string;
  slug: string;
  featuredImage?: string; 
  image?: string;
  excerpt: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
    }>;
  };
}

interface StreamerCarouselProps {
  streamers: Streamer[];
}

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&nbsp;/g, ' ');
};

export default function StreamerCarousel({ streamers }: StreamerCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [isHovering, setIsHovering] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Get image from various possible sources
  const getStreamerImage = (streamer: Streamer): string => {
    if (streamer.image) {
      return streamer.image;
    }
    
    if (streamer.featuredImage && streamer.featuredImage !== "/placeholder.svg") {
      return streamer.featuredImage;
    }
    
    if (streamer._embedded && 
        streamer._embedded['wp:featuredmedia'] && 
        streamer._embedded['wp:featuredmedia'][0] &&
        streamer._embedded['wp:featuredmedia'][0].source_url) {
      return streamer._embedded['wp:featuredmedia'][0].source_url;
    }
    
    return "/placeholder.svg";
  };

  // Set up autoplay functionality
  useEffect(() => {
    if (!api || isHovering) {
      // Clear any existing interval when API isn't ready or user is hovering
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    // Start autoplay when API is ready and user isn't hovering
    autoplayRef.current = setInterval(() => {
      api.scrollNext();
    }, 6000); // Scroll every 6 seconds

    // Cleanup function
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [api, isHovering]);

  // Mouse event handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-card border border-border shadow-xl flex-grow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title overlay at the top */}
      <div className="absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-black/70 to-transparent p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Popular Streamer Builds</h2>
      </div>
      
      <Carousel 
        className="w-full" 
        opts={{ loop: true }}
        setApi={setApi}
      >
        <CarouselContent>
          {streamers.map((streamer, index) => {
            const imageUrl = getStreamerImage(streamer);
            const title = decodeHtmlEntities(streamer.title);
            
            return (
              <CarouselItem key={index}>
                <div className="relative h-[400px]">
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      backgroundImage: `url(${imageUrl})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Enhanced gradient to improve text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  </div>
                  
                  <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{title}</h3>
                    <div 
                      className="mb-4 line-clamp-3 text-white/90"
                      dangerouslySetInnerHTML={{ __html: streamer.excerpt }}
                    />
                    <Link 
                      href={`/streamers/${streamer.slug}`}
                      className="inline-flex items-center text-white hover:text-primary transition-colors mt-2"
                    >
                      View Setup <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}