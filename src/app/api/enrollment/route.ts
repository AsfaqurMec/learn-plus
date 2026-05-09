import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongodb";
import { Enrollment } from "@/models/Enrollment";

const MOBILE_RE = /^[0-9+\s()-]{8,20}$/;

function sanitize(str: unknown, max = 500): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const parentName = sanitize(body.parentName);
    const mobile = sanitize(body.mobile, 50);
    const studentClass = sanitize(body.studentClass, 200);
    const rawWant = body.wantsImprovement;
    const wantsImprovement =
      rawWant === "yes" || rawWant === "no" ? rawWant : "";

    if (!parentName || parentName.length < 2) {
      return NextResponse.json(
        { error: "অভিভাবকের নাম সঠিকভাবে লিখুন।" },
        { status: 400 },
      );
    }
    if (!mobile || !MOBILE_RE.test(mobile.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "একটি বৈধ মোবাইল নম্বর দিন।" },
        { status: 400 },
      );
    }
    if (!studentClass || studentClass.length < 1) {
      return NextResponse.json(
        { error: "শিক্ষার্থীর শ্রেণি লিখুন।" },
        { status: 400 },
      );
    }
    if (!wantsImprovement) {
      return NextResponse.json(
        { error: "প্রশ্নের উত্তর হ্যাঁ অথবা না নির্বাচন করুন।" },
        { status: 400 },
      );
    }

    await connectDb();
    await Enrollment.create({
      parentName,
      mobile,
      studentClass,
      wantsImprovement,
      status: "pending",
    });

    return NextResponse.json({
      message: "Thank you! Your registration was received.",
    });
  } catch (err) {
    console.error("[enrollment]", err);
    return NextResponse.json(
      { error: "Could not save your registration. Please try again later." },
      { status: 500 },
    );
  }
}
