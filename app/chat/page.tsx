"use client";

import { useState, useEffect } from "react";
import { Chat } from "@/components/chat";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { useWalletAuth } from "@/hooks/use-wallet-auth";
import { StacksConnectButton } from "@/components/StacksConnectButton";

export default function Page() {
  const [id] = useState(() => generateUUID());
  const [chatModel, setChatModel] = useState(DEFAULT_CHAT_MODEL);
  const { isConnected, isLoading } = useWalletAuth();

  useEffect(() => {
    // Get chat model from cookie on client side
    const cookies = document.cookie.split(';');
    const chatModelCookie = cookies.find(cookie => 
      cookie.trim().startsWith('chat-model=')
    );
    
    if (chatModelCookie) {
      const modelValue = chatModelCookie.split('=')[1];
      setChatModel(modelValue);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-app-bg grid-subtle">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-indigo"></div>
          <div className="absolute inset-0 rounded-full h-12 w-12 border-t-2 border-accent-indigo/30 animate-pulse"></div>
        </div>
        <div className="text-center">
          <p className="font-serif font-bold text-lg text-text-main">Stacks<span className="italic text-accent-indigo">AI</span></p>
          <p className="text-sm text-text-dim">Initializing AI systems...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-app-bg grid-subtle">
        <div className="text-center max-w-md">
          <h1 className="font-serif font-bold text-5xl tracking-tight text-text-main mb-4">
            Talk to <span className="italic text-accent-indigo">Bitcoin</span>
          </h1>
          <p className="text-text-dim mb-8 text-lg leading-relaxed">
            Access the entire Bitcoin DeFi ecosystem through conversation. Trade, lend, stack — just by talking.
          </p>
          <StacksConnectButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl w-full">
          {[
            { title: "Blockchain Analytics", desc: "Real-time insights into transactions, blocks, and network statistics." },
            { title: "Smart Contract Tools", desc: "Verify contracts, analyze code, and interact with deployed contracts." },
            { title: "Token & NFT Management", desc: "Track balances, transfers, and manage your digital assets with ease." },
          ].map((item) => (
            <div key={item.title} className="glass rounded-2xl p-6 border border-app-border hover:shadow-floating transition-all duration-300">
              <h3 className="font-serif font-bold text-lg text-text-main mb-2">{item.title}</h3>
              <p className="text-sm text-text-dim">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
