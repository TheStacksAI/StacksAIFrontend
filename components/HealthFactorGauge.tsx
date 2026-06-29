'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Shield, TrendingDown } from 'lucide-react';

interface HealthFactorGaugeProps {
  value: number;
  liquidationPrice?: string;
  collateralSymbol?: string;
}

export default function HealthFactorGauge({
  value,
  liquidationPrice,
  collateralSymbol = 'STX',
}: HealthFactorGaugeProps) {
  const clamped = Math.min(Math.max(value, 0), 300);
  const percentage = (clamped / 300) * 100;

  const getStatus = () => {
    if (value >= 200) return { label: 'Safe', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', bar: 'bg-green-500', icon: <Shield className="w-4 h-4" /> };
    if (value >= 150) return { label: 'Stable', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', bar: 'bg-emerald-500', icon: <Shield className="w-4 h-4" /> };
    if (value >= 130) return { label: 'Warning', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', bar: 'bg-amber-500', icon: <AlertTriangle className="w-4 h-4" /> };
    if (value >= 110) return { label: 'Danger', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20', bar: 'bg-orange-500', icon: <AlertTriangle className="w-4 h-4" /> };
    return { label: 'Liquidated', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', bar: 'bg-red-500', icon: <TrendingDown className="w-4 h-4" /> };
  };

  const status = getStatus();

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Health Factor</span>
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
          {status.icon}
          {status.label}
        </div>
      </div>

      {/* Gauge bar */}
      <div className="relative h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        {/* Gradient background zones */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'linear-gradient(to right, #ef4444 0%, #ef4444 36%, #f59e0b 36%, #f59e0b 43%, #22c55e 43%, #22c55e 66%, #16a34a 66%, #16a34a 100%)',
          opacity: 0.15,
        }} />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className={`absolute left-0 top-0 h-full rounded-full ${status.bar} transition-colors duration-500`}
          style={{ maxWidth: '100%' }}
        />
        {/* Indicator dot */}
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 bg-white rounded-full border-2 border-zinc-400 shadow-sm z-10"
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[10px] text-zinc-400">
        <span>0%</span>
        <span>150%</span>
        <span>300%</span>
      </div>

      {/* Value display */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {value.toFixed(0)}%
          </span>
        </div>
        {liquidationPrice && (
          <div className="text-right">
            <span className="text-[10px] text-zinc-400 block">Liquidation at</span>
            <span className="text-xs font-medium text-red-500">
              {collateralSymbol} ${liquidationPrice}
            </span>
          </div>
        )}
      </div>

      {/* Warning */}
      {value < 150 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-1.5 p-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800"
        >
          <AlertTriangle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-red-600 dark:text-red-400">
            {value < 110
              ? 'Position has been liquidated. Your collateral was seized.'
              : `Add more ${collateralSymbol} collateral or repay debt to avoid liquidation.`
            }
          </p>
        </motion.div>
      )}
    </div>
  );
}
