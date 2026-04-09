import React from 'react';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  cta?: { text: string; href: string };
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, image, cta }) => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 py-20 sm:py-28 lg:py-36">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
      }} />

      {image && (
        <div className="absolute inset-0 opacity-20">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl sm:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            {cta.text}
          </Link>
        )}
      </div>
    </div>
  );
};
