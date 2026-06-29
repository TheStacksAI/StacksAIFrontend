import { NextResponse, type NextRequest } from "next/server";

const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 60;
const rateMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(request: NextRequest): string {
  const addr = request.headers.get("x-wallet-address") || "anonymous";
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  return `${addr}:${ip}`;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Rate limit API routes
  if (url.startsWith("/api/")) {
    const key = getRateLimitKey(request);
    if (isRateLimited(key)) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }
  }

  // Add common headers
  const response = NextResponse.next();
  response.headers.set("X-StacksAI-Version", "1.0.0");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
