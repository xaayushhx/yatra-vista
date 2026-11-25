"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { EDITORIAL_STORIES } from "@/lib/mock-data";

export const TravelInspiration: React.FC = () => {
  return (
    <section id="stories" className="py-28 bg-[#011f26] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-ultra text-coral-400 font-semibold mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Section 10 — Travel Inspiration & Journal</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight">
              The Vista Anthology <br />
              <span className="font-serif italic font-normal coral-foil-text">
                Dispatches from the Field.
              </span>
            </h2>
          </div>
          <span className="text-xs uppercase tracking-widest text-sand-400 font-mono">
            Editorial essays & culinary field notes
          </span>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDITORIAL_STORIES.map((story) => (
            <article
              key={story.id}
              className="group rounded-3xl overflow-hidden bg-surface/70 border border-white/5 hover:border-coral-500/40 transition-all duration-500 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={story.heroImage}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-[10px] text-coral-300 font-mono">
                    {story.category}
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-sand-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-coral-400" />
                      {story.readTime}
                    </span>
                    <span>•</span>
                    <span>{story.date}</span>
                  </div>

                  <h3 className="font-cormorant text-2xl text-white group-hover:text-coral-300 transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-sand-300 font-light leading-relaxed line-clamp-3 font-sans">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-7 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-sand-400">
                <span className="font-medium text-white font-mono text-[11px]">By {story.author}</span>
                <span className="inline-flex items-center gap-1 text-coral-400 group-hover:translate-x-1 transition-transform font-semibold text-[11px] uppercase tracking-wider">
                  Read Essay <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
