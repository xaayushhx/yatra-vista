"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Calendar, Sun, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DESTINATIONS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { TravelStyle } from "@/types";
import { MagneticButton } from "@/components/ui/MagneticButton";

const CATEGORIES: ("All" | TravelStyle)[] = [
  "All",
  "Luxury",
  "Romantic",
  "Cultural",
  "Beaches",
  "Adventure",
  "Nature and wildlife",
];

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | TravelStyle>("All");

  const filtered = DESTINATIONS.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || d.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const leadSanctuary = filtered[0];
  const gallerySanctuaries = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#011f26] text-[#F4EFEA] flex flex-col justify-between selection:bg-coral-500/30 selection:text-coral-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-36 pb-28 space-y-16">
        {/* Editorial Masthead */}
        <div className="space-y-6 border-b border-white/10 pb-12 relative">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="editorial-badge text-[11px] bg-coral-500/10 border-coral-500/30 text-coral-300">
              Goa Destination Guide · Curated 2026 Collection
            </span>

            <div className="flex items-center gap-4 text-[11px] font-mono text-sand-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-coral-400" />
                COASTAL HORIZONS · 15.2993° N, 74.1240° E
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="hidden sm:inline text-coral-300">
                ARABIAN SEA BASIN
              </span>
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.05]">
              Explore Goa <span className="italic font-light coral-foil-text">Destinations.</span>
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-sand-300 font-light max-w-2xl leading-relaxed">
              "From dramatic red laterite sea cliffs to Portuguese Latin heritage estates — each enclave is preserved for quiet distinction and unhurried grace."
            </p>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-4 sm:p-5 rounded-2xl bg-surface border border-white/10 backdrop-blur-xl">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-coral-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination name or style..."
              className="w-full bg-surface-card border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder:text-sand-600 focus:outline-none focus:border-coral-400/80 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all font-light ${
                  selectedCategory === cat
                    ? "bg-coral-500 text-white font-semibold shadow-md shadow-coral-500/20"
                    : "bg-surface-card text-sand-300 hover:text-white border border-white/10 hover:border-coral-500/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Sanctuary Flagship Exhibition */}
        {leadSanctuary && (
          <div className="rounded-3xl overflow-hidden bg-surface border border-coral-500/30 shadow-2xl relative group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Image Side */}
              <div className="lg:col-span-7 relative h-96 lg:h-auto min-h-[420px] overflow-hidden">
                <Image
                  src={leadSanctuary.heroImage}
                  alt={leadSanctuary.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-surface/40 to-surface" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#004d5d]/80 backdrop-blur-md border border-coral-500/40 text-[10px] uppercase font-mono tracking-wider text-coral-300">
                    Featured Destination · 01
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] text-white font-mono flex items-center gap-1">
                    <Sun className="w-3 h-3 text-coral-400" />
                    {leadSanctuary.weather.temp}
                  </span>
                </div>
              </div>

              {/* Text Editorial Side */}
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-sand-400">
                    <MapPin className="w-3.5 h-3.5 text-coral-400" />
                    <span>{leadSanctuary.country} · {leadSanctuary.coordinates[0]}° N</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
                    {leadSanctuary.name}
                  </h2>

                  <p className="font-serif italic text-base sm:text-lg text-coral-300 font-light">
                    "{leadSanctuary.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-sand-300 font-light leading-relaxed">
                    {leadSanctuary.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-sand-500 block">
                      Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {leadSanctuary.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="text-xs text-sand-200 flex items-start gap-2 font-light">
                          <span className="text-coral-400 font-bold">✦</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-sand-500 block">
                      Starting From
                    </span>
                    <span className="font-serif text-2xl font-bold text-coral-400">
                      {formatCurrency(leadSanctuary.startingPrice)}
                    </span>
                  </div>

                  <Link href={`/destinations/${leadSanctuary.id}`}>
                    <MagneticButton size="md" variant="primary">
                      Explore Destination
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Asymmetric Exhibition Gallery for Remaining Sanctuaries */}
        <div className="space-y-8 pt-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
              All Goa Destinations
            </h3>
            <span className="text-xs font-mono text-sand-400">
              Showing {filtered.length} Destinations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallerySanctuaries.map((dest, idx) => {
              const roman = ROMAN_NUMERALS[idx + 1] || "VII";

              return (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  className="group rounded-3xl overflow-hidden bg-surface border border-white/10 hover:border-coral-500/50 hover:shadow-[0_0_35px_rgba(255,105,107,0.18)] transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Aspect */}
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={dest.heroImage}
                        alt={dest.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
                      
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#004d5d]/80 backdrop-blur-md border border-white/10 text-[10px] text-white flex items-center gap-1.5 font-mono">
                        <span className="text-coral-400 font-bold">{roman}.</span>
                        <span>{dest.country}</span>
                      </div>

                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-coral-500/20 backdrop-blur-md border border-coral-500/30 text-[10px] text-coral-300 font-mono">
                        {dest.weather.temp}
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="font-serif text-2xl text-white group-hover:text-coral-300 transition-colors font-medium">
                        {dest.name}
                      </h3>

                      <p className="text-xs text-sand-300 font-light line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {dest.category.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/5 text-sand-400 font-mono"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Season Footer */}
                  <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-sand-400">
                      <Calendar className="w-3.5 h-3.5 text-coral-400" />
                      <span>{dest.bestSeason}</span>
                    </div>

                    <div className="text-right">
                      <span className="block text-[10px] text-sand-500 uppercase font-mono">Starting From</span>
                      <span className="font-serif text-lg font-bold text-coral-400">
                        {formatCurrency(dest.startingPrice)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
