"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, ArrowLeft, Bookmark, Check, MapPin } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIPlannerForm } from "@/components/ai/AIPlannerForm";
import { PackageComparison } from "@/components/ai/PackageComparison";
import { ItineraryTimeline } from "@/components/ai/ItineraryTimeline";
import { ConversationalModifier } from "@/components/ai/ConversationalModifier";
import { ProposalExporter } from "@/components/ai/ProposalExporter";
import { BookingModal } from "@/components/booking/BookingModal";
import { TripPreferences, AIGeneratedTripResponse, AIPackageOption } from "@/types";
import { savePackage } from "@/lib/storage";

function AIPlannerContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [tripData, setTripData] = useState<AIGeneratedTripResponse | null>(null);
  const [selectedTier, setSelectedTier] = useState<"Economy" | "Comfort" | "Premium">("Comfort");
  const [activePackage, setActivePackage] = useState<AIPackageOption | null>(null);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Cycling loading steps for luxury feel
  const LOADING_STEPS = [
    "Consulting Arabian Sea tidal charts & coastal bathymetry...",
    "Querying Portuguese heritage estates and private cliffside villas...",
    "Designing Michelin-calibrated dining reservations...",
    "Calibrating travel pace across South and North Goa waypoints...",
    "Harmonizing 3 bespoke budget tiers: Smart, Signature & Imperial..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGeneratePackages = async (prefs: TripPreferences) => {
    setIsLoading(true);
    setTripData(null);
    try {
      const res = await fetch("/api/ai/generate-packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setTripData(json.data);
        setSelectedTier("Comfort");
        setActivePackage(json.data.packages.comfort);
      }
    } catch (err) {
      console.error("AI Generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTierChange = (tier: "Economy" | "Comfort" | "Premium") => {
    setSelectedTier(tier);
    if (!tripData) return;
    if (tier === "Economy") setActivePackage(tripData.packages.economy);
    else if (tier === "Comfort") setActivePackage(tripData.packages.comfort);
    else if (tier === "Premium") setActivePackage(tripData.packages.premium);
  };

  const handleSaveCurrentPackage = (pkg: AIPackageOption) => {
    savePackage(pkg);
    setSavedNotification(`Saved "${pkg.packageName}" to your private sanctuaries!`);
    setTimeout(() => setSavedNotification(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#011f26] text-[#F4EFEA] flex flex-col justify-between selection:bg-coral-500/30 selection:text-coral-200">
      <Header onOpenBooking={() => setBookingModalOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-36 pb-28 space-y-16">
        {/* Editorial Masthead */}
        <div className="space-y-6 border-b border-white/10 pb-12 relative">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sand-400 hover:text-coral-300 transition-colors uppercase tracking-wider font-mono text-[11px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>

            <div className="flex items-center gap-4 text-[11px] font-mono text-sand-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-coral-400" />
                GOA REGION · 15.2993° N, 74.1240° E
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="hidden sm:inline text-coral-300">
                AI TRIP PLANNER
              </span>
            </div>
          </div>

          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-coral-500/10 border border-coral-500/30 text-coral-300 text-[11px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-coral-400 animate-pulse" />
              <span>Smart Itinerary Planner · AI Travel Engine</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.05]">
              Custom Goa <span className="italic font-light coral-foil-text">AI Trip Planner.</span>
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-sand-300 max-w-3xl font-light leading-relaxed">
              "Plan your perfect Goa trip in seconds. Generate three customized travel packages tailored to your budget, travel dates, and personal style."
            </p>
          </div>
        </div>

        {/* 1. Trip Preferences Collection Form */}
        <AIPlannerForm
          initialPrompt={initialPrompt}
          onGenerate={handleGeneratePackages}
          isLoading={isLoading}
        />

        {/* Loading Indicator State with Poetic Travel Synthesis Steps */}
        {isLoading && (
          <div className="p-16 rounded-3xl bg-[#002d37] border border-coral-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />
            
            {/* Concentric Pulsing Coral Rings */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-coral-500/40 animate-ping opacity-60" />
              <div className="absolute inset-2 rounded-full border border-coral-400/30 animate-pulse" />
              <div className="w-12 h-12 rounded-full bg-coral-500/10 border border-coral-500/50 flex items-center justify-center text-coral-400">
                <Sparkles className="w-6 h-6 animate-spin text-coral-400" />
              </div>
            </div>

            <div className="space-y-2 max-w-lg mx-auto relative z-10">
              <span className="text-[10px] uppercase font-mono tracking-ultra text-coral-400 font-bold block">
                AI Travel Engine Working
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                Creating Your Custom Goa Itinerary
              </h3>
              <p className="text-xs sm:text-sm text-coral-300/90 font-mono min-h-[3rem] flex items-center justify-center transition-all duration-500 leading-relaxed">
                "{LOADING_STEPS[loadingStep]}"
              </p>
            </div>
          </div>
        )}

        {/* Saved Notification Banner */}
        {savedNotification && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 backdrop-blur-md">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{savedNotification}</span>
          </div>
        )}

        {/* 2. Generated Packages & Comparison Section */}
        {tripData && activePackage && (
          <div className="space-y-16 pt-12 border-t border-white/10">
            {/* Package Comparison Grid */}
            <PackageComparison
              packages={tripData.packages}
              selectedTier={selectedTier}
              onSelectTier={handleTierChange}
              onSavePackage={handleSaveCurrentPackage}
              onInquireBooking={() => setBookingModalOpen(true)}
              onExportPDF={() => {}}
            />

            {/* Active Package Action Bar */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#002d37] border border-coral-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-md">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-ultra text-coral-400 block font-semibold">
                  Selected Itinerary Edition: {activePackage.packageType}
                </span>
                <h4 className="font-serif text-2xl text-white font-medium">
                  {activePackage.packageName}
                </h4>
                <p className="text-xs text-sand-400 font-light">
                  {activePackage.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <ProposalExporter
                  pkg={activePackage}
                  destinationName={tripData.tripOverview.destination}
                />
                <button
                  onClick={() => handleSaveCurrentPackage(activePackage)}
                  className="px-5 py-2.5 rounded-full border border-white/10 bg-[#003642] hover:border-coral-500/40 text-xs text-sand-300 hover:text-coral-300 flex items-center gap-2 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Package</span>
                </button>
              </div>
            </div>

            {/* Interactive Timeline & Curated Activity Studio */}
            <ItineraryTimeline
              itinerary={activePackage.itinerary}
              currency={activePackage.currency}
              onUpdateItinerary={(updatedItinerary) => {
                const updated = {
                  ...activePackage,
                  itinerary: updatedItinerary,
                };
                setActivePackage(updated);
                if (tripData) {
                  const tierKey = selectedTier.toLowerCase() as "economy" | "comfort" | "premium";
                  setTripData({
                    ...tripData,
                    packages: {
                      ...tripData.packages,
                      [tierKey]: updated,
                    },
                  });
                }
              }}
            />

            {/* Conversational AI Modifier */}
            <ConversationalModifier
              currentPackage={activePackage}
              onPackageUpdated={(updated) => {
                setActivePackage(updated);
                if (tripData) {
                  const tierKey = selectedTier.toLowerCase() as "economy" | "comfort" | "premium";
                  setTripData({
                    ...tripData,
                    packages: {
                      ...tripData.packages,
                      [tierKey]: updated,
                    },
                  });
                }
              }}
            />
          </div>
        )}
      </main>

      <Footer />

      {/* Booking Modal */}
      {activePackage && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          initialPackageTitle={activePackage.packageName}
          initialDestination={tripData?.tripOverview.destination || "Cabo de Rama & South Goa"}
          initialPrice={activePackage.estimatedBudget}
          initialTier={activePackage.packageType}
        />
      )}
    </div>
  );
}

export default function AIPlannerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#011f26] text-white p-12">Loading AI Trip Planner...</div>}>
      <AIPlannerContent />
    </Suspense>
  );
}
