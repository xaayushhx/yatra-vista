"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Sparkles, Volume2, VolumeX, Menu, X } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { FullScreenMenu } from "./FullScreenMenu";

import { BrandLogo } from "../ui/BrandLogo";

interface HeaderProps {
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    // Live IST clock
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const toggleSound = () => {
    setIsSoundMuted(!isSoundMuted);
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(isSoundMuted ? 587.33 : 440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isSoundMuted ? 880 : 330, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const navLinks = [
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "AI Planner", href: "/ai-planner", isSpecial: true },
    { name: "3D Goa Map", href: "/#world-map" },
    { name: "Travel Stories", href: "/#stories" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-[#00252e]/95 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl shadow-black/30"
          : "bg-gradient-to-b from-[#00252e]/95 via-[#00252e]/60 to-transparent py-5 sm:py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 lg:gap-6">
          {/* Brand Monogram & Wordmark */}
          <Link href="/" className="group shrink-0 flex items-center transition-transform hover:scale-[1.02]">
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 bg-[#003642]/85 border border-white/15 backdrop-blur-2xl px-6 xl:px-7 py-2.5 rounded-full shadow-lg shadow-black/25 shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-300 relative py-1 shrink-0 ${link.isSpecial
                    ? "text-coral-400 font-semibold flex items-center gap-1.5 hover:text-coral-300 drop-shadow-[0_0_10px_rgba(255,105,107,0.3)]"
                    : isActive
                      ? "text-white font-medium"
                      : "text-sand-300 hover:text-white"
                    }`}
                >
                  {link.isSpecial && <Sparkles className="w-3 h-3 text-coral-400 animate-pulse shrink-0" />}
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-coral-400 to-coral-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Live Status */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Live Goa Clock Badge */}
            {currentTime && (
              <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-sand-300 bg-white/[0.04] border border-white/10 px-3.5 py-2 rounded-full whitespace-nowrap shrink-0 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>GOA {currentTime} IST</span>
              </div>
            )}

            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isSoundMuted ? "Unmute ambient soundscape" : "Mute ambient soundscape"}
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 shrink-0 ${!isSoundMuted
                ? "border-coral-500/50 bg-coral-500/15 text-coral-300 shadow-sm shadow-coral-500/20"
                : "border-white/10 bg-surface/50 text-sand-300 hover:text-coral-400 hover:border-coral-500/30"
                }`}
            >
              {isSoundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-coral-400 animate-pulse" />}
            </button>

            {/* Inquire CTA */}
            {onOpenBooking ? (
              <MagneticButton
                size="sm"
                variant="primary"
                onClick={onOpenBooking}
                className="hidden sm:inline-flex text-[11px] tracking-wider uppercase font-semibold whitespace-nowrap shrink-0 px-5 py-2.5 shadow-md shadow-coral-500/25"
              >
                Book Trip
              </MagneticButton>
            ) : (
              <Link href="/ai-planner" className="hidden sm:inline-flex shrink-0">
                <MagneticButton size="sm" variant="primary" className="text-[11px] tracking-wider uppercase font-semibold whitespace-nowrap px-5 py-2.5 shadow-md shadow-coral-500/25">
                  Plan Your Trip
                </MagneticButton>
              </Link>
            )}

            {/* Full-Screen Curtain Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle full-screen navigation"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-surface/80 text-sand-200 hover:text-coral-400 hover:border-coral-500/40 transition-colors shrink-0 shadow-sm"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Curtain Editorial Menu */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenBooking={onOpenBooking || (() => { })}
      />
    </>
  );
};
