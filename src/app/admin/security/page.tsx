import { SecuritySetup } from "@/components/admin/security-setup";
import { requireAdmin } from "@/lib/session";
export default async function Page(){const session=await requireAdmin({allowTwoFactorSetup:true});return <div><p className="eyebrow">Account security</p><h1 className="mt-4 text-4xl font-semibold tracking-[-.055em]">Two-factor authentication</h1><SecuritySetup enabled={session.twoFactorEnabled}/></div>}
