import React from 'react';
import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`
        bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800
        shadow-sm ${hoverable ? 'hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface ArticleCardProps {
  title: string;
  description: string;
  image?: string;
  category?: string;
  icon?: string;
  href: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  image,
  category,
  icon,
  href,
}) => {
  return (
    <Link href={href}>
      <Card hoverable className="overflow-hidden h-full flex flex-col">
        {image && (
          <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          {(category || icon) && (
            <div className="flex items-center gap-2 mb-2">
              {icon && <span className="text-xl">{icon}</span>}
              {category && <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">{category}</span>}
            </div>
          )}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 flex-grow">{description}</p>
        </div>
      </Card>
    </Link>
  );
};
