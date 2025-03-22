import ReviewDetail from "@/components/ReviewDetail";
import { notFound } from "next/navigation";

export default async function ReviewDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  if (!resolvedParams.slug) {
    return notFound();
  }
  
  return <ReviewDetail slug={resolvedParams.slug} />;
}