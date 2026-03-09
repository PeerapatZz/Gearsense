'use client';

import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ThumbsUp, 
  Package,
  Smartphone,
  Laptop,
  Gamepad2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

// Mock analytics data
const metrics = [
  { 
    label: 'Total Recommendations', 
    value: '156', 
    change: '+12%', 
    icon: TrendingUp,
    color: 'from-violet-500 to-purple-600' 
  },
  { 
    label: 'Avg Response Time', 
    value: '2.3s', 
    change: '-8%', 
    icon: Clock,
    color: 'from-emerald-500 to-teal-600' 
  },
  { 
    label: 'Most Requested', 
    value: 'Smartphones', 
    change: '45%', 
    icon: Package,
    color: 'from-blue-500 to-indigo-600' 
  },
  { 
    label: 'Feedback Rate', 
    value: '89%', 
    change: '+5%', 
    icon: ThumbsUp,
    color: 'from-amber-500 to-orange-600' 
  },
];

const requestsOverTime = [
  { name: 'Mon', requests: 12 },
  { name: 'Tue', requests: 19 },
  { name: 'Wed', requests: 15 },
  { name: 'Thu', requests: 25 },
  { name: 'Fri', requests: 32 },
  { name: 'Sat', requests: 28 },
  { name: 'Sun', requests: 18 },
];

const categoryData = [
  { name: 'Smartphones', value: 45, color: '#8b5cf6' },
  { name: 'Laptops', value: 35, color: '#6366f1' },
  { name: 'Gaming', value: 20, color: '#a855f7' },
];

const usageData = [
  { name: 'Gaming', users: 45 },
  { name: 'Work', users: 62 },
  { name: 'General', users: 38 },
];

const budgetRanges = [
  { range: '$0-500', count: 28 },
  { range: '$500-1000', count: 45 },
  { range: '$1000-2000', count: 52 },
  { range: '$2000+', count: 31 },
];

export function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            Track recommendation performance and user behavior
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'p-5 rounded-2xl',
                  'bg-white/60 dark:bg-zinc-900/60',
                  'backdrop-blur-xl',
                  'border border-white/30 dark:border-zinc-700/30'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center',
                    `bg-gradient-to-br ${metric.color}`
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={cn(
                    'text-xs font-medium px-2 py-1 rounded-full',
                    metric.change.startsWith('+') 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                  )}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {metric.value}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Requests Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              'p-6 rounded-2xl',
              'bg-white/60 dark:bg-zinc-900/60',
              'backdrop-blur-xl',
              'border border-white/30 dark:border-zinc-700/30'
            )}
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Recommendation Requests Over Time
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={requestsOverTime}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRequests)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={cn(
              'p-6 rounded-2xl',
              'bg-white/60 dark:bg-zinc-900/60',
              'backdrop-blur-xl',
              'border border-white/30 dark:border-zinc-700/30'
            )}
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Product Category Popularity
            </h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Usage Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
              'p-6 rounded-2xl',
              'bg-white/60 dark:bg-zinc-900/60',
              'backdrop-blur-xl',
              'border border-white/30 dark:border-zinc-700/30'
            )}
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Usage Type Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar 
                  dataKey="users" 
                  fill="#8b5cf6" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Budget Ranges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={cn(
              'p-6 rounded-2xl',
              'bg-white/60 dark:bg-zinc-900/60',
              'backdrop-blur-xl',
              'border border-white/30 dark:border-zinc-700/30'
            )}
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Budget Range Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={budgetRanges} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis dataKey="range" type="category" stroke="#9ca3af" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  fill="#6366f1" 
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Category Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-4 mt-6"
        >
          {[
            { label: 'Smartphones', count: 12, icon: Smartphone, trend: '+15%' },
            { label: 'Laptops', count: 8, icon: Laptop, trend: '+8%' },
            { label: 'Gaming Gear', count: 16, icon: Gamepad2, trend: '+22%' },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.label}
                className={cn(
                  'p-4 rounded-2xl flex items-center gap-4',
                  'bg-white/60 dark:bg-zinc-900/60',
                  'backdrop-blur-xl',
                  'border border-white/30 dark:border-zinc-700/30'
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{cat.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {cat.count}
                    </span>
                    <span className="text-xs text-emerald-500">{cat.trend}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
