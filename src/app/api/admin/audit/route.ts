import { desc } from "drizzle-orm";
import { db } from "@/db";
import { adminAuditLogs } from "@/db/schema";
import { requireApiAdmin } from "@/lib/admin-api";

export async function GET(request: Request) { const access = await requireApiAdmin(request, "super_admin"); if ("error" in access) return access.error; const logs = await db.select().from(adminAuditLogs).orderBy(desc(adminAuditLogs.createdAt)).limit(100); return Response.json({ logs }); }
