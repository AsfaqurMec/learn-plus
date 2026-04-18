import {
  BenefitsSection,
  FaqSection,
  FeaturesSection,
  FinalCtaSection,
  ForWhomSection,
  HeroSection,
  LandingFooter,
  LandingNav,
  OfferSection,
  ProblemSection,
  ResultsSection,
  SolutionSection,
  TestimonialSection,
} from "@/modules/landing/components/LandingSections";

export default function LandingPage() {
  return (
    <div className=" text-emerald-950">
      <LandingNav />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ResultsSection />
      <BenefitsSection />
      <ForWhomSection />
      <TestimonialSection />
      <OfferSection />
      <FaqSection />
      <FinalCtaSection />
      <LandingFooter />
    </div>
  );
}
