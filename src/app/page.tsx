'use client';

import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlassNavbar } from '@/components/vibeshop/GlassNavbar';
import { HomePage } from '@/components/vibeshop/HomePage';
import { RecommendPage } from '@/components/vibeshop/RecommendPage';
import { LoadingExperience } from '@/components/vibeshop/LoadingExperience';
import { ResultsPage } from '@/components/vibeshop/ResultsPage';
import { HistoryPage } from '@/components/vibeshop/HistoryPage';
import { DashboardPage } from '@/components/vibeshop/DashboardPage';
import { useAppStore } from '@/lib/store';
import { Toaster, toast } from 'sonner';

// API service functions
async function submitRecommendationRequest(data: {
  productType: string;
  budget: number;
  usage: string;
  preferences: {
    batteryImportant: boolean;
    lightweight: boolean;
    highPerformance: boolean;
    preferredBrand: string;
  };
}) {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get recommendations');
  }
  
  return response.json();
}

export default function GearSenseAI() {
  const {
    currentPage,
    request,
    setRecommendations,
    setDisclaimer,
    isLoading,
    setIsLoading,
    setCurrentPage,
  } = useAppStore();

  // Handle loading completion
  const handleLoadingComplete = useCallback(async () => {
    if (!request) {
      setCurrentPage('home');
      return;
    }

    try {
      const result = await submitRecommendationRequest({
        productType: request.productType,
        budget: request.budget,
        usage: request.usage,
        preferences: request.preferences,
      });

      setRecommendations(result.recommendations);
      setDisclaimer(result.disclaimer);
      setCurrentPage('results');
      
      // Show success toast
      toast.success('Recommendations ready!', {
        description: `Found ${result.recommendations.length} products matching your criteria`
      });
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      toast.error('Failed to get recommendations', {
        description: error instanceof Error ? error.message : 'Please try again with different criteria'
      });
      setCurrentPage('recommend');
    } finally {
      setIsLoading(false);
    }
  }, [request, setRecommendations, setDisclaimer, setCurrentPage, setIsLoading]);

  // Trigger API call when entering loading state
  useEffect(() => {
    if (currentPage === 'loading' && request && !isLoading) {
      setIsLoading(true);
    }
  }, [currentPage, request, isLoading, setIsLoading]);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-violet-500/5 to-transparent rounded-full"
        />
      </div>

      {/* Navbar */}
      <GlassNavbar />

      {/* Main content */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.2 }}
            >
              <HomePage />
            </motion.div>
          )}

          {currentPage === 'recommend' && (
            <motion.div
              key="recommend"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.2 }}
            >
              <RecommendPage />
            </motion.div>
          )}

          {currentPage === 'loading' && (
            <motion.div
              key="loading"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.2 }}
            >
              <LoadingExperience onComplete={handleLoadingComplete} />
            </motion.div>
          )}

          {currentPage === 'results' && (
            <motion.div
              key="results"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.2 }}
            >
              <ResultsPage />
            </motion.div>
          )}

          {currentPage === 'history' && (
            <motion.div
              key="history"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.2 }}
            >
              <HistoryPage />
            </motion.div>
          )}

          {currentPage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.2 }}
            >
              <DashboardPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 text-center text-xs text-zinc-400 dark:text-zinc-600 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm border-t border-white/20 dark:border-zinc-800/30 z-30">
        <p>GearSense AI • Intelligent Product Recommendations</p>
      </footer>

      {/* Toast notifications - Bottom Right */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700',
          duration: 3000,
          style: {
            bottom: '24px',
            right: '24px',
          },
        }}
        expand={false}
        richColors
      />
    </div>
  );
}
