"use client";

import { ImageFrame } from "@/modules/landing/components/LandingImageFrame";
import { aosInit } from "@/utils/aosClass";

export function HeroSection({ heroSrc }: { heroSrc: string }) {
  return (
    <header
      id="hero"
      data-aos="fade-in"
      className={aosInit(
        "px-4 pt-28 pb-16 sm:px-8 md:pt-16 lg:px-12 bg-emerald-50",
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center sm:gap-10">
        <h1
          data-aos="fade-up"
          className={aosInit(
            "max-w-4xl text-3xl font-bold leading-tight text-emerald-950 sm:text-5xl md:text-6xl",
          )}
        >
          ২৫ দিনে সন্তানের হাতের লেখা করুন সুন্দর, পরিপাটি ও আকর্ষণীয়
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="80"
          className="max-w-2xl text-base leading-7 text-emerald-800 sm:text-lg"
        >
          সঠিক গাইডলাইন, প্রতিদিনের প্র্যাকটিস এবং বিশেষ পদ্ধতিতে হাতের লেখায়
          দৃশ্যমান পরিবর্তন আনুন।
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="140"
          className={aosInit("w-full max-w-4xl")}
        >
          <ImageFrame
            src={heroSrc}
            alt="হাতের লেখা প্রোগ্রাম — শিক্ষার্থী ও শিক্ষক"
            priority
          />
        </div>
      </div>
    </header>
  );
}
