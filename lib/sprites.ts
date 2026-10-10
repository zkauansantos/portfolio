// Pixel sprites drawn straight onto a 2D canvas. One string per row, one char per pixel.

export type Palette = Record<string, string>;

export const MINION_BODY = [
  "....t....",
  "..aaaaa..",
  ".aaaaaaa.",
  ".avkvkva.",
  ".aaaaaaa.",
  "..ddddd..",
];

const LEGS = {
  fly: "..f...f..",
  stepA: "..d...d..",
  stepB: ".d.....d.",
  stand: "..d...d..",
};

export const SPRITE_COLS = 9;
export const SPRITE_ROWS = 7;

export const TEAM_SHADES: Palette[] = [
  { a: "#f0a03c", d: "#b8721f", v: "#49d4c4", k: "#0a0d10", t: "#49d4c4", f: "#b8721f" },
  { a: "#f4b25c", d: "#c4802c", v: "#49d4c4", k: "#0a0d10", t: "#7ee6da", f: "#c4802c" },
  { a: "#e3912e", d: "#a8661a", v: "#49d4c4", k: "#0a0d10", t: "#49d4c4", f: "#a8661a" },
  { a: "#f7c27a", d: "#cc8e3e", v: "#49d4c4", k: "#0a0d10", t: "#7ee6da", f: "#cc8e3e" },
];

export const ENEMY_SHADE: Palette = { a: "#e5534b", d: "#a8322c", v: "#ffd27a", k: "#0a0d10", t: "#ffd27a", f: "#a8322c" };

export type MinionPose = {
  x: number; // centre
  y: number; // feet
  face: 1 | -1;
  walk: number;
  blink: number;
  fly: boolean;
};

/** Draws a minion with its feet at (x, y). `s` is the size of one sprite pixel. */
export function drawMinion(ctx: CanvasRenderingContext2D, m: MinionPose, s: number, time: number, p: Palette = TEAM_SHADES[0]) {
  const left = Math.round(m.x - (SPRITE_COLS * s) / 2);
  const top = Math.round(m.y - SPRITE_ROWS * s);
  const legs = m.fly ? LEGS.fly : m.walk === 0 ? LEGS.stand : Math.floor(m.walk) % 2 ? LEGS.stepA : LEGS.stepB;
  const rows = [...MINION_BODY, legs];
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (ch === ".") continue;
      const col = m.face < 0 ? SPRITE_COLS - 1 - c : c;
      ctx.fillStyle = ch === "k" && m.blink > 0 ? p.v : p[ch];
      ctx.fillRect(left + col * s, top + r * s, s, s);
    }
  }
  if (m.fly) {
    // thruster flame, flickers every 80ms
    const on = Math.floor(time / 80) % 2;
    ctx.fillStyle = "#49d4c4";
    ctx.globalAlpha = 0.85;
    const fy = top + SPRITE_ROWS * s;
    ctx.fillRect(left + 2 * s, fy, s, s * (on ? 1 : 0.5));
    ctx.fillRect(left + 6 * s, fy, s, s * (on ? 0.5 : 1));
    ctx.globalAlpha = 1;
  }
}

/** Generic sprite painter for static icons. */
export function drawSprite(ctx: CanvasRenderingContext2D, rows: string[], palette: Palette, x: number, y: number, s: number) {
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      const ch = rows[r][c];
      if (ch === "." || !palette[ch]) continue;
      ctx.fillStyle = palette[ch];
      ctx.fillRect(x + c * s, y + r * s, s, s);
    }
  }
}

// 10x10 item icons for the shop. a = main, b = secondary, c = highlight, d = shadow.
export const ITEM_ICONS: Record<string, { rows: string[]; palette: Palette }> = {
  tray: {
    rows: [
      "..........",
      "....cc....",
      "...aaaa...",
      "..aaaaaa..",
      ".aaaaacaa.",
      ".aaaaaaaa.",
      "bbbbbbbbbb",
      ".dddddddd.",
      "..........",
      "..........",
    ],
    palette: { a: "#cfd6dd", b: "#f0a03c", c: "#ffffff", d: "#8a94a0" },
  },
  cart: {
    rows: [
      "bb........",
      ".b........",
      ".baaaaaaa.",
      ".baaaaaaa.",
      ".bacacaca.",
      ".baaaaaa..",
      ".bbbbbbb..",
      "..........",
      "..d...d...",
      "..........",
    ],
    palette: { a: "#49d4c4", b: "#cfd6dd", c: "#2a9d92", d: "#f0a03c" },
  },
  book: {
    rows: [
      "..........",
      ".bbbbbbb..",
      ".baaaaaab.",
      ".bacccaab.",
      ".baaaaaab.",
      ".bacaacab.",
      ".baaaaaab.",
      ".bbbbbbbb.",
      "..dddddd..",
      "..........",
    ],
    palette: { a: "#f0a03c", b: "#b8721f", c: "#0a0d10", d: "#6b4a1c" },
  },
  dex: {
    rows: [
      "..........",
      ".aaaaaaaa.",
      ".abbbbbba.",
      ".abccccba.",
      ".abccccba.",
      ".abbbbbba.",
      ".aaaaaaaa.",
      ".aadaadaa.",
      ".aaaaaaaa.",
      "..........",
    ],
    palette: { a: "#e5534b", b: "#0a0d10", c: "#49d4c4", d: "#ffd27a" },
  },
  map: {
    rows: [
      "..........",
      ".aabbaacc.",
      ".abbbacca.",
      ".aabaacca.",
      ".abaaaaca.",
      ".abbaacaa.",
      ".aabdacca.",
      ".aaaaaaaa.",
      "..........",
      "..........",
    ],
    palette: { a: "#2c3a2f", b: "#5ce483", c: "#49d4c4", d: "#ffd27a" },
  },
  tower: {
    rows: [
      ".a.a..a.a.",
      ".aaaaaaaa.",
      "..abbbba..",
      "..abccba..",
      "..abbbba..",
      "..abbbba..",
      "..abccba..",
      ".aaaaaaaa.",
      "aaaaaaaaaa",
      "..........",
    ],
    palette: { a: "#8a94a0", b: "#cfd6dd", c: "#49d4c4" },
  },
};

// Section objective markers.
export const OBJECTIVE = {
  rows: [
    "...cc...",
    "..cccc..",
    ".aaaaaa.",
    ".abbbba.",
    ".abccba.",
    ".abbbba.",
    "aaaaaaaa",
    "aaaaaaaa",
  ],
  palette: { a: "#5b6672", b: "#2a323b", c: "#49d4c4" },
  captured: { a: "#f0a03c", b: "#6b4a1c", c: "#ffd27a" },
};
