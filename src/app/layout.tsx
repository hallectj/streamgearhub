import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/ThemeProvider"

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
    url: 'https://streamgearhub.com',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          storageKey="theme"
          defaultTheme="system"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}