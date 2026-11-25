import { Destination, TravelPackage } from "@/types";

export const DESTINATIONS: Destination[] = [
  {
    id: "cabo-de-rama",
    name: "Cabo de Rama & South Goa",
    country: "Goa, India",
    tagline: "Sheer coastal cliffs, turquoise coves & peaceful coconut groves",
    description: "The untouched southern frontier of Goa, where dramatic red laterite cliffs plunge into quiet Arabian Sea waters.",
    longDescription: "Cabo de Rama represents the tranquil, poetic soul of Goa. Far removed from commercial noise, this secluded sanctuary is framed by the historic 18th-century clifftop fortress, turquoise hidden coves like Butterfly Beach and Cola Beach's emerald lagoon, and private luxury villas nestled under swaying palm canopies where dolphins play off the shore at dawn.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    ],
    coordinates: [15.0867, 73.9189],
    bestSeason: "October to April",
    idealDuration: "4 to 7 Days",
    startingPrice: 85000,
    currency: "INR",
    category: ["Luxury", "Romantic", "Beaches"],
    highlights: [
      "Private sunset yacht cruise along Cabo de Rama cliffs",
      "Freshwater lagoon kayak at secluded Cola Beach",
      "Beachfront Ayurvedic rejuvenation therapies at dawn",
      "Exclusive candlelit clifftop private dining"
    ],
    attractions: [
      { name: "Cabo de Rama Clifftop Fort", description: "Historic Portuguese bastion with 360-degree panoramic ocean horizons.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop" },
      { name: "Cola Beach Emerald Lagoon", description: "Pristine freshwater river meeting the salty Arabian Sea in a natural sandbank.", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop" },
      { name: "Agonda & Butterfly Coves", description: "Quiet crescent shores frequented by sea turtles and schools of dolphins.", image: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=800&auto=format&fit=crop" }
    ],
    localExperiences: [
      "Sunrise dolphin spotting aboard a private wooden outrigger boat",
      "Artisan Feni distillation masterclass in a traditional cashew orchard",
      "Private yoga & sound meditation on secluded red rock outcrops"
    ],
    cuisine: [
      "Fresh butter-garlic tiger prawns",
      "Goan Kingfish Curry with red parboiled rice",
      "Spiced Crab Xec Xec",
      "Traditional Bebinca cake with coconut milk"
    ],
    stayRecommendations: [
      { name: "The Leela Goa, Cavelossim", type: "75-Acre Beachfront Palatial Haven", priceRange: "₹45,000 / night" },
      { name: "Taj Exotica Resort & Spa, Benaulim", type: "Mediterranean-Style Seaside Oasis", priceRange: "₹40,000 / night" },
      { name: "Cabo Serai", type: "Eco-Luxury Cliffside Tent Sanctuary", priceRange: "₹28,000 / night" }
    ],
    travelTips: [
      "South Goa is best explored at an unhurried, contemplative pace",
      "Rent an open-top vintage jeep or arrange a private chauffeur for coastal cliff drives",
      "Visit Cabo de Rama Fort at golden hour for unmatched crimson sunsets"
    ],
    weather: {
      temp: "28°C",
      condition: "Tropical Ocean Breeze",
      humidity: "62%",
      bestMonths: "Oct - Apr"
    }
  },
  {
    id: "fontainhas-panaji",
    name: "Fontainhas & The Latin Quarter",
    country: "Goa, India",
    tagline: "18th-century Portuguese heritage, azulejo tiles & poetic lanes",
    description: "The cultural crown of Goa where pastel heritage villas, art ateliers and acoustic fado melodies linger in time.",
    longDescription: "Fontainhas is Asia's only recognized Latin Quarter, a living open-air museum founded in the late 18th century. Wandering its narrow cobblestone alleys beneath wrought-iron balconies painted in ochre yellow, indigo, and terracotta red reveals historic family estates, century-old bakeries wafting warm poee bread, and private salons echoing with Portuguese Fado acoustics.",
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
    ],
    coordinates: [15.4989, 73.8278],
    bestSeason: "Year-Round & October to March",
    idealDuration: "3 to 5 Days",
    startingPrice: 65000,
    currency: "INR",
    category: ["Cultural", "Luxury", "Romantic"],
    highlights: [
      "Private architectural walking atelier with a heritage conservation architect",
      "Exclusive candlelit Fado music dinner inside a 200-year-old Portuguese mansion",
      "Hand-painted Goan ceramic Azulejo tile masterclass",
      "Curated heritage tasting at heritage bakeries established in 1900"
    ],
    attractions: [
      { name: "Rua 31 de Janeiro", description: "Iconic cobblestone street flanked by vibrantly painted Portuguese heritage mansions.", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=800&auto=format&fit=crop" },
      { name: "Chapel of St. Sebastian", description: "Historic 1888 church housing the revered lifelike crucifix of Jesus.", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop" },
      { name: "Our Lady of the Immaculate Conception Church", description: "Grand baroque church towering with gleaming white zigzag staircases.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop" }
    ],
    localExperiences: [
      "Private vintage car drive through Panaji's riverfront boulevards",
      "Cooking lesson in an aristocratic Indo-Portuguese family kitchen",
      "Art gallery hopping accompanied by local contemporary curators"
    ],
    cuisine: [
      "Traditional Pork Vindalho marinated in palm vinegar",
      "Warm Poee with spiced chorizo pate",
      "Fish Caldine in aromatic coconut broth",
      "Serradura (Portuguese sawdust dessert with sweetened cream)"
    ],
    stayRecommendations: [
      { name: "Ahilya by the Sea, Nerul", type: "Relais & Châteaux Coastal Heritage Haven", priceRange: "₹42,000 / night" },
      { name: "The Postcard Velha, Old Goa", type: "Secluded Forest Sanctuary", priceRange: "₹35,000 / night" },
      { name: "Mateus Boutique Hotel, Fontainhas", type: "Restored 1879 Portuguese Mansion", priceRange: "₹18,000 / night" }
    ],
    travelTips: [
      "Early mornings (7 to 9 AM) offer golden illumination for photographing the colorful facades without traffic",
      "Respect residential privacy; these heritage homes are active multi-generational family residences",
      "Pair your visit with an evening cruise on the Mandovi River"
    ],
    weather: {
      temp: "27°C",
      condition: "Pleasant Tropical",
      humidity: "58%",
      bestMonths: "Oct - Mar"
    }
  },
  {
    id: "assagao-vagator",
    name: "Assagao & North Goa Riviera",
    country: "Goa, India",
    tagline: "Boutique heritage villas, Michelin-caliber dining & vibrant bohemian elegance",
    description: "The Beverly Hills of Goa — shaded by ancient banyan canopies, alive with concept ateliers and sunset cliffside gastronomy.",
    longDescription: "Assagao, known affectionately as the 'Village of Flowers', is Goa's most stylish enclave. Here, grand Portuguese villas have been masterfully transformed into visionary concept stores, organic yoga sanctuaries, and critically acclaimed restaurants helmed by celebrated chefs. Nearby, the red laterite cliffs of Vagator overlook sun-drenched beach clubs and unforgettable sunset horizons.",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    ],
    coordinates: [15.5908, 73.7744],
    bestSeason: "October to May",
    idealDuration: "4 to 7 Days",
    startingPrice: 95000,
    currency: "INR",
    category: ["Luxury", "Adventure", "Beaches"],
    highlights: [
      "Private chef's table degustation at top Assagao dining havens",
      "Sunset champagne service at cliffside Vagator terraces",
      "Private vintage motorcycle tour through lush shaded village lanes",
      "Access to private beach club cabanas in Ashvem and Morjim"
    ],
    attractions: [
      { name: "Chapora Fort Cliff", description: "Iconic clifftop ramparts with commanding views across the Arabian Sea and river mouth.", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop" },
      { name: "Badem Sunset Point", description: "Panoramic vantage point overlooking the tranquil Chapora river delta.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop" },
      { name: "Assagao Heritage Street", description: "Lush tree-canopied lanes dotted with 19th-century Portuguese courtyards.", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=800&auto=format&fit=crop" }
    ],
    localExperiences: [
      "Curated multi-course tasting dinner with wine pairings in a restored colonial courtyard",
      "Private botanical gin crafting workshop with regional spices",
      "Bespoke sound healing meditation in an organic forest shala"
    ],
    cuisine: [
      "Modern Goan Kokum Ceviche",
      "Slow-cooked Cafreal chicken skewers with roasted poee",
      "Truffle-infused Goan Chorizo risotto",
      "Artisan cashew-feni infused cocktails"
    ],
    stayRecommendations: [
      { name: "W Goa, Vagator", type: "Vibrant Seaside Luxury Resort", priceRange: "₹38,000 / night" },
      { name: "Villa Palladio Assagao", type: "Private Heritage Pool Villa", priceRange: "₹55,000 / night" },
      { name: "Kasturi by the Bay", type: "Boutique Clifftop Retreat", priceRange: "₹30,000 / night" }
    ],
    travelTips: [
      "Book dinner reservations at top Assagao restaurants at least 1 week in advance",
      "Hire an executive SUV or self-drive vintage convertible for stylish village hops",
      "Sunset at Vagator cliffs is breathtaking; arrive by 5:30 PM for prime seats"
    ],
    weather: {
      temp: "29°C",
      condition: "Golden Coastal Sun",
      humidity: "65%",
      bestMonths: "Oct - May"
    }
  },
  {
    id: "divar-chorao-islands",
    name: "Divar Island & Mandovi Backwaters",
    country: "Goa, India",
    tagline: "Serene riverine sanctuaries, mangrove labyrinths & timeless island grace",
    description: "Goa’s tranquil secret: an emerald island accessible only by river ferry where life moves to the rhythm of gentle tides.",
    longDescription: "Drifting along the Mandovi River into the mist-shrouded backwaters of Divar and Chorão islands transports you to a bygone century. Ferry across with waterbirds flying overhead, navigate calm mangrove canals where otters and kingfishers nest, and explore sleepy hilltop villages crowned by ancient churches overlooking endless paddy fields.",
    heroImage: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop",
    ],
    coordinates: [15.5178, 73.9142],
    bestSeason: "October to April",
    idealDuration: "2 to 4 Days",
    startingPrice: 55000,
    currency: "INR",
    category: ["Nature and wildlife", "Relaxation", "Cultural"],
    highlights: [
      "Private luxury wooden catamaran cruise through Mandovi river tributaries",
      "Guided dawn kayaking expedition through dense mangrove labyrinths",
      "Exclusive stay in a 250-year-old riverfront Portuguese island manor",
      "Salim Ali Bird Sanctuary private expedition with expert ornithologist"
    ],
    attractions: [
      { name: "Our Lady of Compassion Church, Piedade", description: "Majestic hilltop 1700s church with infinite panoramic valley views.", image: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=800&auto=format&fit=crop" },
      { name: "Dr. Salim Ali Bird Sanctuary", description: "Low-mangrove estuary habitat hosting migratory kingfishers, eagles and otters.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop" },
      { name: "São Matias Village", description: "Peaceful hamlet of pastel Portuguese cottages and serene lotus lakes.", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop" }
    ],
    localExperiences: [
      "Traditional river crab trapping with local village fishermen",
      "Sunset bicycle trail across scenic tidal bunds and paddy fields",
      "Private veranda lunch with vintage cashew feni tastings and river fish fry"
    ],
    cuisine: [
      "Freshly caught river Mud Crab in green coriander masala",
      "Prawn balchão with hot crusty poee",
      "Tisreo (spiced clam sukka with fresh coconut)",
      "Alle Belle (sweet Goan jaggery and coconut pancakes)"
    ],
    stayRecommendations: [
      { name: "Mercure Goa Devaaya Resort, Divar", type: "Ayurvedic Island Wellness Resort", priceRange: "₹18,000 / night" },
      { name: "Island House Goa", type: "Boutique Heritage Villa Retreat", priceRange: "₹24,000 / night" },
      { name: "The Postcard Cavelossim", type: "Riverside Luxury Sanctum", priceRange: "₹38,000 / night" }
    ],
    travelTips: [
      "Access is via free vehicle and passenger ferries from Ribandar or Old Goa",
      "Rent an electric bicycle to glide quietly through the peaceful village lanes",
      "Carry binoculars for extraordinary birdwatching along the tidal backwaters"
    ],
    weather: {
      temp: "26°C",
      condition: "Gentle River Breeze",
      humidity: "55%",
      bestMonths: "Oct - Apr"
    }
  },
  {
    id: "ashvem-morjim",
    name: "Ashvem & Morjim Coastal Dunes",
    country: "Goa, India",
    tagline: "Expansive white sands, olive ridley turtle shores & bohemian chic",
    description: "The serene northern coastline where wide golden beaches meet chic barefoot luxury and tranquil surf.",
    longDescription: "Ashvem and Morjim represent Goa’s most refined beachfront experience. Characterized by expansive sands that stretch endlessly into the horizon and protected nesting grounds for endangered Olive Ridley sea turtles, the vibe here is softly sophisticated. Think daybeds under white linen canopies, chilled rosé by the tide, and private seaside villas with unobstructed ocean views.",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop",
    ],
    coordinates: [15.6567, 73.7289],
    bestSeason: "October to April",
    idealDuration: "4 to 6 Days",
    startingPrice: 90000,
    currency: "INR",
    category: ["Beaches", "Luxury", "Relaxation"],
    highlights: [
      "Private beachfront cabana with sunset champagne service",
      "Morning surf or paddleboarding session with private instructor",
      "Olive Ridley sea turtle conservation walk with certified marine rangers",
      "Fine dining on the sand beneath torchlight and stars"
    ],
    attractions: [
      { name: "Ashvem Beach Strip", description: "Wide golden sandbar lined with discreet luxury boutiques and French bakeries.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop" },
      { name: "Morjim Turtle Nesting Reserve", description: "Quiet coastal dunes legally protected for winter turtle hatching.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop" },
      { name: "Mandrem Sweet Water Lake", description: "Hidden freshwater pool nestled between green hills and the ocean.", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop" }
    ],
    localExperiences: [
      "Sunset horseback riding along the water's edge at low tide",
      "Private beachfront seafood barbecue prepared by your personal chef",
      "Artisan perfume and essential oil blending masterclass"
    ],
    cuisine: [
      "Grilled Red Snapper with lemon garlic herb butter",
      "Goan Prawn Recheado with tangy fiery paste",
      "Chilled coastal Kokum spritzers",
      "Coconut water sorbet with fresh passionfruit"
    ],
    stayRecommendations: [
      { name: "Rococco Ashvem", type: "Seaside Boutique Cliff Resort", priceRange: "₹25,000 / night" },
      { name: "Aalia Sunset Palms", type: "Private Beachfront Villa Reserve", priceRange: "₹45,000 / night" },
      { name: "Amarya Shamiyana", type: "Luxury Mughal Tent Sanctuary", priceRange: "₹22,000 / night" }
    ],
    travelTips: [
      "Morjim is a strictly protected turtle nesting site; no loud music or artificial floodlights at night",
      "The waters here are calm and shallow, ideal for morning ocean swimming and stand-up paddleboarding",
      "Rent a beach bicycle for peaceful morning rides along the hard-packed sand at low tide"
    ],
    weather: {
      temp: "28°C",
      condition: "Sunny Coastal Breeze",
      humidity: "60%",
      bestMonths: "Oct - Apr"
    }
  },
  {
    id: "ponda-western-ghats",
    name: "Ponda Spice Groves & Dudhsagar",
    country: "Goa, India",
    tagline: "Lush spice plantations, Sahyadri rainforest waterfalls & jungle luxury",
    description: "The emerald hinterland of Goa: organic vanilla and cardamon groves and the mighty white roar of Dudhsagar.",
    longDescription: "Venture east into the foothills of the Western Ghats, a UNESCO Global Biodiversity Hotspot. In Ponda and Molem, the air is perfumed with fresh cardamon, cinnamon, and nutmeg. Here, ancient Hindu temples stand secluded in deep jungle valleys, and the four-tiered Dudhsagar Waterfalls plunge 310 meters through dense rainforest mist.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop",
    ],
    coordinates: [15.4011, 74.0156],
    bestSeason: "September to March",
    idealDuration: "2 to 4 Days",
    startingPrice: 50000,
    currency: "INR",
    category: ["Adventure", "Nature and wildlife", "Cultural"],
    highlights: [
      "Private 4x4 jungle expedition to Dudhsagar Waterfalls with natural pool swim",
      "Botanical sensory walk through a 100-acre organic spice plantation",
      "Traditional Goan Hindu Saraswat banana-leaf banquet lunch",
      "Ancient 12th-century Tambdi Surla basalt rock temple private tour"
    ],
    attractions: [
      { name: "Dudhsagar Waterfalls", description: "Sea of Milk: four-tiered 310-meter cascade roaring through Sahyadri canopy.", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop" },
      { name: "Sahakari Spice Farm", description: "Lush organic canopy of pepper vines, nutmeg trees and herbal medicine.", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop" },
      { name: "Tambdi Surla Temple", description: "12th-century Kadamba black basalt temple hidden deep in the jungle reserve.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop" }
    ],
    localExperiences: [
      "Private elephant bathing and organic herbal splash in river streams",
      "Cooking masterclass using freshly plucked peppercorns and vanilla pods",
      "Night jungle canopy walk guided by a master herpetologist"
    ],
    cuisine: [
      "Traditional Saraswat fish curry with kokum and triphala",
      "Khatkhate (rich mixed vegetable stew cooked during temple festivals)",
      "Cashew-nut and fresh green chili stir-fry",
      "Fresh sugarcane and ginger juice pressed before your eyes"
    ],
    stayRecommendations: [
      { name: "Wildernest Nature Resort, Chorla Ghat", type: "Eco-Luxury Mountain Ridge Sanctuary", priceRange: "₹22,000 / night" },
      { name: "Dudhsagar Spa Resort", type: "Rainforest Eco Haven", priceRange: "₹16,000 / night" },
      { name: "Savoi Plantation Cottages", type: "Historic Organic Farm Stay", priceRange: "₹14,000 / night" }
    ],
    travelTips: [
      "Dudhsagar waterfall trips require certified 4x4 jungle jeeps arranged in advance",
      "Wear sturdy waterproof hiking shoes for walking on wet granite rocks",
      "Post-monsoon (September to November) offers the most dramatic waterfall volume"
    ],
    weather: {
      temp: "25°C",
      condition: "Lush Rainforest Canopy",
      humidity: "70%",
      bestMonths: "Sep - Mar"
    }
  }
];

export const FEATURED_PACKAGES: TravelPackage[] = [
  {
    id: "pkg-goa-south-sanctuary",
    title: "The Soul of South Goa: Secluded Palaces & Private Coves",
    destination: "Cabo de Rama & Benaulim",
    country: "Goa, India",
    duration: "6 Days / 5 Nights",
    durationDays: 6,
    price: 145000,
    originalPrice: 175000,
    currency: "INR",
    category: "Luxury",
    rating: 4.96,
    reviewsCount: 88,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1600&auto=format&fit=crop",
    overview: "A deeply peaceful retreat across South Goa’s most pristine shores. Private clifftop sunset yachts, beachfront 5-star palace suites, and candlelit seafood banquets.",
    highlights: [
      "Stay at The Leela Goa or Taj Exotica Resort & Spa",
      "Private sunset yacht charter around Cabo de Rama cliffs",
      "Beachfront Ayurvedic consultation and daily therapies",
      "Candlelit private chef dinner on Cola Beach's emerald lagoon"
    ],
    included: ["5-Star Beachfront Resort Stay", "Private Yacht Charter", "Daily Artisan Breakfasts", "Airport Chauffeur Limousine", "Dedicated Private Concierge"],
    excluded: ["Airfare to Goa", "Personal Gratuities"],
    itinerarySummary: [
      { day: 1, title: "VIP Airport Arrival & Check-in at Palace Suite", desc: "Private luxury chauffeur transfer from MOPA or Dabolim airport with champagne welcome." },
      { day: 2, title: "Secluded Coves & Butterfly Beach Outrigger", desc: "Private wooden boat excursion to secret coves with dolphin sightings and fresh coconut water." },
      { day: 3, title: "Cabo de Rama Clifftop Fort & Sunset Sailing", desc: "Explore ancient ramparts followed by private sunset champagne yacht charter." },
      { day: 4, title: "Ayurvedic Rejuvenation & Cola Lagoon Picnic", desc: "Holistic herbal oil therapies followed by a secluded riverside lagoon lunch." },
      { day: 5, title: "Artisan Feni Cellar & Candlelit Seafood Feast", desc: "Visit a heritage cashew distillery and enjoy master chef crab and tiger prawn banquet." },
      { day: 6, title: "Farewell Coastal Sunrise & Chauffeur Departure", desc: "Leisurely beach walk and private airport transfer." }
    ]
  },
  {
    id: "pkg-goa-heritage-odyssey",
    title: "Latin Quarter Aristocracy: Fontainhas & Private Fado",
    destination: "Fontainhas & Old Goa",
    country: "Goa, India",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    price: 95000,
    originalPrice: 115000,
    currency: "INR",
    category: "Cultural",
    rating: 4.94,
    reviewsCount: 76,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1600&auto=format&fit=crop",
    overview: "Immerse yourself in centuries of Indo-Portuguese history, stay in restored 19th-century colonial mansions, and savor exclusive Fado acoustics with regional wine.",
    highlights: [
      "Stay in boutique Portuguese heritage palace in Fontainhas",
      "Private architectural walk with heritage conservation curator",
      "Private candlelit Fado dinner in a 200-year-old family estate",
      "Hand-painted Azulejo tile masterclass"
    ],
    included: ["Boutique Heritage Mansion Suite", "Private Chauffeur Transfers", "All Cultural Entry Passes", "Fado Banquet Experience", "Dedicated Cultural Guide"],
    excluded: ["Airfare", "Personal Souvenirs"],
    itinerarySummary: [
      { day: 1, title: "Arrival in Panaji & Welcome to the Latin Quarter", desc: "Check in to historic mansion, evening walk under wrought-iron balconies." },
      { day: 2, title: "Old Goa Cathedrals & Historic Crypts", desc: "VIP access to Basilica of Bom Jesus and Sé Cathedral with senior historian." },
      { day: 3, title: "Azulejo Ceramic Workshop & Fado Banquet", desc: "Create your hand-painted tile, followed by an acoustic Fado musical dinner." },
      { day: 4, title: "Reis Magos Fort & Mandovi River Sunset Yacht", desc: "Explore clifftop fortress and cruise down the Mandovi river at dusk." },
      { day: 5, title: "Traditional Bakeries & Chauffeur Departure", desc: "Sample warm poee and bebinca before airport transfer." }
    ]
  },
  {
    id: "pkg-goa-north-riviera",
    title: "Assagao & Ashvem: The Bohemian Epicurean Escape",
    destination: "Assagao & Ashvem",
    country: "Goa, India",
    duration: "6 Days / 5 Nights",
    durationDays: 6,
    price: 135000,
    originalPrice: 160000,
    currency: "INR",
    category: "Luxury",
    rating: 4.97,
    reviewsCount: 94,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1600&auto=format&fit=crop",
    overview: "From shaded banyan boulevards in Assagao to barefoot luxury on Ashvem's white sands. Michelin-caliber chef's tables, cliffside sunset cocktails and private beach cabanas.",
    highlights: [
      "Private luxury pool villa in Assagao",
      "Chef's tasting menu at top acclaimed culinary ateliers",
      "Reserved daybed cabana at private Ashvem beach club",
      "Sunset champagne at Vagator laterite cliffs"
    ],
    included: ["Private Pool Villa", "Daily Gourmet Breakfast", "Reserved VIP Beach Club Access", "Private Chauffeur SUV", "Concierge Table Bookings"],
    excluded: ["Flights to Goa", "Personal Shopping"],
    itinerarySummary: [
      { day: 1, title: "Check-in to Private Assagao Villa", desc: "Arrive at your secluded pool sanctuary with private bartender cocktail welcome." },
      { day: 2, title: "Village Boutiques & Chef's Table Degustation", desc: "Curated shopping in restored villas followed by multi-course modern Goan dining." },
      { day: 3, title: "Ashvem Beach Day & Sunset Cabana", desc: "Relax on wide white sands with chilled rosé, ocean swimming and paddleboarding." },
      { day: 4, title: "Chapora Fort & Cliffside Sunset Lounge", desc: "Scenic hill walk followed by prime seating at cliffside Vagator lounges." },
      { day: 5, title: "Botanical Gin Tasting & Private Barbecue", desc: "Craft your own regional gin, followed by in-villa private seafood barbecue." },
      { day: 6, title: "Farewell Sunrise Meditation & Departure", desc: "Private airport transfer to MOPA or Dabolim." }
    ]
  },
  {
    id: "pkg-goa-yacht-backwaters",
    title: "Mandovi Catamaran & Divar Island Private Haven",
    destination: "Divar Island & Mandovi River",
    country: "Goa, India",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    price: 85000,
    originalPrice: 105000,
    currency: "INR",
    category: "Relaxation",
    rating: 4.92,
    reviewsCount: 62,
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1600&auto=format&fit=crop",
    overview: "Goa's hidden riverine sanctuary. Private solar catamaran cruises, mangrove kayaking, historic island manors, and migratory birding far away from the crowds.",
    highlights: [
      "Stay in an authentic riverside Portuguese island manor",
      "Private catamaran charter down Mandovi backwaters",
      "Dawn kayak safari through Chorao mangrove reserves",
      "Traditional river crab feast with local fishermen"
    ],
    included: ["Island Heritage Manor Stay", "Private River Catamaran Charter", "Guided Mangrove Kayak", "Daily Regional Breakfast", "All Ferry & Vehicle Transfers"],
    excluded: ["Airfare", "Personal Gratuities"],
    itinerarySummary: [
      { day: 1, title: "River Ferry Arrival to Divar Island", desc: "Arrive on the island by private ferry, checked into your peaceful 200-year-old manor." },
      { day: 2, title: "Mangrove Labyrinth & Bird Sanctuary", desc: "Dawn kayak glide with binoculars to spot kingfishers, egrets and river otters." },
      { day: 3, title: "Private Solar Catamaran Cruise & Sunset Wine", desc: "Drift along the calm waters of the Mandovi river with chilled wine and local snacks." },
      { day: 4, title: "Island Village Bicycle Trail & Crab Feast", desc: "Pedal along tranquil tidal bunds and enjoy a home-cooked river crab banquet." },
      { day: 5, title: "Morning Island Tea & Private Transfer", desc: "Farewell river views and chauffeur connection to the airport." }
    ]
  }
];

export const EDITORIAL_STORIES = [
  {
    id: "story-goa-1",
    title: "The Quiet Riviera: Why South Goa Has Captured the World’s Discerning Travelers",
    category: "Coastal Sanctuaries",
    readTime: "6 min read",
    author: "Armaan D'Souza",
    date: "November 2026",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Beyond the cliches of crowded beaches lies a secret world of red laterite clifftops, freshwater emerald lagoons, and 5-star palatial havens where the Arabian Sea whispers only to you."
  },
  {
    id: "story-goa-2",
    title: "Azulejos & Fado: The Living Portuguese Soul of Fontainhas",
    category: "Heritage & Artistry",
    readTime: "7 min read",
    author: "Elena Vasconcelos",
    date: "October 2026",
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop",
    excerpt: "In the Latin Quarter of Panaji, 18th-century wrought-iron balconies frame cobblestone alleys where old family estates still echo with acoustic guitars and warm poee bread."
  },
  {
    id: "story-goa-3",
    title: "The Culinary Renaissance of Assagao: Where Village Mansions Turn Michelin-Caliber",
    category: "Gastronomic Odyssey",
    readTime: "5 min read",
    author: "Vikramaditya Rao",
    date: "September 2026",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Beneath the canopy of hundred-year-old banyan trees, visionary chefs are reinterpreting kokum, chorise, and fresh catch into India’s most exciting culinary destination."
  }
];

export const TESTIMONIALS = [
  {
    id: "t-goa-1",
    quote: "We thought we knew Goa, until Yatra Vista crafted our 6-day South Goa anniversary itinerary. Staying on the cliffs of Cabo de Rama and having a private chef cook for us at Cola lagoon felt like a private world.",
    author: "Kabir & Ananya Singhania",
    location: "Mumbai, India",
    trip: "The Soul of South Goa Odyssey",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    rating: 5
  },
  {
    id: "t-goa-2",
    quote: "The Yatra Vista AI planner created a 3-tier comparison in 3 seconds. The private Fado dinner in Fontainhas and our villa in Assagao were orchestrated with absolute perfection.",
    author: "Lord Julian & Lady Charlotte Vance",
    location: "London, United Kingdom",
    trip: "Latin Quarter Aristocracy & Assagao Riviera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    rating: 5
  },
  {
    id: "t-goa-3",
    quote: "The 3D geonavigation globe zoomed right onto Goa's coastline, and the PDF proposal exported directly to my phone was what won over our entire family for our winter vacation.",
    author: "Dr. Rohan & Priya Mehta",
    location: "Bengaluru, India",
    trip: "Ashvem Barefoot Luxury & Island Catamaran",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    rating: 5
  }
];
