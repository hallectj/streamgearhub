
'use client'

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  image: string;
  title: string;
  excerpt: string;
  category: string;
  url: string;
  date: string;
}

const ArticleCard = ({ image, title, excerpt, category, url, date }: ArticleCardProps) => {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md">
      <Link href={url} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute left-3 top-3">{category}</Badge>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={url} className="block">
          <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
            {title}
          </h3>
        </Link>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{date}</span>
          <Link 
            href={url}
            className="text-sm font-medium text-primary hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
