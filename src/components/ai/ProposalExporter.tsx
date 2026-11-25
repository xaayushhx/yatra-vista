"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import { Download, CheckCircle2, Sparkles } from "lucide-react";
import { AIPackageOption, DayItinerary } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "../ui/MagneticButton";

interface ProposalExporterProps {
  pkg: AIPackageOption;
  destinationName: string;
}

export const ProposalExporter: React.FC<ProposalExporterProps> = ({
  pkg,
  destinationName,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleGeneratePDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Page Background
      doc.setFillColor(8, 9, 12);
      doc.rect(0, 0, 210, 297, "F");

      // Brand Header Top Bar
      doc.setFillColor(24, 27, 34);
      doc.rect(0, 0, 210, 24, "F");

      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("YATRA VISTA", 15, 14);

      doc.setTextColor(244, 239, 234);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("ULTRA-LUXURY TRAVEL CONCIERGE PROPOSAL", 85, 14);

      // Gold Divider Line
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.6);
      doc.line(15, 24, 195, 24);

      // Cover Title
      doc.setTextColor(244, 239, 234);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text(destinationName.toUpperCase(), 15, 42);

      doc.setTextColor(212, 175, 55);
      doc.setFontSize(14);
      doc.text(`${pkg.packageName} — ${pkg.packageType} Edition`, 15, 50);

      doc.setTextColor(180, 180, 180);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text(`"${pkg.tagline}"`, 15, 58);

      // Overview Box
      doc.setFillColor(19, 22, 29);
      doc.roundedRect(15, 66, 180, 36, 3, 3, "F");
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.2);
      doc.roundedRect(15, 66, 180, 36, 3, 3, "S");

      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("TRIP SUMMARY & ESTIMATED INVESTMENT", 20, 74);

      doc.setTextColor(244, 239, 234);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Duration: ${pkg.durationDays} Days / ${pkg.durationDays - 1} Nights`, 20, 82);
      doc.text(`Estimated Total Budget: ${formatCurrency(pkg.estimatedBudget, pkg.currency)}`, 20, 89);
      doc.text(`Recommended Stay: ${pkg.accommodation.type}`, 20, 96);

      // Daily Itinerary Summary
      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("CURATED DAILY ITINERARY", 15, 114);

      let yPos = 122;
      pkg.itinerary.slice(0, 5).forEach((day: DayItinerary) => {
        doc.setTextColor(212, 175, 55);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text(`Day ${day.day}: ${day.title}`, 15, yPos);

        doc.setTextColor(200, 200, 200);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        const morningLine = `Morning: ${day.morning.slice(0, 110)}...`;
        doc.text(morningLine, 15, yPos + 4.5);
        const afternoonLine = `Afternoon: ${day.afternoon.slice(0, 110)}...`;
        doc.text(afternoonLine, 15, yPos + 8.5);

        yPos += 16;
      });

      // Signature Highlights & Logistics
      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("SIGNATURE HIGHLIGHTS", 15, 214);

      let hPos = 222;
      pkg.highlights.slice(0, 4).forEach((h: string) => {
        doc.setTextColor(230, 230, 230);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(`• ${h}`, 15, hPos);
        hPos += 5.5;
      });

      // Footer notice
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.3);
      doc.line(15, 275, 195, 275);

      doc.setTextColor(140, 140, 140);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.text("Yatra Vista • Luxury Goa Travel & AI Itineraries • Estimates subject to partner confirmations.", 15, 282);
      doc.text("Direct Desk: infoyatravista@gmail.com | +91 93076 75008 (WhatsApp & Call)", 15, 287);

      // Save PDF
      doc.save(`YatraVista-Proposal-${destinationName.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
      setDownloadReady(true);
    } catch (e) {
      console.error("PDF generation error:", e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <MagneticButton
        size="sm"
        variant="outline"
        onClick={handleGeneratePDF}
        disabled={isExporting}
      >
        {isExporting ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin text-coral-400" />
            <span>Drafting PDF Proposal...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-coral-400" />
            <span>Export Proposal PDF</span>
          </>
        )}
      </MagneticButton>
      {downloadReady && (
        <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched
        </span>
      )}
    </div>
  );
};
