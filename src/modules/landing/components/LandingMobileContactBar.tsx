"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";

export function LandingMobileContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 border-t border-emerald-700 bg-emerald-900 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(6,78,59,0.35)] md:hidden"
      role="region"
      aria-label="Contact"
    >
      <p className="min-w-0 text-sm font-semibold tracking-wide text-emerald-100">
        আপনার সন্তানের হাতের লেখায় সুন্দর পরিবর্তন আনতে
      </p>
      <PrimaryButton
        href="/register"
        label="আজই ভর্তি করুন"
        className="shrink-0 px-0 py-2.5 text-md text-white"
      />
    </div>
  );
}
