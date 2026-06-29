import type { ChatModel } from "./models";

export type UserTier = "free" | "pro" | "enterprise";

export interface Entitlements {
  maxMessagesPerDay: number;
  maxTransactionsPerDay: number;
  availableChatModelIds: Array<ChatModel["id"]>;
  priorityQueue: boolean;
  advancedAnalytics: boolean;
  apiAccess: boolean;
}

export const entitlementsByTier: Record<UserTier, Entitlements> = {
  free: {
    maxMessagesPerDay: 50,
    maxTransactionsPerDay: 10,
    availableChatModelIds: ["chat-model"],
    priorityQueue: false,
    advancedAnalytics: false,
    apiAccess: false,
  },
  pro: {
    maxMessagesPerDay: 500,
    maxTransactionsPerDay: 100,
    availableChatModelIds: ["chat-model", "chat-model-reasoning"],
    priorityQueue: true,
    advancedAnalytics: true,
    apiAccess: false,
  },
  enterprise: {
    maxMessagesPerDay: 10_000,
    maxTransactionsPerDay: 1_000,
    availableChatModelIds: ["chat-model", "chat-model-reasoning"],
    priorityQueue: true,
    advancedAnalytics: true,
    apiAccess: true,
  },
};

export function getUserTier(isConnected: boolean, isWhitelisted?: boolean): UserTier {
  if (!isConnected) return "free";
  if (isWhitelisted) return "enterprise";
  return "pro";
}

export function getEntitlements(tier: UserTier): Entitlements {
  return entitlementsByTier[tier];
}
