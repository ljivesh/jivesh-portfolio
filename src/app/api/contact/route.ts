import { eq } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { sendContactNotification } from "@/lib/email";
import { consumeRateLimit } from "@/lib/rate-limit";
import { visitorKey } from "@/lib/request";
import { contactInput } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = contactInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid submission", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const visitor = visitorKey(request);
  const rate = await consumeRateLimit(visitor, "contact", 5, 60 * 60 * 1000);
  if (!rate.allowed) return Response.json({ error: "Message limit reached. Try again later." }, { status: 429 });
  const { website: _honeypot, ...message } = parsed.data;
  void _honeypot;
  const [record] = await db.insert(contactMessages).values({ ...message, visitorKey: visitor }).returning();
  try {
    const resendId = await sendContactNotification(record);
    await db.update(contactMessages).set({ notificationStatus: "sent", resendId, updatedAt: new Date() }).where(eq(contactMessages.id, record.id));
  } catch {
    await db.update(contactMessages).set({ notificationStatus: "failed", updatedAt: new Date() }).where(eq(contactMessages.id, record.id));
  }
  return Response.json({ accepted: true }, { status: 202 });
}
