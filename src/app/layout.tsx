import ThemeProviders from "@/components/ThemeProviders";
import "../index.css"; // Adjust this path to your global CSS file

export const metadata = {
  title: 'StreamGearHub',
  description: 'Your hub for streaming success with gear reviews, guides, and expert tips',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviders>
          {children}
        </ThemeProviders>
      </body>
    </html>
  )
}