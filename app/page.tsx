"use client";

import { ArrowRight, Brain, Shield, Zap, Github, Terminal, MessageSquare, Sparkles, Lock, TrendingUp, Layers, Box, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const protocols = [
  { name: "ALEX", description: "AMM & Orderbook DEX", color: "from-blue-500 to-cyan-500" },
  { name: "Velar", description: "Multi-chain DEX", color: "from-purple-500 to-pink-500" },
  { name: "BitFlow", description: "Stable-focused DEX", color: "from-orange-500 to-yellow-500" },
  { name: "Charisma", description: "Composable Vaults", color: "from-green-500 to-emerald-500" },
  { name: "Arkadiko", description: "Lending & USDA", color: "from-red-500 to-orange-500" },
  { name: "Zest", description: "Bitcoin Capital Markets", color: "from-indigo-500 to-purple-500" },
  { name: "Granite", description: "Multi-collateral Lending", color: "from-gray-400 to-slate-500" },
  { name: "STX Core", description: "Stacking & sBTC", color: "from-orange-400 to-amber-500" },
];

const conversations = [
  { user: "Swap 100 STX for sBTC", ai: "Best rate on ALEX: 0.0042 sBTC. Ready to execute?" },
  { user: "What's the stacking APY right now?", ai: "Current PoX cycle: 8.2% APY paid in BTC." },
  { user: "Lend 5000 USDA on Arkadiko", ai: "Rate: 12.5% APY. Collateral required: 150%." },
];

const stats = [
  { value: "144+", label: "Live Tools", icon: Zap },
  { value: "8+", label: "DeFi Protocols", icon: Layers },
  { value: "100%", label: "Bitcoin Secured", icon: Shield },
  { value: "0", label: "Keys Stored", icon: Lock },
];

const useCases = [
  { title: "DEX Aggregation", desc: "Finds the best swap rate across ALEX, Velar, BitFlow, and Charisma automatically.", icon: TrendingUp },
  { title: "BTC Yield via Stacking", desc: "Lock STX, earn Bitcoin. Get current APY, cycle info, and handle delegation in one message.", icon: Shield },
  { title: "Lending & Borrowing", desc: "Compare rates on Arkadiko and Granite, supply collateral, and borrow — all through conversation.", icon: Layers },
  { title: "NFT Management", desc: "Browse your Bitcoin NFTs, check floor prices, list or transfer — without leaving the chat.", icon: Box },
  { title: "sBTC Bridge", desc: "Deposit BTC to Stacks or withdraw to mainnet with real-time status updates.", icon: Zap },
  { title: "Portfolio Analytics", desc: "Ask what your portfolio is worth or show your yield positions — instant, comprehensive answers.", icon: Brain },
];

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Docs", href: "/docs" },
  { name: "Roadmap", href: "/roadmap" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-app-bg font-sans">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-app-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl tracking-tight text-text-main">
              Stacks<span className="italic text-accent-indigo">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-text-dim hover:text-text-main transition-colors">
                {l.name}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden sm:flex bg-accent-indigo hover:bg-accent-indigo-hover text-white rounded-xl shadow-premium">
              <Link href="/chat">
                Launch App <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <nav className="flex flex-col gap-6 mt-8">
                  <span className="font-serif font-bold text-xl text-text-main">
                    Stacks<span className="italic text-accent-indigo">AI</span>
                  </span>
                  {navLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="text-text-dim hover:text-text-main transition-colors">
                      {l.name}
                    </Link>
                  ))}
                  <Button asChild className="bg-accent-indigo text-white rounded-xl mt-2">
                    <Link href="/chat">Launch App</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-amber-50/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-indigo/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <Badge className="border-accent-indigo/30 bg-accent-indigo/5 text-accent-indigo font-medium px-3 py-1 rounded-full">
                <Sparkles className="mr-1.5 h-3 w-3" />
                First Comprehensive MCP for Bitcoin DeFi
              </Badge>

              <div className="space-y-4">
                <h1 className="font-serif font-bold text-6xl md:text-7xl leading-[1.05] tracking-tight text-text-main">
                  Talk to<br />
                  <span className="italic text-accent-indigo">Bitcoin.</span>
                </h1>
                <p className="text-xl text-text-dim leading-relaxed max-w-md">
                  Trade, lend, and stack across 8 DeFi protocols — just by typing what you want.
                </p>
              </div>

              {/* Chat preview */}
              <div className="bg-app-bg border border-app-border rounded-2xl p-5 space-y-4 shadow-floating max-w-md">
                <div className="flex items-center gap-2 text-xs text-text-pale">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="font-mono">stacks-ai · live</span>
                </div>
                {conversations.map((conv, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.35 + 0.4 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-accent-indigo font-mono text-xs mt-0.5">›</span>
                      <span className="text-text-main text-sm font-medium">{conv.user}</span>
                    </div>
                    <div className="flex items-start gap-2 pl-4">
                      <MessageSquare className="h-3.5 w-3.5 text-accent-emerald mt-0.5 shrink-0" />
                      <span className="text-text-dim text-sm">{conv.ai}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-accent-indigo hover:bg-accent-indigo-hover text-white rounded-xl px-8 shadow-premium hover:shadow-floating transition-all duration-200 active:scale-95">
                  <Link href="/chat">
                    Launch App <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl px-8 border-app-border text-text-dim hover:text-text-main hover:border-accent-indigo/40">
                  <Link href="/docs">
                    <Github className="mr-2 h-4 w-4" /> View Docs
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-text-pale">
                <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-accent-indigo" /> 144+ tools live</span>
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-accent-indigo" /> Non-custodial</span>
                <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-accent-indigo" /> Open source</span>
              </div>
            </motion.div>

            {/* Right — floating protocol cards */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {protocols.map((p, idx) => (
                <motion.div
                  key={p.name}
                  animate={{ y: [0, idx % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 3 + idx * 0.3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                  className={`bg-gradient-to-br ${p.color} p-px rounded-2xl shadow-premium`}
                >
                  <div className="bg-white rounded-2xl p-5 h-28 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-text-main">{p.name}</span>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                    <span className="text-xs text-text-dim">{p.description}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-app-bg border-y border-app-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-3 bg-accent-indigo/8 rounded-xl mb-3">
                  <s.icon className="h-6 w-6 text-accent-indigo" />
                </div>
                <div className="font-serif font-bold text-4xl text-text-main">{s.value}</div>
                <div className="text-sm text-text-dim mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-text-main mb-4">
              DeFi without the <span className="italic text-accent-indigo">friction</span>
            </h2>
            <p className="text-lg text-text-dim max-w-2xl mx-auto">
              Stop switching between five different protocol UIs. One conversation handles everything.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "01", icon: Terminal, title: "Say what you want", body: "Type naturally — \"swap 100 STX for sBTC\" or \"what's the best yield right now?\" No forms, no menus." },
              { n: "02", icon: Brain, title: "AI finds the best path", body: "StacksAI picks the right protocol, calculates the optimal route, and prepares the transaction." },
              { n: "03", icon: Shield, title: "You approve, Bitcoin settles", body: "Review and sign in Leather or Xverse. Your keys never leave your wallet. Bitcoin finality." },
            ].map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="relative p-8 bg-app-bg border border-app-border rounded-2xl hover:shadow-floating hover:border-accent-indigo/30 transition-all duration-300 group"
              >
                <span className="font-serif text-5xl font-bold text-accent-indigo/10 absolute top-6 right-6 select-none">{step.n}</span>
                <step.icon className="h-10 w-10 text-accent-indigo mb-5" />
                <h3 className="font-serif font-bold text-xl text-text-main mb-3">{step.title}</h3>
                <p className="text-text-dim leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Protocol grid ── */}
      <section className="py-28 bg-app-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-text-main mb-4">
              Every protocol. <span className="italic text-accent-indigo">One interface.</span>
            </h2>
            <p className="text-lg text-text-dim max-w-2xl mx-auto">
              From swaps to loans, stacking to NFTs — the complete Bitcoin DeFi stack, accessible through conversation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {protocols.map((p, idx) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${p.color} p-px rounded-2xl hover:scale-105 transition-transform duration-200`}
              >
                <div className="bg-white rounded-2xl p-5 h-28 flex flex-col justify-between">
                  <span className="font-serif font-bold text-text-main">{p.name}</span>
                  <span className="text-xs text-text-dim">{p.description}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-text-pale text-sm mt-8"
          >
            MCP-powered architecture — more protocols added every week.
          </motion.p>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-text-main mb-4">
              Real operations. <span className="italic text-accent-indigo">Zero complexity.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((u, idx) => (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="p-6 bg-app-bg border border-app-border rounded-2xl hover:shadow-floating hover:border-accent-indigo/30 transition-all duration-300 group"
              >
                <u.icon className="h-8 w-8 text-accent-indigo mb-4 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-serif font-bold text-lg text-text-main mb-2">{u.title}</h3>
                <p className="text-sm text-text-dim leading-relaxed">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why StacksAI ── */}
      <section className="py-28 bg-app-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-text-main mb-4">
              Why <span className="italic text-accent-indigo">StacksAI</span>?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Shield, color: "text-amber-500", title: "Bitcoin Security", body: "Every transaction settles on Bitcoin through Stacks' Proof-of-Transfer. Real finality, not a sidechain." },
              { icon: Lock, color: "text-accent-indigo", title: "Non-Custodial", body: "We never hold your keys or tokens. Sign in Leather or Xverse — you stay in full control." },
              { icon: Brain, color: "text-accent-emerald", title: "Actually Intelligent", body: "Not keyword matching. The AI understands context, compares protocols, and explains DeFi in plain English." },
              { icon: Zap, color: "text-accent-indigo", title: "Open Protocol", body: "Built on MCP. Any Stacks protocol can plug in their tools — composable, permissionless, and open source." },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white border border-app-border rounded-2xl hover:shadow-floating transition-all duration-300"
              >
                <item.icon className={`h-10 w-10 ${item.color} mb-5`} />
                <h3 className="font-serif font-bold text-xl text-text-main mb-3">{item.title}</h3>
                <p className="text-text-dim leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 bg-white border-t border-app-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-serif font-bold text-5xl md:text-6xl text-text-main leading-tight">
              Stop clicking.<br />
              <span className="italic text-accent-indigo">Start talking.</span>
            </h2>
            <p className="text-xl text-text-dim">
              The entire Bitcoin DeFi ecosystem is one message away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent-indigo hover:bg-accent-indigo-hover text-white rounded-xl px-10 py-6 text-lg shadow-premium hover:shadow-floating transition-all duration-200 active:scale-95">
                <Link href="/chat">
                  Launch App <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl px-10 py-6 text-lg border-app-border text-text-dim hover:text-text-main hover:border-accent-indigo/40">
                <Link href="/docs">Read the Docs</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-text-pale pt-4">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Bitcoin secured</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> Non-custodial</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> Open source</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-app-bg border-t border-app-border py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2 space-y-4">
              <span className="font-serif font-bold text-xl text-text-main">
                Stacks<span className="italic text-accent-indigo">AI</span>
              </span>
              <p className="text-sm text-text-dim max-w-xs leading-relaxed">
                Talk to Bitcoin. Access the entire Bitcoin DeFi ecosystem through natural conversation.
              </p>
              <Badge className="border-accent-indigo/30 bg-accent-indigo/5 text-accent-indigo text-xs">
                Built for Stacks Vibe Hackathon
              </Badge>
            </div>
            <div>
              <h4 className="font-semibold text-text-main text-sm mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-text-dim">
                {[["Terminal", "/chat"], ["Documentation", "/docs"], ["Roadmap", "/roadmap"], ["About", "/about"]].map(([label, href]) => (
                  <li key={href}><Link href={href} className="hover:text-text-main transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-main text-sm mb-4">Community</h4>
              <ul className="space-y-2.5 text-sm text-text-dim">
                <li>
                  <a href="https://github.com/Stack-AI-MCP" target="_blank" rel="noreferrer" className="hover:text-text-main transition-colors flex items-center gap-1">
                    GitHub <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li><a href="#" className="hover:text-text-main transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-text-main transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-app-border mt-10 pt-8 text-center text-xs text-text-pale">
            © 2026 StacksAI. Built with Bitcoin security.
          </div>
        </div>
      </footer>
    </div>
  );
}
