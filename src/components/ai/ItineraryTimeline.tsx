"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Utensils, 
  Camera
} from "lucide-react";
import { DayItinerary, ActivityItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { ActivityPickerModal } from "./ActivityPickerModal";

interface ItineraryTimelineProps {
  itinerary: DayItinerary[];
  onUpdateItinerary: (updated: DayItinerary[]) => void;
  currency?: string;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({
  itinerary,
  onUpdateItinerary,
  currency = "INR",
}) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2]);
  const [pickerDayIndex, setPickerDayIndex] = useState<number | null>(null);

  const toggleDay = (dayNum: number) => {
    if (expandedDays.includes(dayNum)) {
      setExpandedDays(expandedDays.filter((d) => d !== dayNum));
    } else {
      setExpandedDays([...expandedDays, dayNum]);
    }
  };

  const handleOpenPicker = (dayIndex: number) => {
    setPickerDayIndex(dayIndex);
  };

  const handleAddActivityFromPicker = (newActivity: ActivityItem) => {
    if (pickerDayIndex === null || !itinerary[pickerDayIndex]) return;

    const updated = [...itinerary];
    updated[pickerDayIndex].activities.push(newActivity);
    updated[pickerDayIndex].estimatedDailyCost += newActivity.estimatedCost || 0;
    onUpdateItinerary(updated);
  };

  const handleRemoveActivity = (dayIndex: number, actId: string) => {
    const updated = [...itinerary];
    const removed = updated[dayIndex].activities.find((a) => a.id === actId);
    if (removed && removed.estimatedCost) {
      updated[dayIndex].estimatedDailyCost = Math.max(
        0,
        updated[dayIndex].estimatedDailyCost - removed.estimatedCost
      );
    }
    updated[dayIndex].activities = updated[dayIndex].activities.filter((a) => a.id !== actId);
    onUpdateItinerary(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-ultra text-coral-400 font-bold block">
            Custom Itinerary Schedule
          </span>
          <h4 className="font-serif text-2xl text-white font-medium">
            Day-by-Day Itinerary
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpandedDays(itinerary.map((d) => d.day))}
            className="text-xs text-sand-400 hover:text-coral-300 font-mono transition-colors"
          >
            Expand All
          </button>
          <span className="text-sand-600">•</span>
          <button
            onClick={() => setExpandedDays([])}
            className="text-xs text-sand-400 hover:text-coral-300 font-mono transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Days Stack */}
      <div className="space-y-4">
        {itinerary.map((dayItem, dayIndex) => {
          const isExpanded = expandedDays.includes(dayItem.day);

          return (
            <div
              key={dayItem.day}
              className="rounded-2xl bg-surface-card border border-white/10 overflow-hidden transition-all duration-300"
            >
              {/* Day Accordion Header */}
              <button
                type="button"
                onClick={() => toggleDay(dayItem.day)}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-surface/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-coral-500/10 border border-coral-500/30 text-coral-400 font-mono font-bold flex items-center justify-center shrink-0 text-base">
                    0{dayItem.day}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-sand-400 font-mono block">
                      {dayItem.location} • {dayItem.travelTime || "Local District"}
                    </span>
                    <h5 className="font-serif text-lg sm:text-xl text-white font-medium">
                      {dayItem.title}
                    </h5>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="block text-[10px] text-sand-500 uppercase">Daily Est.</span>
                    <span className="font-mono text-xs font-semibold text-coral-400">
                      {formatCurrency(dayItem.estimatedDailyCost, currency)}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-sand-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Day Expanded Details */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5 space-y-6">
                  {/* High level time of day summaries */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-surface border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-coral-400 font-semibold block">
                        Morning
                      </span>
                      <p className="text-xs text-sand-300 font-light leading-relaxed">
                        {dayItem.morning}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-coral-400 font-semibold block">
                        Afternoon
                      </span>
                      <p className="text-xs text-sand-300 font-light leading-relaxed">
                        {dayItem.afternoon}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-coral-400 font-semibold block">
                        Evening
                      </span>
                      <p className="text-xs text-sand-300 font-light leading-relaxed">
                        {dayItem.evening}
                      </p>
                    </div>
                  </div>

                  {/* Activity Items List (Editable) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-sand-400 font-medium">
                        Planned Activities ({dayItem.activities.length}):
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenPicker(dayIndex)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-coral-500/15 hover:bg-coral-500 border border-coral-500/30 text-xs text-coral-300 hover:text-white font-semibold transition-all shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Activity</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {dayItem.activities.map((act) => (
                        <div
                          key={act.id}
                          className="p-3.5 rounded-xl bg-surface-raised border border-white/5 flex items-center justify-between gap-4 group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-coral-400">
                              {act.timeSlot}
                            </span>
                            <div>
                              <h6 className="text-xs font-semibold text-white">
                                {act.title}
                              </h6>
                              <p className="text-[11px] text-sand-400 font-light line-clamp-1">
                                {act.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs font-mono text-sand-300">
                              {formatCurrency(act.estimatedCost || 0, currency)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveActivity(dayIndex, act.id)}
                              aria-label="Remove activity"
                              className="text-sand-500 hover:text-rose-400 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Attractions & Dining */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start gap-2 text-xs text-sand-300">
                      <Camera className="w-4 h-4 text-coral-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Attractions: </strong>
                        {dayItem.attractions.join(", ") || "Historic monuments & viewpoints"}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-sand-300">
                      <Utensils className="w-4 h-4 text-coral-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Dining: </strong>
                        {dayItem.restaurants.join(", ") || "Artisan trattorias & cliffside bistros"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Activity Selection & Custom Waypoint Modal */}
      {pickerDayIndex !== null && itinerary[pickerDayIndex] && (
        <ActivityPickerModal
          isOpen={pickerDayIndex !== null}
          dayNumber={itinerary[pickerDayIndex].day}
          dayLocation={itinerary[pickerDayIndex].location}
          onClose={() => setPickerDayIndex(null)}
          onAddActivity={handleAddActivityFromPicker}
          currency={currency}
        />
      )}
    </div>
  );
};
