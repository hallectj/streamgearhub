import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Streamer Setups | StreamGearHub',
    template: '%s | StreamGearHub'
  },
  description: 'Discover the streaming gear used by your favorite content creators',
};

export default function StreamersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}