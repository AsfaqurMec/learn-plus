"use client";

import { type RefObject, useEffect, useState } from "react";

export type TimelineRocketMotion = {
  /** Distance from first dot center to last dot center (px). */
  lineTop: number;
  lineHeight: number;
  /** Extra translate along the segment (centers rocket on path). */
  rocketAlongPx: number;
  rotate: number;
};

/** Nose toward bottom of viewport at progress 0 (🚀 is font-dependent; tweak if needed). */
const ROCKET_ROTATE_DOWN_DEG = 135;
/** Nose toward top at progress 1 — one full turn from down → up over the scroll path. */
const ROCKET_ROTATE_UP_DEG = -45;

const initial: TimelineRocketMotion = {
  lineTop: 0,
  lineHeight: 0,
  rocketAlongPx: 0,
  rotate: ROCKET_ROTATE_DOWN_DEG,
};

/**
 * Vertical line from first dot center → last dot center; rocket moves along it and
 * rotates once from nose-down to nose-up across the scroll. Respects reduced motion.
 */
export function useTimelineRocketMotion(
  trackRef: RefObject<HTMLElement | null>,
  firstDotRef: RefObject<HTMLElement | null>,
  lastDotRef: RefObject<HTMLElement | null>
): TimelineRocketMotion {
  const [motion, setMotion] = useState<TimelineRocketMotion>(initial);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      // Dots use `md:block`; when display:none, rects are invalid — only measure desktop.
      if (!window.matchMedia("(min-width: 768px)").matches) {
        setMotion(initial);
        return;
      }

      const startEl = firstDotRef.current;
      const endEl = lastDotRef.current;
      if (!startEl || !endEl) {
        setMotion(initial);
        return;
      }

      const tr = track.getBoundingClientRect();
      const sr = startEl.getBoundingClientRect();
      const er = endEl.getBoundingClientRect();

      const firstCenter = sr.top + sr.height / 2 - tr.top;
      const lastCenter = er.top + er.height / 2 - tr.top;
      const lineHeight = Math.max(0, lastCenter - firstCenter);

      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      // Map progress to the segment between dot centers: 0 when viewport center
      // reaches the first dot, 1 when it reaches the last (rocket travels that span only).
      const firstDocY = sr.top + scrollY + sr.height / 2;
      const lastDocY = er.top + scrollY + er.height / 2;
      const viewMidY = scrollY + vh / 2;
      const dotSpanDoc = lastDocY - firstDocY;
      const progress =
        dotSpanDoc <= 0
          ? 0
          : Math.max(0, Math.min(1, (viewMidY - firstDocY) / dotSpanDoc));

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) {
        setMotion({
          lineTop: firstCenter,
          lineHeight,
          rocketAlongPx: 0,
          rotate: ROCKET_ROTATE_DOWN_DEG,
        });
        return;
      }

      const rotate =
        ROCKET_ROTATE_DOWN_DEG +
        progress * (ROCKET_ROTATE_UP_DEG - ROCKET_ROTATE_DOWN_DEG);

      setMotion({
        lineTop: firstCenter,
        lineHeight,
        rocketAlongPx: progress * lineHeight,
        rotate,
      });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(track);

    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => update();
    mq.addEventListener("change", onMq);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [trackRef, firstDotRef, lastDotRef]);

  return motion;
}
