import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { getAdminSession } from "@/lib/auth/getSession";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDb();
    const admins = await Admin.find()
      .sort({ createdAt: -1 })
      .select("email name createdAt")
      .lean();

    return NextResponse.json({
      items: admins.map((a) => ({
        id: String(a._id),
        email: a.email,
        name: a.name ?? "",
        createdAt: a.createdAt,
      })),
    });
  } catch (err) {
    console.error("[admin list]", err);
    return NextResponse.json(
      { error: "Could not load admins." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = (await req.json()) as {
      email?: string;
      password?: string;
      name?: string;
    };
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const name =
      typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 },
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    await connectDb();
    const passwordHash = await bcrypt.hash(password, 12);
    const created = await Admin.create({
      email,
      passwordHash,
      name,
    });

    return NextResponse.json({
      message: "Admin created.",
      admin: {
        id: String(created._id),
        email: created.email,
        name: created.name ?? "",
      },
    });
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "An admin with this email already exists." },
        { status: 409 },
      );
    }
    console.error("[admin create]", err);
    return NextResponse.json(
      { error: "Could not create admin." },
      { status: 500 },
    );
  }
}
