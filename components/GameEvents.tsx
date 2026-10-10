"use client";

import { useEffect } from "react";
import { say, unlock } from "@/lib/game";
import { bridge } from "@/lib/bridge";
import { PROFILE } from "@/lib/content";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** Secrets that live outside any one section. */
export function GameEvents() {
  useEffect(() => {
    const pt = () => document.documentElement.dataset.lang === "pt";

    const h = new Date().getHours();
    if (h < 5) unlock("night-owl");

    let k = 0;
    const onKey = (e: KeyboardEvent) => {
      k = e.key.toLowerCase() === KONAMI[k].toLowerCase() ? k + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (k === KONAMI.length) {
        k = 0;
        unlock("konami");
        say(pt() ? "↑↑↓↓←→←→BA. Você é raiz." : "↑↑↓↓←→←→BA. Respect.");
      }
    };
    addEventListener("keydown", onKey);

    const w = window as unknown as { hire?: () => string };
    w.hire = () => {
      unlock("recruiter");
      say(pt() ? "Contratado! Vou avisar ele." : "Hired! I'll let him know.");
      return `${PROFILE.email} — ${pt() ? "manda um email, ele responde rápido." : "send an email, he answers fast."}`;
    };
    console.log(
      "%c THE LANE %c\npsst, recruiters: type hire() and press enter.",
      "background:#f0a03c;color:#0a0d10;font-family:monospace;font-size:14px;padding:2px 6px",
      "color:#49d4c4;font-family:monospace",
    );

    // Rush B only counts when you scroll there yourself, not via the menu links
    let usedNav = false;
    const onNav = (e: MouseEvent) => {
      if ((e.target as Element).closest?.('a[href^="#"]')) usedNav = true;
    };
    addEventListener("click", onNav, true);

    const start = performance.now();
    const contact = document.getElementById("contact");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        unlock("base");
        const from = bridge.introDoneAt || start;
        if (!usedNav && performance.now() - from < 15000) unlock("speedrun");
      },
      { threshold: 0.5 },
    );
    if (contact) io.observe(contact);

    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("click", onNav, true);
      io.disconnect();
      delete w.hire;
    };
  }, []);
  return null;
}
