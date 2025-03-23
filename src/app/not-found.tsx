import NotFound from "@/components/NotFound";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: 'noindex, nofollow',
}

export default function NotFoundPage() {
  return <NotFound />;
}