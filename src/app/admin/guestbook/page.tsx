import { GuestbookAdmin } from "@/components/admin/guestbook-admin";
import { requireAdmin } from "@/lib/session";
export default async function Page(){await requireAdmin();return <div><p className="eyebrow">Moderation queue</p><h1 className="mt-4 text-4xl font-semibold tracking-[-.055em]">Guestbook</h1><GuestbookAdmin/></div>;}
