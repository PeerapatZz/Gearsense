'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={cn(
        'relative p-6 rounded-2xl overflow-hidden',
        'bg-white/70 dark:bg-zinc-900/70',
        'backdrop-blur-xl',
        'border border-white/30 dark:border-zinc-700/30',
        'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
        'hover:shadow-[0_16px_48px_rgba(139,92,246,0.15)]',
        'transition-all duration-300',
        'group cursor-pointer'
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon */}
      <div className="relative mb-5">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.05 }}
          className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center',
            'bg-gradient-to-br from-violet-500 to-purple-600',
            'shadow-lg shadow-violet-500/25',
            'group-hover:shadow-xl group-hover:shadow-violet-500/30',
            'transition-shadow duration-300'
          )}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative corner gradient */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
    </motion.div>
  );
}
