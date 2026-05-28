import type { TopicLandingConfig } from "./_types";

const fishing: TopicLandingConfig = {
  canonicalPath: "/mallacoota-fishing-accommodation",
  metaTitle: "Fishing Accommodation Mallacoota | Boat Parking & Water Access",
  metaDescription:
    "Premium fishing holiday rentals in Mallacoota with boat parking, direct water access, and fish cleaning facilities. Perfect base for East Gippsland fishing adventures.",
  ogImage: "https://hammondproperties.com.au/images/mallacoota-fishing-hero.jpg",
  breadcrumbName: "Fishing Accommodation",

  heroImage: "/images/mallacoota-fishing-hero.jpg",
  heroBadgeIcon: "Fish",
  heroBadgeText: "World-Class Fishing Destination",
  heroHeading: "Fishing Accommodation in Mallacoota",
  heroSubtitle:
    "Premium holiday rentals with boat parking, water access, and fish cleaning facilities. Your perfect base for East Gippsland fishing adventures.",
  heroPrimaryCtaText: "View Fishing Properties",
  heroPrimaryCtaTo: "/properties?feature=boat_parking",
  heroSecondaryCtaText: "Plan Fishing Trip",
  heroSecondaryCtaTo: "/contact",

  introHeading: "World-Class Fishing in East Gippsland",
  introParagraphs: [
    "Mallacoota is renowned as one of Australia's premier fishing destinations, offering exceptional year-round fishing opportunities in the pristine waters of East Gippsland. From flathead and bream in the tranquil inlet to kingfish and tuna offshore, Mallacoota delivers unforgettable fishing experiences for anglers of all skill levels.",
    "Our premium fishing accommodation puts you within minutes of Mallacoota's best fishing spots. Whether you're beach fishing at Betka Beach, casting from the Main Wharf, exploring the expansive Mallacoota Inlet, or venturing offshore into the Pacific, you'll enjoy the perfect blend of luxury waterfront accommodation and world-class fishing access.",
    "Hammond Properties offers specialized fishing holiday rentals featuring boat parking, trailer storage, water access for easy boat launching, fish cleaning facilities, and outdoor areas perfect for preparing your catch. Many of our coastal properties provide direct inlet access, making early morning fishing trips effortless.",
  ],

  featuresHeading: "Perfect for Fishing Holidays",
  features: [
    {
      icon: "Anchor",
      title: "Boat Parking & Storage",
      description:
        "Secure boat parking, trailer storage, and easy water access for launching. Many properties offer direct inlet access for hassle-free fishing trips.",
    },
    {
      icon: "Fish",
      title: "Fish Cleaning Facilities",
      description:
        "Outdoor fish cleaning areas, preparation spaces, and storage. Perfect for processing your catch with all the amenities you need.",
    },
    {
      icon: "Waves",
      title: "Water Access & Location",
      description:
        "Walking distance to Main Wharf, Betka Beach, and inlet fishing spots. Minutes from boat ramps and offshore launch points.",
    },
  ],

  propertiesHeading: "Featured Fishing Properties",
  propertiesSubtitle: "Handpicked waterfront rentals perfect for fishing holidays in Mallacoota",
  filterProperty: (p) => p.boatParking || /water/i.test(p.title),
  propertyBadgeIcon: "Anchor",
  propertyBadgeText: "Boat Parking",
  emptyPropertiesFallbackText:
    "All our waterfront properties suit fishing trips — browse the full collection below.",

  spotsHeading: "Fishing Spots & Best Seasons",
  spotsCards: [
    {
      icon: "MapPin",
      heading: "Prime Fishing Locations",
      items: [
        { title: "Mallacoota Inlet:", text: "Flathead, bream, whiting, and mullet year-round" },
        { title: "Main Wharf:", text: "Salmon, mullet, and tailor from the pier" },
        { title: "Betka Beach:", text: "Surf fishing for salmon, tailor, and flathead" },
        { title: "Offshore:", text: "Kingfish, tuna, snapper, and morwong in deeper waters" },
        { title: "Estuary Mouths:", text: "Bream, flathead, and jewfish during tide changes" },
      ],
    },
    {
      icon: "Calendar",
      heading: "Seasonal Fishing Guide",
      items: [
        { title: "Summer (Dec-Feb):", text: "Peak season for kingfish, tuna, and beach fishing" },
        { title: "Autumn (Mar-May):", text: "Excellent flathead and bream fishing in the inlet" },
        { title: "Winter (Jun-Aug):", text: "Prime time for offshore fishing and inlet species" },
        { title: "Spring (Sep-Nov):", text: "Salmon runs, increased activity, perfect conditions" },
        { title: "Year-Round:", text: "Consistent flathead and bream fishing in Mallacoota waters" },
      ],
    },
  ],

  faqTitle: "Fishing Accommodation FAQs",
  faqs: [
    {
      question: "Do your properties have boat parking and storage?",
      answer:
        "Yes! Many of our fishing-friendly properties feature secure boat parking, trailer storage, and easy water access. We can recommend specific properties based on your boat size and fishing needs.",
    },
    {
      question: "Are there fish cleaning facilities available?",
      answer:
        "Several of our properties include outdoor fish cleaning areas with running water, preparation surfaces, and proper drainage. We'll ensure your accommodation has the facilities needed to process your catch comfortably.",
    },
    {
      question: "How close are the properties to fishing spots?",
      answer:
        "Most of our waterfront properties are within walking distance of the Main Wharf and inlet fishing spots. Some properties offer direct water access for launching boats. All are within 5-10 minutes drive of boat ramps and major fishing locations.",
    },
    {
      question: "What fishing species are available in Mallacoota?",
      answer:
        "Mallacoota offers diverse fishing: flathead, bream, whiting, and mullet in the inlet; salmon, tailor, and flathead from beaches; kingfish, tuna, snapper, and morwong offshore. Year-round opportunities for all skill levels in East Gippsland waters.",
    },
    {
      question: "When is the best time for fishing in Mallacoota?",
      answer:
        "Mallacoota provides excellent fishing year-round. Summer is peak for offshore species like kingfish and tuna. Autumn and spring offer great inlet fishing for flathead and bream. Winter is ideal for beach fishing and offshore adventures. Each season brings unique opportunities.",
    },
    {
      question: "Do I need a fishing license in Victoria?",
      answer:
        "Yes, recreational fishing in Victoria requires a valid fishing license. Licenses can be purchased online through the Victorian Fisheries Authority or at local retailers in Mallacoota. We provide detailed information about regulations and license requirements with your booking.",
    },
    {
      question: "Can you recommend fishing charters or guides?",
      answer:
        "Absolutely! We work with experienced local fishing charters and guides who know Mallacoota waters intimately. Whether you want offshore adventures, inlet fishing, or guided beach sessions, our concierge can arrange professional charter services to enhance your fishing holiday.",
    },
    {
      question: "Are your fishing properties suitable for families?",
      answer:
        "Yes! Our fishing accommodation caters to families with children. Many properties near calm inlet waters are perfect for teaching kids to fish. We can recommend family-friendly fishing spots and properties with safe water access for young anglers to learn and enjoy.",
    },
  ],

  ctaImage: "/images/mallacoota-inlet-sunset.jpg",
  ctaHeading: "Plan Your Fishing Holiday Today",
  ctaDescription:
    "Secure your premium fishing accommodation in Mallacoota. Local expertise, exceptional properties, unforgettable fishing adventures.",
};

export default fishing;
