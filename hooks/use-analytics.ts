'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useWalletAuth } from './use-wallet-auth';

type EventType =
  | 'page_view'
  | 'wallet_connect'
  | 'wallet_disconnect'
  | 'message_send'
  | 'tool_execute'
  | 'transaction_sign'
  | 'transaction_success'
  | 'transaction_fail'
  | 'swap_initiated'
  | 'swap_completed'
  | 'error';

interface AnalyticsEvent {
  type: EventType;
  timestamp: number;
  address?: string | null;
  properties?: Record<string, string | number | boolean>;
}

const EVENT_BUFFER_SIZE = 50;
const FLUSH_INTERVAL = 30_000;

export function useAnalytics() {
  const { address, isConnected } = useWalletAuth();
  const bufferRef = useRef<AnalyticsEvent[]>([]);
  const flushTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const flush = useCallback(() => {
    if (bufferRef.current.length === 0) return;
    const events = bufferRef.current.splice(0, EVENT_BUFFER_SIZE);
    try {
      const payload = JSON.stringify({ events });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/ingest', payload);
      } else {
        fetch('/api/analytics/ingest', {
          method: 'POST',
          body: payload,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
        });
      }
    } catch {
      // silently fail - analytics should never break the app
    }
  }, []);

  useEffect(() => {
    flushTimerRef.current = setInterval(flush, FLUSH_INTERVAL);
    return () => {
      if (flushTimerRef.current) clearInterval(flushTimerRef.current);
      flush();
    };
  }, [flush]);

  const track = useCallback(
    (type: EventType, properties?: Record<string, string | number | boolean>) => {
      bufferRef.current.push({
        type,
        timestamp: Date.now(),
        address,
        properties,
      });
      if (bufferRef.current.length >= EVENT_BUFFER_SIZE) flush();
    },
    [address, flush],
  );

  return { track };
}
