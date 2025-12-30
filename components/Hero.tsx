'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  imageSrc?: string;
  videoSrc?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  imageSrc,
  videoSrc,
}) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <p className="text-secondary font-semibold mb-4 uppercase tracking-wide text-sm">
                {subtitle}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title.split(' ').map((word, idx) => {
                const shouldGradient = word.toLowerCase().includes('emg') || 
                                      word.toLowerCase().includes('exoskeleton') ||
                                      word.toLowerCase().includes('silverhand');
                return shouldGradient ? (
                  <span key={idx} className="gradient-text">
                    {word}{' '}
                  </span>
                ) : (
                  <span key={idx}>{word} </span>
                );
              })}
            </h1>
            <div className="w-24 h-1 bg-primary rounded-full mb-6" />
            {description && (
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCTA && (
                <Link
                  href={primaryCTA.href}
                  className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:opacity-80 transition-all shadow-lg shadow-primary/40"
                >
                  {primaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-secondary border border-secondary/50 rounded-lg hover:bg-secondary/10 hover:border-secondary transition-all"
                >
                  {secondaryCTA.text}
                </Link>
              )}
            </div>
          </motion.div>

          {/* Media content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {videoSrc ? (
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-primary/20 glass-card p-2">
                <video
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg"
                  poster={imageSrc}
                />
              </div>
            ) : imageSrc ? (
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-primary/20 glass-card p-2">
                <img
                  src={imageSrc}
                  alt="Hero visual"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-primary/20 glass-card p-2 aspect-video bg-gray-900 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Placeholder for media</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


