import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Twitch, Youtube, ExternalLink } from 'lucide-react';

const placeholderImage = '../../public/ImageNotFound.png'

export const metadata: Metadata = {
  title: 'Popular Streamers Setup | StreamGearHub',
  description: 'Discover the streaming gear used by your favorite content creators',
};

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

// Fetch streamers from WordPress
async function getStreamers() {
  try {
    const response = await fetch(
      'http://localhost/mylocalwp/wp-json/wp/v2/streamer',
      { cache: 'no-store' }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch streamers: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((streamer: any) => {
      // Extract categories
      const categories = streamer.class_list
        .filter((className: string) => className.startsWith('category-'))
        .map((className: string) => {
          // Convert "category-just-chatting" to "Just Chatting"
          const category = className.replace('category-', '');
          return category.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        });
      
      // Get platforms from streamer_socials
      const platforms = [];
      if (streamer.streamer_socials) {
        if (streamer.streamer_socials.twitch) platforms.push('twitch');
        if (streamer.streamer_socials.youtube) platforms.push('youtube');
        if (streamer.streamer_socials.kick) platforms.push('kick');
      }
      
      // If no platforms found, default to twitch
      if (platforms.length === 0) {
        platforms.push('twitch');
      }
      
      return {
        name: streamer.title.rendered,
        slug: streamer.slug,
        image: streamer.streamer_other_picture || streamer.streamer_profile_picture || placeholderImage,
        platforms: platforms,
        categories: categories
      };
    });
  } catch (error) {
    console.error('Error fetching streamers:', error);
    // Fallback to static data if API fails
    return [
      {
        name: "xQc",
        slug: "xqc",
        image: "https://pbs.twimg.com/media/F3C4nyTX0AAsn-G?format=jpg&name=medium",
        platforms: ["twitch", "kick"],
        categories: ["FPS", "Variety", "Just Chatting"]
      },
      // ... other static streamers
    ];
  }
}

export default async function StreamersPage() {
  const streamers = await getStreamers();
  
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Popular Streamers' Setups</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Discover the gear used by your favorite content creators
        </p>
        
        {/* Server-rendered streamers grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {streamers.map(streamer => (
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
        
        {streamers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No streamers found.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}