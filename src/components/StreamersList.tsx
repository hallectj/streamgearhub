'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Twitch, Youtube, ExternalLink } from 'lucide-react';

interface Streamer {
  name: string;
  slug: string;
  image: string;
  platforms: string[];
  categories: string[];
}

interface StreamersListProps {
  streamers: Streamer[];
}

// Add this helper function to decode HTML entities
// Replace the current decodeHtmlEntities function with this one
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

const StreamersList = ({ streamers }: StreamersListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(
    new Set(streamers.flatMap(streamer => streamer.categories))
  );
  
  // Filter streamers based on search and category
  const filteredStreamers = streamers.filter(streamer => {
    const matchesSearch = streamer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || streamer.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search and filters section - make more prominent */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Find Streamers</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Search with button */}
          <div className="w-full md:w-64 relative">
            <div className="flex">
              <Input
                placeholder="Search streamers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-r-none"
              />
              <button 
                className="bg-primary text-primary-foreground px-4 rounded-r-md hover:bg-primary/90"
                onClick={() => {/* Search already happens on input change */}}
              >
                Search
              </button>
            </div>
          </div>
          
          {/* Category filters - made more prominent */}
          <div className="w-full">
            <p className="font-medium mb-2">Filter by category:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 rounded-full text-sm ${
                  !selectedCategory 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Streamers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStreamers.map(streamer => (
          <Link 
            key={streamer.slug} 
            href={streamer.slug ? `/streamers/${streamer.slug}` : '#'}
          >
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-square relative">
                <Image 
                  src={streamer.image} 
                  alt={decodeHtmlEntities(streamer.name)} 
                  fill 
                  className="object-contain"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{decodeHtmlEntities(streamer.name)}</h3>
                <div className="flex gap-2">
                  {streamer.platforms.includes('twitch') && (
                    <Twitch className="h-4 w-4 text-[#9146FF]" />
                  )}
                  {streamer.platforms.includes('youtube') && (
                    <Youtube className="h-4 w-4 text-[#FF0000]" />
                  )}
                  {streamer.platforms.includes('kick') && (
                    <ExternalLink className="h-4 w-4 text-[#53FC18]" />
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {filteredStreamers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No streamers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StreamersList;