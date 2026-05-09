import type {
  BeforeAfterSlide,
  ForWhomItem,
} from "@/utils/landingContent";

/** Fully resolved image URLs for the public landing page (defaults filled in). */
export type ResolvedLandingImages = {
  hero: string;
  /** One image per Parent Pain Point timeline step (fixed layout count). */
  problemStepImages: string[];
  solution: string;
  beforeAfterSlides: BeforeAfterSlide[];
  benefit: string;
  forWhomItems: ForWhomItem[];
  testimonial: string;
  /** Limited-time offer section image */
  limitedOffer: string;
  /** Final CTA / program highlight image */
  programFinalCta: string;
};
