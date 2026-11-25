import { z } from "zod";

export const ActivityItemSchema = z.object({
  id: z.string(),
  timeSlot: z.enum(["morning", "afternoon", "evening"]),
  title: z.string(),
  description: z.string(),
  location: z.string().optional(),
  estimatedCost: z.number().optional().default(0),
  duration: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
});

export const DayItinerarySchema = z.object({
  day: z.number(),
  date: z.string().optional(),
  title: z.string(),
  location: z.string(),
  morning: z.string(),
  afternoon: z.string(),
  evening: z.string(),
  activities: z.array(ActivityItemSchema).default([]),
  attractions: z.array(z.string()).default([]),
  restaurants: z.array(z.string()).default([]),
  estimatedDailyCost: z.number(),
  travelTime: z.string().optional(),
  image: z.string().optional(),
});

export const CostBreakdownSchema = z.object({
  transport: z.number(),
  accommodation: z.number(),
  food: z.number(),
  activities: z.number(),
  other: z.number(),
});

export const AIPackageOptionSchema = z.object({
  id: z.string(),
  packageType: z.enum(["Economy", "Comfort", "Premium"]),
  packageName: z.string(),
  tagline: z.string(),
  description: z.string(),
  destinationOverview: z.string(),
  durationDays: z.number(),
  estimatedBudget: z.number(),
  currency: z.string().default("INR"),
  costBreakdown: CostBreakdownSchema,
  accommodation: z.object({
    type: z.string(),
    hotelSuggestions: z.array(z.string()),
    description: z.string(),
    amenities: z.array(z.string()),
  }),
  highlights: z.array(z.string()),
  itinerary: z.array(DayItinerarySchema),
  transportation: z.object({
    mode: z.string(),
    details: z.string(),
    estimatedCost: z.number(),
  }),
  travelTips: z.array(z.string()),
  packingChecklist: z.array(z.string()),
  assumptions: z.array(z.string()),
  warnings: z.array(z.string()),
  heroImage: z.string().optional(),
});

export const AIGeneratedTripResponseSchema = z.object({
  tripId: z.string(),
  tripOverview: z.object({
    destination: z.string(),
    country: z.string(),
    durationDays: z.number(),
    bestTimeToVisit: z.string(),
    currency: z.string().default("INR"),
    startingLocation: z.string(),
  }),
  packages: z.object({
    economy: AIPackageOptionSchema,
    comfort: AIPackageOptionSchema,
    premium: AIPackageOptionSchema,
  }),
  createdAt: z.string(),
});

export const ExtractedPreferencesSchema = z.object({
  destination: z.string().default("Kyoto, Japan"),
  startingLocation: z.string().default("Mumbai, India"),
  durationDays: z.number().default(7),
  budget: z.number().default(150000),
  currency: z.string().default("INR"),
  travelers: z.number().default(2),
  travelStyle: z.string().default("Cultural"),
  interests: z.array(z.string()).default([]),
  specialRequests: z.string().optional(),
});
