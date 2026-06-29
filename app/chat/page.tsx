"use client";

import { useState, useEffect, use } from "react";
import { Chat } from "@/components/chat";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { useWalletAuth } from "@/hooks/use-wallet-auth";
import { StacksConnectButton } from "@/components/StacksConnectButton";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, FileCode, Sparkles } from "lucide-react";

const features = [
  { icon: <TrendingUp className="w-5 h-5" />, title: "Blockchain Analytics", desc: "Real-time insights into transactions, blocks, and network statistics." },
  { icon: <FileCode className="w-5 h-5" />, title: "Smart Contract Tools", desc: "Verify contracts, analyze code, and interact with deployed contracts." },
  { icon: <Wallet className="w-5 h-5" />, title: "Token & NFT Management", desc: "Track balances, transfers, and manage your digital assets with ease." },
];

function LandingHero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-app-bg grid-subtle">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-accent-indigo" />
          <span className="text-xs font-medium text-accent-indigo uppercase tracking-widest">Bitcoin DeFi AI</span>
        </div>
        <h1 className="font-serif font-bold text-5xl tracking-tight text-text-main mb-4">
          Talk to <span className="italic text-accent-indigo">Bitcoin</span>
        </h1>
        <p className="text-text-dim mb-8 text-lg leading-relaxed">
          Access the entire Bitcoin DeFi ecosystem through conversation. Trade, lend, stack — just by talking.
        </p>
        <StacksConnectButton />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl w-full"
      >
        {features.map((item) => (
          <div
            key={item.title}
            className="glass rounded-2xl p-6 border border-app-border hover:shadow-floating hover:border-accent-indigo/20 transition-all duration-300 group"
          >
            <div className="text-accent-indigo mb-3 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="font-serif font-bold text-lg text-text-main mb-2">{item.title}</h3>
            <p className="text-sm text-text-dim">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-app-bg grid-subtle">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-indigo"></div>
        <div className="absolute inset-0 rounded-full h-12 w-12 border-t-2 border-accent-indigo/30 animate-pulse"></div>
      </div>
      <div className="text-center">
        <p className="font-serif font-bold text-lg text-text-main">Stacks<span className="italic text-accent-indigo">AI</span></p>
        <p className="text-sm text-text-dim">Initializing...</p>
      </div>
    </div>
  );
}

export default function Page() {
  const [id] = useState(() => generateUUID());
  const [chatModel, setChatModel] = useState(DEFAULT_CHAT_MODEL);
  const { isConnected, isLoading } = useWalletAuth();

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const chatModelCookie = cookies.find(cookie => 
      cookie.trim().startsWith('chat-model=')
    );
    if (chatModelCookie) {
      const modelValue = chatModelCookie.split('=')[1];
      setChatModel(modelValue);
    }
  }, []);

  if (isLoading) return <LoadingFallback />;
  if (!isConnected) return <LandingHero onGetStarted={() => {}} />;

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      initialChatModel={chatModel}
      initialVisibilityType="private"
      isReadonly={false}
      autoResume={false}
    />
  );
}
