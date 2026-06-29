import { request } from "@stacks/connect";
import { useWalletAuth } from "./use-wallet-auth";
import { toast } from "./use-toast";

/**
 * Hook for handling Stacks transactions
 * Uses @stacks/connect RPC methods for transaction signing
 */
export function useHandleTransaction() {
  const { address } = useWalletAuth();

  const withProgress = async <T,>(
    operation: () => Promise<T>,
    steps: { building?: string; waiting?: string; broadcasting?: string; success?: string }
  ): Promise<T> => {
    const loadingId = toast.loading(steps.building ?? 'Preparing transaction...');

    try {
      toast.update(loadingId, steps.waiting ?? 'Waiting for wallet...', 'loading');
      const result = await operation();

      toast.update(loadingId, steps.broadcasting ?? 'Broadcasting...', 'loading');
      toast.dismiss(loadingId);
      toast.success(steps.success ?? 'Transaction sent successfully');

      return result;
    } catch (err) {
      toast.dismiss(loadingId);
      toast.error(err);
      throw err;
    }
  };

  /**
   * Send STX tokens to another address
   */
  const handleSTXTransfer = async (params: {
    recipient: string;
    amount: string;
    memo?: string;
  }) => {
    if (!address) {
      toast.error("Wallet not connected");
      throw new Error("Wallet not connected");
    }

    return withProgress(
      () => request('stx_transferStx', {
        recipient: params.recipient,
        amount: params.amount,
        memo: params.memo
      }),
      {
        building: 'Building STX transfer...',
        waiting: 'Waiting for wallet confirmation...',
        broadcasting: 'Broadcasting transfer to network...',
        success: `Sent ${params.amount} STX to ${params.recipient.slice(0, 6)}...${params.recipient.slice(-4)}`,
      }
    );
  };

  /**
   * Call a smart contract function
   */
  const handleContractCall = async (params: {
    contractAddress: string;
    contractName: string;
    functionName: string;
    functionArgs: any[];
  }) => {
    if (!address) {
      toast.error("Wallet not connected");
      throw new Error("Wallet not connected");
    }

    return withProgress(
      () => request('stx_callContract', {
        contract: `${params.contractAddress}.${params.contractName}`,
        functionName: params.functionName,
        functionArgs: params.functionArgs
      }),
      {
        building: `Building ${params.functionName}() call...`,
        waiting: 'Waiting for wallet confirmation...',
        broadcasting: 'Broadcasting contract call...',
        success: `${params.functionName}() executed successfully`,
      }
    );
  };

  /**
   * Deploy a smart contract
   */
  const handleContractDeploy = async (params: {
    name: string;
    code: string;
    clarityVersion?: number;
  }) => {
    if (!address) {
      toast.error("Wallet not connected");
      throw new Error("Wallet not connected");
    }

    return withProgress(
      () => request('stx_deployContract', {
        name: params.name,
        clarityCode: params.code,
        clarityVersion: params.clarityVersion || 3
      }),
      {
        building: 'Compiling contract...',
        waiting: 'Waiting for wallet confirmation...',
        broadcasting: 'Deploying to network...',
        success: `Contract ${params.name} deployed!`,
      }
    );
  };

  /**
   * Transfer SIP-10 fungible token
   */
  const handleTokenTransfer = async (params: {
    contractAddress: string;
    contractName: string;
    recipient: string;
    amount: string;
    memo?: string;
  }) => {
    if (!address) {
      toast.error("Wallet not connected");
      throw new Error("Wallet not connected");
    }

    return withProgress(
      () => request('stx_transferSip10Ft', {
        asset: `${params.contractAddress}.${params.contractName}`,
        recipient: params.recipient,
        amount: params.amount
      }),
      {
        building: 'Building token transfer...',
        waiting: 'Waiting for wallet confirmation...',
        broadcasting: 'Broadcasting token transfer...',
        success: `Transferred ${params.amount} tokens`,
      }
    );
  };

  return {
    handleSTXTransfer,
    handleContractCall,
    handleContractDeploy,
    handleTokenTransfer
  };
}
