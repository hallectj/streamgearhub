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
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Search */}
        <div className="w-full md:w-64">
          <Input
            placeholder="Search streamers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        {/* Category filters */}
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
      
      {/* Streamers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStreamers.map(streamer => (
          <Link key={streamer.slug} href={`/streamers/${streamer.slug}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-square relative">
                <Image 
                  src={streamer.image} 
                  alt={streamer.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{streamer.name}</h3>
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