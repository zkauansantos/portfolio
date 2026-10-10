"use client";

import { OBJECTIVE } from "@/lib/sprites";
import { useCaptured } from "@/lib/game";
import { useCopy } from "@/lib/i18n";
import { Sprite } from "./Sprite";
import styles from "./Objective.module.css";

type Props = { id: string; n: number; title: string; intro?: string };

/** Section header: a lane objective that turns gold once the crew captures it. */
export function Objective({ id, n, title, intro }: Props) {
  const t = useCopy();
  const captured = useCaptured().includes(id);
  return (
    <header className={styles.head}>
      <div className={styles.kicker}>
        <Sprite rows={OBJECTIVE.rows} palette={captured ? OBJECTIVE.captured : OBJECTIVE.palette} size={4} />
        <span data-build data-captured={captured || undefined}>
          {t.objective} {String(n).padStart(2, "0")}
        </span>
      </div>
      <h2 id={`${id}-title`} className={styles.title} data-build>
        {title}
      </h2>
      {intro && (
        <p className={styles.intro} data-build>
          {intro}
        </p>
      )}
    </header>
  );
}
