import { NextRequest, NextResponse } from "next/server";
import { FEATURED_PACKAGES } from "@/lib/mock-data";
import { TravelPackage } from "@/types";

let packagesStore: TravelPackage[] = [...FEATURED_PACKAGES];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: packagesStore,
  });
}

export async function POST(req: NextRequest) {
  try {
    const newPkg: TravelPackage = await req.json();
    if (!newPkg.title || !newPkg.destination) {
      return NextResponse.json(
        { success: false, error: "Title and destination are required" },
        { status: 400 }
      );
    }

    newPkg.id = newPkg.id || `pkg-${Date.now()}`;
    packagesStore.unshift(newPkg);

    return NextResponse.json({
      success: true,
      data: newPkg,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to save travel package" },
      { status: 500 }
    );
  }
}
