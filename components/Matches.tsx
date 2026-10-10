"use client";

import { useState } from "react";
import { MATCHES, type Match } from "@/lib/content";
import { useCopy, useLang } from "@/lib/i18n";
import { BuildZone } from "./BuildZone";
import { Objective } from "./Objective";
import styles from "./Matches.module.css";

const NOW = new Date();

function parse(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1);
}

function months(m: Match) {
  const a = parse(m.start);
  const b = m.end ? parse(m.end) : NOW;
  return Math.max(1, (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth() + 1);
}

export function Matches() {
  const t = useCopy();
  const lang = useLang();
  const [open, setOpen] = useState<string | null>(null);
  const fmt = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", { month: "short", year: "numeric" });
  const span = (n: number) => {
    const y = Math.floor(n / 12);
    const mo = n % 12;
    const ys = lang === "pt" ? "a" : "y";
    return [y ? `${y}${ys}` : "", mo ? `${mo}m` : ""].filter(Boolean).join(" ");
  };

  return (
    <section id="matches" className={`container ${styles.section}`} aria-labelledby="matches-title">
      <BuildZone objective="matches">
        <Objective id="matches" n={3} title={t.matches.title} intro={t.matches.intro} />
      </BuildZone>
      <BuildZone duration={2.2}>
        <ol className={styles.list}>
          {MATCHES.map((m) => {
            const live = !m.end;
            const isOpen = open === m.company;
            return (
              <li key={m.company} className={styles.row} data-build="box" data-live={live || undefined}>
                <span className={styles.result} data-build>
                  {live ? t.matches.now : t.matches.win}
                </span>
                <div className={styles.main}>
                  <h3 className={styles.company} data-build>
                    {m.company}
                  </h3>
                  <p className={styles.role} data-build>
                    {m.role[lang]}
                  </p>
                </div>
                <p className={styles.when} data-build>
                  {fmt.format(parse(m.start))} – {m.end ? fmt.format(parse(m.end)) : t.matches.present}
                  <span className={styles.len}> · {span(months(m))}</span>
                </p>
                <p className={styles.build} data-build>
                  <span className={styles.buildLabel}>{t.matches.build}:</span> {m.build.join(" · ")}
                </p>
                <button type="button" className={styles.toggle} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : m.company)} data-build>
                  {isOpen ? t.matches.less : t.matches.more} {isOpen ? "−" : "+"}
                </button>
                {isOpen && (
                  <ul className={styles.notes}>
                    {m.notes[lang].map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      </BuildZone>
    </section>
  );
}
