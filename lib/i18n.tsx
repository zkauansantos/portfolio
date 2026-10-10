"use client";

import { useSyncExternalStore } from "react";
import { COPY, type Lang } from "./content";
import { unlock } from "./game";

const listeners = new Set<() => void>();

function current(): Lang {
  return document.documentElement.dataset.lang === "pt" ? "pt" : "en";
}

export function setLang(lang: Lang) {
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  try {
    localStorage.setItem("lane:lang", lang);
  } catch {}
  unlock("polyglot");
  listeners.forEach((l) => l());
}

export function useLang(): Lang {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    current,
    () => "en",
  );
}

export function useCopy() {
  return COPY[useLang()];
}
