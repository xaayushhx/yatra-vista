"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Compass,
  Wand2,
  ArrowRight,
  Check,
  Shield,
  Layers
} from "lucide-react";
import { TripPreferences, TravelStyle, TravelPace } from "@/types";
import { MagneticButton } from "../ui/MagneticButton";
import { formatCurrency } from "@/lib/utils";

const GOA_REGIONS = [
  {
    name: "Cabo de Rama & South Goa",
    tagline: "Clifftops, hidden coves & quiet coconut groves",
    badge: "Secluded Luxury",
  },
  {
    name: "Fontainhas & The Latin Quarter",
    tagline: "18th-century Portuguese heritage & Fado acoustics",
    badge: "Heritage & Art",
  },
  {
    name: "Assagao & North Goa Riviera",
    tagline: "Haute cuisine villas, banyans & sunset clubs",
    badge: "Bohemian Chic",
  },
  {
    name: "Divar Island & Mandovi Backwaters",
    tagline: "Island river ferries, mangroves & bird sanctuaries",
    badge: "Riverine Escape",
  },
  {
    name: "Ashvem & Morjim Coastal Dunes",
    tagline: "Pristine white sands, turtle dunes & private shacks",
    badge: "Barefoot Luxury",
  },
  {
    name: "Ponda Spice Groves & Dudhsagar",
    tagline: "Ancient cardamom estates & tiered mountain falls",
    badge: "Nature & Spices",
  },
];

const TRAVEL_STYLES: { id: TravelStyle; label: string; icon: string }[] = [
  { id: "Luxury", label: "Palatial Luxury", icon: "✦" },
  { id: "Romantic", label: "Couples & Romance", icon: "❦" },
  { id: "Cultural", label: "Latin Heritage & Art", icon: "🏛" },
  { id: "Relaxation", label: "Wellness & Ayurvedic", icon: "🌿" },
  { id: "Beaches", label: "Private Coastal Shacks", icon: "⛱" },
  { id: "Adventure", label: "Yachting & Coastal Trails", icon: "⛵" },
  { id: "Nature and wildlife", label: "Mangroves & Spice Groves", icon: "𓆉" },
  { id: "Family", label: "Multi-Generation Haven", icon: "◈" },
  { id: "Solo", label: "Contemplative Retreat", icon: "✧" },
  { id: "Budget", label: "Heritage Explorer", icon: "⌂" },
];

const PACES: { pace: TravelPace; title: string; subtitle: string }[] = [
  { pace: "Relaxed", title: "Unhurried Siesta", subtitle: "1-2 activities / day with leisurely sunsets" },
  { pace: "Moderate", title: "Curated Discovery", subtitle: "Balanced exploration with evening culinary stops" },
  { pace: "Intensive", title: "Immersive Expedition", subtitle: "Full-day cultural & sightseeing activities" },
];

const QUICK_PROMPTS = [
  "5-day romantic hideaway at Cabo de Rama cliffs with private sunset yacht & seafood dining",
  "Fontainhas Latin Quarter heritage walk, ceramic tile atelier & private Portuguese Fado dinner",
  "Assagao haute cuisine tasting tour, boutique heritage villa & sunset cocktails at Vagator cliffs",
  "Mandovi River backwaters catamaran cruise, Divar Island birding & organic spice plantation lunch",
];

interface AIPlannerFormProps {
  initialPrompt?: string;
  onGenerate: (prefs: TripPreferences) => void;
  isLoading: boolean;
}

export const AIPlannerForm: React.FC<AIPlannerFormProps> = ({
  initialPrompt = "",
  onGenerate,
  isLoading,
}) => {
  const [naturalText, setNaturalText] = useState(initialPrompt);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionFeedback, setExtractionFeedback] = useState<{
    destination: string;
    duration: number;
    budget: number;
  } | null>(null);

  // Structured Form States
  const [destination, setDestination] = useState("Cabo de Rama & South Goa");
  const [startingLocation, setStartingLocation] = useState("Mumbai, India");
  const [durationDays, setDurationDays] = useState(5);
  const [startDate, setStartDate] = useState("2026-12-15");
  const [endDate] = useState("2026-12-20");
  const [flexibleDates] = useState(true);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(150000);
  const [currency] = useState("INR");
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("Luxury");
  const [travelPace, setTravelPace] = useState<TravelPace>("Relaxed");
  const [accommodationPreference, setAccommodationPreference] = useState("Beachfront Heritage Villa / 5-Star Haven");
  const [foodPreference, setFoodPreference] = useState("Fresh Seafood & Indo-Portuguese Gastronomy");
  const [transportPreference] = useState("Private Chauffeur SUV & River Yacht");
  const [specialRequirements, setSpecialRequirements] = useState("");

  const handleExtractFromNaturalText = async (textToUse?: string) => {
    const promptToExtract = textToUse || naturalText;
    if (!promptToExtract.trim()) return;
    setIsExtracting(true);
    try {
      const res = await fetch("/api/ai/extract-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToExtract }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        if (d.destination) setDestination(d.destination);
        if (d.startingLocation) setStartingLocation(d.startingLocation);
        if (d.durationDays) setDurationDays(d.durationDays);
        if (d.budget) setBudget(d.budget);
        if (d.travelers) setTravelers(d.travelers);
        if (d.travelStyle) setTravelStyle(d.travelStyle);

        setExtractionFeedback({
          destination: d.destination || destination,
          duration: d.durationDays || durationDays,
          budget: d.budget || budget,
        });
      }
    } catch (e) {
      console.error("Extraction error:", e);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleQuickPromptClick = (prompt: string) => {
    setNaturalText(prompt);
    handleExtractFromNaturalText(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      destination,
      startingLocation,
      startDate,
      endDate,
      flexibleDates,
      durationDays,
      travelers,
      adults: travelers,
      children: 0,
      budget,
      currency,
      travelStyle,
      travelPace,
      accommodationPreference,
      foodPreference,
      transportPreference,
      preferredActivities: [travelStyle, "Coastal Yachting", "Goan Gastronomy"],
      specialRequirements,
      rawPrompt: naturalText,
    });
  };

  return (
    <div className="relative rounded-3xl bg-surface/90 border border-coral-500/30 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-coral-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-ocean-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* SECTION I: Conversational Natural Language Engine */}
      <div className="mb-12 pb-10 border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-ultra font-semibold text-coral-400">
            <span className="font-mono text-coral-500">I.</span>
            <Wand2 className="w-3.5 h-3.5 text-coral-400" />
            <span>Describe Your Trip with AI</span>
          </div>
          <span className="editorial-badge text-[10px] bg-coral-500/10 border-coral-500/30 text-coral-300">
            AI Trip Planner
          </span>
        </div>

        <p className="font-serif italic text-lg sm:text-xl text-[#F4EFEA] mb-4 font-light">
          "Describe your dream Goa trip in simple words, and our AI will create your customized itinerary."
        </p>

        {/* Input & Action */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={naturalText}
              onChange={(e) => setNaturalText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleExtractFromNaturalText();
              }}
              placeholder="e.g. 5 days in South Goa with my partner, private yacht at Cabo de Rama, budget ₹1,50,000..."
              className="w-full bg-surface-card border border-white/15 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-sand-500/70 focus:outline-none focus:border-coral-400/80 transition-all font-light"
            />
          </div>
          <button
            type="button"
            onClick={() => handleExtractFromNaturalText()}
            disabled={isExtracting || !naturalText.trim()}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-400 hover:to-coral-500 text-white font-semibold text-xs uppercase tracking-wider disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-coral-500/20 shrink-0"
          >
            {isExtracting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-white" />
                <span>Analyzing Request...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Auto-Plan with AI</span>
              </>
            )}
          </button>
        </div>

        {/* Extraction Confirmation Banner */}
        {extractionFeedback && (
          <div className="mt-4 p-4 rounded-2xl bg-coral-500/10 border border-coral-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-coral-200 animate-fadeIn backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-coral-500/20 text-coral-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-coral-400 block font-semibold">
                  Trip Details Detected
                </span>
                <span>
                  Destination: <strong className="text-white">{extractionFeedback.destination}</strong> • Duration: <strong className="text-white">{extractionFeedback.duration} Days</strong> • Budget: <strong className="text-white">{formatCurrency(extractionFeedback.budget)}</strong>
                </span>
              </div>
            </div>
            <a
              href="#configuration-sections"
              className="px-3.5 py-1.5 rounded-full bg-[#003642] hover:bg-[#004d5d] border border-coral-500/30 text-coral-300 hover:text-white transition-colors text-center text-[11px] font-mono shrink-0"
            >
              Review Settings Below ↓
            </a>
          </div>
        )}

        {/* Quick prompt inspirations */}
        <div className="mt-4 pt-3 space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-wider text-sand-500 block">
            Curated Inspiration Prompts (Click to populate):
          </span>
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => handleQuickPromptClick(prompt)}
                className="text-left text-[11px] px-3.5 py-1.5 rounded-full bg-surface-raised hover:bg-surface-raised/80 border border-white/10 hover:border-coral-500/40 text-sand-300 hover:text-coral-200 transition-all flex items-center gap-1.5 line-clamp-1"
              >
                <span className="text-coral-400 text-xs">✦</span>
                <span className="truncate max-w-xs md:max-w-md">{prompt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Configuration Form */}
      <form id="configuration-sections" onSubmit={handleSubmit} className="space-y-12">
        {/* SECTION II: Destination Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-ultra font-semibold text-coral-400">
              <span className="font-mono text-coral-500">II.</span>
              <MapPin className="w-3.5 h-3.5 text-coral-400" />
              <span>Choose Goa Destination</span>
            </div>
            <span className="text-xs text-sand-400 font-mono">
              Selected: <strong className="text-coral-300">{destination}</strong>
            </span>
          </div>

          {/* Luxury Region Radio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {GOA_REGIONS.map((region) => {
              const isSelected = destination === region.name;
              return (
                <button
                  type="button"
                  key={region.name}
                  onClick={() => setDestination(region.name)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between ${isSelected
                    ? "bg-coral-500/10 border-coral-400 shadow-[0_0_20px_rgba(255,105,107,0.18)]"
                    : "bg-surface-card/80 border-white/10 hover:border-coral-500/40 hover:bg-surface-raised"
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-sand-400 border border-white/5">
                        {region.badge}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-coral-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-serif text-base text-white font-medium group-hover:text-coral-300 transition-colors">
                      {region.name}
                    </h4>
                    <p className="text-[11px] text-sand-400 font-light mt-1 leading-relaxed">
                      {region.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION III: Dates, Travelers & Budget */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-ultra font-semibold text-coral-400">
            <span className="font-mono text-coral-500">III.</span>
            <Compass className="w-3.5 h-3.5 text-coral-400" />
            <span>Dates, Travelers & Budget</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Origin City */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider text-sand-400 font-medium">
                Departure City
              </label>
              <div className="relative">
                <Compass className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={startingLocation}
                  onChange={(e) => setStartingLocation(e.target.value)}
                  required
                  placeholder="e.g. Mumbai, New Delhi, London"
                  className="w-full bg-surface-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-coral-400"
                />
              </div>
            </div>

            {/* Arrival Date */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider text-sand-400 font-medium">
                Arrival Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-surface-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-coral-400"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider text-sand-400 font-medium">
                Travelers ({travelers} Guests)
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-surface-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-coral-400"
                />
              </div>
            </div>

            {/* Duration Slider with Large Numeral */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-surface-card border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-sand-400">
                <span>Duration</span>
                <span className="font-serif text-lg font-bold text-coral-400">
                  {durationDays} Days / {durationDays - 1} Nights
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="accent-coral-500 w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Budget Calibration Bar */}
          <div className="p-6 rounded-2xl bg-surface-card border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-sand-400 block font-medium">
                  Total Trip Budget (INR)
                </label>
                <span className="text-xs text-sand-500 font-light">
                  Includes hotel stay, private transfers & curated activities.
                </span>
              </div>
              <div className="text-right">
                <span className="font-serif text-3xl font-bold text-coral-400 tracking-tight">
                  {formatCurrency(budget, currency)}
                </span>
                <span className="block text-[10px] text-sand-500">
                  ~ {formatCurrency(Math.round(budget / durationDays), currency)} / day total
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs text-sand-500 font-mono">₹50K</span>
              <input
                type="range"
                min={50000}
                max={600000}
                step={10000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="flex-1 accent-coral-500 cursor-pointer"
              />
              <span className="text-xs text-sand-500 font-mono">₹600K</span>
            </div>
          </div>
        </div>

        {/* SECTION IV: Atmosphere, Style & Pace */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-ultra font-semibold text-coral-400">
            <span className="font-mono text-coral-500">IV.</span>
            <Layers className="w-3.5 h-3.5 text-coral-400" />
            <span>Travel Style & Daily Pace</span>
          </div>

          {/* Travel Style Selector */}
          <div className="space-y-3">
            <label className="block text-[11px] uppercase tracking-wider text-sand-400 font-medium">
              Travel Style & Interests
            </label>
            <div className="flex flex-wrap gap-2.5">
              {TRAVEL_STYLES.map((st) => {
                const isSelected = travelStyle === st.id;
                return (
                  <button
                    type="button"
                    key={st.id}
                    onClick={() => setTravelStyle(st.id)}
                    className={`px-4 py-2 rounded-full text-xs transition-all duration-300 flex items-center gap-2 ${isSelected
                      ? "bg-coral-500 text-white font-semibold shadow-lg shadow-coral-500/20"
                      : "bg-surface-card border border-white/10 text-sand-300 hover:text-white hover:border-coral-500/40"
                      }`}
                  >
                    <span>{st.icon}</span>
                    <span>{st.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pace Selector */}
          <div className="space-y-3">
            <label className="block text-[11px] uppercase tracking-wider text-sand-400 font-medium">
              Daily Pace
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PACES.map((p) => {
                const isSelected = travelPace === p.pace;
                return (
                  <button
                    type="button"
                    key={p.pace}
                    onClick={() => setTravelPace(p.pace)}
                    className={`p-4 rounded-2xl text-left border transition-all ${isSelected
                      ? "bg-coral-500/10 border-coral-400"
                      : "bg-surface-card border border-white/10 hover:border-coral-500/40"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-semibold text-white">
                        {p.title}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-coral-500 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-sand-400 font-light block">
                      {p.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bespoke Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase tracking-wider text-sand-400 font-medium">
                Hotel & Stay Preference
              </label>
              <input
                type="text"
                value={accommodationPreference}
                onChange={(e) => setAccommodationPreference(e.target.value)}
                className="w-full bg-surface-card border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-coral-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase tracking-wider text-sand-400 font-medium">
                Food & Dining Focus
              </label>
              <input
                type="text"
                value={foodPreference}
                onChange={(e) => setFoodPreference(e.target.value)}
                className="w-full bg-surface-card border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-coral-400"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider text-sand-400 font-medium">
              Special Requests & Add-ons
            </label>
            <textarea
              rows={2}
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              placeholder="e.g. Private sunset yacht with champagne, anniversary celebration, vintage convertible rental, wheelchair accessible routes..."
              className="w-full bg-surface-card border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-sand-600 focus:outline-none focus:border-coral-400"
            />
          </div>
        </div>

        {/* Action Callout */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-xs text-sand-300">
            <Shield className="w-5 h-5 text-coral-400 shrink-0" />
            <span className="font-light">
              Generates three custom packages: <strong className="text-white">Smart Heritage</strong>, <strong className="text-coral-300">Signature Luxury</strong>, and <strong className="text-coral-400">Imperial Villa & Yacht</strong>.
            </span>
          </div>

          <MagneticButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                Creating Your Goa Packages...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Generate 3 Custom Packages
                <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            )}
          </MagneticButton>
        </div>
      </form>
    </div>
  );
};
