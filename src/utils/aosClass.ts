/**
 * AOS calls `classList.add("aos-init")` on `[data-aos]` nodes. If that runs
 * before React finishes hydrating, markup diverges. Baking `aos-init` into
 * React's `className` keeps SSR, hydration, and AOS aligned.
 */
export function aosInit(className = ""): string {
  const base = className.trim();
  if (base.includes("aos-init")) return base;
  return base ? `${base} aos-init` : "aos-init";
}
