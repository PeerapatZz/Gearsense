'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, Wallet, GitCompare, ArrowRight, Cpu, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeatureCard } from './FeatureCard';
import { useAppStore } from '@/lib/store';

export function HomePage() {
  const { setCurrentPage } = useAppStore();

  const features = [
    {
      icon: Brain,
      title: 'Smart AI Analysis',
      description: 'Our AI analyzes specifications, performance, and user reviews to find the perfect match for your needs.',
    },
    {
      icon: Wallet,
      title: 'Budget Optimized',
      description: 'Get the best value within your budget. We consider price-performance ratio for every recommendation.',
    },
    {
      icon: GitCompare,
      title: 'Side-by-Side Comparison',
      description: 'See detailed comparisons with AI-generated pros, cons, and personalized explanations.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 border border-violet-200 dark:border-violet-800 mb-8"
          >
            <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
              AI-Powered Product Advisor
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-zinc-900 dark:text-zinc-100">Find Your Perfect </span>
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Tech Product
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
            GearSense AI analyzes thousands of products to recommend the best smartphones,
            laptops, and gaming gear tailored to your budget and usage needs.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => setCurrentPage('recommend')}
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-full px-8 py-6 text-lg shadow-xl shadow-violet-500/25 group"
              >
                <Cpu className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Get AI Recommendations
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <Button
              onClick={() => setCurrentPage('dashboard')}
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg border-2"
            >
              View Dashboard
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto relative mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            How GearSense AI Works
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Our intelligent system makes finding the right product simple and stress-free
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`
            p-8 md:p-12 rounded-3xl
            bg-gradient-to-r from-violet-600 to-purple-600
            shadow-2xl shadow-violet-500/25
            text-white text-center
            relative overflow-hidden
          `}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {[
              { value: '100+', label: 'Products Analyzed', icon: Brain },
              { value: '<3s', label: 'Avg. Response Time', icon: Zap },
              { value: '95%', label: 'User Satisfaction', icon: Shield },
              { value: '3', label: 'Top Recommendations', icon: Sparkles },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
                  <p className="text-violet-200">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          AI recommendations are based on product specifications and general information.
          Please verify specifications and prices before purchase.
        </p>
      </motion.div>
    </div>
  );
}
