import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import { Enrollment, ENROLLMENT_STATUSES } from "@/models/Enrollment";
import { getAdminSession } from "@/lib/auth/getSession";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDb();
    const total = await Enrollment.countDocuments();

    const byStatus: Record<string, number> = {};
    for (const s of ENROLLMENT_STATUSES) {
      byStatus[s] = await Enrollment.countDocuments({ status: s });
    }

    const recent = await Enrollment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("parentName name mobile status createdAt")
      .lean();

    return NextResponse.json({
      total,
      byStatus,
      recent: recent.map((r) => ({
        id: String(r._id),
        parentName: r.parentName ?? r.name ?? "",
        mobile: r.mobile ?? "",
        status: r.status,
        createdAt: r.createdAt,
      })),
    });
  } catch (err) {
    console.error("[admin stats]", err);
    return NextResponse.json(
      { error: "Could not load stats." },
      { status: 500 },
    );
  }
}
