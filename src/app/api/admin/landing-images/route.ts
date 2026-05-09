import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth/getSession";
import {
  LANDING_IMAGE_CONFIG_KEY,
  LandingImageConfig,
} from "@/models/LandingImageConfig";
import type { LandingImagesPayload } from "@/types/landingImages";

const MAX_ARRAY_ITEMS = 100;

function normalizeString(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function normalizePayload(input: unknown): LandingImagesPayload | null {
  if (!input || typeof input !== "object") return null;
  const body = input as Record<string, unknown>;

  const parentPainPointsRaw = Array.isArray(body.parentPainPoints)
    ? body.parentPainPoints
    : [];
  const beforeAfterRaw = Array.isArray(body.beforeAfter) ? body.beforeAfter : [];
  const forWhomRaw = Array.isArray(body.forWhom) ? body.forWhom : [];

  if (
    parentPainPointsRaw.length > MAX_ARRAY_ITEMS ||
    beforeAfterRaw.length > MAX_ARRAY_ITEMS ||
    forWhomRaw.length > MAX_ARRAY_ITEMS
  ) {
    return null;
  }

  return {
    banner: normalizeString(body.banner),
    parentPainPoints: parentPainPointsRaw.map(normalizeString),
    ourSolution: normalizeString(body.ourSolution),
    beforeAfter: beforeAfterRaw.map((item) => {
      const pair =
        item && typeof item === "object"
          ? (item as Record<string, unknown>)
          : {};
      return {
        before: normalizeString(pair.before),
        after: normalizeString(pair.after),
      };
    }),
    studentBenefit: normalizeString(body.studentBenefit),
    forWhom: forWhomRaw.map((item) => {
      const row =
        item && typeof item === "object"
          ? (item as Record<string, unknown>)
          : {};
      return {
        image: normalizeString(row.image),
        title: normalizeString(row.title).slice(0, 300),
      };
    }),
    testimonial: normalizeString(body.testimonial),
    limitedTimeOffer: normalizeString(body.limitedTimeOffer),
    program: normalizeString(body.program),
  };
}

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDb();
    const doc = await LandingImageConfig.findOne({
      key: LANDING_IMAGE_CONFIG_KEY,
    }).lean();

    return NextResponse.json({
      item: {
        banner: doc?.banner ?? "",
        parentPainPoints: doc?.parentPainPoints ?? [],
        ourSolution: doc?.ourSolution ?? "",
        beforeAfter: doc?.beforeAfter ?? [],
        studentBenefit: doc?.studentBenefit ?? "",
        forWhom: doc?.forWhom ?? [],
        testimonial: doc?.testimonial ?? "",
        limitedTimeOffer: doc?.limitedTimeOffer ?? "",
        program: doc?.program ?? "",
        updatedAt: doc?.updatedAt ?? null,
      },
    });
  } catch (err) {
    console.error("[admin landing images:get]", err);
    return NextResponse.json(
      { error: "Could not load image configuration." },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const payload = normalizePayload(body);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid payload. Please check all image lists." },
        { status: 400 },
      );
    }

    await connectDb();
    await LandingImageConfig.findOneAndUpdate(
      { key: LANDING_IMAGE_CONFIG_KEY },
      { $set: { ...payload, key: LANDING_IMAGE_CONFIG_KEY } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return NextResponse.json({ message: "Landing images saved successfully." });
  } catch (err) {
    console.error("[admin landing images:put]", err);
    return NextResponse.json(
      { error: "Could not save image configuration." },
      { status: 500 },
    );
  }
}
