import { and, count, eq } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages, guestbookEntries, user } from "@/db/schema";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/session";

export default async function AdminPage() { const session = await requireAdmin(); const [[pending], [messages], [users]] = await Promise.all([db.select({value:count()}).from(guestbookEntries).where(eq(guestbookEntries.status,"pending")),db.select({value:count()}).from(contactMessages).where(eq(contactMessages.status,"new")),db.select({value:count()}).from(user).where(and(eq(user.banned,false)))]); return <div><p className="eyebrow">Admin overview</p><h1 className="mt-4 text-4xl font-semibold tracking-[-.055em]">Welcome, {session.user.name}.</h1><p className="mt-3 text-text-sub-600">Review public submissions and security state.</p><div className="mt-10 grid gap-4 sm:grid-cols-3">{[{label:"Pending guestbook",value:pending.value},{label:"New messages",value:messages.value},{label:"Active admins",value:users.value}].map((metric) => <Card className="p-6" key={metric.label}><p className="font-mono text-[9px] text-text-soft-400 uppercase">{metric.label}</p><p className="mt-5 text-5xl font-semibold">{metric.value}</p></Card>)}</div></div>; }
