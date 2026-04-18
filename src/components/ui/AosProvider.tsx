"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosProvider() {
  useEffect(() => {
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
  }, []);

  return null;
}
