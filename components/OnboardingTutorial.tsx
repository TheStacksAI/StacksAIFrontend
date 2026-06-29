'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Wallet, TrendingUp, Zap, CheckCircle, Sparkles } from 'lucide-react';

const TUTORIAL_KEY = 'satsai-tutorial-completed';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  highlight?: string;
}

const steps: Step[] = [
  {
    icon: <Wallet className="w-5 h-5" />,
    title: 'Connect Your Wallet',
    description: 'Start by connecting your Stacks wallet. This lets you check balances, swap tokens, and interact with DeFi protocols — all through conversation.',
    action: 'Click "Connect Wallet" in the top-right corner',
    highlight: 'wallet',
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Check Your Balance',
    description: 'Ask "What\'s my STX balance?" or try any of the suggested actions below the chat input. SatsAI will read your wallet and show you real-time data.',
    action: 'Try: "Show me my STX balance"',
    highlight: 'chat',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Execute Your First Swap',
    description: 'Ready to trade? Say "Swap 10 STX for ALEX" and SatsAI will find the best route across all DEXes on Stacks.',
    action: 'Try: "Swap 10 STX for ALEX"',
    highlight: 'swap',
  },
];

export default function OnboardingTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(true);

  useEffect(() => {
    const completed = localStorage.getItem(TUTORIAL_KEY);
    if (!completed) {
      setHasCompleted(false);
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTutorial = useCallback(() => {
    localStorage.setItem(TUTORIAL_KEY, 'true');
    setHasCompleted(true);
    setIsOpen(false);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      completeTutorial();
    }
  }, [currentStep, completeTutorial]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  }, []);

  if (hasCompleted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 w-full max-w-sm overflow-hidden"
          >
            {/* Progress bar */}
            <div className="h-1 bg-zinc-100 dark:bg-zinc-800">
              <motion.div
                className="h-full bg-accent-indigo"
                initial={{ width: `${(currentStep / steps.length) * 100}%` }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Close button */}
            <button
              onClick={() => { setIsOpen(false); setHasCompleted(true); }}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-10"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>

            <div className="p-6">
              {/* Step indicator */}
              <div className="flex items-center gap-1.5 mb-4">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentStep ? 'w-6 bg-accent-indigo' : 'w-1.5 bg-zinc-200 dark:bg-zinc-700'
                    }`}
                  />
                ))}
                <span className="ml-auto text-xs text-zinc-400">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>

              {/* Icon */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-12 h-12 rounded-xl bg-accent-indigo/10 text-accent-indigo flex items-center justify-center mb-4"
              >
                {steps[currentStep].icon}
              </motion.div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                    {steps[currentStep].description}
                  </p>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-accent-indigo/5 border border-accent-indigo/10">
                    <Sparkles className="w-4 h-4 text-accent-indigo flex-shrink-0" />
                    <span className="text-xs text-accent-indigo font-medium">
                      {steps[currentStep].action}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-600 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={nextStep}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-indigo hover:bg-accent-indigo-hover text-white text-sm font-medium transition-colors"
              >
                {currentStep < steps.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Get Started
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
