import ReviewDetail from "@/pages/ReviewDetail";
import { notFound } from "next/navigation";

export default async function ReviewDetailPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return notFound();
  }
  
  return <ReviewDetail slug={params.slug} />;
}