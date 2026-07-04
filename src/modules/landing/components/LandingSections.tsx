"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SectionShell from "@/components/ui/SectionShell";
import logo from "../../../../public/logo1.png";
import { ImageFrame } from "@/modules/landing/components/LandingImageFrame";
import { useResponsiveHorizontalAos } from "@/hooks/useResponsiveHorizontalAos";
import { useTimelineRocketMotion } from "@/hooks/useTimelineRocketMotion";
import type { ResolvedLandingImages } from "@/types/resolvedLandingImages";
import type { BeforeAfterSlide, ForWhomItem } from "@/utils/landingContent";
import {
  benefits,
  faqs,
  programFeatures,
  testimonials,
} from "@/utils/landingContent";
import { aosInit } from "@/utils/aosClass";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#problem", label: "সমস্যা" },
  { href: "#features", label: "ফিচারসমূহ" },
  { href: "#results", label: "রেজাল্ট" },
  { href: "#faq", label: "FAQ" },
] as const;

export function LandingNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Drawer is portaled to document.body; only available after client mount (SSR-safe).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time client gate for createPortal
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <nav
      data-aos="fade-down"
      className={aosInit(
        "sticky top-0 z-50 -mb-16 hidden border-b border-emerald-700 bg-emerald-900/100 px-4 py-3 sm:px-8 md:block lg:px-12",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <a href="#hero" className="inline-flex items-center gap-2" onClick={closeDrawer}>
          <Image
            src={logo}
            alt="Learn Plus logo"
            width={100}
            height={100}
            sizes="160px"
            className="h-12 w-40"
          />
        </a>
        <div className="hidden items-center gap-6 text-base font-medium tracking-wide text-emerald-100 md:flex lg:text-lg">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="transition hover:text-emerald-300">
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 md:gap-0">
          <div className="hidden md:block">
            <PrimaryButton href="/register" label="Enroll Now" />
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-600/80 bg-emerald-800/80 text-emerald-100 transition hover:bg-emerald-700 md:hidden"
            aria-expanded={drawerOpen}
            aria-controls="landing-nav-drawer"
            aria-label={drawerOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            onClick={() => setDrawerOpen((o) => !o)}
          >
            {drawerOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {mounted
        ? createPortal(
            <div
              id="landing-nav-drawer"
              className={`fixed inset-0 z-[9999] md:hidden ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
              aria-hidden={!drawerOpen}
            >
              <button
                type="button"
                className={`absolute inset-0 bg-emerald-950/70 transition-opacity duration-300 ${
                  drawerOpen ? "opacity-100" : "opacity-0"
                }`}
                aria-label="মেনু বন্ধ করুন"
                tabIndex={drawerOpen ? 0 : -1}
                onClick={closeDrawer}
              />
              <div
                className={`absolute top-0 right-0 flex h-full w-full max-w-sm flex-col border-l border-emerald-700 bg-emerald-900 shadow-2xl transition-transform duration-300 ease-out ${
                  drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center justify-between border-b border-emerald-700 px-4 py-3">
                  <span className="text-sm font-semibold text-emerald-100">মেনু</span>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-emerald-200 transition hover:bg-emerald-800 hover:text-white"
                    aria-label="মেনু বন্ধ করুন"
                    onClick={closeDrawer}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4" aria-label="প্রধান নেভিগেশন">
                  {NAV_LINKS.map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      className="rounded-lg px-3 py-3 text-base text-emerald-100 transition hover:bg-emerald-800/80 hover:text-white"
                      onClick={closeDrawer}
                    >
                      {label}
                    </a>
                  ))}
                  <div className="mt-4 border-t border-emerald-700 pt-4">
                    <PrimaryButton
                      href="/register"
                      label="Enroll Now"
                      className="w-full justify-center px-6 py-3"
                      onClick={closeDrawer}
                    />
                  </div>
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </nav>
  );
}

const problemStepNumerals = ["১", "২", "৩", "৪"] as const;

function ProblemStepConnector() {
  const gradId = `problem-arrow-grad-${useId().replace(/:/g, "")}`;
  return (
    <div
      className="flex flex-col items-center pt-8 md:hidden"
      aria-hidden
    >
      <svg
        width="44"
        height="52"
        viewBox="0 0 44 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_8px_rgba(5,150,105,0.25)]"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="22"
            y1="0"
            x2="22"
            y2="52"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a7f3d0" />
            <stop offset="0.45" stopColor="#10b981" />
            <stop offset="1" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* Stem */}
        <path
          d="M22 4v23.5"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Filled arrow head */}
        <path
          d="M22 48L7 27.5h30L22 48z"
          fill={`url(#${gradId})`}
          stroke="#047857"
          strokeWidth="0.5"
          strokeOpacity="0.35"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function ProblemSection({
  stepImages,
}: {
  stepImages: string[];
}) {
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLSpanElement>(null);
  const lastDotRef = useRef<HTMLSpanElement>(null);
  const timelineMotion = useTimelineRocketMotion(
    timelineTrackRef,
    firstDotRef,
    lastDotRef
  );

  const timelineMeta = [
    {
      title: "লেখা পরিষ্কার না হওয়ায় বোঝাতে সমস্যা",
      description:
        "অনেক শিক্ষার্থী উত্তর জানলেও handwriting অস্পষ্ট হওয়ায় teacher দ্রুত বুঝতে পারেন না, ফলে expected score আসে না।",
      imageAlt: "অস্পষ্ট handwriting-এর কারণে হতাশ শিক্ষার্থী",
    },
    {
      title: "Shape ও spacing ঠিক না থাকায় খাতা অগোছালো",
      description:
        "অক্ষরের আকার, শব্দের দূরত্ব ও line alignment ঠিক না থাকলে পুরো presentation দুর্বল দেখায়।",
      imageAlt: "অগোছালো খাতার presentation",
    },
    {
      title: "ভালো জানলেও marks কমে যায়",
      description:
        "exam copy readable না হলে content ভালো হলেও evaluator-এর কাছে impression কমে যায় এবং নম্বর কমে যেতে পারে।",
      imageAlt: "পরীক্ষার প্রস্তুতিতে handwriting চ্যালেঞ্জ",
    },
    {
      title: "আত্মবিশ্বাস কমে যায় ও লিখতে ভয় পায়",
      description:
        "বারবার ভুল presentation-এর কারণে অনেক শিশুর writing confidence কমে যায়, ফলে practice থেকেও তারা পিছিয়ে পড়ে।",
      imageAlt: "লিখতে আত্মবিশ্বাস হারানো শিক্ষার্থী",
    },
  ] as const;

  const timelineItems = timelineMeta.map((item, index) => ({
    title: item.title,
    description: item.description,
    imageAlt: item.imageAlt,
    imageSrc: stepImages[index] ?? "",
  }));

  return (
    <SectionShell
      id="problem"
      eyebrow="Parent Pain Point"
      title="কেন এই Program এখনই প্রয়োজন?"
      description="শুধু বিষয় জানা যথেষ্ট নয়; handwriting, spacing এবং presentation ঠিক না থাকলে exam performance প্রভাবিত হয়।"
      headerClassName="mx-auto text-center"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div
          ref={timelineTrackRef}
          className="relative space-y-10 md:space-y-14"
        >
          <div
            className="absolute left-1/2 z-0 hidden w-px -translate-x-1/2 bg-emerald-200 md:block"
            style={{
              top: timelineMotion.lineTop,
              height: timelineMotion.lineHeight,
            }}
            aria-hidden
          />
          {timelineItems.map((item, index) => {
            const reverse = index % 2 === 1;
            const lastIndex = timelineItems.length - 1;
            const stepBn = problemStepNumerals[index] ?? String(index + 1);
            return (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={80 + index * 80}
                className={aosInit("relative z-10")}
              >
                <div
                  className={`relative flex flex-col items-stretch gap-2 rounded-md border border-emerald-200/90 bg-gradient-to-b from-white via-emerald-50/40 to-white p-4 shadow-[0_12px_40px_-20px_rgba(5,46,22,0.35)] ring-1 ring-emerald-900/[0.06] sm:p-5 md:gap-y-8 md:gap-x-16 md:rounded-none md:border-0 md:bg-transparent md:from-transparent md:via-transparent md:to-transparent md:p-0 md:shadow-none md:ring-0 lg:gap-x-20 ${
                    reverse ? "md:flex-row-reverse" : "md:flex-row"
                  } md:items-center`}
                >
                  <div className="flex justify-center md:hidden">
                    <span className="inline-flex items-center rounded-md border border-emerald-300/60 bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-700 px-5 py-2 text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-900/25 ring-2 ring-white/30">
                      ধাপ {stepBn}
                    </span>
                  </div>
                  <div className="w-full md:w-1/2">
                    <ImageFrame
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="shadow-md ring-1 ring-emerald-200/60"
                    />
                  </div>
                  <div className="w-full rounded-md border border-emerald-100/90 bg-emerald-50/80 px-5 py-6 md:w-1/2 md:rounded-none md:border-0 md:bg-emerald-50/70 md:px-6 md:py-8">
                    <p className="hidden text-sm font-semibold tracking-wide text-emerald-600 md:block">
                      ধাপ {stepBn}
                    </p>
                    <h3 className="text-xl font-bold text-emerald-950 sm:text-2xl md:mt-1">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-emerald-950 sm:text-md">
                      {item.description}
                    </p>
                  </div>
                  <span
                    ref={
                      index === 0
                        ? firstDotRef
                        : index === lastIndex
                          ? lastDotRef
                          : undefined
                    }
                    className="absolute top-1/2 left-1/2 z-20 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 md:block"
                  />
                </div>
                {index < lastIndex ? <ProblemStepConnector /> : null}
              </div>
            );
          })}
          <div
            className="pointer-events-none absolute left-1/2 z-20 hidden md:block"
            style={{
              top: timelineMotion.lineTop,
              transform: `translate(-50%, -50%) translateY(${timelineMotion.rocketAlongPx}px) rotate(${timelineMotion.rotate}deg)`,
            }}
          >
            <div className="grid h-10 w-10 place-items-center rounded-full border border-emerald-700 bg-emerald-50 text-lg shadow-sm will-change-transform">
              🚀
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function SolutionSection({
  solutionSrc,
}: {
  solutionSrc: string;
}) {
  const imageColAos = useResponsiveHorizontalAos("fade-right");
  const contentColAos = useResponsiveHorizontalAos("fade-left");

  const solutionHighlights: {
    icon: string;
    title: string;
    description: string;
  }[] = [
    {
      icon: "🗓️",
      title: "২৫ দিনের Step-by-Step Plan",
      description: "প্রতিদিনের ছোট ছোট টাস্কে ধারাবাহিক উন্নতি হয়।",
    },
    {
      icon: "📋",
      title: "Structured practice flow",
      description: "পর্যায়ক্রমিক অনুশীলনে writing ধারাবাহিকতা বজায় থাকে।",
    },
    {
      icon: "✍️",
      title: "Daily guidance and correction",
      description: "নিয়মিত দিকনির্দেশ ও সংশোধনে দ্রুত উন্নতি আসে।",
    },
    {
      icon: "📐",
      title: "Letter formation improvement",
      description: "Spacing ও presentation উন্নয়নসহ লেখা আরও সুসংগত হয়।",
    },
  ];

  return (
    <SectionShell
      id="solution"
      eyebrow="Our Solution"
      title="২৫ দিনের পরিকল্পিত অনুশীলনে handwriting উন্নতির বাস্তব পথ"
      //description="প্রতিদিন অল্প অল্প practice, worksheet, এবং guided correction-এর মাধ্যমে handwriting ধীরে ধীরে clean, balanced ও readable হয়।"
    >
      <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:auto-rows-fr">
        <div data-aos={imageColAos} className={aosInit("h-full")}>
          <ImageFrame
            src={solutionSrc}
            alt="worksheet practice"
            className="h-full min-h-[320px] lg:min-h-[460px]"
          />
        </div>
        <div
          data-aos={contentColAos}
          data-aos-delay="140"
          className={aosInit(
            "hover-lift relative h-full overflow-hidden py-6 px-4 shadow-sm sm:p-8",
          )}
        >
          <div className="pointer-events-none absolute -top-12 -right-10 h-36 w-36 rounded-full bg-emerald-100/50 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-teal-100/40 blur-2xl" />

          <div className="relative space-y-6">
            <div className="inline-flex items-center rounded-full border border-emerald-200/90 bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-900/85">
              Step-by-step roadmap
            </div>
           

            <ul className="grid gap-4 text-sm text-emerald-900 sm:gap-3">
              {solutionHighlights.map((item, index) => (
                <li
                  key={item.title}
                  className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-3 sm:rounded-md sm:border sm:border-emerald-100 sm:bg-white/85 sm:p-3 sm:px-4 sm:py-3 max-sm:rounded-md max-sm:border max-sm:border-emerald-400/50 max-sm:bg-gradient-to-br max-sm:from-emerald-500/90 max-sm:via-emerald-600/95 max-sm:to-emerald-700/90 max-sm:p-5 max-sm:shadow-lg max-sm:shadow-black/05 max-sm:ring-1 max-sm:ring-white/10"
                >
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/25 bg-white/75 text-2xl leading-none shadow-inner shadow-black/20 backdrop-blur-sm sm:hidden"
                    aria-hidden
                  >
                    {item.icon}
                  </div>
                  <span className="mt-0.5 hidden h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-xs text-white shadow-sm sm:grid">
                    {index + 1}
                  </span>
                  <div className="min-w-0 space-y-2 sm:space-y-0">
                    <h3 className="text-base font-bold leading-snug text-white sm:text-sm sm:font-normal sm:leading-6 sm:text-emerald-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-emerald-100/95 sm:hidden">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function ProgramFeatureCard({
  feature,
  index,
  cardClassName,
}: {
  feature: (typeof programFeatures)[number];
  index: number;
  cardClassName: string;
}) {
  const cardAos = useResponsiveHorizontalAos(
    index % 2 === 0 ? "fade-right" : "fade-left",
  );

  return (
    <article
      data-aos={cardAos}
      data-aos-delay={80 + index * 70}
      className={aosInit(
        `relative z-10 mb-4 w-full max-w-2xl rounded-md bg-white p-6 shadow-sm ${cardClassName}`,
      )}
    >
      <div className="mb-4 flex flex-col gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-red-600 text-3xl text-white">
          {feature.icon}
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 sm:text-2xl">
          {feature.title}
        </h3>
      </div>
      <p className="text-sm leading-7 text-zinc-700 sm:text-base">
        {feature.description}
      </p>
    </article>
  );
}

export function FeaturesSection() {
  const cardStyles = [
    "md:rotate-8 md:-translate-x-20 md:mt-10",
    "md:-rotate-8 md:translate-x-14 md:-mt-10",
    "md:rotate-2 md:-translate-x-16 md:mt-2",
    "md:-rotate-5 md:translate-x-10 md:-mt-6",
    "md:rotate-5 md:-translate-x-8 md:mt-4",
    "md:-rotate-5 md:translate-x-8 md:-mt-6",
  ];

  return (
    <SectionShell
      id="features"
      eyebrow="Program Features"
      title="Program-এর key features এক নজরে"
      headerClassName="mx-auto text-center"
    >
      <div className="mx-auto max-w-6xl rounded-md bg-zinc-100 px-4 py-8 sm:px-6 md:px-10 md:py-10">
        <div className="mt-6 flex flex-col items-center justify-center">
        {programFeatures.map((feature, index) => (
          <ProgramFeatureCard
            key={feature.title}
            feature={feature}
            index={index}
            cardClassName={cardStyles[index % cardStyles.length]}
          />
        ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function ResultsSection({
  slides,
}: {
  slides: BeforeAfterSlide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = Math.max(0, slides.length - 1);
  const clampedIndex = Math.min(activeIndex, maxIndex);
  const dotCount = maxIndex + 1;

  const handlePrev = () =>
    setActiveIndex((prev) => {
      const safe = Math.min(prev, maxIndex);
      return Math.max(0, safe - 1);
    });
  const handleNext = () =>
    setActiveIndex((prev) => {
      const safe = Math.min(prev, maxIndex);
      return Math.min(maxIndex, safe + 1);
    });

  useEffect(() => {
    if (dotCount <= 1) {
      return;
    }

    const autoSlideTimer = window.setInterval(() => {
      setActiveIndex((prev) => {
        const safe = Math.min(prev, maxIndex);
        return safe >= maxIndex ? 0 : safe + 1;
      });
    }, 10000);

    return () => window.clearInterval(autoSlideTimer);
  }, [dotCount, maxIndex]);

  return (
    <SectionShell
      id="results"
      eyebrow="Before & After"
      title="২৫ দিন পর পরিবর্তন নিজের চোখেই দেখুন"
    >
      <div className="space-y-4">
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${clampedIndex * 100}%)`,
              }}
            >
              {slides.map((slide, slideIndex) => (
                <div
                  key={`${slide.beforeSrc}-${slide.afterSrc}-${slideIndex}`}
                  className="w-full shrink-0 px-1"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div
                      data-aos="fade-right"
                      data-aos-delay={60 + slideIndex * 40}
                      className={aosInit("space-y-3")}
                    >
                      <p className="text-sm text-center font-semibold text-emerald-800">
                        আগের লেখা
                      </p>
                      <ImageFrame
                        src={slide.beforeSrc}
                        alt={slide.beforeAlt}
                        className="aspect-[16/10]"
                      />
                    </div>
                    <div
                      data-aos="fade-left"
                      data-aos-delay={120 + slideIndex * 40}
                      className={aosInit("space-y-3")}
                    >
                      <p className="text-sm text-center font-semibold text-emerald-800">
                        পরের লেখা
                      </p>
                      <ImageFrame
                        src={slide.afterSrc}
                        alt={slide.afterAlt}
                        className="aspect-[16/10]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={handlePrev}
            disabled={clampedIndex === 0}
            className="absolute top-1/2 mt-4 left-1 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-emerald-200 bg-white text-lg text-emerald-900 shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={handleNext}
            disabled={clampedIndex === maxIndex}
            className="absolute top-1/2 mt-4 right-1 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-emerald-200 bg-white text-lg text-emerald-900 shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ›
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={`results-dot-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition ${
                clampedIndex === index
                  ? "w-6 bg-emerald-700"
                  : "w-2.5 bg-emerald-300 hover:bg-emerald-500"
              }`}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function BenefitsSection({
  benefitSrc,
}: {
  benefitSrc: string;
}) {
  const imageAos = useResponsiveHorizontalAos("fade-left");

  return (
    <SectionShell
      id="benefits"
      eyebrow="Student Benefits"
      title="Feature নয়, বাস্তব benefit-ই আমাদের focus"
      
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <ul className="space-y-3">
          {benefits.map((benefitPoint, index) => (
            <li
              key={benefitPoint.text}
              data-aos="fade-up"
              data-aos-delay={70 + index * 60}
              className={aosInit(
                "hover-lift rounded-md border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-900 shadow-sm",
              )}
            >
              <span className="mr-2">{benefitPoint.icon}</span>
              {benefitPoint.text}
            </li>
          ))}
        </ul>
        <div data-aos={imageAos} data-aos-delay="180" className={aosInit()}>
          <ImageFrame src={benefitSrc} alt="happy student" />
        </div>
      </div>
    </SectionShell>
  );
}

export function ForWhomSection({
  items,
}: {
  items: ForWhomItem[];
}) {
  const [cardsPerView, setCardsPerView] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
        return;
      }

      if (window.innerWidth < 1024) {
        setCardsPerView(2);
        return;
      }

      setCardsPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, items.length - cardsPerView),
    [cardsPerView, items.length],
  );

  const clampedIndex = Math.min(activeIndex, maxIndex);

  const dotCount = maxIndex + 1;

  const handlePrev = () =>
    setActiveIndex((prev) => {
      const safe = Math.min(prev, maxIndex);
      return Math.max(0, safe - 1);
    });
  const handleNext = () =>
    setActiveIndex((prev) => {
      const safe = Math.min(prev, maxIndex);
      return Math.min(maxIndex, safe + 1);
    });

  useEffect(() => {
    if (dotCount <= 1) {
      return;
    }

    const autoSlideTimer = window.setInterval(() => {
      setActiveIndex((prev) => {
        const safe = Math.min(prev, maxIndex);
        return safe >= maxIndex ? 0 : safe + 1;
      });
    }, 3000);

    return () => window.clearInterval(autoSlideTimer);
  }, [dotCount, maxIndex]);

  return (
    <SectionShell
      id="for-whom"
      eyebrow="For Whom"
      title="এই Program কার জন্য উপযোগী?"
    >
      <div className="space-y-4">
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${clampedIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {items.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3"
                >
                  <article
                    data-aos="fade-up"
                    data-aos-delay={60 + index * 50}
                    className={aosInit(
                      "hover-lift overflow-hidden rounded-lg border border-emerald-200 bg-white shadow-sm",
                    )}
                  >
                    <div className="relative h-80 w-full">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="px-4 py-3 text-sm font-medium text-emerald-900 text-center">
                      {item.title}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={handlePrev}
            disabled={clampedIndex === 0}
            className="absolute top-1/2 left-1 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-emerald-200 bg-white text-lg text-emerald-900 shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={handleNext}
            disabled={activeIndex === maxIndex}
            className="absolute top-1/2 right-1 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-emerald-200 bg-white text-lg text-emerald-900 shadow-sm transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ›
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={`for-whom-dot-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition ${
                activeIndex === index
                  ? "w-6 bg-emerald-700"
                  : "w-2.5 bg-emerald-300 hover:bg-emerald-500"
              }`}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function TestimonialSection({
  testimonialSrc,
}: {
  testimonialSrc: string;
}) {
  const imageAos = useResponsiveHorizontalAos("zoom-in-left");

  return (
    <SectionShell
      id="testimonial"
      eyebrow="Testimonials"
      title="Parents ও students যেভাবে পরিবর্তন দেখেছেন"
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              data-aos="flip-up"
              data-aos-delay={90 + index * 80}
              className={aosInit(
                "hover-lift rounded-md border border-emerald-200 bg-white p-5 shadow-sm",
              )}
            >
              <p className="mb-4 text-sm leading-7 text-emerald-900/90">
                “{testimonial.quote}”
              </p>
              <p className="text-sm font-semibold text-emerald-950">
                {testimonial.name}
              </p>
              <p className="text-xs text-emerald-700">{testimonial.role}</p>
            </article>
          ))}
        </div>
        <div data-aos={imageAos} data-aos-delay="120" className={aosInit()}>
          <ImageFrame src={testimonialSrc} alt="parent feedback" />
        </div>
      </div>
    </SectionShell>
  );
}

export function OfferSection({
  offerImageSrc,
}: {
  offerImageSrc: string;
}) {
  const highlightAos = useResponsiveHorizontalAos("fade-right");
  const imageAos = useResponsiveHorizontalAos("fade-left");

  return (
    <section
      id="offer"
      className="offer-section-parallax relative overflow-hidden px-4 py-16 sm:px-8 lg:px-12"
    >
      <div className="offer-parallax-bg absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/92 via-emerald-900/85 to-emerald-950/92" aria-hidden />
      <div className="pointer-events-none absolute -top-20 left-[8%] h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 right-[10%] h-56 w-56 rounded-full bg-lime-300/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl space-y-8">
        <div data-aos="fade-up" className={aosInit("space-y-3")}>
          <p className="inline-flex rounded-full border border-emerald-300/35 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-100">
            Limited Time Offer
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            আজই ভর্তি করুন - সীমিত আসনে ২৫ দিনের বিশেষ program
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-emerald-100/85">
            ভর্তি চলছে সীমিত সময়ের জন্য। দেরি করলে current batch miss হয়ে যেতে
            পারে।
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div
            data-aos={highlightAos}
            data-aos-delay="120"
            className={aosInit(
              "hover-lift offer-highlight-card space-y-4 rounded-md border border-emerald-200/25 p-6 backdrop-blur-sm",
            )}
          >
            <p className="text-sm text-emerald-100">
              🔥 Limited Seat • Priority Support
            </p>
            <p className="text-base leading-7 text-emerald-50">
              আপনার সন্তানের handwriting skill উন্নত করতে এখনই registration
              complete করুন।
            </p>
            <PrimaryButton href="/register" label="এখনই রেজিস্ট্রেশন করুন" />
          </div>
          <div
            data-aos={imageAos}
            data-aos-delay="160"
            className={aosInit(
              "offer-image-frame rounded-lg border border-white/25 bg-white/10 p-2 backdrop-blur-sm",
            )}
          >
            <ImageFrame
              src={offerImageSrc}
              alt="call to action image"
              className="rounded-lg border-0 shadow-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <SectionShell
      id="faq"
      eyebrow="FAQ"
      title="Parent-দের common প্রশ্নের সংক্ষিপ্ত উত্তর"
    >
      <div className="space-y-3 rounded-2xl bg-emerald-50/50 p-3 sm:p-4">
        {faqs.map((item, index) => (
          <details
            key={item.question}
            data-aos="fade-up"
            data-aos-delay={70 + index * 70}
            className={aosInit(
              "group overflow-hidden rounded-lg border border-emerald-200 bg-white",
            )}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-semibold text-emerald-950 marker:content-none">
              <span className="flex items-center gap-2">
                <span className="text-emerald-900">{index + 1}.</span>
                <span>{item.question}</span>
              </span>
              <span
                aria-hidden
                className="text-emerald-800 transition-transform duration-200 group-open:rotate-180"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 8L10 13L15 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <p className="border-t border-emerald-100 px-4 py-4 text-sm leading-7 text-emerald-800/90">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

export function FinalCtaSection({
  programImageSrc,
}: {
  programImageSrc: string;
}) {
  return (
    <section
      id="final-cta"
      data-aos="zoom-in"
      className={aosInit(
        "relative overflow-hidden px-4 py-20 sm:px-8 lg:px-12",
      )}
      style={{
        background:
          "linear-gradient(165deg, #ecfdf5 0%, #d1fae5 42%, #ecfdf5 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-4 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.18) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12">
        <div className="text-center lg:text-left">
          <div className="mb-5 inline-flex items-center justify-center rounded-full border border-emerald-200/90 bg-white/80 px-4 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur-sm lg:justify-start">
            <span
              className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden
            />
            ২৫ দিনের বিশেষ প্রোগ্রাম
          </div>
          <h2 className="text-balance text-2xl font-bold leading-snug tracking-tight text-emerald-950 sm:text-3xl lg:text-[1.75rem] lg:leading-tight xl:text-4xl">
            <span className="block text-base sm:text-lg">
              আপনার সন্তানের হাতের লেখায় সুন্দর পরিবর্তন আনতে
            </span>
            <span className="mt-2 text-3xl sm:mt-4 sm:text-4xl leading-[35px] md:leading-[50px] block bg-gradient-to-r from-emerald-600 via-emerald-800 to-teal-800 bg-clip-text text-transparent sm:mt-4">
              আজই যুক্ত করুন আমাদের ২৫ দিনের বিশেষ প্রোগ্রামে
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-emerald-900/85 lg:mx-0">
            সঠিক practice routine, worksheet, এবং guided monitoring-এ উন্নতি
            নিশ্চিত করুন।
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <PrimaryButton href="/register" label="এখনই ভর্তি করুন" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald-200/70 via-white/40 to-teal-200/50 blur-md"
          />
          <div className="relative overflow-hidden rounded-lg border border-emerald-100/90 bg-white/90 shadow-[0_28px_55px_-38px_rgba(6,78,59,0.55)] ring-1 ring-emerald-100/80 backdrop-blur-sm">
            <div className="aspect-[4/3] w-full sm:aspect-[5/4]">
              <Image
                src={programImageSrc}
                alt=""
                width={640}
                height={512}
                sizes="(max-width: 1024px) 100vw, 640px"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/25 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/40 bg-white/85 px-4 py-3 text-left text-sm text-emerald-950 shadow-lg backdrop-blur-md">
              <p className="font-semibold leading-snug">
                Guided practice · daily worksheets
              </p>
              <p className="mt-0.5 text-xs text-emerald-800/80">
                শিশুর হাতের লেখায় ধারাবাহিক উন্নতি
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const footerQuickLinks = [
  { href: "#problem", label: "সমস্যা" },
  { href: "#features", label: "ফিচারসমূহ" },
  { href: "#results", label: "রেজাল্ট" },
  { href: "#faq", label: "FAQ" },
] as const;

export function LandingFooter() {
  const brandAos = useResponsiveHorizontalAos("fade-right");
  const contactAos = useResponsiveHorizontalAos("fade-left");

  return (
    <footer
      data-aos="fade-up"
      className={aosInit(
        "relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-950 px-4 py-14 text-emerald-50 sm:px-8 lg:px-12",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.75fr)_minmax(0,1.15fr)] lg:gap-10">
          <div data-aos={brandAos} className={aosInit("space-y-4")}>
            <a href="#hero" className="inline-flex items-center gap-2 rounded-lg outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">
              <Image
                src={logo}
                alt="Learn Plus logo"
                width={100}
                height={100}
                sizes="160px"
                className="h-12 w-40"
              />
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-emerald-100/90">
              শিক্ষার্থীর উন্নত ভবিষ্যতের জন্য প্রতিশ্রুতিবদ্ধ।
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/90">
              Learn Plus — হাতের লেখার বিশেষ প্রোগ্রাম
            </p>
          </div>

          <nav
            data-aos="fade-up"
            data-aos-delay="60"
            aria-label="পাতার নেভিগেশন"
            className={aosInit("space-y-4")}
          >
            <p className="text-sm font-semibold text-emerald-50">দ্রুত লিঙ্ক</p>
            <ul className="space-y-2.5 text-sm">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex text-emerald-100/85 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            data-aos={contactAos}
            data-aos-delay="100"
            className={aosInit("space-y-4")}
          >
            <p className="text-sm font-semibold text-emerald-50">যোগাযোগ</p>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href="tel:+8809643399444"
                  className="group flex gap-3 rounded-lg py-0.5 transition hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-700/80 bg-emerald-900/60 text-emerald-200 transition group-hover:border-emerald-500/60 group-hover:bg-emerald-800/70">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M6.6 10.8c1.6 3.1 4.5 5.9 7.6 7.6l2.5-2.5c.4-.4 1-.5 1.5-.3 1 .4 2.1.6 3.3.6.8 0 1.5.7 1.5 1.5V21c0 .8-.7 1.5-1.5 1.5C9.9 22.5 1.5 14.1 1.5 3 1.5 2.2 2.2 1.5 3 1.5h3.5c.8 0 1.5.7 1.5 1.5 0 1.1.2 2.2.6 3.3.2.5.1 1.1-.3 1.5L6.6 10.8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="min-w-0 pt-1 leading-snug text-emerald-100/90">
                    <span className="block text-xs text-emerald-300/90">কল</span>
                    09643399444
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801915651205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-lg py-0.5 transition hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-700/80 bg-emerald-900/60 text-emerald-200 transition group-hover:border-emerald-500/60 group-hover:bg-emerald-800/70">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.5 3.5A10.4 10.4 0 0012 1C6.2 1 1.5 5.7 1.5 11.5c0 1.8.5 3.5 1.3 5L1 23l6.7-1.8a10.3 10.3 0 005.3 1.4h.1c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.1-5.4-3.1-7.6zM12 20.4h-.1a8.6 8.6 0 01-4.4-1.2l-.3-.2-3.9 1 1-3.8-.2-.3a8.5 8.5 0 0114.4-6 8.6 8.6 0 01-2.5 6.1 8.5 8.5 0 01-6 2.4zm4.9-6.7c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.6-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3 .4 3.3 2.7 4.7c1.9 1.2 2.3 1.3 2.7 1.3.4 0 1.3-.1 1.8-.7.5-.5.7-1.2.8-1.4.1-.2.1-.4 0-.5z" />
                    </svg>
                  </span>
                  <span className="min-w-0 pt-1 leading-snug text-emerald-100/90">
                    <span className="block text-xs text-emerald-300/90">WhatsApp</span>
                    01915651205
                  </span>
                </a>
              </li>
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-700/80 bg-emerald-900/60 text-emerald-200">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="pt-1 leading-snug text-emerald-100/90">
                  <span className="block text-xs text-emerald-300/90">সময়</span>
                  সকাল ১০টা – রাত ০৮টা
                </span>
              </li>
              <li>
                <a
                  href="https://facebook.com/learnplusbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-lg py-0.5 transition hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-700/80 bg-emerald-900/60 text-emerald-200 transition group-hover:border-emerald-500/60 group-hover:bg-emerald-800/70">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M13.5 22v-8.5h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6H17V3.8c-.3 0-1.4-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6v2.6H7v3.3h2.8V22h3.7z" />
                    </svg>
                  </span>
                  <span className="min-w-0 pt-1 leading-snug text-emerald-100/90">
                    <span className="block text-xs text-emerald-300/90">Facebook</span>
                    facebook.com/learnplusbd
                  </span>
                </a>
              </li>
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-700/80 bg-emerald-900/60 text-emerald-200">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="10" r="2.2" fill="currentColor" />
                  </svg>
                </span>
                <span className="min-w-0 pt-1 leading-snug text-emerald-100/90">
                  <span className="block text-xs text-emerald-300/90">ঠিকানা</span>
                  108 East Bashabo (Dhaka), Dhaka, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="140"
          className={aosInit(
            "mt-12 flex flex-col gap-3 border-t border-emerald-800/80 pt-8 sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <p className="text-xs text-emerald-200/80">
            © {new Date().getFullYear()} Learn Plus. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-xs text-emerald-300/70">Dhaka, Bangladesh</p>
        </div>
        <div className="mt-0  pt-8 text-center">
          <p className="text-base text-white-400">
            Developed by{' '}
            <Link
              href="https://my-portfolio-asfaqur-rahman.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-[#009b67] transition-colors hover:text-[#ecfdf5] underline"
            >
              Asfaqur Rahman
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Below-the-fold bundle: loaded asynchronously from `LandingPage` for faster first paint. */
export function BelowFold({
  landingImages,
}: {
  landingImages: ResolvedLandingImages;
}) {
  return (
    <>
      <ProblemSection stepImages={landingImages.problemStepImages} />
      <SolutionSection solutionSrc={landingImages.solution} />
      <FeaturesSection />
      <ResultsSection slides={landingImages.beforeAfterSlides} />
      <BenefitsSection benefitSrc={landingImages.benefit} />
      <ForWhomSection items={landingImages.forWhomItems} />
      <TestimonialSection testimonialSrc={landingImages.testimonial} />
      <OfferSection offerImageSrc={landingImages.limitedOffer} />
      <FaqSection />
      <FinalCtaSection programImageSrc={landingImages.programFinalCta} />
      <LandingFooter />
    </>
  );
}
