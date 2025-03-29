'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ChevronRight } from 'lucide-react';
import '@/styles/content-styles.css'; // Import the content styles

// Add helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  if (typeof document !== 'undefined') {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  return text;
};

// Add custom styles for streamer info content
// Remove unused styled-components import since it's not being used

// You can also add this to your global CSS or create a new CSS module
const styles = `
  .streamer-info-content {
    font-size: 0.8em;
  }
  
  .streamer-info-content h1,
  .streamer-info-content h2,
  .streamer-info-content h3,
  .streamer-info-content h4,
  .streamer-info-content h5,
  .streamer-info-content h6 {
    font-size: 1.2em;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }
  
  .streamer-info-content p {
    margin-bottom: 1em;
  }
  
  .streamer-info-content ul,
  .streamer-info-content ol {
    margin-bottom: 1em;
    padding-left: 1.5em;
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

interface EquipmentItem {
  name: string;
  description: string;
  image: string;
  price: string;
  amazonLink?: string;
  reviewLink?: string;
}

// Update the interface to include info
interface StreamerSetupProps {
  name: string;
  image: string;
  bio: string;
  platforms: {
    name: string;
    url: string;
    icon: string;
  }[];
  equipment: {
    audio: EquipmentItem[];
    video: EquipmentItem[];
    computer: EquipmentItem[];
    accessories: EquipmentItem[];
  };
  info: string; // Add this new property
}

const EquipmentCard = ({ item }: { item: EquipmentItem }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video relative bg-muted">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-contain"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <CardDescription className="text-sm text-primary font-medium">
          {item.price}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2 mt-auto">
        {item.amazonLink && (
          <Button variant="outline" size="sm" asChild className="flex-1">
            <a href={item.amazonLink} target="_blank" rel="noopener noreferrer">
              Buy <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
        )}
        {item.reviewLink && (
          <Button variant="secondary" size="sm" asChild className="flex-1">
            <Link href={item.reviewLink || '#'}>
              Review <ChevronRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const StreamerSetup = ({ name, image, bio, platforms, equipment, info }: StreamerSetupProps) => {
  // Decode the name to properly display special characters and quotes
  const decodedName = decodeHtmlEntities(name);
  
  return (
    <div className="space-y-8">
      {/* Streamer profile */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-32 h-32 md:w-48 md:h-48 relative rounded-full overflow-hidden border-4 border-primary">
          <Image 
            src={image} 
            alt={decodedName} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{decodedName}</h1>
          <div className="flex gap-3 justify-center md:justify-start mb-4">
            {platforms.map((platform) => (
              <a 
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title={platform.name}
              >
                <Image 
                  src={platform.icon} 
                  alt={platform.name} 
                  width={24} 
                  height={24} 
                />
              </a>
            ))}
          </div>
          <p className="text-muted-foreground">{bio}</p>
        </div>
      </div>

      {/* Equipment tabs */}
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="computer">Computer</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-6">
          <h2 className="text-2xl font-bold">About This Setup</h2>
          <div className="bg-card p-6 rounded-lg border border-border">
            <div 
              className="blog-content streamer-info-content" // Added streamer-info-content class
              dangerouslySetInnerHTML={{ __html: info }}
            />
            <div className="mt-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
              <p className="font-medium mb-2">Disclaimer:</p>
              <p>
                The equipment information provided is based on research, observations, and reasonable assumptions.
                Streamers frequently update their setups, and some details may change over time. In the tabs you will see prices for each item, but it is not guaranteed to be the most current or accurate. Please refer to the link to the product page for the most up-to-date information.
                This information is provided for educational purposes only and is not guaranteed to be 100% accurate.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="space-y-6">
          <h2 className="text-2xl font-bold">Audio Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.audio.map((item, index) => (
              <EquipmentCard key={index} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="video" className="space-y-6">
          <h2 className="text-2xl font-bold">Video Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.video.map((item, index) => (
              <EquipmentCard key={index} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="computer" className="space-y-6">
          <h2 className="text-2xl font-bold">Computer Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.computer.map((item, index) => (
              <EquipmentCard key={index} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="accessories" className="space-y-6">
          <h2 className="text-2xl font-bold">Accessories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.accessories.map((item, index) => (
              <EquipmentCard key={index} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StreamerSetup;