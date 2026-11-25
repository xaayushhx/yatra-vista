import { GoogleGenerativeAI } from "@google/generative-ai";
import { TripPreferences, AIGeneratedTripResponse, AIPackageOption, DayItinerary, ActivityItem } from "@/types";
import { AIGeneratedTripResponseSchema } from "./ai-schemas";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODELS = [
  process.env.GEMINI_MODEL || "gemini-3-flash-preview",
  "gemini-3.5-flash-lite",
  "gemini-3.6-flash",
  "gemini-flash-lite-latest",
];

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

/**
 * Timeout helper to prevent UI hanging on slow external API calls
 */
async function withTimeout<T>(promise: Promise<T>, ms = 6500): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`AI Concierge call timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

/**
 * Resilient multi-model Gemini execution helper
 * Cycles through available models with automatic failover in case of 503 high demand or quota limits
 */
async function generateWithGemini(prompt: string, timeoutMs = 7000): Promise<string> {
  if (!genAI || !GEMINI_API_KEY) {
    throw new Error("Gemini AI client not initialized");
  }

  let lastError: Error | null = null;
  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const result = await withTimeout(model.generateContent(prompt), timeoutMs);
      const text = result.response.text();
      if (text && text.trim().length > 0) {
        return text;
      }
    } catch (err: any) {
      lastError = err;
      // Continue to next available model in candidate pool
    }
  }

  throw lastError || new Error("All Gemini models failed or timed out");
}

/**
 * Natural language parser tailored for Goa travel requests — Powered by Gemini AI
 */
export async function extractPreferencesFromPrompt(naturalText: string): Promise<Partial<TripPreferences>> {
  if (genAI && GEMINI_API_KEY) {
    try {
      const prompt = `
Extract travel preferences for a luxury Goa trip from this text into valid JSON matching:
{
  "destination": string (Goa sanctuary, e.g. "Cabo de Rama & South Goa", "Fontainhas & The Latin Quarter", "Assagao & North Goa Riviera", "Ashvem & Morjim Coastal Dunes", "Divar Island & Mandovi Backwaters", "Ponda Spice Groves & Dudhsagar"),
  "startingLocation": string (e.g. "Mumbai, India", "Bengaluru, India", "Delhi, India"),
  "durationDays": number,
  "budget": number,
  "currency": "INR",
  "travelers": number,
  "travelStyle": "Luxury" | "Cultural" | "Romantic" | "Adventure" | "Beaches" | "Relaxation",
  "preferredActivities": string[]
}
User Text: "${naturalText}"
`;

      const text = await generateWithGemini(prompt, 6000);
      const parsed = JSON.parse(text);
      if (parsed && (parsed.budget || parsed.destination || parsed.durationDays)) {
        return parsed;
      }
    } catch (_error) {
      // Graceful instant fallback to heuristic Goa extractor without cluttering logs
    }
  }

  return extractHeuristicGoaPreferences(naturalText);
}

function extractHeuristicGoaPreferences(text: string): Partial<TripPreferences> {
  const lower = text.toLowerCase();

  let destination = "Cabo de Rama & South Goa";
  if (lower.includes("fontainhas") || lower.includes("latin quarter") || lower.includes("panaji") || lower.includes("old goa")) {
    destination = "Fontainhas & The Latin Quarter";
  } else if (lower.includes("assagao") || lower.includes("vagator") || lower.includes("anjuna") || lower.includes("north goa")) {
    destination = "Assagao & North Goa Riviera";
  } else if (lower.includes("divar") || lower.includes("chorao") || lower.includes("backwaters") || lower.includes("mandovi")) {
    destination = "Divar Island & Mandovi Backwaters";
  } else if (lower.includes("ashvem") || lower.includes("morjim") || lower.includes("mandrem") || lower.includes("turtle")) {
    destination = "Ashvem & Morjim Coastal Dunes";
  } else if (lower.includes("ponda") || lower.includes("dudhsagar") || lower.includes("waterfall") || lower.includes("spice")) {
    destination = "Ponda Spice Groves & Dudhsagar";
  }

  let duration = 5;
  const daysMatch = lower.match(/(\d+)\s*days?/);
  if (daysMatch) duration = parseInt(daysMatch[1], 10);

  let budget = 120000;
  const budgetMatch = lower.match(/(?:₹|rs\.?|inr)?\s*([0-9,]+)/i);
  if (budgetMatch) {
    const cleanNum = parseInt(budgetMatch[1].replace(/,/g, ""), 10);
    if (cleanNum > 10000) budget = cleanNum;
  }

  let style: TripPreferences["travelStyle"] = "Luxury";
  if (lower.includes("heritage") || lower.includes("cultural") || lower.includes("history")) style = "Cultural";
  else if (lower.includes("romantic") || lower.includes("honeymoon") || lower.includes("partner")) style = "Romantic";
  else if (lower.includes("beach") || lower.includes("sea")) style = "Beaches";
  else if (lower.includes("adventure") || lower.includes("waterfall")) style = "Adventure";
  else if (lower.includes("relax") || lower.includes("peaceful") || lower.includes("quiet")) style = "Relaxation";

  return {
    destination,
    startingLocation: "Mumbai, India",
    durationDays: duration,
    budget,
    currency: "INR",
    travelers: lower.includes("partner") || lower.includes("couple") ? 2 : 2,
    travelStyle: style,
    rawPrompt: text,
  };
}

/**
 * Generate 3-tier travel packages strictly for Goa (Economy, Comfort, Premium) — Powered by Gemini AI
 */
export async function generateBespokePackages(
  prefs: TripPreferences
): Promise<AIGeneratedTripResponse> {
  const tripId = `yatra-goa-${Date.now()}`;
  const days = Math.min(Math.max(Number(prefs.durationDays) || 3, 1), 21);
  const baseBudget = Number(prefs.budget) || 140000;
  const destination = prefs.destination || "Assagao & North Goa Riviera";

  if (genAI && GEMINI_API_KEY) {
    try {
      const prompt = `
You are the Executive Travel Architect for YATRA VISTA — THE GOA EDITION.
Generate a structured, luxurious 3-tier travel proposal (economy, comfort, premium) strictly for GOA, INDIA.

User Requirements:
- Target Goa Region: ${destination}
- Departure City: ${prefs.startingLocation || "Mumbai, India"}
- Duration: ${days} Days
- Allocated Budget: ₹${baseBudget} INR
- Travel Style: ${prefs.travelStyle || "Luxury"}

Adhere strictly to this JSON format with all ${days} days populated for each package:
{
  "tripId": "${tripId}",
  "tripOverview": {
    "destination": "${destination}",
    "country": "Goa, India",
    "durationDays": ${days},
    "bestTimeToVisit": "October to April (Golden Coastal Season)",
    "currency": "INR",
    "startingLocation": "${prefs.startingLocation || "Mumbai, India"}"
  },
  "packages": {
    "economy": {
      "id": "pkg-economy",
      "packageType": "Economy",
      "packageName": "Smart Heritage Discovery Tier",
      "tagline": "Authentic Portuguese homestays & local coastal exploration",
      "description": "Character-rich village heritage homestays with trusted chauffeur transit.",
      "destinationOverview": "Authentic immersion in ${destination}.",
      "durationDays": ${days},
      "estimatedBudget": ${Math.round(baseBudget * 0.70)},
      "currency": "INR",
      "costBreakdown": { "transport": ${Math.round(baseBudget * 0.15)}, "accommodation": ${Math.round(baseBudget * 0.28)}, "food": ${Math.round(baseBudget * 0.15)}, "activities": ${Math.round(baseBudget * 0.08)}, "other": ${Math.round(baseBudget * 0.04)} },
      "accommodation": {
        "type": "Restored Portuguese Heritage Homestays",
        "hotelSuggestions": ["Fontainhas Heritage Casa", "Saligao Village Guesthouse"],
        "description": "Portuguese courtyards with ensuite rooms.",
        "amenities": ["Air Conditioning", "Breakfast", "Wi-Fi"]
      },
      "highlights": ["Heritage walk", "Beach sunset", "Divar Island ferry"],
      "itinerary": [
        {
          "day": 1,
          "title": "Day 1: Coastal Arrival",
          "location": "${destination}",
          "morning": "Airport pickup and check-in.",
          "afternoon": "Stroll down to the shore.",
          "evening": "Welcome seafood shack dinner.",
          "activities": [{"id": "act-e-1", "timeSlot": "morning", "title": "Airport Transfer", "description": "Private chauffeur transfer", "estimatedCost": 2500, "duration": "1h", "tags": ["Transfer"]}],
          "attractions": ["Secluded Beach"],
          "restaurants": ["Fishermans Wharf"],
          "estimatedDailyCost": ${Math.round((baseBudget * 0.70) / days)}
        }
      ],
      "transportation": { "mode": "Private Chauffeur Sedan", "details": "Dedicated daily chauffeur sedan", "estimatedCost": ${Math.round(baseBudget * 0.15)} },
      "travelTips": ["Light linen attire", "Sample morning poee bread"],
      "packingChecklist": ["Sunscreen", "Polarized glasses", "Hat"],
      "assumptions": ["Calculated for 2 travelers"],
      "warnings": ["Occasional showers during monsoon season"]
    },
    "comfort": {
      "id": "pkg-comfort",
      "packageType": "Comfort",
      "packageName": "Signature Coastal Haven Tier",
      "tagline": "Curated private boutique villas & coastal experiences",
      "description": "Exclusive private pool villas and relaxing coastal activities.",
      "destinationOverview": "Unmatched coastal serenity in ${destination}.",
      "durationDays": ${days},
      "estimatedBudget": ${baseBudget},
      "currency": "INR",
      "costBreakdown": { "transport": ${Math.round(baseBudget * 0.20)}, "accommodation": ${Math.round(baseBudget * 0.40)}, "food": ${Math.round(baseBudget * 0.22)}, "activities": ${Math.round(baseBudget * 0.12)}, "other": ${Math.round(baseBudget * 0.06)} },
      "accommodation": {
        "type": "Curated 4-Star Private Pool Villa",
        "hotelSuggestions": ["Ahilya by the Sea", "Amrapali House of Grace"],
        "description": "Private plunge pool villa with personalized butler service.",
        "amenities": ["Private Pool", "Artisanal Breakfast", "Butler Service"]
      },
      "highlights": ["Sunset yacht cruise", "Private Fado dinner"],
      "itinerary": [
        {
          "day": 1,
          "title": "Day 1: Arrival & Kokum Welcome",
          "location": "${destination}",
          "morning": "VIP airport transfer in executive SUV.",
          "afternoon": "Poolside relaxation with fresh coconut water.",
          "evening": "Curated candlelit beach dinner.",
          "activities": [{"id": "act-c-1", "timeSlot": "morning", "title": "Executive Transfer", "description": "Door-to-door transfer", "estimatedCost": 3500, "duration": "1h", "tags": ["VIP"]}],
          "attractions": ["Coastal Beach"],
          "restaurants": ["Martins Corner"],
          "estimatedDailyCost": ${Math.round(baseBudget / days)}
        }
      ],
      "transportation": { "mode": "Private Executive SUV", "details": "Dedicated chauffeur vehicle on 24h call", "estimatedCost": ${Math.round(baseBudget * 0.20)} },
      "travelTips": ["Reserve sundowner spots in advance"],
      "packingChecklist": ["Resort wear", "Sunscreen"],
      "assumptions": ["Calculated for 2 travelers"],
      "warnings": ["Advance booking required for fine dining"]
    },
    "premium": {
      "id": "pkg-premium",
      "packageType": "Premium",
      "packageName": "Imperial Heritage Luxury Tier",
      "tagline": "Palatial sea-facing presidential suites & private yacht charters",
      "description": "Ultra-luxury Goan resort with private helicopter transfer and yacht charters.",
      "destinationOverview": "The pinnacle of Goan luxury in ${destination}.",
      "durationDays": ${days},
      "estimatedBudget": ${Math.round(baseBudget * 1.45)},
      "currency": "INR",
      "costBreakdown": { "transport": ${Math.round(baseBudget * 1.45 * 0.24)}, "accommodation": ${Math.round(baseBudget * 1.45 * 0.42)}, "food": ${Math.round(baseBudget * 1.45 * 0.18)}, "activities": ${Math.round(baseBudget * 1.45 * 0.12)}, "other": ${Math.round(baseBudget * 1.45 * 0.04)} },
      "accommodation": {
        "type": "5-Star Oceanfront Presidential Palace Suite",
        "hotelSuggestions": ["The Leela Goa Presidential Villa", "Taj Exotica Sea-Facing Villa"],
        "description": "Panoramic Arabian Sea views with dedicated 24h butler and private infinity pool.",
        "amenities": ["24h Butler", "Private Infinity Pool", "Helipad Access"]
      },
      "highlights": ["Private luxury yacht charter", "Helicopter scenic transfer"],
      "itinerary": [
        {
          "day": 1,
          "title": "Day 1: Imperial Arrival",
          "location": "${destination}",
          "morning": "Helicopter or luxury Maybach transfer.",
          "afternoon": "Private villa check-in and champagne welcome.",
          "evening": "Private chef beachfront dinner under starlight.",
          "activities": [{"id": "act-p-1", "timeSlot": "morning", "title": "Imperial Chauffeur Transfer", "description": "Maybach transfer", "estimatedCost": 8000, "duration": "1h", "tags": ["Ultra-Luxury"]}],
          "attractions": ["Palatial Resort"],
          "restaurants": ["The Leela Private Dining"],
          "estimatedDailyCost": ${Math.round((baseBudget * 1.45) / days)}
        }
      ],
      "transportation": { "mode": "Private Helicopter & Maybach", "details": "On-demand luxury transit", "estimatedCost": ${Math.round(baseBudget * 1.45 * 0.24)} },
      "travelTips": ["Bespoke concierge available 24/7"],
      "packingChecklist": ["Cocktail attire", "Sunscreen"],
      "assumptions": ["Calculated for 2 travelers"],
      "warnings": ["Helicopter flights subject to weather clearance"]
    }
  },
  "createdAt": "${new Date().toISOString()}"
}
`;

      const jsonText = await generateWithGemini(prompt, 9000);
      const parsed = JSON.parse(jsonText);
      const validated = AIGeneratedTripResponseSchema.safeParse(parsed);
      if (validated.success && validated.data.packages.comfort.itinerary.length >= days) {
        return validated.data;
      }
    } catch (_apiError) {
      // Seamlessly fall back to bespoke high-fidelity Goa trip builder
    }
  }

  // High-fidelity tailored Goa trip generator
  return buildTailoredGoaTripResponse(tripId, prefs);
}

function buildTailoredGoaTripResponse(tripId: string, prefs: TripPreferences): AIGeneratedTripResponse {
  const days = Math.min(Math.max(Number(prefs.durationDays) || 3, 1), 21);
  const baseBudget = Number(prefs.budget) || 140000;
  const currency = "INR";
  const destination = prefs.destination || "Assagao & North Goa Riviera";

  // Tier Budgets calibrated strictly to the user's input:
  // Comfort = Exactly the user's allocated budget!
  // Economy = 70% of user's budget (smart savings)
  // Premium = 145% of user's budget (imperial luxury)
  const comfortBudget = baseBudget;
  const economyBudget = Math.round(baseBudget * 0.70);
  const premiumBudget = Math.round(baseBudget * 1.45);

  const buildDays = (tierBudget: number, tierStyle: string): DayItinerary[] => {
    const list: DayItinerary[] = [];
    const dailyEst = Math.round(tierBudget / days);
    for (let i = 1; i <= days; i++) {
      let morning = "";
      let afternoon = "";
      let evening = "";
      let attractions: string[] = [];
      let restaurants: string[] = [];

      if (i === 1) {
        morning = `Private airport transfer from MOPA or Dabolim airport to your ${tierStyle}. Welcome glass of spiced Kokum sherbet and chilled coconut water.`;
        afternoon = `Leisurely stroll through coconut groves down to the beach; gentle dip in the warm Arabian Sea waters.`;
        evening = `Welcome sunset dinner at a beachside bistro featuring fresh Goan butter-garlic tiger prawns and Kingfish curry.`;
        attractions = ["Secluded Coastal Cove", "Coconut Grove Boardwalk"];
        restaurants = ["The Fishermans Wharf", "Martin's Corner"];
      } else if (i === days) {
        morning = `Sunrise yoga session or morning beach walk accompanied by jumping coastal dolphins off the sandbar.`;
        afternoon = `Final artisanal bakery visit for warm bebinca and cashew-feni souvenirs.`;
        evening = `Private chauffeur connection to the airport for your return flight.`;
        attractions = ["Old Goa Heritage Bakery", "Panoramic Clifftop Belvédère"];
        restaurants = ["Café Bodega", "Artisan Panaji Patisserie"];
      } else if (i === 2) {
        morning = `Private catamaran cruise along the secluded cliffs of Cabo de Rama and secret Butterfly Beach.`;
        afternoon = `Picnic lunch on the pristine sands of Cola Beach followed by kayaking in the freshwater emerald lagoon.`;
        evening = `Clifftop sunset drinks overlooking ancient Portuguese fortress walls with crimson horizon views.`;
        attractions = ["Cabo de Rama Fortress", "Cola Beach Lagoon"];
        restaurants = ["Cabo Serai Cliff Lounge", "Sunset Pavilion"];
      } else if (i === 3) {
        morning = `Heritage architecture expedition through Fontainhas Latin Quarter with an art curator; admiring centuries-old Azulejo tilework.`;
        afternoon = `Indo-Portuguese culinary masterclass in a restored 18th-century colonial villa kitchen.`;
        evening = `Acoustic live Fado musical performance paired with regional vintage wine and slow-cooked Pork Vindalho.`;
        attractions = ["Rua 31 de Janeiro", "Immaculate Conception Church"];
        restaurants = ["Viva Panjim", "The Black Sheep Bistro"];
      } else {
        morning = `Private excursion into the lush Sahyadri foothills for a sensory walk through an organic spice plantation.`;
        afternoon = `Authentic Saraswat banana-leaf banquet lunch followed by natural freshwater stream dip.`;
        evening = `Private chef barbecue on the beach under torchlight and Arabian stars.`;
        attractions = ["Ponda Spice Groves", "Sahyadri Rainforest Canopy"];
        restaurants = ["Sahakari Organic Table", "Beachfront Private Grill"];
      }

      list.push({
        day: i,
        date: `Day ${i}`,
        title: `Day ${i}: ${i === 1 ? "Coastal Arrival & Kokum Welcome" : i === days ? "Farewell & Legacy" : i === 2 ? "Coastal Cliffs & Catamaran Cruise" : "Heritage Discovery & Artistry"}`,
        location: destination,
        morning,
        afternoon,
        evening,
        activities: [
          {
            id: `goa-act-${i}-1`,
            timeSlot: "morning",
            title: `Morning Odyssey: ${attractions[0] || "Goan Coastal Sanctuary"}`,
            description: morning,
            estimatedCost: Math.round(dailyEst * 0.35),
            duration: "3 hours",
            tags: ["Coastal", "Heritage"],
          },
          {
            id: `goa-act-${i}-2`,
            timeSlot: "afternoon",
            title: `Afternoon Immersion: Sensory Cuisine & Water`,
            description: afternoon,
            estimatedCost: Math.round(dailyEst * 0.25),
            duration: "3 hours",
            tags: ["Gastronomy", "Nature"],
          },
          {
            id: `goa-act-${i}-3`,
            timeSlot: "evening",
            title: `Evening Repast: ${restaurants[0] || "Sunset Cliffside Dining"}`,
            description: evening,
            estimatedCost: Math.round(dailyEst * 0.40),
            duration: "2.5 hours",
            tags: ["Dining", "Sunset"],
          },
        ],
        attractions,
        restaurants,
        estimatedDailyCost: dailyEst,
        travelTime: "20-40 minutes between coastal waypoints",
      });
    }
    return list;
  };

  // Economy Tier (70% of User Budget - Smart Savings)
  const economyPackage: AIPackageOption = {
    id: "pkg-goa-economy",
    packageType: "Economy",
    packageName: "Smart Heritage Discovery Tier",
    tagline: "Authentic Portuguese homestays, local beach shacks & self-paced coastal exploration",
    description: "Designed for travelers who desire authentic character, staying in century-old Portuguese village villas, eating at legendary local shacks, and traveling with trusted private drivers.",
    destinationOverview: `An authentic deep-dive into ${destination}, highlighting quiet coves and historic backstreets.`,
    durationDays: days,
    estimatedBudget: economyBudget,
    currency,
    costBreakdown: {
      transport: Math.round(economyBudget * 0.22),
      accommodation: Math.round(economyBudget * 0.40),
      food: Math.round(economyBudget * 0.22),
      activities: Math.round(economyBudget * 0.12),
      other: economyBudget - (Math.round(economyBudget * 0.22) + Math.round(economyBudget * 0.40) + Math.round(economyBudget * 0.22) + Math.round(economyBudget * 0.12)),
    },
    accommodation: {
      type: "Restored Portuguese Heritage Homestays & Village Boutiques",
      hotelSuggestions: ["Mateus Boutique Hotel, Fontainhas", "Siolim Heritage Guesthouse", "Cabo Vista Cottage"],
      description: "Authentic Portuguese tiled courtyards, ensuite bathrooms, high ceilings, and daily farm-fresh Goan breakfast.",
      amenities: ["Complimentary Wi-Fi", "Goan Breakfast with Fresh Poee", "Air Conditioning", "Heritage Verandas"],
    },
    highlights: [
      "Guided Fontainhas Latin Quarter walking trail",
      "Sunset drinks at secluded Cola Beach Lagoon",
      "Authentic seafood thali at heritage coastal bistros",
      "Private river ferry crossing to Divar Island",
    ],
    itinerary: buildDays(economyBudget, "Heritage Boutique"),
    transportation: {
      mode: "Private Chauffeur Sedan & River Ferries",
      details: "Airport pickup & drop-off + dedicated daily sedan with local driver",
      estimatedCost: Math.round(economyBudget * 0.22),
    },
    travelTips: [
      "Early mornings (7-9 AM) are the quietest time to photograph the Latin Quarter facades",
      "Try fresh toddy and artisan cashew feni from local distillers in Ponda",
      "Always carry cash for local beachside bistros",
    ],
    packingChecklist: [
      "Breathable cotton & linen shirts",
      "Slip-on beach sandals",
      "Polarized sunglasses",
      "High-SPF sunscreen",
    ],
    assumptions: ["Calculated for double occupancy."],
    warnings: ["Coastal shack timings vary post-monsoon."],
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop",
  };

  // Comfort Tier (Signature Luxury - Exactly User's Target Budget!)
  const comfortPackage: AIPackageOption = {
    id: "pkg-goa-comfort",
    packageType: "Comfort",
    packageName: "Signature Coastal Haven Tier",
    tagline: "The golden equilibrium of boutique luxury villas, private sunset catamarans & chef dining",
    description: "Our most coveted Goa journey. Combines private pool suites in historic Assagao or clifftop South Goa, private catamaran charters along Cabo de Rama, and reserved tables at acclaimed dining rooms.",
    destinationOverview: `A refined, frictionless journey across ${destination}, where bohemian chic meets tranquil luxury.`,
    durationDays: days,
    estimatedBudget: comfortBudget,
    currency,
    costBreakdown: {
      transport: Math.round(comfortBudget * 0.20),
      accommodation: Math.round(comfortBudget * 0.44),
      food: Math.round(comfortBudget * 0.20),
      activities: Math.round(comfortBudget * 0.12),
      other: comfortBudget - (Math.round(comfortBudget * 0.20) + Math.round(comfortBudget * 0.44) + Math.round(comfortBudget * 0.20) + Math.round(comfortBudget * 0.12)),
    },
    accommodation: {
      type: "4-Star Boutique Heritage Estates & Secluded Beach Resorts",
      hotelSuggestions: ["Ahilya by the Sea, Nerul", "The Postcard Velha", "Cabo Serai Clifftop Haven"],
      description: "Private sea-view plunge pools, ancient banyan tree gardens, and personalized butler concierge service.",
      amenities: ["Private Plunge Pool / Sea View", "Daily Champagne Breakfast", "Ayurvedic Spa Circuit", "Dedicated Concierge"],
    },
    highlights: [
      "Private catamaran sunset cruise with champagne along South Goa cliffs",
      "Exclusive candlelit Fado music dinner in Fontainhas",
      "Private chef degustation menu in Assagao",
      "Dawn dolphin spotting in a private outrigger boat",
    ],
    itinerary: buildDays(comfortBudget, "Curated 4-Star Villa"),
    transportation: {
      mode: "Private Executive SUV & River Catamaran",
      details: "Dedicated chauffeur on standby throughout your stay with door-to-door luggage handling",
      estimatedCost: Math.round(comfortBudget * 0.20),
    },
    travelTips: [
      "Reserve dinner at top Assagao dining rooms 1 week in advance",
      "Opt for an early morning yoga session overlooking the sea",
      "Rent a beach bicycle for peaceful rides along Ashvem sands",
    ],
    packingChecklist: [
      "Linen resort wear and evening dresses",
      "UV400 sunglasses",
      "Boat deck shoes",
      "Coral-safe sunscreen",
    ],
    assumptions: ["Includes all VIP transfers, private catamaran, and chef experiences."],
    warnings: ["Peak holiday dates (Dec 20 - Jan 5) carry high seasonal surcharges."],
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
  };

  // Premium Tier (145% of User Budget - Royal Luxury)
  const premiumPackage: AIPackageOption = {
    id: "pkg-goa-premium",
    packageType: "Premium",
    packageName: "Royal Goan Palace & Yacht Tier",
    tagline: "Uncompromising royalty: 5-star beachfront palaces, private Riva yacht charters & personal master chefs",
    description: "The absolute pinnacle of Goan luxury. Stay in presidential ocean villas at The Leela or Taj Exotica, charter custom wooden speed yachts along the Arabian Sea, and experience after-hours access to aristocratic family estates.",
    destinationOverview: `An aristocratic Goa expedition where every door opens exclusively for your party.`,
    durationDays: days,
    estimatedBudget: premiumBudget,
    currency,
    costBreakdown: {
      transport: Math.round(premiumBudget * 0.24),
      accommodation: Math.round(premiumBudget * 0.46),
      food: Math.round(premiumBudget * 0.16),
      activities: Math.round(premiumBudget * 0.10),
      other: premiumBudget - (Math.round(premiumBudget * 0.24) + Math.round(premiumBudget * 0.46) + Math.round(premiumBudget * 0.16) + Math.round(premiumBudget * 0.10)),
    },
    accommodation: {
      type: "5-Star Ultra-Luxury Beachfront Palaces & Private Island Manors",
      hotelSuggestions: ["The Leela Goa Presidential Villa", "Taj Exotica Resort & Spa Ocean Villa", "W Goa Extreme WOW Suite"],
      description: "Palatial 75-acre beachfront estates, private lap pools, personal butler, and direct access to virgin sands.",
      amenities: ["24/7 Dedicated Butler", "Helipad & VIP Airport Lounge Access", "Private Chef Dining", "Private Ocean Cabana"],
    },
    highlights: [
      "Full-day private luxury yacht charter along the Konkan coast with vintage champagne",
      "Helicopter scenic transfer from MOPA airport directly to resort helipad",
      "Exclusive private Fado & Saraswat banquet hosted in a private 17th-century palace",
      "Private beachfront seafood barbecue prepared on the sand by executive master chefs",
    ],
    itinerary: buildDays(premiumBudget, "5-Star Palace Royal"),
    transportation: {
      mode: "Private Helicopter & Custom Luxury Yacht",
      details: "Helicopter transfers + luxury Mercedes Maybach chauffeur on 24h standby",
      estimatedCost: Math.round(premiumBudget * 0.24),
    },
    travelTips: [
      "Coordinate helicopter clearance times 48 hours in advance with your private concierge",
      "Smart elegant resort attire for evening clifftop lounges",
      "In-suite bespoke tailoring and spa treatments available on demand",
    ],
    packingChecklist: [
      "Tailored linen blazers & designer swimwear",
      "Fine evening resort wear",
      "High-end mirrorless camera with prime lenses",
      "Waterproof yacht footwear",
    ],
    assumptions: ["Includes private yacht, helicopter transfers, and dedicated butler."],
    warnings: ["Helicopter flights are subject to DGCA weather clearance."],
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
  };

  return {
    tripId,
    tripOverview: {
      destination,
      country: "Goa, India",
      durationDays: days,
      bestTimeToVisit: "October to April (Golden Coastal Season)",
      currency,
      startingLocation: prefs.startingLocation || "Mumbai, India",
    },
    packages: {
      economy: economyPackage,
      comfort: comfortPackage,
      premium: premiumPackage,
    },
    createdAt: new Date().toISOString(),
  };
}

/**
 * Conversational Itinerary Modification Engine for Goa — Powered by Gemini AI
 * Seamlessly modifies active package, target days, activities, time slots, and narratives
 */
export async function refinePackageWithAI(
  currentPackage: AIPackageOption,
  userInstruction: string
): Promise<AIPackageOption> {
  const raw = userInstruction.trim();

  // 1. Direct Gemini AI Generative Re-orchestration
  if (genAI && GEMINI_API_KEY) {
    try {
      const prompt = `
You are the AI Travel Concierge Engine for YATRA VISTA — The Bespoke Goa Luxury Atelier.
A traveler on a ${currentPackage.durationDays}-day luxury Goa trip (${currentPackage.packageName}) has requested this natural language itinerary adjustment:
"${raw}"

Current Itinerary Context:
${JSON.stringify(
  currentPackage.itinerary.map((d) => ({
    day: d.day,
    title: d.title,
    morning: d.morning,
    afternoon: d.afternoon,
    evening: d.evening,
    activities: d.activities.map((a) => `${a.timeSlot}: ${a.title}`),
    attractions: d.attractions,
    restaurants: d.restaurants,
  })),
  null,
  2
)}

Analyze this instruction with natural language intelligence and return a valid JSON object matching this schema:
{
  "targetDay": number (integer between 1 and ${currentPackage.durationDays}, identifying which day is being adjusted),
  "timeSlot": "morning" | "afternoon" | "evening",
  "activityTitle": string (concise luxury activity title, e.g. "Sunset on Vagator Beach", "Private Fado Dinner in Fontainhas"),
  "activityDescription": string (evocative, luxurious description of the waypoint activity),
  "location": string (specific Goa location, e.g. "Vagator Beach, North Goa", "Fontainhas, Panaji"),
  "estimatedCost": number (realistic estimated cost in INR, e.g. 3500),
  "duration": string (e.g. "2.5 hours", "3 hours"),
  "tags": string[] (e.g. ["Sunset", "Coastal", "Vagator Beach"]),
  "dayNarrativeUpdate": string (evocative description for the day time slot narrative),
  "dayTitleUpdate": string (refined day title reflecting the new highlight, e.g. "Day 2: Coastal Cliffs & Vagator Beach Sunset"),
  "attractionToAdd": string (name of landmark/beach to add to attractions list, or empty string),
  "restaurantToAdd": string (name of restaurant/lounge to add to dining suggestions, or empty string),
  "highlight": string (e.g. "Day 2: Sunset on Vagator Beach"),
  "budgetAdjustmentMultiplier": number (e.g. 0.85 if requesting cheaper, 1.25 if requesting luxury upgrade, 1.0 otherwise)
}
`;

      const jsonText = await generateWithGemini(prompt, 6000);
      const aiAnalysis = JSON.parse(jsonText);
      if (aiAnalysis && typeof aiAnalysis.targetDay === "number") {
        return applyAIModificationToPackage(currentPackage, aiAnalysis, raw);
      }
    } catch (_err) {
      // Seamless failover if Gemini is under temporary high demand (503) or rate limits
    }
  }

  // 2. High-fidelity Goan modification fallback
  return applyHeuristicGoaModification(currentPackage, raw);
}

function applyAIModificationToPackage(
  currentPackage: AIPackageOption,
  aiAnalysis: any,
  rawInstruction: string
): AIPackageOption {
  const updated: AIPackageOption = JSON.parse(JSON.stringify(currentPackage));
  const dayIndex = Math.min(Math.max((Number(aiAnalysis.targetDay) || 1) - 1, 0), updated.itinerary.length - 1);
  const targetDay = updated.itinerary[dayIndex];
  if (!targetDay) return updated;

  const timeSlot: "morning" | "afternoon" | "evening" =
    aiAnalysis.timeSlot === "morning" || aiAnalysis.timeSlot === "afternoon" || aiAnalysis.timeSlot === "evening"
      ? aiAnalysis.timeSlot
      : "evening";

  // 1. Update day narrative
  if (aiAnalysis.dayNarrativeUpdate) {
    targetDay[timeSlot] = aiAnalysis.dayNarrativeUpdate;
  }

  // 2. Update day title
  if (aiAnalysis.dayTitleUpdate) {
    targetDay.title = aiAnalysis.dayTitleUpdate;
  }

  // 3. Update day activities array
  if (!targetDay.activities) targetDay.activities = [];
  const existingSlotIdx = targetDay.activities.findIndex((a) => a.timeSlot === timeSlot);
  const cost =
    Number(aiAnalysis.estimatedCost) ||
    (existingSlotIdx >= 0 && targetDay.activities[existingSlotIdx].estimatedCost
      ? targetDay.activities[existingSlotIdx].estimatedCost
      : 3500) ||
    3500;

  const newActivity: ActivityItem = {
    id: `goa-act-ai-${dayIndex + 1}-${timeSlot}-${Date.now()}`,
    timeSlot: timeSlot,
    title: aiAnalysis.activityTitle || `Waypoint: ${aiAnalysis.location || "Goa"}`,
    description: aiAnalysis.activityDescription || targetDay[timeSlot],
    location: aiAnalysis.location || targetDay.location,
    estimatedCost: cost,
    duration: aiAnalysis.duration || (timeSlot === "evening" ? "2.5 hours" : "3 hours"),
    tags: Array.isArray(aiAnalysis.tags) && aiAnalysis.tags.length > 0 ? aiAnalysis.tags : ["Curated", "Goa"],
  };

  if (existingSlotIdx >= 0) {
    targetDay.activities[existingSlotIdx] = newActivity;
  } else {
    targetDay.activities.push(newActivity);
    const order: Record<string, number> = { morning: 1, afternoon: 2, evening: 3 };
    targetDay.activities.sort((a, b) => (order[a.timeSlot] || 2) - (order[b.timeSlot] || 2));
  }

  // 4. Update attractions
  if (aiAnalysis.attractionToAdd && typeof aiAnalysis.attractionToAdd === "string" && aiAnalysis.attractionToAdd.trim()) {
    if (!targetDay.attractions.includes(aiAnalysis.attractionToAdd)) {
      targetDay.attractions = [aiAnalysis.attractionToAdd, ...targetDay.attractions];
    }
  }

  // 5. Update restaurants
  if (aiAnalysis.restaurantToAdd && typeof aiAnalysis.restaurantToAdd === "string" && aiAnalysis.restaurantToAdd.trim()) {
    if (!targetDay.restaurants.includes(aiAnalysis.restaurantToAdd)) {
      targetDay.restaurants = [aiAnalysis.restaurantToAdd, ...targetDay.restaurants];
    }
  }

  // 6. Update budget if requested
  const multiplier = Number(aiAnalysis.budgetAdjustmentMultiplier) || 1.0;
  if (multiplier !== 1.0) {
    updated.estimatedBudget = Math.round(updated.estimatedBudget * multiplier);
    updated.costBreakdown.accommodation = Math.round(updated.costBreakdown.accommodation * multiplier);
    updated.costBreakdown.transport = Math.round(updated.costBreakdown.transport * multiplier);
    updated.costBreakdown.food = Math.round(updated.costBreakdown.food * multiplier);
  }

  // 7. Update highlight
  if (aiAnalysis.highlight) {
    updated.highlights = [aiAnalysis.highlight, ...updated.highlights.filter((h) => h !== aiAnalysis.highlight)];
  } else {
    updated.highlights.unshift(`Day ${dayIndex + 1}: ${newActivity.title}`);
  }

  return updated;
}

function applyHeuristicGoaModification(
  currentPackage: AIPackageOption,
  userInstruction: string
): AIPackageOption {
  const raw = userInstruction.trim();
  const lower = raw.toLowerCase();
  const updated: AIPackageOption = JSON.parse(JSON.stringify(currentPackage));

  // 1. Budget Reductions
  if (
    lower.includes("cheaper") ||
    lower.includes("reduce budget") ||
    lower.includes("less expensive") ||
    lower.includes("cut cost") ||
    lower.includes("lower budget")
  ) {
    updated.estimatedBudget = Math.round(updated.estimatedBudget * 0.85);
    updated.costBreakdown.accommodation = Math.round(updated.costBreakdown.accommodation * 0.82);
    updated.costBreakdown.transport = Math.round(updated.costBreakdown.transport * 0.85);
    updated.costBreakdown.food = Math.round(updated.costBreakdown.food * 0.88);
    updated.tagline = updated.tagline.replace(/\s*\(Optimized.*\)/, "") + " (Cost Optimized)";
    updated.travelTips.unshift("Adjusted to leverage boutique Portuguese villas and scenic regional transit.");
    return updated;
  }

  // 2. Luxury Upgrades
  if (
    lower.includes("luxury") ||
    lower.includes("better hotel") ||
    lower.includes("upgrade accommodation") ||
    lower.includes("villa suite") ||
    lower.includes("5-star") ||
    lower.includes("presidential")
  ) {
    updated.estimatedBudget = Math.round(updated.estimatedBudget * 1.25);
    updated.accommodation.type = "Upgraded Oceanfront Heritage Villa Suite & Private Plunge Pool";
    updated.accommodation.hotelSuggestions = [
      "The Leela Goa Presidential Beach Villa",
      "Taj Exotica Sea-Facing Heritage Villa",
      ...updated.accommodation.hotelSuggestions.filter((h) => !h.includes("Leela")),
    ];
    updated.accommodation.amenities = [
      "Private Butler 24/7",
      "Private Plunge Pool",
      "Sunset Ocean Veranda",
      ...updated.accommodation.amenities,
    ];
    updated.highlights.unshift("Private VIP airport express transfer & welcome chilled champagne");
    return updated;
  }

  // 3. Relaxed Pace / Beach Siestas across all days
  if (
    lower.includes("relaxed") ||
    lower.includes("siesta") ||
    lower.includes("unhurried") ||
    lower.includes("slower pace")
  ) {
    updated.tagline = updated.tagline.replace(/\s*\(Unhurried.*\)/, "") + " (Unhurried Siesta Rhythm)";
    for (const day of updated.itinerary) {
      day.afternoon =
        "Unhurried coastal beach siesta under shaded swaying palms with chilled coconut water and gentle sea breeze.";
      const act = day.activities.find((a) => a.timeSlot === "afternoon");
      if (act) {
        act.title = "Coastal Beach Siesta & Hammock Relaxation";
        act.description = day.afternoon;
        act.tags = ["Relaxation", "Beach", "Siesta"];
      }
    }
    return updated;
  }

  // 4. Culinary / Masterclass focus without specific day
  if (
    (lower.includes("culinary") || lower.includes("cooking") || lower.includes("masterclass")) &&
    !lower.match(/day\s*\d+/)
  ) {
    if (updated.itinerary.length > 1) {
      const targetDay = updated.itinerary[1]; // Day 2
      targetDay.afternoon =
        "Private Indo-Portuguese culinary masterclass hosted by an executive Goan chef (Kingfish Curry, Crab Xec Xec, Bebinca).";
      const act = targetDay.activities.find((a) => a.timeSlot === "afternoon");
      if (act) {
        act.title = "Indo-Portuguese Culinary Masterclass";
        act.description = targetDay.afternoon;
        act.tags = ["Gastronomy", "Masterclass", "Goan"];
      }
      targetDay.restaurants.unshift("Bespoke Private Villa Kitchen");
    }
    updated.highlights.unshift("Private hands-on Indo-Portuguese seafood cooking masterclass");
    return updated;
  }

  // 5. Day-Specific or Waypoint-Specific Refinement (e.g. "add sunset on vaagator beach on day 2")
  // Extract Target Day Number
  let targetDayNumber: number | null = null;
  const dayMatch =
    lower.match(/(?:on|for|in|at|to)?\s*(?:day|d)\s*(\d+)/i) ||
    lower.match(/(\d+)(?:st|nd|rd|th)?\s*day/i);

  if (dayMatch) {
    targetDayNumber = parseInt(dayMatch[1], 10);
  } else if (lower.includes("first day") || lower.includes("1st day") || lower.includes("arrival day")) {
    targetDayNumber = 1;
  } else if (lower.includes("second day") || lower.includes("2nd day")) {
    targetDayNumber = 2;
  } else if (lower.includes("third day") || lower.includes("3rd day")) {
    targetDayNumber = 3;
  } else if (lower.includes("fourth day") || lower.includes("4th day")) {
    targetDayNumber = 4;
  } else if (lower.includes("fifth day") || lower.includes("5th day")) {
    targetDayNumber = 5;
  } else if (lower.includes("last day") || lower.includes("final day") || lower.includes("departure day")) {
    targetDayNumber = updated.itinerary.length;
  }

  // Determine day index (defaulting to Day 2 or matching sanctuary location)
  let dayIndex = 1;
  if (targetDayNumber !== null) {
    dayIndex = Math.min(Math.max(targetDayNumber - 1, 0), updated.itinerary.length - 1);
  } else {
    // Intelligent regional detection if day is not explicitly numbered
    if (lower.includes("fontainhas") || lower.includes("latin") || lower.includes("panaji")) {
      const idx = updated.itinerary.findIndex((d) =>
        d.attractions.some((a) => a.toLowerCase().includes("fontainhas")) ||
        d.morning.toLowerCase().includes("fontainhas")
      );
      dayIndex = idx >= 0 ? idx : Math.min(2, updated.itinerary.length - 1);
    } else if (lower.includes("cabo") || lower.includes("cola") || lower.includes("south goa")) {
      const idx = updated.itinerary.findIndex((d) =>
        d.attractions.some((a) => a.toLowerCase().includes("cabo")) ||
        d.morning.toLowerCase().includes("cabo")
      );
      dayIndex = idx >= 0 ? idx : 1;
    } else if (
      lower.includes("vagator") ||
      lower.includes("vaagator") ||
      lower.includes("assagao") ||
      lower.includes("north goa")
    ) {
      const idx = updated.itinerary.findIndex((d) =>
        d.title.toLowerCase().includes("north") ||
        d.location.toLowerCase().includes("assagao")
      );
      dayIndex = idx >= 0 ? idx : 1;
    }
  }

  const targetDay = updated.itinerary[dayIndex];
  if (!targetDay) return updated;

  // Detect time slot
  let timeSlot: "morning" | "afternoon" | "evening" = "evening";
  if (
    lower.includes("morning") ||
    lower.includes("sunrise") ||
    lower.includes("breakfast") ||
    lower.includes("yoga") ||
    lower.includes("dawn") ||
    lower.includes("early")
  ) {
    timeSlot = "morning";
  } else if (
    lower.includes("afternoon") ||
    lower.includes("lunch") ||
    lower.includes("midday") ||
    lower.includes("kayak") ||
    lower.includes("waterfall") ||
    lower.includes("spice") ||
    lower.includes("plantation")
  ) {
    timeSlot = "afternoon";
  } else {
    // Default to evening for sunset, sundowner, dinner, cocktails, fado, yacht cruise, etc.
    timeSlot = "evening";
  }

  // Extract clean activity title
  let cleanTitle = raw;
  cleanTitle = cleanTitle.replace(
    /^(?:please\s+)?(?:add\s+(?:a\s+)?|include\s+(?:a\s+)?|schedule\s+(?:a\s+)?|put\s+(?:a\s+)?|insert\s+(?:a\s+)?|replace\s+.*?\s+with\s+|change\s+to\s+|have\s+(?:a\s+)?)/i,
    ""
  );
  cleanTitle = cleanTitle.replace(/(?:on|for|in|at|during)?\s*day\s*\d+/gi, "");
  cleanTitle = cleanTitle.replace(
    /(?:on|for|in|at|during)?\s*(?:first|second|third|fourth|fifth|last|final)\s*day/gi,
    ""
  );
  cleanTitle = cleanTitle.replace(/(?:on|for|in|at|during)?\s*\d+(?:st|nd|rd|th)?\s*day/gi, "");
  cleanTitle = cleanTitle.replace(/(?:in\s+the\s+)?(?:morning|afternoon|evening|night)$/i, "").trim();
  cleanTitle = cleanTitle.replace(/^(?:an?\s+)/i, "");

  // Normalize Goan destination names and common phonetic spellings (e.g. vaagator -> Vagator)
  const placeReplacements: [RegExp, string][] = [
    [/\bvaagator\b/gi, "Vagator"],
    [/\bvagator\b/gi, "Vagator"],
    [/\banjuna\b/gi, "Anjuna"],
    [/\bassagao\b/gi, "Assagao"],
    [/\bmorjim\b/gi, "Morjim"],
    [/\bashvem\b/gi, "Ashvem"],
    [/\bmandrem\b/gi, "Mandrem"],
    [/\barambol\b/gi, "Arambol"],
    [/\bchapora\b/gi, "Chapora"],
    [/\bcalangute\b/gi, "Calangute"],
    [/\bcandolim\b/gi, "Candolim"],
    [/\bbaga\b/gi, "Baga"],
    [/\bsinquerim\b/gi, "Sinquerim"],
    [/\baguada\b/gi, "Fort Aguada"],
    [/\breis\s*magos\b/gi, "Reis Magos"],
    [/\bpanaji\b|\bpanjim\b/gi, "Panaji"],
    [/\bfontainhas\b/gi, "Fontainhas"],
    [/\bdivar\b/gi, "Divar Island"],
    [/\bchorao\b/gi, "Chorao Island"],
    [/\bcabo\s*(?:de\s*)?rama\b/gi, "Cabo de Rama"],
    [/\bcola(?:\s*beach)?\b/gi, "Cola Beach"],
    [/\bpalolem\b/gi, "Palolem Beach"],
    [/\bagonda\b/gi, "Agonda Beach"],
    [/\bbutterfly\s*(?:beach)?\b/gi, "Butterfly Beach"],
    [/\bdudhsagar\b/gi, "Dudhsagar Waterfalls"],
    [/\bponda\b/gi, "Ponda"],
  ];

  for (const [pattern, proper] of placeReplacements) {
    cleanTitle = cleanTitle.replace(pattern, proper);
  }

  // Proper Title-Casing
  cleanTitle = cleanTitle
    .split(/\s+/)
    .map((w, idx) => {
      const lowerW = w.toLowerCase();
      if (
        idx > 0 &&
        ["on", "at", "in", "the", "a", "an", "and", "of", "with", "to", "for", "along"].includes(lowerW)
      ) {
        return lowerW;
      }
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");

  // Identify specific Goa location
  let detectedLocation = "Goa Shoreline";
  for (const [, proper] of placeReplacements) {
    if (cleanTitle.toLowerCase().includes(proper.toLowerCase())) {
      detectedLocation = `${proper}, Goa`;
      break;
    }
  }

  // Format detailed narrative description for the slot card
  let richNarrative = "";
  if (timeSlot === "evening") {
    if (lower.includes("sunset") || lower.includes("sundown")) {
      richNarrative = `Bespoke sunset rendezvous: ${cleanTitle}, savoring crimson twilight over the Arabian Sea clifftops, accompanied by ambient coastal breezes and curated cocktails.`;
    } else if (lower.includes("fado")) {
      richNarrative = `Exclusive candlelit Portuguese Fado musical dinner: ${cleanTitle}, featuring soulful Portuguese melodies and slow-cooked Indo-Portuguese delicacies.`;
    } else if (lower.includes("yacht") || lower.includes("cruise") || lower.includes("catamaran")) {
      richNarrative = `Private sunset cruise aboard a chartered catamaran off ${detectedLocation}, with chilled champagne, canapés, and panoramic coastal horizon views.`;
    } else {
      richNarrative = `Curated evening repast: ${cleanTitle}, featuring ambient seaside seating, fresh coastal gastronomy, and unhurried Goan hospitality.`;
    }
    targetDay.evening = richNarrative;
  } else if (timeSlot === "morning") {
    richNarrative = `Morning exploration: ${cleanTitle}, breathing in fresh sea air along serene shoreline trails followed by artisanal tropical breakfast.`;
    targetDay.morning = richNarrative;
  } else {
    richNarrative = `Afternoon immersion: ${cleanTitle}, offering bespoke discovery, local cultural heritage, and authentic Goan coastal charm.`;
    targetDay.afternoon = richNarrative;
  }

  // Update target day title if location changed
  if (cleanTitle.toLowerCase().includes("vagator")) {
    targetDay.title = `Day ${dayIndex + 1}: Coastal Cliffs & Vagator Beach Sunset`;
  } else if (cleanTitle.toLowerCase().includes("fontainhas")) {
    targetDay.title = `Day ${dayIndex + 1}: Fontainhas Heritage & Latin Artistry`;
  } else if (cleanTitle.toLowerCase().includes("dudhsagar")) {
    targetDay.title = `Day ${dayIndex + 1}: Sahyadri Rainforest & Dudhsagar Cascades`;
  }

  // Update targetDay.activities array so the Scheduled Waypoints & Activities list renders the new activity
  if (!targetDay.activities) targetDay.activities = [];

  const existingSlotIdx = targetDay.activities.findIndex((a) => a.timeSlot === timeSlot);
  const cost =
    existingSlotIdx >= 0 && targetDay.activities[existingSlotIdx].estimatedCost
      ? targetDay.activities[existingSlotIdx].estimatedCost
      : Math.round(targetDay.estimatedDailyCost * 0.35);

  const formattedActivity: ActivityItem = {
    id: `goa-act-refine-${dayIndex + 1}-${timeSlot}-${Date.now()}`,
    timeSlot: timeSlot,
    title: cleanTitle.length > 3 ? cleanTitle : `Sunset at ${detectedLocation}`,
    description: richNarrative,
    location: detectedLocation,
    estimatedCost: cost,
    duration: timeSlot === "evening" ? "2.5 hours" : "3 hours",
    tags: [timeSlot === "evening" ? "Sunset" : timeSlot === "morning" ? "Morning" : "Exploration", "Coastal", "Curated"],
  };

  if (existingSlotIdx >= 0) {
    // Replace the activity in this slot so the timeline waypoint directly reflects the user's refinement
    targetDay.activities[existingSlotIdx] = formattedActivity;
  } else {
    targetDay.activities.push(formattedActivity);
    const order: Record<string, number> = { morning: 1, afternoon: 2, evening: 3 };
    targetDay.activities.sort((a, b) => (order[a.timeSlot] || 2) - (order[b.timeSlot] || 2));
  }

  // Update attractions and restaurants in the day card
  if (detectedLocation && detectedLocation !== "Goa Shoreline") {
    const locName = detectedLocation.replace(", Goa", "");
    if (!targetDay.attractions.includes(locName)) {
      targetDay.attractions = [locName, ...targetDay.attractions];
    }
  }

  if (
    lower.includes("dinner") ||
    lower.includes("restaurant") ||
    lower.includes("cocktail") ||
    lower.includes("sunset") ||
    lower.includes("fado")
  ) {
    if (cleanTitle.includes("Vagator")) {
      targetDay.restaurants = [
        "Titlie Clifftop Lounge, Vagator",
        ...targetDay.restaurants.filter((r) => !r.includes("Titlie")),
      ];
    } else if (cleanTitle.includes("Fontainhas")) {
      targetDay.restaurants = [
        "Viva Panjim Heritage Fado Tavern",
        ...targetDay.restaurants.filter((r) => !r.includes("Viva Panjim")),
      ];
    } else if (cleanTitle.includes("Cabo")) {
      targetDay.restaurants = [
        "Cabo Serai Cliff Lounge",
        ...targetDay.restaurants.filter((r) => !r.includes("Cabo Serai")),
      ];
    }
  }

  // Prepend new highlight to the package
  updated.highlights.unshift(`Day ${dayIndex + 1}: ${formattedActivity.title}`);

  return updated;
}
