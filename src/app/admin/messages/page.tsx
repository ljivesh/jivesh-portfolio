import { MessagesAdmin } from "@/components/admin/messages-admin";
import { requireAdmin } from "@/lib/session";
export default async function Page(){await requireAdmin();return <div><p className="eyebrow">Contact inbox</p><h1 className="mt-4 text-4xl font-semibold tracking-[-.055em]">Messages</h1><MessagesAdmin/></div>}
