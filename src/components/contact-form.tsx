"use client";

import { ArrowUpRight } from "lucide-react";
import Script from "next/script";
import { FormEvent, useRef, useState } from "react";

const endpoint = "https://formspree.io/f/xrpeogpy";
const contactEmail = "angelopamalacsao@gmail.com";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus("Copy unavailable here. Select the address above to copy it.");
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2 || !email || message.length < 10) { setStatus("Please add your name, email, and a little more detail so I can respond usefully."); return; }
    if (turnstileSiteKey && !String(data.get("cf-turnstile-response") ?? "").trim()) {
      setStatus("Please complete the security check before sending. If it doesn't load, use the email address below.");
      return;
    }
    data.set("name", name);
    data.set("email", email);
    data.set("message", message);
    if (sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    setStatus("Sending your message…");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
        signal: controller.signal,
      });
      if (!response.ok) {
        setStatus(response.status === 429
          ? "Too many messages were sent recently. Please try again later or email me directly."
          : "I couldn't send your message. Please try again or email me directly.");
        return;
      }
      form.reset();
      setStatus("Thanks—your message was sent. I'll reply by email.");
    } catch (error) {
      setStatus(error instanceof DOMException && error.name === "AbortError"
        ? "The request timed out, so I can't confirm delivery. Please wait before trying again, or email me directly."
        : "I couldn't send your message. Please try again or email me directly.");
    } finally {
      if (turnstileSiteKey) window.turnstile?.reset();
      window.clearTimeout(timeout);
      sendingRef.current = false;
      setSending(false);
    }
  }
  return (
    <form onSubmit={submit}>
      {turnstileSiteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onError={() => setStatus("The security check couldn't load. Please email me using the address below.")} />}
      <label>Name<input required minLength={2} maxLength={80} name="name" autoComplete="name" placeholder="Your name" /></label>
      <label>Email<input required type="email" name="email" autoComplete="email" maxLength={254} placeholder="you@example.com" /></label>
      <label className="full">Message<textarea required minLength={10} maxLength={2000} name="message" rows={4} placeholder="Tell me about your idea..." /></label>
      <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
        <label>Leave this field empty<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {turnstileSiteKey && <div className="full turnstileWrap"><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="auto" data-size="flexible" data-response-field-name="cf-turnstile-response" /></div>}
      <button className="btn full" type="submit" disabled={sending} aria-disabled={sending}>{sending ? "Sending…" : "Send message"} <ArrowUpRight /></button>
      <p className="formStatus full" role="status" aria-live="polite">{status}</p>
      <p className="formStatus full">Prefer email? <span className="contactEmail">{contactEmail}</span> <button className="copyEmailButton" type="button" onClick={copyEmail}>Copy address</button></p>
      {copyStatus && <p className="formStatus full" role="status" aria-live="polite">{copyStatus}</p>}
    </form>
  );
}
