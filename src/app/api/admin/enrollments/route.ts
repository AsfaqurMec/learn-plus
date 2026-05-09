import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import {
  Enrollment,
  ENROLLMENT_STATUSES,
  type EnrollmentStatus,
} from "@/models/Enrollment";
import { getAdminSession } from "@/lib/auth/getSession";

function parsePage(raw: string | null): number {
  const n = raw ? Number.parseInt(raw, 10) : 1;
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function parseLimit(raw: string | null): number {
  const n = raw ? Number.parseInt(raw, 10) : 20;
  if (!Number.isFinite(n)) return 20;
  return Math.min(100, Math.max(5, n));
}

export async function GET(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = parsePage(url.searchParams.get("page"));
    const limit = parseLimit(url.searchParams.get("limit"));
    const statusParam = url.searchParams.get("status");
    const filter: { status?: EnrollmentStatus } = {};
    if (
      statusParam &&
      ENROLLMENT_STATUSES.includes(statusParam as EnrollmentStatus)
    ) {
      filter.status = statusParam as EnrollmentStatus;
    }

    await connectDb();
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Enrollment.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enrollment.countDocuments(filter),
    ]);

    return NextResponse.json({
      items: items.map((r) => {
        const parentName = r.parentName ?? r.name ?? "";
        const studentClass =
          r.studentClass ?? (r.schoolName ? String(r.schoolName) : "");
        const wants =
          r.wantsImprovement === "yes" || r.wantsImprovement === "no"
            ? r.wantsImprovement
            : null;
        return {
          id: String(r._id),
          parentName,
          mobile: r.mobile ?? "",
          studentClass,
          wantsImprovement: wants,
          status: r.status,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
        };
      }),
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (err) {
    console.error("[admin enrollments]", err);
    return NextResponse.json(
      { error: "Could not load enrollments." },
      { status: 500 },
    );
  }
}
