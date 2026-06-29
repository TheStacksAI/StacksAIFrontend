'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, Clock, ArrowRight } from 'lucide-react';

export interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}

interface ProgressiveStatusProps {
  steps: ProgressStep[];
  title?: string;
  onCancel?: () => void;
}

export default function ProgressiveStatus({ steps, title, onCancel }: ProgressiveStatusProps) {
  const activeIndex = steps.findIndex(s => s.status === 'active');
  const isComplete = steps.every(s => s.status === 'completed');
  const hasError = steps.some(s => s.status === 'error');

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow-lg"
    >
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
          {onCancel && !isComplete && !hasError && (
            <button
              onClick={onCancel}
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      <div className="space-y-2">
        {steps.map((step, index) => {
          const isActive = step.status === 'active';
          const isCompleted = step.status === 'completed';
          const isError = step.status === 'error';

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              {/* Status indicator */}
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
                {isActive && (
                  <Loader2 className="w-4 h-4 text-accent-indigo animate-spin" />
                )}
                {isError && (
                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">!</span>
                  </div>
                )}
                {step.status === 'pending' && (
                  <Clock className="w-4 h-4 text-zinc-300" />
                )}
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-2.5 top-5 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />
              )}

              {/* Label */}
              <div className="flex-1 min-w-0">
                <span className={`text-sm ${
                  isCompleted ? 'text-green-700 dark:text-green-300 line-through opacity-60' :
                  isActive ? 'text-zinc-900 dark:text-zinc-100 font-medium' :
                  isError ? 'text-red-600 font-medium' :
                  'text-zinc-400'
                }`}>
                  {step.label}
                </span>
              </div>

              {isActive && (
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-3 h-3 text-accent-indigo" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{
            width: `${(steps.filter(s => s.status === 'completed' || s.status === 'error').length / steps.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            hasError ? 'bg-red-500' : 'bg-accent-indigo'
          }`}
        />
      </div>

      {isComplete && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-xs text-green-600 font-medium"
        >
          Complete
        </motion.p>
      )}
      {hasError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-xs text-red-600 font-medium"
        >
          Operation failed
        </motion.p>
      )}
    </motion.div>
  );
}
