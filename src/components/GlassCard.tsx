import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

/**
 * Apple Liquid Glass デザイン
 * backdrop-filter: blur + グラデーション + 透明度で、
 * iOS/macOS風の洗練された見た目を実現
 */
export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/30 dark:bg-white/10
        backdrop-blur-xl backdrop-saturate-150
        border border-white/40 dark:border-white/20
        shadow-lg shadow-white/10
        ${hoverable ? 'hover:bg-white/40 dark:hover:bg-white/20 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface ArticleGlassCardProps {
  title: string;
  description: string;
  category?: string;
  icon?: string;
  image?: string;
  href: string;
  date?: string;
}

export const ArticleGlassCard: React.FC<ArticleGlassCardProps> = ({
  title,
  description,
  category,
  icon,
  image,
  href,
  date,
}) => {
  return (
    <a href={href}>
      <GlassCard hoverable className="h-full flex flex-col overflow-hidden group">
        {image && (
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-400/20 to-purple-400/20">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 group-hover:to-black/20 transition-all duration-300" />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          {(category || icon || date) && (
            <div className="flex items-center justify-between gap-2 mb-3 text-xs">
              <div className="flex items-center gap-2">
                {icon && <span className="text-lg">{icon}</span>}
                {category && (
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 dark:bg-blue-400/20 text-blue-700 dark:text-blue-300 font-semibold">
                    {category}
                  </span>
                )}
              </div>
              {date && <span className="text-slate-500 dark:text-slate-400">{date}</span>}
            </div>
          )}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 flex-grow">
            {description}
          </p>
        </div>
      </GlassCard>
    </a>
  );
};

interface GlassHeroProps {
  title: string;
  subtitle?: string;
  gradient?: 'blue' | 'purple' | 'cyan' | 'rose';
  cta?: { text: string; href: string };
}

export const GlassHero: React.FC<GlassHeroProps> = ({
  title,
  subtitle,
  gradient = 'blue',
  cta,
}) => {
  const gradients = {
    blue: 'from-blue-400/40 to-cyan-400/40',
    purple: 'from-purple-400/40 to-pink-400/40',
    cyan: 'from-cyan-400/40 to-blue-400/40',
    rose: 'from-rose-400/40 to-orange-400/40',
  };

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br ${gradients[gradient]} py-20 sm:py-32 lg:py-44`}>
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 backdrop-blur-3xl backdrop-saturate-150" />

      {/* Animated gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full filter blur-3xl animate-pulse opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full filter blur-3xl animate-pulse opacity-50 animation-delay-2000" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        {subtitle && (
          <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {cta && (
          <a
            href={cta.href}
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {cta.text} →
          </a>
        )}
      </div>
    </div>
  );
};
