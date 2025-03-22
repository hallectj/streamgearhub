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
            {/* Placeholder for your image */}
            <div className="text-muted-foreground">Your Image Here</div>
            {/* Once you have an image, replace the div above with: */}
            {/* <img src="/your-image.jpg" alt="Your Name" className="w-full h-full object-cover" /> */}
          </div>
          
          {/* Right column - About information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Hello, I'm [Your Name]</h2>
            
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
              Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
              rhoncus ut eleifend nibh porttitor.
            </p>
            
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. 
              Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur 
              ante hendrerit. Donec et mollis dolor.
            </p>
            
            <p className="text-muted-foreground">
              Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt 
              congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula 
              ultricies a non tortor.
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