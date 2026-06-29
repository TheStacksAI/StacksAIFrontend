'use client';

import { Button } from '@/components/ui/button';
import { connect, disconnect, isConnected, getLocalStorage } from '@stacks/connect';
import { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StacksConnectButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

export function StacksConnectButton({
  variant = 'default',
  size = 'default',
  onConnect,
  onDisconnect,
}: StacksConnectButtonProps) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check connection status on mount and periodically
    const checkConnection = () => {
      const isConn = isConnected();
      setConnected(isConn);

      if (isConn) {
        const userData = getLocalStorage();
        const stxAddress = userData?.addresses?.stx?.[0]?.address || null;
        setAddress(stxAddress);

        if (stxAddress && onConnect) {
          onConnect(stxAddress);
        }
      } else {
        setAddress(null);
      }
    };

    checkConnection();

    // Poll for connection changes every second
    const interval = setInterval(checkConnection, 1000);
    return () => clearInterval(interval);
  }, [onConnect]);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      toast.info('Opening wallet... Please approve the connection in your Stacks wallet.');

      const response = await connect();
      const stxAddress = response.addresses[0].address;

      setConnected(true);
      setAddress(stxAddress);
      toast.success(`Connected as ${stxAddress.slice(0, 6)}...${stxAddress.slice(-4)}`);

      if (onConnect) {
        onConnect(stxAddress);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setConnected(false);
    setAddress(null);

    if (onDisconnect) {
      onDisconnect();
    }
  };

  if (connected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-dim font-mono bg-app-hover px-3 py-1.5 rounded-xl border border-app-border">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <Button
          variant="outline"
          size={size}
          onClick={handleDisconnect}
          className="border-app-border text-text-dim hover:text-accent-indigo hover:border-accent-indigo/40 rounded-xl transition-all duration-200"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-accent-indigo hover:bg-accent-indigo-hover text-white rounded-xl font-semibold shadow-premium transition-all duration-200 active:scale-95"
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}
