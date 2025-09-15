import { PropertyMetadata } from "@/data/properties";

interface BlogContext {
  locationFocus: string[];
  activityTags: string[];
  idealPropertyFeatures: string[];
  maxDistanceFromFocus?: number;
}

export function getRelevantProperties(
  blogContext: BlogContext,
  allProperties: PropertyMetadata[],
  limit: number = 3
): PropertyMetadata[] {

  // Score each property based on relevance
  const scoredProperties = allProperties.map(property => {
    let score = 0;

    // Location match (highest weight - 30 points)
    const locationMatch = property.locationTags.some(tag =>
      blogContext.locationFocus.includes(tag)
    );
    if (locationMatch) score += 30;

    // Distance penalty/bonus for location-specific content (20 points)
    if (blogContext.maxDistanceFromFocus) {
      if (property.distanceFromTown <= blogContext.maxDistanceFromFocus) {
        score += 20;
      } else {
        score -= 20; // Penalty for being too far
      }
    }

    // Activity match (medium weight - 10 points per match)
    const activityMatches = property.nearbyActivities.filter(activity =>
      blogContext.activityTags.includes(activity)
    ).length;
    score += activityMatches * 10;

    // Feature match (lower weight - 5 points per match)
    const featureMatches = property.featureTags.filter(feature =>
      blogContext.idealPropertyFeatures.includes(feature)
    ).length;
    score += featureMatches * 5;

    return { property, score };
  });

  // Sort by score (descending) and return top matches
  return scoredProperties
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.property);
}

// Specific matchers for common blog types
export function getCoffeeSceneProperties(allProperties: PropertyMetadata[]): PropertyMetadata[] {
  return getRelevantProperties(
    {
      locationFocus: ["town-center", "town-adjacent", "walking-distance"],
      activityTags: ["cafes", "shopping", "dining", "town-center"],
      idealPropertyFeatures: ["central", "convenient", "modern", "wifi"],
      maxDistanceFromFocus: 5 // Within 5 minutes of town
    },
    allProperties,
    3
  );
}

export function getBeachProperties(allProperties: PropertyMetadata[]): PropertyMetadata[] {
  return getRelevantProperties(
    {
      locationFocus: ["beachfront", "waterfront"],
      activityTags: ["beach-walks", "swimming", "fishing", "water-sports"],
      idealPropertyFeatures: ["beach-access", "family", "pet-friendly", "waterfront"],
    },
    allProperties,
    3
  );
}

export function getSecludedRetreatProperties(allProperties: PropertyMetadata[]): PropertyMetadata[] {
  return getRelevantProperties(
    {
      locationFocus: ["remote", "peaceful", "secluded"],
      activityTags: ["nature-walks", "bird-watching", "stargazing"],
      idealPropertyFeatures: ["secluded", "romantic", "couples", "quiet"],
    },
    allProperties,
    3
  );
}

export function getFamilyActivityProperties(allProperties: PropertyMetadata[]): PropertyMetadata[] {
  return getRelevantProperties(
    {
      locationFocus: ["town-adjacent", "beachfront", "family-friendly"],
      activityTags: ["playground", "beach-walks", "cafes", "family-activities"],
      idealPropertyFeatures: ["family", "spacious", "pet-friendly", "games"],
      maxDistanceFromFocus: 10
    },
    allProperties,
    3
  );
}

export function getWildlifeWatchingProperties(allProperties: PropertyMetadata[]): PropertyMetadata[] {
  return getRelevantProperties(
    {
      locationFocus: ["waterfront", "coastal", "elevated"],
      activityTags: ["wildlife-viewing", "nature-walks", "fishing", "scenic-views"],
      idealPropertyFeatures: ["views", "deck", "binoculars", "balcony"],
    },
    allProperties,
    3
  );
}

export function getDiningProperties(allProperties: PropertyMetadata[]): PropertyMetadata[] {
  return getRelevantProperties(
    {
      locationFocus: ["town-center", "town-adjacent", "walking-distance"],
      activityTags: ["cafes", "dining", "shopping", "restaurants"],
      idealPropertyFeatures: ["central", "convenient", "modern"],
      maxDistanceFromFocus: 8
    },
    allProperties,
    3
  );
}

export function getWaterfrontActivitiesProperties(allProperties: PropertyMetadata[]): PropertyMetadata[] {
  return getRelevantProperties(
    {
      locationFocus: ["waterfront", "jetty-access", "inlet-views"],
      activityTags: ["fishing", "kayaking", "boating", "water-sports"],
      idealPropertyFeatures: ["waterfront", "jetty", "boat-access", "kayaks"],
    },
    allProperties,
    3
  );
}

export function getSeasonalProperties(allProperties: PropertyMetadata[]): PropertyMetadata[] {
  return getRelevantProperties(
    {
      locationFocus: ["town-adjacent", "waterfront", "beachfront"],
      activityTags: ["beach-walks", "nature-walks", "cafes", "seasonal-activities"],
      idealPropertyFeatures: ["family", "luxury", "modern", "pet-friendly"],
    },
    allProperties,
    3
  );
}

// Main function to get properties for a specific blog post
export function getPropertiesForBlog(
  blogSlug: string,
  allProperties: PropertyMetadata[]
): PropertyMetadata[] {

  // Map blog slugs to specific contexts
  const blogContextMap: Record<string, BlogContext> = {
    'complete-coffee-scene': {
      locationFocus: ["town-center", "town-adjacent", "walking-distance"],
      activityTags: ["cafes", "dining", "shopping", "town-center"],
      idealPropertyFeatures: ["central", "convenient", "modern", "wifi"],
      maxDistanceFromFocus: 5
    },
    'secret-beaches-coastal-walks': {
      locationFocus: ["beachfront", "waterfront"],
      activityTags: ["beach-walks", "swimming", "fishing"],
      idealPropertyFeatures: ["beach-access", "family", "pet-friendly"],
    },
    'whale-watching-winter-wildlife': {
      locationFocus: ["waterfront", "coastal", "elevated"],
      activityTags: ["wildlife-viewing", "nature-walks", "scenic-views"],
      idealPropertyFeatures: ["views", "deck", "balcony"],
    },
    'multi-generational-family-fun': {
      locationFocus: ["town-adjacent", "beachfront"],
      activityTags: ["playground", "beach-walks", "cafes", "family-activities"],
      idealPropertyFeatures: ["family", "spacious", "games"],
    },
    'pet-friendly-mallacoota': {
      locationFocus: ["town-adjacent", "beachfront", "peaceful"],
      activityTags: ["beach-walks", "nature-walks", "pet-friendly-activities"],
      idealPropertyFeatures: ["pet-friendly", "garden", "family"],
    },
    'things-to-do-mallacoota': {
      locationFocus: ["town-adjacent", "waterfront"],
      activityTags: ["cafes", "beach-walks", "shopping", "activities"],
      idealPropertyFeatures: ["family", "central", "modern"],
    },
    'luxury-waterfront-mallacoota': {
      locationFocus: ["waterfront", "luxury", "inlet-views"],
      activityTags: ["water-sports", "fishing", "scenic-views"],
      idealPropertyFeatures: ["luxury", "water-views", "modern", "waterfront"],
    },
    'seasonal-seafood-sustainability': {
      locationFocus: ["waterfront", "town-adjacent"],
      activityTags: ["fishing", "dining", "cafes"],
      idealPropertyFeatures: ["waterfront", "fishing", "modern"],
    },
    'best-time-visit-mallacoota': {
      locationFocus: ["town-adjacent", "waterfront"],
      activityTags: ["seasonal-activities", "beach-walks", "cafes"],
      idealPropertyFeatures: ["family", "modern", "versatile"],
    },
    'gabo-island-adventure': {
      locationFocus: ["coastal", "waterfront"],
      activityTags: ["boat-tours", "wildlife-viewing", "adventure"],
      idealPropertyFeatures: ["boat-access", "adventure", "views"],
    }
  };

  // Get context for specific blog or use default
  const context = blogContextMap[blogSlug] || {
    locationFocus: ["town-adjacent", "waterfront"],
    activityTags: ["beach-walks", "cafes"],
    idealPropertyFeatures: ["family", "modern"]
  };

  return getRelevantProperties(context, allProperties, 3);
}