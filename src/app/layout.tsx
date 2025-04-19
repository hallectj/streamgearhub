import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/ThemeProvider"
import { SITE_URL } from '@/config/api'
import { Analytics } from "@vercel/analytics/react"; // Import the Analytics component
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | StreamGearHub',
    default: 'StreamGearHub - Your Ultimate Resource for Streaming Equipment',
  },
  description: 'Find the best streaming gear, setup guides, and expert reviews to level up your content creation.',
  keywords: ['streaming equipment', 'streamer gear', 'twitch setup', 'streaming guides', 'content creation'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL, // Using the environment variable here
    siteName: 'StreamGearHub',
    title: 'StreamGearHub - Your Ultimate Resource for Streaming Equipment',
    description: 'Find the best streaming gear, setup guides, and expert reviews to level up your content creation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreamGearHub - Your Ultimate Resource for Streaming Equipment',
    description: 'Find the best streaming gear, setup guides, and expert reviews to level up your content creation.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}