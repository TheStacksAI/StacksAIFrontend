'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') setShowPrompt(false);
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
        >
          <button
            onClick={handleInstall}
            className="flex items-center gap-2 px-4 py-2.5 bg-accent-indigo text-white rounded-xl shadow-lg hover:bg-accent-indigo-hover transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Install StacksAI
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
