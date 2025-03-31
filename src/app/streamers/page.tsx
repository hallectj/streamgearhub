'use client'

import MainLayout from '@/layouts/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Twitch, Youtube, ExternalLink, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';

const placeholderImage = '/images/ImageNotFound.png'

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&#8216;/g, "'")  // Left single quotation mark
    .replace(/&#8217;/g, "'")  // Right single quotation mark
    .replace(/&#8220;/g, '"')  // Left double quotation mark
    .replace(/&#8221;/g, '"')  // Right double quotation mark
    .replace(/&nbsp;/g, ' ');
};

// Client component for the streamers page with search and filtering
export default function StreamersPage() {
  const [streamers, setStreamers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get unique categories from all streamers
  const categories = Array.from(
    new Set(streamers.flatMap(streamer => streamer.categories))
  ).sort();
  
  // Filter streamers based on search and category
  const filteredStreamers = streamers.filter(streamer => {
    const matchesSearch = streamer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || streamer.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });
  
  // Fetch streamers on component mount
  useEffect(() => {
    async function fetchStreamers() {
      try {
        const response = await fetch('/api/streamers');
        if (!response.ok) {
          throw new Error('Failed to fetch streamers');
        }
        const data = await response.json();
        setStreamers(data);
      } catch (error) {
        console.error('Error fetching streamers:', error);
        // Fallback data
        setStreamers([
          {
            name: "xQc",
            slug: "xqc",
            image: "https://pbs.twimg.com/media/F3C4nyTX0AAsn-G?format=jpg&name=medium",
            platforms: ["twitch", "kick"],
            categories: ["FPS", "Variety", "Just Chatting"]
          },
          // Add more fallback streamers if needed
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchStreamers();
  }, []);
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Popular Streamers' Setups</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Discover the gear used by your favorite content creators
      </p>
      
      <div className="flex flex-col space-y-4 mb-8">
        {/* Search bar - styled like the image */}
        <div className="relative">
          <Input
            placeholder="Search streamers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-10 bg-background/50 border-muted"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        {/* Category pills - styled like the image */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted/50 text-foreground hover:bg-muted'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-foreground hover:bg-muted'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading streamers...</p>
        </div>
      )}
      
      {/* Streamers grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStreamers.map((streamer, index) => {
            // Make sure we have a valid slug, use index as fallback
            const validSlug = streamer.slug || `streamer-${index}`;
            const href = `/streamers/${validSlug}`;
            
            return (
              <Link 
                key={streamer.slug || `streamer-${index}`} 
                href={href}
                className="block h-full"
              >
                <Card className="overflow-hidden transition-all hover:shadow-md h-full bg-background/50 border-muted">
                  <div className="aspect-square relative">
                    <Image 
                      src={streamer.image || placeholderImage} 
                      alt={decodeHtmlEntities(streamer.name)} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{decodeHtmlEntities(streamer.name)}</h3>
                    <div className="flex gap-2">
                      {streamer.platforms?.includes('twitch') && (
                        <Twitch className="h-4 w-4 text-[#9146FF]" />
                      )}
                      {streamer.platforms?.includes('youtube') && (
                        <Youtube className="h-4 w-4 text-[#FF0000]" />
                      )}
                      {streamer.platforms?.includes('kick') && (
                        <ExternalLink className="h-4 w-4 text-[#53FC18]" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
      
      {!isLoading && filteredStreamers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No streamers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}