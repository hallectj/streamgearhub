import AboutMe from "@/components/AboutMe"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about StreamGearHub and our mission to help content creators find the best streaming equipment.',
  keywords: ['about streamgearhub', 'streaming experts', 'content creation team'],
}

export default function AboutPage() {
  return <AboutMe />;
}