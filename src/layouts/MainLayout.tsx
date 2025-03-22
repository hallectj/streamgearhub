
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
    { name: "Recommended Gear", url: "/recommended-gear" },
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
            
            {/* Rest of the footer content remains the same */}
            {/* ... */}
          </div>
          
          <div className="mt-12 pt-6 border-t border-muted text-foreground/60 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2023 StreamGearHub. All rights reserved.</p>
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
