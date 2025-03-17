
import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ArticleCard from "@/components/ArticleCard";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  // Initialize dark mode on component mount
  useState(() => {
    document.documentElement.classList.add('dark');
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 bg-white min-h-screen text-gray-800 dark:text-gray-100">
        {/* Header/Navigation */}
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-teal-400 text-transparent bg-clip-text">
                StreamGearHub
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">Home</Link>
              <Link to="/blog" className="text-sm font-medium transition-colors hover:text-primary">Blog</Link>
              <Link to="/guides" className="text-sm font-medium transition-colors hover:text-primary">Guides</Link>
              <Link to="/reviews" className="text-sm font-medium transition-colors hover:text-primary">Reviews</Link>
              <Link to="/gear" className="text-sm font-medium transition-colors hover:text-primary">Recommended Gear</Link>
              <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">About</Link>
              <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">Contact</Link>
            </nav>
            
            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
              <Button className="hidden md:flex">Get Started</Button>
              
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative py-20 md:py-28">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-teal-900/20 dark:from-purple-900/40 dark:to-teal-900/40 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            </div>
            <div className="container relative">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                  Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-400">Streaming Career</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                  Expert guides, reviews, and gear recommendations to help you become a successful streamer.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg">Start Your Streaming Journey</Button>
                  <Button size="lg" variant="outline" className="text-lg">Browse Top Gear</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Articles */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Featured Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ArticleCard 
                  image="/placeholder.svg" 
                  title="Best Capture Cards for Streaming in 2023"
                  excerpt="Discover the top capture cards that will give you lag-free, high-quality streams across all platforms."
                  category="Gear"
                  url="/blog/best-capture-cards"
                  date="August 28, 2023"
                />
                <ArticleCard 
                  image="/placeholder.svg" 
                  title="How to Grow Your Twitch Channel from Zero"
                  excerpt="A complete guide with proven strategies to build your audience and create a thriving Twitch community."
                  category="Guide"
                  url="/blog/grow-your-twitch-channel"
                  date="August 15, 2023"
                />
                <ArticleCard 
                  image="/placeholder.svg" 
                  title="Setting Up OBS for Professional Streams"
                  excerpt="Learn how to configure OBS for optimal performance and create professional-looking scenes and transitions."
                  category="Tutorial"
                  url="/blog/professional-obs-setup"
                  date="August 5, 2023"
                />
              </div>
              <div className="text-center mt-10">
                <Button variant="outline">View All Guides</Button>
              </div>
            </div>
          </section>
          
          {/* Recommended Products */}
          <section className="py-16">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Recommended Streaming Gear</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ProductCard
                  image="/placeholder.svg"
                  title="Elgato Stream Deck MK.2"
                  price="$149.99"
                  rating={4.8}
                  amazonUrl="https://amazon.com"
                  description="Customize your stream with 15 LCD keys for instant control of apps and platforms"
                />
                <ProductCard
                  image="/placeholder.svg"
                  title="Shure SM7B Vocal Microphone"
                  price="$399.00"
                  rating={4.9}
                  amazonUrl="https://amazon.com"
                  description="Industry standard vocal microphone preferred by top streamers and podcasters"
                />
                <ProductCard
                  image="/placeholder.svg"
                  title="Elgato Key Light Air"
                  price="$129.99"
                  rating={4.7}
                  amazonUrl="https://amazon.com"
                  description="Edge-lit LED panel with app control for professional streaming illumination"
                />
                <ProductCard
                  image="/placeholder.svg"
                  title="Logitech StreamCam"
                  price="$169.99"
                  rating={4.6}
                  amazonUrl="https://amazon.com"
                  description="Premium webcam with smart features designed specifically for content creators"
                />
              </div>
              <div className="text-center mt-10">
                <Button variant="outline">Shop All Recommended Gear</Button>
              </div>
            </div>
          </section>

          {/* Newsletter section */}
          <section className="py-20 bg-muted/70">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-lg mb-8 text-muted-foreground">Get the latest streaming tips, gear reviews, and exclusive deals right in your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input type="email" placeholder="Enter your email" className="sm:flex-1" />
                  <Button>Subscribe</Button>
                </div>
                <p className="text-xs mt-4 text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-muted/30 border-t border-border/40 py-12">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold mb-4">StreamGearHub</h3>
                <p className="text-sm text-muted-foreground mb-4">Your trusted resource for everything streaming-related.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Home</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Guides</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Reviews</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Gear</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Top Categories</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Microphones</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Cameras</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Lighting</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Stream Decks</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Gaming Chairs</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Affiliate Disclosure</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border/40 mt-10 pt-6 text-center text-sm text-muted-foreground">
              <p>© 2023 StreamGearHub. All rights reserved.</p>
              <p className="mt-2">This site contains affiliate links. As an Amazon Associate, we earn from qualifying purchases.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
