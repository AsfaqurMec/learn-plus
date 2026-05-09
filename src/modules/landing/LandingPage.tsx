import dynamic from "next/dynamic";
import { HeroSection } from "@/modules/landing/components/HeroSection";
import { LandingMobileContactBar } from "@/modules/landing/components/LandingMobileContactBar";
import type { ResolvedLandingImages } from "@/types/resolvedLandingImages";

const BelowFold = dynamic(
  () =>
    import("@/modules/landing/components/LandingSections").then((m) => ({
      default: m.BelowFold,
    })),
  {
    loading: () => (
      <div
        className="min-h-[50vh] animate-pulse bg-gradient-to-b from-emerald-50/90 to-emerald-100/40"
        aria-hidden
      />
    ),
  },
);

export default function LandingPage({
  landingImages,
}: {
  landingImages: ResolvedLandingImages;
}) {
  return (
    <div className="pb-14 text-emerald-950 md:pb-0">
      <LandingMobileContactBar />
      <HeroSection heroSrc={landingImages.hero} />
      <BelowFold landingImages={landingImages} />
    </div>
  );
}
