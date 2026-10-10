"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/content";
import { SECRETS, shiftToast, useSecrets, useSouls, useToast } from "@/lib/game";
import { useCopy, useLang } from "@/lib/i18n";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useCopy();
  const lang = useLang();
  const found = useSecrets();
  const souls = useSouls();
  const [open, setOpen] = useState(false);

  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.row}>
        <p className={styles.sign}>
          {t.footer} © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <button type="button" className={styles.toggle} aria-expanded={open} aria-controls="secrets" onClick={() => setOpen((o) => !o)}>
          {t.secrets}{" "}
          <span className={styles.count}>
            {found.length}/{SECRETS.length}
          </span>
          <span className={styles.souls}>
            {" "}
            · ◆ {souls.toLocaleString()}
          </span>
        </button>
      </div>
      {open && (
        <ul id="secrets" className={styles.list}>
          {SECRETS.map((s) => {
            const got = found.includes(s.id);
            return (
              <li key={s.id} className={styles.secret} data-found={got || undefined}>
                <span className={styles.name}>{got ? s.name[lang] : "???"}</span>
                <span className={styles.hint}>{got ? s.found[lang] : s.hint[lang]}</span>
              </li>
            );
          })}
        </ul>
      )}
    </footer>
  );
}

export function Toast() {
  const id = useToast();
  const lang = useLang();
  const t = useCopy();
  const secret = SECRETS.find((s) => s.id === id);
  useEffect(() => {
    if (!id) return;
    const timer = setTimeout(shiftToast, 2800);
    return () => clearTimeout(timer);
  }, [id]);
  return (
    <div className={styles.toastWrap} role="status" aria-live="polite">
      {secret && (
        <p key={secret.id} className={styles.toast}>
          <span className={styles.toastKicker}>
            {t.secrets} +250 {t.souls}
          </span>
          <span className={styles.toastName}>{secret.name[lang]}</span>
          <span className={styles.toastText}>{secret.found[lang]}</span>
        </p>
      )}
    </div>
  );
}
