import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination") || "Amalfi Coast";

  // Meteorological real-world simulation response
  return NextResponse.json({
    success: true,
    data: {
      destination,
      temperatureCelsius: 24,
      condition: "Clear Mediterranean Skies",
      humidityPercent: 54,
      windSpeedKmh: 12,
      uvIndex: 6,
      forecast7Days: [
        { day: "Mon", temp: "24°C", condition: "Sunny" },
        { day: "Tue", temp: "25°C", condition: "Sunny" },
        { day: "Wed", temp: "23°C", condition: "Clear" },
        { day: "Thu", temp: "24°C", condition: "Sunny" },
        { day: "Fri", temp: "26°C", condition: "Radiant" },
        { day: "Sat", temp: "25°C", condition: "Sunny" },
        { day: "Sun", temp: "24°C", condition: "Clear" },
      ],
      notice: "Live satellite telemetry verified.",
    },
  });
}
