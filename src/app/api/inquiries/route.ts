import { NextRequest, NextResponse } from "next/server";
import { CONTACT_INFO, buildMailtoUrl, buildWhatsAppUrl } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type = "booking",
      packageTitle = "Goa Trip Inquiry",
      destination = "Goa",
      selectedTier = "Comfort",
      travelers = 2,
      startDate = "",
      endDate = "",
      totalEstimatedPrice = 0,
      contactName = "",
      contactEmail = "",
      contactPhone = "",
      specialRequests = "",
    } = body;

    if (type === "newsletter") {
      if (!contactEmail) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }
      console.log(`[Newsletter Subscription] -> ${contactEmail} (notify ${CONTACT_INFO.email})`);
      return NextResponse.json({ ok: true, message: "Subscribed successfully" });
    }

    const summaryText = [
      `New Yatra Vista Trip Inquiry`,
      `Package: ${packageTitle} (${selectedTier})`,
      `Destination: ${destination}`,
      `Travelers: ${travelers} Guests`,
      `Dates: ${startDate} to ${endDate}`,
      `Estimated Budget: ₹${Number(totalEstimatedPrice).toLocaleString("en-IN")}`,
      `Guest Name: ${contactName}`,
      `Guest Email: ${contactEmail}`,
      `Guest Phone/WhatsApp: ${contactPhone}`,
      specialRequests ? `Special Requests: ${specialRequests}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    console.log(`[Booking Inquiry Logged for ${CONTACT_INFO.email} / ${CONTACT_INFO.phoneDisplay}]:\n${summaryText}`);

    // Optional server-side email dispatch if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Yatra Vista <onboarding@resend.dev>",
          to: [CONTACT_INFO.email],
          reply_to: contactEmail || CONTACT_INFO.email,
          subject: `New Goa Trip Inquiry: ${packageTitle} - ${contactName}`,
          text: summaryText,
        }),
      }).catch((err) => console.error("Resend email dispatch error:", err));
    }

    return NextResponse.json({
      ok: true,
      recipientEmail: CONTACT_INFO.email,
      recipientPhone: CONTACT_INFO.phoneDisplay,
      whatsappUrl: buildWhatsAppUrl(summaryText),
      mailtoUrl: buildMailtoUrl(`Goa Trip Inquiry: ${packageTitle} (${contactName})`, summaryText),
    });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
