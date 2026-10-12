"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AnalyticsLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      if (!url || !key) {
        setError("Analytics sign-in is temporarily unavailable.");
        return;
      }
      const supabase = createBrowserClient(url, key);
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError) setError("The email or password was not accepted.");
      else router.push("/analytics");
    } catch {
      setError("Analytics sign-in is temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authPage">
      <form className="authCard" onSubmit={submit}>
        <p className="eyebrow">PRIVATE AREA</p>
        <h1>Analytics dashboard</h1>
        <p>Sign in with your Supabase account to view portfolio metrics.</p>
        <label>Email<input type="email" required maxLength={254} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label>Password<input type="password" required maxLength={256} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error && <p role="alert" className="authError">{error}</p>}
        <button className="btn" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}
