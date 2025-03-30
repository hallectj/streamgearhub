import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'Popular Streamers Setup | StreamGearHub',
  description: 'Discover the streaming gear used by your favorite content creators',
};

export default function StreamersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}