import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AnalyticsPage() {
  const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/analytics/login");
  const { data, error } = await supabase.from("portfolio_analytics_events").select("event_type, visitor_hash, target, created_at").order("created_at", { ascending: false }).limit(1000);
  const events = data ?? []; const views = events.filter((e) => e.event_type === "page_view"); const clicks = events.filter((e) => e.event_type === "click"); const visitors = new Set(views.map((e) => e.visitor_hash).filter(Boolean)).size;
  return <main className="analyticsPage"><div className="analyticsShell"><p className="eyebrow">PRIVATE ANALYTICS</p><h1>Portfolio activity</h1><p className="analyticsMuted">Last 1,000 events · {user.email}</p>{error && <p role="alert" className="authError">Analytics data is temporarily unavailable. Please try again shortly.</p>}<div className="analyticsCards"><article><small>PAGE VIEWS</small><b>{views.length}</b></article><article><small>EST. UNIQUE VISITORS</small><b>{visitors}</b></article><article><small>TRACKED CLICKS</small><b>{clicks.length}</b></article></div><section className="analyticsTable"><h2>Recent clicks</h2>{clicks.length ? <ul>{clicks.slice(0, 20).map((event, index) => <li key={`${event.created_at}-${index}`}><span>{event.target || "Unnamed action"}</span><time>{new Date(event.created_at).toLocaleString()}</time></li>)}</ul> : <p>No clicks recorded yet.</p>}</section></div></main>;
}
