import type { TopicLandingConfig } from "./_types";

const summer: TopicLandingConfig = {
  canonicalPath: "/mallacoota-summer-holidays",
  metaTitle: "Summer Holidays Mallacoota 2026 | Beach Rentals & Water Activities",
  metaDescription:
    "Premium summer holiday accommodation in Mallacoota. Beach access, swimming, water sports, and coastal activities. Book your East Gippsland summer getaway.",
  ogImage: "https://hammondproperties.com.au/images/mallacoota-summer-hero.jpg",
  breadcrumbName: "Summer Holidays",

  heroImage: "/images/mallacoota-summer-hero.jpg",
  heroBadgeIcon: "Sun",
  heroBadgeText: "Peak Season Paradise",
  heroHeading: "Summer Holidays in Mallacoota",
  heroSubtitle:
    "Premium beach rentals with direct beach access, swimming, water sports, and endless sunshine. Your perfect East Gippsland summer escape awaits.",
  heroPrimaryCtaText: "View Summer Rentals",
  heroPrimaryCtaTo: "/properties",
  heroSecondaryCtaText: "Book Summer 2026",
  heroSecondaryCtaTo: "/contact",

  introHeading: "Experience Summer on the Coast",
  introParagraphs: [
    "Mallacoota transforms into a vibrant coastal paradise during summer, offering pristine beaches, crystal-clear waters, and perfect weather for outdoor adventures. With average temperatures in the mid-20s, calm seas, and long sunny days, summer in East Gippsland delivers the quintessential Australian beach holiday experience. From swimming at patrolled beaches to exploring hidden coves by kayak, summer is peak season for water-based activities.",
    "Our premium summer holiday rentals provide the ideal base for beach lovers and water sports enthusiasts. Wake to morning swims in the inlet, spend days on pristine beaches, enjoy sunset kayaking, and return to comfortable, well-equipped accommodation with outdoor entertaining areas. Many properties feature air conditioning, outdoor showers for rinsing after beach visits, and spacious decks perfect for summer entertaining and alfresco dining.",
    "The summer season brings Mallacoota to life with community events, markets, live music, and bustling cafes. Families gather at patrolled beaches, fishing enthusiasts target summer species like kingfish and tuna, and kayakers explore the expansive inlet system in perfect conditions. Book early for peak periods including Christmas, New Year, and January school holidays to secure your slice of summer paradise in this sought-after coastal destination.",
  ],

  featuresHeading: "Perfect for Summer Holidays",
  features: [
    {
      icon: "Waves",
      title: "Beach & Water Activities",
      description:
        "Swimming at patrolled beaches, kayaking in calm inlet waters, stand-up paddleboarding, surfing, snorkeling, and endless water sports in perfect summer conditions.",
    },
    {
      icon: "Sun",
      title: "Outdoor Entertainment",
      description:
        "Properties with outdoor living spaces, BBQ facilities, private decks, and gardens. Enjoy alfresco dining, sunset drinks, and summer entertaining in comfort.",
    },
    {
      icon: "Sparkles",
      title: "Summer Events & Atmosphere",
      description:
        "Local markets, live music, community festivals, and vibrant summer energy. Experience Mallacoota at its most lively and welcoming during peak season.",
    },
  ],

  propertiesHeading: "Summer Holiday Rentals",
  propertiesSubtitle: "Premium beach accommodation for your summer getaway in Mallacoota",
  filterProperty: (p) => p.waterViews || /beach|view|water/i.test(p.title),
  propertyBadgeIcon: "Sun",
  propertyBadgeText: "Beach Access",
  emptyPropertiesFallbackText: "Browse our full collection of summer-ready properties below.",

  spotsHeading: "Summer Activities & Events",
  spotsCards: [
    {
      icon: "MapPin",
      heading: "Water Sports & Beach Fun",
      items: [
        { title: "Patrolled Swimming:", text: "Bastion Point Beach with lifeguards during peak season" },
        { title: "Kayaking & SUP:", text: "Perfect inlet conditions for paddling adventures" },
        { title: "Snorkeling:", text: "Clear summer waters revealing vibrant marine life" },
        { title: "Beach Games:", text: "Volleyball, cricket, frisbee on pristine sand" },
        { title: "Offshore Fishing:", text: "Peak season for kingfish, tuna, and snapper" },
      ],
    },
    {
      icon: "Calendar",
      heading: "Summer Events & Experiences",
      items: [
        { title: "New Year's Eve:", text: "Fireworks and celebrations over Mallacoota Inlet" },
        { title: "Summer Markets:", text: "Local produce, crafts, and artisan goods" },
        { title: "Live Music:", text: "Outdoor concerts and performances at local venues" },
        { title: "Coastal Walks:", text: "Scenic trails with wildflowers and ocean views" },
        { title: "Wildlife Encounters:", text: "Dolphin watching, seal spotting in peak activity" },
      ],
    },
  ],

  faqTitle: "Summer Holiday FAQs",
  faqs: [
    {
      question: "When should I book for summer holidays in Mallacoota?",
      answer:
        "Book as early as possible for peak summer periods. Christmas, New Year, and January school holidays fill up 6-12 months in advance. For best selection of premium properties during summer 2026, we recommend booking by mid-2025. Contact us early to secure your preferred dates and accommodation.",
    },
    {
      question: "What's the weather like in summer?",
      answer:
        "Mallacoota enjoys beautiful summer weather with average temperatures of 22-26°C. Expect warm, sunny days perfect for beach activities, cool ocean breezes, and comfortable evenings. December to February offers the most reliable beach weather with long daylight hours ideal for outdoor adventures and water sports in East Gippsland.",
    },
    {
      question: "Are beaches patrolled during summer?",
      answer:
        "Yes! Bastion Point Beach is patrolled by surf lifesavers during the peak summer season, typically from late December through January. This main swimming beach offers safe, supervised swimming for families. Other beaches around Mallacoota provide excellent swimming in calmer inlet waters throughout summer.",
    },
    {
      question: "What summer activities are available in Mallacoota?",
      answer:
        "Summer offers endless activities: swimming at patrolled beaches, kayaking and SUP on the inlet, snorkeling in clear waters, offshore fishing for premium species, coastal walks, wildlife spotting, beach games, markets, live music events, and water sports. The warm weather and calm conditions make summer ideal for all coastal activities.",
    },
    {
      question: "Do properties have air conditioning for summer?",
      answer:
        "Many of our properties feature air conditioning, ceiling fans, or split systems for summer comfort. Mallacoota's coastal location provides natural sea breezes that keep temperatures comfortable. We can recommend properties with specific cooling features to ensure your summer stay is comfortable during warmer days.",
    },
    {
      question: "What should I bring for a summer holiday in Mallacoota?",
      answer:
        "Pack beach essentials: sunscreen, hats, swimmers, beach towels, and sun protection. Bring snorkeling gear, kayaks if you have them, or arrange local rentals. Casual summer clothing, comfortable walking shoes, and evening layers for cooler nights. Our properties provide BBQs and outdoor furniture for summer entertaining. Book restaurant reservations early for peak periods.",
    },
  ],

  ctaImage: "/images/mallacoota-inlet-sunset.jpg",
  ctaHeading: "Book Your Summer Escape Today",
  ctaDescription:
    "Secure your premium summer accommodation now. Peak season fills fast. Don't miss the best summer of your life.",
};

export default summer;
