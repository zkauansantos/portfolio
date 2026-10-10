"use client";

import { useEffect, useRef, useState } from "react";
import { markBuilt, shatter, startCrew, type CrewHandle } from "@/lib/crew";
import { PROFILE } from "@/lib/content";
import { setLang, useCopy, useLang } from "@/lib/i18n";
import { unlock } from "@/lib/game";
import { spawnCompanion } from "@/lib/bridge";
import { canBuild } from "./BuildZone";
import styles from "./Hero.module.css";

type Phase = "idle" | "intro" | "ready";

export function Hero() {
  const t = useCopy();
  const lang = useLang();
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const crew = useRef<CrewHandle | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const el = section.current!;
    const home = () => {
      const r = el.getBoundingClientRect();
      return { x: Math.min(r.width - 40, document.documentElement.clientWidth - 40), y: Math.min(r.height, innerHeight) - 24 };
    };
    const handOff = (p: { x: number; y: number }) => {
      const r = el.getBoundingClientRect();
      spawnCompanion({ x: p.x + r.left, y: p.y + r.top });
    };
    const ready = () => {
      document.documentElement.style.overflow = "";
      try {
        localStorage.setItem("lane:intro", "1");
      } catch {}
      setPhase("ready");
    };

    if (!canBuild() || document.documentElement.dataset.intro === "seen") {
      el.querySelectorAll("[data-build]").forEach(markBuilt);
      setPhase("ready");
      handOff(home());
      return;
    }

    setPhase("intro");
    history.scrollRestoration = "manual";
    scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.style.overflow = "hidden";
    crew.current = startCrew({
      zone: el,
      canvas: canvas.current!,
      entry: "base",
      crew: 5,
      duration: 2.4,
      home,
      onDone: (leader) => {
        ready();
        handOff(leader ?? home());
      },
    });

    const skip = (why: "key" | "scroll") => {
      if (!crew.current) return;
      crew.current.finish();
      document.documentElement.style.overflow = "";
      if (why === "key") unlock("impatient");
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip("key");
    const onWheel = () => skip("scroll");
    addEventListener("keydown", onKey);
    addEventListener("wheel", onWheel, { passive: true });
    addEventListener("touchmove", onWheel, { passive: true });
    const skipBtn = el.querySelector<HTMLButtonElement>("[data-skip]");
    const onSkip = () => skip("key");
    skipBtn?.addEventListener("click", onSkip);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("wheel", onWheel);
      removeEventListener("touchmove", onWheel);
      skipBtn?.removeEventListener("click", onSkip);
      crew.current?.cancel();
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Knockout: hit the name five times quickly.
  const hits = useRef<number[]>([]);
  const busy = useRef(false);
  const onTitle = async () => {
    if (phase !== "ready" || busy.current || !canBuild()) return;
    const now = performance.now();
    hits.current = [...hits.current.filter((h) => now - h < 1600), now];
    title.current!.dataset.hit = String(hits.current.length);
    if (hits.current.length < 5) return;
    hits.current = [];
    busy.current = true;
    unlock("knockout");
    await shatter(section.current!, canvas.current!, title.current!);
    await new Promise((r) => setTimeout(r, 500));
    startCrew({ zone: section.current!, canvas: canvas.current!, crew: 3, duration: 1.4, onDone: () => (busy.current = false) });
  };

  const links = [
    { href: "#shop", label: t.nav.shop },
    { href: "#hero", label: t.nav.hero },
    { href: "#matches", label: t.nav.matches },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <section ref={section} id="top" className={styles.hero} data-phase={phase} aria-label={PROFILE.name}>
      <button type="button" className={styles.skip} data-skip hidden={phase !== "intro"}>
        {t.skip} <kbd className={styles.kbd}>Esc</kbd>
      </button>
      <p className="sr-only" role="status">
        {phase === "intro" ? t.building : t.ready}
      </p>

      <header className={styles.nav}>
        <a href="#top" className={styles.navName} data-build>
          {PROFILE.name}
        </a>
        <nav aria-label="Sections" className={styles.navLinks}>
          {links.map((l) => (
            <a key={l.href} href={l.href} data-build>
              {l.label}
            </a>
          ))}
          <a href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noopener noreferrer" className={styles.navGithub} data-build>
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
        <button type="button" className={styles.lang} onClick={() => setLang(lang === "en" ? "pt" : "en")} aria-label={lang === "en" ? "Mudar para português" : "Switch to English"} data-build>
          <span data-on={lang === "en" || undefined}>EN</span>/<span data-on={lang === "pt" || undefined}>PT</span>
        </button>
        <button type="button" className={styles.menuButton} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
          <span className={styles.burger} aria-hidden="true" />
          <span className="sr-only">Menu</span>
        </button>
      </header>

      <nav id="mobile-menu" className={styles.menu} data-open={menu || undefined} aria-label="Menu" hidden={!menu}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={styles.menuLink} onClick={() => setMenu(false)}>
            {l.label}
          </a>
        ))}
        <a href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noopener noreferrer" className={styles.menuLink}>
          GitHub
        </a>
        <button type="button" className={styles.menuLink} onClick={() => setLang(lang === "en" ? "pt" : "en")}>
          {lang === "en" ? "Português" : "English"}
        </button>
      </nav>

      <div className={styles.content}>
        <h1 ref={title} className={styles.title} onClick={onTitle} data-build>
          {PROFILE.name}
        </h1>
        <p className={styles.line} data-build>
          {t.line1a}
          <br />
          <span className={styles.accent}>{t.line1b}</span>
          <br />
          {t.line2}
        </p>
        <div className={styles.ctas}>
          <a href="#shop" className={styles.primary} data-build="box">
            <span data-build>{t.cta} ↓</span>
          </a>
        </div>
        <ul className={styles.socials}>
          {PROFILE.socials.slice(0, 3).map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" data-build>
                {s.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.ground} aria-hidden="true" />
      <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
    </section>
  );
}
