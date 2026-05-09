import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import {
  ENROLLMENT_STATUSES,
  type EnrollmentStatus,
} from "@/types/enrollment";

export { ENROLLMENT_STATUSES, type EnrollmentStatus };

const enrollmentSchema = new Schema(
  {
    parentName: { type: String, trim: true, maxlength: 500 },
    mobile: { type: String, trim: true, maxlength: 50 },
    studentClass: { type: String, trim: true, maxlength: 200 },
    wantsImprovement: { type: String, enum: ["yes", "no"] },
    // legacy submissions (before field change)
    name: { type: String, trim: true, maxlength: 500 },
    email: { type: String, trim: true, lowercase: true, maxlength: 500 },
    schoolName: { type: String, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ENROLLMENT_STATUSES,
      default: "pending",
    },
  },
  { timestamps: true },
);

enrollmentSchema.index({ createdAt: -1 });
enrollmentSchema.index({ status: 1, createdAt: -1 });

export type EnrollmentDocument = InferSchemaType<typeof enrollmentSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Enrollment: Model<EnrollmentDocument> =
  mongoose.models.Enrollment ??
  mongoose.model<EnrollmentDocument>("Enrollment", enrollmentSchema);
