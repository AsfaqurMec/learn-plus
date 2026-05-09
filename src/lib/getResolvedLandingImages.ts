import { mergeLandingImagesPayload } from "@/lib/landingImagesMerge";
import { connectDb } from "@/lib/mongodb";
import {
  LANDING_IMAGE_CONFIG_KEY,
  LandingImageConfig,
} from "@/models/LandingImageConfig";
import type { ResolvedLandingImages } from "@/types/resolvedLandingImages";

export async function getResolvedLandingImages(): Promise<ResolvedLandingImages> {
  try {
    await connectDb();
    const doc = await LandingImageConfig.findOne({
      key: LANDING_IMAGE_CONFIG_KEY,
    }).lean();

    if (!doc) {
      return mergeLandingImagesPayload(null);
    }

    return mergeLandingImagesPayload({
      banner: doc.banner,
      parentPainPoints: doc.parentPainPoints ?? [],
      ourSolution: doc.ourSolution,
      beforeAfter: doc.beforeAfter ?? [],
      studentBenefit: doc.studentBenefit,
      forWhom: doc.forWhom ?? [],
      testimonial: doc.testimonial,
      limitedTimeOffer: doc.limitedTimeOffer,
      program: doc.program,
    });
  } catch (err) {
    console.error("[getResolvedLandingImages]", err);
    return mergeLandingImagesPayload(null);
  }
}
