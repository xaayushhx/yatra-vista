"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, ArrowUpRight, MapPin, Thermometer, Compass, Calendar, Layers } from "lucide-react";
import { GoaRadarMap } from "./GoaRadarMap";
import { InteractiveGlobe } from "./InteractiveGlobe";
import { DESTINATIONS } from "@/lib/mock-data";
import { Destination } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "../ui/MagneticButton";

export const WorldMapSection: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);
  const [viewMode, setViewMode] = useState<"radar" | "globe">("radar");

  return (
    <section id="world-map" className="py-24 bg-[#011f26] relative overflow-hidden border-t border-white/5">
      {/* Ambient Radial Lighting Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-ocean-500/10 blur-[220px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-coral-500/10 blur-[200px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-ultra text-coral-400 font-semibold mb-3">
              <Globe className="w-4 h-4" />
              <span>Interactive 3D Goa Map</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
              {viewMode === "radar" ? "Goa 3D Interactive Map" : "World Map Centered on Goa"}
            </h2>
            <p className="text-sand-300 text-sm font-light mt-3 max-w-xl">
              {viewMode === "radar"
                ? "Explore Goa's coastline, beaches, rivers, and scenic heritage spots in 3D. Click any destination marker to view highlights."
                : "A global planetary orbit centered directly on Goa, India [15.29°N, 73.92°E]. Spin to track international transit corridors and Arabian Sea maritime gateways."}
            </p>
          </div>

          {/* Controls: 3D View Switcher & Destination Tabs */}
          <div className="flex flex-col items-start md:items-end gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-surface/90 border border-white/10 p-1 rounded-full shadow-lg">
              <button
                onClick={() => setViewMode("radar")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${viewMode === "radar"
                  ? "bg-coral-500 text-white font-semibold shadow-md shadow-coral-500/30"
                  : "text-sand-400 hover:text-white"
                  }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Goa 3D Radar</span>
              </button>
              <button
                onClick={() => setViewMode("globe")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${viewMode === "globe"
                  ? "bg-coral-500 text-white font-semibold shadow-md shadow-coral-500/30"
                  : "text-sand-400 hover:text-white"
                  }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Planetary Globe</span>
              </button>
            </div>

            {/* Destination Selector Pill Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {DESTINATIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDest(d)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${selectedDest.id === d.id
                    ? "bg-coral-500/20 border border-coral-400 text-coral-300 font-semibold"
                    : "bg-surface-card border border-white/10 text-sand-400 hover:text-white hover:border-white/20"
                    }`}
                >
                  {d.name.split("&")[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main 3D Canvas & Dynamic Waypoint Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-card/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
          {/* 3D WebGL Visualization Viewport */}
          <div className="lg:col-span-7 relative">
            {viewMode === "radar" ? (
              <GoaRadarMap
                onSelectDestination={(d) => setSelectedDest(d)}
                selectedDestination={selectedDest}
              />
            ) : (
              <InteractiveGlobe
                onSelectDestination={(d) => setSelectedDest(d)}
                selectedDestination={selectedDest}
              />
            )}

            <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2 text-[10px] text-coral-300/90 font-mono bg-[#002d37]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg z-10">
              <Compass className="w-3.5 h-3.5 text-coral-400 animate-spin-slow" />
              <span>
                {viewMode === "radar"
                  ? "Goa Regional Datum [15.08°N – 15.68°N | 73.70°E – 74.05°E]"
                  : "Spherical projection centered on Goa [15.29°N, 73.92°E]"}
              </span>
            </div>
          </div>

          {/* Dynamic Destination Showcase Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-surface/90 border border-coral-500/25 rounded-2xl p-6 sm:p-8 coral-glow-subtle">
            <div>
              <div className="flex items-center justify-between text-xs text-coral-400 font-mono mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedDest.coordinates[0]}° N, {selectedDest.coordinates[1]}° E
                </span>
                <span className="flex items-center gap-1 text-sand-300">
                  <Thermometer className="w-3.5 h-3.5 text-coral-400" />
                  {selectedDest.weather.temp} ({selectedDest.weather.condition})
                </span>
              </div>

              <span className="text-[10px] uppercase tracking-ultra text-sand-400 font-semibold block">
                {selectedDest.country}
              </span>
              <h3 className="font-serif text-3xl text-white font-medium mt-1">
                {selectedDest.name}
              </h3>
              <p className="text-xs text-sand-300 font-light mt-2 leading-relaxed">
                {selectedDest.description}
              </p>
            </div>

            {/* Thumbnail Preview */}
            <div className="relative h-44 w-full rounded-xl overflow-hidden border border-white/10 group">
              <Image
                src={selectedDest.heroImage}
                alt={selectedDest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="text-coral-300 font-medium">Ideal: {selectedDest.idealDuration}</span>
                <span className="text-white font-semibold">From {formatCurrency(selectedDest.startingPrice)}</span>
              </div>
            </div>

            {/* Season & Action */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-xs text-sand-300">
                <Calendar className="w-3.5 h-3.5 text-coral-400" />
                <span>Prime: {selectedDest.bestSeason}</span>
              </div>

              <Link href={`/destinations/${selectedDest.id}`}>
                <MagneticButton size="sm" variant="primary">
                  Explore Sanctuary <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
