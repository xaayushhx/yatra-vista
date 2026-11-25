"use client";

import React from "react";
import { Check, Star, Sparkles, Bed, Bookmark, PhoneCall } from "lucide-react";
import { AIPackageOption } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "../ui/MagneticButton";

interface PackageComparisonProps {
  packages: {
    economy: AIPackageOption;
    comfort: AIPackageOption;
    premium: AIPackageOption;
  };
  selectedTier: "Economy" | "Comfort" | "Premium";
  onSelectTier: (tier: "Economy" | "Comfort" | "Premium") => void;
  onSavePackage: (pkg: AIPackageOption) => void;
  onInquireBooking: (pkg: AIPackageOption) => void;
  onExportPDF?: (pkg: AIPackageOption) => void;
}

export const PackageComparison: React.FC<PackageComparisonProps> = ({
  packages,
  selectedTier,
  onSelectTier,
  onSavePackage,
  onInquireBooking,
  onExportPDF: _onExportPDF,
}) => {
  const tiers = [
    {
      key: "economy" as const,
      tier: "Economy" as const,
      pkg: packages.economy,
      badge: "Heritage Explorer",
      roman: "I",
      popular: false,
      accentBorder: "border-white/10 hover:border-coral-500/40",
      accentBg: "bg-surface-card/90",
    },
    {
      key: "comfort" as const,
      tier: "Comfort" as const,
      pkg: packages.comfort,
      badge: "Signature Luxury",
      roman: "II",
      popular: true,
      accentBorder: "border-coral-400 shadow-[0_0_35px_rgba(255,105,107,0.22)]",
      accentBg: "bg-surface",
    },
    {
      key: "premium" as const,
      tier: "Premium" as const,
      pkg: packages.premium,
      badge: "Imperial Palace & Yacht",
      roman: "III",
      popular: false,
      accentBorder: "border-white/15 hover:border-coral-500/40",
      accentBg: "bg-surface-card/90",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Editorial Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-500/10 border border-coral-500/30 text-coral-300 text-[10px] font-mono tracking-widest uppercase">
          <Sparkles className="w-3 h-3 text-coral-400" />
          <span>Compare Travel Packages · 3 Options</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-5xl text-white font-normal">
          Three Custom Packages, <span className="italic font-light coral-foil-text">Tailored to You.</span>
        </h3>
        <p className="text-xs sm:text-sm text-sand-300 font-light max-w-xl mx-auto leading-relaxed">
          Compare hotel stays, private transfers, dining, and activities side by side.
        </p>
      </div>

      {/* Side-by-Side 3-Column Luxury Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {tiers.map(({ key, tier, pkg, badge, roman, popular, accentBorder, accentBg }) => {
          const isSelected = selectedTier === tier;

          return (
            <div
              key={key}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 border backdrop-blur-xl ${accentBg} ${
                isSelected
                  ? "border-coral-400 shadow-[0_0_40px_rgba(255,105,107,0.25)] scale-[1.01]"
                  : accentBorder
              }`}
            >
              {/* Coveted Ribbon Badge */}
              {popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-coral-500 via-coral-400 to-coral-600 text-white text-[10px] uppercase tracking-widest font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <Star className="w-3 h-3 fill-current text-white" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                {/* Header Topline */}
                <div className="flex items-center justify-between mb-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-coral-400">
                      {roman}.
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-mono text-sand-400">
                      {badge}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-coral-500/20 text-coral-300 border border-coral-500/40 font-mono">
                      Active
                    </span>
                  )}
                </div>

                {/* Package Name */}
                <h4 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  {pkg.packageName}
                </h4>

                <p className="text-xs text-sand-300 font-light mt-2 line-clamp-2 leading-relaxed">
                  {pkg.tagline}
                </p>

                {/* Price Display */}
                <div className="my-6 pb-6 border-b border-white/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-sand-500 block mb-1">
                    Total Package Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-coral-400">
                      {formatCurrency(pkg.estimatedBudget, pkg.currency)}
                    </span>
                    <span className="text-xs text-sand-400 font-mono">
                      / {pkg.durationDays} Days
                    </span>
                  </div>
                  <span className="block text-[11px] text-sand-400/80 mt-1">
                    Includes hotel stay, private transfers & activities.
                  </span>
                </div>

                {/* Cost Breakdown Allocation Grid */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-sand-400 font-medium block">
                    Cost Breakdown:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-sand-300">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-sand-400">Hotel / Stay:</span>
                      <span className="font-mono text-white font-semibold">
                        {formatCurrency(pkg.costBreakdown.accommodation, pkg.currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-sand-400">Transfers:</span>
                      <span className="font-mono text-white font-semibold">
                        {formatCurrency(pkg.costBreakdown.transport, pkg.currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-sand-400">Food & Dining:</span>
                      <span className="font-mono text-white font-semibold">
                        {formatCurrency(pkg.costBreakdown.food, pkg.currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-sand-400">Activities:</span>
                      <span className="font-mono text-white font-semibold">
                        {formatCurrency(pkg.costBreakdown.activities, pkg.currency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accommodation Sanctuary Spec */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5 mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-coral-400">
                    <Bed className="w-3.5 h-3.5" />
                    <span>Hotel & Accommodation:</span>
                  </div>
                  <p className="text-xs text-white font-medium">
                    {pkg.accommodation.type}
                  </p>
                  <p className="text-[11px] text-sand-400 font-light leading-relaxed">
                    {pkg.accommodation.hotelSuggestions.join(" · ")}
                  </p>
                </div>

                {/* Signature Privileges */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-sand-400 font-semibold block">
                    Signature Inclusions:
                  </span>
                  <ul className="space-y-2">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-sand-200 font-light leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-coral-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <MagneticButton
                  variant={isSelected ? "primary" : "secondary"}
                  size="md"
                  onClick={() => onSelectTier(tier)}
                  className="w-full text-xs uppercase tracking-wider font-semibold"
                >
                  {isSelected ? "Selected Package" : `Select ${tier} Package`}
                </MagneticButton>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSavePackage(pkg)}
                    className="py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-coral-500/40 text-sand-300 hover:text-coral-300 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>

                  <button
                    onClick={() => onInquireBooking(pkg)}
                    className="py-2.5 rounded-xl border border-coral-500/30 bg-coral-500/10 hover:bg-coral-500/20 text-coral-300 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Inquire Now</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
