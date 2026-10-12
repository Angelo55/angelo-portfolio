"use client";
import { FormEvent, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function AnalyticsLogin() {
  const router = useRouter(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setLoading(true); setError(""); const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!); const { error: authError } = await supabase.auth.signInWithPassword({ email, password }); if (authError) setError(authError.message); else router.push("/analytics"); setLoading(false); }
  return <main className="authPage"><form className="authCard" onSubmit={submit}><p className="eyebrow">PRIVATE AREA</p><h1>Analytics dashboard</h1><p>Sign in with your Supabase account to view portfolio metrics.</p><label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label><label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>{error && <p role="alert" className="authError">{error}</p>}<button className="btn" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button></form></main>;
}
