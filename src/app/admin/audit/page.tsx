import { AuditLog } from "@/components/admin/audit-log";
import { requireAdmin } from "@/lib/session";
export default async function Page(){await requireAdmin({role:"super_admin"});return <div><p className="eyebrow">Security log</p><h1 className="mt-4 text-4xl font-semibold tracking-[-.055em]">Audit trail</h1><AuditLog/></div>}
