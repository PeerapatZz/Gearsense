'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Laptop,
  Gamepad2,
  Battery,
  Feather,
  Zap,
  ChevronRight,
  ChevronLeft,
  Check,
  Cpu,
  Sparkles,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

// Step configuration
const STEPS = [
  { id: 1, title: 'Product Type', shortTitle: 'Type', icon: Smartphone },
  { id: 2, title: 'Budget', shortTitle: 'Budget', icon: DollarSign },
  { id: 3, title: 'Usage', shortTitle: 'Usage', icon: Zap },
  { id: 4, title: 'Preferences', shortTitle: 'Prefs', icon: Sparkles },
];

// Product type cards
const PRODUCT_TYPES = [
  {
    value: 'smartphone',
    label: 'Smartphone',
    icon: Smartphone,
    description: 'Find the best mobile device',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    value: 'laptop',
    label: 'Laptop',
    icon: Laptop,
    description: 'Choose the right computer',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    value: 'gaming',
    label: 'Gaming Gear',
    icon: Gamepad2,
    description: 'Get the best gaming accessories',
    gradient: 'from-rose-500 to-orange-500'
  },
];

// Usage options
const USAGE_OPTIONS = [
  { value: 'gaming', label: 'Gaming', emoji: '🎮' },
  { value: 'work', label: 'Work / Study', emoji: '💼' },
  { value: 'general', label: 'General Use', emoji: '🌟' },
];

// Animated floating icons for header
const FLOATING_ICONS = [
  { Icon: Smartphone, delay: 0, x: '5%', y: '15%', size: 'w-12 h-12' },
  { Icon: Laptop, delay: 0.5, x: '92%', y: '20%', size: 'w-14 h-14' },
  { Icon: Gamepad2, delay: 1, x: '8%', y: '70%', size: 'w-10 h-10' },
  { Icon: Zap, delay: 1.5, x: '88%', y: '75%', size: 'w-12 h-12' },
];

export function RecommendPage() {
  const { setRequest, setCurrentPage, currentStep, setCurrentStep, nextStep, prevStep } = useAppStore();

  const [productType, setProductType] = useState('');
  const [budget, setBudget] = useState(1000);
  const [budgetInput, setBudgetInput] = useState('1000');
  const [usage, setUsage] = useState('');
  const [preferences, setPreferences] = useState({
    batteryImportant: false,
    lightweight: false,
    highPerformance: false,
  });
  const [direction, setDirection] = useState(0);

  // Clear preferences on product type change
  useEffect(() => {
    setPreferences({
      batteryImportant: false,
      lightweight: false,
      highPerformance: false,
    });
  }, [productType]);

  // Sync slider and input
  useEffect(() => {
    setBudgetInput(budget.toString());
  }, [budget]);

  // Step validation
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!productType;
      case 2:
        return budget >= 100;
      case 3:
        return !!usage;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleBudgetInputChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setBudgetInput(numValue);
    if (numValue) {
      const num = parseInt(numValue, 10);
      if (num >= 100 && num <= 10000) {
        setBudget(num);
      }
    }
  };

  const handleSubmit = () => {
    if (!productType || !budget || !usage) {
      toast.error('Please complete all required fields');
      return;
    }

    setRequest({
      productType,
      budget,
      usage,
      preferences,
    });

    toast.success('Starting AI analysis...', {
      description: 'Finding the best products for you'
    });
    setCurrentPage('loading');
  };

  const handleNext = () => {
    if (!isStepValid(currentStep)) {
      const messages: Record<number, string> = {
        1: 'Please select a product type',
        2: 'Please enter a budget of at least $100',
        3: 'Please select your primary usage',
        4: '',
      };
      if (messages[currentStep]) {
        toast.error(messages[currentStep]);
      }
      return;
    }

    if (currentStep === 4) {
      handleSubmit();
    } else {
      setDirection(1);
      nextStep();
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const canContinue = isStepValid(currentStep);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 relative"
        >
          {/* Floating icons background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {FLOATING_ICONS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: 'easeInOut'
                }}
                className={cn('absolute text-violet-300 dark:text-violet-700', item.size)}
                style={{ left: item.x, top: item.y }}
              >
                <item.Icon className="w-full h-full" />
              </motion.div>
            ))}
          </div>

          {/* Animated gradient background */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 -z-10"
          >
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 border border-violet-200/50 dark:border-violet-700/30 mb-4"
          >
            <Cpu className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span className="text-xs font-medium text-violet-700 dark:text-violet-300">
              Powered by GearSense AI
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
            Find the Perfect Tech Gear
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
            Tell us your needs and GearSense AI will recommend the best tech products for you.
          </p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            'relative rounded-3xl overflow-hidden',
            'bg-white/80 dark:bg-zinc-900/80',
            'backdrop-blur-xl',
            'border border-white/50 dark:border-zinc-700/50',
            'shadow-[0_8px_40px_rgba(0,0,0,0.08)]',
          )}
        >
          {/* Step Indicator */}
          <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-center gap-0">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex items-center">
                    {/* Step Circle + Label Container */}
                    <div className="flex flex-col items-center">
                      {/* Step Circle - Perfect 44px × 44px circle */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.05 : 1,
                        }}
                        className={cn(
                          'w-[44px] h-[44px] rounded-full flex items-center justify-center',
                          'transition-colors duration-300 flex-shrink-0',
                          isCompleted
                            ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                            : isActive
                              ? 'bg-gradient-to-r from-violet-500 to-purple-500 ring-4 ring-violet-500/20'
                              : 'bg-zinc-100 dark:bg-zinc-800'
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className={cn(
                            'w-5 h-5',
                            isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-500'
                          )} />
                        )}
                      </motion.div>

                      {/* Step Label - Centered under circle */}
                      <p className={cn(
                        'mt-2 text-xs font-medium transition-colors text-center whitespace-nowrap',
                        isActive
                          ? 'text-violet-600 dark:text-violet-400'
                          : isCompleted
                            ? 'text-zinc-700 dark:text-zinc-300'
                            : 'text-zinc-400 dark:text-zinc-500'
                      )}>
                        {step.title}
                      </p>
                    </div>

                    {/* Connector Line - Between circles, aligned to center */}
                    {index < STEPS.length - 1 && (
                      <div className="flex items-center w-16 sm:w-24">
                        <div className={cn(
                          'h-0.5 w-full transition-colors duration-300',
                          isCompleted
                            ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                            : 'bg-zinc-200 dark:bg-zinc-700'
                        )} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8 min-h-[340px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {/* Step 1: Product Type */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                      What are you looking for?
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Select a product category to get started
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PRODUCT_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = productType === type.value;

                      return (
                        <motion.button
                          key={type.value}
                          type="button"
                          onClick={() => setProductType(type.value)}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'relative p-5 rounded-2xl border-2 transition-all duration-300',
                            'flex flex-col items-center gap-3 text-center',
                            'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
                            isSelected
                              ? 'border-violet-500 bg-violet-50/50 dark:bg-violet-950/30'
                              : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800/50'
                          )}
                        >
                          {/* Selection indicator */}
                          {isSelected && (
                            <motion.div
                              layoutId="productTypeIndicator"
                              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5"
                            />
                          )}

                          {/* Icon */}
                          <div className={cn(
                            'w-14 h-14 rounded-2xl flex items-center justify-center',
                            'transition-all duration-300',
                            isSelected
                              ? `bg-gradient-to-br ${type.gradient} shadow-lg`
                              : 'bg-zinc-100 dark:bg-zinc-700'
                          )}>
                            <Icon className={cn(
                              'w-7 h-7',
                              isSelected ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'
                            )} />
                          </div>

                          {/* Text */}
                          <div>
                            <p className={cn(
                              'font-semibold mb-0.5',
                              isSelected ? 'text-violet-700 dark:text-violet-300' : 'text-zinc-700 dark:text-zinc-300'
                            )}>
                              {type.label}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {type.description}
                            </p>
                          </div>

                          {/* Check mark */}
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Budget */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                      What&apos;s your budget?
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Higher budgets allow more premium recommendations
                    </p>
                  </div>

                  {/* Budget display */}
                  <div className="text-center py-6">
                    <div className="inline-flex items-baseline gap-1">
                      <span className="text-2xl text-zinc-400">$</span>
                      <motion.span
                        key={budget}
                        initial={{ scale: 1.1, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {budget.toLocaleString()}
                      </motion.span>
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="px-2">
                    <Slider
                      value={[budget]}
                      onValueChange={([value]) => {
                        setBudget(value);
                        setBudgetInput(value.toString());
                      }}
                      min={100}
                      max={5000}
                      step={50}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-zinc-400 mt-2">
                      <span>$100</span>
                      <span>$5,000+</span>
                    </div>
                  </div>

                  {/* Manual input */}
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-sm text-zinc-500">Or enter manually:</span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                      <Input
                        type="text"
                        value={budgetInput}
                        onChange={(e) => handleBudgetInputChange(e.target.value)}
                        onBlur={() => {
                          const num = parseInt(budgetInput, 10);
                          if (num >= 100 && num <= 10000) {
                            setBudget(num);
                          } else {
                            setBudgetInput(budget.toString());
                          }
                        }}
                        className="w-32 pl-7 text-center"
                        placeholder="1000"
                      />
                    </div>
                  </div>

                  {/* Quick budget buttons */}
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {[500, 1000, 1500, 2000, 3000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setBudget(amount);
                          setBudgetInput(amount.toString());
                        }}
                        className={cn(
                          'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                          budget === amount
                            ? 'bg-violet-500 text-white shadow-md shadow-violet-500/25'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-violet-100 dark:hover:bg-violet-900/30'
                        )}
                      >
                        ${amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Usage */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                      How will you use it?
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      This helps us recommend products that match your lifestyle
                    </p>
                  </div>

                  {/* Usage pills */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {USAGE_OPTIONS.map((option) => {
                      const isSelected = usage === option.value;

                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => setUsage(option.value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            'px-6 py-4 rounded-2xl border-2 transition-all duration-300',
                            'flex items-center gap-3',
                            'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
                            isSelected
                              ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 shadow-lg shadow-violet-500/10'
                              : 'border-zinc-200 dark:border-zinc-700 hover:border-violet-300 dark:hover:border-violet-600 bg-white dark:bg-zinc-800/50'
                          )}
                        >
                          <span className="text-2xl">{option.emoji}</span>
                          <span className={cn(
                            'font-medium',
                            isSelected ? 'text-violet-700 dark:text-violet-300' : 'text-zinc-600 dark:text-zinc-400'
                          )}>
                            {option.label}
                          </span>

                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Optional Preferences */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                      Any preferences?
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Optional settings to fine-tune your recommendations
                    </p>
                  </div>



                  {/* Preference toggles */}
                  <div className="max-w-sm mx-auto space-y-3">
                    {[
                      { key: 'highPerformance', label: 'Prioritize performance', icon: Zap, desc: 'Focus on speed and power' },
                      { key: 'batteryImportant', label: 'Long battery life', icon: Battery, desc: 'Extended usage time' },
                      { key: 'lightweight', label: 'Lightweight device', icon: Feather, desc: 'Easy to carry' },
                    ].map((pref) => {
                      const Icon = pref.icon;
                      return (
                        <label
                          key={pref.key}
                          className={cn(
                            'flex items-center gap-4 p-4 rounded-xl border cursor-pointer',
                            'transition-all duration-200',
                            'hover:border-violet-200 dark:hover:border-violet-700',
                            preferences[pref.key as keyof typeof preferences]
                              ? 'border-violet-300 dark:border-violet-600 bg-violet-50/50 dark:bg-violet-950/20'
                              : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50'
                          )}
                        >
                          <Checkbox
                            checked={preferences[pref.key as keyof typeof preferences] as boolean}
                            onCheckedChange={(checked) =>
                              setPreferences(prev => ({ ...prev, [pref.key]: checked === true }))
                            }
                            className="data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
                          />
                          <Icon className="w-5 h-5 text-violet-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                              {pref.label}
                            </p>
                            <p className="text-xs text-zinc-500">{pref.desc}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer with Navigation */}
          <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={cn(
                  'gap-2',
                  currentStep === 1 && 'invisible'
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <span>Step {currentStep} of {STEPS.length}</span>
              </div>

              <Button
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
                className={cn(
                  'gap-2 min-w-[160px]',
                  'bg-gradient-to-r from-violet-600 to-purple-600',
                  'hover:from-violet-700 hover:to-purple-700',
                  'text-white shadow-lg shadow-violet-500/20',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'disabled:hover:from-violet-600 disabled:hover:to-purple-600'
                )}
              >
                {currentStep === 4 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get Recommendations
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
