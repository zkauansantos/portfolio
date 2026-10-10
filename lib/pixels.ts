// Turns real DOM elements into lists of coloured blocks ("pieces") that minions can place.
// Coordinates are relative to an origin rect (the section the crew works in).

export type Piece = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  /** 0 waiting, 1 flying, 2 placed, 3 fading, 4 gone */
  state: number;
  t: number;
  sx: number;
  sy: number;
};

export const GRID = 8;

export function makePiece(x: number, y: number, w: number, h: number, color: string): Piece {
  return { x, y, w, h, color, state: 0, t: 0, sx: 0, sy: 0 };
}

const scratch = typeof document !== "undefined" ? document.createElement("canvas") : null;
const sctx = scratch?.getContext("2d", { willReadFrequently: true }) ?? null;

type Run = { text: string; left: number; top: number; height: number; color: string };

/** Splits an element's text into visual line runs, keeping each run's colour. */
function textRuns(el: HTMLElement): Run[] {
  const runs: Run[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    const parent = node.parentElement;
    if (!parent || parent.closest("[data-build-skip], .sr-only")) continue;
    const style = getComputedStyle(parent);
    if (style.visibility === "hidden" || style.display === "none") continue;
    const color = style.color;
    const str = node.data;
    // characters cut off by an overflow: hidden parent (ellipsis) are not drawn
    const clip = style.overflow !== "visible" ? parent.getBoundingClientRect().right + 0.5 : Infinity;
    for (let i = 0; i < str.length; i++) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const r = range.getClientRects()[0];
      if (!r || r.width === 0 || r.right > clip) continue;
      const last = runs.at(-1);
      if (last && Math.abs(last.top - r.top) < 2 && last.color === color) last.text += str[i];
      else runs.push({ text: str[i], left: r.left, top: r.top, height: r.height, color });
    }
  }
  return runs.filter((r) => r.text.trim());
}

/**
 * Rasterises text with the element's own font and keeps one block per pixel cell.
 * For the pixel font the cell is exactly one of the font's pixels, so the blocks
 * line up with the real glyphs when the DOM text fades in.
 */
export function textPieces(el: HTMLElement, origin: DOMRect, coarse = 1): Piece[] {
  if (!sctx || !scratch) return [];
  const style = getComputedStyle(el);
  const size = parseFloat(style.fontSize);
  const pixelFont = style.fontFamily.toLowerCase().includes("silkscreen");
  // Silkscreen is drawn on an 8-unit em grid, so size / 8 is one of the font's pixels.
  // Long text merges font pixels (coarse) so a paragraph stays under ~1800 blocks.
  const base = pixelFont ? size / 8 : Math.max(3, Math.round(size / 6));
  const cell = base * coarse;
  const out: Piece[] = [];
  for (const run of textRuns(el)) {
    sctx.font = `${style.fontWeight} ${size}px ${style.fontFamily}`;
    sctx.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
    const m = sctx.measureText(run.text);
    const ascent = Math.ceil(m.fontBoundingBoxAscent);
    const w = Math.ceil(m.width) + 2;
    const h = ascent + Math.ceil(m.fontBoundingBoxDescent);
    scratch.width = w;
    scratch.height = h;
    sctx.font = `${style.fontWeight} ${size}px ${style.fontFamily}`;
    sctx.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
    sctx.textBaseline = "alphabetic";
    sctx.fillStyle = "#000";
    sctx.fillText(run.text, 0, ascent);
    const data = sctx.getImageData(0, 0, w, h).data;
    // centre the rasterised line box inside the DOM line box
    const offY = run.top - origin.top + (run.height - h) / 2;
    const offX = run.left - origin.left;
    for (let x = 0; x < w; x += cell) {
      for (let y = 0; y < h; y += cell) {
        const px = Math.min(w - 1, Math.floor(x + cell / 2));
        const py = Math.min(h - 1, Math.floor(y + cell / 2));
        if (data[(py * w + px) * 4 + 3] > 110) {
          out.push(makePiece(offX + x, offY + y, cell + 0.4, cell + 0.4, run.color));
        }
      }
    }
  }
  if (out.length > 1800 && coarse < 4) return textPieces(el, origin, coarse * 2);
  return out;
}

/** Averages an image into blocks. Small pixel-art images keep one block per source pixel. */
export async function imagePieces(img: HTMLImageElement, origin: DOMRect): Promise<Piece[]> {
  await img.decode().catch(() => {});
  if (!img.naturalWidth || !sctx || !scratch) return [];
  const r = img.getBoundingClientRect();
  const sw = img.naturalWidth <= 96 ? img.naturalWidth : Math.max(8, Math.round(r.width / GRID));
  const sh = Math.max(1, Math.round((sw * img.naturalHeight) / img.naturalWidth));
  scratch.width = sw;
  scratch.height = sh;
  sctx.imageSmoothingEnabled = sw !== img.naturalWidth;
  sctx.clearRect(0, 0, sw, sh);
  sctx.drawImage(img, 0, 0, sw, sh);
  const data = sctx.getImageData(0, 0, sw, sh).data;
  const cw = r.width / sw;
  const ch = r.height / sh;
  const out: Piece[] = [];
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const i = (y * sw + x) * 4;
      if (data[i + 3] < 128) continue;
      out.push(makePiece(r.left - origin.left + x * cw, r.top - origin.top + y * ch, cw + 0.5, ch + 0.5, `rgb(${data[i]} ${data[i + 1]} ${data[i + 2]})`));
    }
  }
  return out;
}

function visible(c: string) {
  return c && c !== "transparent" && !/rgba?\([^)]*,\s*0\)$/.test(c) && !c.endsWith(" / 0)");
}

/**
 * A box becomes its border ring in 8px cells plus its background in tiles
 * (32px tiles on big cards, so a card is a few hundred blocks, not thousands).
 */
export function boxPieces(el: HTMLElement, origin: DOMRect): Piece[] {
  const r = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const bg = visible(style.backgroundColor) ? style.backgroundColor : "";
  const border = visible(style.borderTopColor) && parseFloat(style.borderTopWidth) > 0 ? style.borderTopColor : "";
  const ox = r.left - origin.left;
  const oy = r.top - origin.top;
  const out: Piece[] = [];
  const grid = (cell: number, keep: (x: number, y: number, cols: number, rows: number) => string) => {
    const cols = Math.max(1, Math.round(r.width / cell));
    const rows = Math.max(1, Math.round(r.height / cell));
    const cw = r.width / cols;
    const ch = r.height / rows;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const color = keep(x, y, cols, rows);
        if (color) out.push(makePiece(ox + x * cw, oy + y * ch, cw + 0.5, ch + 0.5, color));
      }
    }
  };
  const small = r.width * r.height < 40_000;
  if (bg) grid(small ? GRID : 32, () => bg);
  if (border) grid(GRID, (x, y, cols, rows) => (x === 0 || y === 0 || x === cols - 1 || y === rows - 1 ? border : ""));
  return out;
}

/** Canvases (graphs) are read back pixel-by-pixel in 8px cells. */
export function canvasPieces(cv: HTMLCanvasElement, origin: DOMRect): Piece[] {
  const r = cv.getBoundingClientRect();
  const ctx = cv.getContext("2d");
  if (!ctx || !cv.width) return [];
  const step = Math.max(1, Math.round((GRID * cv.width) / r.width));
  const data = ctx.getImageData(0, 0, cv.width, cv.height).data;
  const sx = r.width / cv.width;
  const sy = r.height / cv.height;
  const out: Piece[] = [];
  for (let y = 0; y < cv.height; y += step) {
    for (let x = 0; x < cv.width; x += step) {
      const i = ((y + (step >> 1)) * cv.width + x + (step >> 1)) * 4;
      if (data[i + 3] < 100) continue;
      out.push(makePiece(r.left - origin.left + x * sx, r.top - origin.top + y * sy, step * sx + 0.5, step * sy + 0.5, `rgb(${data[i]} ${data[i + 1]} ${data[i + 2]})`));
    }
  }
  return out;
}

/** Pixel-art SVGs: one block per <rect>. */
export function svgPieces(svg: Element, origin: DOMRect): Piece[] {
  return [...svg.querySelectorAll("rect")].map((r) => {
    const b = r.getBoundingClientRect();
    return makePiece(b.left - origin.left, b.top - origin.top, b.width + 0.4, b.height + 0.4, r.getAttribute("fill") || "#fff");
  });
}

export async function piecesFor(el: HTMLElement, origin: DOMRect): Promise<Piece[]> {
  const mode = el.dataset.build || (el instanceof HTMLImageElement ? "image" : "text");
  if (mode === "svg") return svgPieces(el, origin);
  if (mode === "image" && el instanceof HTMLImageElement) return imagePieces(el, origin);
  if (mode === "canvas" && el instanceof HTMLCanvasElement) return canvasPieces(el, origin);
  if (mode === "box") return boxPieces(el, origin);
  return textPieces(el, origin);
}
