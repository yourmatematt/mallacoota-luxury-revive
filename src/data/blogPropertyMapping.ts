// Maps blog post slugs (or slug patterns) to the most contextually relevant
// property slugs. Used by `<RelatedPropertiesForBlog />` to surface property
// cards under blog articles for internal linking.
//
// Matt: tweak the curated lists below as the property collection evolves.
// The function applies rule-based pattern matching, with the SIGNATURE_TRIO
// as a catch-all.

// Verified property slugs in Supabase (run scripts/generate-routes.js to refresh).
// Keep this list in sync if the property catalogue changes.
const PROPERTY_POOL = {
  // Properties with boat parking / direct water access — fishing, kayaking, watersport articles.
  boatAndWater: [
    "7-allan-drive",
    "four-on-stingray-point",
    "high-tide-apartment",
    "blue-waters",
    "gabo-views",
  ],
  // 3+ bedroom / sleeps 6+ — family, school holiday, group articles.
  family: [
    "four-on-stingray-point",
    "27-mirrabooka-rd",
    "bella-views",
    "south-gateway",
    "vista-views",
  ],
  // Pet-friendly properties (subset that allows pets).
  petFriendly: [
    "four-on-stingray-point",
    "yollys-cottage",
    "pheeney-place",
    "lacys-place",
  ],
  // Walking distance to town — dining, cafe, restaurant articles.
  townWalk: [
    "27-mirrabooka-rd",
    "high-tide-studio",
    "high-tide-apartment",
    "lacys-place",
  ],
  // Catch-all hero trio for any blog without a more specific match.
  signatureTrio: ["7-allan-drive", "four-on-stingray-point", "bella-views"],
} as const;

/**
 * Resolve relevant property slugs for a given blog slug. Returns a list of
 * 3–5 property slugs, ordered most-relevant first. Always returns at least 3.
 */
export function getRelatedPropertySlugsForBlog(blogSlug: string): string[] {
  const s = blogSlug.toLowerCase();

  if (/fish|boat|kayak|water|sailing|paddle/.test(s)) {
    return [...PROPERTY_POOL.boatAndWater].slice(0, 3);
  }
  if (/family|kid|children|school[-_ ]?holiday|multi[-_ ]?gen/.test(s)) {
    return [...PROPERTY_POOL.family].slice(0, 3);
  }
  if (/pet|dog|puppy/.test(s)) {
    return [...PROPERTY_POOL.petFriendly].slice(0, 3);
  }
  if (/restaurant|dining|food|cafe|coffee|origami|scallywag|eat/.test(s)) {
    return [...PROPERTY_POOL.townWalk].slice(0, 3);
  }
  return [...PROPERTY_POOL.signatureTrio];
}

export const BLOG_PROPERTY_POOL = PROPERTY_POOL;
