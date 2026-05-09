"use client";

import { useEffect } from "react";

export default function AosProvider() {
  useEffect(() => {
    let cancelled = false;

    void Promise.all([import("aos"), import("aos/dist/aos.css")]).then(
      ([{ default: AOS }]) => {
        if (cancelled) return;

        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        AOS.init({
          duration: prefersReducedMotion ? 0 : 850,
          easing: "ease-out-cubic",
          once: true,
          offset: 70,
          mirror: false,
          anchorPlacement: "top-bottom",
        });
        AOS.refresh();
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
