import GuideDetail from "@/pages/GuideDetail";
import { notFound } from "next/navigation";

export default async function GuideDetailPage({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return notFound();
  }
  
  return <GuideDetail slug={params.slug} />;
}