"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, ArrowUp, Send, CheckCircle2, Shield, Award, Sparkles, Mail, Phone, MessageCircle } from "lucide-react";

import { BrandLogo } from "../ui/BrandLogo";
import { CONTACT_INFO, buildWhatsAppUrl } from "@/lib/constants";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", contactEmail: email }),
      }).catch(() => {});
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#00181e] border-t border-white/5 pt-28 pb-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-coral-500/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-20 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
              <BrandLogo size="lg" />
            </Link>

            <p className="text-sand-300 text-sm leading-relaxed max-w-md font-light font-sans">
              Crafted for discerning travelers seeking unforgettable Goan journeys. Explore Portuguese heritage villas, clifftop coastal views, and custom AI trip itineraries tailored to your style.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-[11px] text-sand-300">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 hover:text-coral-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-coral-400" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <a
                href={`tel:+${CONTACT_INFO.phoneWithCountryCode}`}
                className="flex items-center gap-2 hover:text-coral-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-coral-400" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={buildWhatsAppUrl("Hi Yatra Vista, I would like to plan a Goa trip.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <div className="flex items-center gap-6 pt-1 font-mono text-[11px] text-sand-400">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-coral-400" />
                <span>Curated Goa Experiences</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-coral-400" />
                <span>100% Personalized Service</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-coral-400 font-mono">
              Goa Destinations
            </h4>
            <ul className="space-y-2.5 text-xs text-sand-300 font-light font-sans">
              <li>
                <Link href="/destinations#cabo-de-rama" className="hover:text-coral-300 transition-colors">
                  Cabo de Rama & South
                </Link>
              </li>
              <li>
                <Link href="/destinations#fontainhas-panaji" className="hover:text-coral-300 transition-colors">
                  Fontainhas Latin Quarter
                </Link>
              </li>
              <li>
                <Link href="/destinations#assagao-vagator" className="hover:text-coral-300 transition-colors">
                  Assagao & Vagator
                </Link>
              </li>
              <li>
                <Link href="/destinations#divar-chorao-islands" className="hover:text-coral-300 transition-colors">
                  Divar Island Backwaters
                </Link>
              </li>
              <li>
                <Link href="/destinations#ashvem-morjim" className="hover:text-coral-300 transition-colors">
                  Ashvem & Morjim Dunes
                </Link>
              </li>
              <li>
                <Link href="/destinations#ponda-western-ghats" className="hover:text-coral-300 transition-colors">
                  Ponda & Dudhsagar
                </Link>
              </li>
            </ul>
          </div>

          {/* Experience Types */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-coral-400 font-mono">
              Travel Packages
            </h4>
            <ul className="space-y-2.5 text-xs text-sand-300 font-light font-sans">
              <li>
                <Link href="/packages" className="hover:text-coral-300 transition-colors">
                  Holiday Packages
                </Link>
              </li>
              <li>
                <Link href="/ai-planner" className="hover:text-coral-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-coral-400" />
                  <span>AI Trip Planner</span>
                </Link>
              </li>
              <li>
                <Link href="/#world-map" className="hover:text-coral-300 transition-colors">
                  3D Goa Map
                </Link>
              </li>
              <li>
                <Link href="/#stories" className="hover:text-coral-300 transition-colors">
                  Travel Stories
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-coral-300 transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-coral-400 font-mono">
              Travel Newsletter
            </h4>
            <p className="text-xs text-sand-300 font-light leading-relaxed font-sans">
              Receive exclusive updates on secret Goan heritage villas, seasonal packages, and travel guides.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your personal email..."
                    className="w-full px-4 py-2.5 bg-[#002d37] border border-white/10 rounded-xl text-xs text-white placeholder-sand-500 focus:outline-none focus:border-coral-500"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-coral-500 text-white flex items-center justify-center hover:bg-coral-400 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Monumental Typographic Baseline */}
        <div className="pt-16 pb-12 overflow-hidden select-none pointer-events-none text-center">
          <span className="font-sans font-black text-6xl sm:text-8xl md:text-9xl tracking-tight uppercase block">
            <span className="text-white/[0.04]">YATRA </span>
            <span className="text-coral-500/[0.08]">VISTA</span>
          </span>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-sand-500">
          <div>
            &copy; {new Date().getFullYear()} Yatra Vista Ltd. All rights reserved. Registered Goan Heritage Partner.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-sand-300 transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-sand-300 transition-colors cursor-pointer">Terms of Curation</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-coral-400 hover:text-coral-300 transition-colors cursor-pointer ml-4"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
