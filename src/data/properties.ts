export interface PropertyMetadata {
  id: string;
  title: string;
  slug: string;
  // Location data
  locationTags: string[]; // ["town-center", "waterfront", "remote", "beachfront"]
  distanceFromTown: number; // in minutes
  coordinates?: { lat: number; lng: number };

  // Feature tags for matching
  featureTags: string[]; // ["pet-friendly", "luxury", "family", "couples", "wifi", "kayaks"]

  // Activity proximity
  nearbyActivities: string[]; // ["beach-walks", "cafes", "fishing", "kayaking", "shopping"]

  // Capacity
  maxGuests: number;
  bedrooms: number;
}

// Property metadata based on actual Hammond Properties portfolio
export const propertyMetadata: PropertyMetadata[] = [
  {
    id: "7-allan-drive",
    title: "7 Allan Drive",
    slug: "7-allan-drive",
    locationTags: ["waterfront", "town-adjacent"],
    distanceFromTown: 3,
    featureTags: ["luxury", "family", "pet-friendly", "kayaks", "modern"],
    nearbyActivities: ["cafes", "shopping", "beach-walks", "fishing", "kayaking"],
    maxGuests: 8,
    bedrooms: 4
  },
  {
    id: "yollys-cottage",
    title: "Yolly's Cottage",
    slug: "yollys-cottage",
    locationTags: ["remote", "peaceful", "secluded"],
    distanceFromTown: 20,
    featureTags: ["couples", "romantic", "secluded", "cozy", "quiet"],
    nearbyActivities: ["nature-walks", "bird-watching", "stargazing"],
    maxGuests: 2,
    bedrooms: 1
  },
  {
    id: "10-allan-drive",
    title: "10 Allan Drive",
    slug: "10-allan-drive",
    locationTags: ["waterfront", "town-adjacent"],
    distanceFromTown: 3,
    featureTags: ["family", "beach-access", "modern", "pet-friendly"],
    nearbyActivities: ["cafes", "beach-walks", "shopping", "playground", "fishing"],
    maxGuests: 6,
    bedrooms: 3
  },
  {
    id: "12-allan-drive",
    title: "12 Allan Drive",
    slug: "12-allan-drive",
    locationTags: ["waterfront", "town-adjacent", "luxury"],
    distanceFromTown: 3,
    featureTags: ["luxury", "family", "stunning-views", "modern", "pet-friendly"],
    nearbyActivities: ["cafes", "beach-walks", "shopping", "fishing", "kayaking"],
    maxGuests: 6,
    bedrooms: 3
  },
  {
    id: "15-allan-drive",
    title: "15 Allan Drive",
    slug: "15-allan-drive",
    locationTags: ["waterfront", "town-adjacent"],
    distanceFromTown: 3,
    featureTags: ["family", "beach-access", "spacious", "pet-friendly"],
    nearbyActivities: ["cafes", "beach-walks", "shopping", "playground", "fishing"],
    maxGuests: 8,
    bedrooms: 4
  },
  {
    id: "unit-3-lakeside-lodge",
    title: "Unit 3 Lakeside Lodge",
    slug: "unit-3-lakeside-lodge",
    locationTags: ["lakefront", "town-center", "walking-distance"],
    distanceFromTown: 1,
    featureTags: ["central", "convenient", "lake-views", "family"],
    nearbyActivities: ["cafes", "shopping", "dining", "lake-walks", "town-center"],
    maxGuests: 4,
    bedrooms: 2
  },
  {
    id: "unit-5-lakeside-lodge",
    title: "Unit 5 Lakeside Lodge",
    slug: "unit-5-lakeside-lodge",
    locationTags: ["lakefront", "town-center", "walking-distance"],
    distanceFromTown: 1,
    featureTags: ["central", "convenient", "lake-views", "family"],
    nearbyActivities: ["cafes", "shopping", "dining", "lake-walks", "town-center"],
    maxGuests: 4,
    bedrooms: 2
  },
  {
    id: "unit-6-lakeside-lodge",
    title: "Unit 6 Lakeside Lodge",
    slug: "unit-6-lakeside-lodge",
    locationTags: ["lakefront", "town-center", "walking-distance"],
    distanceFromTown: 1,
    featureTags: ["central", "convenient", "lake-views", "family"],
    nearbyActivities: ["cafes", "shopping", "dining", "lake-walks", "town-center"],
    maxGuests: 6,
    bedrooms: 3
  },
  {
    id: "mallacoota-escape",
    title: "Mallacoota Escape",
    slug: "mallacoota-escape",
    locationTags: ["town-adjacent", "peaceful"],
    distanceFromTown: 5,
    featureTags: ["family", "spacious", "quiet", "pet-friendly", "garden"],
    nearbyActivities: ["nature-walks", "beach-walks", "cafes", "shopping"],
    maxGuests: 8,
    bedrooms: 4
  },
  {
    id: "mallacoota-inlet-views",
    title: "Mallacoota Inlet Views",
    slug: "mallacoota-inlet-views",
    locationTags: ["waterfront", "inlet-views", "town-adjacent"],
    distanceFromTown: 4,
    featureTags: ["luxury", "water-views", "couples", "modern", "balcony"],
    nearbyActivities: ["fishing", "water-sports", "scenic-drives", "cafes"],
    maxGuests: 4,
    bedrooms: 2
  },
  {
    id: "the-boatshed",
    title: "The Boatshed",
    slug: "the-boatshed",
    locationTags: ["waterfront", "unique", "town-adjacent"],
    distanceFromTown: 4,
    featureTags: ["unique", "character", "waterfront", "couples", "memorable"],
    nearbyActivities: ["fishing", "kayaking", "water-sports", "photography"],
    maxGuests: 2,
    bedrooms: 1
  },
  {
    id: "the-deck-house",
    title: "The Deck House",
    slug: "the-deck-house",
    locationTags: ["elevated", "town-adjacent", "views"],
    distanceFromTown: 4,
    featureTags: ["luxury", "panoramic-views", "couples", "romantic", "deck"],
    nearbyActivities: ["scenic-views", "hiking", "photography", "cafes"],
    maxGuests: 4,
    bedrooms: 2
  },
  {
    id: "the-jetty-house",
    title: "The Jetty House",
    slug: "the-jetty-house",
    locationTags: ["waterfront", "jetty-access", "town-adjacent"],
    distanceFromTown: 3,
    featureTags: ["waterfront", "jetty", "fishing", "family", "boat-access"],
    nearbyActivities: ["fishing", "boating", "water-sports", "beach-walks"],
    maxGuests: 6,
    bedrooms: 3
  },
  {
    id: "the-shack",
    title: "The Shack",
    slug: "the-shack",
    locationTags: ["beachfront", "rustic", "peaceful"],
    distanceFromTown: 8,
    featureTags: ["rustic", "beachfront", "authentic", "couples", "retreat"],
    nearbyActivities: ["beach-walks", "surfing", "fishing", "nature-watching"],
    maxGuests: 4,
    bedrooms: 2
  }
];

// Helper function to get property metadata by slug
export const getPropertyMetadata = (slug: string): PropertyMetadata | undefined => {
  return propertyMetadata.find(property => property.slug === slug);
};

// Helper function to get properties by location tags
export const getPropertiesByLocation = (locationTags: string[]): PropertyMetadata[] => {
  return propertyMetadata.filter(property =>
    property.locationTags.some(tag => locationTags.includes(tag))
  );
};

// Helper function to get properties by feature tags
export const getPropertiesByFeatures = (featureTags: string[]): PropertyMetadata[] => {
  return propertyMetadata.filter(property =>
    property.featureTags.some(tag => featureTags.includes(tag))
  );
};