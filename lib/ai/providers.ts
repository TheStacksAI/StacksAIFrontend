import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";

export const myProvider = customProvider({
  languageModels: {
    "chat-model": openai("gpt-4o"),
    "chat-model-reasoning": wrapLanguageModel({
      model: openai("o3"),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": openai("gpt-4o-mini"),
    "chat-model-fast": xai("grok-2"),
    "chat-model-reasoning-alt": xai("grok-3-reasoning"),
  },
});
