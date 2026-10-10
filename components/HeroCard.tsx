"use client";

import { useRef, useState } from "react";
import { PROFILE } from "@/lib/content";
import { useCopy, useLang } from "@/lib/i18n";
import { say, unlock } from "@/lib/game";
import { BuildZone } from "./BuildZone";
import { Objective } from "./Objective";
import styles from "./HeroCard.module.css";

// Years since the first job, May 2022.
const LEVEL = Math.floor((Date.UTC(2026, 9, 1) - Date.UTC(2022, 4, 1)) / (365.25 * 864e5));

export function HeroCard() {
  const t = useCopy();
  const en = useLang() === "en";
  const [jumping, setJumping] = useState(false);
  const pokes = useRef<number[]>([]);

  const poke = () => {
    if (jumping) return;
    const now = performance.now();
    pokes.current = [...pokes.current.filter((p) => now - p < 2000), now];
    if (pokes.current.length < 4) return;
    pokes.current = [];
    setJumping(true);
    unlock("double-under");
    say(en ? "120 skips a minute. Easy." : "120 pulos por minuto. Fácil.");
    setTimeout(() => setJumping(false), 2600);
  };

  const abilities = [
    ["1", ...t.hero.a1],
    ["2", ...t.hero.a2],
    ["3", ...t.hero.a3],
    ["ULT", ...t.hero.ult],
  ];

  return (
    <section id="hero" className={`container ${styles.section}`} aria-labelledby="hero-title">
      <BuildZone objective="hero">
        <Objective id="hero" n={2} title={t.hero.title} />
      </BuildZone>
      <BuildZone duration={2.4}>
        <div className={styles.card} data-build="box">
          <button
            type="button"
            className={styles.portrait}
            data-jump={jumping || undefined}
            onClick={poke}
            aria-label={`${PROFILE.name} pixel portrait`}
            data-spot
            data-say={en ? "He skips rope between deploys.|Poke him. He likes it.|That's the hero. I'm the help." : "Ele pula corda entre um deploy e outro.|Cutuca ele. Ele gosta.|Esse é o herói. Eu sou o ajudante."}
          >
            <img src="/assets/portrait.png" alt="" width={36} height={60} data-build="image" />
            <span className={styles.rope} aria-hidden="true" />
          </button>

          <div className={styles.stats}>
            <div className={styles.top} data-build>
              <span>{t.hero.player}</span>
              <span className={styles.level}>
                {t.hero.lvl} {LEVEL}
              </span>
            </div>
            <div>
              <h3 className={styles.name} data-build>
                {PROFILE.name}
              </h3>
              <p className={styles.role} data-build>
                {t.hero.role}
              </p>
            </div>

            <div className={styles.block}>
              <p className={styles.label} data-build>
                {t.hero.abilities}
              </p>
              <ul className={styles.abilities}>
                {abilities.map(([key, name, desc]) => (
                  <li key={key} className={styles.ability} data-ult={key === "ULT" || undefined}>
                    <span className={styles.key} data-build="box">
                      <span data-build>{key}</span>
                    </span>
                    <span>
                      <span className={styles.abilityName} data-build>
                        {name}
                      </span>
                      <span className={styles.abilityDesc} data-build>
                        {desc}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.block}>
              <p className={styles.label} data-build>
                {t.hero.passives}
              </p>
              <ul className={styles.passives}>
                {t.hero.p.map(([name, desc]) => (
                  <li key={name} data-build>
                    <span className={styles.passiveName}>{name}</span> <span className={styles.passiveDesc}>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </BuildZone>
    </section>
  );
}
