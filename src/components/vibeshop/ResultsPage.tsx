'use client';

import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  MessageCircle,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from './ProductCard';
import { ChatPanel, ChatButton } from './ChatPanel';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

// Suggested questions for quick access
const SUGGESTED_QUESTIONS = [
  "Which one is best for gaming?",
  "Which has the best battery life?",
  "Compare option 1 and 2",
  "Best value for money?",
];

export function ResultsPage() {
  const {
    recommendations,
    disclaimer,
    request,
    setCurrentPage,
    resetForm,
    setSelectedRecommendation,
    isChatOpen,
    setIsChatOpen,
    selectedProductForChat,
    setSelectedProductForChat,
  } = useAppStore();

  const [showChatButton, setShowChatButton] = useState(false);

  const handleSelect = async (productId: string) => {
    setSelectedRecommendation(productId);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recommendationId: productId, feedbackType: 'selected' }),
      });
      toast.success('Product selected!', {
        description: 'Your feedback helps improve our recommendations',
        icon: <Heart className="w-4 h-4 text-pink-500" />,
      });
    } catch {
      toast.success('Product selected!');
    }
  };

  const handleAskAI = (product?: typeof recommendations[0]) => {
    if (product) {
      setSelectedProductForChat(product);
    } else {
      setSelectedProductForChat(null);
    }
    setIsChatOpen(true);
  };

  const handleNewSearch = () => {
    resetForm();
    setCurrentPage('recommend');
  };

  // Show chat button after a delay
  useEffect(() => {
    const timer = setTimeout(() => setShowChatButton(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            No Products Found
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            We couldn&apos;t find products matching your criteria. Try adjusting your budget or preferences.
          </p>
          <Button onClick={() => setCurrentPage('recommend')} className="rounded-xl">
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          {/* Success badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200 dark:border-emerald-800 mb-5"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              AI Recommendations Ready
            </span>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
            Your Top Picks
          </h1>

          {request && (
            <div className="flex flex-col items-center gap-3 mb-6">
              <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
                Based on your budget of <span className="font-semibold text-violet-600 dark:text-violet-400">${request.budget.toLocaleString()}</span> for{' '}
                <span className="font-semibold text-violet-600 dark:text-violet-400">{request.usage}</span> use
              </p>

            </div>
          )}

          {/* Quick question buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {SUGGESTED_QUESTIONS.map((question, index) => (
              <motion.button
                key={question}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                onClick={() => handleAskAI()}
                className="text-sm px-4 py-2 rounded-full bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-600 dark:hover:text-violet-400 transition-all flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {question}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-5 mb-10"
        >
          {recommendations.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onSelect={() => handleSelect(product.id)}
              openChat={handleAskAI}
            />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={cn(
            'max-w-2xl mx-auto p-4 rounded-2xl text-center',
            'bg-amber-50/80 dark:bg-amber-950/20',
            'border border-amber-200/50 dark:border-amber-800/30',
            'backdrop-blur-sm'
          )}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
              Important
            </span>
          </div>
          <p className="text-sm text-amber-600/80 dark:text-amber-400/80">
            {disclaimer || 'AI recommendations are based on general product information. Please verify specifications and prices before purchase.'}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
        >
          <Button
            variant="outline"
            onClick={() => setCurrentPage('recommend')}
            className="rounded-xl gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Modify Search
          </Button>
          <Button
            onClick={handleNewSearch}
            className="rounded-xl gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
          >
            <RotateCcw className="w-4 h-4" />
            New Search
          </Button>
        </motion.div>
      </div>

      {/* Floating Chat Button */}
      {!isChatOpen && showChatButton && (
        <ChatButton onClick={() => setIsChatOpen(true)} />
      )}

      {/* Chat Panel */}
      <ChatPanel
        products={recommendations.map(p => ({
          name: p.productName,
          brand: p.brand,
          price: p.price,
          category: p.category,
          specs: p.specs,
          performance: p.performance,
          battery: p.battery,
          weight: p.weight,
          reason: p.reason,
          pros: p.pros,
          cons: p.cons,
          badge: p.badge,
          score: p.score,
        }))}
        selectedProduct={selectedProductForChat ? {
          name: selectedProductForChat.productName,
          brand: selectedProductForChat.brand,
          price: selectedProductForChat.price,
          category: selectedProductForChat.category,
          specs: selectedProductForChat.specs,
          performance: selectedProductForChat.performance,
          battery: selectedProductForChat.battery,
          weight: selectedProductForChat.weight,
          reason: selectedProductForChat.reason,
          pros: selectedProductForChat.pros,
          cons: selectedProductForChat.cons,
          badge: selectedProductForChat.badge,
          score: selectedProductForChat.score,
        } : null}
        onClose={() => {
          setIsChatOpen(false);
          setSelectedProductForChat(null);
        }}
        isOpen={isChatOpen}
      />
    </div>
  );
}
