'use client';

import { useWalletAuth } from '@/hooks/use-wallet-auth';
import { Globe, Monitor, Server } from 'lucide-react';
import { motion } from 'framer-motion';

type NetworkType = 'mainnet' | 'testnet' | 'devnet' | 'disconnected';

const networkConfig: Record<NetworkType, {
  label: string;
  color: string;
  bg: string;
  dot: string;
  icon: React.ReactNode;
}> = {
  mainnet: {
    label: 'Mainnet',
    color: 'text-green-700',
    bg: 'bg-green-100 dark:bg-green-900/30',
    dot: 'bg-green-500',
    icon: <Globe className="w-3 h-3" />,
  },
  testnet: {
    label: 'Testnet',
    color: 'text-amber-700',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    dot: 'bg-amber-500',
    icon: <Monitor className="w-3 h-3" />,
  },
  devnet: {
    label: 'Devnet',
    color: 'text-purple-700',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    dot: 'bg-purple-500',
    icon: <Server className="w-3 h-3" />,
  },
  disconnected: {
    label: 'Not Connected',
    color: 'text-zinc-500',
    bg: 'bg-zinc-100 dark:bg-zinc-800',
    dot: 'bg-zinc-400',
    icon: <Globe className="w-3 h-3" />,
  },
};

export default function NetworkIndicator() {
  const { address, isConnected } = useWalletAuth();

  let network: NetworkType = 'disconnected';

  if (isConnected && address) {
    network = address.startsWith('SP') ? 'mainnet' : address.startsWith('ST') ? 'testnet' : 'disconnected';
  }

  const config = networkConfig[network];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} border border-current/10`}
      title={`Connected to Stacks ${config.label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      {config.icon}
      <span className="hidden sm:inline">{config.label}</span>
    </motion.div>
  );
}
