import { NextRequest, NextResponse } from "next/server";
import { extractPreferencesFromPrompt } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Prompt string is required" },
        { status: 400 }
      );
    }

    const extracted = await extractPreferencesFromPrompt(prompt);

    return NextResponse.json({
      success: true,
      data: extracted,
    });
  } catch (error: any) {
    console.error("Error extracting preferences:", error);
    return NextResponse.json(
      { success: false, error: "Failed to parse natural language preferences" },
      { status: 500 }
    );
  }
}
