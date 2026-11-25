"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Mail, Phone, User, CheckCircle2, Sparkles, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { saveBooking } from "@/lib/storage";
import { formatCurrency } from "@/lib/utils";
import { CONTACT_INFO, buildMailtoUrl, buildWhatsAppUrl } from "@/lib/constants";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageTitle?: string;
  initialDestination?: string;
  initialPrice?: number;
  initialTier?: "Economy" | "Comfort" | "Premium";
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageTitle = "Bespoke Journey Consultation",
  initialDestination = "Cabo de Rama & South Goa",
  initialPrice = 175000,
  initialTier = "Comfort",
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 2,
    startDate: "2026-12-15",
    endDate: "2026-12-20",
    tier: initialTier,
    destination: initialDestination,
    specialRequests: "",
  });

  const buildInquirySummary = () => {
    return [
      `Hi Yatra Vista! I would like to book/inquire about a Goa trip:`,
      `• Package: ${initialPackageTitle} (${formData.tier})`,
      `• Destination: ${formData.destination}`,
      `• Travelers: ${formData.travelers} Guests`,
      `• Dates: ${formData.startDate} to ${formData.endDate}`,
      `• Estimated Total: ${formatCurrency(initialPrice * Number(formData.travelers))}`,
      `• Name: ${formData.name}`,
      `• Email: ${formData.email}`,
      `• Phone / WhatsApp: ${formData.phone}`,
      formData.specialRequests ? `• Special Requests: ${formData.specialRequests}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = {
      id: `booking-${Date.now()}`,
      packageTitle: initialPackageTitle,
      destination: formData.destination,
      selectedTier: formData.tier,
      travelers: Number(formData.travelers),
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalEstimatedPrice: initialPrice * Number(formData.travelers),
      currency: "INR",
      contactName: formData.name,
      contactEmail: formData.email,
      contactPhone: formData.phone,
      specialRequests: formData.specialRequests,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    saveBooking(newBooking);
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    }).catch(() => {});

    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-[#011f26]/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#002d37] border border-coral-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-8 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coral-500/10 border border-coral-500/30 flex items-center justify-center text-coral-400">
                  <Sparkles className="w-5 h-5 text-coral-400" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-ultra text-coral-400 font-bold block">
                    Trip Booking Inquiry · {step === 1 ? "Step 01: Trip Details" : "Step 02: Guest Details"}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                    {initialPackageTitle}
                  </h3>
                </div>
              </div>
              <button
                onClick={resetAndClose}
                aria-label="Close dialog"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sand-300 hover:text-white hover:border-coral-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-10 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-ultra text-coral-400 font-bold block">
                    Inquiry Saved
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                    Booking Inquiry Received!
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-sand-300 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Send your trip details directly to our WhatsApp (<strong className="text-white">{CONTACT_INFO.phoneDisplay}</strong>) or Email (<strong className="text-white">{CONTACT_INFO.email}</strong>) for an instant response:
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={buildWhatsAppUrl(buildInquirySummary())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    href={buildMailtoUrl(`Goa Trip Inquiry: ${initialPackageTitle} (${formData.name})`, buildInquirySummary())}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-coral-500 hover:bg-coral-400 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg shadow-coral-500/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email</span>
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="text-xs text-sand-400 hover:text-white underline transition-colors"
                  >
                    Close and Return to Website
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-6 space-y-6">
                {step === 1 ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase font-mono tracking-wider text-sand-400 mb-1.5 font-medium">
                          Goa Destination
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            required
                            className="w-full bg-[#00222a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-coral-400/80"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase font-mono tracking-wider text-sand-400 mb-1.5 font-medium">
                            Arrival Date
                          </label>
                          <div className="relative">
                            <Calendar className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                            <input
                              type="date"
                              value={formData.startDate}
                              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                              required
                              className="w-full bg-[#00222a] border border-white/10 rounded-xl pl-10 pr-3 py-3 text-xs text-white focus:outline-none focus:border-coral-400/80"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase font-mono tracking-wider text-sand-400 mb-1.5 font-medium">
                            Departure Date
                          </label>
                          <div className="relative">
                            <Calendar className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                            <input
                              type="date"
                              value={formData.endDate}
                              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                              required
                              className="w-full bg-[#00222a] border border-white/10 rounded-xl pl-10 pr-3 py-3 text-xs text-white focus:outline-none focus:border-coral-400/80"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase font-mono tracking-wider text-sand-400 mb-1.5 font-medium">
                            Voyagers
                          </label>
                          <div className="relative">
                            <Users className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                            <input
                              type="number"
                              min={1}
                              max={12}
                              value={formData.travelers}
                              onChange={(e) => setFormData({ ...formData, travelers: Number(e.target.value) })}
                              required
                              className="w-full bg-[#00222a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-coral-400/80"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase font-mono tracking-wider text-sand-400 mb-1.5 font-medium">
                            Preferred Tier
                          </label>
                          <select
                            value={formData.tier}
                            onChange={(e) => setFormData({ ...formData, tier: e.target.value as "Economy" | "Comfort" | "Premium" })}
                            className="w-full bg-[#00222a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-coral-400/80"
                          >
                            <option value="Economy">Economy (Heritage Explorer)</option>
                            <option value="Comfort">Comfort (Signature Luxury)</option>
                            <option value="Premium">Premium (Imperial Palace & Yacht)</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                        <span className="text-sand-400 font-mono">Estimated Total ({formData.travelers} Guests):</span>
                        <span className="font-serif text-lg font-bold text-coral-400">
                          {formatCurrency(initialPrice * formData.travelers)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <MagneticButton
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={() => setStep(2)}
                      >
                        Continue to Guest Details
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </MagneticButton>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase font-mono tracking-wider text-sand-400 mb-1.5 font-medium">
                          Primary Guest Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="e.g. Lord Alistair Vance"
                            className="w-full bg-[#00222a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-coral-400/80"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] uppercase font-mono tracking-wider text-sand-400 mb-1.5 font-medium">
                            VIP Email Address
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              placeholder="client@luxury.com"
                              className="w-full bg-[#00222a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-coral-400/80"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase font-mono tracking-wider text-sand-400 mb-1.5 font-medium">
                            Telephone / WhatsApp
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-coral-400 absolute left-3.5 top-3.5" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              required
                              placeholder="+91 98200 00000"
                              className="w-full bg-[#00222a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-coral-400/80"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase font-mono tracking-wider text-sand-400 mb-1.5 font-medium">
                          Confidential Requests / Pacing & Dietary Notes
                        </label>
                        <textarea
                          rows={2}
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                          placeholder="e.g. Private catamaran charter, anniversary surprise, champagne on arrival..."
                          className="w-full bg-[#00222a] border border-white/10 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-coral-400/80"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-sand-400 hover:text-white underline font-mono"
                      >
                        ← Back to Calibration
                      </button>

                      <MagneticButton
                        type="submit"
                        variant="primary"
                        size="md"
                      >
                        Submit VIP Inquiry
                      </MagneticButton>
                    </div>
                  </>
                )}
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
