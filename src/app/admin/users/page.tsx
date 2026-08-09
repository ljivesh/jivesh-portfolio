import { UsersAdmin } from "@/components/admin/users-admin";
import { requireAdmin } from "@/lib/session";
export default async function Page(){await requireAdmin({role:"super_admin"});return <div><p className="eyebrow">Access control</p><h1 className="mt-4 text-4xl font-semibold tracking-[-.055em]">Administrators</h1><UsersAdmin/></div>}
