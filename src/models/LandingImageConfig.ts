import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const beforeAfterItemSchema = new Schema(
  {
    before: { type: String, trim: true, default: "" },
    after: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const forWhomItemSchema = new Schema(
  {
    image: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "", maxlength: 300 },
  },
  { _id: false },
);

const landingImageConfigSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    banner: { type: String, trim: true, default: "" },
    parentPainPoints: {
      type: [{ type: String, trim: true, default: "" }],
      default: [],
    },
    ourSolution: { type: String, trim: true, default: "" },
    beforeAfter: { type: [beforeAfterItemSchema], default: [] },
    studentBenefit: { type: String, trim: true, default: "" },
    forWhom: { type: [forWhomItemSchema], default: [] },
    testimonial: { type: String, trim: true, default: "" },
    limitedTimeOffer: { type: String, trim: true, default: "" },
    program: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export type LandingImageConfigDocument = InferSchemaType<
  typeof landingImageConfigSchema
> & {
  _id: mongoose.Types.ObjectId;
};

export const LANDING_IMAGE_CONFIG_KEY = "landing-main";

export const LandingImageConfig: Model<LandingImageConfigDocument> =
  mongoose.models.LandingImageConfig ??
  mongoose.model<LandingImageConfigDocument>(
    "LandingImageConfig",
    landingImageConfigSchema,
  );
