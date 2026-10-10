"use client";

import { ITEMS } from "@/lib/content";
import { ITEM_ICONS } from "@/lib/sprites";
import { useCopy, useLang } from "@/lib/i18n";
import { BuildZone } from "./BuildZone";
import { Objective } from "./Objective";
import { Sprite } from "./Sprite";
import styles from "./Shop.module.css";

const TIER_COLOR = { 1: "#8a94a0", 2: "#49d4c4", 3: "#f0a03c", 4: "#c58cff" } as const;

export function Shop() {
  const t = useCopy();
  const lang = useLang();
  return (
    <section id="shop" className={`container ${styles.shop}`} aria-labelledby="shop-title">
      <BuildZone objective="shop">
        <Objective id="shop" n={1} title={t.shop.title} intro={t.shop.intro} />
      </BuildZone>
      <BuildZone className={styles.grid} duration={2.2}>
        {ITEMS.map((item) => {
          const icon = ITEM_ICONS[item.icon];
          return (
            <article
              key={item.id}
              className={styles.card}
              style={{ "--tier": TIER_COLOR[item.tier] } as React.CSSProperties}
              data-build="box"
              data-spot
              data-say={item.say[lang]}
            >
              <div className={styles.top}>
                <div className={styles.icon}>
                  <Sprite rows={icon.rows} palette={icon.palette} size={5} />
                </div>
                <span className={styles.tier} data-build>
                  {t.shop.tier} {item.tier}
                </span>
              </div>
              <h3 className={styles.name} data-build>
                {item.name}
              </h3>
              <p className={styles.line} data-build>
                {item.line[lang]}
              </p>
              <p className={styles.stack} data-build>
                {item.stack.join(" · ")}
              </p>
              <div className={styles.foot}>
                <span className={styles.cost} data-build>
                  ◆ {item.cost.toLocaleString(lang === "pt" ? "pt-BR" : "en-US")} {t.shop.souls}
                  {item.status && <span className={styles.status}> · {item.status[lang]}</span>}
                </span>
                <span className={styles.links}>
                  {item.live && (
                    <a href={item.live} target="_blank" rel="noopener noreferrer" className={styles.live} data-build>
                      {t.shop.live}
                      <span className="sr-only"> {item.name} (opens in a new tab)</span>
                    </a>
                  )}
                  {item.repos.map((r) => (
                    <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" data-build>
                      {r.name}
                      <span className="sr-only"> {item.name} on GitHub (opens in a new tab)</span>
                    </a>
                  ))}
                </span>
              </div>
            </article>
          );
        })}
      </BuildZone>
    </section>
  );
}
