export const stxErrorMessages: Record<string, { message: string; action?: string }> = {
  '(err u1)': {
    message: 'Insufficient balance. You need at least 0.5 STX for transaction fees.',
    action: 'Top up your wallet with STX and try again.',
  },
  '(err u2)': {
    message: 'Slippage tolerance exceeded. The price changed more than expected.',
    action: 'Try increasing slippage tolerance or reducing your swap amount.',
  },
  '(err u3)': {
    message: 'Transaction expired. The network took too long to confirm.',
    action: 'Please submit the transaction again.',
  },
  '(err u4)': {
    message: 'Unauthorized. You don\'t have permission to perform this action.',
    action: 'Check that you\'re using the correct wallet address.',
  },
  '(err u5)': {
    message: 'Contract not found. The smart contract address may be incorrect.',
    action: 'Verify the contract address and try again.',
  },
  '(err u6)': {
    message: 'Token transfer failed. The recipient address may be invalid.',
    action: 'Double-check the recipient address and try again.',
  },
  '(err u7)': {
    message: 'Pool liquidity too low for this swap size.',
    action: 'Try a smaller swap amount or use a different DEX.',
  },
  '(err u8)': {
    message: 'Position already liquidated. Your collateral was insufficient.',
    action: 'Add more collateral to prevent future liquidations.',
  },
  '(err u9)': {
    message: 'Stacking minimum not met. You need at least the minimum STX to stack.',
    action: 'Check current stacking minimums and try a larger amount.',
  },
  '(err u10)': {
    message: 'Already delegated. You are already stacking through a pool.',
    action: 'Revoke current delegation before creating a new one.',
  },
  'No transaction ID returned': {
    message: 'The wallet did not return a transaction ID. The transaction may have been rejected.',
    action: 'Try again and make sure to confirm in your wallet.',
  },
  'Wallet not connected': {
    message: 'Please connect your Stacks wallet to continue.',
    action: 'Click "Connect Wallet" in the top-right corner.',
  },
  'User rejected the request': {
    message: 'Transaction was cancelled. You closed the wallet prompt.',
    action: 'Submit again when you\'re ready to confirm.',
  },
  'Network request failed': {
    message: 'Unable to reach the Stacks blockchain. Check your internet connection.',
    action: 'Wait a moment and try again.',
  },
  'timeout': {
    message: 'The request timed out. The network may be congested.',
    action: 'Try again later or check network status.',
  },
  'insufficient funds': {
    message: 'Not enough STX to cover the transaction amount plus fees.',
    action: 'Check your balance and try a smaller amount.',
  },
  'Contract call failed': {
    message: 'The smart contract call was reverted by the network.',
    action: 'Check the contract address and function parameters.',
  },
  'Transfer failed': {
    message: 'The token transfer could not be completed.',
    action: 'Verify the recipient address and token contract.',
  },
  'Already signed in': {
    message: 'Your wallet is already connected.',
    action: 'You can disconnect and reconnect if needed.',
  },
};

export function getHumanReadableError(error: unknown): string {
  if (!error) return 'An unexpected error occurred. Please try again.';

  const errorStr = typeof error === 'string'
    ? error
    : error instanceof Error
      ? error.message
      : String(error);

  const lower = errorStr.toLowerCase();

  for (const [key, value] of Object.entries(stxErrorMessages)) {
    if (lower.includes(key.toLowerCase())) {
      return value.message;
    }
  }

  if (lower.includes('not enough') || lower.includes('insufficient')) {
    return 'Insufficient balance for this operation. Please check your wallet.';
  }
  if (lower.includes('timeout') || lower.includes('timed out')) {
    return 'The operation timed out. The network may be congested. Please try again.';
  }
  if (lower.includes('network') && (lower.includes('error') || lower.includes('fail'))) {
    return 'Network connection issue. Please check your internet and try again.';
  }
  if (lower.includes('user rejected') || lower.includes('cancelled') || lower.includes('canceled')) {
    return 'Operation cancelled. You can try again whenever you\'re ready.';
  }
  if (lower.includes('not found') || lower.includes('404')) {
    return 'The requested resource was not found. Please check the address or ID.';
  }
  if (lower.includes('rate limit') || lower.includes('too many')) {
    return 'You\'ve exceeded the rate limit. Please wait a moment and try again.';
  }
  if (lower.includes('unauthorized') || lower.includes('forbidden') || lower.includes('403')) {
    return 'You don\'t have permission to perform this action.';
  }
  if (lower.includes('invalid') && lower.includes('address')) {
    return 'The wallet address is invalid. Please check and try again.';
  }
  if (lower.includes('nonce')) {
    return 'Transaction nonce error. This usually means a previous transaction is still pending.';
  }

  return 'Something went wrong. Please try again or contact support.';
}

export function getErrorAction(error: unknown): string | undefined {
  if (!error) return undefined;

  const errorStr = typeof error === 'string'
    ? error
    : error instanceof Error
      ? error.message
      : String(error);

  const lower = errorStr.toLowerCase();

  for (const [key, value] of Object.entries(stxErrorMessages)) {
    if (lower.includes(key.toLowerCase())) {
      return value.action;
    }
  }

  return undefined;
}
