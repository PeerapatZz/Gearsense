'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Search, Target, CheckCircle2, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Steps moved inside component for translation


interface LoadingExperienceProps {
  onComplete?: () => void;
}

import { useLanguage } from '@/context/LanguageContext';

export function LoadingExperience({ onComplete }: LoadingExperienceProps) {
  const { t } = useLanguage();

  const loadingSteps = [
    { message: t('load.step1.msg'), icon: Target, description: t('load.step1.desc') },
    { message: t('load.step2.msg'), icon: Search, description: t('load.step2.desc') },
    { message: t('load.step3.msg'), icon: Cpu, description: t('load.step3.desc') },
    { message: t('load.step4.msg'), icon: Zap, description: t('load.step4.desc') },
    { message: t('load.step5.msg'), icon: Sparkles, description: t('load.step5.desc') },
    { message: t('load.step6.msg'), icon: CheckCircle2, description: t('load.step6.desc') },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 900;
    const progressInterval = 40;
    const progressIncrement = 100 / (loadingSteps.length * (stepDuration / progressInterval));

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressIncrement;
        return Math.min(next, 99);
      });
    }, progressInterval);

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        clearInterval(progressTimer);
        setProgress(100);
        setTimeout(() => onComplete?.(), 400);
        return prev;
      });
    }, stepDuration);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  const currentStepData = loadingSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'w-full max-w-md p-8 rounded-3xl text-center relative overflow-hidden',
          'bg-white/80 dark:bg-zinc-900/80',
          'backdrop-blur-xl',
          'border border-white/30 dark:border-zinc-700/30',
          'shadow-[0_8px_40px_rgba(0,0,0,0.1)]'
        )}
      >
        {/* Animated gradient background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-full blur-3xl"
        />

        {/* Main icon container */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer pulsing rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.4 + i * 0.2, 1],
                opacity: [0.3 - i * 0.1, 0, 0.3 - i * 0.1],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full border-2 border-violet-500/30"
            />
          ))}

          {/* Rotating gradient ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgb(139 92 246 / 0.5), transparent, rgb(168 85 247 / 0.5), transparent)',
            }}
          />

          {/* Inner rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 rounded-full"
            style={{
              background: 'conic-gradient(from 180deg, transparent, rgb(99 102 241 / 0.4), transparent, rgb(168 85 247 / 0.4), transparent)',
            }}
          />

          {/* Center content */}
          <div className="absolute inset-5 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl shadow-violet-500/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              >
                <Icon className="w-9 h-9 text-white" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 mb-6 relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </motion.div>
          <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
            {t('load.aiProcessing')}
          </span>
        </motion.div>

        {/* Current step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              {currentStepData.message}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {currentStepData.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="mt-8 space-y-3 relative">
          <div className="relative overflow-hidden rounded-full">
            <Progress
              value={progress}
              className="h-2.5 bg-zinc-100 dark:bg-zinc-800"
            />
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {t('load.processing')}
            </p>
            <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-2 mt-6">
          {loadingSteps.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                scale: currentStep === index ? 1.4 : 1,
                backgroundColor: index < currentStep
                  ? 'rgb(34 197 94)' // green-500
                  : index === currentStep
                    ? 'rgb(139 92 246)' // violet-500
                    : 'rgb(228 228 231)', // zinc-200
              }}
              transition={{ duration: 0.2 }}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentStep && 'ring-4 ring-violet-500/20'
              )}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
