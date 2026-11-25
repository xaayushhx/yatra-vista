import { NextRequest, NextResponse } from "next/server";
import { generateBespokePackages } from "@/lib/gemini";
import { TripPreferences } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const durationDays = Number(body.durationDays) || 3;
    const budget = Number(body.budget) || 140000;

    const prefs: TripPreferences = {
      startingLocation: body.startingLocation || "Mumbai, India",
      destination: body.destination || "Assagao & North Goa Riviera",
      startDate: body.startDate || "2026-12-15",
      endDate: body.endDate || "2026-12-18",
      flexibleDates: Boolean(body.flexibleDates),
      durationDays,
      travelers: Number(body.travelers) || 2,
      adults: Number(body.adults) || 2,
      children: Number(body.children) || 0,
      budget,
      currency: body.currency || "INR",
      travelStyle: body.travelStyle || "Luxury",
      accommodationPreference: body.accommodationPreference || "Beachfront Heritage Villa / 5-Star Haven",
      foodPreference: body.foodPreference || "Fresh Seafood & Indo-Portuguese Gastronomy",
      transportPreference: body.transportPreference || "Private Chauffeur SUV & River Yacht",
      preferredActivities: body.preferredActivities || ["Coastal Yachting", "Goan Gastronomy", "Heritage Trails"],
      travelPace: body.travelPace || "Relaxed",
      specialRequirements: body.specialRequirements || "",
      rawPrompt: body.rawPrompt || "",
    };

    const tripResponse = await generateBespokePackages(prefs);

    return NextResponse.json({
      success: true,
      data: tripResponse,
    });
  } catch (error: any) {
    console.error("Error generating bespoke packages:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate travel packages. Please adjust preferences and retry.",
        details: error?.message || "Internal concierge error",
      },
      { status: 500 }
    );
  }
}
