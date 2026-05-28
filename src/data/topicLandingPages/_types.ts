// Topic landing page config. Shared by the 5 Mallacoota topic pages
// (Fishing / Kayaking / Family / Summer / Winter). The template reads these
// configs and renders the page; per-page files are thin wrappers.

import type { SignatureProperty } from "@/hooks/useSignatureProperties";

// Lucide icon names allowed in configs. Keep this list narrow — the template's
// IconMap must include each entry. Extend both together.
export type TopicIconName =
  | "Fish"
  | "Anchor"
  | "Waves"
  | "Wind"
  | "Sun"
  | "Snowflake"
  | "Users"
  | "Compass"
  | "Star"
  | "MapPin"
  | "Calendar"
  | "TreePine"
  | "Heart"
  | "PawPrint"
  | "Sparkles";

export interface TopicFeatureItem {
  icon: TopicIconName;
  title: string;
  description: string;
}

export interface TopicListItem {
  /** Bold prefix rendered before the description, e.g. "Mallacoota Inlet:". */
  title?: string;
  text: string;
}

export interface TopicSpotsCard {
  /** Optional lucide icon shown next to the card heading. */
  icon?: TopicIconName;
  heading: string;
  items: TopicListItem[];
}

export interface TopicFAQ {
  question: string;
  answer: string;
}

export interface TopicLandingConfig {
  /** URL path the page renders at — must match the App.tsx route. */
  canonicalPath: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  /** schema.org @type for the breadcrumb final segment (used in JSON-LD only). */
  breadcrumbName: string;

  // Hero
  heroImage: string;
  heroBadgeIcon: TopicIconName;
  heroBadgeText: string;
  heroHeading: string;
  heroSubtitle: string;
  heroPrimaryCtaText: string;
  heroPrimaryCtaTo: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaTo: string;

  // Intro
  introHeading: string;
  introParagraphs: string[];

  // Features grid (always 3)
  featuresHeading: string;
  features: [TopicFeatureItem, TopicFeatureItem, TopicFeatureItem];

  // Featured properties
  propertiesHeading: string;
  propertiesSubtitle: string;
  /** Predicate used to filter useSignatureProperties down to topic-relevant rows. */
  filterProperty: (p: SignatureProperty) => boolean;
  /** Badge shown on top of each property card. */
  propertyBadgeIcon: TopicIconName;
  propertyBadgeText: string;
  emptyPropertiesFallbackText: string;

  // Spots / seasons grid (1 or 2 cards)
  spotsHeading: string;
  spotsCards: TopicSpotsCard[];

  // FAQs
  faqTitle: string;
  faqs: TopicFAQ[];

  // Final CTA
  ctaImage: string;
  ctaHeading: string;
  ctaDescription: string;
}
