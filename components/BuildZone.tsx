"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { markBuilt, startCrew, type CrewHandle } from "@/lib/crew";
import { capture } from "@/lib/game";
import styles from "./BuildZone.module.css";

type Props = {
  children: ReactNode;
  className?: string;
  /** objective captured when the zone is built */
  objective?: string;
  duration?: number;
  crew?: number;
};

export function canBuild() {
  return document.documentElement.classList.contains("js-build");
}

/** Wraps a chunk of the page; a crew builds its [data-build] children when it scrolls into view. */
export function BuildZone({ children, className, objective, duration, crew }: Props) {
  const zone = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = zone.current!;
    const done = () => objective && capture(objective);
    if (!canBuild()) {
      el.querySelectorAll("[data-build]").forEach(markBuilt);
      done();
      return;
    }
    let handle: CrewHandle | null = null;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || handle) return;
        io.disconnect();
        handle = startCrew({ zone: el, canvas: canvas.current!, duration, crew, onDone: done });
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    const onResize = () => handle?.finish();
    addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      removeEventListener("resize", onResize);
      handle?.cancel();
    };
  }, [objective, duration, crew]);

  return (
    <div ref={zone} className={`${styles.zone} ${className ?? ""}`}>
      {children}
      <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
