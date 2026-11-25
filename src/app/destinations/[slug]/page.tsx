"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Sparkles, 
  Utensils, 
  Bed, 
  Sun, 
  Thermometer, 
  Check
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingModal } from "@/components/booking/BookingModal";
import { DESTINATIONS, FEATURED_PACKAGES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Destination, TravelPackage } from "@/types";

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" 
    ? params.slug 
    : Array.isArray(params?.slug) 
      ? params.slug[0] 
      : "";

  const destination: Destination | undefined = DESTINATIONS.find((d) => d.id === slug);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#011f26] text-white flex flex-col items-center justify-center space-y-4">
        <h2 className="text-3xl font-serif">Sanctuary Not Found</h2>
        <Link href="/destinations" className="text-coral-400 underline text-sm">
          Return to Sanctuary Atlas
        </Link>
      </div>
    );
  }

  // Narrowed reference for guaranteed non-null typing across closures
  const currentDest: Destination = destination;

  const relatedPackages: TravelPackage[] = FEATURED_PACKAGES.filter((p) =>
    p.destination.toLowerCase().includes(currentDest.name.toLowerCase().split(" ")[0])
  );

  return (
    <div className="min-h-screen bg-[#011f26] text-[#F4EFEA] flex flex-col justify-between selection:bg-coral-500/30 selection:text-coral-200">
      <Header onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Cinematic Full-Bleed Destination Hero */}
      <section className="relative h-[75vh] min-h-[560px] w-full flex items-end pb-20 overflow-hidden">
        <Image
          src={currentDest.heroImage}
          alt={currentDest.name}
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient opacity-30" />

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 space-y-5">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-xs text-sand-300 hover:text-white transition-colors font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sanctuary Atlas
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider font-semibold bg-coral-500/20 text-coral-300 border border-coral-500/30">
              {currentDest.country}
            </span>
            <span className="text-xs text-sand-400 font-mono">
              {currentDest.coordinates[0]}° N, {currentDest.coordinates[1]}° E · Arabian Sea Basin
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-normal text-white tracking-tight leading-[1.02]">
            {currentDest.name}
          </h1>

          <p className="font-serif italic text-xl sm:text-3xl text-coral-300 font-light max-w-3xl leading-relaxed">
            "{currentDest.tagline}"
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-7xl w-full mx-auto px-6 md:px-12 py-16 space-y-24">
        {/* Narrative Essence & Sanctuary Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-ultra text-coral-400 font-bold block">
                Topographic Essay
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                The Essence of {currentDest.name}
              </h2>
              <p className="text-sand-300 text-base sm:text-lg font-light leading-relaxed">
                {currentDest.longDescription}
              </p>
            </div>

            {/* Signature Privileges */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-white/10 space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-wider text-coral-400 font-semibold">
                Signature Sanctuary Privileges:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentDest.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-sand-200 font-light leading-relaxed">
                    <Check className="w-4 h-4 text-coral-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meteorological & Sanctuary Telemetry Sidebar */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-surface border border-coral-500/30 space-y-6 shadow-2xl backdrop-blur-xl">
            <h3 className="font-serif text-2xl text-white font-medium border-b border-white/10 pb-4">
              Sanctuary Telemetry
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-sand-400 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-coral-400" /> Temperature
                </span>
                <span className="font-mono text-white font-semibold">{currentDest.weather.temp}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sand-400 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-coral-400" /> Climate Condition
                </span>
                <span className="text-white font-medium">{currentDest.weather.condition}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sand-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-coral-400" /> Prime Season
                </span>
                <span className="text-coral-300 font-semibold">{currentDest.bestSeason}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sand-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-coral-400" /> Ideal Duration
                </span>
                <span className="text-white font-medium">{currentDest.idealDuration}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-sand-400">Curated Starting Price</span>
                <span className="font-serif text-2xl text-coral-400 font-bold">
                  {formatCurrency(currentDest.startingPrice)}
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Link href={`/ai-planner?prompt=${encodeURIComponent(`Plan a bespoke luxury journey to ${currentDest.name}`)}`}>
                <MagneticButton size="md" variant="primary" className="w-full">
                  <Sparkles className="w-4 h-4 mr-1 text-white" />
                  Plan {currentDest.name} with AI
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Attractions Gallery */}
        <div className="space-y-8">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-ultra text-coral-400 font-bold block mb-1">
              Topographic Waypoints
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              Revered Regional Attractions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentDest.attractions.map((att: { name: string; description: string; image: string }, idx: number) => (
              <div key={idx} className="rounded-3xl overflow-hidden bg-surface border border-white/10 group flex flex-col justify-between">
                <div>
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={att.image}
                      alt={att.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="font-serif text-xl text-white font-medium group-hover:text-coral-300 transition-colors">
                      {att.name}
                    </h4>
                    <p className="text-xs text-sand-300 font-light leading-relaxed">
                      {att.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lodging & Gastronomy Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lodging Recommendations */}
          <div className="p-8 rounded-3xl bg-surface border border-white/10 space-y-5">
            <div className="flex items-center gap-2.5 text-coral-400">
              <Bed className="w-5 h-5" />
              <h3 className="font-serif text-2xl text-white font-medium">
                Vetted Sanctuaries & Suites
              </h3>
            </div>
            <p className="text-xs text-sand-400 font-light leading-relaxed">
              Personally inspected properties offering discretion, Michelin-level gastronomy, and architectural reverence.
            </p>
            <div className="space-y-3 pt-2">
              {currentDest.stayRecommendations.map((stay: { name: string; type: string; priceRange: string }, idx: number) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-semibold text-white">{stay.name}</h5>
                    <span className="text-[10px] text-sand-400">{stay.type}</span>
                  </div>
                  <span className="font-mono text-xs text-coral-400 font-medium">{stay.priceRange}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Gastronomy */}
          <div className="p-8 rounded-3xl bg-surface border border-white/10 space-y-5">
            <div className="flex items-center gap-2.5 text-coral-400">
              <Utensils className="w-5 h-5" />
              <h3 className="font-serif text-2xl text-white font-medium">
                Culinary Heritage & Wine
              </h3>
            </div>
            <p className="text-xs text-sand-400 font-light leading-relaxed">
              Centuries of epicurean mastery prepared by Michelin-awarded masters and family-owned cliffside cellars.
            </p>
            <div className="space-y-2.5 pt-2">
              {currentDest.cuisine.map((dish: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-sand-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-400 shrink-0" />
                  <span>{dish}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Tips Checklist */}
        <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-coral-500/20 space-y-4">
          <span className="text-[10px] uppercase font-mono tracking-ultra text-coral-400 font-bold block">
            Local Travel Tips
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            Essential Advice for Travelers
          </h3>
          <ul className="space-y-3 pt-2">
            {currentDest.travelTips.map((tip: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-sand-300 font-light leading-relaxed">
                <Check className="w-4 h-4 text-coral-400 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Travel Packages */}
        {relatedPackages.length > 0 && (
          <div className="space-y-8 pt-8 border-t border-white/10">
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
              Curated Packages for {currentDest.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPackages.map((pkg: TravelPackage) => (
                <div key={pkg.id} className="p-6 sm:p-8 rounded-3xl bg-surface border border-white/10 flex flex-col justify-between space-y-5">
                  <div>
                    <span className="text-[10px] text-coral-400 font-mono uppercase tracking-wider">{pkg.category} Edition</span>
                    <h4 className="font-serif text-2xl text-white font-medium mt-1">{pkg.title}</h4>
                    <p className="text-xs text-sand-300 font-light mt-2 line-clamp-2 leading-relaxed">{pkg.overview}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="font-serif text-2xl font-bold text-coral-400">{formatCurrency(pkg.price)}</span>
                    <Link href={`/packages/${pkg.id}`}>
                      <MagneticButton size="sm" variant="secondary">View Details</MagneticButton>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackageTitle={`Bespoke Expedition to ${currentDest.name}`}
        initialDestination={currentDest.name}
        initialPrice={currentDest.startingPrice}
      />
    </div>
  );
}
