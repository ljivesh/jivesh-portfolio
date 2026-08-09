import { randomBytes, randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { db } from "@/db";
import { account, adminAuditLogs, session, user } from "@/db/schema";
import { requireApiAdmin } from "@/lib/admin-api";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const access = await requireApiAdmin(request, "super_admin"); if ("error" in access) return access.error;
  const users = await db.select({ id: user.id, name: user.name, email: user.email, role: user.role, banned: user.banned, twoFactorEnabled: user.twoFactorEnabled, createdAt: user.createdAt }).from(user);
  return Response.json({ users });
}

export async function POST(request: Request) {
  const access = await requireApiAdmin(request, "super_admin"); if ("error" in access) return access.error;
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.name || !["moderator", "super_admin"].includes(body.role)) return Response.json({ error: "Invalid request" }, { status: 400 });
  const existing = await db.select({ id: user.id }).from(user).where(eq(user.email, String(body.email).toLowerCase())).limit(1); if (existing.length) return Response.json({ error: "User already exists" }, { status: 409 });
  const id = randomUUID(); const password = randomBytes(24).toString("base64url");
  await db.transaction(async (tx) => { await tx.insert(user).values({ id, name: String(body.name), email: String(body.email).toLowerCase(), role: body.role, emailVerified: true }); await tx.insert(account).values({ id: randomUUID(), accountId: id, providerId: "credential", userId: id, password: await hashPassword(password) }); });
  await auth.api.requestPasswordReset({ body: { email: String(body.email).toLowerCase(), redirectTo: "/admin/reset-password" } });
  await db.insert(adminAuditLogs).values({ actorId: access.session.user.id, action: "user.create", entityType: "user", entityId: id, metadata: { role: body.role } });
  return Response.json({ id }, { status: 201 });
}

export async function PATCH(request: Request) {
  const access = await requireApiAdmin(request, "super_admin"); if ("error" in access) return access.error;
  const body = await request.json().catch(() => null); if (!body?.id || !body?.action) return Response.json({ error: "Invalid request" }, { status: 400 });
  if (body.id === access.session.user.id && ["disable", "role"].includes(body.action)) return Response.json({ error: "You cannot demote or disable yourself" }, { status: 400 });
  if (body.action === "role" && ["moderator", "super_admin"].includes(body.role)) await db.update(user).set({ role: body.role, updatedAt: new Date() }).where(eq(user.id, body.id));
  else if (body.action === "disable") { await db.update(user).set({ banned: true, banReason: "Disabled by super admin", updatedAt: new Date() }).where(eq(user.id, body.id)); await db.delete(session).where(eq(session.userId, body.id)); }
  else if (body.action === "enable") await db.update(user).set({ banned: false, banReason: null, banExpires: null, updatedAt: new Date() }).where(eq(user.id, body.id));
  else if (body.action === "revoke") await db.delete(session).where(eq(session.userId, body.id));
  else return Response.json({ error: "Unsupported action" }, { status: 400 });
  await db.insert(adminAuditLogs).values({ actorId: access.session.user.id, action: `user.${body.action}`, entityType: "user", entityId: body.id, metadata: body.role ? { role: body.role } : {} });
  return Response.json({ ok: true });
}
