export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'GPT-4o',
    description: 'Primary model for all-purpose chat',
  },
  {
    id: 'chat-model-reasoning',
    name: 'OpenAI o3',
    description: 'Advanced reasoning for complex DeFi analysis',
  },
  {
    id: 'chat-model-fast',
    name: 'Grok 2',
    description: 'Fast responses for simple queries',
  },
  {
    id: 'chat-model-reasoning-alt',
    name: 'Grok 3',
    description: 'Alternative reasoning with deep analysis',
  },
];
