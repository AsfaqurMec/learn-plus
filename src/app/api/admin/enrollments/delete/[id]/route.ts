import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/lib/mongodb";
import { Enrollment } from "@/models/Enrollment";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { ok: false, message: "Invalid request id." },
        { status: 400 }
      );
    }

    const enrollment = await Enrollment.findById(id);

    if (!enrollment) {
      return NextResponse.json(
        { ok: false, message: "Request not found." },
        { status: 404 }
      );
    }

    await Enrollment.findByIdAndDelete(id);

    return NextResponse.json({
      ok: true,
      message: "Request deleted successfully.",
    });
  } catch (error) {
    console.error("[DELETE_ENROLLMENT]", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong while deleting the request.",
      },
      { status: 500 }
    );
  }
}