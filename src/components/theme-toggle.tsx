"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

const themeListeners = new Set<() => void>();
const subscribeTheme = (listener: () => void) => {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
};
const getThemeSnapshot = () => {
  try {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  } catch {
    return false;
  }
};
const getThemeServerSnapshot = () => false;

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  function toggle() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
    themeListeners.forEach((listener) => listener());
  }
  return <button className="themeToggle" type="button" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}><span>{dark ? <Sun /> : <Moon />}</span></button>;
}
