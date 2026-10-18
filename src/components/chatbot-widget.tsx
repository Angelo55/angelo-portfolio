"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Bot,
  ExternalLink,
  FileText,
  Github,
  MessageCircle,
  RefreshCcw,
  Send,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { DocumentDialog } from "@/components/document-dialog";
import { OverlayDialog } from "@/components/overlay-dialog";

const initialMessage = {
  role: "assistant" as const,
  text: "Hi, I’m Angelo’s portfolio assistant. I can give you a quick view of my skills, projects, credentials, resume, and current career interests.",
};

const promptActions = [
  { label: "Candidate summary", prompt: "Give me a concise recruiter-friendly summary of Angelo." },
  { label: "Skills", prompt: "What skills can Angelo contribute? Keep it scannable." },
  { label: "Career interests", prompt: "What roles and opportunities is Angelo exploring?" },
];

type Message = { role: "assistant" | "user"; text: string };

function PesoPreview({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="chatResource" type="button" onClick={() => setOpen(true)}>
        <span className="chatResourceIcon"><Image src="/images/peso-kabankalan-preview.png" alt="" width={44} height={32} /></span>
        <span><strong>PESO project</strong><small>Preview the case study and links</small></span>
        <ArrowUpRight aria-hidden="true" />
      </button>
      <OverlayDialog
        open={open}
        onClose={() => setOpen(false)}
        title="PESO Kabankalan Employment System"
        description="I designed and built this employment platform around clearer local service workflows."
        size="large"
        actions={
          <div className="chatDialogActions">
            <a className="btn" href="https://pesokabankalanjobs.tech" target="_blank" rel="noreferrer">Visit live demo <ArrowUpRight /></a>
            <a className="btn btnSecondary" href="https://github.com/Angelo55/angelo-portfolio" target="_blank" rel="noreferrer"><Github />Portfolio source <ExternalLink /></a>
            <button className="textLink" type="button" onClick={() => { setOpen(false); onNavigate(); }}>See project section <ArrowUpRight /></button>
          </div>
        }
      >
        <div className="chatProjectPreview">
          <Image src="/images/peso-kabankalan-preview.png" alt="Preview of the PESO Kabankalan Employment System" width={1440} height={810} sizes="(max-width: 800px) 92vw, 52vw" />
          <div>
            <p>I contributed across architecture, full-stack development, infrastructure, and UI/UX implementation for a platform serving job seekers and PESO personnel.</p>
            <a className="textLink" href="#work" onClick={() => setOpen(false)}>Read the full case study <ArrowUpRight /></a>
          </div>
        </div>
      </OverlayDialog>
    </>
  );
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      // A document preview is the topmost dialog while it is open.
      if (document.querySelector(".dialogBackdrop [role='dialog']")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]),a[href],input:not([disabled])',
      )];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (document.querySelector(".dialogBackdrop")?.contains(target)) return;
      if (!panelRef.current?.contains(target) && !launcherRef.current?.contains(target)) {
        setOpen(false);
        requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  async function send(message = input) {
    const value = message.trim();
    if (!value || loading) return;
    setInput("");
    setMessages((items) => [...items, { role: "user", text: value }]);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });
      const data = await response.json();
      setMessages((items) => [...items, { role: "assistant", text: data.answer || data.error || "I’m unable to answer that right now." }]);
    } catch {
      setMessages((items) => [...items, { role: "assistant", text: "I can’t reach the assistant right now. You can still review my portfolio links or contact me directly." }]);
    } finally {
      setLoading(false);
    }
  }

  function resetChat() {
    setMessages([initialMessage]);
    setInput("");
    setLoading(false);
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }

  function closeChat(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void send();
  }

  return (
    <div className="chatbot">
      <AnimatePresence>
        {open && <motion.div className="chatBackdrop" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onPointerDown={() => closeChat()} />}
      </AnimatePresence>
      <motion.button
        ref={launcherRef}
        className="chatLauncher"
        type="button"
        onClick={() => open ? closeChat() : setOpen(true)}
        aria-expanded={open}
        aria-controls="portfolio-chat"
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <X /> : <MessageCircle />}<span className="chatLauncherLabel">Ask about Angelo</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.section
            ref={panelRef}
            id="portfolio-chat"
            className="chatPanel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <header className="chatHeader">
              <span className="chatIcon"><Bot /></span>
              <div><h2 id="chat-title">My portfolio assistant</h2><small>Verified profile information</small></div>
              <button type="button" onClick={() => closeChat()} aria-label="Close assistant"><X /></button>
            </header>

            <motion.div className="chatMessages" aria-live="polite" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}>
              {messages.map((message, index) => (
                <motion.div key={`${message.role}-${index}`} className={`chatMessageRow ${message.role}`} variants={{ hidden: { opacity: 0, y: 7 }, show: { opacity: 1, y: 0 } }}>
                  <span className="chatAvatar" aria-hidden="true">{message.role === "assistant" ? <Bot /> : <UserRound />}</span>
                  <p className={`chatMessage ${message.role}`}>{message.text}</p>
                </motion.div>
              ))}
              {loading && <motion.div className="chatMessageRow assistant" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="chatAvatar" aria-hidden="true"><Bot /></span><p className="chatMessage assistant">Thinking…</p></motion.div>}
            </motion.div>

            <div className="chatActions" aria-label="Quick questions">
              {promptActions.map((action) => <motion.button key={action.label} type="button" onClick={() => void send(action.prompt)} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>{action.label}<ArrowUpRight /></motion.button>)}
              <DocumentDialog src="/documents/Angelo_Lacsao_Resume.pdf" title="My resume" className="chatActionButton"><FileText />View resume</DocumentDialog>
              <a className="chatActionButton" href="#certificates" onClick={() => closeChat(false)}>Credentials <ArrowUpRight /></a>
              <a className="chatActionButton" href="mailto:angelopamalacsao@gmail.com">Contact me <ExternalLink /></a>
            </div>
            <div className="chatResourceList"><PesoPreview onNavigate={() => closeChat(false)} /></div>

            <div className="chatFooterActions">
              <button type="button" className="chatReset" onClick={resetChat}><RefreshCcw />New chat</button>
              <span>Answers are grounded in my portfolio</span>
            </div>
            <form onSubmit={submit}>
              <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Ask about my skills, projects, or resume…" aria-label="Ask the portfolio assistant" />
              <motion.button type="submit" disabled={loading || !input.trim()} aria-label="Send question" whileTap={{ scale: 0.9 }}><Send /></motion.button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
