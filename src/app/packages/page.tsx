"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, Star, Check, Filter, Search, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingModal } from "@/components/booking/BookingModal";
import { FEATURED_PACKAGES } from "@/lib/mock-data";
import { TravelPackage, TravelStyle } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

const STYLES: ("All" | TravelStyle)[] = [
  "All",
  "Luxury",
  "Cultural",
  "Adventure",
  "Beaches",
  "Romantic",
];

function PackagesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedStyle, setSelectedStyle] = useState<"All" | TravelStyle>(
    (categoryParam as TravelStyle) || "All"
  );
  const [maxBudget, setMaxBudget] = useState(350000);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);

  const filtered = FEATURED_PACKAGES.filter((pkg) => {
    const matchesStyle = selectedStyle === "All" || pkg.category === selectedStyle;
    const matchesBudget = pkg.price <= maxBudget;
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStyle && matchesBudget && matchesSearch;
  });

  const handleOpenBooking = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#011f26] text-[#F4EFEA] flex flex-col justify-between selection:bg-coral-500/30 selection:text-coral-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-36 pb-28 space-y-16">
        {/* Editorial Masthead */}
        <div className="space-y-6 border-b border-white/10 pb-12 relative">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="editorial-badge text-[11px] bg-coral-500/10 border-coral-500/30 text-coral-300">
              Curated Packages · 100% Guaranteed Booking
            </span>

            <div className="flex items-center gap-4 text-[11px] font-mono text-sand-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-coral-400" />
                GOA EXPEDITIONS · PRIVATE YACHTING & ESTATES
              </span>
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.05]">
              Curated Goa <span className="italic font-light coral-foil-text">Holiday Packages.</span>
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-sand-300 font-light max-w-2xl leading-relaxed">
              "Handcrafted Goa travel packages for every style. Explore luxury sea charters, private heritage pool villas, and authentic Goan cuisine."
            </p>
          </div>
        </div>

        {/* Filters and Controls Toolbar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-white/10 space-y-6 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Search */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-coral-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages by destination or style..."
                className="w-full bg-surface-card border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-sand-600 focus:outline-none focus:border-coral-400/80 transition-colors"
              />
            </div>

            {/* Budget Slider */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center gap-4">
              <span className="text-xs uppercase font-mono tracking-wider text-sand-400 shrink-0 font-medium">
                Max Budget: <strong className="text-coral-300 font-serif text-base">{formatCurrency(maxBudget)}</strong>
              </span>
              <input
                type="range"
                min={80000}
                max={350000}
                step={10000}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="flex-1 accent-coral-500 w-full cursor-pointer"
              />
            </div>
          </div>

          {/* Style Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5">
            <span className="text-xs font-mono text-sand-500 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-coral-400" /> Edition Filter:
            </span>
            {STYLES.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStyle(st)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all font-light ${
                  selectedStyle === st
                    ? "bg-coral-500 text-white font-semibold shadow-md shadow-coral-500/20"
                    : "bg-surface-card text-sand-300 hover:text-white border border-white/10 hover:border-coral-500/40"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-3xl overflow-hidden bg-surface border border-white/10 hover:border-coral-500/50 hover:shadow-[0_0_40px_rgba(255,105,107,0.18)] transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute top-5 left-5 px-3.5 py-1 rounded-full bg-[#004d5d]/80 backdrop-blur-md border border-coral-500/30 text-[10px] text-coral-300 font-mono">
                    {pkg.category} Edition
                  </div>
                  
                  <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004d5d]/80 backdrop-blur-md border border-white/10 text-xs text-coral-400 font-semibold font-mono">
                    <Star className="w-3.5 h-3.5 fill-current text-coral-400" />
                    <span>{pkg.rating}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-sand-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-coral-400" />
                    <span>{pkg.duration}</span>
                    <span>•</span>
                    <span className="text-white">{pkg.destination}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-coral-300 transition-colors font-medium">
                    {pkg.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-sand-300 font-light line-clamp-3 leading-relaxed">
                    {pkg.overview}
                  </p>

                  <div className="space-y-2 pt-2">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-sand-300 font-light">
                        <Check className="w-3.5 h-3.5 text-coral-400 shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] text-sand-500 uppercase font-mono tracking-wider">
                    Total Package Price
                  </span>
                  <span className="font-serif text-3xl font-bold text-coral-400">
                    {formatCurrency(pkg.price)}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link href={`/packages/${pkg.id}`} className="flex-1 sm:flex-none">
                    <MagneticButton size="sm" variant="secondary" className="w-full">
                      Full Details
                    </MagneticButton>
                  </Link>
                  <MagneticButton
                    size="sm"
                    variant="primary"
                    onClick={() => handleOpenBooking(pkg)}
                    className="flex-1 sm:flex-none"
                  >
                    Inquire Voyage
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {selectedPackage && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          initialPackageTitle={selectedPackage.title}
          initialDestination={selectedPackage.destination}
          initialPrice={selectedPackage.price}
        />
      )}
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#011f26] text-white p-12">Loading Packages...</div>}>
      <PackagesContent />
    </Suspense>
  );
}
