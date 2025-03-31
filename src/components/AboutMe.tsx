'use client'

import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

const AboutMe = () => {
  return (
    <MainLayout>
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">About Me</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left column - Image */}
          <div className="rounded-lg overflow-hidden bg-muted aspect-square flex items-center justify-center">
            {/* Once you have an image, replace the div above with: */}
             <img src="./aboutMePic2.jpg" alt="Travis Halleck" className="w-75 h-75 object-cover" />
          </div>
          
          {/* Right column - About information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Hello, I'm Travis Halleck the creator of StreamGearHub</h2>
            
            <p className="text-muted-foreground">
              I, like you, enjoy watching live streams and so it became easy for me to 
              write content about streaming and streaming gear. I created this website to help
              people find the gear they need to stream, but also share content about streaming,
              all in one place.
            </p>
            
            <p className="text-muted-foreground">
              There are other websites that do this, but I wanted to create my own because I
              felt the other sites only did streamers gear and no guides on how to stream, or 
              did just guides. I decided to make this site comprehensive and include both streamers
              gear and guides on how to stream as well as blog posts on streaming.
            </p>
            
            <p className="text-muted-foreground">
              That's enough about me, thanks for visiting my website, and I hope you enjoy the content
              and if you want to hit that contact button below, feel free to reach out.
            </p>
            
            <div className="pt-4">
              <Button asChild>
                <a href="mailto:hallectj@gmail.com">Contact Me</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutMe;