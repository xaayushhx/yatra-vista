"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Check, ArrowRight, Sparkles } from "lucide-react";
import { FEATURED_PACKAGES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "../ui/MagneticButton";

interface FeaturedPackagesProps {
  onOpenBookingWithPackage?: (title: string, destination: string, price: number) => void;
}

export const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({
  onOpenBookingWithPackage,
}) => {
  return (
    <section className="py-28 bg-[#011f26] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-ultra text-coral-400 font-semibold mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Section 06 — Curated Masterpieces</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight">
              Handcrafted Travel Packages <br />
              <span className="font-serif italic font-normal coral-foil-text">
                For Your Dream Goa Holiday.
              </span>
            </h2>
          </div>
          <Link
            href="/packages"
            className="text-xs uppercase tracking-widest text-sand-300 hover:text-coral-300 transition-colors flex items-center gap-1.5 font-mono"
          >
            <span>Explore All Packages</span>
            <ArrowRight className="w-4 h-4 text-coral-400" />
          </Link>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FEATURED_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="group rounded-3xl overflow-hidden bg-surface/70 border border-white/10 hover:border-coral-500/40 hover:coral-glow-subtle transition-all duration-500 flex flex-col md:flex-row shadow-xl"
            >
              {/* Left/Top Image */}
              <div className="relative md:w-5/12 h-64 md:h-auto overflow-hidden">
                <Image
                  src={pkg.heroImage}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface via-transparent to-transparent opacity-90" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-coral-500/30 text-[10px] text-coral-300 font-mono">
                  {pkg.category}
                </div>
              </div>

              {/* Right Content */}
              <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-sand-400 mb-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-coral-400" />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1 text-coral-400 font-medium">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {pkg.rating} ({pkg.reviewsCount} voyagers)
                    </span>
                  </div>

                  <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium group-hover:text-coral-300 transition-colors mt-1">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-sand-300 font-light mt-2 line-clamp-2 leading-relaxed font-sans">
                    {pkg.overview}
                  </p>

                  <div className="mt-4 space-y-2">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-sand-300 font-light">
                        <Check className="w-3.5 h-3.5 text-coral-400 shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-sand-500 uppercase font-mono">Curated All-Inclusive</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-coral-400">
                      {formatCurrency(pkg.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/packages/${pkg.id}`}>
                      <MagneticButton size="sm" variant="secondary" className="text-[11px] uppercase tracking-wider">
                        Details
                      </MagneticButton>
                    </Link>
                    <MagneticButton
                      size="sm"
                      variant="primary"
                      className="text-[11px] uppercase tracking-wider font-semibold"
                      onClick={() =>
                        onOpenBookingWithPackage?.(pkg.title, pkg.destination, pkg.price)
                      }
                    >
                      Inquire
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
