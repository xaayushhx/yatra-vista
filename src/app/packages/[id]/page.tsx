"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Star, 
  Check, 
  X, 
  Sparkles
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingModal } from "@/components/booking/BookingModal";
import { FEATURED_PACKAGES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

import { TravelPackage } from "@/types";

export default function PackageDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" 
    ? params.id 
    : Array.isArray(params?.id) 
      ? params.id[0] 
      : "";

  const pkg: TravelPackage | undefined = FEATURED_PACKAGES.find((p) => p.id === id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#011f26] text-white flex flex-col items-center justify-center space-y-4">
        <h2 className="text-3xl font-serif">Package Not Found</h2>
        <Link href="/packages" className="text-coral-400 underline text-sm">
          Return to Packages
        </Link>
      </div>
    );
  }

  const currentPkg: TravelPackage = pkg;

  return (
    <div className="min-h-screen bg-[#011f26] text-[#F4EFEA] flex flex-col justify-between selection:bg-coral-500/30 selection:text-coral-200">
      <Header onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative h-[70vh] min-h-[520px] w-full flex items-end pb-20 overflow-hidden">
        <Image
          src={currentPkg.heroImage}
          alt={currentPkg.title}
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/60 to-transparent" />

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 space-y-5">
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-xs text-sand-300 hover:text-white transition-colors font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Packages
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider font-semibold bg-coral-500/20 text-coral-300 border border-coral-500/30">
              {currentPkg.category} Edition
            </span>
            <div className="flex items-center gap-1 text-coral-400 text-xs font-semibold font-mono">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{currentPkg.rating} ({currentPkg.reviewsCount} verified guests)</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-normal text-white tracking-tight leading-[1.05]">
            {currentPkg.title}
          </h1>

          <p className="text-xs sm:text-sm text-sand-300 flex items-center gap-4 font-mono">
            <span>{currentPkg.destination}, {currentPkg.country}</span>
            <span>•</span>
            <span>{currentPkg.duration}</span>
          </p>
        </div>
      </section>

      {/* Content Body */}
      <main className="max-w-7xl w-full mx-auto px-6 md:px-12 py-16 space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Itinerary and Details */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-ultra text-coral-400 font-bold block mb-2">
                Trip Overview
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium mb-4">
                Trip Details
              </h2>
              <p className="text-sand-300 text-base sm:text-lg font-light leading-relaxed">
                {currentPkg.overview}
              </p>
            </div>

            {/* Highlights */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-white/10 space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-wider text-coral-400 font-semibold">
                Package Highlights:
              </h4>
              <ul className="space-y-3">
                {currentPkg.highlights.map((h: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-sand-200 font-light leading-relaxed">
                    <Check className="w-4 h-4 text-coral-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Day by Day Summary */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  Choreographed Daily Itinerary
                </h3>
                <span className="text-xs font-mono text-sand-400">
                  {currentPkg.duration}
                </span>
              </div>

              <div className="space-y-4">
                {currentPkg.itinerarySummary.map((day: { day: number; title: string; desc: string }) => (
                  <div key={day.day} className="p-6 rounded-2xl bg-surface border border-white/5 flex gap-5 items-start">
                    <div className="w-12 h-12 rounded-xl bg-coral-500/10 border border-coral-500/30 text-coral-400 font-mono font-bold flex items-center justify-center shrink-0 text-base">
                      0{day.day}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-serif font-medium text-white">{day.title}</h4>
                      <p className="text-xs sm:text-sm text-sand-300 font-light leading-relaxed">
                        {day.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-white/5">
              <div className="p-6 rounded-2xl bg-surface border border-white/5 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                  Included Privileges:
                </h4>
                <ul className="space-y-2 text-xs text-sand-300">
                  {currentPkg.included.map((inc: string, i: number) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-white/5 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-wider text-sand-500 font-semibold">
                  Personal Exclusions:
                </h4>
                <ul className="space-y-2 text-xs text-sand-400">
                  {currentPkg.excluded.map((exc: string, i: number) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <X className="w-3.5 h-3.5 text-sand-500 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Sticky Investment & Booking Card */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-surface border border-coral-500/30 space-y-6 shadow-2xl backdrop-blur-xl sticky top-28">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-sand-400 block mb-1">
                Estimated All-Inclusive Investment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-coral-400">
                  {formatCurrency(currentPkg.price)}
                </span>
                {currentPkg.originalPrice && (
                  <span className="line-through text-xs text-sand-500 font-mono">
                    {formatCurrency(currentPkg.originalPrice)}
                  </span>
                )}
              </div>
              <span className="block text-[11px] text-sand-500 mt-1">
                Per guest • Based on double occupancy
              </span>
            </div>

            <div className="space-y-3 text-xs pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sand-400">Duration</span>
                <span className="text-white font-medium">{currentPkg.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sand-400">Category</span>
                <span className="text-coral-300 font-medium">{currentPkg.category} Edition</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sand-400">Escrow Guarantee</span>
                <span className="text-white font-medium">100% Protected</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => setBookingModalOpen(true)}
                className="w-full text-xs uppercase tracking-wider font-semibold"
              >
                Inquire Voyage
              </MagneticButton>

              <Link href={`/ai-planner?prompt=${encodeURIComponent(`Customize the ${currentPkg.title} package for me`)}`}>
                <MagneticButton size="sm" variant="outline" className="w-full">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-coral-400" /> Customize with AI
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackageTitle={currentPkg.title}
        initialDestination={currentPkg.destination}
        initialPrice={currentPkg.price}
      />
    </div>
  );
}
