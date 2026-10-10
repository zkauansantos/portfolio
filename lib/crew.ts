// A crew of minions that builds a zone of the page block by block.
// The zone's real DOM stays hidden ([data-build] without [data-built]) until its blocks
// are all placed; then the DOM fades in and the blocks fade out in the same spot.

import { piecesFor, type Piece } from "./pixels";
import { drawMinion, TEAM_SHADES, type MinionPose } from "./sprites";

export const PAD = 140;
const FLIGHT = 0.22;
const FADE = 0.3;

type Target = { el: HTMLElement; pieces: Piece[]; placed: number; done: boolean; fadeAt: number };

type Minion = MinionPose & {
  job: Piece[];
  targets: Target[];
  i: number;
  clock: number;
  every: number;
  delay: number;
  state: "enter" | "work" | "leave" | "gone" | "home";
  hx: number;
  hy: number;
  shade: number;
};

export type CrewOptions = {
  zone: HTMLElement;
  canvas: HTMLCanvasElement;
  /** seconds each minion spends placing its share */
  duration?: number;
  crew?: number;
  /** where minions come from */
  entry?: "base" | "sky";
  /** keep the leader on screen when done, at this point (zone coords); onDone gets its zone coords */
  home?: () => { x: number; y: number } | null;
  onBuilt?: (el: HTMLElement) => void;
  onDone?: (leader: { x: number; y: number } | null) => void;
};

export type CrewHandle = { finish: () => void; cancel: () => void };

export function markBuilt(el: Element) {
  el.setAttribute("data-built", "");
}

function scale() {
  const w = document.documentElement.clientWidth;
  return Math.max(3, Math.min(5, Math.round(w / 300)));
}

export function startCrew(opts: CrewOptions): CrewHandle {
  const { zone, canvas } = opts;
  const ctx = canvas.getContext("2d")!;
  let cancelled = false;
  let finished = false;
  let raf = 0;
  let minions: Minion[] = [];
  let targets: Target[] = [];
  let ready = false;
  let doneCalled = false;
  let vw = 0;
  let zoneLeft = 0;
  let h = 0;

  const els = [...zone.querySelectorAll<HTMLElement>("[data-build]:not([data-built])")];

  const revealAll = () => els.forEach(markBuilt);

  const setup = async () => {
    await document.fonts.ready;
    if (cancelled) return;
    const rect = zone.getBoundingClientRect();
    vw = document.documentElement.clientWidth;
    zoneLeft = rect.left;
    h = rect.height + PAD * 2;
    const dpr = Math.min(2, devicePixelRatio || 1);
    canvas.style.left = `${-rect.left}px`;
    canvas.style.top = `${-PAD}px`;
    canvas.style.width = `${vw}px`;
    canvas.style.height = `${h}px`;
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    targets = (await Promise.all(els.map(async (el) => ({ el, pieces: await piecesFor(el, rect), placed: 0, done: false, fadeAt: 0 })))).filter((t) => {
      if (t.pieces.length) return true;
      markBuilt(t.el);
      return false;
    });
    if (cancelled) return;
    if (finished) return revealAll();

    // sweep each target left to right, column by column, like a printer
    targets.forEach((t) => t.pieces.sort((a, b) => a.x - b.x || a.y - b.y));

    const total = targets.reduce((n, t) => n + t.pieces.length, 0);
    const size = opts.crew ?? Math.max(2, Math.min(5, Math.round(total / 350)));
    const share = total / size;
    const groups: Target[][] = [[]];
    let acc = 0;
    for (const t of targets) {
      if (acc >= share && groups.length < size) {
        groups.push([]);
        acc = 0;
      }
      groups.at(-1)!.push(t);
      acc += t.pieces.length;
    }

    const duration = opts.duration ?? 1.8;
    minions = groups.map((g, i) => {
      const job = g.flatMap((t) => t.pieces);
      const fromLeft = i % 2 === 0;
      const base = opts.entry === "base";
      const x = fromLeft ? -zoneLeft - 40 - i * 24 : vw - zoneLeft + 40 + i * 24;
      const y = base ? rect.height + 40 : -PAD / 2 + Math.random() * 60;
      return {
        x, y, face: fromLeft ? 1 : -1, walk: 0, blink: 0, fly: true,
        job, targets: g, i: 0, clock: 0,
        every: Math.min(0.03, Math.max(0.0015, duration / Math.max(1, job.length))),
        delay: 0.12 * i, state: "enter", hx: 0, hy: 0, shade: i % TEAM_SHADES.length,
      } satisfies Minion;
    });
    ready = true;
  };

  const place = (m: Minion, p: Piece) => {
    p.state = 1;
    p.t = 0;
    p.sx = m.x;
    p.sy = m.y - 4;
  };

  let last = performance.now();
  const tick = (now: number) => {
    if (cancelled) return;
    const dt = Math.min(1 / 30, (now - last) / 1000);
    last = now;
    raf = requestAnimationFrame(tick);
    if (!ready) return;
    const s = scale();

    for (const m of minions) {
      m.blink -= dt;
      if (m.blink < -2.5 - Math.random() * 3) m.blink = 0.12;
      if (m.delay > 0) {
        m.delay -= dt;
        continue;
      }
      if (m.state === "enter" || m.state === "work") {
        const next = m.job[Math.min(m.i, m.job.length - 1)];
        const tx = next ? next.x + next.w / 2 : m.x;
        const ty = next ? next.y - 6 : m.y;
        const k = 1 - Math.exp(-dt * (m.state === "enter" ? 7 : 16));
        const dx = tx - m.x;
        m.x += dx * k;
        m.y += (ty - m.y) * k;
        if (Math.abs(dx) > 1) m.face = dx > 0 ? 1 : -1;
        if (m.state === "enter" && Math.hypot(tx - m.x, ty - m.y) < 60) m.state = "work";
        if (m.state === "work") {
          m.clock += dt;
          while (m.clock >= m.every && m.i < m.job.length) {
            m.clock -= m.every;
            place(m, m.job[m.i++]);
          }
          if (m.i >= m.job.length) {
            const home = m === minions[0] && opts.home ? opts.home() : null;
            if (home) {
              m.state = "home";
              m.hx = home.x;
              m.hy = home.y;
            } else m.state = "leave";
          }
        }
      } else if (m.state === "leave") {
        const side = m.face > 0 ? vw - zoneLeft + 80 : -zoneLeft - 80;
        m.x += (side - m.x) * (1 - Math.exp(-dt * 3));
        m.y -= 120 * dt;
        if (m.x < -zoneLeft - 60 || m.x > vw - zoneLeft + 60) m.state = "gone";
      } else if (m.state === "home") {
        const k = 1 - Math.exp(-dt * 4);
        const dx = m.hx - m.x;
        m.x += dx * k;
        m.y += (m.hy - m.y) * k;
        if (Math.abs(dx) > 1) m.face = dx > 0 ? 1 : -1;
      }
    }

    // advance pieces
    for (const t of targets) {
      let placed = 0;
      for (const p of t.pieces) {
        if (p.state === 1) {
          p.t += dt / FLIGHT;
          if (p.t >= 1) {
            p.state = 2;
            p.t = 0;
          }
        } else if (p.state === 3) {
          p.t += dt / FADE;
          if (p.t >= 1) p.state = 4;
        }
        if (p.state >= 2) placed++;
      }
      t.placed = placed;
      if (!t.done && placed === t.pieces.length) {
        t.done = true;
        t.fadeAt = now + 120;
        markBuilt(t.el);
        opts.onBuilt?.(t.el);
      }
      if (t.done && t.fadeAt && now >= t.fadeAt) {
        t.fadeAt = 0;
        t.pieces.forEach((p) => {
          if (p.state === 2) {
            p.state = 3;
            p.t = 0;
          }
        });
      }
    }

    // draw
    ctx.clearRect(0, 0, vw, h);
    ctx.save();
    ctx.translate(zoneLeft, PAD);
    let fill = "";
    let alpha = 1;
    for (const t of targets) {
      for (const p of t.pieces) {
        if (p.state === 0 || p.state === 4) continue;
        let x = p.x;
        let y = p.y;
        let a = 1;
        if (p.state === 1) {
          const e = 1 - (1 - p.t) * (1 - p.t);
          x = p.sx + (p.x - p.sx) * e;
          y = p.sy + (p.y - p.sy) * e;
        } else if (p.state === 3) a = 1 - p.t;
        if (a !== alpha) ctx.globalAlpha = alpha = a;
        if (p.color !== fill) ctx.fillStyle = fill = p.color;
        ctx.fillRect(x, y, p.w, p.h);
      }
    }
    ctx.globalAlpha = 1;
    for (const m of minions) {
      if (m.state === "gone" || m.delay > 0) continue;
      drawMinion(ctx, { ...m, fly: m.state !== "home" || Math.abs(m.hy - m.y) > 2 }, s, now, TEAM_SHADES[m.shade]);
    }
    ctx.restore();

    const allPlaced = targets.every((t) => t.done && t.pieces.every((p) => p.state === 4));
    const crewOff = minions.every((m) => m.state === "gone" || (m.state === "home" && Math.hypot(m.hx - m.x, m.hy - m.y) < 2));
    if (allPlaced && crewOff && !doneCalled) {
      doneCalled = true;
      const leader = minions.find((m) => m.state === "home");
      cancelAnimationFrame(raf);
      canvas.width = canvas.height = 0;
      opts.onDone?.(leader ? { x: leader.x, y: leader.y } : null);
    }
  };

  setup().catch(() => revealAll());
  raf = requestAnimationFrame(tick);

  return {
    finish() {
      finished = true;
      if (!ready) return revealAll();
      for (const m of minions) {
        while (m.i < m.job.length) {
          const p = m.job[m.i++];
          p.state = 2;
        }
      }
    },
    cancel() {
      cancelled = true;
      cancelAnimationFrame(raf);
      canvas.width = canvas.height = 0;
      revealAll();
    },
  };
}


/** Knocks an element's blocks off the page with a little gravity. Resolves when they are gone. */
export async function shatter(zone: HTMLElement, canvas: HTMLCanvasElement, el: HTMLElement): Promise<void> {
  const rect = zone.getBoundingClientRect();
  const pieces = await piecesFor(el, rect);
  el.removeAttribute("data-built");
  const ctx = canvas.getContext("2d")!;
  const vw = document.documentElement.clientWidth;
  const h = rect.height + PAD * 2;
  const dpr = Math.min(2, devicePixelRatio || 1);
  canvas.style.left = `${-rect.left}px`;
  canvas.style.top = `${-PAD}px`;
  canvas.style.width = `${vw}px`;
  canvas.style.height = `${h}px`;
  canvas.width = Math.round(vw * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const er = el.getBoundingClientRect();
  const cx = er.left - rect.left + er.width / 2;
  const bits = pieces.map((p) => ({ ...p, vx: (p.x - cx) * (1.5 + Math.random() * 2) + (Math.random() - 0.5) * 120, vy: -150 - Math.random() * 350, spin: Math.random() }));
  return new Promise((resolve) => {
    let last = performance.now();
    const start = last;
    const step = (now: number) => {
      const dt = Math.min(1 / 30, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, vw, h);
      ctx.save();
      ctx.translate(rect.left, PAD);
      for (const b of bits) {
        b.vy += 1400 * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
      }
      ctx.restore();
      if (now - start < 1100) requestAnimationFrame(step);
      else {
        canvas.width = canvas.height = 0;
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
}
