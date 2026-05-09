export const ENROLLMENT_STATUSES = [
  "pending",
  "contacted",
  "confirmed",
  "cancelled",
] as const;

export type EnrollmentStatus = (typeof ENROLLMENT_STATUSES)[number];
