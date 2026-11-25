"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Compass, ChevronDown, MapPin, Thermometer, Waves } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2200&auto=format&fit=crop",
    location: "Cabo de Rama & South Coast",
    coordinates: "15.0867° N, 73.9189° E",
    temp: "28°C",
    tide: "Gentle Low Tide",
    tagline: "Dramatic Red Laterite Sea Cliffs",
    accent: "The Untouched Frontier",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2200&auto=format&fit=crop",
    location: "Fontainhas Latin Quarter",
    coordinates: "15.4989° N, 73.8278° E",
    temp: "27°C",
    tide: "Mandovi Estuary Calm",
    tagline: "18th-Century Azulejos & Fado Melodies",
    accent: "Living Colonial Soul",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2200&auto=format&fit=crop",
    location: "Assagao & North Riviera",
    coordinates: "15.5905° N, 73.7744° E",
    temp: "29°C",
    tide: "Vagator Coastal Breeze",
    tagline: "Bohemian Chic & Haute Gastronomy",
    accent: "Private Villa Enclave",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=2200&auto=format&fit=crop",
    location: "Divar Island Backwaters",
    coordinates: "15.5186° N, 73.8967° E",
    temp: "26°C",
    tide: "Riverine Mirror Waters",
    tagline: "Emerald Salt Marshes & Quiet Ferries",
    accent: "Untimed River Island",
  },
];

interface CinematicHeroProps {
  onOpenBooking?: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onOpenBooking: _onOpenBooking }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#011f26]">
      {/* Background Slides with Slow Cinematic Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={slide.location}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Multi-layered atmospheric gradients and vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/40 to-[#07080b]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(7,8,11,0.85)_100%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Telemetry Strip (Top Right on desktop) */}
      <motion.div
        key={`telemetry-${slide.id}`}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="hidden md:flex absolute top-28 right-8 lg:right-16 z-20 items-center gap-4 px-5 py-2.5 rounded-full bg-[#011f26]/70 backdrop-blur-xl border border-white/10 shadow-2xl font-mono text-[11px]"
      >
        <div className="flex items-center gap-1.5 text-coral-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>{slide.coordinates}</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <div className="flex items-center gap-1.5 text-sand-300">
          <Thermometer className="w-3.5 h-3.5 text-coral-400" />
          <span>{slide.temp}</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <div className="flex items-center gap-1.5 text-sand-400">
          <Waves className="w-3.5 h-3.5 text-azure-400" />
          <span>{slide.tide}</span>
        </div>
      </motion.div>

      {/* Center Cinematic Editorial Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center pt-24 sm:pt-28 pb-32">
        {/* Curated Monogram / Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#002d37]/90 backdrop-blur-md border border-coral-500/30 mb-8 coral-glow"
        >
          <Sparkles className="w-3.5 h-3.5 text-coral-400 animate-pulse" />
          <span className="editorial-badge text-coral-300 font-bold">
            Curated Luxury Goa Travel & AI Itineraries
          </span>
        </motion.div>

        {/* Grand Headline with Cormorant & Cinzel Pairings */}
        <div className="overflow-hidden mb-6 max-w-5xl">
          <motion.h1
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-[0.95]"
          >
            The Uncharted <br />
            <span className="font-serif italic font-normal coral-foil-text">
              Coast of Goa.
            </span>
          </motion.h1>
        </div>

        {/* Editorial Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-sand-200 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          Where centuries-old Portuguese villas, private catamaran corridors, and Arabian Sea serenity converge into tailor-crafted digital art form.
        </motion.p>

        {/* Dual Primary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <Link href="/ai-planner">
            <MagneticButton size="lg" variant="primary" className="text-xs uppercase tracking-widest font-semibold px-8 py-4">
              <span>Plan Your Trip with AI</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </MagneticButton>
          </Link>

          <a href="#world-map">
            <MagneticButton size="lg" variant="secondary" className="text-xs uppercase tracking-widest font-semibold px-8 py-4">
              <span>Explore 3D Goa Map</span>
              <Compass className="w-4 h-4 ml-2 text-coral-400" />
            </MagneticButton>
          </a>
        </motion.div>
      </div>

      {/* Bottom Editorial Slide Bar Selector */}
      <div className="absolute bottom-8 left-0 right-0 z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Slide Thumbnails & Progress */}
        <div className="flex items-center gap-2 sm:gap-3">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full transition-all duration-300 text-left font-mono text-[10px] ${
                currentSlide === idx
                  ? "bg-coral-500/20 border border-coral-400 text-coral-300 font-semibold shadow-lg shadow-coral-500/10"
                  : "bg-surface/50 border border-white/5 text-sand-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="text-coral-400 font-bold">0{idx + 1}</span>
              <span className="hidden md:inline">{s.location.split("&")[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <a
          href="#sanctuaries"
          className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-sand-400 hover:text-coral-300 font-mono transition-colors"
        >
          <span>Scroll to Explore</span>
          <ChevronDown className="w-3.5 h-3.5 text-coral-400 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
