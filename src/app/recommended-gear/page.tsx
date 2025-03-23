import RecommendedGear from "@/components/RecommendedGear";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recommended Streaming Gear',
  description: 'Our expert-selected list of the best streaming equipment for every budget and need.',
  keywords: ['recommended streaming gear', 'best streaming equipment', 'streaming setup', 'twitch gear', 'youtube streaming equipment'],
}

export default function RecommendedGearPage() {
  return <RecommendedGear />;
}