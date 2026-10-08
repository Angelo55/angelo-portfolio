"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { ReactNode, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

type OverlayDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: "medium" | "large";
};

const focusableSelector =
  'a[href],button:not([disabled]),iframe,input,textarea,select,[tabindex]:not([tabindex="-1"])';

export function OverlayDialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = "medium",
}: OverlayDialogProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();


  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(focusableSelector);
      (first ?? dialogRef.current)?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)];
      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="dialogBackdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            ref={dialogRef}
            className={`dialogPanel dialog-${size}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="dialogHeader">
              <div>
                <p className="eyebrow">PORTFOLIO DETAIL</p>
                <h2 id={titleId}>{title}</h2>
                {description && <p id={descriptionId}>{description}</p>}
              </div>
              <button className="dialogClose" type="button" onClick={onClose} aria-label="Close dialog">
                <X />
              </button>
            </header>
            <div className="dialogBody">{children}</div>
            {actions && <footer className="dialogActions">{actions}</footer>}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
