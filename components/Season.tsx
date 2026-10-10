"use client";

import { useEffect, useState } from "react";
import type { Season as SeasonData } from "@/lib/github";
import { PROFILE } from "@/lib/content";
import { useCopy, useLang } from "@/lib/i18n";
import { say, unlock } from "@/lib/game";
import { BuildZone } from "./BuildZone";
import { Objective } from "./Objective";
import styles from "./Season.module.css";

const LEVELS = ["#151c23", "#1d4f4a", "#2a7f76", "#3bb3a6", "#49d4c4"];
const RIVAL = ["#151c23", "#5a3a17", "#8a5a1f", "#c27f2c", "#f0a03c"];

function Grid({ data, palette, label }: { data: SeasonData; palette: string[]; label: string }) {
  const lang = useLang();
  const offset = new Date(`${data.days[0].date}T00:00:00`).getDay();
  const cols = Math.ceil((data.days.length + offset) / 7);
  return (
    <svg className={styles.grid} viewBox={`0 0 ${cols * 12} ${7 * 12}`} role="img" aria-label={label} data-build="svg" shapeRendering="crispEdges">
      {data.days.map((d, i) => {
        const n = i + offset;
        return (
          <rect key={d.date} x={Math.floor(n / 7) * 12} y={(n % 7) * 12} width={10} height={10} fill={palette[Math.min(4, d.level)]}>
            <title>{lang === "pt" ? `${d.count} em ${d.date}` : `${d.count} on ${d.date}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}

export function Season({ initial }: { initial: SeasonData | null }) {
  const t = useCopy();
  const lang = useLang();
  const [mine, setMine] = useState(initial);
  const [handle, setHandle] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [theirs, setTheirs] = useState<SeasonData | null>(null);
  const num = (n: number) => n.toLocaleString(lang === "pt" ? "pt-BR" : "en-US");

  useEffect(() => {
    if (mine) return;
    fetch(`/api/contributions/${PROFILE.github}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setMine(d))
      .catch(() => {});
  }, [mine]);

  const compare = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = handle.trim().replace(/^@/, "");
    if (!user) return;
    setState("loading");
    try {
      const r = await fetch(`/api/contributions/${encodeURIComponent(user)}`);
      if (!r.ok) throw new Error();
      const d: SeasonData = await r.json();
      setTheirs(d);
      setState("idle");
      unlock("rival");
      if (mine) {
        const win = d.total > mine.total;
        say(lang === "pt" ? (win ? "Você farmou mais. Vou contar pra ele." : "Ele farmou mais. Sem choro.") : win ? "You farmed more. I'm telling him." : "He farmed more. No tears.");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <section id="season" className={`container ${styles.section}`} aria-labelledby="season-title">
      <BuildZone objective="season">
        <Objective id="season" n={4} title={t.graph.title} intro={t.graph.intro} />
      </BuildZone>
      <BuildZone duration={2}>
        <figure className={styles.figure} data-spot data-say={lang === "pt" ? "Cada bloco é um dia.|Verde-água é soul. Muita soul.|Fim de semana também conta." : "Every block is a day.|Teal means souls. Lots of them.|Weekends count too."}>
          <div className={styles.frame}>
            {mine ? <Grid data={mine} palette={LEVELS} label={`${PROFILE.github}: ${mine.total} ${t.graph.total}`} /> : <p className={styles.offline}>{t.graph.offline}</p>}
          </div>
          {mine && (
            <figcaption className={styles.caption} data-build>
              <a href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noopener noreferrer">
                @{PROFILE.github}
              </a>{" "}
              · <span className={styles.total}>{num(mine.total)}</span> {t.graph.total}
            </figcaption>
          )}
        </figure>
      </BuildZone>

      <form className={styles.form} onSubmit={compare}>
        <label htmlFor="season-handle" className={styles.label}>
          {t.graph.label}
        </label>
        <div className={styles.row}>
          <span className={styles.at}>@</span>
          <input
            id="season-handle"
            className={styles.input}
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="github"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="go"
            data-1p-ignore
            data-lpignore="true"
          />
          <button type="submit" className={styles.button} disabled={state === "loading" || !handle.trim()}>
            {state === "loading" ? t.graph.loading : t.graph.button}
          </button>
        </div>
        <p className={styles.status} aria-live="polite">
          {state === "error" && t.graph.error}
        </p>
      </form>

      {theirs && (
        <figure className={styles.figure}>
          <div className={styles.frame}>
            <Grid data={theirs} palette={RIVAL} label={`${theirs.user}: ${theirs.total} ${t.graph.total}`} />
          </div>
          <figcaption className={styles.caption}>
            @{theirs.user} · <span className={styles.rival}>{num(theirs.total)}</span> {t.graph.total}
          </figcaption>
        </figure>
      )}
    </section>
  );
}
