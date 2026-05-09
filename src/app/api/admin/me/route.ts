import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { getAdminSession } from "@/lib/auth/getSession";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDb();
    const admin = await Admin.findById(session.sub).lean();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    return NextResponse.json({
      admin: {
        id: String(admin._id),
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (err) {
    console.error("[admin me]", err);
    return NextResponse.json(
      { error: "Could not load session." },
      { status: 500 },
    );
  }
}
