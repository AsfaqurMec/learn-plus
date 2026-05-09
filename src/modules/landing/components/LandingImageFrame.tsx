"use client";

import Image from "next/image";
import { LANDING_CONTENT_IMAGE_SIZES } from "@/modules/landing/components/landingImageConfig";

export function ImageFrame({
  src,
  alt,
  className = "",
  priority = false,
  sizes = LANDING_CONTENT_IMAGE_SIZES,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Set on LCP / above-the-fold images only */
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`hover-lift overflow-hidden rounded-lg border border-emerald-200 bg-white shadow-sm ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={900}
        height={560}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        quality={80}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
