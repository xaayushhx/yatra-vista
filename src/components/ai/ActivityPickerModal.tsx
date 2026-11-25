"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Search, 
  Plus, 
  Check,
  Sparkles,
  Compass,
  Clock
} from "lucide-react";
import { ActivityItem } from "@/types";
import { CURATED_GOA_ACTIVITIES, CuratedActivityTemplate } from "@/lib/activity-catalog";
import { formatCurrency } from "@/lib/utils";

interface ActivityPickerModalProps {
  isOpen: boolean;
  dayNumber: number;
  dayLocation: string;
  onClose: () => void;
  onAddActivity: (activity: ActivityItem) => void;
  currency?: string;
}

export const ActivityPickerModal: React.FC<ActivityPickerModalProps> = ({
  isOpen,
  dayNumber,
  dayLocation,
  onClose,
  onAddActivity,
  currency = "INR",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("All");
  const [addedActivityTitle, setAddedActivityTitle] = useState<string | null>(null);

  // Custom activity form state
  const [customTitle, setCustomTitle] = useState("");
  const [customTimeSlot, setCustomTimeSlot] = useState<"morning" | "afternoon" | "evening">("morning");
  const [customDuration, setCustomDuration] = useState("2 hours");
  const [customCost, setCustomCost] = useState("2000");
  const [customDescription, setCustomDescription] = useState("");

  const categories = ["All", "Heritage", "Coastal", "Gastronomy", "Wellness", "Luxury", "Custom"];
  const timeSlots = ["All", "morning", "afternoon", "evening"];

  const filteredActivities = useMemo(() => {
    return CURATED_GOA_ACTIVITIES.filter((act) => {
      const matchesSearch =
        searchQuery === "" ||
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === "All" ||
        selectedCategory === "Custom" ||
        act.category === selectedCategory;

      const matchesTime =
        selectedTimeSlot === "All" || act.timeSlot === selectedTimeSlot;

      return matchesSearch && matchesCat && matchesTime;
    });
  }, [searchQuery, selectedCategory, selectedTimeSlot]);

  const handleSelectCurated = (tpl: CuratedActivityTemplate) => {
    const act: ActivityItem = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timeSlot: tpl.timeSlot,
      title: tpl.title,
      description: tpl.description,
      duration: tpl.duration,
      estimatedCost: tpl.estimatedCost,
      tags: tpl.tags,
      location: dayLocation,
    };
    onAddActivity(act);
    setAddedActivityTitle(tpl.title);
    setTimeout(() => {
      setAddedActivityTitle(null);
      onClose();
    }, 600);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const act: ActivityItem = {
      id: `act-custom-${Date.now()}`,
      timeSlot: customTimeSlot,
      title: customTitle.trim(),
      description: customDescription.trim() || `Tailored waypoint experience in ${dayLocation}.`,
      duration: customDuration.trim() || "2 hours",
      estimatedCost: parseInt(customCost, 10) || 1500,
      tags: ["Custom", "Bespoke"],
      location: dayLocation,
    };
    onAddActivity(act);
    setAddedActivityTitle(act.title);
    setTimeout(() => {
      setAddedActivityTitle(null);
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#002d37] border border-coral-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col h-[88vh] max-h-[88vh] min-h-0"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between bg-surface-raised/40 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-ultra text-coral-400 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Add Activity • Day 0{dayNumber}</span>
              </div>
              <h3 className="font-serif text-2xl text-white font-medium">
                Choose an Activity
              </h3>
              <p className="text-sand-300 text-xs mt-1">
                Available in {dayLocation}. Select from curated local experiences or add your own custom activity.
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sand-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Controls Bar: Search & Category Filter */}
          <div className="p-5 border-b border-white/10 bg-surface/50 space-y-3 shrink-0">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search input */}
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search activities by name, keyword, or tag (e.g. yacht, fado, spice)..."
                  className="w-full pl-10 pr-4 py-2 bg-surface-card border border-white/10 rounded-xl text-xs text-white placeholder-sand-500 focus:outline-none focus:border-coral-500 transition-colors"
                />
              </div>

              {/* Time slot toggle */}
              <div className="flex items-center gap-1 bg-surface-card border border-white/10 p-1 rounded-xl shrink-0 text-xs">
                {timeSlots.map((ts) => (
                  <button
                    key={ts}
                    onClick={() => setSelectedTimeSlot(ts)}
                    className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                      selectedTimeSlot === ts
                        ? "bg-coral-500 text-white font-semibold shadow-sm"
                        : "text-sand-400 hover:text-white"
                    }`}
                  >
                    {ts}
                  </button>
                ))}
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-coral-500/20 border border-coral-400 text-coral-300 font-semibold shadow-sm"
                      : "bg-surface-card border border-white/5 text-sand-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat === "Custom" ? "✨ Custom Activity" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Body Content with Smooth Scroll */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-4 modal-scroll">
            {/* Success flash indicator */}
            {addedActivityTitle && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300 font-medium"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Successfully added &quot;{addedActivityTitle}&quot; to Day 0{dayNumber}!</span>
              </motion.div>
            )}

            {/* Custom Activity Creation View */}
            {selectedCategory === "Custom" ? (
              <form onSubmit={handleAddCustom} className="space-y-4 max-w-xl mx-auto py-2">
                <div className="text-center space-y-1 mb-6">
                  <h4 className="font-serif text-lg text-white font-medium">
                    Add Custom Activity
                  </h4>
                  <p className="text-xs text-sand-400">
                    Add a custom boat trip, restaurant booking, or sightseeing stop to your itinerary.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-sand-300 block">Activity Title *</label>
                  <input
                    type="text"
                    required
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Private Helicopter Coastal Flight to Aguada Helipad"
                    className="w-full px-4 py-2.5 bg-surface border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-coral-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-sand-300 block">Time of Day</label>
                    <select
                      value={customTimeSlot}
                      onChange={(e) => setCustomTimeSlot(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-surface border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-coral-500"
                    >
                      <option value="morning">Morning (08:00 - 12:00)</option>
                      <option value="afternoon">Afternoon (12:00 - 17:00)</option>
                      <option value="evening">Evening (17:00 - 22:00)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-sand-300 block">Duration</label>
                    <input
                      type="text"
                      value={customDuration}
                      onChange={(e) => setCustomDuration(e.target.value)}
                      placeholder="e.g. 2.5 hours"
                      className="w-full px-3 py-2.5 bg-surface border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-coral-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-sand-300 block">Estimated Cost (INR)</label>
                    <input
                      type="number"
                      value={customCost}
                      onChange={(e) => setCustomCost(e.target.value)}
                      placeholder="2500"
                      className="w-full px-3 py-2.5 bg-surface border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-coral-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-sand-300 block">Description & Details</label>
                  <textarea
                    rows={3}
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder="Describe the experience, meeting point, or special requests..."
                    className="w-full px-4 py-2.5 bg-surface border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-coral-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-400 hover:to-coral-500 text-white font-semibold rounded-xl text-xs tracking-wider uppercase transition-all shadow-lg shadow-coral-500/25"
                >
                  Confirm & Add to Day 0{dayNumber}
                </button>
              </form>
            ) : (
              /* Curated Activities Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredActivities.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-sand-400 space-y-2">
                    <Compass className="w-8 h-8 text-sand-500 mx-auto" />
                    <p className="text-sm">No curated activities match your filters.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                        setSelectedTimeSlot("All");
                      }}
                      className="text-xs text-coral-400 hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  filteredActivities.map((tpl, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-surface border border-white/5 hover:border-coral-500/30 transition-all duration-200 flex flex-col justify-between space-y-3 group hover:bg-surface-raised/40"
                    >
                      <div className="space-y-2">
                        {/* Top badges */}
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="uppercase px-2 py-0.5 rounded bg-coral-500/10 border border-coral-500/20 text-coral-300 font-semibold">
                            {tpl.timeSlot}
                          </span>
                          <span className="text-sand-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-coral-400" />
                            {tpl.duration}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h5 className="font-serif text-sm font-medium text-white group-hover:text-coral-300 transition-colors">
                            {tpl.title}
                          </h5>
                          <p className="text-xs text-sand-400 font-light mt-1 leading-relaxed line-clamp-2">
                            {tpl.description}
                          </p>
                        </div>

                        {/* Tags */}
                        {tpl.tags && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {tpl.tags.map((t, i) => (
                              <span
                                key={i}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-sand-400 font-mono"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer: Price & Add Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <div className="text-xs font-mono font-semibold text-coral-400">
                          {formatCurrency(tpl.estimatedCost || 0, currency)}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectCurated(tpl)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-coral-500/15 hover:bg-coral-500 border border-coral-500/30 text-coral-300 hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Day</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
