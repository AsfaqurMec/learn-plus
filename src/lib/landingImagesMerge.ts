import { imageSources } from "@/modules/landing/components/landingImageConfig";
import type { LandingImagesPayload } from "@/types/landingImages";
import type { ResolvedLandingImages } from "@/types/resolvedLandingImages";
import type {
  BeforeAfterSlide,
  ForWhomItem,
} from "@/utils/landingContent";
import {
  beforeAfterResults,
  forWhom as defaultForWhom,
} from "@/utils/landingContent";

const PROBLEM_STEP_COUNT = 4;

const DEFAULT_PROBLEM_IMAGES = [
  imageSources.problem,
  imageSources.before,
  imageSources.solution,
  imageSources.after,
] as const;

function mergeBeforeAfter(
  db: LandingImagesPayload["beforeAfter"] | undefined,
  fallback: BeforeAfterSlide[],
): BeforeAfterSlide[] {
  if (!db?.length) return fallback;
  const hasAny = db.some((x) => x.before?.trim() || x.after?.trim());
  if (!hasAny) return fallback;

  return db.map((pair, i) => {
    const fb = fallback[i];
    const beforeSrc =
      pair.before?.trim() || fb?.beforeSrc || imageSources.before;
    const afterSrc =
      pair.after?.trim() || fb?.afterSrc || imageSources.after;
    return {
      beforeSrc,
      afterSrc,
      beforeAlt: fb?.beforeAlt ?? "আগের লেখা",
      afterAlt: fb?.afterAlt ?? "পরের লেখা",
    };
  });
}

function mergeForWhom(
  db: LandingImagesPayload["forWhom"] | undefined,
  fallback: ForWhomItem[],
): ForWhomItem[] {
  if (!db?.length) return fallback;
  const hasAny = db.some((x) => x.image?.trim());
  if (!hasAny) return fallback;

  return db.map((item, i) => {
    const fb = fallback[i];
    const title = item.title?.trim() || fb?.title || "";
    const imageSrc =
      item.image?.trim() || fb?.imageSrc || imageSources.hero;
    const imageAlt = fb?.imageAlt || title || "Program participant";
    return { title, imageSrc, imageAlt };
  });
}

export function mergeLandingImagesPayload(
  payload: Partial<LandingImagesPayload> | null | undefined,
): ResolvedLandingImages {
  const p = payload ?? {};

  const dbSteps = Array.isArray(p.parentPainPoints)
    ? p.parentPainPoints
    : [];
  const problemStepImages = Array.from(
    { length: PROBLEM_STEP_COUNT },
    (_, i) => {
      const url =
        typeof dbSteps[i] === "string" ? dbSteps[i].trim() : "";
      return url || DEFAULT_PROBLEM_IMAGES[i]!;
    },
  );

  return {
    hero: p.banner?.trim() || imageSources.hero,
    problemStepImages,
    solution: p.ourSolution?.trim() || imageSources.solution,
    beforeAfterSlides: mergeBeforeAfter(p.beforeAfter, beforeAfterResults),
    benefit: p.studentBenefit?.trim() || imageSources.benefit,
    forWhomItems: mergeForWhom(p.forWhom, defaultForWhom),
    testimonial: p.testimonial?.trim() || imageSources.testimonial,
    limitedOffer: p.limitedTimeOffer?.trim() || imageSources.cta,
    programFinalCta: p.program?.trim() || imageSources.cta,
  };
}
