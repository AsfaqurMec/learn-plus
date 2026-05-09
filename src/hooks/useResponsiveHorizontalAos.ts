"use client";

import { useEffect, useState } from "react";

/** Matches Tailwind `md` — horizontal slide animations overflow on small viewports. */
const MD_MIN_WIDTH_PX = 768;

export type HorizontalAosAnimation = "fade-left" | "fade-right" | "zoom-in-left";

/**
 * Uses `fade-up` below `md`; full horizontal / zoom animation at `md` and up.
 * SSR-safe first paint (`fade-up`), then updates after mount to avoid layout scrollbar.
 */
export function useResponsiveHorizontalAos(
  desktop: HorizontalAosAnimation,
): HorizontalAosAnimation | "fade-up" {
  const [animation, setAnimation] = useState<HorizontalAosAnimation | "fade-up">(
    "fade-up",
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MD_MIN_WIDTH_PX}px)`);
    const apply = () => {
      setAnimation(mq.matches ? desktop : "fade-up");
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [desktop]);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    void import("aos").then(({ default: AOS }) => {
      if (cancelled) return;
      raf = requestAnimationFrame(() => {
        AOS.refresh();
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [animation]);

  return animation;
}
