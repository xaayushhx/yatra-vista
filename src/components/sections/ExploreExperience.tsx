"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Compass, 
  Binoculars, 
  Crown,
  Anchor,
  UtensilsCrossed,
  Waves,
  Landmark,
  ArrowRight
} from "lucide-react";

const GOA_EXPERIENCES = [
  {
    title: "Palatial Stays & Private Islands",
    icon: Crown,
    desc: "Private pool villas in Assagao, 75-acre coastal palaces & secluded Divar island manors.",
    filter: "Luxury",
    color: "from-coral-500/10 to-teal-500/5",
  },
  {
    title: "Secret Sea Cliffs & Virgin Bays",
    icon: Waves,
    desc: "Red laterite cliffs of Cabo de Rama, emerald Cola lagoon & secluded dolphin coves.",
    filter: "Beaches",
    color: "from-cyan-500/10 to-blue-500/5",
  },
  {
    title: "18th-Century Latin Heritage & Fado",
    icon: Landmark,
    desc: "Fontainhas cobblestone alleys, Azulejo tile ateliers & candlelit fado concerts.",
    filter: "Cultural",
    color: "from-rose-500/10 to-amber-500/5",
  },
  {
    title: "Bohemian Assagao Haute Cuisine",
    icon: UtensilsCrossed,
    desc: "Experimental chef tables, restored Portuguese veranda dining & artisan cocktail salons.",
    filter: "Luxury",
    color: "from-emerald-500/10 to-teal-500/5",
  },
  {
    title: "Western Ghats & Misty Waterfalls",
    icon: Binoculars,
    desc: "Dudhsagar cascades, ancient Sahyadri rainforests & organic cardamom spice plantations.",
    filter: "Adventure",
    color: "from-emerald-500/10 to-amber-500/5",
  },
  {
    title: "Mandovi Backwaters & Solar Ferries",
    icon: Anchor,
    desc: "Quiet electric river catamaran sails through mangrove estuaries & Chorao bird sanctuaries.",
    filter: "Relaxation",
    color: "from-azure-500/10 to-teal-500/5",
  },
  {
    title: "Sunset Catamarans & Private Yachting",
    icon: Compass,
    desc: "Exclusive ocean charters along the Konkan coast with vintage champagne & private chef.",
    filter: "Romantic",
    color: "from-purple-500/10 to-coral-500/5",
  },
  {
    title: "Oceanfront Ayurveda & Restorative Zen",
    icon: Sparkles,
    desc: "Dawn beach yoga, Tibetan sound bowls, Ayurvedic herbal oils & coconut water therapy.",
    filter: "Relaxation",
    color: "from-amber-500/10 to-rose-500/5",
  },
];

export const ExploreExperience: React.FC = () => {
  return (
    <section className="py-28 bg-[#011f26] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-ultra text-coral-400 font-semibold mb-3">
            <Compass className="w-4 h-4" />
            <span>Section 04 — Explore by Atmosphere</span>
          </div>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight">
            Goan Journeys Shaped by Emotion, <br />
            <span className="font-serif italic font-normal coral-foil-text">
              Not Merely Geography.
            </span>
          </h2>
          <p className="text-sand-300 text-sm font-light mt-4 leading-relaxed font-sans">
            Whether your soul desires the contemplative quiet of clifftop isolation or the sensory feast of Indo-Portuguese culinary salons, every portal unlocks bespoke curation.
          </p>
        </div>

        {/* 8 Experiential Portals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GOA_EXPERIENCES.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <Link
                key={idx}
                href={`/packages?category=${encodeURIComponent(exp.filter)}`}
                className={`group p-6 rounded-3xl bg-gradient-to-br ${exp.color} bg-surface border border-white/5 hover:border-coral-500/40 hover:coral-glow-subtle transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#002d37] border border-white/10 flex items-center justify-center text-coral-400 mb-6 group-hover:bg-coral-500 group-hover:text-white transition-colors shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg text-white font-medium group-hover:text-coral-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-sand-400 font-light mt-2 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-sand-400 group-hover:text-coral-300 transition-colors">
                  <span className="font-mono text-[10px] uppercase tracking-wider">Curated Packages</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
