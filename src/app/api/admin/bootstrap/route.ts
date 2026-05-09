import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";

/**
 * One-time: creates the first admin when no admins exist.
 * Requires ADMIN_BOOTSTRAP_SECRET in env to match body.secret.
 */
export async function POST(req: Request) {
  try {
    const expected = process.env.ADMIN_BOOTSTRAP_SECRET;
    if (!expected || expected.length < 8) {
      return NextResponse.json(
        { error: "Bootstrap is not configured on the server." },
        { status: 503 },
      );
    }

    const body = (await req.json()) as {
      secret?: string;
      email?: string;
      password?: string;
      name?: string;
    };
    if (body.secret !== expected) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const name =
      typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    await connectDb();
    const count = await Admin.countDocuments();
    if (count > 0) {
      return NextResponse.json(
        { error: "Bootstrap is only allowed when no admins exist." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const created = await Admin.create({ email, passwordHash, name });

    return NextResponse.json({
      message: "First admin created. You can sign in at /admin/login.",
      admin: { id: String(created._id), email: created.email },
    });
  } catch (err) {
    console.error("[bootstrap]", err);
    return NextResponse.json(
      { error: "Bootstrap failed." },
      { status: 500 },
    );
  }
}
