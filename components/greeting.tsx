import { motion } from "framer-motion";
import { useWalletAuth } from "@/hooks/use-wallet-auth";
import { Wallet, TrendingUp, Zap, RefreshCw } from "lucide-react";

const suggestions = [
  { icon: <Wallet className="w-3 h-3" />, text: "Check my balance", action: "Show me my STX balance" },
  { icon: <TrendingUp className="w-3 h-3" />, text: "STX price", action: "What is the current STX price?" },
  { icon: <RefreshCw className="w-3 h-3" />, text: "Swap tokens", action: "I want to swap STX for ALEX" },
  { icon: <Zap className="w-3 h-3" />, text: "Stack STX", action: "Explain how stacking works" },
];

export const Greeting = () => {
  const { isConnected, address } = useWalletAuth();

  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-4 sm:px-6 md:px-8 w-full min-w-0 flex flex-col justify-center gap-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="flex flex-row gap-2 items-center"
      >
        <h1 className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-text-main">
          Stacks<span className="italic text-accent-indigo">AI</span>
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-base sm:text-lg md:text-xl text-text-dim break-words"
      >
        {isConnected && address
          ? `Connected as ${address.slice(0, 6)}...${address.slice(-4)} — trade, lend, stack through conversation.`
          : "Talk to Bitcoin. Trade, lend, stack — through conversation."}
      </motion.div>
      {!isConnected && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-text-pale mt-1"
        >
          Connect your wallet in the top-right to get started.
        </motion.p>
      )}
    </div>
  );
};
