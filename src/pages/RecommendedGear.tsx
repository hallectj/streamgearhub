'use client'

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

// Mock data for gear categories
const gearCategories = [
  {
    id: "microphones",
    title: "Best Microphones",
    description: "Crystal clear audio is essential for engaging with your audience. Discover our top microphone picks for streamers at every level.",
    image: "https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg",
    url: "/recommended-gear/microphones"
  },
  {
    id: "cameras",
    title: "Best Cameras",
    description: "High-quality video helps viewers connect with you. Find the perfect camera to make your streams look professional.",
    image: "https://images.pexels.com/photos/3062553/pexels-photo-3062553.jpeg",
    url: "/recommended-gear/cameras"
  },
  {
    id: "capture-cards",
    title: "Best Capture Cards",
    description: "Stream console gameplay or use a second PC for encoding with these top-rated capture cards.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
    url: "/recommended-gear/capture-cards"
  },
  {
    id: "software",
    title: "Best Streaming Software",
    description: "The right software makes streaming easier and more professional. Explore our recommended streaming applications.",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    url: "/recommended-gear/software"
  },
  {
    id: "headsets",
    title: "Best Headsets",
    description: "A quality headset lets you hear game audio clearly while communicating with your audience.",
    image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg",
    url: "/recommended-gear/headsets"
  },
  {
    id: "chairs",
    title: "Best Gaming Chairs",
    description: "Comfort is crucial for long streaming sessions. These ergonomic gaming chairs provide the support you need.",
    image: "https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg",
    url: "/recommended-gear/chairs"
  },
  {
    id: "lighting",
    title: "Best Lighting",
    description: "Good lighting makes a huge difference in stream quality. Find the perfect lighting setup for your space.",
    image: "https://images.pexels.com/photos/3648656/pexels-photo-3648656.jpeg",
    url: "/recommended-gear/lighting"
  },
  {
    id: "audio-interfaces",
    title: "Best Audio Interfaces",
    description: "Take your audio to the next level with these professional audio interfaces for streamers.",
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
    url: "/recommended-gear/audio-interfaces"
  }
];

const RecommendedGear = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 bg-muted/50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Recommended Streaming Gear</h1>
            <p className="text-xl text-muted-foreground">
              Our expert-selected equipment recommendations to help you build a professional streaming setup that will impress your audience.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gearCategories.map((category) => (
              <Link 
                key={category.id} 
                href={category.url}
                className="group"
              >
                <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{category.title}</h3>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">{category.description}</p>
                    <Button variant="link" className="p-0 mt-2 font-medium">
                      View Recommendations →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-4">Why Trust Our Recommendations?</h2>
              <div className="space-y-4">
                <p>
                  Our team consists of experienced streamers who have spent thousands of hours testing equipment in real-world streaming scenarios.
                </p>
                <p>
                  We don't just recommend the most expensive gear - we focus on value, reliability, and performance at various price points to help streamers of all levels.
                </p>
                <p>
                  Our recommendations are regularly updated to reflect new product releases and changing technology standards in the streaming world.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg" 
                alt="Streaming Setup" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Guide */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">New to Streaming?</h2>
            <p className="text-lg text-muted-foreground">
              If you're just getting started, check out our beginner's guide to building your first streaming setup.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/guides/streaming-setup-for-beginners">Read Beginner's Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default RecommendedGear;