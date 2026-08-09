"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter(); const [step,setStep] = useState<"credentials"|"totp">("credentials"); const [error,setError] = useState(""); const [loading,setLoading] = useState(false);
  async function credentials(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(""); const form = new FormData(event.currentTarget); const result = await authClient.signIn.email({ email: String(form.get("email")), password: String(form.get("password")), callbackURL: "/admin" }); setLoading(false); if (result.error) return setError(result.error.message ?? "Sign in failed"); if ((result.data as typeof result.data & { twoFactorRedirect?: boolean })?.twoFactorRedirect) return setStep("totp"); router.push("/admin"); router.refresh(); }
  async function verify(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(""); const code = String(new FormData(event.currentTarget).get("code")); const result = await authClient.twoFactor.verifyTotp({ code, trustDevice: false }); setLoading(false); if (result.error) return setError(result.error.message ?? "Invalid code"); router.push("/admin"); router.refresh(); }
  return <div><div className="mb-7 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-10 bg-signal/10 text-signal"><LockKeyhole size={20}/></span><div><p className="font-mono text-[9px] text-signal">SECURE ADMIN</p><h1 className="text-2xl font-semibold">{step === "credentials" ? "Sign in" : "Two-factor challenge"}</h1></div></div>{step === "credentials" ? <form className="space-y-4" onSubmit={credentials}><Input name="email" type="email" required placeholder="Admin email"/><Input name="password" type="password" required placeholder="Password"/><Button className="w-full" variant="primary" size="lg" disabled={loading}>{loading ? "Authenticating..." : "Continue"}</Button></form> : <form className="space-y-4" onSubmit={verify}><p className="text-sm text-text-sub-600">Enter the six-digit code from your authenticator.</p><Input name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required placeholder="000000" className="text-center font-mono text-2xl tracking-[.5em]"/><Button className="w-full" variant="primary" size="lg" disabled={loading}>{loading ? "Verifying..." : "Verify code"}</Button></form>}{error ? <p className="mt-4 text-sm text-error-base" role="alert">{error}</p> : null}</div>;
}
