import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, type AdminRole } from "./auth";

export async function getAdminSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireAdmin(options?: { role?: AdminRole; allowTwoFactorSetup?: boolean }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const role = (session.user as typeof session.user & { role?: string }).role;
  if (!role || !["super_admin", "moderator"].includes(role)) redirect("/admin/login?error=forbidden");
  if (options?.role && role !== options.role) redirect("/admin?error=forbidden");
  const twoFactorEnabled = (session.user as typeof session.user & { twoFactorEnabled?: boolean }).twoFactorEnabled;
  if (!twoFactorEnabled && !options?.allowTwoFactorSetup) redirect("/admin/security?setup=required");
  return { ...session, role: role as AdminRole, twoFactorEnabled: Boolean(twoFactorEnabled) };
}
