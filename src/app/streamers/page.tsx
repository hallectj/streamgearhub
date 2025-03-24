import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';
import StreamersList from '@/components/StreamersList';

export const metadata: Metadata = {
  title: 'Popular Streamers Setup | StreamGearHub',
  description: 'Discover the streaming gear used by your favorite content creators',
};

// This would eventually come from WordPress
const streamers = [
  {
    name: "xQc",
    slug: "xqc",
    image: "https://pbs.twimg.com/media/F3C4nyTX0AAsn-G?format=jpg&name=medium",
    platforms: ["twitch", "kick"],
    categories: ["FPS", "Variety", "Just Chatting"]
  },
  {
    name: "Ninja",
    slug: "ninja",
    image: "https://pbs.twimg.com/media/GglQLpNWcAAYBW5?format=jpg&name=large",
    platforms: ["twitch", "youtube"],
    categories: ["Fortnite", "FPS", "Battle Royale"]
  },
  {
    name: "Pokimane",
    slug: "pokimane",
    image: "https://pbs.twimg.com/media/GVsADHCa8AQWscu?format=jpg&name=large",
    platforms: ["twitch", "youtube"],
    categories: ["Variety", "Just Chatting", "Gaming"]
  },
  {
    name: "Shroud",
    slug: "shroud",
    image: "https://pbs.twimg.com/media/GikkHr0WAAEblwr?format=jpg&name=4096x4096",
    platforms: ["twitch"],
    categories: ["FPS", "Competitive", "Variety"]
  },
  {
    name: "TimTheTatman",
    slug: "timthetatman",
    image: "https://static.wikia.nocookie.net/youtube/images/0/0f/TimTheTatman.jpg/revision/latest?cb=20221030153303",
    platforms: ["youtube"],
    categories: ["FPS", "Battle Royale", "Variety"]
  },
  {
    name: "DrDisrespect",
    slug: "drdisrespect",
    image: "https://pbs.twimg.com/media/GlIRz5uXcAExAKR?format=jpg&name=large",
    platforms: ["youtube"],
    categories: ["FPS", "Battle Royale"]
  },
  {
    name: "Valkyrae",
    slug: "valkyrae",
    image: "https://pbs.twimg.com/media/GAsehepbQAAm0KK?format=jpg&name=large",
    platforms: ["youtube"],
    categories: ["Variety", "Gaming"]
  },
  {
    name: "Amouranth",
    slug: "amouranth",
    image: "https://pbs.twimg.com/media/Fw69Pp9WwAA0SA4?format=jpg&name=large",
    platforms: ["twitch", "kick"],
    categories: ["Just Chatting", "IRL"]
  }
];

export default function StreamersPage() {
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Popular Streamers' Setups</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Discover the gear used by your favorite content creators
        </p>
        
        <StreamersList streamers={streamers} />
      </div>
    </MainLayout>
  );
}