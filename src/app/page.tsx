"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { DiscoverWorld } from "@/components/sections/DiscoverWorld";
import { TrendingDestinations } from "@/components/sections/TrendingDestinations";
import { ExploreExperience } from "@/components/sections/ExploreExperience";
import { AIPromptTeaser } from "@/components/sections/AIPromptTeaser";
import { FeaturedPackages } from "@/components/sections/FeaturedPackages";
import { WorldMapSection } from "@/components/3d/WorldMapSection";
import { WhyYatraVista } from "@/components/sections/WhyYatraVista";
import { EditorialTestimonials } from "@/components/sections/EditorialTestimonials";
import { TravelInspiration } from "@/components/sections/TravelInspiration";
import { Footer } from "@/components/layout/Footer";
import { BookingModal } from "@/components/booking/BookingModal";

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState({
    title: "Bespoke Journey Consultation",
    destination: "Global Sanctuary",
    price: 185000,
  });

  const handleOpenBooking = (
    title = "Bespoke Journey Consultation",
    destination = "Global Sanctuary",
    price = 185000
  ) => {
    setSelectedBookingDetails({ title, destination, price });
    setBookingModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#011f26] text-[#F4EFEA] relative selection:bg-coral-500/30 selection:text-coral-200">
      {/* Global Header Navigation */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* 1. Cinematic Full-Screen Hero Experience */}
      <CinematicHero onOpenBooking={() => handleOpenBooking()} />

      {/* 2. Discover the World (Editorial Asymmetric Layout) */}
      <DiscoverWorld />

      {/* 3. Trending Destinations */}
      <TrendingDestinations />

      {/* 4. Explore by Experience (Visual Portal Categories) */}
      <ExploreExperience />

      {/* 5. AI Travel Planner Prominent Teaser */}
      <AIPromptTeaser />

      {/* 6. Featured Travel Packages */}
      <FeaturedPackages onOpenBookingWithPackage={handleOpenBooking} />

      {/* 7. Interactive 3D World Globe */}
      <WorldMapSection />

      {/* 8. Why Yatra Vista (Animated Statistics & Values) */}
      <WhyYatraVista />

      {/* 9. Discerning Traveler Testimonials */}
      <EditorialTestimonials />

      {/* 10. Travel Inspiration Anthology */}
      <TravelInspiration />

      {/* 11 & 12. Newsletter & Grand Typographic Footer */}
      <Footer />

      {/* Luxury Booking Inquiry Drawer */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackageTitle={selectedBookingDetails.title}
        initialDestination={selectedBookingDetails.destination}
        initialPrice={selectedBookingDetails.price}
      />
    </main>
  );
}
