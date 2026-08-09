import { AdminNav } from "@/components/admin/admin-nav";
import { getAdminSession } from "@/lib/session";

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function AdminLayout({ children }: { children: React.ReactNode }) { const session = await getAdminSession(); const role = (session?.user as { role?: string } | undefined)?.role; if (!session || !role || !["super_admin","moderator"].includes(role)) return children; return <div className="min-h-screen bg-bg-strong-950"><AdminNav role={role}/><main className="p-5 sm:p-8 lg:ml-64 lg:p-10">{children}</main></div>; }
