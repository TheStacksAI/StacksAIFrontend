import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

type DefaultImport = { default: ComponentType<any> };

function lazy<T extends DefaultImport>(
  importFn: () => Promise<T>,
  loading?: string,
) {
  return dynamic(importFn, {
    loading: loading
      ? () => (
          <div className="animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-xl h-32 flex items-center justify-center">
            <span className="text-xs text-zinc-400">{loading}</span>
          </div>
        )
      : undefined,
  });
}

// Protocol components - loaded only when needed
export const LazyVelarSwap = lazy(
  () => import('@/components/stacks-dex/velar/VelarSwapTransaction'),
  'Loading Velar swap...',
);

export const LazyBitflowSwap = lazy(
  () => import('@/components/stacks-dex/bitflow/BitflowSwapTransaction'),
  'Loading BitFlow...',
);

export const LazyVelarPrices = lazy(
  () => import('@/components/stacks-dex/velar/VelarTokenPrices'),
);

export const LazyBitflowQuote = lazy(
  () => import('@/components/stacks-dex/bitflow/BitflowQuote'),
);

export const LazyBitflowTokens = lazy(
  () => import('@/components/stacks-dex/bitflow/BitflowTokenList'),
);

export const LazyVelarPools = lazy(
  () => import('@/components/stacks-dex/velar/VelarPoolList'),
);

export const LazyTokenPrices = lazy(
  () => import('@/components/stacks-dex/TokenPrices'),
);

export const LazySwapInfo = lazy(
  () => import('@/components/stacks-dex/SwapInfo'),
);

export const LazyStackingStatus = lazy(
  () => import('@/components/stacks-stacking/StackingStatus'),
);

export const LazyStackingInfo = lazy(
  () => import('@/components/stacks-stacking/StackingInfo'),
);

export const LazyNFTGallery = lazy(
  () => import('@/components/stacks-nfts/NFTGallery'),
);

export const LazyNFTTransfer = lazy(
  () => import('@/components/stacks-nfts/NFTTransfer'),
);

export const LazyEventList = lazy(
  () => import('@/components/stacks-events/EventList'),
);
