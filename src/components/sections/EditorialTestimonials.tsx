"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";

export const EditorialTestimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[activeIdx];

  return (
    <section className="py-28 bg-[#011f26] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-ultra text-coral-400 font-semibold mb-3">
              <Compass className="w-4 h-4" />
              <span>Section 09 — Voices of Discerning Voyagers</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight">
              Testimonials from the <br />
              <span className="font-serif italic font-normal coral-foil-text">
                Edge of Elegance.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-white/10 bg-surface/60 flex items-center justify-center text-white hover:border-coral-400 hover:text-coral-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-white/10 bg-surface/60 flex items-center justify-center text-white hover:border-coral-400 hover:text-coral-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Testimonial Panel */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-surface border border-coral-500/25 relative coral-glow-subtle flex flex-col md:flex-row items-center gap-10">
          <Quote className="w-24 h-24 text-coral-500/10 absolute top-8 right-8 pointer-events-none" />

          {/* Client Avatar with Coral Ring */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-full overflow-hidden border-2 border-coral-500/40 p-1 shadow-2xl">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={item.avatar}
                alt={item.author}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Testimonial Quote & Identity */}
          <div className="flex-1 space-y-5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 text-coral-400">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <p className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-sand-100 font-light leading-relaxed italic">
              &ldquo;{item.quote}&rdquo;
            </p>

            <div className="pt-2">
              <h4 className="font-display text-base sm:text-lg text-white font-semibold tracking-wider">
                {item.author}
              </h4>
              <p className="text-xs text-coral-400 font-mono mt-0.5">
                {item.location} • {item.trip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
