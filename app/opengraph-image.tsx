import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { MINION_BODY, TEAM_SHADES } from "@/lib/sprites";

export const alt = "A pixel minion building the name Kauan Santos on a lane.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const font = await readFile(join(process.cwd(), "node_modules/@fontsource/silkscreen/files/silkscreen-latin-400-normal.woff"));
  const rows = [...MINION_BODY, "..d...d.."];
  const px = 14;
  const palette = TEAM_SHADES[0];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 96px", background: "#0a0d10", color: "#e9ecef", fontFamily: "Silkscreen", position: "relative" }}>
        <div style={{ fontSize: 24, color: "#7d8893", letterSpacing: 2 }}>OBJECTIVE 00 · THE LANE</div>
        <div style={{ fontSize: 112, lineHeight: 1, marginTop: 24 }}>KAUAN SANTOS</div>
        <div style={{ fontSize: 32, color: "#49d4c4", marginTop: 32 }}>FRONT-END DEVELOPER. FULL OF SECRETS.</div>
        <div style={{ position: "absolute", right: 96, bottom: 72, display: "flex", flexDirection: "column" }}>
          {rows.map((row, y) => (
            <div key={y} style={{ display: "flex" }}>
              {[...row].map((ch, x) => (
                <div key={x} style={{ width: px, height: px, background: ch === "." ? "transparent" : palette[ch] }} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 24, display: "flex", background: "repeating-linear-gradient(90deg, #151c23 0 24px, transparent 24px 48px)" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Silkscreen", data: font, weight: 400, style: "normal" }] },
  );
}
