"use client";

import React, { useState } from "react";
import { Sparkles, Send, Check } from "lucide-react";
import { AIPackageOption } from "@/types";

interface ConversationalModifierProps {
  currentPackage: AIPackageOption;
  onPackageUpdated: (updated: AIPackageOption) => void;
}

const QUICK_COMMANDS = [
  "Add a sunset private yacht cruise along Cabo de Rama cliffs",
  "Upgrade accommodation to beachfront heritage villa suite",
  "Include an authentic Portuguese Fado dinner in Fontainhas",
  "Calibrate daily pace to be more relaxed with beach siestas",
  "Prioritize local Indo-Portuguese culinary masterclasses",
];

export const ConversationalModifier: React.FC<ConversationalModifierProps> = ({
  currentPackage,
  onPackageUpdated,
}) => {
  const [instruction, setInstruction] = useState("");
  const [isModifying, setIsModifying] = useState(false);
  const [lastRefinementNote, setLastRefinementNote] = useState<string | null>(null);

  const handleSendModification = async (commandText?: string) => {
    const text = commandText || instruction;
    if (!text.trim()) return;

    setIsModifying(true);
    setLastRefinementNote(null);
    try {
      const res = await fetch("/api/ai/refine-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPackage,
          instruction: text,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        onPackageUpdated(json.data);
        setLastRefinementNote(`Successfully re-orchestrated itinerary: "${text}"`);
        setInstruction("");
      }
    } catch (e) {
      console.error("Refinement error:", e);
    } finally {
      setIsModifying(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-coral-500/30 shadow-2xl backdrop-blur-xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-coral-500/10 border border-coral-500/30 flex items-center justify-center text-coral-400">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h4 className="font-serif text-xl text-white font-medium">
              Customize Itinerary with AI
            </h4>
            <span className="text-[10px] uppercase font-mono tracking-wider text-sand-500">
              Instant AI Customization
            </span>
          </div>
        </div>
        <span className="editorial-badge text-[10px] bg-coral-500/10 border-coral-500/30 text-coral-300">
          Instant Updates
        </span>
      </div>

      <p className="text-xs text-sand-300 font-light leading-relaxed max-w-2xl">
        Type any changes below to update your itinerary. Move activities between days, add yacht charters, change restaurants, or adjust your daily pace anytime.
      </p>

      {/* Input row */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendModification();
          }}
          placeholder="e.g. Add a private sunset yacht at Cabo de Rama on Day 2, or replace lunch with seafood dining..."
          className="flex-1 bg-surface-card border border-white/10 rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-white placeholder:text-sand-600 focus:outline-none focus:border-coral-400/80 transition-colors"
        />
        <button
          onClick={() => handleSendModification()}
          disabled={isModifying || !instruction.trim()}
          className="px-6 py-3.5 rounded-2xl bg-coral-500 hover:bg-coral-400 disabled:opacity-40 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg"
        >
          {isModifying ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin text-white" />
              <span>Updating Itinerary...</span>
            </>
          ) : (
            <>
              <span>Update Itinerary</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Quick command suggestions */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] uppercase font-mono tracking-wider text-sand-500 block">
          Suggested Changes:
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_COMMANDS.map((cmd, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendModification(cmd)}
              disabled={isModifying}
              className="text-[11px] px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-coral-500/40 text-sand-300 hover:text-coral-200 transition-all flex items-center gap-1.5 disabled:opacity-40 text-left"
            >
              <span className="text-coral-400">✦</span>
              <span>{cmd}</span>
            </button>
          ))}
        </div>
      </div>

      {lastRefinementNote && (
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl animate-fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{lastRefinementNote}</span>
        </div>
      )}
    </div>
  );
};
