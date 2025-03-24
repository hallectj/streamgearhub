'use client'

import { useState } from 'react';
import { Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Function to handle bookmarking
  const handleBookmark = () => {
    if (typeof window !== 'undefined') {
      if ((window as any).sidebar && (window as any).sidebar.addPanel) { // Firefox < 23
        (window as any).sidebar.addPanel(title, url, '');
      } else if (window.external && ('AddFavorite' in window.external)) { // IE
        (window.external as any).AddFavorite(url, title);
      } else { // Modern browsers
        // We can't directly add to bookmarks in modern browsers due to security restrictions
        // So we'll show instructions to the user
        toast({
          title: "Add Bookmark",
          description: "Press Ctrl+D (or Cmd+D on Mac) to bookmark this page.",
        });
      }
      
      // Toggle bookmark state for UI feedback
      setIsBookmarked(true);
      setTimeout(() => setIsBookmarked(false), 2000);
    }
  };

  // Share functions
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnReddit = () => {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(redditUrl, '_blank');
  };

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleBookmark}
        aria-label="Bookmark this page"
        className="flex-1"
      >
        {isBookmarked ? (
          <BookmarkCheck className="h-4 w-4 mr-1" />
        ) : (
          <Bookmark className="h-4 w-4 mr-1" />
        )}
        Save
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" aria-label="Share this page" className="flex-1">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={shareOnTwitter}>
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnFacebook}>
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnReddit}>
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M17 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"></path>
              <path d="M7 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"></path>
              <path d="M12 18c-1.5 0-3-.6-4-1.5"></path>
              <path d="M16 16.5c-1 .9-2.5 1.5-4 1.5"></path>
              <path d="M8.5 9A1.5 1.5 0 0 0 7 7.5"></path>
              <path d="M15.5 9A1.5 1.5 0 0 1 17 7.5"></path>
            </svg>
            Reddit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}