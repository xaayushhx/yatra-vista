"use client";

import React from "react";
import { MessageCircle, Mail } from "lucide-react";
import { CONTACT_INFO, buildWhatsAppUrl } from "@/lib/constants";

/** Floating quick-contact buttons for WhatsApp (+91 93076 75008) and Email (infoyatravista@gmail.com). */
export const WhatsAppFloat: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2.5">
      <a
        href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent("Goa Trip Inquiry - Yatra Vista")}`}
        aria-label={`Email ${CONTACT_INFO.email}`}
        title={`Email us at ${CONTACT_INFO.email}`}
        className="w-11 h-11 rounded-full bg-[#002d37]/95 backdrop-blur-md border border-coral-500/40 text-coral-300 hover:bg-coral-500 hover:text-white flex items-center justify-center shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105"
      >
        <Mail className="w-4 h-4" />
      </a>

      <a
        href={buildWhatsAppUrl("Hi Yatra Vista! I would like to plan a Goa trip.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title={`WhatsApp ${CONTACT_INFO.phoneDisplay}`}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs tracking-wide shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">WhatsApp Us</span>
      </a>
    </div>
  );
};
