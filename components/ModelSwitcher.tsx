'use client';

import { useState } from 'react';
import { Brain, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatModels, type ChatModel } from '@/lib/ai/models';
import { getEntitlements, getUserTier } from '@/lib/ai/entitlements';
import { useWalletAuth } from '@/hooks/use-wallet-auth';

interface ModelSwitcherProps {
  selected: string;
  onChange: (id: string) => void;
}

export default function ModelSwitcher({ selected, onChange }: ModelSwitcherProps) {
  const [open, setOpen] = useState(false);
  const { isConnected } = useWalletAuth();
  const tier = getUserTier(isConnected);
  const entitlements = getEntitlements(tier);
  const active = chatModels.find((m) => m.id === selected) ?? chatModels[0];

  const available = chatModels.filter((m) =>
    entitlements.availableChatModelIds.includes(m.id),
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <Brain className="w-3 h-3" />
        <span>{active.name}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {available.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onChange(model.id);
                  setOpen(false);
                  document.cookie = `chat-model=${model.id};path=/;max-age=31536000`;
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
                  model.id === selected
                    ? 'bg-accent-indigo/10 text-accent-indigo'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <Sparkles className={`w-3 h-3 ${model.id === selected ? 'text-accent-indigo' : 'text-zinc-400'}`} />
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-[10px] text-zinc-400">{model.description}</div>
                </div>
              </button>
            ))}
            {available.length === 0 && (
              <div className="px-3 py-4 text-xs text-zinc-400 text-center">
                Connect wallet to access models
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
