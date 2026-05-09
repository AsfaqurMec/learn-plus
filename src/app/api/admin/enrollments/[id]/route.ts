import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/lib/mongodb";
import {
  Enrollment,
  ENROLLMENT_STATUSES,
  type EnrollmentStatus,
} from "@/models/Enrollment";
import { getAdminSession } from "@/lib/auth/getSession";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: RouteContext) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await context.params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid id." }, { status: 400 });
    }

    const body = (await req.json()) as { status?: string };
    const status = body.status;
    if (
      typeof status !== "string" ||
      !ENROLLMENT_STATUSES.includes(status as EnrollmentStatus)
    ) {
      return NextResponse.json(
        { error: "Invalid status.", allowed: ENROLLMENT_STATUSES },
        { status: 400 },
      );
    }

    await connectDb();
    const updated = await Enrollment.findByIdAndUpdate(
      id,
      { status: status as EnrollmentStatus },
      { new: true },
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Status updated.",
      item: {
        id: String(updated._id),
        status: updated.status,
      },
    });
  } catch (err) {
    console.error("[admin enrollment patch]", err);
    return NextResponse.json(
      { error: "Could not update enrollment." },
      { status: 500 },
    );
  }
}
