'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, Page } from '@/lib/store';
import { cn } from '@/lib/utils';

const navItems: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Recommend', page: 'recommend' },
  { label: 'History', page: 'history' },
  { label: 'Dashboard', page: 'dashboard' },
];

export function GlassNavbar() {
  const { currentPage, setCurrentPage } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
      >
        <div
          className={cn(
            'relative rounded-full',
            'bg-white/70 dark:bg-zinc-900/70',
            'backdrop-blur-xl',
            'border border-white/20 dark:border-zinc-700/30',
            'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
            'px-2 py-1.5'
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 px-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-base bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  GearSense
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors"
                >
                  {currentPage === item.page && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <span
                    className={cn(
                      'relative z-10',
                      currentPage === item.page
                        ? 'text-violet-700 dark:text-violet-300'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => setCurrentPage('recommend')}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-full px-6 shadow-lg shadow-violet-500/25"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div
              className={cn(
                'rounded-2xl p-4',
                'bg-white/90 dark:bg-zinc-900/90',
                'backdrop-blur-xl',
                'border border-white/20 dark:border-zinc-700/30',
                'shadow-[0_8px_32px_rgba(0,0,0,0.15)]'
              )}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      setCurrentPage(item.page);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      'px-4 py-3 rounded-xl text-left font-medium transition-colors',
                      currentPage === item.page
                        ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => {
                    setCurrentPage('recommend');
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
