"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Eye, 
  ArrowLeft 
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FEATURED_PACKAGES } from "@/lib/mock-data";
import { TravelPackage, BookingRequest, TravelStyle } from "@/types";
import { getBookings } from "@/lib/storage";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function AdminPage() {
  const [packages, setPackages] = useState<TravelPackage[]>(FEATURED_PACKAGES);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"packages" | "bookings">("packages");
  const [isCreating, setIsCreating] = useState(false);

  // New package form state
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("Cabo de Rama & South Goa");
  const [country] = useState("Goa, India");
  const [duration, setDuration] = useState("7 Days / 6 Nights");
  const [durationDays] = useState(7);
  const [price, setPrice] = useState(195000);
  const [category] = useState<TravelStyle>("Luxury");
  const [heroImage] = useState(
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop"
  );
  const [overview, setOverview] = useState("");

  useEffect(() => {
    // Load local storage bookings
    setBookings(getBookings());
  }, []);

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const newPkg: TravelPackage = {
      id: `pkg-${Date.now()}`,
      title,
      destination,
      country,
      duration,
      durationDays,
      price,
      currency: "INR",
      category,
      rating: 5.0,
      reviewsCount: 1,
      featured: true,
      heroImage,
      overview,
      highlights: [
        "Private arrival transfers",
        "Curated Michelin gastronomy",
        "Exclusive historical access",
      ],
      included: ["5-Star Palace Lodging", "Private Transportation", "Daily Breakfast"],
      excluded: ["International Airfare"],
      itinerarySummary: [
        { day: 1, title: "Arrival & Welcome Reception", desc: "Private VIP airport welcome." },
        { day: 2, title: "Signature Exploration", desc: "Private chartered touring." },
      ],
    };

    setPackages([newPkg, ...packages]);
    setIsCreating(false);
    setTitle("");
    setOverview("");
  };

  const handleDeletePackage = (id: string) => {
    setPackages(packages.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#011f26] text-[#F4EFEA] flex flex-col justify-between selection:bg-coral-500/30 selection:text-coral-200">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-32 pb-24 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-sand-400 mb-2">
              <Link href="/" className="hover:text-coral-300 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Home
              </Link>
              <span>/</span>
              <span className="text-coral-400">Admin Studio</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-white font-bold">
              Yatra Vista Concierge Studio
            </h1>
            <p className="text-xs text-sand-300 font-light mt-1">
              Phase 10 — Administrative Package Inventory & Inquiries Oversight.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("packages")}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === "packages"
                  ? "bg-coral-500 text-white font-semibold"
                  : "bg-surface-card border border-white/10 text-sand-300"
              }`}
            >
              Packages ({packages.length})
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === "bookings"
                  ? "bg-coral-500 text-white font-semibold"
                  : "bg-surface-card border border-white/10 text-sand-300"
              }`}
            >
              Inquiries ({bookings.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Packages Management */}
        {activeTab === "packages" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-white font-medium">
                Package Inventory
              </h2>
              <MagneticButton
                size="sm"
                variant="primary"
                onClick={() => setIsCreating(!isCreating)}
              >
                <Plus className="w-4 h-4 mr-1" />
                {isCreating ? "Cancel" : "Add New Package"}
              </MagneticButton>
            </div>

            {/* Create Package Drawer / Form */}
            {isCreating && (
              <form
                onSubmit={handleCreatePackage}
                className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-coral-500/30 space-y-4 coral-glow-subtle"
              >
                <h3 className="font-serif text-xl text-white font-medium">
                  Author New Travel Package
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-sand-400 mb-1">Package Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cabo de Rama Clifftop Luxury Villa"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-coral-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sand-400 mb-1">Destination Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cabo de Rama & South Goa"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-coral-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sand-400 mb-1">Duration String</label>
                    <input
                      type="text"
                      required
                      placeholder="7 Days / 6 Nights"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-coral-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sand-400 mb-1">Price (INR)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-surface border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-coral-500/50 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sand-400 text-xs mb-1">Overview Description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the atmosphere, accommodations, and yacht charters..."
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-coral-500/50"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <MagneticButton type="submit" size="sm" variant="primary">
                    Publish Package to Live Marketplace
                  </MagneticButton>
                </div>
              </form>
            )}

            {/* Packages Table / List */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-surface-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface border-b border-white/10 text-sand-400 uppercase tracking-wider font-mono">
                  <tr>
                    <th className="p-4">Package</th>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Est. Price</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sand-200">
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white">{pkg.title}</td>
                      <td className="p-4">{pkg.destination}</td>
                      <td className="p-4">{pkg.duration}</td>
                      <td className="p-4 font-mono text-coral-400">{formatCurrency(pkg.price)}</td>
                      <td className="p-4">{pkg.category}</td>
                      <td className="p-4 text-right space-x-2">
                        <Link href={`/packages/${pkg.id}`} className="text-sand-400 hover:text-white inline-block">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="text-sand-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Bookings Oversight */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-white font-medium">
              Client Voyage Inquiries
            </h2>

            {bookings.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-surface-card border border-white/10 text-sand-400 text-xs">
                No inquiries submitted yet. Submit a test inquiry through any package or the homepage header.
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-surface-card">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface border-b border-white/10 text-sand-400 uppercase tracking-wider font-mono">
                    <tr>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Destination / Package</th>
                      <th className="p-4">Travelers</th>
                      <th className="p-4">Dates</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sand-200">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white">{b.contactName}</td>
                        <td className="p-4">
                          <div>{b.contactEmail}</div>
                          <div className="text-[10px] text-sand-500 font-mono">{b.contactPhone}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-white">{b.packageTitle}</div>
                          <div className="text-[10px] text-coral-400">{b.destination}</div>
                        </td>
                        <td className="p-4">{b.travelers} Guests</td>
                        <td className="p-4 font-mono text-[11px]">{b.startDate} → {b.endDate}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider bg-coral-500/20 text-coral-300 border border-coral-500/30">
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
