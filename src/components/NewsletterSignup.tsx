
import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send this to your newsletter service
      console.log('Subscribing email:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset the success message after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Streaming Community</h2>
        <p className="text-foreground/80 mb-8">
          Subscribe for the latest streaming tips, gear reviews, and exclusive deals straight to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg bg-muted/50 border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button 
              type="submit" 
              className="btn-primary whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
          
          {isSubmitted && (
            <div className="mt-4 text-green-500 animate-fade-in">
              Thanks for subscribing!
            </div>
          )}
          
          <div className="mt-4 text-xs text-foreground/60">
            We respect your privacy. Unsubscribe at any time.
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
