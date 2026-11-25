"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Wand2 } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

const PROMPT_SUGGESTIONS = [
  "5-day luxury anniversary in South Goa with private yacht at Cabo de Rama and beachfront villa, budget ₹1,80,000.",
  "4-day heritage escape in Fontainhas Latin Quarter with private Fado music dinner and Azulejo tile masterclass.",
  "6-day bohemian retreat in Assagao and Ashvem with private chef and sunset cliffside cocktails, budget ₹1,40,000.",
  "3-day quiet backwaters getaway on Divar Island with mangrove kayak safari and river crab feast.",
];

export const AIPromptTeaser: React.FC = () => {
  const [promptText, setPromptText] = useState("");
  const router = useRouter();

  const handleStartPlanning = (text?: string) => {
    const finalPrompt = text || promptText;
    if (finalPrompt.trim()) {
      router.push(`/ai-planner?prompt=${encodeURIComponent(finalPrompt.trim())}`);
    } else {
      router.push("/ai-planner");
    }
  };

  return (
    <section className="py-28 relative bg-[#011f26] overflow-hidden border-y border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-coral-500/10 blur-[200px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-coral-500/30 mb-6 coral-glow-subtle">
          <Wand2 className="w-3.5 h-3.5 text-coral-400 animate-spin-slow" />
          <span className="editorial-badge text-coral-300 font-bold">
            AI Travel Engine · Plan Your Goa Trip
          </span>
        </div>

        {/* Master Headline as specified in prompt */}
        <h2 className="font-cormorant text-4xl sm:text-6xl md:text-7xl text-white font-light uppercase tracking-tight leading-[1.05] mb-6">
          Stop Dreaming About Your Next Trip. <br />
          <span className="font-serif italic font-normal coral-foil-text">
            Start Planning Goa With AI.
          </span>
        </h2>

        <p className="text-sand-300 text-sm sm:text-base font-light max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Describe your ideal Goan holiday in simple words. Yatra Vista AI analyzes your travel style, dates, and budget to generate 3 custom packages: Economy, Comfort, and Grand Palace Luxury in seconds.
        </p>

        {/* Interactive Conversational Input Box */}
        <div className="p-2 sm:p-3 rounded-3xl bg-surface/90 backdrop-blur-2xl border border-coral-500/40 shadow-2xl coral-glow-subtle max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full px-4 py-3 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-coral-400 shrink-0" />
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleStartPlanning();
                }}
                placeholder="e.g. 5 days in South Goa with my partner, private yacht and beach cabana..."
                className="w-full bg-transparent text-sm text-white placeholder-sand-500 focus:outline-none"
              />
            </div>
            <MagneticButton
              size="md"
              variant="primary"
              onClick={() => handleStartPlanning()}
              className="w-full sm:w-auto shrink-0 uppercase tracking-widest text-xs font-semibold px-6 py-3.5"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </MagneticButton>
          </div>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-[11px] text-sand-500 uppercase tracking-wider block w-full mb-1 font-mono">
            Or choose an example trip:
          </span>
          {PROMPT_SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleStartPlanning(s)}
              className="text-left text-xs px-4 py-2 rounded-full bg-surface border border-white/5 hover:border-coral-500/40 text-sand-300 hover:text-coral-300 transition-colors"
            >
              &ldquo;{s.slice(0, 48)}...&rdquo;
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
