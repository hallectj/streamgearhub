
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  image: string;
  title: string;
  excerpt: string;
  category: string;
  url: string;
  date?: string;
}

const ArticleCard = ({ image, title, excerpt, category, url, date }: ArticleCardProps) => {
  return (
    <div className="card-hover rounded-lg overflow-hidden bg-card border border-muted h-full flex flex-col">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 text-primary-foreground text-xs font-medium py-1 px-2 rounded">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        {date && (
          <div className="text-xs text-foreground/70 mb-2">{date}</div>
        )}
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-foreground/80 text-sm line-clamp-3 mb-4">{excerpt}</p>
        <div className="mt-auto">
          <Link 
            to={url}
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm group"
          >
            Read More 
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
