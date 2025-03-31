
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Blog", url: "/blog" },
    { name: "Guides", url: "/guides" },
    { name: "Reviews", url: "/reviews" },
    { name: "Streamers", url: "/streamers" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "mailto:hallectj@gmail.com" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className={`py-4 w-full z-50 transition-all duration-300 ${
          isScrolled ? "neo-blur sticky top-0 py-3" : ""
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-heading font-bold gradient-text">StreamGearHub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className="text-foreground/90 hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <ThemeToggle />
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center md:hidden space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 focus:outline-none"
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <span
                    className={`block h-0.5 w-full bg-foreground rounded transition-all duration-300 ${
                      mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-full bg-foreground rounded transition-opacity duration-300 ${
                      mobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-full bg-foreground rounded transition-all duration-300 ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute left-0 right-0 z-20 bg-background/95 backdrop-blur-lg border-b border-muted px-4 pb-6 transition-all duration-300 ease-in-out ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10 pointer-events-none"
            }`}
          >
            <nav className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                item.url.startsWith('mailto:') ? (
                  <a
                    key={item.name}
                    href={item.url}
                    className="text-foreground/90 hover:text-primary py-2 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.url}
                    className="text-foreground/90 hover:text-primary py-2 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="border-t border-muted mt-20">
        {/* Footer content remains unchanged */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">StreamGearHub</h3>
              <p className="text-foreground/70">
                Your ultimate guide to streaming equipment, tips, and strategies for success on
                Twitch, YouTube, and Kick.
              </p>
            </div>
            
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-foreground/70 hover:text-primary">Home</Link></li>
                <li><Link href="/blog" className="text-foreground/70 hover:text-primary">Blog</Link></li>
                <li><Link href="/guides" className="text-foreground/70 hover:text-primary">Guides</Link></li>
                <li><Link href="/reviews" className="text-foreground/70 hover:text-primary">Reviews</Link></li>
                <li><Link href="/streamers" className="text-foreground/70 hover:text-primary">Streamers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/reviews" className="text-foreground/70 hover:text-primary">Reviewed Gear</Link></li>
                <li><Link href="/about" className="text-foreground/70 hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-foreground/70 hover:text-primary">Contact</Link></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-foreground/70 hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="text-foreground/70 hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="text-foreground/70 hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-foreground/70 hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                </a>
              </div>
              
          {/* <div className="mt-6">
                <h4 className="font-heading font-semibold mb-2">Sign up for updates</h4>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="bg-muted text-foreground px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-primary" />
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md">Subscribe</button>
                </div>
              </div> */}
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-muted text-foreground/60 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 StreamGearHub. All rights reserved.</p>
              <p className="mt-2 md:mt-0">
                <span className="text-xs">This site contains affiliate links. We may earn a commission when you purchase through these links.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
