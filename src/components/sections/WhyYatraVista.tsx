"use client";

import React from "react";
import { ShieldCheck, Sparkles, Compass, Waves } from "lucide-react";

const STATS = [
  { value: "48+", label: "Vetted Goan Stays", desc: "Restored Portuguese heritage villas, clifftop suites and 5-star ocean palaces" },
  { value: "3.2s", label: "Cognitive AI Synthesis", desc: "Real-time structured multi-tier Goa itinerary choreography" },
  { value: "99.8%", label: "Voyager Satisfaction", desc: "Measured across 1,400+ bespoke completed Goan journeys" },
  { value: "24/7", label: "Ground Concierge Standby", desc: "Private chauffeur dispatch & live 24/7 hospitality WhatsApp line" },
];

export const WhyYatraVista: React.FC = () => {
  return (
    <section className="py-28 bg-[#011f26] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-ultra text-coral-400 font-semibold mb-3">
            <Compass className="w-4 h-4" />
            <span>Section 08 — The Yatra Vista Standard</span>
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight">
            Why Discerning Voyagers <br />
            <span className="font-serif italic font-normal coral-foil-text">
              Entrust Their Dreams to Us.
            </span>
          </h2>
          <p className="text-sand-300 text-sm font-light mt-4 leading-relaxed font-sans">
            We bridge the chasm between raw artificial intelligence and high-touch Goan luxury. Every detail is curated with architectural precision, local provenance, and heartfelt hospitality.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-surface/70 border border-white/5 hover:border-coral-500/30 transition-all duration-300 group"
            >
              <span className="font-cormorant text-5xl sm:text-6xl font-light text-coral-400 group-hover:scale-105 transition-transform block mb-2">
                {stat.value}
              </span>
              <h4 className="font-serif text-lg text-white font-medium mb-1">
                {stat.label}
              </h4>
              <p className="text-xs text-sand-400 font-light leading-relaxed font-sans">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Three Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/5">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center text-coral-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium mb-1.5">
                Cognitive Personalization
              </h4>
              <p className="text-xs text-sand-300 font-light leading-relaxed font-sans">
                Yatra Vista AI interprets nuanced travel styles, budget ranges, and personal rhythms, generating 3 custom-crafted options in seconds.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center text-coral-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium mb-1.5">
                100% Ground Verified Stays
              </h4>
              <p className="text-xs text-sand-300 font-light leading-relaxed font-sans">
                Zero hallucinated homestays or fabricated rates. Every villa, shack, and boutique estate is inspected by our Goan curation directors.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center text-coral-400 shrink-0">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-medium mb-1.5">
                3D Spatial Goa Cartography
              </h4>
              <p className="text-xs text-sand-300 font-light leading-relaxed font-sans">
                Explore the Konkan shoreline and Western Ghats in real-time WebGL 3D, inspecting waterways, cliff topography, and sanctuary beacons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
