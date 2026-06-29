'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, TrendingUp, Coins, FileCode, RefreshCw } from 'lucide-react';

interface Suggestion {
  text: string;
  label: string;
  icon: React.ReactNode;
  category: string;
}

const allSuggestions: Suggestion[] = [
  { text: 'Check my STX balance', label: 'View wallet balance', icon: <Coins className="w-3 h-3" />, category: 'wallet' },
  { text: 'What is the current STX price?', label: 'STX price', icon: <TrendingUp className="w-3 h-3" />, category: 'price' },
  { text: 'Swap 100 STX for ALEX', label: 'Swap STX → ALEX', icon: <RefreshCw className="w-3 h-3" />, category: 'swap' },
  { text: 'Swap 50 STX for USDA', label: 'Swap STX → USDA', icon: <RefreshCw className="w-3 h-3" />, category: 'swap' },
  { text: 'Swap 10 STX for sBTC', label: 'Swap STX → sBTC', icon: <RefreshCw className="w-3 h-3" />, category: 'swap' },
  { text: 'Show my transaction history', label: 'Recent transactions', icon: <FileCode className="w-3 h-3" />, category: 'history' },
  { text: 'Deploy a new contract', label: 'Deploy contract', icon: <FileCode className="w-3 h-3" />, category: 'contract' },
  { text: 'Show current stacking info', label: 'Stacking info', icon: <Zap className="w-3 h-3" />, category: 'stacking' },
  { text: 'What are the ALEX token prices?', label: 'ALEX prices', icon: <TrendingUp className="w-3 h-3" />, category: 'price' },
  { text: 'Show me my vault info on Arkadiko', label: 'Arkadiko vault', icon: <Coins className="w-3 h-3" />, category: 'lending' },
  { text: 'Compare Velar and ALEX prices', label: 'DEX comparison', icon: <TrendingUp className="w-3 h-3" />, category: 'swap' },
  { text: 'Stack 1000 STX', label: 'Stack STX', icon: <Zap className="w-3 h-3" />, category: 'stacking' },
  { text: 'Show all my token balances', label: 'Token balances', icon: <Coins className="w-3 h-3" />, category: 'wallet' },
  { text: 'Get a swap quote for STX to USDA', label: 'Swap quote', icon: <RefreshCw className="w-3 h-3" />, category: 'swap' },
  { text: 'Show current block height', label: 'Block height', icon: <FileCode className="w-3 h-3" />, category: 'info' },
];

interface SmartCommandSuggestionsProps {
  input: string;
  onSelect: (text: string) => void;
}

export function SmartCommandSuggestions({ input, onSelect }: SmartCommandSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = input.length > 0
    ? allSuggestions.filter(s =>
        s.text.toLowerCase().includes(input.toLowerCase()) ||
        s.label.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!show || filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Tab' || e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < filtered.length) {
        e.preventDefault();
        onSelect(filtered[selectedIndex].text);
        setShow(false);
      }
    } else if (e.key === 'Escape') {
      setShow(false);
    }
  }, [show, filtered, selectedIndex, onSelect]);

  useEffect(() => {
    setSelectedIndex(0);
    setShow(filtered.length > 0);
  }, [input]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!show || filtered.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.15 }}
        className="absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50"
      >
        <div className="px-3 py-1.5 text-[10px] font-medium text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
          Suggestions <span className="text-zinc-300">(Tab to autocomplete)</span>
        </div>
        {filtered.map((suggestion, index) => (
          <button
            key={suggestion.text}
            type="button"
            onClick={() => {
              onSelect(suggestion.text);
              setShow(false);
            }}
            onMouseEnter={() => setSelectedIndex(index)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
              index === selectedIndex
                ? 'bg-accent-indigo/10 text-accent-indigo'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            <span className="flex-shrink-0 opacity-60">{suggestion.icon}</span>
            <span className="flex-1 truncate">{suggestion.text}</span>
            <span className="flex-shrink-0 text-[10px] text-zinc-400">{suggestion.label}</span>
            {index === selectedIndex && (
              <ArrowRight className="w-3 h-3 flex-shrink-0 text-accent-indigo" />
            )}
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
