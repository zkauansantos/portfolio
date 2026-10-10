"use client";

import { useEffect, useRef, useState } from "react";
import { useCaptured, useSouls } from "@/lib/game";
import { useCopy } from "@/lib/i18n";
import { bridge } from "@/lib/bridge";
import styles from "./Minimap.module.css";

const STOPS = ["shop", "hero", "matches", "season", "contact"] as const;

/** MOBA-style minimap: objectives down the lane, your position, and your souls. */
export function Minimap() {
  const t = useCopy();
  const captured = useCaptured();
  const souls = useSouls();
  const [on, setOn] = useState(false);
  const [past, setPast] = useState(false);
  const [shown, setShown] = useState(0);
  const dot = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState<number[]>([]);

  useEffect(() => {
    if (bridge.spawn) setOn(true);
    const show = () => setOn(true);
    addEventListener("companion-spawn", show);
    let raf = 0;
    const measure = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setMarks(STOPS.map((id) => {
        const el = document.getElementById(id);
        return el ? Math.min(1, Math.max(0, (el.offsetTop - innerHeight * 0.4) / max)) : 0;
      }));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? scrollY / max : 0;
        dot.current?.style.setProperty("--p", String(p));
        setPast(scrollY > innerHeight * 0.6);
      });
    };
    measure();
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      removeEventListener("companion-spawn", show);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", measure);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // count souls up a few at a time
  useEffect(() => {
    if (shown === souls) return;
    const id = setTimeout(() => setShown((s) => (s < souls ? Math.min(souls, s + 10) : souls)), 16);
    return () => clearTimeout(id);
  }, [shown, souls]);

  const labels: Record<(typeof STOPS)[number], string> = {
    shop: t.nav.shop,
    hero: t.nav.hero,
    matches: t.nav.matches,
    season: t.graph.title,
    contact: t.nav.contact,
  };

  return (
    <aside className={styles.map} data-on={(on && past) || undefined} aria-label="Minimap">
      <p className={styles.souls}>
        <span className={styles.gem} aria-hidden="true" />
        {shown.toLocaleString()} <span className={styles.unit}>{t.souls}</span>
      </p>
      <nav className={styles.lane}>
        <span className={styles.path} aria-hidden="true" />
        {STOPS.map((id, i) => (
          <a key={id} href={`#${id}`} className={styles.stop} style={{ "--p": marks[i] ?? i / 4 } as React.CSSProperties} data-captured={captured.includes(id) || undefined}>
            <span className={styles.tower} aria-hidden="true" />
            <span className={styles.label}>{labels[id]}</span>
          </a>
        ))}
        <span ref={dot} className={styles.you} aria-hidden="true" />
      </nav>
    </aside>
  );
}
