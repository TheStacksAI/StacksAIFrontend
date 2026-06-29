'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Bitcoin, Lock, Clock, ArrowRight } from 'lucide-react';

interface StackingCalculatorProps {
  currentAPY?: number;
  minSTX?: number;
  onStack?: (amount: number, cycles: number) => void;
}

const CYCLE_DAYS = 14;

export default function StackingCalculator({
  currentAPY = 7.5,
  minSTX = 1000,
  onStack,
}: StackingCalculatorProps) {
  const [amount, setAmount] = useState<number>(minSTX);
  const [cycles, setCycles] = useState(6);

  const estimatedBTCPerCycle = amount * (currentAPY / 100) / 12 / 100; // rough BTC/stx ratio
  const totalBTC = estimatedBTCPerCycle * cycles;
  const lockDays = cycles * CYCLE_DAYS;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 space-y-4"
    >
      <div className="flex items-center gap-2">
        <Calculator className="w-4 h-4 text-accent-indigo" />
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Stacking Calculator</h3>
      </div>

      {/* Amount Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs text-zinc-500">Amount to Stack</label>
          <span className="text-sm font-bold text-accent-indigo">{amount.toLocaleString()} STX</span>
        </div>
        <input
          type="range"
          min={minSTX}
          max={100000}
          step={100}
          value={amount}
          onChange={handleSliderChange}
          className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-accent-indigo"
        />
        <div className="flex justify-between text-[10px] text-zinc-400">
          <span>{minSTX.toLocaleString()} STX</span>
          <span>100,000 STX</span>
        </div>
      </div>

      {/* Cycles selector */}
      <div className="space-y-2">
        <label className="text-xs text-zinc-500">Lock Duration</label>
        <div className="flex gap-1.5">
          {[1, 3, 6, 12].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCycles(c)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                cycles === c
                  ? 'bg-accent-indigo text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {c} cycle{c > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <motion.div
        key={`${amount}-${cycles}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Bitcoin className="w-3 h-3" />
            Estimated BTC Reward
          </div>
          <span className="text-sm font-semibold text-amber-600">~{totalBTC.toFixed(6)} BTC</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Lock className="w-3 h-3" />
            APY
          </div>
          <span className="text-sm font-semibold text-green-600">{currentAPY}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock className="w-3 h-3" />
            Lock Period
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{lockDays} days</span>
        </div>
      </motion.div>

      {/* CTA */}
      {onStack && (
        <button
          onClick={() => onStack(amount, cycles)}
          className="w-full py-2.5 px-4 rounded-xl bg-accent-indigo hover:bg-accent-indigo-hover text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Stack {amount.toLocaleString()} STX
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}
