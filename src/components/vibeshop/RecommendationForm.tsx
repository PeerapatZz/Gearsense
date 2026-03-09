'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Laptop,
  Gamepad2,
  Battery,
  Feather,
  Zap,
  Tag,
  ChevronRight,
  ChevronLeft,
  Check,
  Cpu,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

const STEPS = [
  { id: 1, title: 'Product Type', description: 'What are you looking for?' },
  { id: 2, title: 'Budget', description: 'Set your price range' },
  { id: 3, title: 'Usage', description: 'How will you use it?' },
  { id: 4, title: 'Preferences', description: 'Any specific needs?' },
];

const productTypes = [
  { value: 'smartphone', label: 'Smartphone', icon: Smartphone, description: 'Find your perfect phone' },
  { value: 'laptop', label: 'Laptop', icon: Laptop, description: 'Discover ideal laptops' },
  { value: 'gaming', label: 'Gaming Gear', icon: Gamepad2, description: 'Level up your setup' },
];

const usageOptions = [
  { value: 'gaming', label: 'Gaming', description: 'High performance for games', icon: '🎮' },
  { value: 'work', label: 'Work / Study', description: 'Productivity focused', icon: '💼' },
  { value: 'general', label: 'General Use', description: 'Everyday tasks', icon: '🌟' },
];

export function RecommendationForm() {
  const { setRequest, setCurrentPage, currentStep, setCurrentStep, nextStep, prevStep } = useAppStore();

  const [productType, setProductType] = useState('');
  const [budget, setBudget] = useState('');
  const [usage, setUsage] = useState('');
  const [preferences, setPreferences] = useState({
    batteryImportant: false,
    lightweight: false,
    highPerformance: false,
    preferredBrand: '',
  });
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);

  // Load brands from database when product type changes
  useEffect(() => {
    const fetchBrands = async () => {
      if (!productType) {
        setBrands([]);
        return;
      }

      setIsLoadingBrands(true);
      try {
        const response = await fetch(`/api/brands?category=${productType}`);
        const data = await response.json();
        setBrands(data.brands || []);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
        setBrands([]);
      } finally {
        setIsLoadingBrands(false);
      }
    };

    fetchBrands();
    // Reset brand preference when category changes
    setPreferences(prev => ({ ...prev, preferredBrand: '' }));
  }, [productType]);

  // Step validation
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!productType;
      case 2:
        return !!budget && parseFloat(budget) > 0;
      case 3:
        return !!usage;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (!productType || !budget || !usage) {
      toast.error('Please complete all required fields');
      return;
    }

    setRequest({
      productType,
      budget: parseFloat(budget),
      usage,
      preferences,
    });

    toast.success('Starting AI analysis...', {
      description: 'Analyzing products that match your criteria'
    });
    setCurrentPage('loading');
  };

  const handleNext = () => {
    if (!isStepValid(currentStep)) {
      // Show validation toast
      const messages: Record<number, string> = {
        1: 'Please select a product type',
        2: 'Please enter a valid budget',
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
      nextStep();
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const canContinue = isStepValid(currentStep);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'w-full max-w-2xl mx-auto p-8 rounded-3xl',
        'bg-white/70 dark:bg-zinc-900/70',
        'backdrop-blur-xl',
        'border border-white/30 dark:border-zinc-700/30',
        'shadow-[0_8px_32px_rgba(0,0,0,0.1)]'
      )}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 mb-4"
        >
          <Cpu className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
            AI-Powered Recommendations
          </span>
        </motion.div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Find Your Perfect Product
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Answer a few questions and let AI find the best match
        </p>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                  }}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    'border-2 transition-colors duration-300',
                    currentStep >= step.id
                      ? 'border-violet-500 bg-violet-500'
                      : 'border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className={cn(
                      'font-semibold text-sm',
                      currentStep >= step.id ? 'text-white' : 'text-zinc-500'
                    )}>
                      {step.id}
                    </span>
                  )}
                </motion.div>
                <div className="mt-2 text-center">
                  <p className={cn(
                    'text-xs font-medium',
                    currentStep >= step.id
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-zinc-400 dark:text-zinc-600'
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-600 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div className={cn(
                  'h-0.5 flex-1 mx-2 mt-[-24px]',
                  currentStep > step.id
                    ? 'bg-violet-500'
                    : 'bg-zinc-200 dark:bg-zinc-700'
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="min-h-[280px] relative overflow-hidden">
        <AnimatePresence mode="wait" custom={currentStep}>
          {/* Step 1: Product Type */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 block">
                What are you looking for? <span className="text-rose-500">*</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {productTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = productType === type.value;
                  return (
                    <motion.button
                      key={type.value}
                      type="button"
                      onClick={() => setProductType(type.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'p-6 rounded-2xl border-2 transition-all duration-200',
                        'flex flex-col items-center gap-3 text-center',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
                        isSelected
                          ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 shadow-lg shadow-violet-500/10'
                          : 'border-zinc-200 dark:border-zinc-700 hover:border-violet-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                      )}
                    >
                      <div
                        className={cn(
                          'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors',
                          isSelected
                            ? 'bg-violet-500 text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                        )}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <p
                          className={cn(
                            'font-semibold',
                            isSelected ? 'text-violet-700 dark:text-violet-300' : 'text-zinc-700 dark:text-zinc-300'
                          )}
                        >
                          {type.label}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          {type.description}
                        </p>
                      </div>
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
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Label htmlFor="budget" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 block">
                What&apos;s your budget? <span className="text-rose-500">*</span>
              </Label>
              <div className="space-y-6">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-zinc-400 font-medium">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="pl-10 h-16 text-2xl rounded-2xl border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                {/* Quick budget buttons */}
                <div className="flex flex-wrap gap-2">
                  {[500, 800, 1000, 1500, 2000, 3000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setBudget(amount.toString())}
                      className={cn(
                        'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
                        budget === amount.toString()
                          ? 'bg-violet-500 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-violet-100 dark:hover:bg-violet-900/30'
                      )}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {budget && parseFloat(budget) > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    We&apos;ll find products within 15% of your ${budget} budget
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Usage */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 block">
                How will you primarily use it? <span className="text-rose-500">*</span>
              </Label>
              <div className="space-y-3">
                {usageOptions.map((option) => {
                  const isSelected = usage === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => setUsage(option.value)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        'w-full p-5 rounded-2xl border-2 text-left transition-all duration-200',
                        'flex items-center gap-4',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
                        isSelected
                          ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 shadow-lg shadow-violet-500/10'
                          : 'border-zinc-200 dark:border-zinc-700 hover:border-violet-300'
                      )}
                    >
                      <span className="text-3xl">{option.icon}</span>
                      <div>
                        <p
                          className={cn(
                            'font-semibold text-lg',
                            isSelected ? 'text-violet-700 dark:text-violet-300' : 'text-zinc-700 dark:text-zinc-300'
                          )}
                        >
                          {option.label}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {option.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4 block">
                Any specific preferences? <span className="text-zinc-400">(Optional)</span>
              </Label>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'batteryImportant', label: 'Battery Life Important', icon: Battery, desc: 'Long-lasting battery' },
                    { key: 'lightweight', label: 'Lightweight', icon: Feather, desc: 'Easy to carry' },
                    { key: 'highPerformance', label: 'High Performance', icon: Zap, desc: 'Maximum speed' },
                  ].map((pref) => {
                    const Icon = pref.icon;
                    return (
                      <label
                        key={pref.key}
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200',
                          'focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2',
                          preferences[pref.key as keyof typeof preferences]
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 shadow-md'
                            : 'border-zinc-200 dark:border-zinc-700 hover:border-violet-300'
                        )}
                      >
                        <Checkbox
                          checked={preferences[pref.key as keyof typeof preferences] as boolean}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({ ...prev, [pref.key]: checked === true }))
                          }
                          className="data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
                        />
                        <Icon className="w-5 h-5 text-violet-500" />
                        <div>
                          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {pref.label}
                          </p>
                          <p className="text-xs text-zinc-500">{pref.desc}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Brand preference - Dynamic from database */}
                <div className="mt-4">
                  <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    <Tag className="w-4 h-4" />
                    Preferred Brand <span className="text-zinc-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      value={preferences.preferredBrand}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, preferredBrand: e.target.value }))}
                      disabled={isLoadingBrands}
                      className={cn(
                        'w-full h-12 px-4 rounded-2xl appearance-none',
                        'border border-zinc-200 dark:border-zinc-700',
                        'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
                        'focus:outline-none focus:ring-2 focus:ring-violet-500',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                    >
                      <option value="">Select brand...</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    {isLoadingBrands && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-4 h-4 animate-spin text-violet-500" />
                      </div>
                    )}
                  </div>
                  {brands.length === 0 && !isLoadingBrands && productType && (
                    <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-2xl">
                      <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">
                        Database is empty!
                      </p>
                      <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 mb-3">
                        No products found in Supabase. You need to seed the data to see brands and get recommendations.
                      </p>
                      <a
                        href="/api/seed"
                        target="_blank"
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-100 rounded-xl hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors"
                      >
                        Click here to Seed Database automatically
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className={cn(
            'rounded-xl px-6',
            currentStep === 1 && 'invisible'
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          type="button"
          onClick={handleNext}
          disabled={!canContinue}
          className={cn(
            'rounded-xl px-8',
            'bg-gradient-to-r from-violet-600 to-purple-600',
            'hover:from-violet-700 hover:to-purple-700',
            'text-white shadow-lg shadow-violet-500/25',
            'transition-all duration-200',
            !canContinue && 'opacity-50 cursor-not-allowed hover:from-violet-600 hover:to-purple-600'
          )}
        >
          {currentStep === 4 ? (
            <>
              <Cpu className="w-4 h-4 mr-2" />
              Get AI Recommendations
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
