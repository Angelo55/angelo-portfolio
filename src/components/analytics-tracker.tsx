"use client";

import { useEffect } from "react";

const VISITOR_KEY = "angelo-portfolio-visitor";

function visitorId() {
  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID().replaceAll("-", "");
  window.localStorage.setItem(VISITOR_KEY, next);
  return next;
}

function send(event: { event: "page_view" | "click"; path: string; target?: string; visitorId?: string }) {
  void fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(event), keepalive: true }).catch(() => undefined);
}

export function AnalyticsTracker() {
  useEffect(() => {
    const id = visitorId();
    const today = new Date().toISOString().slice(0, 10);
    const viewKey = `angelo-portfolio-view:${today}`;
    if (!window.sessionStorage.getItem(viewKey)) {
      window.sessionStorage.setItem(viewKey, "1");
      send({ event: "page_view", path: window.location.pathname, visitorId: id });
    }
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a,button");
      if (!target) return;
      const label = (target.getAttribute("aria-label") || target.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120);
      if (label) send({ event: "click", path: window.location.pathname, target: label, visitorId: id });
    };
    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
