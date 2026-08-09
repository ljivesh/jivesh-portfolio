"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, BookOpenCheck, Inbox, LayoutDashboard, LogOut, ShieldCheck, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const items = [{href:"/admin",label:"Overview",icon:LayoutDashboard},{href:"/admin/guestbook",label:"Guestbook",icon:BookOpenCheck},{href:"/admin/messages",label:"Messages",icon:Inbox},{href:"/admin/users",label:"Users",icon:Users},{href:"/admin/audit",label:"Audit",icon:Activity},{href:"/admin/security",label:"Security",icon:ShieldCheck}];
export function AdminNav({ role }: { role: string }) { const pathname = usePathname(); const router = useRouter(); return <aside className="border-b border-stroke-soft bg-bg-weak-950 p-4 lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-r lg:border-b-0 lg:p-5"><Link href="/admin" className="block border-b border-stroke-soft pb-5"><p className="font-mono text-[9px] text-signal">MENMA.OS / ADMIN</p><p className="mt-1 font-semibold">Control terminal</p><p className="mt-1 font-mono text-[9px] text-text-soft-400">{role.toUpperCase()}</p></Link><nav className="mt-5 grid gap-1">{items.filter((item) => !["/admin/users","/admin/audit"].includes(item.href) || role === "super_admin").map((item) => <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-8 px-3 py-2.5 text-sm text-text-sub-600 hover:bg-bg-white-5 hover:text-text-strong-950", pathname === item.href && "bg-bg-white-5 text-signal")}><item.icon size={16}/>{item.label}</Link>)}</nav><button className="mt-5 flex w-full items-center gap-3 rounded-8 px-3 py-2.5 text-sm text-text-sub-600 hover:bg-bg-white-5 hover:text-error-base lg:absolute lg:right-5 lg:bottom-5 lg:left-5 lg:w-auto" onClick={async () => { await authClient.signOut(); router.push("/admin/login"); router.refresh(); }}><LogOut size={16}/>Sign out</button></aside>; }
