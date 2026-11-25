import { NextRequest, NextResponse } from "next/server";
import { refinePackageWithAI } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { currentPackage, instruction } = await req.json();
    if (!currentPackage || !instruction) {
      return NextResponse.json(
        { success: false, error: "Both currentPackage and instruction are required" },
        { status: 400 }
      );
    }

    const updated = await refinePackageWithAI(currentPackage, instruction);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("Error refining package:", error);
    return NextResponse.json(
      { success: false, error: "Failed to refine package itinerary" },
      { status: 500 }
    );
  }
}
