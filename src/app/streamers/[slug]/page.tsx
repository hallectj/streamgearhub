import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StreamerSetup from '@/components/StreamerSetup';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Add a helper function to decode HTML entities
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

interface StreamerPageProps {
  params: {
    slug: string;
  };
}

// Fetch streamer data from WordPress
async function getStreamer(slug: string) {
  try {
    const response = await fetch(
      `http://localhost/mylocalwp/wp-json/wp/v2/streamer?slug=${slug}`,
      //{ cache: 'no-store' }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch streamer: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.length) {
      return null;
    }
    
    return data[0];
  } catch (error) {
    console.error('Error fetching streamer:', error);
    return null;
  }
}

//export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
export async function generateMetadata({ params }: StreamerPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const streamer = await getStreamer(resolvedParams.slug);
  
  if (!streamer) {
    return {
      title: 'Streamer Setup | StreamGearHub',
      description: 'Discover the gear and equipment used by popular streamers',
    };
  }
  
  // Decode the title to properly display special characters and quotes
  const decodedTitle = decodeHtmlEntities(streamer.title.rendered);
  
  return {
    title: `${decodedTitle} | StreamGearHub`,
    description: streamer.yoast_head ? 
      streamer.yoast_head.match(/<meta property="og:description" content="([^"]+)"/)?.[1] || 
      "Discover the gear and equipment used for streaming" : 
      "Discover the gear and equipment used for streaming",
  };
}

export default async function StreamerPage({ params }: StreamerPageProps) {
  const resolvedParams = await params;
  const streamer = await getStreamer(resolvedParams.slug);
  
  // If we don't have data for this streamer, show 404
  if (!streamer) {
    notFound();
  }
  
  // Decode the name before passing it to the component
  const decodedName = decodeHtmlEntities(streamer.title.rendered);
  
  // Define placeholder image path
  const placeholderImage = "/images/ImageNotFound.png";
  
  // Map the WordPress API response to our component props format
  const streamerSetup = {
    name: decodedName, // Use the decoded name here
    image: streamer.streamer_profile_picture || streamer.streamer_other_picture || placeholderImage,
    bio: streamer.streamer_short_bio || "Popular streamer known for high-energy content and competitive gaming.",
    platforms: [],
    equipment: {
      // Map audio equipment from the API response
      audio: streamer.audio_equipment?.map(item => ({
        name: item.title,
        description: item.info,
        image: item.picture || placeholderImage,
        price: item.price ? `$${item.price.toFixed(2)}` : "Price unavailable",
        amazonLink: item.amazon_link
      })) || [],
      
      // Map video equipment from the API response
      video: streamer.video_equipment?.map(item => ({
        name: item.title,
        description: item.info,
        image: item.picture || placeholderImage,
        price: item.price ? `$${item.price.toFixed(2)}` : "Price unavailable",
        amazonLink: item.amazon_link
      })) || [],
      
      // Map computer equipment from the API response
      computer: streamer.computer_equipment?.map(item => ({
        name: item.title,
        description: item.info,
        image: item.picture || placeholderImage,
        price: item.price ? `$${item.price.toFixed(2)}` : "Price unavailable",
        amazonLink: item.amazon_link
      })) || [],
      
      // Map accessories from the API response
      accessories: streamer.accessories?.map(item => ({
        name: item.title,
        description: item.info,
        image: item.picture || placeholderImage,
        price: item.price ? `$${item.price.toFixed(2)}` : "Price unavailable",
        amazonLink: item.amazon_link
      })) || []
    },
    info: streamer.content?.rendered || `
      <article>
        <h1>${decodedName}</h1>
        <p>Information about this streamer's setup will be coming soon.</p>
      </article>
    `
  };
  
  // Process social media links from the API
  if (streamer.streamer_socials) {
    const socialPlatforms = [];
    
    if (streamer.streamer_socials.twitch) {
      socialPlatforms.push({
        name: "Twitch",
        url: streamer.streamer_socials.twitch,
        icon: "/images/platforms/twitch.svg"
      });
    }
    
    if (streamer.streamer_socials.youtube) {
      socialPlatforms.push({
        name: "YouTube",
        url: streamer.streamer_socials.youtube,
        icon: "/images/platforms/youtube.svg"
      });
    }
    
    if (streamer.streamer_socials.kick) {
      socialPlatforms.push({
        name: "Kick",
        url: streamer.streamer_socials.kick,
        icon: "/images/platforms/kick.svg"
      });
    }
    
    if (streamer.streamer_socials.twitter) {
      socialPlatforms.push({
        name: "Twitter",
        url: streamer.streamer_socials.twitter,
        icon: "/images/platforms/twitter.svg"
      });
    }
    
    // Add any other social platforms you want to support
    
    streamerSetup.platforms = socialPlatforms;
  } else {
    // Fallback if no social links are provided
    streamerSetup.platforms = [
      {
        name: "Twitch",
        url: "https://www.twitch.tv/",
        icon: "/images/platforms/twitch.svg"
      }
    ];
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/streamers">
            <ArrowLeft size={16} />
            Back to Streamers
          </Link>
        </Button>
      </div>
      <StreamerSetup {...streamerSetup} />
    </div>
  );
}