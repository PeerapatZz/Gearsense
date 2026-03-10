'use client';

import { motion } from 'framer-motion';
import {
  Check,
  X,
  Zap,
  DollarSign,
  Scale,
  MessageCircle,
  ShoppingBag,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ProductRecommendation } from '@/lib/store';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/utils/formatPrice';

interface ProductCardProps {
  product: ProductRecommendation;
  index: number;
  onSelect: () => void;
  openChat: (product: ProductRecommendation) => void;
}

const badgeConfig: Record<string, { labelKey: string; icon: React.ElementType; className: string }> = {
  best_performance: {
    labelKey: 'badge.bestPerf',
    icon: Zap,
    className: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0',
  },
  best_budget: {
    labelKey: 'badge.bestBudget',
    icon: DollarSign,
    className: 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-0',
  },
  balanced_choice: {
    labelKey: 'badge.balanced',
    icon: Scale,
    className: 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-0',
  },
};

export function ProductCard({
  product,
  index,
  onSelect,
  openChat
}: ProductCardProps) {
  const badge = badgeConfig[product.badge] || badgeConfig.balanced_choice;
  const BadgeIcon = badge.icon;
  const { t, language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={cn(
        'group relative rounded-3xl overflow-hidden',
        'bg-white/70 dark:bg-zinc-900/70',
        'backdrop-blur-xl',
        'border border-zinc-200/50 dark:border-zinc-700/50',
        'shadow-[0_4px_24px_rgba(0,0,0,0.06)]',
        'hover:shadow-[0_12px_40px_rgba(139,92,246,0.12)]',
        'transition-all duration-300',
        'flex flex-col h-full'
      )}
    >
      {/* Rank indicator */}
      <div className="absolute top-4 left-4 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
          className={cn(
            'w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm',
            index === 0
              ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
          )}
        >
          {index + 1}
        </motion.div>
      </div>

      {/* Badge */}
      <div className="absolute top-4 right-4 z-20">
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.15 + 0.4, type: 'spring' }}
        >
          <Badge
            className={cn(
              'gap-1.5 px-3 py-1 rounded-full font-medium text-xs shadow-md',
              badge.className
            )}
          >
            <BadgeIcon className="w-3 h-3" />
            {t(badge.labelKey)}
          </Badge>
        </motion.div>
      </div>

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content */}
      <div className="p-5 pt-16 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-0.5">
            {product.brand}
          </p>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight line-clamp-2">
            {product.productName}
          </h3>
        </div>

        {/* Price and Score */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-baseline gap-0.5">
            <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              {formatPrice(product.price, language)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-2 py-1 rounded-md">
              {t('product.match').replace('{score}', product.score.toString())}
            </span>
          </div>
        </div>

        {/* Specs chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
            <span
              key={key}
              className="text-[11px] px-2 py-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50"
            >
              {typeof value === 'string' && value.length > 18
                ? value.slice(0, 18) + '…'
                : String(value)}
            </span>
          ))}
        </div>

        {/* AI Reason */}
        <div className="mb-3 p-3 rounded-xl bg-gradient-to-br from-violet-50/80 to-purple-50/80 dark:from-violet-950/40 dark:to-purple-950/40 border border-violet-100/50 dark:border-violet-800/30 flex-grow">
          <p className="text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-4">
            <span className="font-semibold text-violet-600 dark:text-violet-400">{t('product.why')}: </span>
            {product.reason}
          </p>
        </div>

        {/* Pros */}
        <div className="mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
            {t('product.pros')}
          </p>
          <div className="space-y-0.5">
            {product.pros.slice(0, 3).map((pro, i) => (
              <div
                key={i}
                className="flex items-start gap-1.5 text-[12px] text-zinc-600 dark:text-zinc-400"
              >
                <Check className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1.5">
            {t('product.cons')}
          </p>
          <div className="space-y-0.5">
            {product.cons.slice(0, 2).map((con, i) => (
              <div
                key={i}
                className="flex items-start gap-1.5 text-[12px] text-zinc-600 dark:text-zinc-400"
              >
                <X className="w-3 h-3 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{con}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            onClick={onSelect}
            size="sm"
            className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl text-xs shadow-md shadow-violet-500/15"
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
            {t('product.choose')}
          </Button>
          <Button
            onClick={() => openChat(product)}
            size="sm"
            variant="outline"
            className="rounded-xl text-xs border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            {t('product.askAi')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
