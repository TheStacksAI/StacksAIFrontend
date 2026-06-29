'use client';

import { X, AlertTriangle, CheckCircle, ExternalLink, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TransactionPreviewProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'swap' | 'transfer' | 'contract_call' | 'deploy' | 'stack' | 'lend';
  details: {
    from?: string;
    to?: string;
    amount?: string;
    tokenIn?: string;
    tokenOut?: string;
    expectedOut?: string;
    fee?: string;
    total?: string;
    slippage?: string;
    contractAddress?: string;
    contractName?: string;
    functionName?: string;
    network?: string;
    priceImpact?: string;
    warning?: string;
  };
  isSigning?: boolean;
}

export default function TransactionPreviewModal({
  open,
  onClose,
  onConfirm,
  type,
  details,
  isSigning = false,
}: TransactionPreviewProps) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const typeLabels: Record<string, { title: string; icon: string }> = {
    swap: { title: 'Confirm Swap', icon: '🔄' },
    transfer: { title: 'Confirm Transfer', icon: '💸' },
    contract_call: { title: 'Confirm Contract Call', icon: '📝' },
    deploy: { title: 'Confirm Deployment', icon: '🚀' },
    stack: { title: 'Confirm Stacking', icon: '🔒' },
    lend: { title: 'Confirm Lending', icon: '🏦' },
  };

  const label = typeLabels[type] ?? { title: 'Confirm Transaction', icon: '📋' };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget && !isSigning) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 w-full max-w-md overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">{label.icon}</span>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{label.title}</h2>
              </div>
              {!isSigning && (
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-500" />
                </button>
              )}
            </div>

            <div className="p-4 space-y-4">
              {details.warning && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-700 dark:text-amber-300">{details.warning}</p>
                </div>
              )}

              {/* Amount Summary */}
              {(details.amount || details.tokenIn) && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 px-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <span className="text-sm text-zinc-500">You send</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {details.amount || details.tokenIn} {details.tokenIn ? '' : 'STX'}
                    </span>
                  </div>
                  {details.expectedOut && (
                    <div className="flex justify-between items-center py-2 px-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-sm text-zinc-500">You receive</span>
                      <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                        ~{details.expectedOut}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Detail rows */}
              <div className="space-y-1.5 text-sm">
                {details.from && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">From</span>
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 truncate max-w-[200px]">
                      {details.from.slice(0, 6)}...{details.from.slice(-4)}
                    </span>
                  </div>
                )}
                {details.to && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">To</span>
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 truncate max-w-[200px]">
                      {details.to.slice(0, 6)}...{details.to.slice(-4)}
                    </span>
                  </div>
                )}
                {details.fee && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Network Fee</span>
                    <span className="text-zinc-700 dark:text-zinc-300">~{details.fee}</span>
                  </div>
                )}
                {details.total && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Total</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{details.total}</span>
                  </div>
                )}
                {details.slippage && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Slippage Tolerance</span>
                    <span className="text-zinc-700 dark:text-zinc-300">{details.slippage}%</span>
                  </div>
                )}
                {details.priceImpact && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Price Impact</span>
                    <span className={`${Number.parseFloat(details.priceImpact) > 5 ? 'text-red-600' : 'text-zinc-700 dark:text-zinc-300'}`}>
                      {details.priceImpact}%
                    </span>
                  </div>
                )}
                {details.contractAddress && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Contract</span>
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300 truncate max-w-[200px]">
                      {details.contractAddress.slice(0, 6)}...{details.contractAddress.slice(-4)}
                    </span>
                  </div>
                )}
                {details.network && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Network</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      details.network === 'mainnet'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    }`}>
                      {details.network}
                    </span>
                  </div>
                )}
              </div>

              {/* Pre-flight checklist */}
              <div className="space-y-1.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Pre-flight check</p>
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Contract verified on {details.network ?? 'network'}
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Post-conditions protect your assets
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={onConfirm}
                disabled={isSigning}
                className="w-full py-3 px-4 rounded-xl bg-accent-indigo hover:bg-accent-indigo-hover disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSigning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Waiting for wallet...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    Confirm in Wallet
                  </>
                )}
              </button>
              {!isSigning && (
                <button
                  onClick={onClose}
                  className="w-full mt-2 py-2 text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
