"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [["Work", "#work"], ["Skills", "#skills"], ["Certificates", "#certificates"], ["Experience", "#experience"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let directionStartY = lastY;
    let lastDirection: "up" | "down" = "down";
    let frame = 0;

    function updateHeader() {
      const currentY = Math.max(window.scrollY, 0);
      const direction = currentY > lastY ? "down" : currentY < lastY ? "up" : lastDirection;

      if (direction !== lastDirection) {
        directionStartY = currentY;
        lastDirection = direction;
      }

      const distance = Math.abs(currentY - directionStartY);
      if (currentY <= 72) setCompressed(false);
      else if (direction === "down" && distance >= 18) setCompressed(true);
      else if (direction === "up" && distance >= 10) setCompressed(false);

      lastY = currentY;
      frame = 0;
    }

    function handleScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const firstLink = navRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    }
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!navRef.current?.contains(target) && !menuRef.current?.contains(target)) setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return <header className={"header siteHeader" + (compressed ? " headerCompressed" : "")} data-compressed={compressed}>
    <a className="brand" href="#top"><b>A</b><span>ANGELO</span></a>
    <nav className="desktop" aria-label="Primary navigation">{links.map((link) => <a key={link[1]} href={link[1]}>{link[0]}</a>)}</nav>
    <div className="headerActions"><ThemeToggle /><a className="btn desktop" href="#contact">Let&apos;s talk</a></div>
    <button ref={menuRef} className="menu" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
      <span className={`menuIcon menuIconOpen${open ? " menuIconHidden" : ""}`}><Menu /></span>
      <span className={`menuIcon menuIconClose${open ? "" : " menuIconHidden"}`}><X /></span>
    </button>
    <nav ref={navRef} id="mobile-navigation" className={`mobile${open ? " mobileOpen" : ""}`} aria-label="Mobile navigation" aria-hidden={!open}>
      {links.map((link) => <a key={link[1]} href={link[1]} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{link[0]}</a>)}
      <a href="#contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>Contact</a>
    </nav>
  </header>;
}
