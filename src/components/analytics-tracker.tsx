"use client";

import { useEffect } from "react";

const VISITOR_KEY = "angelo-portfolio-visitor";

function randomVisitorId() {
  try {
    if (typeof crypto.randomUUID === "function") return crypto.randomUUID().replaceAll("-", "");
    return Array.from(crypto.getRandomValues(new Uint8Array(16)), (value) => value.toString(16).padStart(2, "0")).join("");
  } catch {
    return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`.padEnd(16, "0").slice(0, 80);
  }
}

function visitorId() {
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const next = randomVisitorId();
    window.localStorage.setItem(VISITOR_KEY, next);
    return next;
  } catch {
    return randomVisitorId();
  }
}

function send(event: { event: "page_view" | "click"; path: string; target?: string; visitorId?: string }) {
  const body = JSON.stringify(event);
  if (navigator.sendBeacon) { navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" })); return; }
  void fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => undefined);
}

export function AnalyticsTracker() {
  useEffect(() => {
    const id = visitorId();
    const today = new Date().toISOString().slice(0, 10);
    const viewKey = `angelo-portfolio-view:${today}`;
    const schedule = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 400));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    let scheduled: number | undefined;
    let shouldTrackView = true;
    try {
      shouldTrackView = !window.sessionStorage.getItem(viewKey);
      if (shouldTrackView) window.sessionStorage.setItem(viewKey, "1");
    } catch {}
    if (shouldTrackView) {
      scheduled = schedule(() => send({ event: "page_view", path: window.location.pathname, visitorId: id }));
    }
    let lastClick = "";
    let lastClickAt = 0;
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a,button");
      if (!target) return;
      const label = (target.getAttribute("aria-label") || target.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120);
      const now = Date.now();
      if (label && (label !== lastClick || now - lastClickAt > 1500)) { lastClick = label; lastClickAt = now; send({ event: "click", path: window.location.pathname, target: label, visitorId: id }); }
    };
    document.addEventListener("click", onClick, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      if (scheduled !== undefined) cancel(scheduled);
    };
  }, []);
  return null;
}
