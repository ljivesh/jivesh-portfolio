"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function ResetPasswordForm({token}:{token:string}){const router=useRouter();const[error,setError]=useState("");const[loading,setLoading]=useState(false);return <form className="space-y-4" onSubmit={async(event)=>{event.preventDefault();setLoading(true);const password=String(new FormData(event.currentTarget).get("password"));const r=await fetch("/api/auth/reset-password",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({newPassword:password,token})});setLoading(false);if(!r.ok)return setError("Password reset failed or expired.");router.push("/admin/login");}}><Input name="password" type="password" minLength={12} required placeholder="New password (12+ characters)"/><Button className="w-full" size="lg" variant="primary" disabled={loading}>{loading?"Updating...":"Set password"}</Button>{error?<p className="text-sm text-error-base">{error}</p>:null}</form>}
