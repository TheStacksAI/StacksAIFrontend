import "server-only";
import { generateUUID } from "../utils";
import type { VisibilityType } from "@/components/visibility-selector";
import type { User, Chat, DBMessage } from "./schema";

// ── Stub DB — no postgres connection ──────────────────────────────────────────
// All data is in-memory and ephemeral. Swap back to real DB when going to mainnet.

const users = new Map<string, User>();
const chats = new Map<string, Chat>();
const messages = new Map<string, DBMessage[]>();
const streams = new Map<string, string[]>();

export async function getUser(address: string): Promise<User[]> {
  const u = users.get(address.toLowerCase());
  return u ? [u] : [];
}

export async function upsertUserByAddress(address: string): Promise<User> {
  const addr = address.toLowerCase();
  if (users.has(addr)) return users.get(addr)!;
  const u: User = { id: generateUUID(), address: addr };
  users.set(addr, u);
  return u;
}

export async function saveChat({ id, userId, title, visibility }: {
  id: string; userId: string; title: string; visibility: VisibilityType;
}) {
  const c: Chat = { id, createdAt: new Date(), title, userId, visibility };
  chats.set(id, c);
  return c;
}

export async function deleteChatById({ id }: { id: string }) {
  const c = chats.get(id);
  chats.delete(id);
  messages.delete(id);
  streams.delete(id);
  return c;
}

export async function getChatsByUserId({ id, limit }: {
  id: string; limit: number; startingAfter: string | null; endingBefore: string | null;
}) {
  const all = [...chats.values()]
    .filter((c) => c.userId === id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const sliced = all.slice(0, limit + 1);
  return { chats: sliced.slice(0, limit), hasMore: sliced.length > limit };
}

export async function getChatById({ id }: { id: string }): Promise<Chat | undefined> {
  return chats.get(id);
}

export async function saveMessages({ messages: msgs }: { messages: DBMessage[] }) {
  for (const m of msgs) {
    const existing = messages.get(m.chatId) ?? [];
    existing.push(m);
    messages.set(m.chatId, existing);
  }
}

export async function getMessagesByChatId({ id }: { id: string }): Promise<DBMessage[]> {
  return (messages.get(id) ?? []).sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );
}

export async function getMessageById({ id }: { id: string }): Promise<DBMessage[]> {
  for (const msgs of messages.values()) {
    const found = msgs.find((m) => m.id === id);
    if (found) return [found];
  }
  return [];
}

export async function deleteMessagesByChatIdAfterTimestamp({ chatId, timestamp }: {
  chatId: string; timestamp: Date;
}) {
  const msgs = messages.get(chatId) ?? [];
  messages.set(chatId, msgs.filter((m) => m.createdAt < timestamp));
}

export async function updateChatVisiblityById({ chatId, visibility }: {
  chatId: string; visibility: "private" | "public";
}) {
  const c = chats.get(chatId);
  if (c) chats.set(chatId, { ...c, visibility });
}

export async function getMessageCountByUserId({ id, differenceInHours }: {
  id: string; differenceInHours: number;
}): Promise<number> {
  let count = 0;
  for (const [chatId, msgs] of messages.entries()) {
    const c = chats.get(chatId);
    if (c?.userId === id) count += msgs.filter((m) => m.role === "user").length;
  }
  return count;
}

export async function createStreamId({ streamId, chatId }: {
  streamId: string; chatId: string;
}) {
  const existing = streams.get(chatId) ?? [];
  existing.push(streamId);
  streams.set(chatId, existing);
}

export async function getStreamIdsByChatId({ chatId }: { chatId: string }): Promise<string[]> {
  return streams.get(chatId) ?? [];
}
