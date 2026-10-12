"use client";

import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2 || message.length < 10) { setStatus("Please add your name and a little more detail so I can respond usefully."); return; }
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    setStatus("Your email app is opening with the message ready to review.");
    window.location.href = `mailto:angelopamalacsao@gmail.com?subject=${subject}&body=${body}`;
  }
  return (
    <form onSubmit={submit}>
      <label>Name<input required minLength={2} maxLength={80} name="name" autoComplete="name" placeholder="Your name" /></label>
      <label>Email<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
      <label className="full">Message<textarea required minLength={10} maxLength={2000} name="message" rows={4} placeholder="Tell me about your idea..." /></label>
      <button className="btn full" type="submit">Open email draft <ArrowUpRight /></button>
      <p className="formStatus full" aria-live="polite">{status}</p>
    </form>
  );
}
