import { auth, type AdminRole } from "./auth";

export async function requireApiAdmin(request: Request, role?: AdminRole) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) } as const;
  const user = session.user as typeof session.user & { role?: string; twoFactorEnabled?: boolean };
  if (!user.role || !["super_admin", "moderator"].includes(user.role)) return { error: Response.json({ error: "Forbidden" }, { status: 403 }) } as const;
  if (!user.twoFactorEnabled) return { error: Response.json({ error: "Two-factor setup required" }, { status: 403 }) } as const;
  if (role && user.role !== role) return { error: Response.json({ error: "Forbidden" }, { status: 403 }) } as const;
  return { session, role: user.role as AdminRole } as const;
}
