"use client";

import { ReactNode } from "react";
import { useResponsiveHorizontalAos } from "@/hooks/useResponsiveHorizontalAos";
import { aosInit } from "@/utils/aosClass";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  headerClassName = "",
}: SectionShellProps) {
  const eyebrowAos = useResponsiveHorizontalAos("fade-right");

  return (
    <section
      id={id}
      data-aos="fade-up"
      className={aosInit(`px-4 py-16 sm:px-8 lg:px-12 ${className}`)}
    >
      <div className="mx-auto max-w-6xl">
        <div className={`mb-8 max-w-3xl space-y-3 ${headerClassName}`}>
          {eyebrow ? (
            <p
              data-aos={eyebrowAos}
              data-aos-delay="40"
              className={aosInit(
                "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-800",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className={aosInit("text-2xl font-bold text-emerald-950 sm:text-3xl")}
          >
            {title}
          </h2>
          {description ? (
            <p
              data-aos="fade-up"
              data-aos-delay="150"
              className={aosInit("text-base leading-7 text-emerald-800/90")}
            >
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
