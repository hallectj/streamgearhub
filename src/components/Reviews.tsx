'use client'

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Star } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";

// Review card component
interface ReviewCardProps {
  image: string;
  title: string;
  price: string;
  rating: number;
  snippet: string;
  slug: string;
}

const ReviewCard = ({ image, title, price, rating, snippet, slug }: ReviewCardProps) => {
  // Render stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="card-hover rounded-lg overflow-hidden bg-card border border-muted flex flex-col h-full">
      <div className="relative pt-4 px-4 flex justify-center">
        <img 
          src={image} 
          alt={title}
          className="h-48 object-contain"
        />
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center mb-1">
          {renderStars()}
          <span className="ml-1 text-xs text-foreground/70">({rating}/5)</span>
        </div>
        
        <h3 className="font-semibold mb-1 line-clamp-2">{title}</h3>
        <p className="text-primary font-bold mb-2">{price}</p>
        
        <p className="text-sm text-foreground/80 mb-3 line-clamp-3">{snippet}</p>
        
        <div className="mt-auto">
          <Button asChild className="w-full">
            <Link href={`/reviews/${slug}`}>Read Full Review</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Category section component
interface CategorySectionProps {
  title: string;
  reviews: ReviewCardProps[];
}

const CategorySection = ({ title, reviews }: CategorySectionProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Show only first 3 reviews initially
  const visibleReviews = expanded ? reviews : reviews.slice(0, 3);
  
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 font-heading">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleReviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
      
      {reviews.length > 3 && (
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => setExpanded(!expanded)}
            className="gap-2"
          >
            {expanded ? "Show Less" : `See More ${title} Reviews`}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      )}
    </section>
  );
};

// Mock data for reviews
const reviewsData = {
  microphones: [
    {
      image: "/placeholder.svg",
      title: "Shure SM7B Vocal Microphone",
      price: "$399.00",
      rating: 4.9,
      snippet: "The industry standard for streaming and podcasting, the Shure SM7B delivers broadcast-quality sound with excellent rejection of background noise.",
      slug: "shure-sm7b-vocal-microphone"
    },
    {
      image: "/placeholder.svg",
      title: "Audio-Technica AT2020USB+",
      price: "$149.00",
      rating: 4.5,
      snippet: "A budget-friendly USB condenser microphone that delivers clear audio quality perfect for streamers just starting out.",
      slug: "audio-technica-at2020-usb-plus"
    },
    {
      image: "/placeholder.svg",
      title: "Elgato Wave:3",
      price: "$149.99",
      rating: 4.7,
      snippet: "Designed specifically for streamers, the Wave:3 features proprietary anti-distortion technology and seamless integration with Stream Deck.",
      slug: "elgato-wave-3"
    },
    {
      image: "/placeholder.svg",
      title: "Blue Yeti X",
      price: "$169.99",
      rating: 4.6,
      snippet: "The Blue Yeti X offers four pickup patterns and real-time LED metering, making it versatile for various streaming scenarios.",
      slug: "blue-yeti-x"
    },
    {
      image: "/placeholder.svg",
      title: "Rode PodMic",
      price: "$99.99",
      rating: 4.8,
      snippet: "A compact dynamic microphone that delivers professional sound quality at an affordable price point.",
      slug: "rode-podmic"
    }
  ],
  cameras: [
    {
      image: "/placeholder.svg",
      title: "Logitech StreamCam",
      price: "$169.99",
      rating: 4.7,
      snippet: "Stream in Full HD 1080p at 60fps with the StreamCam, featuring smart auto-focus and intelligent exposure.",
      slug: "logitech-streamcam"
    },
    {
      image: "/placeholder.svg",
      title: "Elgato Facecam",
      price: "$199.99",
      rating: 4.8,
      snippet: "Purpose-built for streamers, the Facecam delivers uncompressed 1080p60 video with no auto-focus hunting.",
      slug: "elgato-facecam"
    },
    {
      image: "/placeholder.svg",
      title: "Sony Alpha ZV-E10",
      price: "$699.99",
      rating: 4.9,
      snippet: "A mirrorless camera designed for content creators, offering exceptional image quality and background blur.",
      slug: "sony-alpha-zv-e10"
    }
  ],
  captureCards: [
    {
      image: "/placeholder.svg",
      title: "Elgato HD60 X",
      price: "$199.99",
      rating: 4.8,
      snippet: "Capture your gameplay in 1080p60 with HDR while enjoying 4K60 HDR passthrough to your gaming display.",
      slug: "elgato-hd60-x"
    },
    {
      image: "/placeholder.svg",
      title: "AVerMedia Live Gamer 4K",
      price: "$299.99",
      rating: 4.7,
      snippet: "Record 4K HDR content at 60fps with ultra-low latency passthrough for the ultimate streaming setup.",
      slug: "avermedia-live-gamer-4k"
    },
    {
      image: "/placeholder.svg",
      title: "Elgato HD60 S+",
      price: "$179.99",
      rating: 4.6,
      snippet: "A reliable capture card with instant gameview and 4K60 HDR10 passthrough for console streamers.",
      slug: "elgato-hd60-s-plus"
    }
  ],
  gamingChairs: [
    {
      image: "/placeholder.svg",
      title: "Secretlab Titan Evo 2022",
      price: "$549.00",
      rating: 4.9,
      snippet: "The gold standard for gaming chairs, featuring magnetic memory foam head pillow and 4-way L-ADAPT lumbar support.",
      slug: "secretlab-titan-evo-2022"
    },
    {
      image: "/placeholder.svg",
      title: "Herman Miller Embody Gaming Chair",
      price: "$1,695.00",
      rating: 4.8,
      snippet: "A premium ergonomic chair designed in collaboration with Logitech G for all-day comfort during long streaming sessions.",
      slug: "herman-miller-embody-gaming-chair"
    },
    {
      image: "/placeholder.svg",
      title: "Razer Iskur",
      price: "$499.99",
      rating: 4.6,
      snippet: "Featuring a built-in adjustable lumbar curve system and high-density foam cushions for superior support.",
      slug: "razer-iskur"
    }
  ],
  laptops: [
    {
      image: "/placeholder.svg",
      title: "ASUS ROG Zephyrus G14",
      price: "$1,649.99",
      rating: 4.8,
      snippet: "A powerful yet portable gaming laptop with AMD Ryzen 9 and RTX 3060, perfect for on-the-go streaming.",
      slug: "asus-rog-zephyrus-g14"
    },
    {
      image: "/placeholder.svg",
      title: "Razer Blade 15",
      price: "$2,499.99",
      rating: 4.7,
      snippet: "Premium build quality with Intel Core i7 and RTX 3080, delivering exceptional performance for streaming and gaming.",
      slug: "razer-blade-15"
    },
    {
      image: "/placeholder.svg",
      title: "Lenovo Legion 5 Pro",
      price: "$1,399.99",
      rating: 4.6,
      snippet: "Featuring a 16-inch QHD display and RTX 3070, offering great value for streamers who need processing power.",
      slug: "lenovo-legion-5-pro"
    }
  ]
};

const Reviews = () => {
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Streaming Gear Reviews</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Honest, in-depth reviews of the best streaming equipment to elevate your content
        </p>
        
        <CategorySection title="Microphones" reviews={reviewsData.microphones} />
        <CategorySection title="Cameras" reviews={reviewsData.cameras} />
        <CategorySection title="Capture Cards" reviews={reviewsData.captureCards} />
        <CategorySection title="Gaming Chairs" reviews={reviewsData.gamingChairs} />
        <CategorySection title="Laptops" reviews={reviewsData.laptops} />
      </div>
    </MainLayout>
  );
};

export default Reviews;