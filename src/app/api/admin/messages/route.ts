import { and, desc, eq, lt } from "drizzle-orm";
import { db } from "@/db";
import { adminAuditLogs, contactMessages } from "@/db/schema";
import { requireApiAdmin } from "@/lib/admin-api";
import { sendContactNotification } from "@/lib/email";
import { messageStatusInput } from "@/lib/validation";

export async function GET(request: Request) {
  const access = await requireApiAdmin(request); if ("error" in access) return access.error;
  const url = new URL(request.url); const cursor = url.searchParams.get("cursor");
  const rows = await db.select().from(contactMessages).where(and(cursor ? lt(contactMessages.createdAt, new Date(cursor)) : undefined)).orderBy(desc(contactMessages.createdAt)).limit(31);
  const hasNext = rows.length > 30; const messages = hasNext ? rows.slice(0,30) : rows;
  return Response.json({ messages, nextCursor: hasNext ? messages.at(-1)?.createdAt.toISOString() : null });
}

export async function PATCH(request: Request) {
  const access = await requireApiAdmin(request); if ("error" in access) return access.error;
  const body = await request.json().catch(() => null);
  if (body?.action === "retry") {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, body.id)).limit(1); if (!message) return Response.json({ error: "Not found" }, { status: 404 });
    try { const resendId = await sendContactNotification(message); await db.update(contactMessages).set({ notificationStatus: "sent", resendId, updatedAt: new Date() }).where(eq(contactMessages.id, message.id)); }
    catch { return Response.json({ error: "Notification failed" }, { status: 502 }); }
    await db.insert(adminAuditLogs).values({ actorId: access.session.user.id, action: "message.retry", entityType: "contact", entityId: message.id }); return Response.json({ ok: true });
  }
  const parsed = messageStatusInput.safeParse(body); if (!parsed.success) return Response.json({ error: "Invalid request" }, { status: 400 });
  const [message] = await db.update(contactMessages).set({ status: parsed.data.status, updatedAt: new Date() }).where(eq(contactMessages.id, parsed.data.id)).returning();
  if (!message) return Response.json({ error: "Not found" }, { status: 404 });
  await db.insert(adminAuditLogs).values({ actorId: access.session.user.id, action: `message.${parsed.data.status}`, entityType: "contact", entityId: message.id });
  return Response.json({ message });
}
