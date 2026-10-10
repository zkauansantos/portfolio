"use client";

import { useEffect, useRef, useState } from "react";
import { drawMinion, ENEMY_SHADE, TEAM_SHADES } from "@/lib/sprites";
import { unlock } from "@/lib/game";
import { useLang } from "@/lib/i18n";
import styles from "./LastHit.module.css";

const W = 320;
const H = 160;
const MY_DMG = 18;
const COOLDOWN = 650;

const LINES = {
  en: {
    hit: ["Clean.", "That's a last hit.", "Souls secured.", "You've done this before."],
    miss: ["The creeps took it.", "Too slow.", "That one's on you.", "Denied by your own team."],
    early: ["Not yet…", "Patience.", "Wait for it."],
    intro: "Hit when its health is below your damage.",
  },
  pt: {
    hit: ["Limpo.", "Isso é last hit.", "Souls garantidas.", "Você já fez isso antes."],
    miss: ["Os creeps pegaram.", "Lento demais.", "Essa foi sua.", "Negado pelo próprio time."],
    early: ["Ainda não…", "Paciência.", "Espera."],
    intro: "Bata quando a vida estiver abaixo do seu dano.",
  },
};

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

export function LastHit({ onClose }: { onClose: () => void }) {
  const lang = useLang();
  const L = LINES[lang];
  const canvas = useRef<HTMLCanvasElement>(null);
  const hitBtn = useRef<HTMLButtonElement>(null);
  const [score, setScore] = useState({ you: 0, creeps: 0, streak: 0 });
  const [msg, setMsg] = useState(L.intro);
  const game = useRef({ hp: 100, dead: 0, nextCreep: 0, cool: 0, swing: 0, flash: 0, misses: 0, streak: 0, killer: "" as "" | "you" | "creeps" });

  useEffect(() => {
    hitBtn.current?.focus();
    const ctx = canvas.current!.getContext("2d")!;
    const dpr = Math.min(2, devicePixelRatio || 1);
    canvas.current!.width = W * dpr;
    canvas.current!.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = game.current;
    g.nextCreep = performance.now() + 900;
    let raf = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (g.dead) {
        if (now - g.dead > 900) {
          g.dead = 0;
          g.hp = 100;
          g.killer = "";
          g.nextCreep = now + 700;
        }
      } else if (now >= g.nextCreep) {
        g.hp -= 6 + Math.random() * 9;
        g.swing = now;
        g.nextCreep = now + 550 + Math.random() * 550;
        if (g.hp <= 0) {
          g.hp = 0;
          g.dead = now;
          g.killer = "creeps";
          g.streak = 0;
          g.misses++;
          if (g.misses >= 3) unlock("feeder");
          setScore((s) => ({ ...s, creeps: s.creeps + 1, streak: 0 }));
          setMsg(pick(LINES[document.documentElement.dataset.lang === "pt" ? "pt" : "en"].miss));
        }
      }

      ctx.clearRect(0, 0, W, H);
      // lane floor
      ctx.fillStyle = "#151c23";
      for (let x = 0; x < W; x += 16) ctx.fillRect(x, H - 16, 8, 8);
      // creeps
      const lunge = now - g.swing < 120 ? 6 : 0;
      drawMinion(ctx, { x: 60 + lunge, y: H - 20, face: 1, walk: 0, blink: 0, fly: false }, 4, now, TEAM_SHADES[1]);
      drawMinion(ctx, { x: 100 + lunge, y: H - 20, face: 1, walk: 0, blink: 0, fly: false }, 4, now, TEAM_SHADES[2]);
      // enemy
      if (!g.dead || Math.floor(now / 90) % 2) {
        const fl = now - g.flash < 100;
        drawMinion(ctx, { x: 228, y: H - 20, face: -1, walk: 0, blink: fl ? 1 : 0, fly: false }, 6, now, fl ? { ...ENEMY_SHADE, a: "#ffffff" } : ENEMY_SHADE);
      }
      // health bar
      const bw = 80;
      ctx.fillStyle = "#0a0d10";
      ctx.fillRect(188, 40, bw, 10);
      ctx.fillStyle = g.hp <= MY_DMG ? "#ffd27a" : "#e5534b";
      ctx.fillRect(190, 42, Math.max(0, ((bw - 4) * g.hp) / 100), 6);
      // your damage marker
      ctx.fillStyle = "#49d4c4";
      ctx.fillRect(190 + ((bw - 4) * MY_DMG) / 100, 38, 2, 14);
      if (g.killer === "you") {
        ctx.fillStyle = "#ffd27a";
        ctx.font = "16px Silkscreen, monospace";
        ctx.fillText("+50", 214, 30 - (now - g.dead) / 30);
      }
    };
    raf = requestAnimationFrame(loop);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const hit = () => {
    const g = game.current;
    const now = performance.now();
    if (g.dead || now < g.cool) return;
    g.cool = now + COOLDOWN;
    g.flash = now;
    if (g.hp <= MY_DMG) {
      g.hp = 0;
      g.dead = now;
      g.killer = "you";
      g.misses = 0;
      g.streak++;
      unlock("last-hit");
      if (g.streak >= 5) unlock("farmer");
      setScore((s) => ({ ...s, you: s.you + 1, streak: g.streak }));
      setMsg(pick(L.hit));
    } else {
      g.hp -= MY_DMG;
      setMsg(pick(L.early));
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.game} role="dialog" aria-modal="true" aria-labelledby="lasthit-title" onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <h2 id="lasthit-title" className={styles.title}>
            Last hit
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label={lang === "pt" ? "Fechar" : "Close"}>
            ×
          </button>
        </div>
        <p className={styles.score}>
          <span className={styles.you}>
            {lang === "pt" ? "você" : "you"} {score.you}
          </span>{" "}
          · <span className={styles.creeps}>creeps {score.creeps}</span> · {lang === "pt" ? "sequência" : "streak"} {score.streak}
        </p>
        <canvas ref={canvas} className={styles.canvas} style={{ width: W, height: H }} />
        <p className={styles.msg} aria-live="polite">
          {msg}
        </p>
        <button ref={hitBtn} type="button" className={styles.hit} onClick={hit}>
          {lang === "pt" ? "Bater" : "Hit"} <kbd>Enter</kbd>
        </button>
      </div>
    </div>
  );
}
