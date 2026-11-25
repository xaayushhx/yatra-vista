"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { DESTINATIONS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

export const DiscoverWorld: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextDestination = () => {
    setActiveIndex((prev) => (prev + 1) % DESTINATIONS.length);
  };

  const prevDestination = () => {
    setActiveIndex((prev) => (prev - 1 + DESTINATIONS.length) % DESTINATIONS.length);
  };

  const active = DESTINATIONS[activeIndex];

  return (
    <section id="sanctuaries" className="relative py-28 bg-[#011f26] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-coral-500/5 blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Haute Couture Editorial Art Direction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-ultra text-coral-400 font-semibold mb-3">
              <Compass className="w-4 h-4" />
              <span>Section 02 — The Sanctuary Registry</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight">
              Curated Coastal Enclaves <br />
              <span className="font-serif italic font-normal coral-foil-text">
                Beyond Conventional Maps.
              </span>
            </h2>
          </div>

          {/* Navigation Controls & Index */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-coral-400 font-bold">{ROMAN_NUMERALS[activeIndex]}</span>
              <span className="text-sand-600">/</span>
              <span className="text-sand-400">{ROMAN_NUMERALS[DESTINATIONS.length - 1]}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevDestination}
                aria-label="Previous sanctuary"
                className="w-11 h-11 rounded-full border border-white/10 bg-surface/60 flex items-center justify-center text-white hover:border-coral-400 hover:text-coral-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextDestination}
                aria-label="Next sanctuary"
                className="w-11 h-11 rounded-full border border-white/10 bg-surface/60 flex items-center justify-center text-white hover:border-coral-400 hover:text-coral-300 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Hero Display (Asymmetrical Editorial Magazine Composition) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Full-Height Photography with Floating Badges */}
          <div className="lg:col-span-7 relative min-h-[500px] sm:min-h-[560px] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={active.heroImage}
                  alt={active.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011f26] via-[#011f26]/30 to-transparent opacity-90" />
              </motion.div>
            </AnimatePresence>

            {/* Top Tag Badges */}
            <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full text-[10px] uppercase font-mono font-bold bg-[#004d5d]/80 backdrop-blur-md text-coral-300 border border-coral-500/30">
                {ROMAN_NUMERALS[activeIndex]} • {active.country}
              </span>
              {active.category.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white/10 backdrop-blur-md text-white border border-white/10"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-ultra text-coral-400 font-mono block mb-1">
                  {active.coordinates[0]}° N, {active.coordinates[1]}° E
                </span>
                <h3 className="font-cormorant text-3xl sm:text-5xl text-white font-light">
                  {active.name}
                </h3>
              </div>
              <Link
                href={`/destinations/${active.id}`}
                className="w-13 h-13 rounded-full bg-coral-500 text-white flex items-center justify-center hover:scale-110 transition-transform coral-glow shrink-0 p-3.5"
                aria-label={`Explore ${active.name}`}
              >
                <ArrowUpRight className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Narration & Architectural Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-surface/50 border border-white/5 rounded-3xl p-8 sm:p-10 backdrop-blur-md">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono text-coral-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sanctuary Aura & Lineage</span>
              </div>

              <h4 className="font-serif italic text-2xl sm:text-3xl text-sand-100 font-normal leading-snug">
                &ldquo;{active.tagline}&rdquo;
              </h4>

              <p className="text-sand-300 text-sm font-light leading-relaxed font-sans">
                {active.longDescription}
              </p>

              {/* Highlights Bullet List */}
              <div className="space-y-2 pt-2">
                {active.highlights.slice(0, 3).map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-sand-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral-400 shrink-0 mt-1.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface-card/80 border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-sand-400 block mb-1 font-mono">
                    Best Season
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-coral-400 shrink-0" />
                    {active.bestSeason}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-surface-card/80 border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-sand-400 block mb-1 font-mono">
                    Starting Estimate
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-coral-400 font-mono">
                    {formatCurrency(active.startingPrice)}
                  </span>
                </div>
              </div>

              <Link
                href={`/destinations/${active.id}`}
                className="w-full block py-3.5 text-center rounded-xl bg-coral-500/15 hover:bg-coral-500 border border-coral-500/30 text-coral-300 hover:text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300"
              >
                View Full Destination Guide & Packages →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
