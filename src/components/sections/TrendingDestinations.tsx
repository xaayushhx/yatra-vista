"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import { DESTINATIONS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export const TrendingDestinations: React.FC = () => {
  const leadDest = DESTINATIONS[0]; // Cabo de Rama
  const sideDests = DESTINATIONS.slice(1, 5); // Fontainhas, Assagao, Divar, Ashvem

  return (
    <section className="py-28 bg-[#011f26] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-ultra text-coral-400 font-semibold mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Section 03 — Coveted Horizons</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight">
              Popular Goa Destinations <br />
              <span className="font-serif italic font-normal coral-foil-text">
                For The 2026 Season.
              </span>
            </h2>
          </div>
          <Link
            href="/destinations"
            className="text-xs uppercase tracking-widest text-sand-300 hover:text-coral-300 transition-colors flex items-center gap-1.5 font-mono"
          >
            <span>View All Destinations ({DESTINATIONS.length})</span>
            <ArrowUpRight className="w-4 h-4 text-coral-400" />
          </Link>
        </div>

        {/* Editorial Staggered Layout (No Boring Card Grids!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Lead Big Feature Card (Spans 7 cols) */}
          <Link
            href={`/destinations/${leadDest.id}`}
            className="lg:col-span-7 group relative rounded-3xl overflow-hidden border border-white/10 hover:border-coral-500/40 transition-all duration-700 min-h-[460px] flex flex-col justify-end p-8 sm:p-10 shadow-2xl"
          >
            <Image
              src={leadDest.heroImage}
              alt={leadDest.name}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011f26] via-[#011f26]/50 to-transparent" />

            {/* Top Badge */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase font-mono font-bold bg-coral-500 text-white">
                Featured Enclave
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                {leadDest.category[0]}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-3">
              <span className="text-[11px] uppercase tracking-ultra text-coral-400 font-mono block">
                {leadDest.coordinates[0]}° N, {leadDest.coordinates[1]}° E
              </span>
              <h3 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-white font-light group-hover:text-coral-300 transition-colors">
                {leadDest.name}
              </h3>
              <p className="text-sand-300 text-xs sm:text-sm font-light max-w-xl line-clamp-2 leading-relaxed">
                {leadDest.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2 text-sand-300">
                  <Calendar className="w-3.5 h-3.5 text-coral-400" />
                  <span>Prime Season: {leadDest.bestSeason}</span>
                </div>
                <div className="font-mono text-coral-400 font-semibold text-sm">
                  From {formatCurrency(leadDest.startingPrice)}
                </div>
              </div>
            </div>
          </Link>

          {/* Side Staggered Stack (Spans 5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {sideDests.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}`}
                className="group p-5 rounded-2xl bg-surface/60 border border-white/5 hover:border-coral-500/30 transition-all duration-300 flex items-center gap-4 hover:bg-surface-raised/40"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-sand-400">
                    <span className="uppercase text-coral-400 font-semibold">{dest.category[0]}</span>
                    <span>{dest.idealDuration}</span>
                  </div>
                  <h4 className="font-serif text-base text-white group-hover:text-coral-300 transition-colors truncate">
                    {dest.name}
                  </h4>
                  <p className="text-[11px] text-sand-400 font-light line-clamp-1">
                    {dest.tagline}
                  </p>
                  <div className="text-[11px] font-mono text-coral-400 font-medium pt-1">
                    From {formatCurrency(dest.startingPrice)}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-sand-400 group-hover:text-coral-300 group-hover:border-coral-400/40 transition-colors shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
