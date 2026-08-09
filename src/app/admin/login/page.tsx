import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "Admin sign in", robots: { index: false, follow: false } };
export default function AdminLoginPage() { return <main className="grid min-h-screen place-items-center bg-bg-strong-950 p-5"><Card className="w-full max-w-md p-7"><LoginForm/></Card></main>; }
