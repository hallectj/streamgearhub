import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: 'StreamGearHub - Your Ultimate Resource for Streaming Equipment',
  description: 'Find the best streaming gear, setup guides, and expert reviews to level up your content creation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (storedTheme === 'light') {
                  document.documentElement.classList.add('light');
                } else {
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.classList.add(systemTheme);
                }
              } catch (e) {
                console.error('Theme initialization failed:', e);
              }
            })();
          `
        }} />
      </head>
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