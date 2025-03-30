import { NextResponse } from 'next/server';

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
        ? streamer.class_list
            .filter((className: string) => className.startsWith('category-'))
            .map((className: string) => {
              // Convert "category-just-chatting" to "Just Chatting"
              const category = className.replace('category-', '');
              return category.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            })
        : ['Gaming'];
      
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
        image: streamer.streamer_other_picture || streamer.streamer_profile_picture || '/images/ImageNotFound.png',
        platforms: platforms,
        categories: categories
      };
    });
  } catch (error) {
    console.error('Error fetching streamers:', error);
    // Return empty array on error
    return [];
  }
}

export async function GET() {
  const streamers = await getStreamers();
  return NextResponse.json(streamers);
}