import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { signAdminToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      password?: string;
    };
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    await connectDb();
    const admin = await Admin.findOne({ email }).lean();
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = await signAdminToken({
      sub: String(admin._id),
      email: admin.email,
    });

    const store = await cookies();
    store.set(ADMIN_TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      message: "Signed in.",
      admin: { id: String(admin._id), email: admin.email, name: admin.name },
    });
  } catch (err) {
    console.error("[admin login]", err);
    return NextResponse.json(
      { error: "Could not sign in. Try again later." },
      { status: 500 },
    );
  }
}
