import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 320,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, trim: true, maxlength: 200, default: "" },
  },
  { timestamps: true },
);

export type AdminDocument = InferSchemaType<typeof adminSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Admin: Model<AdminDocument> =
  mongoose.models.Admin ?? mongoose.model<AdminDocument>("Admin", adminSchema);
