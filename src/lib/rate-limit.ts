import { and, eq, sql as dsql } from "drizzle-orm";
import { db } from "@/db";
import { submissionRateLimits } from "@/db/schema";

export async function consumeRateLimit(visitorKey: string, action: "guestbook" | "contact", limit: number, windowMs: number) {
  const now = Date.now();
  const windowStart = new Date(Math.floor(now / windowMs) * windowMs);
  const [record] = await db.insert(submissionRateLimits).values({ visitorKey, action, windowStart, requestCount: 1 })
    .onConflictDoUpdate({
      target: [submissionRateLimits.visitorKey, submissionRateLimits.action, submissionRateLimits.windowStart],
      set: { requestCount: dsql`${submissionRateLimits.requestCount} + 1` },
    }).returning({ count: submissionRateLimits.requestCount });
  return { allowed: record.count <= limit, remaining: Math.max(0, limit - record.count), resetAt: new Date(windowStart.getTime() + windowMs) };
}

export async function clearOldRateLimits() {
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  await db.delete(submissionRateLimits).where(and(eq(submissionRateLimits.action, "guestbook"), dsql`${submissionRateLimits.windowStart} < ${cutoff}`));
}
