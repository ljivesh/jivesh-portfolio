import { and, desc, eq, gt, lt, or } from "drizzle-orm";
import { db } from "@/db";
import { guestbookEntries } from "@/db/schema";
import { consumeRateLimit } from "@/lib/rate-limit";
import { duplicateHash, visitorKey } from "@/lib/request";
import { guestbookInput } from "@/lib/validation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Math.min(20, Math.max(1, Number(url.searchParams.get("limit") ?? 12)));
  const cursor = url.searchParams.get("cursor");
  const rows = await db.select({ id: guestbookEntries.id, name: guestbookEntries.name, message: guestbookEntries.message, createdAt: guestbookEntries.createdAt })
    .from(guestbookEntries)
    .where(and(eq(guestbookEntries.status, "approved"), cursor ? lt(guestbookEntries.createdAt, new Date(cursor)) : undefined))
    .orderBy(desc(guestbookEntries.createdAt)).limit(limit + 1);
  const hasNext = rows.length > limit;
  const entries = hasNext ? rows.slice(0, limit) : rows;
  return Response.json({ entries, nextCursor: hasNext ? entries.at(-1)?.createdAt.toISOString() : null });
}

export async function POST(request: Request) {
  const parsed = guestbookInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid submission", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const visitor = visitorKey(request);
  const rate = await consumeRateLimit(visitor, "guestbook", 3, 24 * 60 * 60 * 1000);
  if (!rate.allowed) return Response.json({ error: "Submission limit reached. Try again tomorrow." }, { status: 429, headers: { "Retry-After": String(Math.ceil((rate.resetAt.getTime() - Date.now()) / 1000)) } });
  const hash = duplicateHash(visitor, parsed.data.message);
  const duplicate = await db.select({ id: guestbookEntries.id }).from(guestbookEntries).where(and(eq(guestbookEntries.duplicateHash, hash), or(eq(guestbookEntries.status, "pending"), eq(guestbookEntries.status, "approved")), gt(guestbookEntries.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000)))).limit(1);
  if (duplicate.length) return Response.json({ error: "That message was already transmitted." }, { status: 409 });
  await db.insert(guestbookEntries).values({ name: parsed.data.name, message: parsed.data.message, visitorKey: visitor, duplicateHash: hash });
  return Response.json({ accepted: true }, { status: 202 });
}
