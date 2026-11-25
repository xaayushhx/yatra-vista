"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowUpRight, Compass, ShieldCheck, Mail, Phone, MessageCircle } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

import { BrandLogo } from "../ui/BrandLogo";
import { CONTACT_INFO, buildWhatsAppUrl } from "@/lib/constants";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
}

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({
  isOpen,
  onClose,
  onOpenBooking = () => {},
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  const menuItems = [
    {
      title: "Homepage",
      subtitle: "The Digital Odyssey Begins",
      href: "/",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Destinations",
      subtitle: "Iconic Goa Beaches, Heritage & Nature",
      href: "/destinations",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "AI Trip Planner",
      subtitle: "Personalized Itineraries Created with AI",
      href: "/ai-planner",
      image: "https://images.unsplash.com/photo-1609137144820-22d2572a1cfc?q=80&w=1200&auto=format&fit=crop",
      isSparkle: true,
    },
    {
      title: "Holiday Packages",
      subtitle: "Economy, Comfort & Grand Luxury Options",
      href: "/packages",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "3D Goa Map",
      subtitle: "Interactive 3D Coastal & River Navigation",
      href: "/#world-map",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Admin Dashboard",
      subtitle: "Package & Booking Oversight",
      href: "/admin",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Top Bar inside Menu */}
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 py-8 flex items-center justify-between border-b border-white/5">
            <Link href="/" onClick={onClose} className="hover:scale-105 transition-transform">
              <BrandLogo size="md" />
            </Link>

            <button
              onClick={onClose}
              aria-label="Close menu"
              className="group flex items-center gap-2 text-xs uppercase tracking-widest text-sand-300 hover:text-white transition-colors"
            >
              <span>Close</span>
              <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-coral-400 flex items-center justify-center transition-all duration-300">
                <X className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* Main Content: Split links and preview image */}
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Menu Links */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.4 }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between py-2 border-b border-white/5 transition-all duration-300"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-mono text-coral-500/70 tracking-wider">
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white group-hover:text-coral-400 group-hover:translate-x-2 transition-all duration-300">
                            {item.title}
                          </h3>
                          {item.isSparkle && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-coral-500/20 text-coral-300 border border-coral-500/40">
                              <Sparkles className="w-3 h-3 text-coral-400" /> AI
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-sand-400 mt-0.5 font-light">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-sand-500 group-hover:text-coral-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Side: Dynamic Image Preview */}
            <div className="hidden lg:block lg:col-span-5 h-[420px] relative rounded-2xl overflow-hidden border border-white/10 group">
              {menuItems.map((item, idx) => (
                <div
                  key={item.title}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    hoveredIndex === idx ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  } transition-transform ease-out`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] uppercase tracking-ultra text-coral-400 font-semibold block mb-1">
                      Featured Destination
                    </span>
                    <h4 className="font-serif text-xl text-white font-medium">
                      {item.title}
                    </h4>
                    <p className="text-xs text-sand-300 font-light mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Contact and Inquire CTA */}
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sand-400">
            <div className="flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-coral-400" />
                Verified Luxury Guarantee
              </span>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 hover:text-coral-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-coral-400" />
                {CONTACT_INFO.email}
              </a>
              <a
                href={`tel:+${CONTACT_INFO.phoneWithCountryCode}`}
                className="flex items-center gap-2 hover:text-coral-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-coral-400" />
                {CONTACT_INFO.phoneDisplay}
              </a>
              <a
                href={buildWhatsAppUrl("Hi Yatra Vista, I would like to inquire about a Goa trip.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Chat
              </a>
            </div>

            <MagneticButton
              size="sm"
              variant="primary"
              onClick={onOpenBooking}
            >
              Book Your Trip
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
