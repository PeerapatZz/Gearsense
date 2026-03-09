'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Filter, Calendar, DollarSign, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface HistoryItem {
  id: string;
  productType: string;
  budget: number;
  usage: string;
  topRecommendation: string;
  createdAt: string;
}

// Mock data for demo
const mockHistory: HistoryItem[] = [
  {
    id: '1',
    productType: 'Smartphone',
    budget: 800,
    usage: 'Work',
    topRecommendation: 'iPhone 15',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    productType: 'Laptop',
    budget: 1500,
    usage: 'Gaming',
    topRecommendation: 'ASUS ROG Zephyrus G16',
    createdAt: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    productType: 'Gaming Gear',
    budget: 300,
    usage: 'Gaming',
    topRecommendation: 'Logitech G Pro X Superlight 2',
    createdAt: '2024-01-13T09:20:00Z',
  },
];

export function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory);
  const [typeFilter, setTypeFilter] = useState('all');
  const [usageFilter, setUsageFilter] = useState('all');

  const filteredHistory = history.filter((item) => {
    if (typeFilter !== 'all' && item.productType.toLowerCase() !== typeFilter) return false;
    if (usageFilter !== 'all' && item.usage.toLowerCase() !== usageFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <HistoryIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Recommendation History
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            View your past recommendation requests and results
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn(
            'p-4 rounded-2xl mb-6',
            'bg-white/60 dark:bg-zinc-900/60',
            'backdrop-blur-xl',
            'border border-white/30 dark:border-zinc-700/30',
            'flex flex-wrap gap-4 items-center'
          )}
        >
          <div className="flex items-center gap-2 text-zinc-500">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue placeholder="Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="smartphone">Smartphone</SelectItem>
              <SelectItem value="laptop">Laptop</SelectItem>
              <SelectItem value="gaming">Gaming Gear</SelectItem>
            </SelectContent>
          </Select>

          <Select value={usageFilter} onValueChange={setUsageFilter}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue placeholder="Usage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Usage</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTypeFilter('all');
              setUsageFilter('all');
            }}
            className="text-zinc-500"
          >
            Clear
          </Button>
        </motion.div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                'p-8 rounded-2xl text-center',
                'bg-white/60 dark:bg-zinc-900/60',
                'backdrop-blur-xl',
                'border border-white/30 dark:border-zinc-700/30'
              )}
            >
              <HistoryIcon className="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500 dark:text-zinc-400">No history found</p>
            </motion.div>
          ) : (
            filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className={cn(
                  'p-5 rounded-2xl',
                  'bg-white/60 dark:bg-zinc-900/60',
                  'backdrop-blur-xl',
                  'border border-white/30 dark:border-zinc-700/30',
                  'hover:border-violet-300 dark:hover:border-violet-700',
                  'transition-colors cursor-pointer',
                  'group'
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 flex items-center justify-center">
                      <Package className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.productType}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.usage}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Top pick: <span className="font-medium text-violet-600 dark:text-violet-400">{item.topRecommendation}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                      <DollarSign className="w-4 h-4" />
                      <span>${item.budget}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-violet-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
