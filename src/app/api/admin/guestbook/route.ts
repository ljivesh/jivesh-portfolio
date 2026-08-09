import { and, desc, eq, lt } from "drizzle-orm";
import { db } from "@/db";
import { adminAuditLogs, guestbookEntries } from "@/db/schema";
import { requireApiAdmin } from "@/lib/admin-api";
import { moderationInput } from "@/lib/validation";

export async function GET(request: Request) {
  const access = await requireApiAdmin(request); if ("error" in access) return access.error;
  const url = new URL(request.url); const status = url.searchParams.get("status") as "pending" | "approved" | "rejected" | null; const cursor = url.searchParams.get("cursor");
  const rows = await db.select().from(guestbookEntries).where(and(status ? eq(guestbookEntries.status, status) : undefined, cursor ? lt(guestbookEntries.createdAt, new Date(cursor)) : undefined)).orderBy(desc(guestbookEntries.createdAt)).limit(31);
  const hasNext = rows.length > 30; const entries = hasNext ? rows.slice(0,30) : rows;
  return Response.json({ entries, nextCursor: hasNext ? entries.at(-1)?.createdAt.toISOString() : null });
}

export async function PATCH(request: Request) {
  const access = await requireApiAdmin(request); if ("error" in access) return access.error;
  const parsed = moderationInput.safeParse(await request.json().catch(() => null)); if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });
  const [entry] = await db.update(guestbookEntries).set({ status: parsed.data.status, moderatedBy: access.session.user.id, moderatedAt: new Date(), updatedAt: new Date() }).where(eq(guestbookEntries.id, parsed.data.id)).returning();
  if (!entry) return Response.json({ error: "Not found" }, { status: 404 });
  await db.insert(adminAuditLogs).values({ actorId: access.session.user.id, action: `guestbook.${parsed.data.status}`, entityType: "guestbook", entityId: entry.id });
  return Response.json({ entry });
}
