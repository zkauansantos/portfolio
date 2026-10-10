"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { drawMinion, SPRITE_COLS, SPRITE_ROWS, TEAM_SHADES } from "@/lib/sprites";
import { bridge } from "@/lib/bridge";
import { unlock } from "@/lib/game";
import { useLang } from "@/lib/i18n";
import { LastHit } from "./LastHit";
import styles from "./Companion.module.css";

const S = 4;
const W = SPRITE_COLS * S;
const H = (SPRITE_ROWS + 2) * S;

const shuffle = (n: number) => {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function Companion() {
  const lang = useLang();
  const langRef = useRef(lang);
  langRef.current = lang;
  const canvas = useRef<HTMLCanvasElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const [game, setGame] = useState(false);
  const gameRef = useRef(game);
  gameRef.current = game;
  const close = useCallback(() => setGame(false), []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = canvas.current!;
    const btn = button.current!;
    const bub = bubble.current!;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pt = () => langRef.current === "pt";
    const m = { x: -100, y: -100, face: -1 as 1 | -1, walk: 0, blink: 0, fly: true };
    let alive = false;
    let tx = 0;
    let ty = 0;
    let sayUntil = 0;
    let lastInput = performance.now();
    let afk = false;
    let spot: { el: HTMLElement; since: number } | null = null;
    let leftAt = 0;
    let spokenFor: HTMLElement | null = null;
    const said = new WeakMap<HTMLElement, { order: number[]; i: number }>();

    const home = () => ({ x: document.documentElement.clientWidth - 40, y: innerHeight - 12 });

    const speak = (line: string, ms = 2800) => {
      bub.textContent = line;
      bub.dataset.on = "";
      sayUntil = performance.now() + ms;
    };

    const spawn = (p: { x: number; y: number }) => {
      alive = true;
      m.x = p.x;
      m.y = p.y;
      const h = home();
      tx = h.x;
      ty = h.y;
      cv.dataset.on = "";
      btn.hidden = false;
    };
    if (bridge.spawn) spawn(bridge.spawn);
    const onSpawn = (e: Event) => spawn((e as CustomEvent).detail);
    addEventListener("companion-spawn", onSpawn);

    const onSay = (e: Event) => {
      const { line, ms } = (e as CustomEvent).detail;
      if (alive) speak(line, ms);
    };
    addEventListener("minion-say", onSay);

    const onInput = () => {
      lastInput = performance.now();
      if (afk) {
        afk = false;
        speak(pt() ? "Ah. Você voltou." : "Oh. You're back.", 2000);
      }
    };
    const inputs = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
    inputs.forEach((ev) => addEventListener(ev, onInput, { passive: true }));

    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const el = (e.target as Element).closest<HTMLElement>("[data-spot]");
      if (el && el !== spot?.el) spot = { el, since: performance.now() };
      if (!el && spot) {
        spot = null;
        leftAt = performance.now();
      }
    };
    addEventListener("pointerover", onOver);

    // touch: tapping a spot is the same as hovering it
    const onTap = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const el = (e.target as Element).closest<HTMLElement>("[data-spot]");
      if (el) spot = { el, since: performance.now() - 500 };
    };
    addEventListener("pointerdown", onTap);

    const onPing = (e: MouseEvent) => {
      if (!e.altKey || !alive) return;
      e.preventDefault();
      const ring = document.createElement("span");
      ring.className = styles.ping;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), 900);
      tx = e.clientX;
      ty = e.clientY - 8;
      spot = null;
      leftAt = performance.now() + 1500;
      speak(pt() ? "Tô indo!" : "On my way!", 1500);
      unlock("ping");
    };
    addEventListener("click", onPing, true);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(1 / 30, (now - last) / 1000);
      last = now;
      if (!alive || document.hidden) return;

      if (!afk && now - lastInput > 60000) {
        afk = true;
        unlock("afk");
        speak(pt() ? "AFK? Então vou farmar sozinho." : "AFK? Fine, I'll farm alone.", 5000);
      }

      if (spot && !gameRef.current && now - spot.since > 450) {
        const r = spot.el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) spot = null;
        else {
          tx = Math.max(24, Math.min(document.documentElement.clientWidth - 24, r.right - 28));
          ty = Math.max(H + 40, r.top + 2);
          if (spokenFor !== spot.el && Math.hypot(tx - m.x, ty - m.y) < 30) {
            const lines = (spot.el.dataset.say ?? "").split("|").filter(Boolean);
            let st = said.get(spot.el);
            if (!st || st.order.length !== lines.length) said.set(spot.el, (st = { order: shuffle(lines.length), i: 0 }));
            if (lines.length) speak(lines[st.order[st.i++ % lines.length]]);
            spokenFor = spot.el;
          }
        }
      } else if (!spot && now - leftAt > 1500 && !gameRef.current) {
        const h = home();
        tx = h.x;
        ty = h.y;
        spokenFor = null;
      }

      const dx = tx - m.x;
      const dy = ty - m.y;
      const dist = Math.hypot(dx, dy);
      const k = 1 - Math.exp(-dt * 5);
      m.x += dx * k;
      m.y += dy * k;
      if (Math.abs(dx) > 2) m.face = dx > 0 ? 1 : -1;
      m.fly = dist > 3 || ty < innerHeight - 20;
      m.walk = 0;
      m.blink -= dt;
      if (m.blink < -2.5 - Math.random() * 3) m.blink = 0.12;
      if (now > sayUntil && bub.dataset.on !== undefined) delete bub.dataset.on;

      const left = Math.round(m.x - W / 2);
      const top = Math.round(m.y - SPRITE_ROWS * S);
      cv.style.transform = `translate(${left}px, ${top}px)`;
      btn.style.transform = `translate(${left}px, ${top}px)`;
      if (bub.dataset.on !== undefined) {
        const bw = bub.offsetWidth;
        const bx = Math.max(8, Math.min(document.documentElement.clientWidth - bw - 8, m.x - bw / 2));
        bub.style.transform = `translate(${Math.round(bx)}px, ${Math.round(top - bub.offsetHeight - 8)}px)`;
      }
      ctx.clearRect(0, 0, W, H);
      drawMinion(ctx, { ...m, x: W / 2, y: SPRITE_ROWS * S }, S, now, TEAM_SHADES[0]);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("companion-spawn", onSpawn);
      removeEventListener("minion-say", onSay);
      inputs.forEach((ev) => removeEventListener(ev, onInput));
      removeEventListener("pointerover", onOver);
      removeEventListener("pointerdown", onTap);
      removeEventListener("click", onPing, true);
    };
  }, []);

  return (
    <>
      <div className={styles.layer} aria-hidden="true">
        <canvas ref={canvas} className={styles.canvas} style={{ width: W, height: H }} />
        <span ref={bubble} className={styles.bubble} />
      </div>
      <button ref={button} type="button" className={styles.agent} style={{ width: W, height: SPRITE_ROWS * S }} hidden onClick={() => setGame(true)} aria-label={lang === "pt" ? "Jogar last hit com o minion" : "Play last hit with the minion"} />
      {game && <LastHit onClose={close} />}
    </>
  );
}
