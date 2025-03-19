'use client'

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

// Guide card component
interface GuideCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

const GuideCard = ({ title, description, image, slug, category, level }: GuideCardProps) => {
  // Get level color
  const getLevelColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="card-hover rounded-lg overflow-hidden bg-card border border-muted flex flex-col h-full">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
          <span className={`${getLevelColor()} px-3 py-1 rounded-full text-xs font-medium`}>
            {level}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
        <Button asChild variant="outline" className="mt-auto w-full justify-between">
          <Link href={`/guides/${slug}`}>
            Read Guide
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

// Category section component
interface CategorySectionProps {
  title: string;
  guides: GuideCardProps[];
}

const CategorySection = ({ title, guides }: CategorySectionProps) => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 font-heading">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <GuideCard key={index} {...guide} />
        ))}
      </div>
    </section>
  );
};

// Mock data for guides
const guidesData = {
  gettingStarted: [
    {
      title: "Setting Up Your First Streaming PC",
      description: "A comprehensive guide to building or buying your first streaming PC, with component recommendations for every budget.",
      image: "/placeholder.svg",
      slug: "setting-up-first-streaming-pc",
      category: "Hardware",
      level: "Beginner" as const
    },
    {
      title: "OBS Studio Setup for Beginners",
      description: "Learn how to configure OBS Studio from scratch, including scenes, sources, and optimal settings for your hardware.",
      image: "/placeholder.svg",
      slug: "obs-studio-setup-beginners",
      category: "Software",
      level: "Beginner" as const
    },
    {
      title: "Creating Your Streaming Brand",
      description: "Develop a unique streaming identity with tips on creating logos, overlays, alerts, and a consistent visual style.",
      image: "/placeholder.svg",
      slug: "creating-streaming-brand",
      category: "Branding",
      level: "Beginner" as const
    }
  ],
  growthStrategies: [
    {
      title: "Growing Your Audience on Twitch",
      description: "Proven strategies to increase your viewership, build a community, and reach Affiliate or Partner status on Twitch.",
      image: "/placeholder.svg",
      slug: "growing-audience-twitch",
      category: "Growth",
      level: "Intermediate" as const
    },
    {
      title: "Multiplatform Streaming Strategy",
      description: "How to effectively stream to multiple platforms simultaneously to maximize your reach and growth potential.",
      image: "/placeholder.svg",
      slug: "multiplatform-streaming-strategy",
      category: "Growth",
      level: "Intermediate" as const
    },
    {
      title: "Monetization Beyond Subscriptions",
      description: "Explore diverse revenue streams for streamers including sponsorships, merchandise, affiliate marketing, and more.",
      image: "/placeholder.svg",
      slug: "monetization-beyond-subscriptions",
      category: "Monetization",
      level: "Intermediate" as const
    }
  ],
  technicalGuides: [
    {
      title: "Advanced OBS Techniques",
      description: "Take your streams to the next level with advanced OBS features like filters, transitions, and custom scripts.",
      image: "/placeholder.svg",
      slug: "advanced-obs-techniques",
      category: "Software",
      level: "Advanced" as const
    },
    {
      title: "Optimizing Stream Quality",
      description: "Fine-tune your encoding settings, bitrate, and resolution to achieve the perfect balance of quality and performance.",
      image: "/placeholder.svg",
      slug: "optimizing-stream-quality",
      category: "Technical",
      level: "Advanced" as const
    },
    {
      title: "Creating Custom Stream Alerts",
      description: "Design and implement unique alerts and overlays using web technologies and streaming software integration.",
      image: "/placeholder.svg",
      slug: "creating-custom-stream-alerts",
      category: "Design",
      level: "Advanced" as const
    }
  ]
};

const Guides = () => {
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Streaming Guides</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Comprehensive tutorials and resources to help you succeed as a content creator
        </p>
        
        <CategorySection title="Getting Started" guides={guidesData.gettingStarted} />
        <CategorySection title="Growth Strategies" guides={guidesData.growthStrategies} />
        <CategorySection title="Technical Guides" guides={guidesData.technicalGuides} />
      </div>
    </MainLayout>
  );
};

export default Guides;